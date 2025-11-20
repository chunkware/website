/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Przekieruj samo /docs na /docs w drugiej apce
        source: "/docs",
        destination: "https://docs-chi-blond.vercel.app/docs",
      },
      {
        // Przekieruj wszystko głębiej (/docs/intro, /docs/api itp.)
        source: "/docs/:path*",
        destination: "https://docs-chi-blond.vercel.app/docs/:path*",
      },
    ]
  },
}

export default nextConfig
