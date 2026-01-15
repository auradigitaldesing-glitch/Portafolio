'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-40">
      {/* Visual separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-2xl md:text-3xl text-gray-400 font-extralight leading-relaxed tracking-tight">
          Diseñador digital enfocado en web,
          <br />
          visual y motion.
          <br />
          Interesado en crear experiencias claras
          <br />
          y bien pensadas.
        </p>
      </motion.div>
    </section>
  )
}

