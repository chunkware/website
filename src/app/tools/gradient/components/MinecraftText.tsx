import React from "react"
import type { GradientChar } from "../utils/parser"

const MinecraftText: React.FC<{ data: GradientChar[]; shadow?: boolean; className?: string }> = ({ data, shadow = true, className = "" }) => {
  return (
    <span className={`font-minecraft ${className}`}>
      {data.map(({ char, color, shadowColor, bold, underline, strike }, i) => (
        <span
          key={i}
          style={{
            color,
            fontWeight: bold ? "700" : undefined,
            textDecoration: [underline ? "underline" : null, strike ? "line-through" : null]
              .filter(Boolean)
              .join(" ") || undefined,
            textShadow: shadow ? `1px 2px ${shadowColor}` : "none",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default MinecraftText
