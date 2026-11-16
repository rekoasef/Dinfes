import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductItem = {
  id: string;
  title: string;
  image?: string;
  pdf?: string;
  youtubeId?: string;
  description?: string;
  specs?: ProductSpec[];
};

export type ProductCategory = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  intro: string;
  heroImage: string;
  features?: string[];
  chips?: string[];
  items: ProductItem[];
};

export type FeaturedItem = ProductItem & {
  categoryName: string;
  categorySlug: string;
};

/** Every page that shows catalogue data is tagged with this, and the admin expires it on save. */
export const CATALOG_TAG = "catalog";

/** Shown when a category has no cover photo yet, so a new category never renders a broken frame. */
const FALLBACK_HERO = "/images/gallery/8.jpg";

type ProductRow = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  pdf: string | null;
  youtube_id: string | null;
  specs: ProductSpec[];
  position: number;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  intro: string;
  hero_image: string;
  features: string[];
  chips: string[];
  products: ProductRow[];
};

function toItem(row: ProductRow): ProductItem {
  return {
    id: row.id,
    title: row.title,
    // Empty strings become undefined so the components' own fallbacks still apply.
    description: row.description.trim() || undefined,
    image: row.image || undefined,
    pdf: row.pdf || undefined,
    youtubeId: row.youtube_id || undefined,
    specs: row.specs.length ? row.specs : undefined,
  };
}

function toCategory(row: CategoryRow): ProductCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    intro: row.intro,
    heroImage: row.hero_image || FALLBACK_HERO,
    features: row.features.length ? row.features : undefined,
    chips: row.chips.length ? row.chips : undefined,
    items: [...row.products].sort((a, b) => a.position - b.position).map(toItem),
  };
}

/**
 * The published catalogue. Cached until the admin saves a change, so public
 * pages never wait on the database — and keep serving the last good copy if
 * the database is briefly unreachable.
 */
export const getCatalog = unstable_cache(
  async (): Promise<ProductCategory[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select(
        "id, slug, name, short_description, intro, hero_image, features, chips, products(id, title, description, image, pdf, youtube_id, specs, position)"
      )
      .order("position")
      .returns<CategoryRow[]>();

    if (error) throw new Error(`No se pudo leer el catálogo: ${error.message}`);
    return data.map(toCategory);
  },
  ["catalog"],
  { tags: [CATALOG_TAG] }
);

export function countProducts(catalog: ProductCategory[]) {
  return catalog.reduce((sum, category) => sum + category.items.length, 0);
}

/**
 * Equipment with a video of the machine actually running — the strongest
 * evidence the catalogue holds, and the reason the home page leads with real
 * machines instead of category tiles.
 *
 * Items carrying their own photograph come first: the rest fall back to the
 * YouTube still, which is sharp but framed by whoever shot the video.
 */
export function pickFeatured(catalog: ProductCategory[], limit = 6): FeaturedItem[] {
  return catalog
    .flatMap((category) =>
      category.items
        .filter((item) => item.youtubeId)
        .map((item) => ({
          ...item,
          categoryName: category.name,
          categorySlug: category.slug,
        }))
    )
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
    .slice(0, limit);
}
