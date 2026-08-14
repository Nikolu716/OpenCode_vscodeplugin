import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputs = [
  ["src/extension.js", "dist/extension.js"],
  ["src/runtime-security.cjs", "dist/runtime-security.cjs"],
]

fs.mkdirSync(path.join(root, "dist"), { recursive: true })
for (const [sourceName, outputName] of outputs) {
  const source = fs.readFileSync(path.join(root, sourceName), "utf8").replace(/\r\n/g, "\n")
  const outputPath = path.join(root, outputName)
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8").replace(/\r\n/g, "\n") : null
  if (current !== source) fs.writeFileSync(outputPath, source, "utf8")
}

console.log("build: dist is synchronized with the JavaScript source baseline")
