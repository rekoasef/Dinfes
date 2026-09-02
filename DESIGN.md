---
name: DINFES
description: El Plano de Taller — sistema visual de plano técnico para un fabricante de maquinaria hidráulica
colors:
  background: "#ffffff"
  foreground: "#0f1720"
  brand-50: "#f2f7fc"
  brand-100: "#e3ecf5"
  brand-200: "#c4d9ec"
  brand-300: "#97bcdc"
  brand-400: "#6398c8"
  brand-500: "#3272b5"
  brand-600: "#245b96"
  brand-700: "#1a4573"
  brand-800: "#123151"
  brand-900: "#0d1f36"
  brand-950: "#08111f"
  accent-50: "#fef6ed"
  accent-100: "#fde9d3"
  accent-200: "#fbcfa5"
  accent-300: "#f6b673"
  accent-400: "#f0983f"
  accent-500: "#e57a1f"
  accent-600: "#c85f0f"
  accent-700: "#a4490e"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  gutter: "1.25rem"
  gutter-sm: "2rem"
  section-y: "4rem"
  section-y-lg: "6rem"
  container-max: "82rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-500}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-600}"
    textColor: "#ffffff"
  button-ghost-dark:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-ghost-dark-hover:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "#ffffff"
  card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.brand-950}"
    rounded: "{rounded.2xl}"
    padding: "1.25rem"
  card-hover:
    backgroundColor: "{colors.background}"
    textColor: "{colors.brand-950}"
  surface-dark:
    backgroundColor: "{colors.brand-950}"
    textColor: "#ffffff"
  badge-media:
    backgroundColor: "rgba(8,17,31,0.7)"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.5rem"
  eyebrow:
    textColor: "{colors.accent-500}"
    typography: "{typography.label}"
---

# DESIGN.md — DINFES

## Overview

**El Plano de Taller.** El sistema se lee como la documentación técnica de un equipo, no como un folleto comercial. Los tres elementos que lo definen ya están en el código: la grilla de blueprint que corre por detrás de las secciones oscuras, el azul de plano técnico de la escala `brand`, y el naranja de señalética de máquina de la escala `accent`. La página es la mesa donde se despliega el plano; el equipo fabricado es lo que se muestra sobre ella.

De ahí salen las tres decisiones que gobiernan todo lo demás: **la interfaz no compite con la foto del equipo**, **el naranja es señal y no decoración**, y **la precisión vale más que la exuberancia**. Un control se siente como un instrumento bien hecho: responde exacto y no llama la atención sobre sí mismo.

Anti-referencia confirmada: el sitio corporativo genérico de fabricante — stock photography de handshakes, degradados azul-violeta, iconografía de líneas redondeadas. Nada de eso entra.

## Colors

