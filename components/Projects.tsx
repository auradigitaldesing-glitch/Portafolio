'use client'

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Elvira Strategy — Web',
    description:
      'Diseño web con enfoque en claridad, cercanía y experiencia visual desde el primer contacto.',
    tags: ['Web', 'Visual'],
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'RXLab — Web Design',
    description:
      'Interfaz para plataforma de salud, pensada para jerarquía visual, lectura clara y uso sencillo.',
    tags: ['Web', 'Visual'],
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Retrato ilustrado',
    description:
      'Exploración visual a partir de forma, color y composición.',
    tags: ['Ilustración', 'Visual'],
  },
  {
    id: 4,
    title: 'Contenido visual para redes',
    description:
      'Serie de piezas gráficas creadas para comunicar ideas de forma directa y visual.',
    tags: ['Contenido', 'Visual'],
  },
  {
    id: 5,
    title: 'Elvira Strategy — Motion',
    description:
      'Pieza de motion y edición de video como extensión de la identidad visual.',
    tags: ['Motion', 'Visual'],
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Proyectos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="Ver código en GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="Ver proyecto en vivo"
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

