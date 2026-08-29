import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
      <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em]">← Home</Link>
      </nav>
      <section className="grid min-h-[calc(100svh-80px)] md:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-end px-6 py-16 md:px-10 md:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Khandabi / About</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">ENGINEERING<br />THE<br /><span className="text-[#e76f32]">PROCESS.</span></h1>
          <p className="mt-10 max-w-xl text-base leading-7 text-black/60">Khandabi develops confectionery machinery and production systems across individual equipment and complete lines. This page is structured as the company overview and will be expanded with verified company history, capabilities and certifications from the approved content master.</p>
        </div>
        <div className="relative min-h-[520px] bg-[#111820]"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=90" alt="Industrial engineering" fill className="object-cover opacity-80" sizes="50vw" /></div>
      </section>
      <section className="border-t border-black/10 px-6 py-20 md:px-10 md:py-28"><div className="grid gap-12 md:grid-cols-3"><div><span className="text-5xl font-medium tracking-[-.05em]">01</span><p className="mt-5 text-sm leading-6 text-black/55">Individual machinery designed around confectionery processes.</p></div><div><span className="text-5xl font-medium tracking-[-.05em]">02</span><p className="mt-5 text-sm leading-6 text-black/55">Production-line thinking from preparation through finished product.</p></div><div><span className="text-5xl font-medium tracking-[-.05em]">03</span><p className="mt-5 text-sm leading-6 text-black/55">A technical presentation built from verified catalogue information.</p></div></div></section>
    </main>
  );
}
