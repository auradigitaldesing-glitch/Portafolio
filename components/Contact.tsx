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
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.a
          href="mailto:atapiarubio487@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-4 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors"
          >
            <FaEnvelope size={18} />
          </motion.div>
          <span className="text-lg md:text-xl font-light tracking-wide">
            atapiarubio487@gmail.com
          </span>
        </motion.a>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-sm text-gray-500 font-light"
        >
          Disponible para trabajo remoto, híbrido o en oficina
        </motion.p>
      </motion.div>
    </section>
  )
}

