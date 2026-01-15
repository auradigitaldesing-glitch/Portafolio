import ProjectShowcase from '@/components/ProjectShowcase'

// Reemplazar con tus imágenes/videos reales del proyecto Elvira Strategy
const elviraMedia = [
  {
    id: 1,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80',
    alt: 'Elvira Strategy - Homepage',
    caption: 'Diseño con enfoque visual',
  },
  {
    id: 2,
    type: 'video' as const,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Experiencia fluida',
  },
  {
    id: 3,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    alt: 'Elvira Strategy - Detail',
    caption: 'Jerarquía clara',
  },
  {
    id: 4,
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=80',
    alt: 'Elvira Strategy - Mobile',
  },
]

export default function ElviraPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Global background - same as hero */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-950 to-black -z-10" />
      
      {/* Floating orbs - continuous throughout */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain texture - global */}
      <div 
        className="fixed inset-0 opacity-[0.03] -z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <ProjectShowcase 
        title="Elvira Strategy — Web"
        media={elviraMedia}
      />
    </main>
  )
}
