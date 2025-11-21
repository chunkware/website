import { useMemo } from "react"
import { colord, extend } from "colord"
import mixPlugin from "colord/plugins/mix"

extend([mixPlugin])

export default function useGradient(text: string, colors: string[]) {
  return useMemo(() => {
    if (!text) return []
    const chars = text.split("")
    const stops = colors && colors.length > 0 ? colors : ["#ffffff"]
    const n = stops.length

    return chars.map((char, idx) => {
      if (chars.length === 1 || n === 1) {
        const base = stops[0] ?? "#ffffff"
        const color = colord(base).toHex()
        const shadowColor = colord(color).darken(0.5).toHex()
        return { char, color, shadowColor }
      }

      const t = chars.length > 1 ? idx / (chars.length - 1) : 0
      const segLen = 1 / (n - 1)
      let segIndex = Math.min(Math.floor(t / segLen), n - 2)
      if (segIndex < 0) segIndex = 0
      const segStart = segIndex * segLen
      const localT = (t - segStart) / segLen

      const a = stops[segIndex] ?? "#ffffff"
      const b = stops[segIndex + 1] ?? a
      const color = colord(a).mix(b, localT).toHex()
      const shadowColor = colord(color).darken(0.5).toHex()
      return { char, color, shadowColor }
    })
  }, [text, colors.join(",")])
}
