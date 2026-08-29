import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const machines = [
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
];

const image = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90";

export function generateStaticParams() { return machines.map(([slug]) => ({ slug })); }

export default async function MachineryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const machine = machines.find(([id]) => id === slug);
  if (!machine) notFound();
  const [, title, category, description] = machine;

  return <main className="min-h-screen bg-[#111820] text-white">
    <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 mix-blend-difference md:px-10">
      <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
      <Link href="/#machines" className="text-[10px] font-bold uppercase tracking-[.18em]">← Machinery</Link>
    </nav>
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <Image src={image} alt={title} fill priority className="object-cover opacity-55" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">{category}</p>
        <h1 className="max-w-6xl text-[clamp(4rem,9vw,10rem)] font-medium leading-[.8] tracking-[-.075em]">{title}</h1>
        <div className="mt-10 flex max-w-3xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-7 text-white/65">{description}</p>
          <a href="mailto:info@khandabi.com" className="w-fit border border-white/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Request technical information ↗</a>
        </div>
      </div>
    </section>
    <section className="bg-[#f3f1ec] px-6 py-24 text-[#111820] md:px-10 md:py-32">
      <div className="grid gap-16 md:grid-cols-[.7fr_1.3fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Machine overview</p><h2 className="mt-5 text-5xl font-medium leading-[.9] tracking-[-.055em]">BUILT AROUND THE PRODUCT.</h2></div>
        <div className="grid gap-0 border-t border-black/15"><div className="border-b border-black/15 py-6"><span className="text-[10px] uppercase tracking-[.18em] text-black/40">Category</span><p className="mt-2 text-xl">{category}</p></div><div className="border-b border-black/15 py-6"><span className="text-[10px] uppercase tracking-[.18em] text-black/40">Technical data</span><p className="mt-2 max-w-xl text-sm leading-7 text-black/55">Technical specifications, capacities and options will be populated from the verified Khandabi catalogue/product documentation. No unverified specifications are shown here.</p></div></div>
      </div>
    </section>
  </main>;
}
