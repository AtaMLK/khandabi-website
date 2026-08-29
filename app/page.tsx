"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MachineryCatalogue from "./machinery/MachineryCatalogue";
import { machines } from "./machinery/data";

gsap.registerPlugin(ScrollTrigger);

const applications = [
  ["Chocolate", "Preparation, cooking, coating, storage and bar systems.", "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85"],
  ["Candy", "Cooking, forming, cooling and finishing systems.", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["Bars", "Chocolate, cereal and related bar production systems.", "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85"],
  ["Halva & Sesame", "Cooking, mixing and forming solutions.", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
];

const lines = [
  ["01", "Choco Bar Line", "Extruder system", "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85"],
  ["02", "Choco Bar Line", "Drum system", "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85"],
  ["03", "Smart Chocolate Dragee", "Production line", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["04", "Dragee Gum", "Production line", "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85"],
  ["05", "Halva", "Cooking & forming", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
  ["06", "Sesame Bar", "Production line", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"],
];

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-kicker", { y: 24, opacity: 0, duration: .7 })
      .from(".hero-line", { yPercent: 110, duration: 1, stagger: .08 }, "-=.35")
      .from(".hero-copy", { y: 24, opacity: 0, duration: .7 }, "-=.5");
    gsap.to(".hero-photo", { yPercent: 12, scale: 1.07, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".manifesto-word", { yPercent: 100, opacity: 0, stagger: .06, duration: .75, scrollTrigger: { trigger: ".manifesto", start: "top 75%" } });
    gsap.from(".application-panel", { y: 45, opacity: 0, stagger: .08, duration: .7, scrollTrigger: { trigger: ".applications", start: "top 75%" } });
    gsap.from(".range-heading", { y: 45, opacity: 0, duration: .8, scrollTrigger: { trigger: ".range-section", start: "top 75%" } });
    gsap.from(".line-card", { y: 45, opacity: 0, stagger: .08, duration: .7, scrollTrigger: { trigger: ".lines", start: "top 75%" } });
    gsap.from(".about-copy", { x: -45, opacity: 0, duration: .9, scrollTrigger: { trigger: ".about", start: "top 75%" } });
    gsap.from(".about-image", { clipPath: "inset(0 100% 0 0)", duration: 1.1, ease: "power4.inOut", scrollTrigger: { trigger: ".about", start: "top 70%" } });
    mm.add("(min-width: 769px)", () => gsap.to(".line-track", { xPercent: -18, ease: "none", scrollTrigger: { trigger: ".lines", start: "top bottom", end: "bottom top", scrub: 1 } }));
    return () => mm.revert();
  }, { scope: root });

  return (
    <main ref={root} className="bg-[#f3f1ec] text-[#111820]">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 text-white mix-blend-difference md:px-10">
        <Link href="#top" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <div className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[.18em] md:flex"><Link href="#applications">Applications</Link><Link href="#machinery">Machinery</Link><Link href="#lines">Lines</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        <Link href="/contact" className="border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] transition hover:bg-white hover:text-black">Request a quote</Link>
      </nav>

      <section id="top" className="hero relative h-[100svh] min-h-[680px] overflow-hidden bg-black text-white">
        <div className="hero-photo absolute inset-0"><Image src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=2400&q=90" alt="Confectionery production" fill priority className="object-cover opacity-80" sizes="100vw" /><div className="absolute inset-0 bg-black/45" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
        <div className="hero-title relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-10 md:pb-20"><p className="hero-kicker mb-7 text-[10px] font-bold uppercase tracking-[.28em] text-white/70">KHANDABI / CONFECTIONERY MACHINERY</p><h1 className="max-w-[1200px] overflow-hidden text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.82] tracking-[-.07em]"><span className="hero-line block">WE BUILD</span><span className="hero-line block pl-[8vw]">THE PROCESS.</span></h1><div className="hero-copy mt-8 flex max-w-4xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-base leading-7 text-white/75 md:text-lg">Machinery and complete production systems for chocolate, candy, bars, nougat, fondant, halva and more.</p><span className="text-[10px] uppercase tracking-[.2em] text-white/60">Scroll to explore ↓</span></div></div>
      </section>

      <section className="manifesto overflow-hidden bg-[#e7e3da] px-6 py-28 md:px-10 md:py-40"><p className="mb-9 text-[10px] font-bold uppercase tracking-[.28em] text-[#e76f32]">01 / Khandabi</p><h2 className="max-w-[1300px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[.9] tracking-[-.065em]"><span className="manifesto-word inline-block">FROM</span> <span className="manifesto-word inline-block">MACHINE</span> <span className="manifesto-word inline-block">TO</span> <span className="manifesto-word inline-block text-[#e76f32]">COMPLETE</span> <span className="manifesto-word inline-block">LINE.</span></h2><p className="ml-auto mt-14 max-w-xl text-sm leading-7 text-black/55">Khandabi develops, manufactures, installs and supports confectionery machinery and production systems.</p></section>

      <section id="applications" className="applications grid grid-cols-1 bg-[#111820] text-white">{applications.map(([title, detail, image], i) => <Link href="#lines" key={title} className="application-panel group relative h-[65vh] min-h-[480px] overflow-hidden border-b border-white/15 md:min-h-[560px]"><Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="50vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" /><div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10"><div className="flex justify-between text-[10px] uppercase tracking-[.2em] text-white/55"><span>0{i + 1}</span><span>Application</span></div><div><h3 className="text-[clamp(3rem,5vw,6rem)] font-medium leading-[.85] tracking-[-.06em]">{title}</h3><p className="mt-5 max-w-md text-sm leading-6 text-white/60">{detail}</p><span className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[.2em] transition-transform group-hover:translate-x-3">Explore →</span></div></div></Link>)}</section>

      <section id="machinery" className="range-section bg-white px-0 py-24 md:py-32"><div className="range-heading flex flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-10"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">03 / Full range</p><h2 className="mt-5 text-[clamp(4rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">OUR<br />MACHINERY.</h2></div><p className="max-w-md text-sm leading-7 text-black/50">All {machines.length} machines. Hover any item for a visual preview; open it for the dedicated product page.</p></div><div className="mt-14"><MachineryCatalogue machines={machines} /></div></section>

      <section id="lines" className="lines overflow-hidden bg-[#111820] py-24 text-white md:py-32"><div className="px-6 md:px-10"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">04 / Production lines</p><h2 className="mt-5 max-w-5xl text-[clamp(4rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">COMPLETE<br /><span className="text-[#e76f32]">SYSTEMS.</span></h2></div><div className="line-track mt-16 flex w-max gap-5 px-6 md:px-10">{lines.map(([no, title, type, image]) => <article className="line-card group relative h-[520px] w-[78vw] max-w-[620px] overflow-hidden md:w-[48vw]" key={no}><Image src={image} alt={`${title} ${type}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="620px" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" /><div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-9"><span className="text-[10px] text-[#e76f32]">{no}</span><h3 className="mt-2 text-4xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-white/50">{type}</p></div></article>)}</div></section>

      <section id="about" className="about grid bg-[#d8d4cc] md:grid-cols-[1fr_.9fr]"><div className="about-copy flex flex-col justify-center px-6 py-24 md:px-10 md:py-32"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">05 / About</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[.82] tracking-[-.07em]">ENGINEERING<br />FOR THE<br /><span className="text-[#e76f32]">PRODUCT.</span></h2><p className="mt-10 max-w-xl text-base leading-7 text-black/55">Khandabi's range combines individual machines with production-line solutions.</p><Link href="/about" className="mt-8 w-fit text-[10px] font-bold uppercase tracking-[.18em] text-[#e76f32]">About Khandabi →</Link></div><div className="about-image relative min-h-[560px]"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90" alt="Industrial engineering" fill className="object-cover" sizes="50vw" /></div></section>

      <section id="contact" className="bg-[#e76f32] px-6 py-24 md:px-10 md:py-36"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-black/50">06 / Start a project</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.075em]">LET'S BUILD<br />YOUR LINE.</h2><Link href="/contact" className="w-fit border border-black/40 px-7 py-5 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-black hover:text-white">Request a quote ↗</Link></div></section>

      <footer className="flex flex-col justify-between gap-6 bg-black px-6 py-9 text-white md:flex-row md:items-center md:px-10"><span className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></span><div className="flex gap-6 text-[10px] uppercase tracking-[.18em] text-white/40"><Link href="#applications">Applications</Link><Link href="#machinery">Machinery</Link><Link href="#lines">Lines</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><span className="text-[10px] uppercase tracking-[.18em] text-white/40">© Khandabi Machinery Co.</span></footer>
    </main>
  );
}
