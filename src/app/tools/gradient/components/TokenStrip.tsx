import React from "react"
import type { Token } from "../types"
import { parseFormattedToChars } from "../utils/parser"

export default function TokenStrip({
  tokens,
  colors,
  onOpenGradient,
  onOpenColor,
  editingGradient,
  onEditStop,
}: {
  tokens: Token[]
  colors: string[]
  onOpenGradient: (t: Token) => void
  onOpenColor: (t: Token) => void
  editingGradient?: any | null
  onEditStop?: (t: Token, idx: number) => void
}) {
  return (
    <div className="mt-2 p-2 rounded text-sm font-minecraft">
      {tokens.map((t, i) => {
        // normal text, no colors
        if (t.type === "text") {
          const chars = parseFormattedToChars(t.raw, colors)
          return (
            <span key={i}>
              {chars.map((c, ci) => (
                <span
                  key={ci}
                  style={{
                    color: c.color || undefined,
                    textShadow: c.shadowColor
                      ? `1px 2px ${c.shadowColor}`
                      : undefined,
                    fontWeight: c.bold ? 700 : undefined,
                    textDecoration: c.strike ? "line-through" : undefined,
                  }}
                >
                  {c.char}
                </span>
              ))}
            </span>
          )
        }

        // gradients
        if (t.type === "gradient") {
          const active = editingGradient && editingGradient.raw === t.raw
          const stops: string[] = active
            ? editingGradient.stops ??
              (t.params
                ? (t.params as string).split(":").filter(Boolean)
                : colors)
            : t.params
            ? (t.params as string).split(":").filter(Boolean)
            : colors

          const gradientCss = `linear-gradient(90deg, ${stops.join(", ")})`
          const chars = parseFormattedToChars(t.inner, colors)

          return (
            <span
              key={i}
              className="border-b-1 border-dotted inline-flex items-center"
            >
              <button
                onClick={() => onOpenGradient(t)}
                title={t.raw}
                className="cursor-pointer"
                style={{
                  backgroundImage: gradientCss,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  border: "none",
                }}
              >
                {chars.map((c, ci) => (
                  <span
                    key={ci}
                    className={`${c.bold ? "font-bold" : ""} ${
                      c.underline ? "underline" : ""
                    } ${c.strike ? "line-through" : ""}`}
                  >
                    {c.char}
                  </span>
                ))}
              </button>
            </span>
          )
        }

        // normal color
        const hex = t.params ?? colors[0]
        const chars = parseFormattedToChars(t.inner, colors)
        return (
          <span
            key={i}
            className="border-b-1 border-dotted inline-flex items-center"
          >
            <button
              onClick={() => onOpenColor(t)}
              title={t.raw}
              className="cursor-pointer"
              style={{ background: "transparent", color: hex }}
            >
              {chars.map((c, ci) => (
                <span
                  key={ci}
                  className={`${c.bold ? "font-bold" : ""} ${
                    c.underline ? "underline" : ""
                  } ${c.strike ? "line-through" : ""}`}
                >
                  {c.char}
                </span>
              ))}
            </button>
          </span>
        )
      })}
    </div>
  )
}
