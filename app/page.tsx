"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { title: "Chocolate", image: "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85" },
  { title: "Candy", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85" },
  { title: "Bars", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85" },
  { title: "Halva & Sesame", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85" },
];

const machines = [
  ["01", "Continuous Vacuum Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1581093458791-9d42e3c7f5b4?auto=format&fit=crop&w=1800&q=90"],
  ["02", "Continuous Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1800&q=90"],
  ["03", "Batch Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1800&q=90"],
  ["04", "Nougat Cooker & Aeration", "NOUGAT SYSTEMS", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=90"],
  ["05", "Enrober & Coating Systems", "CHOCOLATE SYSTEMS", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90"],
  ["06", "Cooling Tunnels", "COOLING SYSTEMS", "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=90"],
];

const lines = [
  { name: "Chocolate Line", number: "01", description: "From chocolate preparation and tempering through moulding, cooling and downstream handling.", image: "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=2200&q=90", steps: ["Preparation", "Tempering", "Moulding", "Cooling", "Handling"] },
  { name: "Candy Line", number: "02", description: "Integrated cooking, forming and cooling architecture for hard and soft confectionery.", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=2200&q=90", steps: ["Cooking", "Forming", "Cooling", "Finishing", "Packaging"] },
  { name: "Bar Line", number: "03", description: "Production flow for cereal, protein, nut and chocolate-based bars.", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=2200&q=90", steps: ["Mixing", "Forming", "Cutting", "Coating", "Cooling"] },
  { name: "Halva Line", number: "04", description: "Process-focused systems for tahini, halva preparation, forming and finishing.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2200&q=90", steps: ["Sesame", "Tahini", "Cooking", "Mixing", "Forming"] },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-kicker", { y: 25, opacity: 0, duration: .7 })
      .from(".hero-title-line", { yPercent: 115, duration: 1.1, stagger: .08 }, "-=.35")
      .from(".hero-copy", { y: 20, opacity: 0, duration: .7 }, "-=.55");

    gsap.to(".hero-image", { yPercent: 14, scale: 1.07, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-title", { yPercent: -15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".manifesto-word", { yPercent: 100, opacity: 0, stagger: .07, duration: .8, scrollTrigger: { trigger: ".manifesto", start: "top 72%" } });
    gsap.from(".product-panel", { y: 60, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: ".product-grid", start: "top 75%" } });

    const machine = gsap.timeline({ scrollTrigger: { trigger: ".machine-showcase", start: "top top", end: "+=3800", scrub: 1, pin: true, anticipatePin: 1 } });
    machine.fromTo(".machine-photo", { scale: 1.12 }, { scale: 1, duration: 1 });
    machines.slice(1).forEach((_, i) => {
      const n = i + 1;
      machine.to(`.machine-photo-${n - 1}`, { opacity: 0, scale: .95, duration: .45 }, "+=.25")
        .fromTo(`.machine-photo-${n}`, { opacity: 0, scale: 1.07 }, { opacity: 1, scale: 1, duration: .6 }, "<")
        .fromTo(`.machine-copy-${n}`, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .45 }, "<");
    });

    const line = gsap.timeline({ scrollTrigger: { trigger: ".production-story", start: "top top", end: "+=4800", scrub: 1, pin: true, anticipatePin: 1 } });
    line.fromTo(".line-image-0", { scale: 1.14 }, { scale: 1, duration: .8 });
    lines.slice(1).forEach((_, i) => {
      const n = i + 1;
      line.to(`.line-image-${n - 1}`, { opacity: 0, scale: .96, duration: .45 }, "+=.35")
        .fromTo(`.line-image-${n}`, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: .65 }, "<")
        .fromTo(`.line-copy-${n}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: .5 }, "<")
        .fromTo(`.line-steps-${n} span`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .3 }, "<");
    });

    gsap.from(".engineering-image", { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: ".engineering", start: "top 72%" } });
  }, { scope: root });

  return <main ref={root} className="bg-[#f3f1ec] text-[#111820]">
    <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 text-white mix-blend-difference md:px-10">
      <a href="#top" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></a>
      <div className="hidden gap-8 text-[11px] font-semibold uppercase tracking-[.18em] md:flex"><a href="#products">Applications</a><a href="#machines">Machinery</a><a href="#lines">Production Lines</a><a href="#engineering">Engineering</a><a href="#projects">Projects</a></div>
      <a href="#contact" className="border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] hover:bg-white hover:text-black">Request a quote</a>
    </nav>

    <section id="top" className="hero relative h-[100svh] min-h-[720px] overflow-hidden bg-black text-white">
      <div className="hero-image absolute inset-0"><Image src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=2400&q=90" alt="Industrial confectionery production" fill priority className="object-cover opacity-80" sizes="100vw" /><div className="absolute inset-0 bg-black/45" /></div><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
      <div className="hero-title relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20"><p className="hero-kicker mb-7 text-[10px] font-bold uppercase tracking-[.28em] text-white/70">KHANDABI / CONFECTIONERY MACHINERY / EST. 1986</p><h1 className="max-w-[1200px] overflow-hidden text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.82] tracking-[-.07em]"><span className="hero-title-line block">WE BUILD</span><span className="hero-title-line block pl-[8vw]">THE PROCESS.</span></h1><div className="hero-copy mt-8 flex max-w-4xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-base leading-7 text-white/75 md:text-lg">Machinery and complete production systems for chocolate, candy, bars, nougat, fondant, halva and more.</p><span className="text-[10px] uppercase tracking-[.2em] text-white/60">Scroll to explore ↓</span></div></div>
    </section>

    <section className="manifesto overflow-hidden bg-[#e7e3da] px-6 py-32 md:px-10 md:py-48"><p className="mb-10 text-[10px] font-bold uppercase tracking-[.28em] text-[#e76f32]">01 / What Khandabi does</p><h2 className="max-w-[1300px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[.9] tracking-[-.065em]"><span className="manifesto-word inline-block">FROM</span>{" "}<span className="manifesto-word inline-block">RAW</span>{" "}<span className="manifesto-word inline-block">INGREDIENTS</span>{" "}<span className="manifesto-word inline-block text-[#e76f32]">TO</span>{" "}<span className="manifesto-word inline-block">PRODUCTION.</span></h2></section>

    <section id="products" className="product-grid grid bg-[#111820] text-white md:grid-cols-2">{products.map((p, i) => <a href="#lines" key={p.title} className="product-panel group relative h-[70vh] min-h-[500px] overflow-hidden border-b border-white/20"><Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="50vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" /><div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10"><span className="text-[10px] uppercase tracking-[.22em] text-white/60">0{i + 1} / Application</span><div><h3 className="text-[clamp(3rem,5vw,6rem)] font-medium leading-[.85] tracking-[-.06em]">{p.title}</h3><span className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[.2em]">Explore process →</span></div></div></a>)}</section>

    <section id="machines" className="machine-showcase relative h-screen overflow-hidden bg-[#0c1116] text-white"><div className="absolute inset-0">{machines.map((m, i) => <div key={m[0]} className={`machine-photo machine-photo-${i} absolute inset-0 ${i ? "opacity-0" : "opacity-100"}`}><Image src={m[3]} alt={m[1]} fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/15" /></div>)}</div><div className="relative z-10 flex h-full flex-col justify-between px-6 py-24 md:px-10 md:py-28"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">03 / Machinery</p><h2 className="mt-6 max-w-3xl text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.82] tracking-[-.065em]">THE MACHINES<br /><span className="text-[#e76f32]">AT WORK.</span></h2></div><div className="max-w-5xl"><div className="mb-4 flex justify-between text-[10px] uppercase tracking-[.18em] text-white/45"><span>Machine range</span><span>06 / 06</span></div>{machines.map((m, i) => <div key={m[0]} className={`machine-copy-${i} flex items-center gap-4 border-t border-white/15 py-3 ${i ? "opacity-0" : "opacity-100"}`}><span className="w-7 text-[10px] text-[#e76f32]">{m[0]}</span><span className="flex-1 text-lg font-medium md:text-2xl">{m[1]}</span><span className="hidden text-[9px] uppercase tracking-[.16em] text-white/40 md:block">{m[2]}</span></div>)}</div></div></section>

    <section id="lines" className="production-story relative h-screen overflow-hidden bg-[#15191d] text-white"><div className="absolute inset-0">{lines.map((l, i) => <div key={l.number} className={`line-image-${i} absolute inset-0 ${i ? "opacity-0" : "opacity-100"}`}><Image src={l.image} alt={l.name} fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-black/55" /></div>)}</div><div className="relative z-10 grid h-full grid-cols-1 items-end gap-10 px-6 py-20 md:grid-cols-[1fr_1.1fr] md:px-10 md:py-24"><div className="pb-2"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">04 / Production lines</p><div className="mt-8 flex items-end gap-5"><span className="text-[10px] text-white/50">01—04</span><h2 className="text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[.8] tracking-[-.07em]">COMPLETE<br /><span className="text-[#e76f32]">LINES.</span></h2></div><p className="mt-10 max-w-lg text-base leading-7 text-white/65">A production line is more than a collection of machines. It is a controlled sequence of processes designed around the product, capacity and factory.</p></div><div className="relative min-h-[390px] md:min-h-[500px]"><div className="absolute bottom-0 right-0 w-full max-w-2xl border-l border-white/20 pl-6 md:pl-10"><span className="text-[10px] uppercase tracking-[.2em] text-white/45">Production architecture</span>{lines.map((l, i) => <div key={l.number} className={`line-copy-${i} ${i ? "opacity-0" : "opacity-100"} mt-5`}><div className="flex items-baseline justify-between border-b border-white/15 pb-4"><h3 className="text-4xl font-medium tracking-[-.045em] md:text-6xl">{l.name}</h3><span className="text-[#e76f32]">{l.number}</span></div><p className="mt-5 max-w-xl text-sm leading-6 text-white/60">{l.description}</p><div className={`line-steps-${i} mt-8 grid grid-cols-2 gap-y-4 text-[10px] font-bold uppercase tracking-[.16em] md:grid-cols-5`}>{l.steps.map((s, j) => <span key={s} className="opacity-0"><b className="text-[#e76f32]">0{j + 1}</b><br />{s}</span>)}</div></div>)}</div></div></div></section>

    <section id="engineering" className="engineering bg-[#d8d4cc] px-6 py-24 md:px-10 md:py-40"><div className="grid items-end gap-12 md:grid-cols-[1.1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">05 / Engineering</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.84] tracking-[-.065em]">ENGINEERED<br />AROUND<br /><span className="text-[#e76f32]">REALITY.</span></h2></div><div className="engineering-image relative aspect-[4/5] overflow-hidden"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=90" alt="Industrial engineering" fill className="object-cover" sizes="50vw" /></div></div></section>

    <section id="projects" className="bg-[#111820] px-6 py-28 text-white md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">06 / Projects</p><h2 className="mt-6 text-[clamp(4rem,8vw,9rem)] font-medium leading-[.8] tracking-[-.07em]">BUILT.<br />INSTALLED.<br /><span className="text-[#e76f32]">RUNNING.</span></h2></section>
    <section id="contact" className="bg-[#e76f32] px-6 py-28 md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-black/50">07 / Start a project</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">LET'S BUILD<br />YOUR LINE.</h2><a href="mailto:info@khandabi.com" className="border border-black/40 px-7 py-5 text-[11px] font-bold uppercase tracking-[.18em] hover:bg-black hover:text-white">Request a quote ↗</a></div></section>
    <footer className="flex flex-col justify-between gap-8 bg-black px-6 py-10 text-white md:flex-row md:px-10"><span className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></span><span className="text-[10px] uppercase tracking-[.18em] text-white/40">Confectionery machinery / Process engineering / EN · TR · FA</span><span className="text-[10px] uppercase tracking-[.18em] text-white/40">© Khandabi</span></footer>
  </main>;
}
