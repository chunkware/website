const config = {
  brandName: "Chunkware",
  nav: {
    items: [
      //   { title: "Projects", href: "/showcase" },
      //   { title: "Docs", href: "/docs" },
    ] as Array<{ title: string; href?: string }>,
    cta_join_discord: "Join Community",
  },
  hero: {
    label: "Coming Soon",
    headline: "High-performance Minecraft plugins, server packs & ecosystems",
    paragraph:
      "Chunkware is crafting the next generation of Minecraft assets: optimized plugins, immersive server setups, scripts, and custom 3D models.<br/>We are currently working on shipping <strong>cw-hub, cw-economy</strong> and <strong>cw-investments</strong> plugins.<br/>Join our Discord to follow the development and shape the roadmap.",
    cta_primary: "Join Community",
    cta_secondary: "Follow GitHub",
  },
  logos: {
    aria_label: "Technology stack",
    items: [
      {
        src: "/icons/devicon--kotlin.svg",
        title: "Kotlin",
        href: "https://kotlinlang.org",
      },
      {
        src: "/icons/mdi--minecraft.svg",
        title: "Minecraft",
        href: "https://minecraft.net",
      },
      {
        src: "/icons/devicon--java.svg",
        title: "Java",
        href: "https://java.com",
      },
      {
        src: "/icons/devicon--typescript.svg",
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
      },
      {
        src: "/icons/devicon--tailwindcss.svg",
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
      },
      { src: "/icons/devicon--bun.svg", title: "Bun", href: "https://bun.sh" },
      {
        src: "/icons/devicon--javascript.svg",
        title: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        src: "/icons/devicon--nextjs.svg",
        title: "Next.js",
        href: "https://nextjs.org",
      },
      {
        src: "/icons/devicon--gradle.svg",
        title: "Gradle",
        href: "https://gradle.org",
      },
      {
        src: "/icons/devicon--github.svg",
        title: "GitHub",
        href: "https://github.com",
      },
      {
        src: "/icons/devicon--python.svg",
        title: "Python",
        href: "https://python.org",
      },
    ],
  },
  preFooter: "For Minecraft enthusiasts worldwide.",
  footer: {
    made_with: "Crafted with ❤️ and code by kznlabs",
    credit_name: "kznlabs",
  },
  misc: {
    built_by_line:
      "Chunkware — Premium Minecraft plugins & server solutions built by enthusiasts.",
  },
}

export default config
