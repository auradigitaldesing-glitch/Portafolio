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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])

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
      className="relative min-h-screen flex items-center justify-center px-6 py-40"
    >
      <div ref={ref} className="relative w-full max-w-7xl mx-auto">
        {/* Media - almost full screen */}
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden">
          {item.type === 'image' ? (
            <motion.img
              src={item.src}
              alt={item.alt || ''}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={inView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <motion.video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={inView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Caption - floating text */}
        {item.caption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-8 left-6 md:left-12"
          >
            <p className="text-sm md:text-base text-gray-400 font-extralight tracking-wide">
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
      {/* Project title - appears once at start */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen flex items-center justify-center px-6 py-40"
      >
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-6 tracking-tight">
            {title}
          </h1>
        </div>
      </motion.div>

      {/* Media sequence */}
      <div className="relative">
        {media.map((item, index) => (
          <MediaBlock key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

