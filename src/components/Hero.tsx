"use client"

import React, { useEffect, useState } from "react"
import texts from "../lib/config"
import { LogoLoop } from "./ui/LogoLoop"

import { motion } from "motion/react"
import { Button } from "./ui/moving-border"
import TextType from "./TextType"

export const Hero = () => {
  const [start, setStart] = useState(false)

  useEffect(() => {
    const handler = () => setStart(true)
    const preEl = document.getElementById("preloader-root")
    const isHidden = !preEl || getComputedStyle(preEl).display === "none"
    if (isHidden) setStart(true)
    else window.addEventListener("preloader:done", handler, { once: true })
    return () =>
      window.removeEventListener("preloader:done", handler as EventListener)
  }, [])

  return (
    <main className="relative z-10 flex-1 w-full flex items-center justify-center">
      <div
        className="max-w-xl sm:max-w-3xl text-center w-full"
        style={{ boxSizing: "border-box" }}
      >
        <div className="text-xs uppercase tracking-widest text-accent/90 mb-4">
          {texts.hero.label}
        </div>
        <motion.h1
          className="pb-2 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 12 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="block sm:inline">
            High-performance <span className="text-accent">Minecraft</span>
          </span>

          <TextType
            as="span"
            text={["plugins", "ecosystems", "server packs"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-accent"
            className="ml-3 inline font-extrabold leading-tight text-3xl sm:text-4xl md:text-6xl text-accent"
          />
        </motion.h1>
        <motion.p
          className="mt-4 text-sm md:text-base text-white/70 max-w-lg sm:max-w-2xl mx-auto leading-relaxed break-words"
          initial={{ opacity: 0, y: 12 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: texts.hero.paragraph }}
        />
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-lg sm:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="w-full sm:w-auto"
          >
            <Button
              as="a"
              href="https://dc.chunkware.com"
              target="_blank"
              rel="noreferrer noopener"
              borderRadius="1.25rem"
              containerClassName="w-full sm:w-auto"
              borderClassName="bg-[radial-gradient(var(--accent,#48A0F3)_30%,transparent_70%)] opacity-[0.95] shadow-lg"
              className="w-full text-center text-sm font-semibold bg-[rgba(8,8,10,0.6)] border border-white/10"
              duration={3000}
              aria-label="Join Chunkware Discord"
            >
              {texts.hero.cta_primary}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={start ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.6 }}
            className="w-full sm:w-auto"
          >
            <a
              className="w-full sm:w-auto text-center inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-medium border border-white/10 text-white/90 bg-[rgba(0,0,0,0.12)] hover:border-accent hover:text-accent transition-colors break-words"
              href="https://github.com/chunkware"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Follow Chunkware on GitHub"
            >
              {texts.hero.cta_secondary}
            </a>
          </motion.div>
        </div>
        {/* LogoLoop showing partner/tech logos */}
        <div className="mt-12 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={start ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <LogoLoop
                logos={texts.logos.items}
                speed={32}
                direction="left"
                logoHeight={28}
                gap={24}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={false}
                ariaLabel={texts.logos.aria_label}
                width="100%"
                className="mx-auto"
              />
            </motion.div>
          </div>
        </div>
        <div className="mt-16 opacity-90 text-xs tracking-widest">
          <span className="uppercase">{texts.preFooter}</span>
        </div>
      </div>
    </main>
  )
}
