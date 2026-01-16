'use client'

import { useRef, useState } from 'react'
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
  videos?: string[] // Para proyectos con videos
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
    videos: [
      '/videos/1.mp4',
      '/videos/2.mp4',
      '/videos/3.mp4',
      '/videos/4.mp4',
      '/videos/5.mp4',
    ],
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

  const imageCount = project.images?.length || 0
  
  // Calcular opacidades para todas las imágenes usando useMemo y useTransform
  const imageOpacities = project.images?.map((_, imgIndex) => {
    if (imageCount === 0) return useTransform(scrollYProgress, [0, 1], [1, 1])
    
    const segmentSize = 1 / imageCount
    const start = imgIndex * segmentSize
    const fadeIn = start + segmentSize * 0.1
    const fadeOut = start + segmentSize * 0.9
    
    return useTransform(
      scrollYProgress,
      [Math.max(0, fadeIn - 0.1), fadeIn, fadeOut, Math.min(1, fadeOut + 0.1)],
      [0, 1, 1, 0]
    )
  }) || []

  // Ajustar altura del contenedor según número de imágenes
  const containerHeight = imageCount > 2 ? `${100 + (imageCount - 2) * 50}vh` : '200vh'
  
  return (
    <div ref={containerRef} style={{ minHeight: containerHeight }} className="relative">
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
                    opacity: imageOpacities[imgIndex],
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

function VideoPlayer({ src, index, size = 'normal' }: { src: string; index: number; size?: 'large' | 'normal' | 'small' }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }

  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2 aspect-video',
    normal: 'aspect-video',
    small: 'aspect-square'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative w-full ${sizeClasses[size]} bg-black rounded-lg overflow-hidden group cursor-pointer`}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Audio indicator */}
      {isMuted && (
        <div className="absolute top-3 right-3 bg-black/80 rounded-full p-2.5 backdrop-blur-sm">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343l11.314 11.314M6.343 17.657L17.657 6.343" />
          </svg>
        </div>
      )}
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}

function ProjectWithVideos({ project, index }: { project: Project; index: number }) {
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

        {/* Video grid - Editorial layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"
        >
          {project.videos && project.videos.length > 0 ? (
            project.videos.map((video, videoIndex) => {
              // Layout asimétrico: primer video más grande, otros distribuidos
              let size: 'large' | 'normal' | 'small' = 'normal'
              if (videoIndex === 0) {
                size = 'large'
              } else if (videoIndex === project.videos.length - 1 && project.videos.length > 3) {
                size = 'normal'
              }
              
              return (
                <VideoPlayer 
                  key={videoIndex} 
                  src={video} 
                  index={videoIndex}
                  size={size}
                />
              )
            })
          ) : (
            <p className="text-gray-500">No hay videos disponibles</p>
          )}
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

  // Si tiene videos, usar el componente especial con grid
  if (project.videos) {
    return <ProjectWithVideos project={project} index={index} />
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
