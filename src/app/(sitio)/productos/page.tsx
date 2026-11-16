import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CategoryCard from "@/components/CategoryCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { countProducts, getCatalog } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Prensas hidráulicas, máquinas especiales, recipientes ASME VIII, productos seriados y más: conocé todas las líneas de producto de DINFES.",
};

export default async function ProductosPage() {
  const catalog = await getCatalog();
  const totalProducts = countProducts(catalog);

  return (
    <>
      <PageHero
        eyebrow="Productos"
        title="Líneas de producto DINFES"
        description={`Diseño y fabricación de máquinas hidráulicas, moldes, equipos especiales, recipientes ASME VIII y productos seriados en acero, aluminio e inoxidable. ${totalProducts}+ equipos fabricados.`}
        image="/images/gallery/8.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Productos" }]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
            {catalog.map((category) => (
              <StaggerItem key={category.slug} className="h-full">
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
