'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Mi Portafolio
            </h3>
            <p className="text-gray-400">
              Desarrollador apasionado por crear soluciones digitales
              innovadoras.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#proyectos"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:tu@email.com"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaEnvelope />
                <span>tu@email.com</span>
              </a>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Hecho con <FaHeart className="text-red-500" /> en {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

