export const site = {
  name: "DINFES",
  legalName: "DINFES S.H.",
  tagline: "Diseño y fabricación de máquinas hidráulicas y equipos industriales",
  description:
    "Diseño y fabricación de prensas hidráulicas, máquinas especiales y recipientes ASME VIII. Ingeniería y asistencia técnica industrial en Rosario, Santa Fe.",
  phone: "0341-4567172",
  phoneHref: "tel:+543414567172",
  email: "contacto@dinfes.com.ar",
  address: {
    street: "Juan José Paso 6965",
    zip: "2000",
    city: "Rosario",
    province: "Santa Fe",
    country: "Argentina",
    full: "Juan José Paso 6965, 2000 Rosario, Santa Fe, Argentina",
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Juan+Jos%C3%A9+Paso+6965,+Rosario,+Santa+Fe,+Argentina&output=embed",
  mapsLinkHref:
    "https://www.google.com/maps/search/?api=1&query=Juan+Jos%C3%A9+Paso+6965,+Rosario,+Santa+Fe,+Argentina",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "La Empresa", href: "/la-empresa" },
  {
    label: "Productos",
    href: "/productos",
    children: [
      { label: "Prensas Hidráulicas", href: "/productos/prensas-hidraulicas" },
      { label: "Máquinas Especiales", href: "/productos/maquinas-especiales" },
      {
        label: "Recipientes ASME VIII",
        href: "/productos/recipientes-sometidos-a-presion-asme-viii",
      },
      { label: "Productos Seriados", href: "/productos/productos-seriados" },
      {
        label: "Grúa Articulada Electrohidráulica",
        href: "/productos/grua-articulada-electrohidraulica",
      },
      {
        label: "Equipos Entregados Recientemente",
        href: "/productos/equipos-entregados-reciente",
      },
      {
        label: "Retrofitting de Máquinas Industriales",
        href: "/productos/retrofitting-de-maquinas-industriales",
      },
      { label: "Centrales Hidráulicas", href: "/productos/centrales-hidraulicas" },
      { label: "Accesorios Comerciales", href: "/productos/accesorios-comerciales" },
    ],
  },
  { label: "Ingeniería", href: "/ingenieria" },
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Contacto", href: "/contacto" },
];
