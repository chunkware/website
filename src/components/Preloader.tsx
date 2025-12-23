"use client"

import { useEffect } from "react"

const MIN_VISIBLE_MS = 1500
const FADE_DURATION_MS = 300
const SAFETY_TIMEOUT_MS = 10000

export default function Preloader() {
  useEffect(() => {
    const el = document.getElementById("preloader-root")
    if (!el) return

    // Ensure starting styles
    el.style.opacity = "1"
    el.style.pointerEvents = "auto"

    const start = Date.now()
    let didRemove = false

    const fadeOut = () => {
      if (didRemove) return
      el.style.transition = `opacity ${FADE_DURATION_MS}ms ease`
      el.style.opacity = "0"
      // after fade, remove from flow
      setTimeout(() => {
        try {
          el.style.display = "none"
        } catch (e) {
          /* noop */
        }
        didRemove = true
      }, FADE_DURATION_MS)
    }

    const onLoad = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
      setTimeout(fadeOut, remaining)
    }

    if (document.readyState === "complete") {
      onLoad()
    } else {
      window.addEventListener("load", onLoad, { once: true })
      const safety = setTimeout(onLoad, SAFETY_TIMEOUT_MS)
      return () => {
        window.removeEventListener("load", onLoad)
        clearTimeout(safety)
      }
    }
  }, [])

  return null
}
