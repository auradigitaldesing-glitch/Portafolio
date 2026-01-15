'use client'

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Proyecto Ejemplo 1',
    description:
      'Una aplicación web moderna construida con las últimas tecnologías. Incluye funcionalidades avanzadas y una interfaz de usuario intuitiva.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'Proyecto Ejemplo 2',
    description:
      'Sistema de gestión con arquitectura escalable y diseño responsivo. Optimizado para rendimiento y experiencia de usuario.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Proyecto Ejemplo 3',
    description:
      'Aplicación móvil con funcionalidades en tiempo real. Implementa las mejores prácticas de desarrollo y diseño.',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    githubUrl: 'https://github.com',
  },
  {
    id: 4,
    title: 'Proyecto Ejemplo 4',
    description:
      'Plataforma web con integración de APIs externas y dashboard interactivo. Enfocado en usabilidad y accesibilidad.',
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Mis Proyectos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Aquí están algunos de mis proyectos personales. Cada uno representa
            un desafío único y una oportunidad de aprendizaje.
          </p>
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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    aria-label="Ver código en GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
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
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            ¿Quieres ver más proyectos?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700 hover:border-cyan-500/50"
          >
            <FaGithub />
            Ver más en GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

