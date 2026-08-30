"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Machine = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  capacity?: string | null;
  cataloguePage?: number | null;
};

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const [active, setActive] = useState<Machine | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = (machine: Machine) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActive(machine); };
  const close = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setActive(null), 180); };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  return <>
    <section className="mx-6 border border-black/10 md:mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {machines.map((machine, i) => <div key={machine.slug} className="group relative min-h-[92px] cursor-pointer border-b border-black/10 transition-colors duration-200 hover:bg-[#ebe7df] md:min-h-[102px]" onMouseEnter={() => open(machine)} onMouseLeave={close} onFocus={() => open(machine)} onBlur={close} onClick={() => open(machine)} tabIndex={0} role="button" aria-label={`Preview ${machine.title}`}>
          <div className="flex min-h-[92px] items-center px-5 py-5 md:min-h-[102px] md:px-8"><span className="w-6 shrink-0 text-[10px] tabular-nums text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span><span className="flex-1 px-5 text-[15px] font-medium md:text-[16px]">{machine.title}</span><span className="text-lg text-[#e76f32] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">↗</span></div>
          <div className="pointer-events-none fixed inset-0 z-[9000] invisible flex items-center justify-center px-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 md:px-8"><div className="grid w-full max-w-[960px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.28)] md:grid-cols-[1.08fr_.92fr]"><div className="relative min-h-[280px] overflow-hidden bg-[#151a20] md:min-h-[500px]"><img src={machine.image} alt={machine.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" /><span className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[.25em] text-white/80">KHANDABI / MACHINERY</span></div><div className="flex min-h-[280px] flex-col justify-between p-7 md:min-h-[500px] md:p-11"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{machine.category}</p><h3 className="mt-5 text-[clamp(2.2rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{machine.title}</h3><div className="mt-7 h-px w-12 bg-[#e76f32]" /><p className="mt-6 max-w-md text-sm leading-7 text-black/60">{machine.description}</p>{machine.capacity && <p className="mt-5 text-xs font-bold uppercase tracking-[.15em]">Capacity / <span className="font-medium normal-case tracking-normal text-black/55">{machine.capacity}</span></p>}</div><span className="mt-8 text-[9px] font-bold uppercase tracking-[.18em] text-black/35">Click to open product</span></div></div></div>
        </div>)}
      </div>
    </section>
    {active && <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-[3px]" onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}><article className="relative grid max-h-[90vh] w-full max-w-[960px] overflow-auto bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.35)] md:grid-cols-[1.08fr_.92fr] md:overflow-hidden"><button type="button" onClick={() => setActive(null)} aria-label="Close preview" className="absolute right-5 top-4 z-20 flex h-9 w-9 items-center justify-center bg-black/70 text-xl text-white">×</button><div className="relative min-h-[300px] overflow-hidden bg-[#151a20] md:min-h-[540px]"><img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" /></div><div className="flex min-h-[300px] flex-col justify-between p-8 md:min-h-[540px] md:p-12"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{active.category}</p><h3 className="mt-5 text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3><div className="mt-7 h-px w-12 bg-[#e76f32]" /><p className="mt-6 max-w-md text-sm leading-7 text-black/60">{active.description}</p><div className="mt-8 grid grid-cols-2 gap-px border border-black/10 bg-black/10"><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span><p className="mt-2 text-sm">{active.capacity || "Not specified"}</p></div><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span><p className="mt-2 text-sm">Page {active.cataloguePage ?? "—"}</p></div></div></div><Link href={`/machinery/${active.slug}`} className="mt-10 flex w-fit items-center gap-4 bg-[#e76f32] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#111820]">View full product <span>→</span></Link></div></article></div>}
  </>;
}
