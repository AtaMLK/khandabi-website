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
  const [hovered, setHovered] = useState<Machine | null>(machines[0] ?? null);
  const [selected, setSelected] = useState<Machine | null>(null);

  useEffect(() => {
    if (!selected) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", esc); };
  }, [selected]);

  return <>
    <section className="mx-4 border border-black/10 bg-white md:mx-10">
      <div className="grid lg:grid-cols-[1fr_360px]">
        <div>
          {groups.map((group, gi) => <section key={group.name} className="border-b border-black/10 last:border-b-0">
            <header className="flex items-end justify-between gap-6 bg-[#f3f1ec] px-5 py-5 md:px-7"><div><p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#e76f32]">{String(gi + 1).padStart(2, "0")} / Product group</p><h3 className="mt-2 text-2xl font-medium tracking-[-.04em] md:text-3xl">{group.name}</h3></div><span className="text-[9px] uppercase tracking-[.18em] text-black/35">{group.machines.length} products</span></header>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {group.machines.map((machine, index) => <Link key={machine.slug} href={`/machinery/${machine.slug}`} onPointerEnter={() => setHovered(machine)} onFocus={() => setHovered(machine)} onClick={(event) => { event.preventDefault(); setHovered(machine); setSelected(machine); }} className={`group flex min-h-[82px] w-full items-center border-t border-black/10 px-5 text-left transition md:min-h-[92px] md:px-7 ${hovered?.slug === machine.slug ? "bg-[#e7e3da]" : "hover:bg-[#f5f2ec]"}`}><span className="w-8 shrink-0 text-[9px] tabular-nums text-[#e76f32]">{String(index + 1).padStart(2, "0")}</span><span className="flex-1 px-3 text-[12px] font-medium leading-5 md:text-[13px]">{machine.title}</span><span className="text-[#e76f32] transition-transform group-hover:translate-x-1">↗</span></Link>)}
            </div>
          </section>)}
        </div>

        <aside className="hidden border-l border-black/10 bg-[#111820] text-white lg:block">
          <div className="sticky top-20 min-h-[620px]">
            {hovered && <div className="flex min-h-[620px] flex-col">
              <div className="relative h-[270px] overflow-hidden bg-[#151a20]"><img src={hovered.image} alt={hovered.title} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/><div className="absolute bottom-4 left-5 text-[8px] uppercase tracking-[.2em] text-white/60">KHANDABI / MACHINERY</div></div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{hovered.category}</p><h3 className="mt-3 text-4xl font-medium leading-[.86] tracking-[-.06em]">{hovered.title}</h3><div className="mt-5 h-px w-10 bg-[#e76f32]"/><p className="mt-4 text-xs leading-6 text-white/60">{hovered.description}</p><div className="mt-5 grid grid-cols-2 border border-white/10"><div className="border-r border-white/10 p-3"><span className="text-[8px] uppercase tracking-widest text-white/35">Capacity</span><p className="mt-2 text-[11px]">{hovered.technical.capacity || "Not specified"}</p></div><div className="p-3"><span className="text-[8px] uppercase tracking-widest text-white/35">Catalogue</span><p className="mt-2 text-[11px]">{hovered.cataloguePages.length ? hovered.cataloguePages.join(" / ") : "—"}</p></div></div></div>
                <div className="flex gap-2 pt-6"><button type="button" onClick={() => setSelected(hovered)} className="bg-[#e76f32] px-4 py-3 text-[8px] font-bold uppercase tracking-[.17em]">Quick view</button><Link href={`/machinery/${hovered.slug}`} className="border border-white/20 px-4 py-3 text-[8px] font-bold uppercase tracking-[.17em]">Full product →</Link></div>
              </div>
            </div>}
          </div>
        </aside>
      </div>
    </section>

    <div className="mt-5 flex flex-wrap justify-between gap-4 px-4 md:px-10"><p className="text-[10px] uppercase tracking-[.16em] text-black/35">{machines.length} catalogue products · hover to preview · click to open</p><a href="https://exhibitor-manual-004.s3.ap-south-1.amazonaws.com/Production/exb_doc/2016/21901/catalogue-te_966885.pdf" target="_blank" rel="noreferrer" className="border border-black/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] hover:bg-[#111820] hover:text-white">Download machinery catalogue ↗</a></div>

    {selected && <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
      <article className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-[#f3f1ec] text-[#111820] md:grid-cols-2"><button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-20 h-9 w-9 bg-black text-xl text-white" aria-label="Close">×</button><div className="relative min-h-[330px] md:min-h-[600px]"><img src={selected.image} alt={selected.title} className="absolute inset-0 h-full w-full object-cover"/></div><div className="p-8 md:p-10"><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{selected.category}</p><h3 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[.82] tracking-[-.07em]">{selected.title}</h3><p className="mt-6 text-sm leading-7 text-black/60">{selected.description}</p><div className="mt-7 grid grid-cols-2 gap-px bg-black/10"><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span><p className="mt-2 text-sm">{selected.technical.capacity || "Not specified in catalogue"}</p></div><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span><p className="mt-2 text-sm">{selected.cataloguePages.length ? selected.cataloguePages.join(" / ") : "—"}</p></div></div>{selected.applications.length > 0 && <div className="mt-7"><p className="text-[9px] uppercase tracking-widest text-black/35">Applications</p><p className="mt-2 text-sm leading-6 text-black/55">{selected.applications.join(" · ")}</p></div>}<Link href={`/machinery/${selected.slug}`} className="mt-9 inline-flex bg-[#e76f32] px-6 py-4 text-[9px] font-bold uppercase tracking-[.18em] text-white">View complete product →</Link></div></article>
    </div>}
  </>;
}
