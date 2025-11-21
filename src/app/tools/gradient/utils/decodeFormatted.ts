import { colord } from "colord"
import { miniNamedColors, isColorName } from "./resolveColors"
import { isDecoration } from "./resolveDecorations"
import { makeGradientColorsForLength, makeRainbowForText } from "./gradientUtils"

export type GradientChar = {
  char: string
  color: string
  shadowColor: string
  bold?: boolean
  underline?: boolean
  strike?: boolean
}

// gradient helpers are in gradientUtils.ts

// thin orchestrator: parse formatted input into per-char structs
export function parseFormattedToChars(input: string, colors: string[]) {
  const out: GradientChar[] = []
  let i = 0
  let currentColor: string | null = null
  const stack: string[] = []

  function parseUntil(closeTag: string) {
    const start = i
    const end = input.indexOf(closeTag, start)
    if (end === -1) return null
    const inner = input.slice(start, end)
    i = end + closeTag.length
    return inner
  }

  while (i < input.length) {
    const ch = input.charAt(i)
    if (ch === "<") {
      const end = input.indexOf(">", i)
      if (end !== -1) {
        const tag = input.slice(i + 1, end).trim()
        if (tag.startsWith("/")) {
          const name = tag.slice(1)
          while (stack.length > 0) {
            const top = stack.pop()
            if (!top) break
            if (top === name || top.startsWith("color:")) break
          }
          let curColor: string | null = null
          for (const s of stack) if (s.startsWith("color:")) curColor = s.slice(6)
          currentColor = curColor
          i = end + 1
          continue
        }

        if (tag.startsWith("gradient:")) {
          const raw = tag.slice("gradient:".length)
          const stops = raw.split(":").map((s) => s.trim()).filter(Boolean)
          const closeTag = "</gradient>"
          const closeIdx = input.indexOf(closeTag, end)
          if (closeIdx !== -1) {
            const inner = input.slice(end + 1, closeIdx)
            const innerParsed = parseFormattedToChars(inner, colors)
            const len = innerParsed.length
            const useStops = stops.length ? stops : ["swatches"]
            const stopsToUse = useStops[0] === "swatches" ? colors : useStops
            const colorArray = makeGradientColorsForLength(len, stopsToUse)
            const bold = stack.includes("b")
            const underline = stack.includes("u")
            const strike = stack.includes("s")
            for (let k = 0; k < len; k++) {
              const src = innerParsed[k]
              if (!src) continue
              const hex = (colorArray[k] ?? src.color ?? "#ffffff") as string
              out.push({
                char: src.char,
                color: hex,
                shadowColor: colord(hex).darken(0.5).toHex(),
                bold: !!src.bold || bold,
                underline: !!src.underline || underline,
                strike: !!src.strike || strike,
              })
            }
            i = closeIdx + closeTag.length
            continue
          }
        }

        if (tag === "rainbow") {
          const closeTag = "</rainbow>"
          const closeIdx = input.indexOf(closeTag, end)
          if (closeIdx !== -1) {
            const inner = input.slice(end + 1, closeIdx)
            const innerParsed = parseFormattedToChars(inner, colors)
            const len = innerParsed.length
            const bold = stack.includes("b")
            const underline = stack.includes("u")
            const strike = stack.includes("s")
            const rcolors = Array.from({ length: len }).map((_, idx) => {
              const hue = (idx / Math.max(1, len)) * 360
              return colord({ h: hue, s: 0.9, l: 0.55 }).toHex()
            })
            for (let k = 0; k < len; k++) {
              const src = innerParsed[k]
              if (!src) continue
              const hex = rcolors[k] as string
              out.push({
                char: src.char,
                color: hex,
                shadowColor: colord(hex).darken(0.5).toHex(),
                bold: !!src.bold || bold,
                underline: !!src.underline || underline,
                strike: !!src.strike || strike,
              })
            }
            i = closeIdx + closeTag.length
            continue
          }
        }

        if (tag.startsWith("color:")) {
          const val = tag.slice(6)
          stack.push("color:" + val)
          currentColor = val
          i = end + 1
          continue
        }

        if (isDecoration(tag)) {
          stack.push(tag)
          i = end + 1
          continue
        }

        if (isColorName(tag)) {
          stack.push(tag)
          currentColor = miniNamedColors[tag] ?? null
          i = end + 1
          continue
        }

        i = end + 1
        continue
      }
    }

    let emitColor: string | null = null
    for (let s = stack.length - 1; s >= 0; s--) {
      const item = stack[s]
      if (!item) continue
      if (item.startsWith("color:")) {
        emitColor = item.slice(6)
        break
      }
      if (isColorName(item)) {
        emitColor = miniNamedColors[item] ?? null
        break
      }
    }
    const bold = stack.includes("b")
    const underline = stack.includes("u")
    const strike = stack.includes("s")
    const hex: string = emitColor ?? currentColor ?? "#ffffff"
    const shadow = colord(hex).darken(0.5).toHex()
    out.push({
      char: ch,
      color: hex,
      shadowColor: shadow,
      bold,
      underline,
      strike,
    })
    i += 1
  }

  return out
}

export default parseFormattedToChars
