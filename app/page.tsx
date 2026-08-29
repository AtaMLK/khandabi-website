"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  ["Chocolate", "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85"],
  ["Candy", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["Bars", "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85"],
  ["Halva & Sesame", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
];
const machines = [
  ["01", "Continuous Vacuum Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1581093458791-9d42e3c7f5b4?auto=format&fit=crop&w=1800&q=90"],
  ["02", "Continuous Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1800&q=90"],
  ["03", "Batch Cooker", "COOKING SYSTEMS", "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1800&q=90"],
  ["04", "Nougat Cooker & Aeration", "NOUGAT SYSTEMS", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=90"],
  ["05", "Enrober & Coating Systems", "CHOCOLATE SYSTEMS", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90"],
  ["06", "Cooling Tunnels", "COOLING SYSTEMS", "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=90"],
];
const process = ["Preparation", "Cooking", "Forming", "Coating", "Cooling", "Packaging"];
const capabilities = ["Process design", "Machine engineering", "Line integration", "Factory installation", "Commissioning", "After-sales support"];
const navItems = [["Applications", "products"], ["Machinery", "machines"], ["Production Lines", "production"], ["Engineering", "engineering"], ["Projects", "projects"]];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-kicker", { y: 25, opacity: 0, duration: .7 })
      .from(".hero-line", { yPercent: 110, duration: 1.1, stagger: .08 }, "-=.35")
      .from(".hero-copy", { y: 25, opacity: 0, duration: .7 }, "-=.55");

    gsap.to(".hero-photo", { yPercent: 14, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-title", { yPercent: -15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".manifesto-word", { yPercent: 100, opacity: 0, stagger: .07, duration: .8, scrollTrigger: { trigger: ".manifesto", start: "top 72%" } });
    gsap.from(".product-panel", { y: 60, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: ".products", start: "top 75%" } });
    gsap.from(".engineering-photo", { clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: ".engineering", start: "top 70%" } });
    gsap.from(".capability", { y: 35, opacity: 0, stagger: .08, duration: .65, scrollTrigger: { trigger: ".capabilities", start: "top 75%" } });
    gsap.from(".project-image", { yPercent: 15, scale: 1.12, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: ".projects", start: "top 70%" } });

    mm.add("(min-width: 768px)", () => {
      const machine = gsap.timeline({ scrollTrigger: { trigger: ".machines", start: "top top", end: "+=3900", scrub: 1, pin: true, anticipatePin: 1 } });
      machine.fromTo(".machine-photo", { scale: 1.12 }, { scale: 1, duration: 1 });
      machines.slice(1).forEach((_, i) => {
        const n = i + 1;
        machine.to(`.machine-photo-${n - 1}`, { opacity: 0, scale: .94, duration: .45 }, "+=.25")
          .fromTo(`.machine-photo-${n}`, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: .6 }, "<")
          .fromTo(`.machine-row-${n}`, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, "<");
      });

      const line = gsap.timeline({ scrollTrigger: { trigger: ".production", start: "top top", end: "+=2600", scrub: 1, pin: true, anticipatePin: 1 } });
      line.fromTo(".production-photo", { scale: 1.14 }, { scale: 1, duration: 1 })
        .fromTo(".process-track", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.8 }, "-=.4")
        .fromTo(".process-item", { y: 35, opacity: 0 }, { y: 0, opacity: 1, stagger: .18, duration: .4 }, "-=1.2");

      return () => {
        machine.kill();
        line.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(".machine-photo", { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".machines", start: "top 75%" } });
      gsap.fromTo(".production-photo", { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".production", start: "top 75%" } });
    });

    return () => mm.revert();
  }, { scope: root });

  return <main ref={root} className="bg-[#f3f1ec] text-[#111820]">
    <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 text-white mix-blend-difference md:px-10">
      <a href="#top" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></a>
      <div className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[.18em] md:flex">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
      <div className="flex items-center gap-3"><a href="#contact" className="hidden border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] transition hover:bg-white hover:text-black md:block">Request a quote</a><button aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="flex h-10 w-10 items-center justify-center border border-white/40 md:hidden"><span className="text-lg">{menuOpen ? "×" : "☰"}</span></button></div>
    </nav>
    <div className={`fixed inset-0 z-40 bg-[#111820] text-white transition-transform duration-500 md:hidden ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}><div className="flex h-full flex-col justify-center px-8 pt-16">{navItems.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="border-b border-white/15 py-5 text-3xl font-medium tracking-[-.04em]">0{i + 1} / {label}</a>)}<a href="#contact" onClick={() => setMenuOpen(false)} className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-[#e76f32]">Request a quote →</a></div></div>

    <section id="top" className="hero relative h-[100svh] min-h-[680px] overflow-hidden bg-black text-white"><div className="hero-photo absolute inset-0"><Image src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=2400&q=90" alt="Confectionery production" fill priority className="object-cover opacity-80" sizes="100vw" /><div className="absolute inset-0 bg-black/45" /></div><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" /><div className="hero-title relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20"><p className="hero-kicker mb-7 text-[10px] font-bold uppercase tracking-[.28em] text-white/70">KHANDABI / CONFECTIONERY MACHINERY / EST. 1986</p><h1 className="max-w-[1200px] overflow-hidden text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.82] tracking-[-.07em]"><span className="hero-line block">WE BUILD</span><span className="hero-line block pl-[8vw]">THE PROCESS.</span></h1><div className="hero-copy mt-8 flex max-w-4xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-base leading-7 text-white/75 md:text-lg">Machinery and complete production systems for chocolate, candy, bars, nougat, fondant, halva and more.</p><span className="text-[10px] uppercase tracking-[.2em] text-white/60">Scroll to explore ↓</span></div></div></section>

    <section className="manifesto overflow-hidden bg-[#e7e3da] px-6 py-32 md:px-10 md:py-48"><p className="mb-10 text-[10px] font-bold uppercase tracking-[.28em] text-[#e76f32]">01 / What Khandabi does</p><h2 className="max-w-[1300px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[.9] tracking-[-.065em]"><span className="manifesto-word inline-block">FROM</span>{" "}<span className="manifesto-word inline-block">RAW</span>{" "}<span className="manifesto-word inline-block">INGREDIENTS</span>{" "}<span className="manifesto-word inline-block text-[#e76f32]">TO</span>{" "}<span className="manifesto-word inline-block">PRODUCTION.</span></h2></section>

    <section id="products" className="products grid grid-cols-1 bg-[#111820] text-white md:grid-cols-2">{products.map(([title, image], i) => <a href="#production" key={title} className="product-panel group relative h-[72vh] min-h-[520px] overflow-hidden border-b border-white/20 md:border-r"><Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="50vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" /><div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10"><div className="flex justify-between text-[10px] uppercase tracking-[.2em] text-white/60"><span>0{i + 1}</span><span>Application</span></div><div><h3 className="text-[clamp(3rem,5vw,6rem)] font-medium leading-[.85] tracking-[-.06em]">{title}</h3><span className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[.2em] transition-transform group-hover:translate-x-3">Explore process →</span></div></div></a>)}</section>

    <section id="machines" className="machines relative min-h-screen overflow-hidden bg-[#0c1116] text-white md:h-screen"><div className="absolute inset-0">{machines.map(([no, title, type, image], i) => <div key={no} className={`machine-photo machine-photo-${i} absolute inset-0 ${i ? "opacity-0" : "opacity-100"}`}><Image src={image} alt={title} fill className="object-cover" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/20" /></div>)}</div><div className="relative z-10 grid min-h-screen grid-cols-1 gap-10 px-6 py-24 md:h-full md:grid-cols-[.75fr_1.25fr] md:px-10"><div className="flex flex-col justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">03 / Machinery</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.82] tracking-[-.065em]">THE<br />MACHINES<br /><span className="text-[#e76f32]">AT WORK.</span></h2></div><p className="max-w-sm text-sm leading-7 text-white/55">A visual index of the equipment behind the production process.</p></div><div className="flex flex-col justify-end"><div className="mb-8 border-t border-white/25 pt-5 text-[10px] uppercase tracking-[.2em] text-white/50">Machine range / 06</div>{machines.map(([no, title, type], i) => <div key={no} className={`machine-row-${i} flex items-center gap-5 border-t border-white/15 py-4 ${i ? "opacity-0 md:opacity-0" : "opacity-100"}`}><span className="w-8 text-[10px] text-[#e76f32]">{no}</span><span className="flex-1 text-lg font-medium md:text-2xl">{title}</span><span className="hidden text-[9px] uppercase tracking-[.16em] text-white/40 md:block">{type}</span></div>)}</div></div></section>

    <section id="production" className="production relative min-h-screen overflow-hidden bg-black text-white md:h-screen"><div className="production-photo absolute inset-0"><Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90" alt="Production line" fill className="object-cover opacity-55" sizes="100vw" /></div><div className="absolute inset-0 bg-black/55" /><div className="relative z-10 flex min-h-screen flex-col justify-between p-6 md:h-full md:p-10"><div className="flex justify-between"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-white/60">04 / Production lines</p><p className="text-[10px] uppercase tracking-[.2em] text-white/50">Scroll →</p></div><div><h2 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">ONE FACTORY.<br /><span className="text-[#e76f32]">ONE FLOW.</span></h2><div className="mt-14 h-px w-full bg-white/30"><div className="process-track h-full w-full bg-white" /></div><div className="mt-6 grid grid-cols-2 gap-y-5 md:grid-cols-6">{process.map((step, i) => <div className="process-item text-[10px] font-bold uppercase tracking-[.18em] opacity-0" key={step}><span className="text-[#e76f32]">0{i + 1}</span><br />{step}</div>)}</div></div></div></section>

    <section id="engineering" className="engineering bg-[#d8d4cc] px-6 py-24 md:px-10 md:py-36"><div className="grid items-end gap-14 md:grid-cols-[1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">05 / Engineering</p><h2 className="mt-6 max-w-4xl text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">ENGINEERED<br />AROUND<br /><span className="text-[#e76f32]">THE PROCESS.</span></h2><p className="mt-10 max-w-xl text-base leading-7 text-black/60">From an individual machine to an integrated production system, engineering starts with understanding the product, process and factory conditions.</p></div><div className="engineering-photo relative aspect-[4/5] overflow-hidden"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90" alt="Engineering and industrial design" fill className="object-cover" sizes="50vw" /></div></div></section>

    <section className="capabilities bg-white px-6 py-24 md:px-10 md:py-32"><div className="mb-16 flex items-end justify-between gap-10"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">06 / Capability</p><h2 className="mt-5 text-5xl font-medium tracking-[-.055em] md:text-7xl">FROM IDEA<br />TO RUNNING LINE.</h2></div><p className="hidden max-w-sm text-sm leading-6 text-black/50 md:block">The final site will connect these capabilities to verified Khandabi content, technical documents and project evidence.</p></div><div className="grid border-t border-black/15 md:grid-cols-2">{capabilities.map((item, i) => <div className="capability border-b border-black/15 py-7" key={item}><span className="mr-8 text-[10px] text-[#e76f32]">0{i + 1}</span><span className="text-2xl font-medium tracking-[-.03em] md:text-4xl">{item}</span></div>)}</div></section>

    <section id="projects" className="projects overflow-hidden bg-[#111820] text-white"><div className="grid min-h-[90vh] md:grid-cols-[.8fr_1.2fr]"><div className="flex flex-col justify-between px-6 py-24 md:px-10 md:py-32"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">07 / Projects</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.82] tracking-[-.07em]">BUILT.<br />INSTALLED.<br /><span className="text-[#e76f32]">RUNNING.</span></h2></div><p className="max-w-md text-sm leading-7 text-white/50">A proof-driven project archive: complete lines, machinery installations, locations, applications and technical scope.</p></div><div className="project-image relative min-h-[65vh] overflow-hidden"><Image src="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1800&q=90" alt="Industrial factory project" fill className="object-cover" sizes="60vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><div className="absolute bottom-8 left-8 right-8 flex items-end justify-between"><span className="text-[10px] uppercase tracking-[.2em] text-white/60">Project archive / 01</span><a href="#contact" className="text-[10px] font-bold uppercase tracking-[.2em]">Explore projects ↗</a></div></div></div></section>

    <section id="contact" className="bg-[#e76f32] px-6 py-28 md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-black/50">08 / Start a project</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">LET'S BUILD<br />YOUR LINE.</h2><a href="mailto:info@khandabi.com" className="border border-black/40 px-7 py-5 text-[11px] font-bold uppercase tracking-[.18em] transition hover:bg-black hover:text-white">Request a quote ↗</a></div></section>

    <footer className="flex flex-col justify-between gap-8 bg-black px-6 py-10 text-white md:flex-row md:px-10"><span className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></span><span className="text-[10px] uppercase tracking-[.18em] text-white/40">Confectionery machinery / Process engineering / EN · TR · FA</span><span className="text-[10px] uppercase tracking-[.18em] text-white/40">© Khandabi</span></footer>
  </main>;
}
