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

const machines = ["Continuous Vacuum Cooker", "Continuous Cooker", "Batch Cooker", "Nougat Cooker & Aeration", "Enrober & Coating Systems", "Cooling Tunnels"];

export default function Home() {
  const page = useRef<HTMLElement>(null);

  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.from(".hero-kicker", { y: 30, opacity: 0, duration: 0.8 })
      .from(".hero-title-line", { yPercent: 115, duration: 1.15, stagger: 0.08 }, "-=0.45")
      .from(".hero-copy", { y: 25, opacity: 0, duration: 0.8 }, "-=0.65")
      .from(".hero-meta", { opacity: 0, x: -20, duration: 0.7 }, "-=0.45");

    gsap.to(".hero-image", { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-title", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.from(".manifesto-word", { yPercent: 110, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: ".manifesto", start: "top 70%", toggleActions: "play none none reverse" } });
    gsap.to(".product-image", { scale: 1.12, ease: "none", scrollTrigger: { trigger: ".products", start: "top bottom", end: "bottom top", scrub: true } });

    const line = gsap.timeline({ scrollTrigger: { trigger: ".line-story", start: "top top", end: "+=3000", scrub: 1, pin: true } });
    line.fromTo(".line-stage-image", { scale: 1.15 }, { scale: 1, duration: 1 })
      .fromTo(".process-line", { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 2 }, "-=0.4")
      .fromTo(".process-step", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.25, duration: 0.5 }, "-=1.5")
      .to(".line-caption", { y: -30, opacity: 0, duration: 0.7 }, "+=0.4")
      .to(".line-stage-image", { scale: 1.08, xPercent: -5, duration: 1.2 });

    gsap.utils.toArray<HTMLElement>(".machine-row").forEach((row) => gsap.from(row, { x: -35, opacity: 0, duration: 0.7, scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" } }));
    gsap.from(".engineering-image", { clipPath: "inset(100% 0 0 0)", duration: 1.3, ease: "power4.inOut", scrollTrigger: { trigger: ".engineering", start: "top 70%" } });
  }, { scope: page });

  return (
    <main ref={page} className="bg-[#f3f1ec] text-[#111820]">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 mix-blend-difference text-white md:px-10">
        <div className="font-black tracking-[-0.04em] text-xl">KHANDABI<span className="text-[#e76f32]">.</span></div>
        <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex"><a href="#products">Products</a><a href="#lines">Production Lines</a><a href="#engineering">Engineering</a><a href="#projects">Projects</a><a href="#about">About</a></div>
        <a href="#contact" className="border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">Request a quote</a>
      </nav>

      <section className="hero relative h-[100svh] min-h-[720px] overflow-hidden bg-black text-white">
        <div className="hero-image absolute inset-0"><Image src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=2400&q=90" alt="Industrial confectionery production" fill priority className="object-cover opacity-80" sizes="100vw" /><div className="absolute inset-0 bg-black/45" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
        <div className="hero-title relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <p className="hero-kicker mb-7 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">KHANDABI / CONFECTIONERY MACHINERY / EST. 1986</p>
          <h1 className="max-w-[1200px] overflow-hidden text-[clamp(4rem,10vw,10rem)] font-semibold leading-[0.82] tracking-[-0.07em]"><span className="hero-title-line block">WE BUILD</span><span className="hero-title-line block pl-[8vw]">THE PROCESS.</span></h1>
          <div className="hero-copy mt-8 flex max-w-4xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-lg text-base leading-7 text-white/75 md:text-lg">Machinery and complete production systems for chocolate, candy, bars, nougat, fondant, halva and more.</p><span className="hero-meta text-[10px] uppercase tracking-[0.2em] text-white/60">Scroll to explore ↓</span></div>
        </div>
      </section>

      <section className="manifesto overflow-hidden bg-[#e7e3da] px-6 py-32 md:px-10 md:py-48"><p className="mb-10 text-[10px] font-bold uppercase tracking-[0.28em] text-[#e76f32]">01 / What Khandabi does</p><h2 className="max-w-[1300px] text-[clamp(3rem,7.5vw,8rem)] font-medium leading-[0.9] tracking-[-0.065em]"><span className="manifesto-word inline-block">FROM</span>{" "}<span className="manifesto-word inline-block">RAW</span>{" "}<span className="manifesto-word inline-block">INGREDIENTS</span>{" "}<span className="manifesto-word inline-block text-[#e76f32]">TO</span>{" "}<span className="manifesto-word inline-block">PRODUCTION.</span></h2><div className="mt-16 flex justify-end"><p className="max-w-xl text-sm leading-7 text-black/60">We engineer individual machines and complete systems around the process your factory needs.</p></div></section>

      <section id="products" className="products bg-[#111820] text-white"><div className="grid md:grid-cols-2">{products.map((product, i) => <a key={product.title} href="#lines" className="group relative block h-[62vh] min-h-[440px] overflow-hidden border-b border-white/15 md:border-r"><div className="product-image absolute inset-[-5%] transition-transform duration-700 group-hover:scale-[1.04]"><Image src={product.image} alt={product.title} fill className="object-cover opacity-75" sizes="50vw" /></div><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" /><div className="relative flex h-full flex-col justify-between p-7 md:p-10"><div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/60"><span>0{i + 1}</span><span>Application</span></div><div><h3 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">{product.title}</h3><span className="mt-5 inline-block text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 transition-transform group-hover:translate-x-3">Explore process →</span></div></div></a>)}</div></section>

      <section className="bg-white px-6 py-28 md:px-10 md:py-40"><div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e76f32]">02 / Machinery</p><h2 className="mt-6 max-w-md text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl">The equipment behind the process.</h2></div><div>{machines.map((machine, i) => <a href="#contact" key={machine} className="machine-row group flex items-center justify-between border-t border-black/15 py-7"><span className="mr-8 text-[10px] text-black/35">0{i + 1}</span><span className="flex-1 text-xl font-medium tracking-[-0.02em] md:text-3xl">{machine}</span><span className="text-xl transition-transform group-hover:translate-x-2">↗</span></a>)}</div></div></section>

      <section id="lines" className="line-story relative h-screen overflow-hidden bg-black text-white"><div className="line-stage-image absolute inset-0"><Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2400&q=90" alt="Industrial production system" fill className="object-cover opacity-60" sizes="100vw" /></div><div className="absolute inset-0 bg-black/50" /><div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10"><div className="line-caption flex justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">03 / Production lines</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll →</p></div><div><h2 className="max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">ONE FACTORY.<br /><span className="text-[#e76f32]">ONE FLOW.</span></h2><div className="mt-14 overflow-hidden"><div className="process-line h-px w-full bg-white/60" /></div><div className="mt-5 grid grid-cols-2 gap-y-4 text-[10px] font-bold uppercase tracking-[0.18em] md:grid-cols-6">{["Preparation","Cooking","Forming","Coating","Cooling","Packaging"].map((step, i) => <div className="process-step opacity-0" key={step}><span className="text-[#e76f32]">0{i + 1}</span><br />{step}</div>)}</div></div></div></section>

      <section id="engineering" className="engineering bg-[#d8d4cc] px-6 py-24 md:px-10 md:py-40"><div className="grid items-end gap-12 md:grid-cols-[1.1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e76f32]">04 / Engineering</p><h2 className="mt-6 text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.84] tracking-[-0.065em]">ENGINEERED<br />AROUND<br /><span className="text-[#e76f32]">REALITY.</span></h2></div><div className="engineering-image relative aspect-[4/5] overflow-hidden"><Image src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=90" alt="Industrial engineering" fill className="object-cover" sizes="50vw" /><div className="absolute inset-0 bg-[#e76f32]/10" /></div></div></section>

      <section id="projects" className="bg-[#111820] px-6 py-28 text-white md:px-10 md:py-40"><div className="grid gap-12 md:grid-cols-[.7fr_1.3fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e76f32]">05 / Projects</p><h2 className="mt-6 text-5xl font-medium leading-[.9] tracking-[-.055em] md:text-7xl">BUILT.<br />INSTALLED.<br />RUNNING.</h2></div><div className="flex items-end"><p className="max-w-xl text-lg leading-8 text-white/55">Global installations, production lines and equipment working in real factories. This section will become the proof layer of the new Khandabi website.</p></div></div></section>

      <section id="contact" className="bg-[#e76f32] px-6 py-28 md:px-10 md:py-40"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/50">06 / Start a project</p><div className="mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end"><h2 className="max-w-5xl text-[clamp(4rem,9vw,10rem)] font-medium leading-[.78] tracking-[-0.075em]">LET'S BUILD<br />YOUR LINE.</h2><a href="mailto:info@khandabi.com" className="border border-black/40 px-7 py-5 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:bg-black hover:text-white">Request a quote ↗</a></div></section>

      <footer id="about" className="flex flex-col justify-between gap-8 bg-black px-6 py-10 text-white md:flex-row md:px-10"><span className="text-xl font-black tracking-[-0.04em]">KHANDABI<span className="text-[#e76f32]">.</span></span><span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Confectionery machinery / Process engineering / EN · TR · FA</span><span className="text-[10px] uppercase tracking-[0.18em] text-white/40">© Khandabi</span></footer>
    </main>
  );
}