**Primary — `brand` (azul de plano técnico).** Escala completa de 50 a 950. Los extremos son los que trabajan: `brand-950` (#08111f) es el fondo de toda superficie oscura — heros interiores, secciones de cierre, header, footer — y `brand-950`/`brand-900` son también el fondo de los marcos de imagen antes de que cargue la foto. `brand-50` es el gris azulado de las franjas claras alternadas. El medio de la escala (`brand-200` a `brand-500`) se usa casi solo en bordes de hover e iconos.

**Accent — `accent` (naranja de señalética).** `accent-500` (#e57a1f) es el único color de acción del sistema: CTA primario, línea del eyebrow, subrayado del ítem de navegación activo, barra de "Ver detalle" que sube desde el borde inferior de la tarjeta. `accent-600` es su hover; `accent-400` es la variante para fondo oscuro. **Nunca se usa como color de superficie grande** — es señal, y una señal que cubre media pantalla deja de señalar.

**Neutral — pendiente de tokenizar.** Los grises del cuerpo de texto (`slate-200` a `slate-600`) vienen de la escala `slate` por defecto de Tailwind, no del bloque `@theme`. Funcionan, pero no son tokens del proyecto: si mañana el azul de marca cambia de temperatura, los grises no lo acompañan. Tokenizarlos como `--color-ink-*` sesgados hacia el azul de `brand` es la deuda de color pendiente.

**Contraste — el punto débil del sistema, medido.** El naranja es más claro de lo que parece:

| Par | Ratio | AA (4.5:1) |
|---|---|---|
| blanco sobre `accent-500` — **prohibido, era el botón primario** | 2.94:1 | falla |
| blanco sobre `accent-600` | 4.12:1 | falla |
| blanco sobre `accent-700` | 5.94:1 | pasa |
| `brand-950` sobre `accent-500` | 6.43:1 | pasa |
| `accent-500` como texto sobre blanco | 2.94:1 | falla |
| `accent-700` como texto sobre blanco | 5.94:1 | pasa |
| `accent-500` sobre `brand-950` (eyebrow) | 6.43:1 | pasa |

**Lo implementado:** el botón primario es **texto `brand-950` sobre `accent-500`** (6.43:1) con hover a `accent-400` (8.35:1) — conserva el naranja exacto y de paso se ve más industrial que el blanco. Naranja como texto sobre superficie clara es siempre `accent-700` (5.94:1); sobre `brand-950` es `accent-500` o `accent-400`, las dos pasan holgadas. `SectionHeading` elige el tono solo, según su prop `tone`.

La otra salida válida, por si alguna vez hace falta texto blanco, es `accent-700` de fondo (5.94:1).

## Typography

Dos familias, cargadas con `next/font/google` y expuestas como variables CSS:

- **Space Grotesk** (`font-display`) — todos los títulos. Su carácter técnico-geométrico es lo que aleja al sitio del corporativo genérico. Siempre en 700, siempre con tracking negativo, siempre con `text-balance`.
- **Inter** (`font-sans`) — cuerpo, navegación, controles, datos. Nunca en títulos.

La escala real, medida en el código: h1 de hero `2.25rem → 3rem → 3.75rem` con `line-height: 1.05`; h2 de sección `1.875rem → 2.25rem → 2.75rem` con `1.1`; párrafo base `1rem` con `line-height: 1.625`; párrafo de entrada `1.125rem → 1.25rem`.

**El eyebrow es el detalle firma del sistema.** `0.75rem`, peso 600, `letter-spacing: 0.22em`, mayúsculas, precedido de una regla de 24px en `accent-500`. Aparece sobre cada título de sección y en cada hero. Está definido como clase `.eyebrow` en `globals.css` y se usa a través de `SectionHeading`.

Hay una inconsistencia registrada: el `h3` de `ProductCard` usa Inter a `0.875rem`/600, mientras que el `h3` de `CategoryCard` usa Space Grotesk a `1.25rem`/700. Son el mismo nivel jerárquico con dos tratamientos distintos.

## Layout

Contenedor único `.container-page`: ancho máximo `82rem`, gutter de `1.25rem` que pasa a `2rem` desde 640px. Todo el sitio pasa por él vía el componente `Container`.

Ritmo vertical: `py-16 sm:py-24` para secciones claras, `py-20 sm:py-28` para las oscuras de cierre. Las secciones alternan claro / `brand-50` / `brand-950` — esa alternancia es la que estructura la página, más que cualquier divisor.

Grillas: catálogo de categorías a `lg:grid-cols-3`, productos a `2 / 3 / 4` columnas según ancho, bloques editoriales a `lg:grid-cols-2` o `lg:grid-cols-[1fr_0.9fr]` cuando el peso visual tiene que caer del lado del texto. Breakpoints estándar de Tailwind; el sitio solo usa `sm`, `lg` y ocasionalmente `xl`.

El scroll es suave por Lenis, con una barra de progreso fija arriba y un botón de volver arriba que aparece pasado el primer viewport.

## Elevation & Depth

**Norma: plano y tonal.** La profundidad se construye con capas de tono y bordes, no con sombras. Una superficie se separa de otra porque cambia de valor — blanco sobre `brand-50`, `brand-50` sobre `brand-950` — y porque tiene un borde de 1px, no porque flote.

La sombra queda reservada para lo que realmente flota sobre el contenido: el diálogo de producto, el menú desplegable del header, el header sticky una vez que se despega del tope. Ahí la sombra es estructural y comunica orden de apilado.

**Esto es un cambio respecto de lo implementado.** Hoy las tarjetas de producto y categoría suben 6px al hover y tiran una `shadow-2xl` teñida de `brand-900/15`, y conviven tres vocabularios de sombra distintos (`shadow-sm`, `shadow-xl`, `shadow-2xl`) sin una regla que los separe. El trabajo futuro converge hacia la norma tonal: el hover cambia el borde y el valor de fondo, no la altura.

La profundidad atmosférica sí se queda, porque pertenece al Plano de Taller y no es sombra: la grilla de blueprint (`.bg-blueprint`, 72px; `.bg-blueprint-sm`, 24px), el ruido fractal de `.bg-noise`, el degradado aurora detrás de los heros, y el desenfoque de las fotos de fondo al 30% de opacidad.

## Shapes

Cuatro radios, cada uno con un rol: `rounded-lg` (0.5rem) para ítems de navegación y controles chicos; `rounded-xl` (0.75rem) para ítems de menú y botones en mobile; `rounded-2xl` (1rem) para tarjetas, marcos de imagen y paneles; `rounded-full` para CTAs, badges y chips.

El borde es el recurso estructural principal: `1px` en `slate-200` sobre claro, `1px` en `white/10` sobre oscuro. Las máscaras `.mask-fade-x` desvanecen los bordes de las tiras que scrollean horizontalmente.

Las imágenes del catálogo se muestran `object-contain` sobre una copia desenfocada y ampliada de sí mismas: las fuentes llegan a ser de 160px y estirarlas para llenar la tarjeta se veía roto. Es una solución deliberada, documentada en el código, y hay que preservarla mientras las fuentes sigan siendo chicas.

## Components

**Botón primario.** Fondo `accent-500`, texto blanco, `rounded-full`, `px-5 py-2` en header y `px-6 py-3` en cuerpo. Hover: `accent-600`, sin desplazamiento. Es el único elemento naranja sólido de cada pantalla.

**Botón fantasma sobre oscuro.** `bg-white/5`, borde `white/20`, texto blanco, `rounded-full`. Es el secundario en las secciones de cierre; nunca aparece sobre fondo claro.

**Tarjeta de categoría.** Foto en `4/3` con degradado desde `brand-950`, título en Space Grotesk sobre la imagen, contador de equipos como chip arriba a la izquierda, flecha en círculo `accent-500` que entra al hover, y descripción + "Ver productos" en el cuerpo blanco. La foto tiene una contra-deriva de parallax del ±6% ligada al scroll.

**Tarjeta de producto.** Es un `<button>` que abre el diálogo, no un link. Badges de "Video" y "PDF" arriba a la izquierda; barra "Ver detalle" en `accent-500` que sube desde el borde inferior al hover. Foco visible propio: `outline-2 outline-offset-2` en `accent-500`.

**Encabezado de sección** (`SectionHeading`). Eyebrow + h2 con revelado palabra por palabra + descripción opcional. Alineación izquierda por defecto, centrada en secciones oscuras de cierre. `tone="light"` invierte los colores para fondo oscuro.

**Hero interior** (`PageHero`). Fondo `brand-950`, foto desenfocada al 30%, dos degradados, grilla de blueprint al 40% y aurora al 50%. Miga de pan, eyebrow, h1 con revelado, descripción. Es el patrón de apertura de todas las páginas menos la home.

**Header.** Sticky, fondo oscuro, navegación con desplegable en Productos, subrayado `accent-500` animado con `layoutId` en el ítem activo, teléfono como link secundario y "Contacto" como CTA primario.

**Movimiento.** Dos curvas y nada más: `easeOutExpo` `cubic-bezier(0.16, 1, 0.3, 1)` para entradas y revelados, `easeInOut` `cubic-bezier(0.65, 0, 0.35, 1)` para lo demás. Entradas de 0.55–0.7s, transiciones de estado de 0.2–0.4s, stagger de 0.06s. Todo revelado entra desde `y: 28px` y dispara una sola vez (`viewport: { once: true }`). `prefers-reduced-motion` está cubierto dos veces: una regla global en `globals.css` y el hook `useReducedMotion` en los componentes que animan con valores propios.

## Do's and Don'ts

**Do**

- Usar `accent-500` como señal única de acción: un solo elemento naranja sólido por pantalla.
- Construir separación con tono y borde antes que con sombra.
- Poner el eyebrow con su regla de 24px sobre cada título de sección: es la firma del sistema.
- Titular en Space Grotesk 700 con tracking negativo; todo lo demás en Inter.
- Mantener la grilla de blueprint detrás de las superficies `brand-950`.
- Dejar que la evidencia real — foto del equipo, video, ficha PDF — sea lo que ocupa el espacio grande.

**Don't**

- No poner texto blanco sobre `accent-500` ni usar `accent-500` como texto sobre blanco: 2.94:1 en los dos casos. Ver la tabla de contraste.
- No agregar un cuarto radio ni un cuarto nivel de sombra: hay cuatro radios y tres roles de sombra, y alcanzan.
- No animar el hover con desplazamiento vertical en tarjetas nuevas — la norma es tonal.
- No introducir una tercera familia tipográfica ni un segundo color de acento.
- No poner Space Grotesk en texto corrido; no poner Inter en títulos de sección.
- No inventar cifras, clientes ni sellos para llenar un espacio vacío. Ver `PRODUCT.md`.
- No estirar las fotos del catálogo a `object-cover`: las fuentes son chicas y se rompen.
