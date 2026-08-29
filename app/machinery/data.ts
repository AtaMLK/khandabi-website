export type Machine = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

const image = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90";

const definitions: Array<[string, string, string]> = [
  ["continuous-vacuum-cooker", "Continuous Vacuum Cooker", "Cooking Systems"],
  ["continuous-cooker", "Continuous Cooker", "Cooking Systems"],
  ["batch-cooker", "Batch Cooker", "Cooking Systems"],
  ["nougat-cooker", "Nougat Cooker", "Nougat Systems"],
  ["double-jacketed-tanks", "Double Jacketed Tanks", "Tanks & Mixing"],
  ["syrup-making-machine", "Syrup Making Machine", "Preparation"],
  ["chocolate-coating-machine-enrober", "Chocolate Coating Machine / Enrober", "Chocolate Systems"],
  ["decorator", "Decorator", "Chocolate Systems"],
  ["coating-machine-cooling-tunnel", "Coating Machine & Cooling Tunnel", "Chocolate Systems"],
  ["laboratory-coating-machine", "Laboratory Coating Machine", "Chocolate Systems"],
  ["choco-bar-line-extruder-system", "Choco Bar Line — Extruder System", "Bar Lines"],
  ["choco-bar-line-drum-system", "Choco Bar Line — Drum System", "Bar Lines"],
  ["slitting-dividing-machine", "Slitting & Dividing Machine", "Cutting Systems"],
  ["slab-drum-machine", "Slab Drum Machine", "Bar Lines"],
  ["guillotine", "Guillotine", "Cutting Systems"],
  ["smart-chocolate-dragee-production-line", "Smart Chocolate Dragee Production Line", "Chocolate Systems"],
  ["dragee-gum-production-line", "Dragee Gum Production Line", "Dragee Systems"],
  ["laboratory-dragee-gum-forming", "Laboratory Dragee Gum Forming", "Dragee Systems"],
  ["fondant-machine", "Fondant Machine", "Fondant Systems"],
  ["two-level-fondant-machine", "Two-Level Fondant Machine", "Fondant Systems"],
  ["laboratory-cooker", "Laboratory Cooker", "Laboratory Systems"],
  ["laboratory-conche", "Laboratory Conche", "Laboratory Systems"],
  ["chocolate-storage-tank", "Chocolate Storage Tank", "Chocolate Systems"],
  ["laboratory-ball-mills", "Laboratory Ball Mills", "Laboratory Systems"],
  ["ball-mills", "Ball Mills", "Grinding & Mixing"],
  ["wafer-scrap-grinder", "Wafer Scrap Grinder", "Grinding & Mixing"],
  ["turbo-mixer", "Turbo Mixer", "Mixing Systems"],
  ["caramel-dough-preparation-mixer", "Caramel Dough Preparation Mixer", "Mixing Systems"],
  ["grinder", "Grinder", "Grinding & Mixing"],
  ["frappe-aerator", "Frappe Aerator", "Aeration Systems"],
  ["laboratory-mixer", "Laboratory Mixer", "Laboratory Systems"],
  ["crocant-cooking-machine", "Crocant Cooking Machine", "Crocant Systems"],
  ["direct-flame-crocant-cooker", "Direct Flame Crocant Cooker", "Crocant Systems"],
  ["silverson-mixer", "Silverson Mixer", "Mixing Systems"],
  ["sesame-nut-single-jacket-mixer", "Sesame & Nut Single-Jacket Mixer", "Sesame & Nut Systems"],
  ["cold-table", "Cold Table", "Cooling Systems"],
  ["mixer", "Mixer", "Mixing Systems"],
  ["laboratory-dragee-coating-machine", "Laboratory Dragee Coating Machine", "Dragee Systems"],
  ["dragee-coating-pan", "Dragee Coating Pan", "Dragee Systems"],
  ["mobile-dragee-coating-pan", "Mobile Dragee Coating Pan", "Dragee Systems"],
  ["chocolate-dragee-coating-system", "Chocolate Dragee Coating System", "Dragee Systems"],
  ["halva-cooking-machine", "Halva Cooking Machine", "Halva & Sesame"],
  ["halva-forming-line", "Halva Forming Line", "Halva & Sesame"],
  ["sesame-bar-production-line", "Sesame Bar Production Line", "Bar Lines"],
  ["conche-machine", "Conche Machine", "Chocolate Systems"],
];

export const machines: Machine[] = definitions.map(([slug, title, category]) => ({
  slug,
  title,
  category,
  description: `Explore the ${title} within Khandabi's machinery range. Detailed technical information will be presented from verified catalogue and product documentation.`,
  image,
}));

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}
