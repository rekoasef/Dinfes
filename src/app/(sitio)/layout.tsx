import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";
import { getCatalog } from "@/lib/data/catalog";
import { buildNav } from "@/lib/data/site";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const catalog = await getCatalog();
  const productLinks = catalog.map((category) => ({
    label: category.name,
    href: `/productos/${category.slug}`,
  }));

  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <Header nav={buildNav(productLinks)} />
      <main className="flex-1">{children}</main>
      <Footer productLinks={productLinks} />
      <BackToTop />
    </SmoothScroll>
  );
}
