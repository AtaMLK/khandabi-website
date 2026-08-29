import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMachine, machines } from "../data";

export function generateStaticParams() {
  return machines.map(({ slug }) => ({ slug }));
}

export default async function MachineryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  return <main className="min-h-screen bg-[#111820] text-white">
    <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 mix-blend-difference md:px-10">
      <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
      <Link href="/machinery" className="text-[10px] font-bold uppercase tracking-[.18em]">← All machinery</Link>
    </nav>

    <section className="relative flex min-h-[92svh] items-end overflow-hidden">
      <Image src={machine.image} alt={machine.title} fill priority className="object-cover opacity-55" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
      <div className="relative z-10 w-full px-6 pb-16 md:px-10 md:pb-24">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">{machine.category}</p>
        <h1 className="max-w-6xl text-[clamp(4rem,9vw,10rem)] font-medium leading-[.8] tracking-[-.075em]">{machine.title}</h1>
        <div className="mt-10 flex max-w-4xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-7 text-white/65">{machine.description}</p>
          <a href="mailto:info@khandabi.com" className="w-fit border border-white/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Request technical information ↗</a>
        </div>
      </div>
    </section>

    <section className="bg-[#f3f1ec] px-6 py-24 text-[#111820] md:px-10 md:py-32">
      <div className="grid gap-16 md:grid-cols-[.7fr_1.3fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Product overview</p><h2 className="mt-5 text-5xl font-medium leading-[.9] tracking-[-.055em]">BUILT AROUND THE PROCESS.</h2></div>
        <div className="border-t border-black/15">
          <div className="border-b border-black/15 py-6"><span className="text-[10px] uppercase tracking-[.18em] text-black/40">Category</span><p className="mt-2 text-xl">{machine.category}</p></div>
          <div className="border-b border-black/15 py-6"><span className="text-[10px] uppercase tracking-[.18em] text-black/40">Technical information</span><p className="mt-2 max-w-xl text-sm leading-7 text-black/55">Technical specifications, capacities, options, drawings and downloadable documents will be added from verified Khandabi catalogue material. No unverified values are presented.</p></div>
          <div className="border-b border-black/15 py-6"><span className="text-[10px] uppercase tracking-[.18em] text-black/40">Related machinery</span><div className="mt-4 flex flex-wrap gap-3">{machines.filter((item) => item.category === machine.category && item.slug !== machine.slug).slice(0, 5).map((item) => <Link key={item.slug} href={`/machinery/${item.slug}`} className="border border-black/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[.12em] transition hover:border-[#e76f32] hover:text-[#e76f32]">{item.title}</Link>)}</div></div>
        </div>
      </div>
    </section>
  </main>;
}
