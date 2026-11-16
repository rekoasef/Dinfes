import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dinfes.com.ar"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "prensas hidráulicas",
    "máquinas industriales",
    "ASME VIII",
    "retrofitting industrial",
    "Rosario",
    "Santa Fe",
    "Argentina",
    "ingeniería industrial",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans">{children}</body>
    </html>
  );
}
