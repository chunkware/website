import React, { useEffect, useState } from "react"
import { HexColorPicker } from "react-colorful"
import {
  parseFormattedToChars,
  defaultMinecraftSwatches,
  makeGradientColorsForLength,
} from "../utils/parser"
import TokenStrip from "./TokenStrip"

export default function GradientEditor({
  editingGradient,
  setEditingGradient,
  onSave,
  initialActive,
  text,
  tokens,
  colors,
  onOpenGradient,
  onOpenColor,
  onEditStop,
  editingColor,
  setEditingColor,
  onSaveColor,
}: {
  editingGradient?: any | null
  setEditingGradient?: any
  onSave?: () => void
  initialActive?: number | null
  text?: string
  tokens?: any[]
  colors?: string[]
  onOpenGradient?: (t: any) => void
  onOpenColor?: (t: any) => void
  onEditStop?: (t: any, idx: number) => void
  editingColor?: any | null
  setEditingColor?: (c: any) => void
  onSaveColor?: (t: any, hex: string, keepOpen?: boolean) => void
}) {
  const [active, setActive] = useState<number>(0)

  useEffect(() => {
    if (!editingGradient) return
    const stops: string[] = editingGradient.stops ?? []
    if (
      typeof initialActive === "number" &&
      initialActive >= 0 &&
      initialActive < stops.length
    )
      setActive(initialActive)
    else setActive(stops.length ? 0 : 0)
  }, [editingGradient, initialActive])

  // editingGradient is optional; when absent we show default-color mode

  const stops: string[] = (editingGradient && editingGradient.stops) ?? []

  const [defaultColor, setDefaultColor] = useState<string>(
    (colors && colors[0]) ?? "#ffffff"
  )

  const updateStop = (idx: number, hex: string) =>
    setEditingGradient((gradient: any) =>
      gradient
        ? {
            ...gradient,
            stops: gradient.stops.map((x: string, i: number) =>
              i === idx ? hex : x
            ),
          }
        : gradient
    )
  const addStop = (insertAfter = active) => {
    const newColor = (stops && stops[active]) ?? defaultColor ?? "#ffffff"
    setEditingGradient((gradient: any) =>
      gradient
        ? {
            ...gradient,
            stops: [
              ...gradient.stops.slice(0, insertAfter + 1),
              newColor,
              ...gradient.stops.slice(insertAfter + 1),
            ],
          }
        : gradient
    )
    setActive((a) => insertAfter + 1)
  }
  // Editor edits existing stops only — no add/remove here

  return (
    <div className="relative bg-[#27272A] p-5 rounded-2xl shadow-2xl max-w-full">
      <div className="flex gap-6 mb-4">
        <div className="flex flex-col gap-4 w-1/3">
          {/* Picker edits the active stop if editingGradient, otherwise edits defaultColor */}
          <HexColorPicker
            color={
              editingGradient
                ? stops[active] ?? "#ffffff"
                : editingColor
                ? editingColor.hex ?? "#ffffff"
                : defaultColor
            }
            onChange={(v) => {
              if (editingGradient) updateStop(active, v)
              else if (editingColor) {
                setEditingColor &&
                  setEditingColor((c: any) => (c ? { ...c, hex: v } : c))
                // persist change immediately while keeping editor open
                onSaveColor && onSaveColor(editingColor, v, true)
              } else setDefaultColor(v)
            }}
          />

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {defaultMinecraftSwatches.map((c, i) => (
              <button
                key={`def-${i}`}
                title={`Swatch ${i + 1}`}
                onClick={() => {
                  if (editingGradient) updateStop(active, c)
                  else if (editingColor) {
                    setEditingColor &&
                      setEditingColor((ec: any) =>
                        ec ? { ...ec, hex: c } : ec
                      )
                    onSaveColor && onSaveColor(editingColor, c, true)
                  } else setDefaultColor(c)
                }}
                className="h-8 w-8 rounded-md border"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#151515] p-4 rounded-xl flex-1">
          {/* TokenStrip preview: shows full text tokens and will reflect editingGradient when present */}
          <TokenStrip
            tokens={tokens ?? []}
            colors={
              editingGradient
                ? stops.length
                  ? stops
                  : colors ?? ["#ffffff"]
                : [defaultColor]
            }
            onOpenGradient={onOpenGradient ?? (() => {})}
            onOpenColor={onOpenColor ?? (() => {})}
            editingGradient={editingGradient ?? null}
            onEditStop={onEditStop}
          />
        </div>
      </div>

      {/* color stops */}
      {!editingColor && (
        <div className="flex items-center gap-2 flex-wrap bg-[#27272A] py-4">
          {stops.length !== 0
            ? stops.map((s, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={() => setActive(idx)}
                    className={`h-10 w-10 rounded-md border ${
                      active === idx ? "ring-2 ring-white" : "border-white/10"
                    }`}
                    style={{ background: s }}
                  />
                </div>
              ))
            : ""}
          <div className="ml-2">
            <button
              onClick={() => addStop()}
              className="px-3 py-2 bg-green-600 rounded-md text-sm font-medium"
              title="Add stop"
            >
              + Add stop
            </button>
          </div>
        </div>
      )}

      {/* simple controls for single-color editing (save/cancel) */}
      {editingColor && (
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setEditingColor && setEditingColor(null)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
            onClick={() =>
              editingColor &&
              onSaveColor &&
              onSaveColor(editingColor, editingColor.hex, false)
            }
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}
