export const miniNamedColors: Record<string, string> = {
  black: "#000000",
  dark_blue: "#0000AA",
  dark_green: "#00AA00",
  dark_aqua: "#00AAAA",
  dark_red: "#AA0000",
  dark_purple: "#AA00AA",
  gold: "#FFAA00",
  gray: "#AAAAAA",
  dark_gray: "#555555",
  blue: "#5555FF",
  green: "#55FF55",
  aqua: "#55FFFF",
  red: "#FF5555",
  light_purple: "#FF55FF",
  yellow: "#FFFF55",
  white: "#FFFFFF",
}

// legacy synonyms
// legacy synonyms (use non-null assertions because indexed access may be undefined
// under strict index checks; the keys exist in the object above)
miniNamedColors["dark_grey"] = miniNamedColors["dark_gray"]!
miniNamedColors["grey"] = miniNamedColors["gray"]!

export const defaultMinecraftSwatches = Object.values(miniNamedColors)

export function isHexColor(s: string) {
  return /^#(?:[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(s)
}

export function isColorName(n: string) {
  return !!miniNamedColors[n.toLowerCase()]
}

export function getColorNamesPattern() {
  return Object.keys(miniNamedColors).join("|")
}

export default miniNamedColors
