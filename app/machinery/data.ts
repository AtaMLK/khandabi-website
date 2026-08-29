import productMaster from "../../content/khandabi-product-master.json";

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
  cataloguePage: number | null;
  verificationState: string;
  technical: {
    capacity?: string | null;
    electricity?: string;
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

export const machines: Machine[] = productMaster.products.map((product: MasterProduct) => ({
  id: product.id,
  slug: product.slug,
  title: product.en,
  titleTr: product.tr,
  titleFa: product.fa,
  category: product.category,
  type: "machine",
  description: product.description,
  image: product.image,
  cataloguePage: product.cataloguePage,
  verificationState: product.verification,
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
}));

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}
