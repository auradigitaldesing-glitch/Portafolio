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
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 cursor-pointer group"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h3>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                whileHover={{ scale: 1.1 }}
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <FaExternalLinkAlt size={18} />
              </motion.a>
            )}
          </div>

          <p className="text-gray-400 text-sm mb-6 font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-xs font-light border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Depth effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            transform: 'translateZ(-20px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
