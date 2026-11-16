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

/**
 * Main navigation. Product lines come from the catalogue, so a category the
 * admin adds shows up in the header and footer without touching code.
 */
export function buildNav(productLinks: { label: string; href: string }[]): NavItem[] {
  return [
    { label: "Inicio", href: "/" },
    { label: "La Empresa", href: "/la-empresa" },
    { label: "Productos", href: "/productos", children: productLinks },
    { label: "Ingeniería", href: "/ingenieria" },
    { label: "Ubicación", href: "/ubicacion" },
    { label: "Contacto", href: "/contacto" },
  ];
}
