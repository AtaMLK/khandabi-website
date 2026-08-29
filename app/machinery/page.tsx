import Link from "next/link";
import MachineryCatalogue, { type Machine } from "./MachineryCatalogue";

const names: Array<[string, string, string, string]> = [
  ["continuous-vacuum-cooker", "Continuous Vacuum Cooker", "Cooking Systems", "Continuous cooking and vacuum processing equipment for confectionery production."],
  ["continuous-cooker", "Continuous Cooker", "Cooking Systems", "Continuous cooker for controlled confectionery cooking processes."],
  ["batch-cooker", "Batch Cooker", "Cooking Systems", "Batch-type cooking equipment for confectionery production."],
  ["nougat-cooking", "Nougat Cooker", "Nougat Systems", "Equipment for nougat cooking and aeration processes."],
  ["double-jacketed-tanks", "Double Jacketed Tanks", "Tanks & Mixing", "Jacketed process tanks for controlled heating and processing."],
  ["syrup-making-machine", "Syrup Making Machine", "Preparation", "Syrup preparation equipment for confectionery processes."],
  ["chocolate-enrober", "Chocolate Coating Machine / Enrober", "Chocolate Systems", "Chocolate coating equipment for confectionery products."],
  ["decorator", "Decorator", "Chocolate Systems", "Decorating equipment for finished confectionery products."],
  ["coating-machine-cooling-tunnel", "Coating Machine & Cooling Tunnel", "Chocolate Systems", "Integrated coating and cooling equipment for continuous production."],
  ["laboratory-coating-machine", "Laboratory Coating Machine", "Chocolate Systems", "Laboratory-scale coating equipment for product development and testing."],
  ["choco-bar-extruder-line", "Choco Bar Line — Extruder System", "Bar Lines", "Choco bar production line using an extrusion-based system."],
  ["choco-bar-drum-line", "Choco Bar Line — Drum System", "Bar Lines", "Choco bar production line using a drum-based system."],
  ["slitting-dividing-machine", "Slitting & Dividing Machine", "Bar Lines", "Equipment for controlled slitting and dividing of confectionery products."],
  ["slab-drum-machine", "Slab Drum Machine", "Bar Lines", "Drum equipment for slab and bar production processes."],
  ["guillotine", "Guillotine", "Cutting Systems", "Cutting equipment for confectionery slabs and products."],
  ["smart-chocolate-dragee-production-line", "Smart Chocolate Dragee Production Line", "Chocolate Systems", "Production line for chocolate-coated dragee products."],
];

const image = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=85";
const machines: Machine[] = names.map(([slug, title, category, description]) => ({ slug, title, category, description, image }));

export default function MachineryIndex() {
  return <main className="min-h-screen bg-white text-[#171a1f]">
    <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10">
      <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
      <div className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[.12em]">
        <Link href="/" className="hover:text-[#e76f32]">Home</Link>
        <Link href="/machinery" className="text-[#e76f32]">Products</Link>
        <Link href="/" className="hover:text-[#e76f32]">Projects</Link>
      </div>
    </nav>
    <header className="flex items-end justify-between border-b border-black/10 px-6 pb-7 pt-12 md:px-10 md:pt-16">
      <div><p className="text-[11px] font-medium uppercase tracking-[.18em] text-[#f36f21]">Full range</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] md:text-4xl">OUR MACHINERY</h1></div>
      <Link href="#range" className="hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-[#f36f21] md:flex">⌕ &nbsp; Explore all machinery</Link>
    </header>
    <div id="range"><MachineryCatalogue machines={machines} /></div>
  </main>;
}
