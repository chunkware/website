import texts from "../lib/config"

export const Header = () => {
  return (
    <header className="w-full z-20 relative">
      <nav className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/chunkware"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 opacity-95"
          >
            <img
              src="/icon_light__transparent.svg"
              alt="chunkware.com logo"
              className="h-12 w-auto block"
            />
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm opacity-80">
          {texts.nav.items &&
            texts.nav.items.map((item, idx) => (
              <li key={idx}>{item?.title}</li>
            ))}
        </ul>
      </nav>
    </header>
  )
}
