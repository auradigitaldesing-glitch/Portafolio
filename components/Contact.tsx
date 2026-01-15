'use client'

import { motion } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
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
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-extralight text-white mb-16 tracking-tight"
        >
          ¿Hablamos?
        </motion.h2>

        {/* Email as protagonist */}
        <motion.a
          href="mailto:atapiarubio487@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ y: -2 }}
          className="inline-block text-2xl md:text-3xl text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-extralight tracking-wide mb-12"
        >
          atapiarubio487@gmail.com
        </motion.a>
        
        {/* Subtle secondary text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm text-gray-600 font-extralight tracking-wider uppercase"
        >
          Disponible para trabajo remoto, híbrido o en oficina
        </motion.p>
      </motion.div>
    </section>
  )
}

