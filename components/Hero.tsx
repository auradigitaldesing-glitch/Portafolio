'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-30, 30])
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-30, 30])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)
      
      mouseX.set(x * 0.1)
      mouseY.set(y * 0.1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Floating orbs for depth - blue background */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Visual mockups - Left side */}
      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] md:w-[500px] opacity-20 md:opacity-30"
      >
        <div className="relative">
          {/* Mockup 1 - Web interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-0 left-0 w-full aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-800/50 shadow-2xl"
          >
            <div className="p-4 space-y-2">
              <div className="h-2 bg-gray-700/50 rounded w-1/3"></div>
              <div className="h-2 bg-gray-700/30 rounded w-2/3"></div>
              <div className="h-2 bg-gray-700/30 rounded w-1/2"></div>
            </div>
          </motion.div>
          
          {/* Mockup 2 - Visual content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-32 left-8 w-3/4 aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/20 shadow-2xl"
          >
            <div className="p-4 grid grid-cols-2 gap-2 h-full">
              <div className="bg-gray-800/30 rounded"></div>
              <div className="bg-gray-800/30 rounded"></div>
              <div className="bg-gray-800/30 rounded"></div>
              <div className="bg-gray-800/30 rounded"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Visual mockups - Right side */}
      <motion.div
        style={{
          x: useTransform(smoothX, [-0.5, 0.5], [30, -30]),
          y: useTransform(smoothY, [-0.5, 0.5], [30, -30]),
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] md:w-[500px] opacity-20 md:opacity-30"
      >
        <div className="relative">
          {/* Mockup 3 - Motion/Video frame */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-0 right-0 w-full aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-800/50 shadow-2xl"
          >
            <div className="p-4 h-full flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-gray-700 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-gray-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Mockup 4 - Content grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-40 right-8 w-3/4 aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/20 shadow-2xl"
          >
            <div className="p-3 grid grid-cols-3 gap-1.5 h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800/30 rounded"></div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content - Centered */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-6 tracking-tight leading-[0.95]"
        >
          Diseño web, visual y motion
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-gray-400 font-extralight leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Trabajo entre diseño, contenido y movimiento
          <br />
          para crear experiencias digitales claras y funcionales.
        </motion.p>

        {/* Signature - Secondary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-white font-extralight tracking-wider"
        >
          Alfonso Tapia · CDMX
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-gray-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
