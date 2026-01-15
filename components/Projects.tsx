'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as useScrollTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  images?: string[] // Para proyectos con imágenes integradas
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Elvira Strategy — Web',
    description: 'Diseño web con enfoque visual',
    tags: ['Web', 'Visual'],
    liveUrl: '/elvira',
  },
  {
    id: 2,
    title: 'RXLab — Web Design',
    description: 'Interfaz para plataforma de salud',
    tags: ['Web', 'Visual'],
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Ilustración digital',
    description: 'Exploración visual',
    tags: ['Ilustración', 'Visual'],
    images: ['/images/Ilustraciones-01.png', '/images/Ilustraciones-02.png'],
  },
  {
    id: 4,
    title: 'Contenido visual para redes',
    description: 'Piezas gráficas para comunicación',
    tags: ['Contenido', 'Visual'],
  },
  {
    id: 5,
    title: 'Motion / Video',
    description: 'Edición y motion básico',
    tags: ['Motion', 'Visual'],
  },
]

function IllustrationBlock({ image, index }: { image: string; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  })

  const opacity = useScrollTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useScrollTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96])
  const y = useScrollTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])

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
      className="relative py-16 md:py-24"
    >
      <div ref={ref} className="relative w-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-auto"
        >
          <img
            src={image}
            alt={`Ilustración ${index + 1}`}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  })

  const opacity = useScrollTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useScrollTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <>
      <motion.div
        ref={itemRef}
        style={{
          opacity,
          y,
        }}
        className="relative py-32 md:py-40"
      >
        <div ref={ref} className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Project number - large and subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-8xl md:text-9xl font-extralight text-gray-900 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Title - prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <h3 className="text-4xl md:text-6xl font-extralight text-white leading-tight mb-3">
              {project.title}
            </h3>
            <p className="text-base md:text-lg text-gray-500 font-extralight">
              {project.description}
            </p>
          </motion.div>

          {/* Tags - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 font-extralight tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* External link - subtle */}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ x: 4 }}
              className="absolute top-32 right-6 md:right-12 text-gray-700 hover:text-cyan-400 transition-colors"
            >
              <FaExternalLinkAlt size={16} />
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Render illustrations if this project has images */}
      {project.images && project.images.map((image, imgIndex) => (
        <IllustrationBlock key={imgIndex} image={image} index={imgIndex} />
      ))}
    </>
  )
}

export default function Projects() {
  return (
    <section className="relative w-full">
      {/* Subtle section marker - not a hard separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      
      {/* Projects list - editorial flow */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
