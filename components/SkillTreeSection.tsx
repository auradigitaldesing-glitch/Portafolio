'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Skill {
  name: string
  shortName?: string
  level: number
  maxLevel: number
}

const skills: Skill[] = [
  { name: 'Illustrator', level: 4, maxLevel: 5 },
  { name: 'Photoshop', level: 4, maxLevel: 5 },
  { name: 'After Effects', level: 4, maxLevel: 5 },
  { name: 'Premiere Pro', level: 4, maxLevel: 5 },
  { name: 'Figma', level: 5, maxLevel: 5 },
  { name: 'Canva', level: 5, maxLevel: 5 },
  { name: 'Affinity', level: 4, maxLevel: 5 },
  { name: 'Producción audiovisual', shortName: 'Producción AV', level: 4, maxLevel: 5 },
  { name: 'Páginas hechas con código', shortName: 'Código Web', level: 4, maxLevel: 5 },
  { name: 'Manejo de IA', shortName: 'IA', level: 5, maxLevel: 5 },
]

// Posiciones radiales desktop (% del contenedor cuadrado) — círculo perfecto R=40%
const desktopPositions = [
  { x: 50, y: 10 },  // Illustrator — arriba centro
  { x: 74, y: 18 },  // Photoshop — arriba derecha
  { x: 88, y: 38 },  // After Effects — derecha superior
  { x: 88, y: 62 },  // Premiere Pro — derecha inferior
  { x: 74, y: 82 },  // Figma — abajo derecha
  { x: 50, y: 90 },  // Canva — abajo centro
  { x: 26, y: 82 },  // Affinity — abajo izquierda
  { x: 12, y: 62 },  // Producción AV — izquierda inferior
  { x: 12, y: 38 },  // Código Web — izquierda superior
  { x: 26, y: 18 },  // IA — arriba izquierda
]

const CENTER = { x: 50, y: 50 }

/* ── Indicador visual de 5 pips ── */
function SkillPips({ level, maxLevel, isMaxed }: { level: number; maxLevel: number; isMaxed: boolean }) {
  return (
    <div className="flex gap-1 justify-center mt-1.5">
      {Array.from({ length: maxLevel }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rotate-45 border transition-colors duration-300 ${
            i < level
              ? isMaxed
                ? 'bg-amber-400 border-amber-300'
                : 'bg-cyan-400 border-cyan-300'
              : 'bg-transparent border-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

/* ── Nodo diamante desktop ── */
function DesktopNode({ skill, position, index }: { skill: Skill; position: { x: number; y: number }; index: number }) {
  const isMaxed = skill.level === skill.maxLevel
  const label = skill.shortName || skill.name

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.07, type: 'spring', stiffness: 200 }}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <motion.div
        whileHover={{ scale: 1.12 }}
        whileFocus={{ scale: 1.12 }}
        tabIndex={0}
        role="listitem"
        aria-label={`Habilidad ${skill.name} nivel ${skill.level} de ${skill.maxLevel}`}
        className="outline-none cursor-default"
      >
        <div
          className={`w-[110px] h-[110px] rotate-45 border-2 flex items-center justify-center transition-all duration-300 ${
            isMaxed
              ? 'border-amber-400/60 bg-amber-500/10 shadow-[0_0_30px_rgba(251,191,36,0.25)]'
              : 'border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_20px_rgba(0,255,255,0.1)]'
          }`}
        >
          <div className="-rotate-45 text-center px-1">
            <p className={`text-[11px] font-medium leading-tight ${isMaxed ? 'text-amber-300' : 'text-cyan-300'}`}>
              {label}
            </p>
            <p className={`text-base font-bold mt-0.5 ${isMaxed ? 'text-amber-400' : 'text-white'}`}>
              {skill.level}/{skill.maxLevel}
            </p>
            <SkillPips level={skill.level} maxLevel={skill.maxLevel} isMaxed={isMaxed} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Tarjeta mobile ── */
function MobileCard({ skill, index }: { skill: Skill; index: number }) {
  const isMaxed = skill.level === skill.maxLevel

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      role="listitem"
      aria-label={`Habilidad ${skill.name} nivel ${skill.level} de ${skill.maxLevel}`}
      className={`relative p-4 border text-center transition-all duration-300 ${
        isMaxed
          ? 'border-amber-400/40 bg-amber-400/5'
          : 'border-cyan-400/25 bg-cyan-400/5'
      }`}
      style={{ clipPath: 'polygon(10% 0%,90% 0%,100% 10%,100% 90%,90% 100%,10% 100%,0% 90%,0% 10%)' }}
    >
      <p className={`text-xs font-medium ${isMaxed ? 'text-amber-300' : 'text-cyan-300'}`}>{skill.name}</p>
      <p className={`text-xl font-bold mt-1 ${isMaxed ? 'text-amber-400' : 'text-white'}`}>
        {skill.level}/{skill.maxLevel}
      </p>
      <SkillPips level={skill.level} maxLevel={skill.maxLevel} isMaxed={isMaxed} />
    </motion.div>
  )
}

/* ── Líneas SVG centro → nodos ── */
function Lines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {desktopPositions.map((pos, i) => (
        <motion.line
          key={i}
          x1={CENTER.x} y1={CENTER.y}
          x2={pos.x} y2={pos.y}
          stroke="rgba(0,255,255,0.15)"
          strokeWidth="0.2"
          filter="url(#lineGlow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
        />
      ))}
    </svg>
  )
}

/* ── Componente principal ── */
export default function SkillTreeSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="relative w-full py-16 md:py-32 px-4 overflow-hidden">
      {/* HUD grid de fondo */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extralight text-white text-center tracking-tight mb-6 md:mb-4"
      >
        Skills
      </motion.h2>

      {/* ═══ DESKTOP: layout radial ═══ */}
      <div className="hidden md:block relative max-w-4xl mx-auto aspect-square">
        <Lines />

        {/* Nodo central */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="w-[150px] h-[150px] rotate-45 border-2 border-cyan-400/50 bg-black/80 shadow-[0_0_40px_rgba(0,255,255,0.15)] flex items-center justify-center">
            <div className="-rotate-45 text-center">
              <p className="text-base font-light text-white tracking-wider">Alfonso Tapia</p>
              <div className="w-10 h-px bg-cyan-400/40 mx-auto my-2" />
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Habilidades</p>
              <p className="text-[10px] text-cyan-400/60 mt-1">Máx nivel: 5</p>
            </div>
          </div>
        </motion.div>

        <div role="list" aria-label="Árbol de habilidades">
          {skills.map((s, i) => (
            <DesktopNode key={i} skill={s} position={desktopPositions[i]} index={i} />
          ))}
        </div>
      </div>

      {/* ═══ MOBILE: grid 2 columnas ═══ */}
      <div className="block md:hidden mt-4">
        {/* Diamante central mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="w-[110px] h-[110px] rotate-45 border-2 border-cyan-400/50 bg-black/80 shadow-[0_0_25px_rgba(0,255,255,0.15)] flex items-center justify-center">
            <div className="-rotate-45 text-center">
              <p className="text-sm font-light text-white tracking-wider">Alfonso Tapia</p>
              <div className="w-8 h-px bg-cyan-400/40 mx-auto my-1.5" />
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.15em]">Habilidades</p>
              <p className="text-[9px] text-cyan-400/60 mt-0.5">Máx nivel: 5</p>
            </div>
          </div>
        </motion.div>

        <div role="list" aria-label="Lista de habilidades" className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {skills.map((s, i) => (
            <MobileCard key={i} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
