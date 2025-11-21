"use client"

import { useEffect, useRef, useState } from "react"
import useGradient from "./utils/useGradient"
import ColorEditor from "./components/ColorEditor"
import Toolbar from "./components/Toolbar"
import ExportButtons from "./components/ExportButtons"
import PreviewGrid from "./components/PreviewGrid"
import {
  parseFormattedToChars,
  tokenizeMiniMessage,
  hasMarkup,
  miniNamedColors,
} from "./utils/parser"
import type { Token } from "./types"
import {
  applyWrapTag as utilApplyWrapTag,
  applyGradientToSelection as utilApplyGradientToSelection,
  convertToMiniText as utilConvertToMiniText,
  exportLegacy as utilExportLegacy,
  exportMiniMessage as utilExportMiniMessage,
  exportJSON as utilExportJSON,
} from "./utils/edits"

import { Header } from "@components/Header"
import { Footer } from "@components/Footer"
import Aurora from "@ui/Aurora"

export default function GradientPage() {
  const [text, setText] = useState("gradient text")
  const [colors, setColors] = useState<string[]>(["#ff0000", "#00d1ff"])
  // color picker is provided by react-colorful inside editors
  const [editingGradient, setEditingGradient] = useState<any | null>(null)
  const [editingColor, setEditingColor] = useState<any | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    // no-op: keep effect quiet in case of future dynamic loading
    return () => {}
  }, [])

  const tokens: Token[] = tokenizeMiniMessage(text)
  const parsed = hasMarkup(text) ? parseFormattedToChars(text, colors) : null
  const gradient = useGradient(text, colors)

  const [editingGradientActive, setEditingGradientActive] = useState<
    number | null
  >(null)

  const openGradientEditor = (t: Token) => {
    // if another gradient is currently being edited, save it first
    if (editingGradient && (editingGradient as any).raw !== t.raw) {
      saveGradient(editingGradient as any, (editingGradient as any).stops)
    }
    const stops = t.params
      ? (t.params ?? "").split(":").filter(Boolean)
      : colors
    setEditingGradient({ ...(t as any), stops })
    setEditingGradientActive(null)
  }
  const openGradientEditorAt = (t: Token, idx: number) => {
    if (editingGradient && (editingGradient as any).raw !== t.raw) {
      saveGradient(editingGradient as any, (editingGradient as any).stops)
    }
    const stops = t.params
      ? (t.params ?? "").split(":").filter(Boolean)
      : colors
    setEditingGradient({ ...(t as any), stops })
    setEditingGradientActive(idx)
  }
  const openColorEditor = (t: Token) => {
    // if a gradient is currently being edited, save it first
    if (editingGradient) {
      saveGradient(editingGradient as any, (editingGradient as any).stops)
      setEditingGradient(null)
    }
    let hex = "#ffffff"
    const p = t.params ?? ""
    if (p.startsWith("#")) hex = p
    else if (miniNamedColors[p]) hex = miniNamedColors[p]
    setEditingColor({ ...(t as any), hex })
  }

  const saveGradient = (token: Token, stops: string[]) => {
    const repl = `<gradient:${stops.join(":")}>${token.inner}</gradient>`
    setText((s) => s.replace(token.raw, repl))
    setEditingGradient(null)
  }

  // saveColor: replace the current tag that wraps `token.inner` (works for named tags and color: tags)
  // when keepOpen=true, update the text and keep the color editor open (update editingColor.hex)
  const saveColor = (token: any, hex: string, keepOpen = false) => {
    const repl = `<color:${hex}>${token.inner}</color>`
    // escape inner for regex
    const escInner = (token.inner || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const pattern = new RegExp(`<[^>]*>${escInner}<\/[^>]*>`) // matches any tag wrapping the inner text
    setText((s) => s.replace(pattern, repl))
    if (keepOpen) {
      setEditingColor({ ...(token as any), hex, raw: repl })
    } else {
      setEditingColor(null)
    }
  }

  // selection & editor helpers are implemented in utils to keep this file small
  // use utilApplyWrapTag(text, textAreaRef, setText, tag)
  // use utilApplyGradientToSelection(text, textAreaRef, setText, colors)
  // use utilApplyColorToSelection(text, textAreaRef, setText, hex)
  // convert with utilConvertToMiniText(text)
  // exporters: utilExportLegacy(parsed, colors, text), utilExportMiniMessage(text, hasMarkup(text), colors), utilExportJSON(parsed, gradient)

  const handleCopy = async (format: "minimessage" | "legacy" | "json") => {
    let value = ""
    if (format === "minimessage")
      value = utilExportMiniMessage(text, hasMarkup(text), colors)
    if (format === "legacy") value = utilExportLegacy(parsed, colors, text)
    if (format === "json") value = utilExportJSON(parsed, gradient)
    try {
      await navigator.clipboard.writeText(value)
      setCopied(format)
      setTimeout(() => setCopied(null), 1500)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen w-full min-w-0 box-border flex flex-col items-center justify-center overflow-x-hidden bg-[#08080a] text-white px-4 sm:px-6">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#5b21b6", "#a855f7", "#ec4899"]}
          blend={0.9}
          amplitude={0.8}
          speed={0.45}
        />
      </div>

      <Header />

      <main className="max-w-6xl w-full mx-auto p-6 pt-12">
        <section className="mb-4 relative z-30 bg-black/50 p-4 rounded">
          <Toolbar
            text={text}
            setText={setText}
            textAreaRef={textAreaRef}
            tokens={tokens}
            onOpenGradient={openGradientEditor}
            onOpenColor={openColorEditor}
            colors={colors}
            setColors={setColors}
            onWrap={(tag) => utilApplyWrapTag(text, textAreaRef, setText, tag)}
            onApplyGradient={() =>
              utilApplyGradientToSelection(text, textAreaRef, setText, colors)
            }
            onConvertMini={() => setText(utilConvertToMiniText(text))}
            editingGradient={editingGradient}
            setEditingGradient={setEditingGradient}
            initialActive={editingGradientActive}
            onSaveGradient={saveGradient}
            onEditStop={openGradientEditorAt}
            editingColor={editingColor}
            setEditingColor={setEditingColor}
            onSaveColor={saveColor}
          />
        </section>

        <PreviewGrid
          parsed={parsed}
          gradient={gradient}
          tokens={tokens}
          onOpenGradient={openGradientEditor}
          onOpenColor={openColorEditor}
          editingGradient={editingGradient}
        />

        <ExportButtons handleCopy={handleCopy} copied={copied} />
      </main>

      <Footer />
    </div>
  )
}
