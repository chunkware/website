import type { Metadata } from "next"
import "./globals.css"
import Preloader from "../components/Preloader"

export const metadata: Metadata = {
  title: "Chunkware.com - Coming Soon",
  description: "Teaser and preview for Chunkware.com",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const metaTitle = (metadata.title as string) ?? "Chunkware"
  const metaDescription = (metadata.description as string) ?? ""

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <meta name="theme-color" content="#08080a" />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://chunkware.com/" />

        {/* Favicon & touch icon (use new icon_ assets; switch for light/dark) */}
        <link
          rel="icon"
          href="/icon_light__transparent.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icon_dark__transparent.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/icon_light__transparent.svg"
        />
        <link rel="apple-touch-icon" href="/icon_light__transparent.svg" />
        <link
          rel="apple-touch-icon"
          href="/icon_dark__transparent.svg"
          media="(prefers-color-scheme: dark)"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />

        {/* Umami analytics (cloud) */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="546047db-4fe3-4fe6-bfaa-bd6ddfe855c2"
        ></script>
      </head>
      <body>
        {/* Server-rendered preloader element (visible before JS loads) */}
        <div
          id="preloader-root"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(313deg, #1f1d1d, #302e2e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <img
            src="/loader_light.gif"
            alt="Loading"
            style={{ height: 128, width: 128, objectFit: "contain" }}
          />
        </div>

        {/* Client-side preloader controller */}
        <Preloader />

        {children}
      </body>
    </html>
  )
}
