import Image from "next/image";
import Link from "next/link";

const pillars = [
  ["01", "INDIVIDUAL MACHINERY", "Equipment for specific confectionery processes, presented with clear technical context."],
  ["02", "COMPLETE LINES", "Integrated production systems connecting preparation, processing, forming, coating and cooling."],
  ["03", "ENGINEERING SUPPORT", "A product experience designed around real industrial decisions: applications, technical data and inquiry."],
];

export default function AboutPage() {
  return <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
    <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><div className="flex items-center gap-7"><Link href="/machinery" className="text-[10px] font-bold uppercase tracking-[.18em]">Machinery</Link><Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em]">← Home</Link></div></nav>
    <section className="grid min-h-[calc(100svh-80px)] md:grid-cols-[1.05fr_.95fr]"><div className="flex flex-col justify-end px-6 py-16 md:px-10 md:py-24"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Khandabi / About</p><h1 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">ENGINEERING<br />THE<br /><span className="text-[#e76f32]">PROCESS.</span></h1><p className="mt-10 max-w-xl text-base leading-7 text-black/60">Khandabi develops confectionery machinery and production systems across individual equipment and complete lines.</p></div><div className="relative min-h-[520px] bg-[#111820]"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=90" alt="Industrial engineering" fill className="object-cover opacity-80" sizes="50vw" /></div></section>
    <section className="grid border-y border-black/10 md:grid-cols-3">{pillars.map(([no,title,text]) => <article key={no} className="border-b border-black/10 p-7 md:border-b-0 md:border-r md:p-10"><span className="text-sm text-[#e76f32]">{no}</span><h2 className="mt-14 text-2xl font-medium tracking-[-.035em]">{title}</h2><p className="mt-5 text-sm leading-7 text-black/55">{text}</p></article>)}</section>
    <section className="bg-[#111820] px-6 py-24 text-white md:px-10 md:py-32"><div className="flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">EXPLORE<br /><span className="text-[#e76f32]">THE RANGE.</span></h2><Link href="/machinery" className="w-fit border border-white/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">View all machinery →</Link></div></section>
  </main>;
}
