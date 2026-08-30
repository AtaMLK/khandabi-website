"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Machine } from "./data";

const GROUP_ORDER = ["Cooking & Preparation", "Mixing & Preparation", "Chocolate Systems", "Coating Systems", "Bar Lines", "Dragee & Gum", "Halva & Sesame", "Fondant Systems", "Grinding", "Laboratory", "Confectionery Machinery"];

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, Machine[]>();
    machines.forEach((m) => map.set(m.category, [...(map.get(m.category) ?? []), m]));
    return GROUP_ORDER.filter((n) => map.has(n)).map((name) => ({ name, machines: map.get(name)! }));
  }, [machines]);
  const [hovered, setHovered] = useState<Machine | null>(null);
  const [selected, setSelected] = useState<Machine | null>(null);
  const preview = hovered;

  useEffect(() => {
    if (!selected) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", esc); };
  }, [selected]);

  return <>
    <section className="mx-4 border border-black/10 bg-white md:mx-10">
      <div className={`overflow-hidden border-b border-black/10 bg-[#111820] text-white transition-[max-height,opacity] duration-300 ${preview ? "max-h-[430px] opacity-100" : "max-h-0 opacity-0"}`}>
        {preview && <div className="grid min-h-[300px] md:grid-cols-[42%_1fr]">
          <div className="relative min-h-[260px] overflow-hidden bg-[#151a20]"><img src={preview.image} alt={preview.title} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/></div>
          <div className="flex flex-col justify-between p-7 md:p-9"><div><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{preview.category}</p><h3 className="mt-3 text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[.85] tracking-[-.06em]">{preview.title}</h3><p className="mt-5 max-w-3xl text-sm leading-6 text-white/60">{preview.description}</p><div className="mt-5 flex flex-wrap gap-2"><span className="border border-white/10 px-3 py-2 text-[9px] uppercase tracking-[.15em] text-white/55">Capacity: {preview.technical.capacity || "Catalogue not specified"}</span><span className="border border-white/10 px-3 py-2 text-[9px] uppercase tracking-[.15em] text-white/55">Catalogue: {preview.cataloguePages.length ? preview.cataloguePages.join(" / ") : "—"}</span></div></div><div className="flex gap-3 pt-6"><button type="button" onClick={()=>setSelected(preview)} className="bg-[#e76f32] px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em]">Quick view</button><Link href={`/machinery/${preview.slug}`} className="border border-white/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em]">Full product →</Link></div></div>
        </div>}
      </div>
      {groups.map((group, gi)=><section key={group.name} className="border-b border-black/10 last:border-b-0"><header className="flex items-end justify-between gap-6 bg-[#f3f1ec] px-5 py-5 md:px-7"><div><p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#e76f32]">{String(gi+1).padStart(2,"0")} / Product group</p><h3 className="mt-2 text-2xl font-medium tracking-[-.04em] md:text-3xl">{group.name}</h3></div><span className="text-[9px] uppercase tracking-[.18em] text-black/35">{group.machines.length} products</span></header><div className="grid grid-cols-1 md:grid-cols-2">{group.machines.map((machine,i)=>{const active=preview?.slug===machine.slug;return <button key={machine.slug} type="button" onMouseEnter={()=>setHovered(machine)} onFocus={()=>setHovered(machine)} onClick={()=>setSelected(machine)} className={`group flex min-h-[78px] w-full items-center border-t border-black/10 px-5 text-left transition md:min-h-[88px] md:px-7 ${active?"bg-[#e7e3da]":"hover:bg-[#f5f2ec]"}`}><span className="w-8 text-[9px] text-[#e76f32]">{String(i+1).padStart(2,"0")}</span><span className="flex-1 px-3 text-[12px] font-medium leading-5 md:text-[13px]">{machine.title}</span><span className="text-[#e76f32]">↗</span></button>})}</div></section>)}
    </section>
    <div className="mt-5 flex flex-wrap justify-between gap-4 px-4 md:px-10"><p className="text-[10px] uppercase tracking-[.16em] text-black/35">{machines.length} catalogue products · grouped by machine family</p><a href="https://exhibitor-manual-004.s3.ap-south-1.amazonaws.com/Production/exb_doc/2016/21901/catalogue-te_966885.pdf" target="_blank" rel="noreferrer" className="border border-black/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] hover:bg-[#111820] hover:text-white">Download machinery catalogue ↗</a></div>
    {selected&&<div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><article className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-[#f3f1ec] text-[#111820] md:grid-cols-2"><button type="button" onClick={()=>setSelected(null)} className="absolute right-4 top-4 z-10 h-9 w-9 bg-black text-xl text-white" aria-label="Close">×</button><div className="relative min-h-[330px] md:min-h-[600px]"><img src={selected.image} alt={selected.title} className="absolute inset-0 h-full w-full object-cover"/></div><div className="p-8 md:p-10"><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{selected.category}</p><h3 className="mt-4 text-5xl font-medium leading-[.82] tracking-[-.07em]">{selected.title}</h3><p className="mt-7 text-sm leading-7 text-black/60">{selected.description}</p><div className="mt-7 border-t border-black/10 pt-5"><p className="text-[9px] uppercase tracking-widest text-black/35">Technical data</p><p className="mt-3 text-sm">Capacity: {selected.technical.capacity||"Not specified in catalogue"}</p>{selected.applications.length>0&&<p className="mt-3 text-sm leading-6 text-black/55">Applications: {selected.applications.join(" · ")}</p>}</div><Link href={`/machinery/${selected.slug}`} className="mt-8 inline-flex bg-[#e76f32] px-6 py-4 text-[9px] font-bold uppercase tracking-[.18em] text-white">View complete product →</Link></div></article></div>}
  </>;
}
