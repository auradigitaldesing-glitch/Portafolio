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
  vimeoVideos?: string[] // Para proyectos con videos de Vimeo (IDs)
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
    description: 'Selección de trabajos en video',
    tags: ['Motion', 'Video'],
    vimeoVideos: [
      '1154880203', // Video 1
      '1154880225', // Video 2
      '1154880240', // Video 3
      '1154880257', // Video 4
      '1154880283', // Video 5 (horizontal)
    ],
  },
]

function ProjectWithImages({ project, index }: { project: Project; index: number }) {
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

  return (
    <motion.div
      ref={itemRef}
      style={{
        opacity,
        y,
      }}
      className="relative py-32 md:py-40"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
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

        {/* Title and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-4xl md:text-6xl font-extralight text-white leading-tight mb-3">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-gray-500 font-extralight mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 font-extralight tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Button to external site if exists */}
          {project.externalUrl && (
            <motion.a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-lg font-extralight tracking-wide transition-colors duration-300"
            >
              Ver sitio en vivo
            </motion.a>
          )}
        </motion.div>

        {/* Images grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {project.images?.map((image, imgIndex) => (
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: imgIndex * 0.1 }}
              className="relative w-full aspect-square bg-black rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`${project.title} ${imgIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function VimeoEmbed({ videoId }: { videoId: string }) {
  // Extraer ID de Vimeo si viene como URL completa
  const getIdFromUrl = (urlOrId: string): string => {
    if (urlOrId.includes('vimeo.com')) {
      const match = urlOrId.match(/vimeo\.com\/(\d+)/)
      return match ? match[1] : urlOrId
    }
    return urlOrId
  }

  const id = getIdFromUrl(videoId)
  const embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&controls=1&background=0&responsive=1`

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        title={`Vimeo video ${id}`}
        loading="lazy"
      />
    </div>
  )
}

function ProjectWithVimeo({ project, index }: { project: Project; index: number }) {
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

  return (
    <motion.div
      ref={itemRef}
      style={{
        opacity,
        y,
      }}
      className="relative py-32 md:py-40"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
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

        {/* Title and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-4xl md:text-6xl font-extralight text-white leading-tight mb-3">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-gray-500 font-extralight mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 font-extralight tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Vimeo videos grid - más grande como las imágenes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {project.vimeoVideos && project.vimeoVideos.length > 0 ? (
            project.vimeoVideos.map((videoId, videoIndex) => (
              <motion.div
                key={videoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: videoIndex * 0.1 }}
                className="w-full"
              >
                <VimeoEmbed videoId={videoId} />
              </motion.div>
            ))
          ) : null}
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

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Si tiene videos de Vimeo, usar el componente especial
  if (project.vimeoVideos) {
    return <ProjectWithVimeo project={project} index={index} />
  }

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
