'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Elvira Strategy — Web',
    description: 'Diseño web con enfoque visual',
    tags: ['Web', 'Visual'],
    liveUrl: '#',
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    
    mouseX.set(x * 0.2)
    mouseY.set(y * 0.2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer group"
      >
        {/* Subtle background glow */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700"
          animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
        />

        <div className="relative z-10">
          {/* Project number / index */}
          <div className="mb-8">
            <span className="text-6xl md:text-7xl font-extralight text-gray-900 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title - more prominent */}
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl font-extralight text-white group-hover:text-cyan-400 transition-colors duration-500 leading-tight mb-3">
              {project.title}
            </h3>
            {/* Single line description */}
            <p className="text-sm text-gray-500 font-light">
              {project.description}
            </p>
          </div>

          {/* Tags - more minimal */}
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 font-extralight tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* External link - more subtle */}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              whileHover={{ x: 4 }}
              className="absolute top-0 right-0 text-gray-700 hover:text-cyan-400 transition-colors mt-2"
            >
              <FaExternalLinkAlt size={14} />
            </motion.a>
          )}
        </div>

        {/* Subtle border on hover */}
        <motion.div
          className="absolute inset-0 border border-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderColor: 'rgba(6, 182, 212, 0.2)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="relative min-h-screen py-40 px-6 md:px-12">
      {/* Visual separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
