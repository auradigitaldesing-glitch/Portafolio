'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
}

interface ProjectShowcaseProps {
  title: string
  media: MediaItem[]
}

function MediaBlock({ item, index }: { item: MediaItem; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <motion.div
      ref={blockRef}
      style={{
        opacity,
        scale,
        y,
      }}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-6"
    >
      <div ref={ref} className="relative w-full">
        {/* Media - almost full screen, no max-width constraint */}
        <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
          {item.type === 'image' ? (
            <motion.img
              src={item.src}
              alt={item.alt || ''}
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={inView ? { scale: 1 } : { scale: 1.15 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <motion.video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={inView ? { scale: 1 } : { scale: 1.15 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          
          {/* Very subtle overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Caption - floating text, more minimal */}
        {item.caption && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 md:bottom-8 left-6 md:left-12 pointer-events-none"
          >
            <p className="text-xs md:text-sm text-gray-400 font-extralight tracking-wider uppercase">
              {item.caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectShowcase({ title, media }: ProjectShowcaseProps) {
  return (
    <section className="relative w-full">
      {/* Project title - appears once at start, more editorial */}
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
            className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white tracking-tight leading-[0.95]"
          >
            {title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Media sequence - no gaps, continuous flow */}
      <div className="relative">
        {media.map((item, index) => (
          <MediaBlock key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
