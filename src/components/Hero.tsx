import texts from "../lib/config"
import { LogoLoop } from "./ui/LogoLoop"
import { SplitText } from "./ui/SplitText"
import { Button } from "./ui/moving-border"

export const Hero = () => {
  return (
    <main className="relative z-10 flex-1 w-full flex items-center justify-center">
      <div
        className="max-w-xl sm:max-w-3xl text-center w-full"
        style={{ boxSizing: "border-box" }}
      >
        <div className="text-xs uppercase tracking-widest text-pink-300/80 mb-4">
          {texts.hero.label}
        </div>

        <SplitText
          text={texts.hero.headline}
          className="whitespace-pre-line break-words pb-2 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          delay={30}
          duration={0.7}
          ease="power3.out"
          splitType="lines"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.4}
          rootMargin="-120px"
          textAlign="center"
          tag="h1"
        />

        <p
          className="mt-4 text-sm md:text-base text-white/70 max-w-lg sm:max-w-2xl mx-auto leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: texts.hero.paragraph }}
        />
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-lg sm:max-w-none">
          <Button
            as="a"
            href="https://dc.chunkware.com"
            target="_blank"
            rel="noreferrer noopener"
            borderRadius="1.25rem"
            containerClassName="w-full sm:w-auto"
            className="w-full text-center text-sm font-semibold"
            duration={3000}
          >
            {texts.hero.cta_primary}
          </Button>
          <a
            className="w-full sm:w-auto text-center inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-medium border border-white/10 text-white/90 bg-black/20 break-words"
            href="https://github.com/chunkware"
            target="_blank"
            rel="noreferrer noopener"
          >
            {texts.hero.cta_secondary}
          </a>
        </div>

        {/* LogoLoop showing partner/tech logos */}
        <div className="mt-12 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <LogoLoop
              logos={texts.logos.items}
              speed={32}
              direction="left"
              logoHeight={28}
              gap={24}
              hoverSpeed={0}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="rgba(8,8,10,1)"
              ariaLabel={texts.logos.aria_label}
              width="100%"
              className="mx-auto"
            />
          </div>
        </div>

        <div className="mt-16 opacity-90 text-xs tracking-widest">
          <span className="uppercase">
            {texts.preFooter}
          </span>
        </div>
      </div>
    </main>
  )
}
