export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductItem = {
  title: string;
  image?: string;
  pdf?: string;
  youtubeId?: string;
  /** Optional long copy. Left empty in the static catalogue for now. */
  description?: string;
  /** Optional key/value technical data shown in the product detail view. */
  specs?: ProductSpec[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortDescription: string;
  intro: string;
  heroImage: string;
  features?: string[];
  chips?: string[];
  items: ProductItem[];
};

export const productCategories: ProductCategory[] = [
  {
    slug: "prensas-hidraulicas",
    name: "Prensas Hidráulicas",
    shortDescription: "Prensas a medida para inyección, estampado y corte.",
    intro:
      "Diseño y fabricación de prensas hidráulicas a medida: desde prensas de inyección y estampado hasta líneas completas con transporte y conformado, adaptadas al proceso productivo de cada cliente.",
    heroImage: "/images/gallery/1.jpg",
    items: [
      {
        title: "Prensas Inyección Bateas Exhibidoras",
        image: "/images/products/manipulador.jpg",
        pdf: "/files/Prensas-Inyeccion-Bateas-Exhibidoras.pdf",
        youtubeId: "ghS6dIuQwWE",
      },
      {
        title: "Prensa Pentagonal",
        image: "/images/products/pentagonal.jpg",
        pdf: "/files/PRENSA-PENTAGONAL.pdf",
        youtubeId: "CUwC6p_9tko",
      },
      {
        title: "Prensa 2 Puestos 60 Tns.",
        image: "/images/products/2-puestos-60tns.jpg",
        pdf: "/files/Folleto-PRENSA-2-PUESTOS-60-Tns-illinois.pdf",
        youtubeId: "s_2xk1Ze1Cs",
      },
      {
        title: "Prensa Estampado",
        image: "/images/products/estampado.jpg",
        pdf: "/files/Prensa-Estampado.pdf",
      },
      {
        title: "Prensa 600 Tns. Corte de Discos",
        image: "/images/products/corte-disco.jpg",
        pdf: "/files/PRENSA-600Tns.-CORTE-DE-DISCOS.pdf",
      },
      {
        title: "Prensa, Batea y Cinta Transportadora a Cadena",
        image: "/images/products/conformado.jpg",
        pdf: "/files/PRENSA,-BATEA-Y-CINTA-TRANSPORTADORA-A-CADENA--.pdf",
      },
      {
        title: "Prensa Bateas para Esquineros de Exhibidoras",
        image: "/images/products/prensas-inyeccion-poliuretano.jpg",
        pdf: "/files/Folleto-Prensa-esquinero.pdf",
      },
      {
        title: "Prensa Inyección Bateas Exhibidoras Bajas",
        image: "/images/products/prensa-inyeccion.png",
        pdf: "/files/Prensa-Inyeccion-Bateas-Exhibidoras-Bajas..pdf",
      },
      {
        title: "Prensa Vulcanizado 200 Tns.",
        image: "/images/products/vulcanizado.png",
        pdf: "/files/PRENSA--Vulcanizado-Planchas-200-T.pdf",
      },
    ],
  },
  {
    slug: "maquinas-especiales",
    name: "Máquinas Especiales",
    shortDescription: "Equipos de diseño propio para líneas de producción.",
    intro:
      "Máquinas especiales de diseño propio para necesidades puntuales de producción: manipuladores, enfardadoras, balancines, punzonadoras y moldes a medida.",
    heroImage: "/images/gallery/7_01u37462.jpg",
    items: [
      {
        title: "Manipulador de Giro Montaje Exhibidoras Pozo de Frío",
        image: "/images/products/maq.-giro-1.jpg",
        pdf: "/files/Manipulador-de-Giro-Montaje-EXHIBIDORAS-POZO-DE-FRIO.pdf",
        youtubeId: "8ODj4uCxdgo",
      },
      {
        title: "Manipulador de Giro Montaje Exhibidoras Verticales",
        image: "/images/products/maq.-giro-2.png",
        pdf: "/files/Manipulador-de-Giro-Montaje-EXHIBIDORAS-VERTICALES.pdf",
      },
      {
        title: "Manipulador de Giro Montaje Exhibidoras Bajas",
        image: "/images/products/maq.-giro-3.png",
        pdf: "/files/Manipulador-de-Giro-Montaje-EXHIBIDORAS-BAJAS.pdf",
      },
      {
        title: "Enfardadora de Aluminio",
        image: "/images/products/enfardadora-aluminio.png",
        pdf: "/files/Folleto-Enfardadora-aluminio.pdf",
      },
      {
        title: "Enfardadora Hidráulica de Papel",
        image: "/images/products/enfardadora-hidraulica-de-papel.png",
        pdf: "/files/ENFARDADORA-HIDRAULICA-DE-PAPEL.pdf",
      },
      {
        title: "Cortadora Puntas y Sacapernos",
        image: "/images/products/cortadora-punta.png",
        pdf: "/files/Folleto-Cortadora-Puntas-y-Sacapernos.pdf",
      },
      {
        title: "Balancín Hidráulico 100 Tns.",
        image: "/images/products/balancin-100t..png",
        pdf: "/files/BALANCIN--HIDRAULICO-100-Tns.pdf",
      },
      {
        title: "Balancín Hidráulico 50 Tns.",
        image: "/images/products/balancin-50-tns..png",
        pdf: "/files/BALANCIN--HIDRAULICO-50-Tns..pdf",
      },
      {
        title: "Guillotina Despunte Línea Laminación",
        pdf: "/files/GUILLOTINA-DESPUNTE-LINEA-LAMINACION.pdf",
      },
      {
        title: "Dispositivo Hidráulico para Moldeo de Paneles Interiores de Automotores",
        pdf: "/files/DISPOSIVO-HIDRAULICO-Moldeo-Paneles-Automotor.pdf",
      },
      {
        title: "Pantógrafo para Oxicorte de Planchones",
        pdf: "/files/PANTOGRAFO-PARA-OXICORTE-DE-PLANCHONES-SIDERAR.pdf",
      },
      {
        title: "Punzonadora Neumática",
        pdf: "/files/PUNZONADORA-NEUM-TICA.pdf",
      },
      {
        title: "Moldes Puertas Heladeras y Freezer",
        pdf: "/files/MOLDES-PUERTAS-HELADERAS-Y-FREEZER.pdf",
      },
      {
        title: "Moldes Batea y Techo Exhibidoras Verticales",
        pdf: "/files/MOLDES-BATEA-Y-TECHO-EXHIBIDORA-VERTICAL.pdf",
      },
    ],
  },
  {
    slug: "recipientes-sometidos-a-presion-asme-viii",
    name: "Recipientes ASME VIII",
    shortDescription: "Tanques y acumuladores certificados bajo Norma ASME VIII.",
    intro:
      "Tanques recibidores de líquidos, acumuladores y colectores fabricados bajo Norma ASME VIII, con los más altos estándares de calidad y seguridad para operar bajo presión.",
    heroImage: "/images/gallery/11.jpg",
    items: [
      {
        title: "Tanques para Líquidos Bajo Presión",
        pdf: "/files/Folleto-Tanques.pdf",
      },
      {
        title: "Acumuladores para Líquidos Bajo Presión",
        pdf: "/files/Folleto-Acumuladores.pdf",
      },
      {
        title: "Central de Bombeo",
        pdf: "/files/Central-de-Bombeo-Glicol.pdf",
      },
      {
        title: 'Tanque 30" — Alto: 2150 mm — Capacidad: 900 Lts.',
      },
    ],
  },
  {
    slug: "productos-seriados",
    name: "Productos Seriados",
    shortDescription: "Componentes seriados en acero, aluminio e inoxidable.",
    intro:
      "Fabricación de productos seriados en acero, aluminio y acero inoxidable: soportes, racks, gabinetes y componentes para líneas de producción.",
    heroImage: "/images/gallery/5.jpg",
    items: [
      { title: "Soportes para Vidrios de Exhibidoras" },
      {
        title: "Racks - Vastidores de 50 Kgrs a 1.500 Kgrs",
        image: "/images/products/soportes.png",
      },
      { title: "Rack Universal con Tanque y Colector" },
      { title: "Gabinete Metálico para Uso Industrial" },
    ],
  },
  {
    slug: "grua-articulada-electrohidraulica",
    name: "Grúa Articulada Electrohidráulica",
    shortDescription: "Grúa de alta resistencia para montaje en camiones.",
    intro:
      "Grúa articulada electrohidráulica de alta resistencia, pensada para ser instalada en el chasis o en el cuerpo de camiones, con centro de energía propio y opciones de control remoto.",
    heroImage: "/images/gallery/3_1.jpg",
    features: [
      "Centro de energía electro-hidráulico",
      "Conexión de cable a distancia",
      "Válvulas de seguridad en los cilindros",
      "Totalmente construida en chapa de alta resistencia",
      "Puede ser instalada en el chasis y en el cuerpo",
    ],
    items: [],
  },
  {
    slug: "equipos-entregados-reciente",
    name: "Equipos Entregados Recientemente",
    shortDescription: "Proyectos recientes fabricados y puestos en marcha.",
    intro:
      "Una muestra de equipos diseñados, fabricados y puestos en marcha recientemente para nuestros clientes.",
    heroImage: "/images/gallery/4.jpg",
    items: [
      { title: "Prensa 300 Tns. Embutido Profundo", youtubeId: "BskvkctRt1M" },
      { title: "Prensa 300 Tns. Retrofitting", youtubeId: "Vdo9ZkEKjaM" },
      { title: "Prensa 120 Tns. Retrofitting", youtubeId: "F7cQfiC7NdY" },
      { title: "Prensa Planchado Alimentador Automático", youtubeId: "MObgDjsfl2o" },
      { title: "Prensa Tipo Astillero", youtubeId: "-NmIDZXE1y0" },
      {
        title: "Prensa Punzonadora Bandejas Aluminio",
        pdf: "/files/punzonadora-aluminio.pdf",
        youtubeId: "C1ETNe4iycw",
      },
      {
        title: "Prensa Universal Doble Efecto",
        pdf: "/files/PRENSA-UNIVERSAL-DOBLE-EFECTO.pdf",
        youtubeId: "nZmk9Rkgu7E",
      },
      {
        title: "Prensa Universal Simple Efecto, Corte por Límite o por Presión",
        pdf: "/files/PRENSA-UNIVERSAL-SIMPLE--EFECTO.pdf",
        youtubeId: "D6pJpZ_mS3M",
      },
      {
        title: "Dispositivo Perforado y Armado de Placares",
        pdf: "/files/dispositivo-placares.pdf",
        youtubeId: "-vKlryw58GI",
      },
      { title: "Pinza de Elevación de Bobinas 15.000 Kgr." },
    ],
  },
  {
    slug: "retrofitting-de-maquinas-industriales",
    name: "Retrofitting de Máquinas Industriales",
    shortDescription: "Modernización y puesta a punto de equipos existentes.",
    intro:
      "Modernización y puesta a punto de máquinas existentes: actualización de embragues, frenos neumáticos y componentes críticos para extender la vida útil de sus equipos.",
    heroImage: "/images/products/embrague-freno.jpg",
    items: [
      {
        title: "Balancín 100 y 200 Tns. con Embrague - Freno Neumático",
        image: "/images/products/balancin.jpg",
        pdf: "/files/Folleto-Balancin-100-y-200-Tns.--Ingersoll.pdf",
      },
      {
        title: "Prensa 300 Tns.",
        image: "/images/products/prensa.png",
        pdf: "/files/Folleto-Retrofiting-Prensa.pdf",
      },
      {
        title: "Prensa 200 Tns.",
        image: "/images/products/prensa200.png",
        pdf: "/files/Folleto-PRENSA-200-Tns.--Retrofitting.pdf",
      },
      {
        title: "Embrague Guillotina Mecánica",
        image: "/images/products/embrague-freno.jpg",
        pdf: "/files/Folleto-Embrague-Guillotina-Mecanica.pdf",
      },
    ],
  },
  {
    slug: "centrales-hidraulicas",
    name: "Centrales Hidráulicas",
    shortDescription: "Centrales de potencia diseñadas a medida.",
    intro:
      "Centrales hidráulicas auxiliares y de potencia, diseñadas a medida para prensas y líneas de producción.",
    heroImage: "/images/gallery/3.jpg",
    items: [
      {
        title: "Central Hidráulica Prensa 600 Tns.",
        pdf: "/files/CENTRAL-HIDRAULICA-AUXILIAR-PRENSA-600-TNS.pdf",
      },
      { title: "Centrales Varias" },
    ],
  },
  {
    slug: "accesorios-comerciales",
    name: "Accesorios Comerciales",
    shortDescription: "Componentes y accesorios para equipos hidráulicos.",
    intro:
      "Provisión de accesorios y componentes comerciales para el mantenimiento, la automatización y el movimiento de sus equipos hidráulicos.",
    heroImage: "/images/gallery/10.png",
    chips: [
      "Cilindros Hidráulicos",
      "Manómetros",
      "Filtros de Succión",
      "Filtro de Carga",
      "Nivel de Aceite y Temperatura",
      "Accesorios para Automatización y Movimientos",
      "Intercambiador de Temperatura",
      "Equipos Motobomba",
    ],
    items: [],
  },
];

export function getCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}

export const totalProducts = productCategories.reduce(
  (sum, category) => sum + category.items.length,
  0
);

export const totalCategories = productCategories.length;

