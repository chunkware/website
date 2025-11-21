import { colord } from "colord"

export function makeGradientColorsForLength(len: number, stops: string[]) {
  const n = stops.length || 1
  if (len === 0) return [] as string[]
  if (n === 1) {
    const hex = colord(stops[0] ?? "#ffffff").toHex()
    return Array(len).fill(hex)
  }
  return Array.from({ length: len }).map((_, idx) => {
    const t = len > 1 ? idx / (len - 1) : 0
    const segLen = 1 / (n - 1)
    let segIndex = Math.min(Math.floor(t / segLen), n - 2)
    if (segIndex < 0) segIndex = 0
    const segStart = segIndex * segLen
    const localT = (t - segStart) / segLen
    const a = stops[segIndex] ?? stops[0] ?? "#ffffff"
    const b = stops[segIndex + 1] ?? a
    return colord(a).mix(b, localT).toHex()
  })
}

export function makeRainbowForText(inner: string) {
  const chars = inner.split("")
  const len = Math.max(1, chars.length)
  return chars.map((ch, idx) => {
    const hue = (idx / len) * 360
    const hex = colord({ h: hue, s: 0.9, l: 0.55 }).toHex()
    return {
      char: ch,
      color: hex,
      shadowColor: colord(hex).darken(0.5).toHex(),
    }
  })
}

export default makeGradientColorsForLength
