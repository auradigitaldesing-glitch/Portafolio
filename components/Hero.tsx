'use client'

import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div
        className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">
          Hola, soy{' '}
          <span className="text-white">Desarrollador</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
          Creando experiencias digitales increíbles con código
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up">
          Bienvenido a mi portafolio. Aquí encontrarás algunos de mis proyectos
          personales y trabajos más destacados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#proyectos"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
          >
            Ver Proyectos
          </a>
          <a
            href="#contacto"
            className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
          >
            Contactar
          </a>
        </div>
        <div className="mt-16 animate-bounce">
          <a
            href="#proyectos"
            className="inline-block text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="Scroll down"
          >
            <FaArrowDown size={32} />
          </a>
        </div>
      </div>
    </section>
  )
}

