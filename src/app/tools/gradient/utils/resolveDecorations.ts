export const decorationAliases = new Set([
  "b",
  "bold",
  "i",
  "italic",
  "em",
  "u",
  "underlined",
  "st",
  "strikethrough",
  "obf",
  "obfuscated",
])

export function isDecoration(name: string) {
  return decorationAliases.has(name.toLowerCase())
}

export function getDecorations() {
  return Array.from(decorationAliases)
}

export default isDecoration
