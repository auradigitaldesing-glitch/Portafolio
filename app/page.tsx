import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}
