# 🚀 Mi Portafolio

Un portafolio moderno y elegante construido con Next.js, TypeScript y Tailwind CSS. Perfecto para mostrar tus proyectos personales de manera profesional.

## ✨ Características

- 🎨 Diseño moderno y responsivo
- ⚡ Optimizado para rendimiento con Next.js
- 📱 Completamente responsive (móvil, tablet, desktop)
- 🌙 Tema oscuro elegante
- 🎭 Animaciones suaves y transiciones
- 🔗 Enlaces a GitHub y redes sociales
- 📧 Sección de contacto

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Icons** - Iconos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/portafolio.git
git push -u origin main
```

2. Ve a [Vercel](https://vercel.com) y crea una cuenta o inicia sesión.

3. Haz clic en "New Project" y conecta tu repositorio de GitHub.

4. Vercel detectará automáticamente que es un proyecto Next.js.

5. Haz clic en "Deploy" y espera a que se complete el despliegue.

6. ¡Listo! Tu portafolio estará en línea.

### Opción 2: Desde la CLI de Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. En el directorio del proyecto, ejecuta:
```bash
vercel
```

3. Sigue las instrucciones en la terminal.

## 📝 Personalización

### Cambiar información personal

1. **Header** (`components/Header.tsx`):
   - Actualiza los enlaces de GitHub, LinkedIn y email
   - Cambia el nombre del portafolio

2. **Hero** (`components/Hero.tsx`):
   - Modifica el título y descripción
   - Ajusta los textos de los botones

3. **Projects** (`components/Projects.tsx`):
   - Edita el array `projects` con tus proyectos reales
   - Actualiza las tecnologías, descripciones y enlaces

4. **Footer** (`components/Footer.tsx`):
   - Cambia la información de contacto
   - Actualiza los enlaces sociales

### Cambiar colores

Los colores principales están definidos en `tailwind.config.js`. Puedes modificar la paleta de colores en la sección `theme.extend.colors.primary`.

## 📁 Estructura del Proyecto

```
portafolio/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/
│   ├── Header.tsx      # Navegación
│   ├── Hero.tsx        # Sección principal
│   ├── Projects.tsx    # Sección de proyectos
│   └── Footer.tsx      # Pie de página
├── public/             # Archivos estáticos
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Agregar más proyectos

Para agregar más proyectos, edita el array `projects` en `components/Projects.tsx`:

```typescript
{
  id: 5,
  title: 'Mi Nuevo Proyecto',
  description: 'Descripción del proyecto...',
  technologies: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/tu-usuario/proyecto',
  liveUrl: 'https://mi-proyecto.vercel.app', // Opcional
}
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de hacer un fork y enviar un pull request.

---

Hecho con ❤️ usando Next.js y Tailwind CSS

