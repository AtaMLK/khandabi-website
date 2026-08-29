"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const applications = [
  ["Chocolate", "Chocolate preparation, coating, storage and bar systems.", "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85"],
  ["Candy", "Cooking, forming, cooling and finishing systems.", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["Bars", "Chocolate, cereal and related bar production systems.", "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85"],
  ["Halva & Sesame", "Cooking, mixing and forming solutions for halva and sesame products.", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
];

const machinery = [
  "Continuous Vacuum Cooker", "Continuous Cooker", "Batch Cooker", "Nougat Cooker", "Double Jacketed Tanks", "Syrup Making Machine",
  "Chocolate Coating Machine / Enrober", "Decorator", "Coating Machine & Cooling Tunnel", "Laboratory Coating Machine", "Choco Bar Line — Extruder System", "Choco Bar Line — Drum System",
  "Slitting & Dividing Machine", "Slab Drum Machine", "Guillotine", "Smart Chocolate Dragee Production Line", "Dragee Gum Production Line", "Laboratory Dragee Gum Forming",
  "Fondant Machine", "Two-Level Fondant Machine", "Laboratory Cooker", "Laboratory Conche", "Chocolate Storage Tank", "Laboratory Ball Mills",
  "Ball Mills", "Wafer Scrap Grinder", "Turbo Mixer", "Caramel Dough Preparation Mixer", "Grinder", "Frappe Aerator", "Laboratory Mixer",
  "Crocant Cooking Machine", "Direct Flame Crocant Cooker", "Silverson Mixer", "Sesame & Nut Single-Jacket Mixer", "Cold Table", "Mixer", "Laboratory Dragee Coating Machine",
  "Dragee Coating Pan", "Mobile Dragee Coating Pan", "Chocolate Dragee Coating System", "Halva Cooking Machine", "Halva Forming Line", "Sesame Bar Production Line", "Conche Machine",
];

const lines = [
  ["01", "Choco Bar Line", "Extruder system", "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85"],
  ["02", "Choco Bar Line", "Drum system", "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85"],
  ["03", "Smart Chocolate Dragee", "Production line", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["04", "Dragee Gum", "Production line", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["05", "Halva", "Cooking & forming", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
  ["06", "Sesame Bar", "Production line", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
];

const capabilities = ["Process understanding", "Machine selection", "Custom engineering", "Line integration", "Factory installation", "Commissioning & support"];

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.from(".hero-kicker", { y: 25, opacity: 0, duration: .7 })
      .from(".hero-line", { yPercent: 110, duration: 1.1, stagger: .08 }, "-=.35")
      .from(".hero-copy", { y: 25, opacity: 0, duration: .7 }, "-=.55");

    gsap.to(".hero-photo", { yPercent: 14, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-title", { yPercent: -15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".manifesto-word", { yPercent: 100, opacity: 0, stagger: .07, duration: .8, scrollTrigger: { trigger: ".manifesto", start: "top 72%" } });
    gsap.from(".application-panel", { y: 60, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: ".applications", start: "top 75%" } });
    gsap.from(".catalogue-item", { x: -30, opacity: 0, stagger: .025, duration: .45, scrollTrigger: { trigger: ".catalogue", start: "top 70%" } });
    gsap.from(".capability", { y: 35, opacity: 0, stagger: .07, duration: .6, scrollTrigger: { trigger: ".capabilities", start: "top 75%" } });
    gsap.from(".about-image", { clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: ".about", start: "top 70%" } });

    mm.add("(min-width: 769px)", () => {
      const machine = gsap.timeline({ scrollTrigger: { trigger: ".machine-showcase", start: "top top", end: "+=3900", scrub: 1, pin: true, anticipatePin: 1 } });
      machine.fromTo(".machine-photo-0", { scale: 1.12 }, { scale: 1, duration: 1 });
      machinery.slice(1, 6).forEach((_, i) => {
        const n = i + 1;
        machine.to(`.machine-photo-${n - 1}`, { opacity: 0, scale: .94, duration: .45 }, "+=.2")
          .fromTo(`.machine-photo-${n}`, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: .6 }, "<")
          .fromTo(`.machine-row-${n}`, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, "<");
      });

      const production = gsap.timeline({ scrollTrigger: { trigger: ".production", start: "top top", end: "+=2600", scrub: 1, pin: true } });
      production.fromTo(".production-photo", { scale: 1.14 }, { scale: 1, duration: 1 })
        .fromTo(".process-track", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.8 }, "-=.4")
        .fromTo(".process-item", { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: .18, duration: .4 }, "-=1.2");

      const line = gsap.timeline({ scrollTrigger: { trigger: ".line-gallery", start: "top top", end: "+=2600", scrub: 1, pin: true } });
      line.fromTo(".line-image-0", { scale: 1.12 }, { scale: 1, duration: 1 });
      lines.slice(1).forEach((_, i) => {
        const n = i + 1;
        line.to(`.line-image-${n - 1}`, { opacity: 0, scale: .96, duration: .45 }, "+=.25")
          .fromTo(`.line-image-${n}`, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: .6 }, "<")
          .fromTo(`.line-label-${n}`, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, "<");
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <main ref={root} className="bg-[#f3f1ec] text-[#111820]">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 text-white mix-blend-difference md:px-10">
        <a href="#top" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></a>
        <div className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[.18em] md:flex"><a href="#applications">Applications</a><a href="#machinery">Machinery</a><a href="#lines">Lines</a><a href="#about">About</a><a href="#contact">Contact</a></div>
        <a href="#contact" className="border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] transition hover:bg-white hover:text-black">Request a quote</a>
      </nav>

      <section id="top" className="hero relative h-[100svh] min-h-[720px] overflow-hidden bg-black text-white">
        <div className="hero-photo absolute inset-0"><Image src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=2400&q=90" alt="Confectionery production" fill priority className="object-cover opacity-80" sizes="100vw" /><div className="absolute inset-0 bg-black/45" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />
        <div className="hero-title relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p className="hero-kicker mb-7 text-[10px] font-bold uppercase tracking-[.28em] text-white/70">KHANDABI / CONFECTIONERY MACHINERY</p>
          <h1 className="max-w-[1200px] overflow-hidden text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.82] tracking-[-.07em]"><span className="hero-line block">WE BUILD</span><span className="hero-line block pl-[8vw]">THE PROCESS.</span></h1>
          <div className="hero-copy mt-8 flex max-w-4xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-base leading-7 text-white/75 md:text-lg">Machinery and complete production systems for chocolate, candy, bars, nougat, fondant, halva and more.</p><span className="text-[10px] uppercase tracking-[.2em] text-white/60">Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="manifesto overflow-hidden bg-[#e7e3da] px-6 py-32 md:px-10 md:py-48"><p className="mb-10 text-[10px] font-bold uppercase tracking-[.28em] text-[#e76f32]">01 / What Khandabi does</p><h2 className="max-w-[1300px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[.9] tracking-[-.065em]"><span className="manifesto-word inline-block">FROM</span>{" "}<span className="manifesto-word inline-block">MACHINE</span>{" "}<span className="manifesto-word inline-block">TO</span>{" "}<span className="manifesto-word inline-block text-[#e76f32]">COMPLETE</span>{" "}<span className="manifesto-word inline-block">LINE.</span></h2><div className="mt-16 flex justify-end"><p className="max-w-xl text-sm leading-7 text-black/60">Khandabi develops, manufactures, installs and supports machinery and confectionery production systems. The existing company site lists machinery, production lines and layouts as its core product structure. citeturn2search0</p></div></section>

      <section id="applications" className="applications grid grid-cols-1 bg-[#111820] text-white md:grid-cols-2">
        {applications.map(([title, detail, image], i) => <a href="#lines" key={title} className="application-panel group relative h-[72vh] min-h-[520px] overflow-hidden border-b border-white/20 md:border-r"><Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="50vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" /><div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10"><div className="flex justify-between text-[10px] uppercase tracking-[.2em] text-white/60"><span>0{i + 1}</span><span>Application</span></div><div><h3 className="text-[clamp(3rem,5vw,6rem)] font-medium leading-[.85] tracking-[-.06em]">{title}</h3><p className="mt-5 max-w-md text-sm leading-6 text-white/65">{detail}</p><span className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[.2em] transition-transform group-hover:translate-x-3">Explore process →</span></div></div></a>)}
      </section>

      <section id="machinery" className="machine-showcase relative h-screen overflow-hidden bg-[#0c1116] text-white">
        <div className="absolute inset-0">{machinery.slice(0, 6).map((name, i) => <div key={name} className={`machine-photo-${i} absolute inset-0 ${i ? "opacity-0" : "opacity-100"}`}><Image src={applications[i % applications.length][2]} alt={name} fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/20" /></div>)}</div>
        <div className="relative z-10 grid h-full grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[.75fr_1.25fr] md:px-10"><div className="flex flex-col justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">03 / Machinery</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.82] tracking-[-.065em]">THE<br />MACHINES<br /><span className="text-[#e76f32]">BEHIND IT.</span></h2></div><p className="max-w-sm text-sm leading-7 text-white/55">From cooking and mixing to coating, forming and storage, the machinery catalogue covers individual process stages and complete production equipment. citeturn1search0</p></div><div className="flex flex-col justify-end"><div className="mb-8 border-t border-white/25 pt-5 text-[10px] uppercase tracking-[.2em] text-white/50">Featured machinery / 06</div>{machinery.slice(0, 6).map(([name], i) => <div key={name} className={`machine-row-${i} flex items-center gap-5 border-t border-white/15 py-3 ${i ? "opacity-0" : "opacity-100"}`}><span className="w-8 text-[10px] text-[#e76f32]">0{i + 1}</span><span className="flex-1 text-lg font-medium md:text-2xl">{name}</span><span className="text-xl">↗</span></div>)}</div></div>
      </section>

      <section className="catalogue bg-white px-6 py-24 md:px-10 md:py-36"><div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">04 / Machinery catalogue</p><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.84] tracking-[-.065em]">THE FULL<br />RANGE.</h2></div><p className="max-w-md text-sm leading-7 text-black/55">The catalogue index preserves the existing product terminology while the visual product pages are built around real Khandabi images and technical documents.</p></div><div className="grid border-t border-black/15 md:grid-cols-2">{machinery.map((item, i) => <a href="#contact" key={item} className="catalogue-item group flex items-center border-b border-black/15 py-5 pr-4"><span className="mr-5 w-7 text-[10px] text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span><span className="flex-1 text-base font-medium transition-transform group-hover:translate-x-2 md:text-xl">{item}</span><span className="text-black/30 transition-transform group-hover:translate-x-1">↗</span></a>)}</div></section>

      <section id="lines" className="line-gallery relative h-screen overflow-hidden bg-black text-white"><div className="absolute inset-0">{lines.map(([no, title, type, image], i) => <div key={no} className={`line-image-${i} absolute inset-0 ${i ? "opacity-0" : "opacity-100"}`}><Image src={image} alt={`${title} ${type}`} fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-black/55" /></div>)}</div><div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10"><div className="flex justify-between"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-white/60">05 / Production lines</p><p className="text-[10px] uppercase tracking-[.2em] text-white/50">Scroll →</p></div><div><h2 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">COMPLETE<br /><span className="text-[#e76f32]">PRODUCTION.</span></h2><div className="mt-12 flex gap-10 overflow-hidden">{lines.map(([no, title, type], i) => <div key={no} className={`line-label-${i} min-w-[230px] ${i ? "opacity-0" : "opacity-100"}`}><span className="text-[10px] text-[#e76f32]">{no}</span><h3 className="mt-2 text-2xl font-medium">{title}</h3><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/45">{type}</p></div>)}</div></div></div></section>

      <section className="production relative overflow-hidden bg-[#111820] text-white"><div className="production-photo absolute inset-0"><Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90" alt="Industrial production" fill className="object-cover opacity-30" sizes="100vw" /></div><div className="relative z-10 px-6 py-28 md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">06 / The process</p><h2 className="mt-6 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">ONE PRODUCT.<br /><span className="text-[#e76f32]">ONE FLOW.</span></h2><div className="mt-20"><div className="process-track h-px w-full bg-white/50" /><div className="mt-7 grid grid-cols-2 gap-y-7 md:grid-cols-6">{["Preparation", "Cooking", "Forming", "Coating", "Cooling", "Packaging"].map((step, i) => <div className="process-item text-[10px] font-bold uppercase tracking-[.18em]" key={step}><span className="text-[#e76f32]">0{i + 1}</span><br />{step}</div>)}</div></div></div></section>

      <section id="about" className="about bg-[#d8d4cc] px-6 py-24 md:px-10 md:py-36"><div className="grid items-end gap-14 md:grid-cols-[1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">07 / About Khandabi</p><h2 className="mt-6 max-w-4xl text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">ENGINEERING<br />FOR THE<br /><span className="text-[#e76f32]">PRODUCT.</span></h2><p className="mt-10 max-w-xl text-base leading-7 text-black/60">Khandabi describes its business as production, repair and installation of confectionery and chocolate machinery and lines, with a long operating history in the sector. citeturn1search0</p></div><div className="about-image relative aspect-[4/5] overflow-hidden"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90" alt="Industrial engineering" fill className="object-cover" sizes="50vw" /></div></div></section>

      <section className="capabilities bg-white px-6 py-24 md:px-10 md:py-32"><div className="mb-16"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">08 / Capability</p><h2 className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.84] tracking-[-.065em]">FROM IDEA<br />TO RUNNING LINE.</h2></div><div className="grid border-t border-black/15 md:grid-cols-2">{capabilities.map((item, i) => <div className="capability border-b border-black/15 py-7" key={item}><span className="mr-8 text-[10px] text-[#e76f32]">0{i + 1}</span><span className="text-2xl font-medium tracking-[-.03em] md:text-4xl">{item}</span></div>)}</div></section>

      <section className="contact-info bg-[#111820] px-6 py-24 text-white md:px-10 md:py-32"><div className="grid gap-16 md:grid-cols-3"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#e76f32]">Iran factory</p><p className="mt-5 max-w-xs text-sm leading-7 text-white/60">No. 69, Dordaneh Alley, Emamzadeh Blvd., Shahre Qods, Karaj Old Road, 20km, Tehran, Iran</p><p className="mt-4 text-sm text-white/60">+98 21 4684 9060-1</p></div><div><p className="text-[10px] uppercase tracking-[.2em] text-[#e76f32]">Turkey address</p><p className="mt-5 max-w-xs text-sm leading-7 text-white/60">No. 339, Block C-6, Eskoop Industrial Area, Ikitelli — Basaksehir, Istanbul, Turkey</p><p className="mt-4 text-sm text-white/60">+90 212 671 2646</p></div><div><p className="text-[10px] uppercase tracking-[.2em] text-[#e76f32]">Contact</p><a className="mt-5 block text-2xl font-medium" href="mailto:info@khandabi.com">info@khandabi.com</a><p className="mt-4 text-[10px] uppercase tracking-[.18em] text-white/40">English · Türkçe · فارسی</p></div></div></section>

      <section id="contact" className="bg-[#e76f32] px-6 py-28 md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-black/50">09 / Start a project</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">LET'S BUILD<br />YOUR LINE.</h2><a href="mailto:info@khandabi.com" className="border border-black/40 px-7 py-5 text-[11px] font-bold uppercase tracking-[.18em] transition hover:bg-black hover:text-white">Request a quote ↗</a></div></section>

      <footer className="flex flex-col justify-between gap-8 bg-black px-6 py-10 text-white md:flex-row md:px-10"><span className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></span><div className="flex gap-6 text-[10px] uppercase tracking-[.18em] text-white/40"><a href="#applications">Applications</a><a href="#machinery">Machinery</a><a href="#lines">Lines</a><a href="#about">About</a></div><span className="text-[10px] uppercase tracking-[.18em] text-white/40">© Khandabi Machinery Co.</span></footer>
    </main>
  );
}
