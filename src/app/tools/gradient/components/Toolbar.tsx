"use client"

import React from "react"
import TokenStrip from "./TokenStrip"
import type { Token } from "../types"
import GradientEditor from "./GradientEditor"

type Props = {
  text: string
  setText: (s: string) => void
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>
  tokens: Token[]
  onOpenGradient: (t: Token) => void
  onOpenColor: (t: Token) => void
  colors: string[]
  setColors: (c: string[]) => void
  onWrap: (tag: string) => void
  onApplyGradient: () => void
  onConvertMini: () => void
  editingGradient?: any | null
  setEditingGradient?: (g: any | null) => void
  onSaveGradient?: (token: Token, stops: string[]) => void
  initialActive?: number | null
  onEditStop?: (t: Token, idx: number) => void
}

export default function Toolbar({
  text,
  setText,
  textAreaRef,
  tokens,
  onOpenGradient,
  onOpenColor,
  colors,
  setColors,
  onWrap,
  onApplyGradient,
  onConvertMini,
  editingGradient,
  setEditingGradient,
  onSaveGradient,
  initialActive,
  onEditStop,
  editingColor,
  setEditingColor,
  onSaveColor,
}: Props & {
  editingGradient?: any | null
  onEditStop?: (t: Token, idx: number) => void
  editingColor?: any | null
  setEditingColor?: (c: any) => void
  onSaveColor?: (t: Token | any, hex: string, keepOpen?: boolean) => void
}) {
  return (
    <section className="mb-4 bg-zinc-900/40 p-4 rounded">
      <div className="flex gap-2 mb-3">
        <button
          className="px-2 py-1 bg-gray-800 rounded"
          onClick={() => onWrap("b")}
        >
          B
        </button>
        <button
          className="px-2 py-1 bg-gray-800 rounded"
          onClick={() => onWrap("u")}
        >
          U
        </button>
        <button
          className="px-2 py-1 bg-gray-800 rounded"
          onClick={() => onWrap("s")}
        >
          S
        </button>
        <button
          className="px-2 py-1 bg-gray-800 rounded"
          onClick={onApplyGradient}
        >
          G
        </button>
        <button
          className="px-2 py-1 bg-gray-800 rounded"
          onClick={onConvertMini}
        >
          Mini
        </button>
        <button
          className="px-2 py-1 bg-gray-700 rounded ml-auto"
          onClick={() => setColors(["#000000", "#ffffff"])}
        >
          Reset
        </button>
      </div>

      <textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-28 p-3 bg-black/60 text-white rounded font-mono"
        placeholder="Enter your text..."
      />

      <div className="mt-3">
        <GradientEditor
          editingGradient={editingGradient}
          setEditingGradient={setEditingGradient as any}
          initialActive={initialActive}
          text={text}
          tokens={tokens}
          colors={colors}
          onSave={() =>
            editingGradient &&
            onSaveGradient &&
            onSaveGradient(
              editingGradient as Token,
              (editingGradient as any).stops
            )
          }
          onOpenGradient={onOpenGradient}
          onOpenColor={onOpenColor}
          onEditStop={onEditStop}
          editingColor={editingColor}
          setEditingColor={setEditingColor}
          onSaveColor={onSaveColor}
        />
      </div>
    </section>
  )
}
