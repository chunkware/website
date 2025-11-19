import texts from "../lib/config"

export const Footer = () => {
  return (
    <footer className="w-full z-20 relative py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-xs text-white/60">
        {texts.footer.made_with.split("kznlabs").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 ? (
              <a
                className="underline ml-1"
                href="https://kznlabs.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                {texts.footer.credit_name}
              </a>
            ) : null}
          </span>
        ))}
      </div>
    </footer>
  )
}
