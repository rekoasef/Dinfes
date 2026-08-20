# Dinfes

Sitio web de **DINFES S.H.** — diseño y fabricación de prensas hidráulicas, máquinas
especiales y recipientes sometidos a presión bajo Norma ASME VIII. Rosario, Santa Fe,
Argentina.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- [framer-motion](https://motion.dev) para las animaciones
- [Lenis](https://lenis.darkroom.engineering) para el scroll suave

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm run start    # servir el build
npm run lint     # eslint
```

## Estructura

```
src/
  app/                 rutas (App Router)
  components/
    motion/            primitivas de animación reutilizables
  lib/
    data/              catálogo de productos y datos del sitio
public/
  images/products/     fotos de producto
  images/gallery/      fotos de taller y equipos
  files/               fichas técnicas en PDF
```

## Animaciones

Toda la animación pasa por los componentes de `src/components/motion/`. Dos reglas:

- Los efectos ligados al scroll usan `whileInView`, nunca `animate`, para que se
  disparen cuando el lector llega a la sección y no al cargar la página.
- Para saber si hay que reducir el movimiento se usa `useReducedMotion` de
  `src/lib/useReducedMotion.ts`, **no** el de framer-motion: ese lee el media query
  durante el render y rompe la hidratación.

## Pendiente

- Panel de administración en Supabase para cargar productos (imagen, descripción,
  PDF y video de YouTube) sin tocar código.
- Reemplazar las fotos actuales por versiones en alta resolución: las de producto
  hoy miden como máximo 160 px, lo que limita cuánto pueden lucir en pantalla.
