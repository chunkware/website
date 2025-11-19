import Aurora from "./components/ui/Aurora"

import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen w-full min-w-0 box-border flex flex-col items-center justify-center overflow-x-hidden bg-[#08080a] text-white px-4 sm:px-6">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#5b21b6", "#a855f7", "#ec4899"]}
          blend={0.9}
          amplitude={0.8}
          speed={0.45}
        />
      </div>

      <Header />

      <Hero />

      <Footer />
    </div>
  )
}

export default App
