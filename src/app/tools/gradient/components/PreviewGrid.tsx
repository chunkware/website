"use client"

import React from "react"
import { BentoGrid, BentoGridItem } from "@ui/bento-grid"
import MinecraftText from "./MinecraftText"
import type { Token } from "../types"
import { makeGradientColorsForLength } from "../utils/parser"

type Props = {
  parsed: any
  gradient: any
  tokens: Token[]
  onOpenGradient: (t: Token) => void
  onOpenColor: (t: Token) => void
}

// Render preview but hide mini-message tags; make gradient/color segments clickable
export default function PreviewGrid({ parsed, gradient, tokens, onOpenGradient, onOpenColor, editingGradient }: Props & { editingGradient?: any | null }) {
  const data = parsed ?? gradient
  const chars = data.map((c: any) => c.char).join("")

  // build ranges for tokens by matching token.inner in the rendered char stream
  const ranges: { start: number; end: number; token: Token }[] = []
  const used: boolean[] = Array(chars.length).fill(false)
  for (const t of tokens) {
    if (t.type === 'text') continue
    const inner = t.inner
    if (!inner) continue
    let idx = chars.indexOf(inner)
    // if already used, try next occurrence
    while (idx !== -1) {
      let conflict = false
      for (let k = idx; k < idx + inner.length; k++) if (used[k]) { conflict = true; break }
      if (!conflict) break
      idx = chars.indexOf(inner, idx + 1)
    }
    if (idx !== -1) {
      for (let k = idx; k < idx + inner.length; k++) used[k] = true
      ranges.push({ start: idx, end: idx + inner.length, token: t })
    }
  }

  function findRangeAt(i: number) {
    return ranges.find((r) => i >= r.start && i < r.end)
  }

  return (
    <section className="mb-6">
      <div className="mb-2">Preview</div>
      <BentoGrid>
        {Array.from({ length: 5 }).map((_, gi) => (
          <BentoGridItem key={gi}>
            <span className="font-minecraft">
              {data.map((d: any, i: number) => {
                const range = findRangeAt(i)
                let color = d.color
                let shadow = d.shadowColor
                if (range && editingGradient && editingGradient.raw === range.token.raw && range.token.type === 'gradient') {
                  const innerIndex = i - range.start
                  const stops = editingGradient.stops ?? (range.token.params ? (range.token.params as string).split(":").filter(Boolean) : [])
                  const arr = makeGradientColorsForLength(range.end - range.start, stops)
                  color = arr[innerIndex] ?? color
                  shadow = color ? color : shadow
                }
                const content = (
                  <span
                    key={i}
                    style={{
                      color,
                      textShadow: `1px 2px ${shadow}`,
                      fontWeight: d.bold ? 700 : undefined,
                      textDecoration: [d.underline ? 'underline' : null, d.strike ? 'line-through' : null].filter(Boolean).join(' ') || undefined,
                    }}
                  >
                    {d.char}
                  </span>
                )
                if (!range) return content
                const handler = range.token.type === 'gradient' ? () => onOpenGradient(range.token) : () => onOpenColor(range.token)
                return (
                  <button key={i} onClick={handler} className="p-0 m-0 align-baseline">
                    {content}
                  </button>
                )
              })}
            </span>
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>
  )
}
