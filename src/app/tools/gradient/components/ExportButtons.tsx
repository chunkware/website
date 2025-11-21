"use client"

import { Icon } from "@iconify/react"
import React from "react"

type Props = {
  handleCopy: (fmt: "minimessage" | "legacy" | "json") => void
  copied: string | null
}

export default function ExportButtons({ handleCopy, copied }: Props) {
  return (
    <div className="flex gap-2">
      <button
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded"
        onClick={() => handleCopy("minimessage")}
      >
        {copied === "minimessage" ? (
          <Icon icon="mdi:check" width="24" height="24" />
        ) : (
          <Icon icon="si:copy-line" width="24" height="24" />
        )}{" "}
        MiniMessage
      </button>

      <button
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded"
        onClick={() => handleCopy("legacy")}
      >
        <Icon icon="si:copy-line" width="24" height="24" /> Legacy
      </button>

      <button
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded"
        onClick={() => handleCopy("json")}
      >
        <Icon icon="si:copy-line" width="24" height="24" /> JSON
      </button>
    </div>
  )
}
