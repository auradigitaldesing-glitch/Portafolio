'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ElviraPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const image1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0])
  const image2Opacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0, 1, 1])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const images = ['/images/elvira.png', '/images/Elvira2.png']

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Global background - same as hero */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-950 to-black -z-10" />
      
      {/* Floating orbs - continuous throughout */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain texture - global */}
      <div 
        className="fixed inset-0 opacity-[0.03] -z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Title section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white tracking-tight leading-[0.95] mb-6"
          >
            Elvira Strategy — Web
          </motion.h1>
        </div>
      </motion.div>

      {/* Sticky scroll section with images */}
      <div ref={containerRef} className="relative min-h-[200vh]">
        {/* Sticky container - se queda fijo mientras cambian las imágenes */}
        <div className="sticky top-0 min-h-screen flex items-center py-32 md:py-40">
          <div ref={ref} className="w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left side - Text content */}
              <div className="relative z-10">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl md:text-3xl font-extralight text-white leading-tight mb-4">
                    Diseño web con enfoque visual
                  </h2>
                  <p className="text-base md:text-lg text-gray-400 font-extralight leading-relaxed">
                    Diseño web para consultoría especializada en derechos humanos,
                    diversidad, equidad e inclusión.
                  </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <span className="text-xs text-gray-600 font-extralight tracking-wider uppercase">
                    Web
                  </span>
                  <span className="text-xs text-gray-600 font-extralight tracking-wider uppercase">
                    Visual
                  </span>
                </motion.div>

                {/* Button to live site */}
                <motion.a
                  href="https://www.elvirastrategy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-lg font-extralight tracking-wide transition-colors duration-300"
                >
                  Ver sitio en vivo
                </motion.a>
              </div>

              {/* Right side - Images that change on scroll */}
              <div className="relative w-full aspect-square md:aspect-auto md:h-[70vh]">
                {images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    style={{
                      opacity: imgIndex === 0 ? image1Opacity : image2Opacity,
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <motion.img
                      src={image}
                      alt={`Elvira Strategy ${imgIndex + 1}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
