'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="py-12 px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ¿Hablamos?
          </h3>
          <a
            href="mailto:atapiarubio487@gmail.com"
            className="text-xl md:text-2xl text-gray-300 hover:text-cyan-400 transition-colors inline-block mb-4"
          >
            atapiarubio487@gmail.com
          </a>
          <p className="text-gray-400 mt-6">
            Disponible para trabajo remoto, híbrido o en oficina.
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-8">
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

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Hecho con <FaHeart className="text-red-500" /> en {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

