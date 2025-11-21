import type { RefObject } from "react"
import type { Token } from "../types"

type GradientChar = {
  char: string
  color: string
  shadowColor: string
  bold?: boolean
  underline?: boolean
  strike?: boolean
}

export function getSelectionText(text: string, ref: RefObject<HTMLTextAreaElement | null>) {
  const el = ref.current
  if (!el) return { start: 0, end: 0, selected: "" }
  const start = el.selectionStart ?? 0
  const end = el.selectionEnd ?? 0
  return { start, end, selected: text.slice(start, end) }
}

export function replaceSelection(text: string, ref: RefObject<HTMLTextAreaElement | null>, setText: (s: string) => void, repl: string) {
  const el = ref.current
  const s = el?.selectionStart ?? 0
  const e = el?.selectionEnd ?? 0
  setText(text.slice(0, s) + repl + text.slice(e))
}

export function applyWrapTag(text: string, ref: RefObject<HTMLTextAreaElement | null>, setText: (s: string) => void, tag: string) {
  const { start, selected } = getSelectionText(text, ref)
  if (!selected) {
    const repl = `<${tag}></${tag}>`
    replaceSelection(text, ref, setText, repl)
    requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const pos = start + `<${tag}>`.length
      el.focus()
      el.setSelectionRange(pos, pos)
    })
    return
  }
  replaceSelection(text, ref, setText, `<${tag}>${selected}</${tag}>`)
}

export function applyGradientToSelection(text: string, ref: RefObject<HTMLTextAreaElement | null>, setText: (s: string) => void, colors: string[]) {
  const { start, selected } = getSelectionText(text, ref)
  if (!selected) {
    const wrap = `<gradient:${colors.join(":")}></gradient>`
    replaceSelection(text, ref, setText, wrap)
    requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const pos = start + `<gradient:${colors.join(":")}>`.length
      el.focus()
      el.setSelectionRange(pos, pos)
    })
    return
  }
  replaceSelection(text, ref, setText, `<gradient:${colors.join(":")}>${selected}</gradient>`)
}

export function applyColorToSelection(text: string, ref: RefObject<HTMLTextAreaElement | null>, setText: (s: string) => void, hex: string) {
  const { start, selected } = getSelectionText(text, ref)
  if (!selected) {
    const wrap = `<color:${hex}></color>`
    replaceSelection(text, ref, setText, wrap)
    requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const pos = start + `<color:${hex}>`.length
      el.focus()
      el.setSelectionRange(pos, pos)
    })
    return
  }
  replaceSelection(text, ref, setText, `<color:${hex}>${selected}</color>`)
}

export function convertToMiniText(text: string) {
  let out = ""
  let inTag = false
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i)
    if (ch === "<") {
      inTag = true
      out += ch
      continue
    }
    if (ch === ">") {
      inTag = false
      out += ch
      continue
    }
    if (inTag) {
      out += ch
      continue
    }
    if ((ch === "&" || ch === "§") && i + 1 < text.length) {
      out += ch + text[i + 1]
      i += 1
      continue
    }
    out += ch.toLowerCase()
  }
  return out
}

export function exportLegacy(parsed: GradientChar[] | null, colors: string[], text: string) {
  if (parsed) {
    return parsed
      .map((g) => {
        const hex = g.color.replace("#", "")
        const parts = hex.split("")
        const seq = parts.map((p: string) => `§${p}`).join("")
        return `§x${seq}${g.char}`
      })
      .join("")
  }
  return `<gradient:${colors.join(":")}>${text}</gradient>`
}

export function exportMiniMessage(text: string, has: boolean, colors: string[]) {
  return has ? text : `<gradient:${colors.join(":")}>${text}</gradient>`
}

export function exportJSON(parsed: GradientChar[] | null, gradient: GradientChar[]) {
  const arr = (parsed ?? gradient).map((c) => ({ text: c.char, color: c.color }))
  return JSON.stringify({ extra: arr })
}
