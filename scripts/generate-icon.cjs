"use strict"

const fs = require("node:fs")
const path = require("node:path")
const zlib = require("node:zlib")

const size = 128
const scale = 4
const high = size * scale
const pixels = new Uint8Array(high * high * 4)

function insideRoundedRect(x, y, left, top, right, bottom, radius) {
  const cx = Math.max(left + radius, Math.min(x, right - radius))
  const cy = Math.max(top + radius, Math.min(y, bottom - radius))
  const dx = x - cx
  const dy = y - cy
  return dx * dx + dy * dy <= radius * radius
}

function blendPixel(x, y, color) {
  if (x < 0 || y < 0 || x >= high || y >= high) return
  const offset = (y * high + x) * 4
  const alpha = color[3] / 255
  const inverse = 1 - alpha
  pixels[offset] = Math.round(color[0] * alpha + pixels[offset] * inverse)
  pixels[offset + 1] = Math.round(color[1] * alpha + pixels[offset + 1] * inverse)
  pixels[offset + 2] = Math.round(color[2] * alpha + pixels[offset + 2] * inverse)
  pixels[offset + 3] = Math.round((alpha + (pixels[offset + 3] / 255) * inverse) * 255)
}

function fillRoundedRect(left, top, right, bottom, radius, color) {
  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      if (insideRoundedRect(x + 0.5, y + 0.5, left, top, right, bottom, radius)) blendPixel(x, y, color)
    }
  }
}

function fillRect(left, top, right, bottom, color) {
  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) blendPixel(x, y, color)
  }
}

const px = (value) => Math.round(value * scale)
fillRoundedRect(0, 0, high, high, px(20), [32, 38, 36, 255])

const white = [244, 247, 245, 255]
fillRect(px(33), px(31), px(95), px(39), white)
fillRect(px(33), px(89), px(95), px(97), white)
fillRect(px(33), px(39), px(41), px(89), white)
fillRect(px(87), px(39), px(95), px(89), white)

const green = [67, 181, 129, 255]
fillRect(px(47), px(62), px(55), px(79), green)
fillRect(px(60), px(48), px(68), px(79), green)
fillRect(px(73), px(57), px(81), px(79), green)
fillRect(px(43), px(88), px(85), px(94), [84, 183, 198, 255])

const downsampled = Buffer.alloc(size * size * 4)
for (let y = 0; y < size; y += 1) {
  for (let x = 0; x < size; x += 1) {
    const sums = [0, 0, 0, 0]
    for (let sy = 0; sy < scale; sy += 1) {
      for (let sx = 0; sx < scale; sx += 1) {
        const source = (((y * scale + sy) * high) + (x * scale + sx)) * 4
        for (let channel = 0; channel < 4; channel += 1) sums[channel] += pixels[source + channel]
      }
    }
    const target = (y * size + x) * 4
    for (let channel = 0; channel < 4; channel += 1) downsampled[target + channel] = Math.round(sums[channel] / (scale * scale))
  }
}

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const name = Buffer.from(type, "ascii")
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, checksum])
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(size, 0)
ihdr.writeUInt32BE(size, 4)
ihdr[8] = 8
ihdr[9] = 6

const scanlines = Buffer.alloc(size * (1 + size * 4))
for (let y = 0; y < size; y += 1) {
  const row = y * (1 + size * 4)
  scanlines[row] = 0
  downsampled.copy(scanlines, row + 1, y * size * 4, (y + 1) * size * 4)
}

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(scanlines, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
])

const output = path.resolve(__dirname, "../media/icon.png")
fs.writeFileSync(output, png)
console.log(output)
