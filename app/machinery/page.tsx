import Image from "next/image";
import Link from "next/link";
import MachineryCatalogue, { type Machine } from "./MachineryCatalogue";

const machines: Machine[] = [
  ["continuous-vacuum-cooker", "Continuous Vacuum Cooker", "Cooking Systems", "Continuous cooking and vacuum processing equipment for confectionery production."],
  ["continuous-cooker", "Continuous Cooker", "Cooking Systems", "Continuous cooker for controlled confectionery cooking processes."],
  ["batch-cooker", "Batch Cooker", "Cooking Systems", "Batch-type cooking equipment for confectionery production."],
  ["nougat-cooking", "Nougat Cooking", "Nougat Systems", "Equipment for nougat cooking and aeration processes."],
  ["double-jacketed-tanks", "Double-Jacketed Tanks", "Tanks & Mixing", "Jacketed process tanks for controlled heating and processing."],
  ["syrup-making-machine", "Syrup Making Machine", "Preparation", "Syrup preparation equipment for confectionery processes."],
  ["chocolate-enrober", "Chocolate Coating Machine (Enrober)", "Chocolate Systems", "Chocolate coating equipment for confectionery products."],
  ["decorator", "Decorator", "Chocolate Systems", "Decorating equipment for finished confectionery products."],
  ["coating-machine-cooling-tunnel", "Coating Machine & Cooling Tunnel", "Chocolate Systems", "Integrated coating and cooling equipment for continuous production."],
  ["choco-bar-extruder-line", "Choco Bar Line — Extruder System", "Bar Lines", "Choco bar production line using an extrusion-based system."],
  ["choco-bar-drum-line", "Choco Bar Line — Drum System", "Bar Lines", "Choco bar production line using a drum-based system."],
  ["halva-cooking-machine", "Halva Cooking Machine", "Halva & Sesame", "Cooking equipment for halva production."],
  ["halva-forming-line", "Halva Forming Line", "Halva & Sesame", "Forming line for halva production."],
  ["sesame-bar-production-line", "Sesame Bar Production Line", "Bar Lines", "Production line for sesame bar products."],
  ["conching-machine", "Conching Machine", "Chocolate Systems", "Conching equipment for chocolate processing."],
].map(([slug, title, category, description]) => ({
  slug,
  title,
  category,
  description,
  image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=85",
}));

export default function MachineryIndex() {
  return <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
    <nav className="flex h-20 items-center justify-between px-6 md:px-10">
      <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
      <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em]">← Home</Link>
    </nav>
    <header className="px-6 pb-24 pt-20 md:px-10 md:pb-32">
      <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Machinery catalogue</p>
      <h1 className="mt-7 max-w-6xl text-[clamp(4rem,10vw,11rem)] font-medium leading-[.78] tracking-[-.075em]">THE<br />MACHINES.</h1>
      <p className="mt-10 max-w-xl text-base leading-7 text-black/55">Explore the Khandabi machinery range by process and application. Hover a machine to preview it, then open its dedicated product page for detailed information.</p>
    </header>
    <MachineryCatalogue machines={machines} />
  </main>;
}
