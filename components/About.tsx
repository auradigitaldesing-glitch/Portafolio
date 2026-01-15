'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, y }}
      className="relative min-h-screen flex items-center justify-center px-6 py-40"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-2xl md:text-4xl text-gray-400 font-extralight leading-relaxed tracking-tight">
          Diseñador digital enfocado en web,
          <br />
          visual y motion.
          <br />
          Interesado en crear experiencias claras
          <br />
          y bien pensadas.
        </p>
      </motion.div>
    </motion.section>
  )
}
