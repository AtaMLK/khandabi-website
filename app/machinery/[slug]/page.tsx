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

  const related = machines.filter((item) => item.category === machine.category && item.slug !== machine.slug).slice(0, 6);
  const verifiedCapacity = machine.technical.capacity;

  return (
    <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
      <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 text-white mix-blend-difference md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <Link href="/machinery" className="text-[10px] font-bold uppercase tracking-[.18em]">← All machinery</Link>
      </nav>

      <section className="relative min-h-[90svh] overflow-hidden bg-[#111820] text-white">
        <Image src={machine.image} alt={machine.title} fill priority className="object-cover opacity-65" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <div className="relative z-10 flex min-h-[90svh] flex-col justify-end px-6 pb-14 md:px-10 md:pb-20">
          <div className="mb-7 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[.25em] text-white/55"><span className="text-[#e76f32]">{machine.category}</span><span>/</span><span>Machinery</span><span>/</span><span>{machine.verificationState}</span></div>
          <h1 className="max-w-7xl text-[clamp(4rem,9.5vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">{machine.title}</h1>
          <div className="mt-10 flex max-w-5xl flex-col gap-8 border-t border-white/20 pt-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-white/65">{machine.description}</p>
            <a href={`mailto:info@khandabi.com?subject=${encodeURIComponent(`Technical information - ${machine.title}`)}`} className="w-fit shrink-0 border border-white/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Request technical information ↗</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-[.7fr_1.3fr]">
          <div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">01 / Product</p><h2 className="mt-5 max-w-md text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[.84] tracking-[-.06em]">ENGINEERED AROUND THE PROCESS.</h2></div>
          <div className="border-t border-black/15">
            <div className="grid gap-8 border-b border-black/15 py-8 md:grid-cols-[180px_1fr]"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Overview</span><p className="text-xl leading-8">{machine.description}</p></div>
            {verifiedCapacity && <div className="grid gap-8 border-b border-black/15 py-8 md:grid-cols-[180px_1fr]"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Capacity</span><p className="text-2xl font-medium">{verifiedCapacity}</p></div>}
            <div className="grid gap-8 border-b border-black/15 py-8 md:grid-cols-[180px_1fr]"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Catalogue</span><p className="text-sm leading-7 text-black/60">Source page {machine.cataloguePage ?? "—"}. Technical values are shown only where the current source material supports them.</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">02 / Technical data</p><h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-medium leading-[.82] tracking-[-.07em]">SPECIFICATIONS.</h2></div><p className="max-w-md text-sm leading-7 text-black/50">Only source-backed values are published. Empty fields remain intentionally unfilled until Khandabi documentation confirms them.</p></div>
        <div className="mt-14 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {[['Capacity', machine.technical.capacity], ['Dimensions', machine.technical.dimensions], ['Power', machine.technical.power], ['Utilities', machine.technical.utilities], ['Materials', machine.technical.materials], ['Options', machine.technical.options.length ? machine.technical.options.join(', ') : null]].map(([label, value]) => <div key={label} className="min-h-32 border-b border-r border-black/10 p-6"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/35">{label}</span><p className="mt-6 text-base">{value || "Not specified in current source"}</p></div>)}
        </div>
      </section>

      <section className="bg-[#111820] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">03 / Related</p><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.82] tracking-[-.07em]">MORE FROM<br />{machine.category.toUpperCase()}.</h2></div><Link href="/machinery" className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55 transition hover:text-[#e76f32]">View complete range →</Link></div>
        <div className="mt-14 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">{related.map((item, i) => <Link key={item.slug} href={`/machinery/${item.slug}`} className="group border-b border-r border-white/15 p-6 transition hover:bg-white/[.04] md:p-8"><span className="text-[10px] text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-12 min-h-16 text-xl font-medium leading-tight tracking-[-.025em]">{item.title}</h3><span className="mt-8 inline-block text-lg text-[#e76f32] transition-transform group-hover:translate-x-2">↗</span></Link>)}</div>
      </section>

      <section className="bg-[#e76f32] px-6 py-24 md:px-10 md:py-32"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-black/50">04 / Next step</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.8] tracking-[-.07em]">TALK TO<br />KHANDABI.</h2><a href={`mailto:info@khandabi.com?subject=${encodeURIComponent(`Inquiry - ${machine.title}`)}`} className="w-fit border border-black/40 px-7 py-5 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-black hover:text-white">Start an inquiry ↗</a></div></section>

      <footer className="flex flex-col justify-between gap-6 bg-black px-6 py-9 text-white md:flex-row md:items-center md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><Link href="/machinery" className="text-[10px] uppercase tracking-[.18em] text-white/40 transition hover:text-white">All machinery →</Link><span className="text-[10px] uppercase tracking-[.18em] text-white/40">© Khandabi Machinery Co.</span></footer>
    </main>
  );
}
