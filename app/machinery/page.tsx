import Image from "next/image";
import Link from "next/link";

const machines = [
  ["continuous-vacuum-cooker", "Continuous Vacuum Cooker", "Cooking Systems"],
  ["continuous-cooker", "Continuous Cooker", "Cooking Systems"],
  ["batch-cooker", "Batch Cooker", "Cooking Systems"],
  ["nougat-cooking", "Nougat Cooking", "Nougat Systems"],
  ["double-jacketed-tanks", "Double-Jacketed Tanks", "Tanks & Mixing"],
  ["syrup-making-machine", "Syrup Making Machine", "Preparation"],
  ["chocolate-enrober", "Chocolate Coating Machine (Enrober)", "Chocolate Systems"],
  ["decorator", "Decorator", "Chocolate Systems"],
  ["coating-machine-cooling-tunnel", "Coating Machine & Cooling Tunnel", "Chocolate Systems"],
  ["choco-bar-extruder-line", "Choco Bar Line — Extruder System", "Bar Lines"],
  ["choco-bar-drum-line", "Choco Bar Line — Drum System", "Bar Lines"],
  ["halva-cooking-machine", "Halva Cooking Machine", "Halva & Sesame"],
  ["halva-forming-line", "Halva Forming Line", "Halva & Sesame"],
  ["sesame-bar-production-line", "Sesame Bar Production Line", "Bar Lines"],
  ["conching-machine", "Conching Machine", "Chocolate Systems"],
];
const image = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=85";

export default function MachineryIndex() {
  return <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
    <nav className="flex h-20 items-center justify-between px-6 md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em]">← Home</Link></nav>
    <header className="px-6 pb-24 pt-20 md:px-10 md:pb-32"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Machinery catalogue</p><h1 className="mt-7 max-w-6xl text-[clamp(4rem,10vw,11rem)] font-medium leading-[.78] tracking-[-.075em]">THE<br />MACHINES.</h1><p className="mt-10 max-w-xl text-base leading-7 text-black/55">Explore the Khandabi machinery range by process and application. Individual machine pages are structured for verified technical content and catalogue imagery.</p></header>
    <section className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">{machines.map(([slug, title, category], i) => <Link href={`/machinery/${slug}`} key={slug} className="group relative min-h-[46vh] overflow-hidden border-b border-black/15 p-7 md:p-10"><Image src={image} alt="" fill className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-25" sizes="50vw" /><div className="relative z-10 flex h-full min-h-[34vh] flex-col justify-between"><div className="flex justify-between text-[10px] uppercase tracking-[.2em] text-black/40"><span>0{i + 1}</span><span>{category}</span></div><div><h2 className="max-w-2xl text-4xl font-medium leading-[.9] tracking-[-.045em] md:text-6xl">{title}</h2><span className="mt-7 inline-block text-[10px] font-bold uppercase tracking-[.2em] transition-transform group-hover:translate-x-3">View machine →</span></div></div></Link>)}</section>
  </main>;
}
