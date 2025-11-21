import { colord } from "colord"
import {
  miniNamedColors,
  defaultMinecraftSwatches,
  isHexColor,
  isColorName,
  getColorNamesPattern,
} from "./resolveColors"
// re-export defaultMinecraftSwatches for backward compatibility
export { defaultMinecraftSwatches } from "./resolveColors"
// also re-export the named color map for callers that import from parser
export { miniNamedColors } from "./resolveColors"
import { isDecoration } from "./resolveDecorations"
import { isGradientTag } from "./resolveGradients"

export const minecraftLegacyMap: Record<string, string> = {
  "0": "#000000",
  "1": "#0000AA",
  "2": "#00AA00",
  "3": "#00AAAA",
  "4": "#AA0000",
  "5": "#AA00AA",
  "6": "#FFAA00",
  "7": "#AAAAAA",
  "8": "#555555",
  "9": "#5555FF",
  a: "#55FF55",
  b: "#55FFFF",
  c: "#FF5555",
  d: "#FF55FF",
  e: "#FFFF55",
  f: "#FFFFFF",
}

// color names and default swatches are provided by resolveColors

export type GradientChar = {
  char: string
  color: string
  shadowColor: string
  bold?: boolean
  underline?: boolean
  strike?: boolean
}

export { parseFormattedToChars } from "./decodeFormatted"
export {
  makeGradientColorsForLength,
  makeRainbowForText,
} from "./gradientUtils"

export function tokenizeMiniMessage(src: string) {
  type Token = {
    type: "text" | "gradient" | "color"
    raw: string
    inner: string
    params?: string
    start: number
    end: number
  }
  const tokens: Token[] = []
  let idx = 0
  // capture gradient, color with params, named color tags (from miniNamedColors), or hex color tags like <#RRGGBB>
  const colorNames = Object.keys(miniNamedColors).join("|")
  const hexPattern = "#(?:[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})"
  const tagPattern = `(gradient:([^>]+)|color:([^>]+)|(${hexPattern})|(${colorNames}))`
  const regex = new RegExp(
    `<${tagPattern}>([\\s\\S]*?)<\\/\\s*(gradient|color|${hexPattern}|${colorNames})>`,
    "gi"
  )
  let match: RegExpExecArray | null
  while ((match = regex.exec(src)) !== null) {
    const full = match[0]
    const open = match[1]
    const gradParams = match[2]
    const colorParam = match[3]
    const hexParam = match[4]
    const nameParam = match[5]
    const inner = match[6]
    const start = match.index
    if (start > idx)
      tokens.push({
        type: "text",
        raw: src.slice(idx, start),
        inner: src.slice(idx, start),
        start: idx,
        end: start,
      })
    const end = start + full.length
    if (open && open.toLowerCase().startsWith("gradient:"))
      tokens.push({
        type: "gradient",
        raw: full,
        inner,
        params: gradParams,
        start,
        end,
      } as any)
    else if (colorParam)
      tokens.push({
        type: "color",
        raw: full,
        inner,
        params: colorParam,
        start,
        end,
      } as any)
    else if (hexParam)
      tokens.push({
        type: "color",
        raw: full,
        inner,
        params: hexParam,
        start,
        end,
      } as any)
    else if (nameParam)
      tokens.push({
        type: "color",
        raw: full,
        inner,
        params: nameParam,
        start,
        end,
      } as any)
    idx = end
  }
  if (idx < src.length)
    tokens.push({
      type: "text",
      raw: src.slice(idx),
      inner: src.slice(idx),
      start: idx,
      end: src.length,
    })
  return tokens
}

export function hasMarkup(text: string) {
  return /[§&<>]/.test(text)
}
