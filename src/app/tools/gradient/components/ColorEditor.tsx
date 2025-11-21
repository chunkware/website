import React from "react"
import { HexColorPicker } from "react-colorful"
import { defaultMinecraftSwatches, miniNamedColors } from "../utils/parser"

type Props = {
  editingColor: null | { start: number; end: number; hex: string; inner: string }
  setEditingColor: (c: any) => void
  onSave: () => void
  colors?: string[]
  setColors?: (c: string[]) => void
}

export default function ColorEditor({ editingColor, setEditingColor, onSave, colors = [], setColors }: Props) {
  if (!editingColor) return null

  const addSwatch = () => {
    const hex = editingColor.hex
    if (!hex) return
    if (colors.includes(hex)) return
    setColors && setColors([...colors, hex])
  }

  const removeSwatch = (idx: number) => {
    if (!setColors) return
    setColors(colors.filter((_, i) => i !== idx))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black/90 p-6 rounded-2xl shadow-2xl w-[520px] max-w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Edit Color</h3>
          <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600" onClick={() => setEditingColor(null)}>Close</button>
        </div>

        <div className="mb-4">
          <HexColorPicker color={editingColor.hex} onChange={(v: string) => setEditingColor((c: any) => c ? { ...c, hex: v } : c)} />
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex gap-2 items-center">
            {/* default minecraft swatches (non-removable) */}
            {defaultMinecraftSwatches.map((c, i) => (
              <button key={`def-${i}`} onClick={() => setEditingColor((ec: any) => ec ? { ...ec, hex: c } : ec)} className="h-8 w-8 rounded-md border" style={{ background: c }} title={`Minecraft ${i + 1}`}></button>
            ))}

            {/* user swatches (removable) */}
            {colors.map((c, i) => (
              <div key={i} className="relative">
                <button
                  onClick={() => setEditingColor((ec: any) => ec ? { ...ec, hex: c } : ec)}
                  className="h-8 w-8 rounded-md border"
                  style={{ background: c }}
                />
                <button
                  onClick={() => removeSwatch(i)}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}

            <button className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center" onClick={addSwatch}>+</button>
          </div>
          <div className="text-sm text-gray-300 ml-auto">{editingColor.inner}</div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => setEditingColor(null)}>Cancel</button>
          <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500" onClick={() => onSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}
