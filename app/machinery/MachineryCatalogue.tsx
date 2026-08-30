"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Machine } from "./data";

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const [hovered, setHovered] = useState<{ machine: Machine; index: number } | null>(null);
  const [selected, setSelected] = useState<Machine | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showHover = (machine: Machine, index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered({ machine, index });
  };
  const hideHover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), 120);
  };
  const select = (machine: Machine) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(null);
    setSelected(machine);
  };

  useEffect(() => {
    if (!selected) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", key); };
  }, [selected]);

  return <>
    <section className="mx-6 border border-black/10 md:mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {machines.map((machine, i) => {
          const left = i % 2 === 0;
          const active = hovered?.machine.slug === machine.slug;
          return <div key={machine.slug} className="group relative min-h-[92px] cursor-pointer border-b border-black/10 transition-colors hover:bg-[#ebe7df] md:min-h-[102px]" onMouseEnter={() => showHover(machine, i)} onMouseLeave={hideHover} onFocus={() => showHover(machine, i)} onBlur={hideHover} onClick={() => select(machine)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(machine); } }} tabIndex={0} role="button">
            <div className="flex min-h-[92px] items-center px-5 py-5 md:min-h-[102px] md:px-8"><span className="w-7 shrink-0 text-[10px] tabular-nums text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span><span className="flex-1 px-5 text-[15px] font-medium md:text-[16px]">{machine.title}</span><span className="text-lg text-[#e76f32] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">↗</span></div>
            {active && <div className={`pointer-events-none fixed inset-y-0 z-[9000] hidden w-[48vw] items-center md:flex ${left ? "right-0 justify-start pl-4 lg:pl-8" : "left-0 justify-end pr-4 lg:pr-8"}`}>
              <div className="grid max-h-[78vh] w-full max-w-[760px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.3)] md:grid-cols-[1.02fr_.98fr]">
                <div className="relative min-h-[420px]"><img src={machine.image} alt={machine.title} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><div className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[.22em] text-white/80">KHANDABI / MACHINERY</div></div>
                <div className="overflow-y-auto p-7 md:p-9"><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{machine.category}</p><h3 className="mt-4 text-[clamp(2rem,3.2vw,3.7rem)] font-medium leading-[.86] tracking-[-.06em]">{machine.title}</h3><div className="mt-6 h-px w-12 bg-[#e76f32]"/><p className="mt-5 text-sm leading-6 text-black/60">{machine.description}</p><div className="mt-6 grid grid-cols-2 gap-px border border-black/10 bg-black/10"><div className="bg-[#f3f1ec] p-3"><span className="text-[8px] uppercase tracking-[.16em] text-black/35">Capacity</span><p className="mt-2 text-xs">{machine.technical.capacity || "Not specified"}</p></div><div className="bg-[#f3f1ec] p-3"><span className="text-[8px] uppercase tracking-[.16em] text-black/35">Catalogue</span><p className="mt-2 text-xs">{machine.cataloguePage ? `Page ${machine.cataloguePage}` : "—"}</p></div></div>{machine.technical.options.length > 0 && <div className="mt-5"><span className="text-[8px] font-bold uppercase tracking-[.16em] text-black/35">Options</span><p className="mt-2 text-xs leading-5 text-black/60">{machine.technical.options.join(" · ")}</p></div>}<p className="mt-7 text-[8px] font-bold uppercase tracking-[.18em] text-black/30">Click to open full product</p></div>
              </div>
            </div>}
          </div>;
        })}
      </div>
    </section>

    {selected && <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[3px]" role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && setSelected(null)}><article className="relative grid max-h-[90vh] w-full max-w-[1100px] overflow-auto bg-[#f3f1ec] text-[#111820] md:grid-cols-[1.05fr_.95fr] md:overflow-hidden"><button onClick={() => setSelected(null)} aria-label="Close" className="absolute right-5 top-4 z-20 h-9 w-9 bg-black/70 text-xl text-white hover:bg-[#e76f32]">×</button><div className="relative min-h-[320px] md:min-h-[600px]"><img src={selected.image} alt={selected.title} className="absolute inset-0 h-full w-full object-cover"/></div><div className="overflow-y-auto p-8 md:p-11"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{selected.category}</p><h3 className="mt-5 text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{selected.title}</h3><div className="mt-7 h-px w-12 bg-[#e76f32]"/><p className="mt-6 text-sm leading-7 text-black/60">{selected.description}</p><div className="mt-8 grid grid-cols-2 gap-px border border-black/10 bg-black/10"><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span><p className="mt-2 text-sm">{selected.technical.capacity || "Not specified"}</p></div><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span><p className="mt-2 text-sm">{selected.cataloguePage ? `Page ${selected.cataloguePage}` : "Not specified"}</p></div></div><Link href={`/machinery/${selected.slug}`} className="mt-10 inline-flex bg-[#e76f32] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white hover:bg-[#111820]">View full product →</Link></div></article></div>}
  </>;
}
