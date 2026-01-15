'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
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

