export function isGradientTag(tag: string) {
  if (!tag) return false
  const t = tag.toLowerCase()
  return t === "gradient" || t.startsWith("gradient:")
}

export default isGradientTag
