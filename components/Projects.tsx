'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  images?: string[] // Para proyectos con imágenes integradas
  externalUrl?: string // URL externa para botón
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Elvira Strategy — Web',
    description: 'Diseño web con enfoque visual',
    tags: ['Web', 'Visual'],
    images: ['/images/elvira.png', '/images/Elvira2.png'],
    externalUrl: 'https://www.elvirastrategy.com/',
  },
  {
    id: 2,
    title: 'RXLab — Web Design',
    description: 'Interfaz para plataforma de salud',
    tags: ['Web', 'Visual'],
    images: ['/images/Rxlab2.png', '/images/Rxlab1.png'],
    externalUrl: 'https://pymes.rxlab.mx/',
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
    images: [
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4-fantasticos.png',
      '/images/5.jpg',
      '/images/6.jpg',
      '/images/7.jpg',
      '/images/9.jpg',
      '/images/10.jpg',
      '/images/11.jpeg',
      '/images/12.jpeg',
      '/images/13.jpeg',
    ],
  },
  {
    id: 5,
    title: 'Motion / Video',
    description: 'Edición y motion básico',
    tags: ['Motion', 'Visual'],
  },
]

function ProjectWithImages({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Calcular opacidad de cada imagen
  const image1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0])
  const image2Opacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0, 1, 1])

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Sticky container - se queda fijo mientras cambian las imágenes */}
      <div className="sticky top-0 min-h-screen flex items-center py-32 md:py-40">
        <div ref={ref} className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="relative z-10">
              {/* Project number */}
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

              {/* Title */}
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

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-4 mb-8"
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

              {/* Button to external site if exists */}
              {project.externalUrl && (
                <motion.a
                  href={project.externalUrl}
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
              )}
            </div>

            {/* Right side - Images that change on scroll */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-[70vh]">
              {project.images?.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  style={{
                    opacity: imgIndex === 0 ? image1Opacity : image2Opacity,
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.img
                    src={image}
                    alt={`${project.title} ${imgIndex + 1}`}
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
  )
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Si tiene imágenes, usar el componente especial con sticky scroll
  if (project.images) {
    return <ProjectWithImages project={project} index={index} />
  }

  return (
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
