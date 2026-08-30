import productMaster from "../../content/khandabi-product-master.json";
import catalogueExport from "../../content/khandabi-catalogue-export.json";

export type Machine = {
  id: string;
  slug: string;
  title: string;
  titleTr: string;
  titleFa: string | null;
  category: string;
  type: string;
  description: string;
  image: string;
  catalogueImages: string[];
  cataloguePage: number | null;
  cataloguePages: number[];
  verificationState: string;
  technical: {
    capacity?: string | null;
    dimensions: string | null;
    power: string | null;
    utilities: string | null;
    materials: string | null;
    options: string[];
  };
  applications: string[];
  processSteps: string[];
  relatedMachines: string[];
  relatedLines: string[];
};

type MasterProduct = (typeof productMaster.products)[number];
type CatalogueProduct = (typeof catalogueExport.products)[number];

const masterBySlug = new Map<string, MasterProduct>(productMaster.products.map((product) => [product.slug, product]));

function categoryFor(product: CatalogueProduct): string {
  const text = `${product.name_en} ${product.details}`.toLowerCase();
  if (text.includes("halva") || text.includes("helva")) return "Halva & Sesame";
  if (text.includes("dragee") || text.includes("draje") || text.includes("gum")) return "Dragee & Gum";
  if (text.includes("choco bar") || text.includes("chocobar") || text.includes("bar production")) return "Bar Lines";
  if (text.includes("enrober") || text.includes("chocolate coating") || text.includes("chocolate storage") || text.includes("chocolate dragee")) return "Chocolate Systems";
  if (text.includes("laboratory") || text.includes("lab.")) return "Laboratory";
  if (text.includes("grinder") || text.includes("ball mill")) return "Grinding";
  if (text.includes("mixer") || text.includes("mixing")) return "Mixing & Preparation";
  if (text.includes("coating pan")) return "Coating Systems";
  if (text.includes("fondant")) return "Fondant Systems";
  if (text.includes("cooking") || text.includes("cooker") || text.includes("syrup")) return "Cooking & Preparation";
  return "Confectionery Machinery";
}

export const machines: Machine[] = catalogueExport.products.map((product: CatalogueProduct, index) => {
  const master = masterBySlug.get(product.slug);
  const pages = product.catalog_pages;
  const catalogueImages = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  return {
    id: master?.id ?? `KH-C-${String(index + 1).padStart(2, "0")}`,
    slug: product.slug,
    title: product.name_en,
    titleTr: product.name_tr,
    titleFa: master?.fa ?? null,
    category: categoryFor(product),
    type: "machine",
    description: product.details,
    // Prefer the image exported for THIS catalogue product. The old master image
    // fallback was causing many products to show the same machine in the preview.
    image: catalogueImages[0] ?? master?.image ?? "https://www.khandabi.com/images/prolist/1.jpg",
    catalogueImages,
    cataloguePage: pages[0] ?? null,
    cataloguePages: pages,
    verificationState: "official-catalogue",
    technical: {
      capacity: product.capacity,
      dimensions: null,
      power: null,
      utilities: null,
      materials: null,
      options: [],
    },
    applications: [],
    processSteps: [],
    relatedMachines: [],
    relatedLines: [],
  };
});

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}
