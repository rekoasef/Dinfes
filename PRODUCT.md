# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias que llegan en momentos distintos del mismo proceso de compra industrial:

- **Perfil técnico** (ingeniero, jefe de planta, responsable de mantenimiento). Llega evaluando si DINFES tiene la capacidad de fabricación que su problema requiere. Busca evidencia: qué equipos hizo, bajo qué normas, si la ingeniería es propia. Entra al catálogo y a las fichas técnicas.
- **Perfil de compra** (compras, dirección). Llega a validar al proveedor y a abrir la conversación comercial. Busca legitimidad, ubicación, y una vía de contacto directa.

El sitio tiene que servir los dos recorridos sin mezclarlos: el catálogo convence al técnico, el contacto cierra con compras.

## Product Purpose

Sitio institucional y catálogo técnico de DINFES S.H. Existe para que una empresa industrial con un problema de fabricación concreto pueda verificar que DINFES fabrica algo equivalente, y abrir una consulta.

**Éxito = el envío del formulario de contacto.** Es la conversión que importa; el teléfono y el mail son alternativas, no el destino principal.

## Positioning

Fabricante con **ingeniería propia** que diseña la máquina para el proceso del cliente, no un catálogo de equipos estándar. Dos áreas declaradas: fabricación de maquinaria y desarrollo de procesos de producción continuos.

Lo que un competidor vecino no podría copiar sin mentir: el cruce de fabricación a medida, retrofitting de equipos existentes y recipientes bajo ASME VIII en la misma casa, con asistencia técnica y post-venta propios.

## Operating Context

La decisión de compra es larga, técnica y colectiva. El material del sitio circula puertas adentro de la empresa del cliente: las fichas PDF se descargan y se reenvían, los videos de equipos funcionando se muestran en reunión. La consulta rara vez sale de la primera visita.

Ámbito comercial: industria argentina, con base en Rosario, Santa Fe. Todo el contenido está en español rioplatense.

## Capabilities and Constraints

Catálogo estático de 9 categorías de producto, definidas en `src/lib/data/categories.ts`:

prensas hidráulicas · máquinas especiales · recipientes sometidos a presión ASME VIII · productos seriados · grúa articulada electrohidráulica · equipos entregados recientemente · retrofitting de máquinas industriales · centrales hidráulicas · accesorios comerciales

Cada ítem del catálogo puede tener imagen, ficha PDF y video de YouTube. El campo `description` y los `specs` técnicos existen en el tipo `ProductItem` pero están **vacíos en todo el catálogo** — es una capacidad construida y todavía sin contenido.

Constraints técnicos: Next.js 16 (App Router), React 19, Tailwind 4, Framer Motion, Lenis. Sin CMS ni backend: el contenido se edita en el repo. El formulario de contacto es la única pieza que requiere procesamiento del lado servidor.

## Brand Commitments

- Nombre comercial **DINFES**; razón social **DINFES S.H.**
- Datos de contacto reales y vigentes: Juan José Paso 6965, 2000 Rosario, Santa Fe, Argentina · 0341-4567172 · contacto@dinfes.com.ar
- Valores declarados en la página institucional, en las palabras de la empresa: respeto por la persona, transparencia, formalidad, fidelidad con los compromisos asumidos, servicio post-venta completo.
- Tono institucional en primera persona plural, sobrio, sin marketing agresivo.

## Evidence on Hand

Confirmado por el cliente y publicable:

- **Los PDFs y los videos de YouTube del catálogo son de equipos realmente fabricados y entregados.** Es la evidencia más fuerte del sitio y hoy está subutilizada.
- **La fabricación bajo norma ASME VIII es una capacidad real**, no solo un tipo de producto que se cotiza.
- Fotografías propias de taller y de equipos en `public/images/gallery/` y `public/images/products/`.

Ausencias que ningún trabajo futuro debe rellenar inventando:

- **No hay clientes nombrables, certificados publicables, cantidades de equipos entregados, ni casos de estudio.** No se fabrican logos de clientes, testimonios ni métricas.
- **Año de fundación: existe uno concreto pero todavía no fue informado.** Hasta que el cliente lo dé, la trayectoria se expresa cualitativamente ("décadas"), como ya lo hace el sitio. No estimar el año a partir de la antigüedad aparente de las fotos ni de ninguna otra señal.

## Product Principles

1. **La evidencia manda sobre el adjetivo.** Un video de la máquina funcionando y una ficha con medidas convencen más que cualquier frase sobre calidad. Cuando haya que elegir qué mostrar primero, gana el equipo real.
2. **Dos lecturas, un solo sitio.** Cada superficie tiene que dejar avanzar al técnico hacia la ficha y al comprador hacia el contacto, sin obligar a ninguno a atravesar el recorrido del otro.
3. **No fabricar autoridad.** Sin cifras, clientes ni sellos inventados. La credibilidad sale de lo que efectivamente se fabricó.
4. **El catálogo es el producto.** Nueve categorías con material real son el activo; la home es una puerta hacia ellas, no el destino.
5. **Español rioplatense, registro técnico.** Se le habla a alguien que sabe qué es una prensa de 600 toneladas.
