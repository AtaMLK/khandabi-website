"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Machine } from "./data";

const GROUP_ORDER = ["Cooking & Preparation", "Mixing & Preparation", "Chocolate Systems", "Coating Systems", "Bar Lines", "Dragee & Gum", "Halva & Sesame", "Fondant Systems", "Grinding", "Laboratory", "Confectionery Machinery"];

export default function MainMachineryExplorer({ machines }: { machines: Machine[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, Machine[]>();
    machines.forEach((machine) => map.set(machine.category, [...(map.get(machine.category) ?? []), machine]));
    return GROUP_ORDER.filter((name) => map.has(name)).map((name) => ({ name, machines: map.get(name)! }));
  }, [machines]);
  const [activeGroup, setActiveGroup] = useState(groups[0]?.name ?? "");
  const [activeMachine, setActiveMachine] = useState<Machine | null>(groups[0]?.machines[0] ?? null);
  const active = groups.find((group) => group.name === activeGroup) ?? groups[0];

  return <div className="mx-4 border border-black/10 bg-[#f3f1ec] md:mx-10">
    <div className="grid min-h-[650px] md:grid-cols-[230px_1fr_42%]">
      <aside className="border-b border-black/10 md:border-b-0 md:border-r"><div className="p-4 md:p-5"><p className="px-3 pb-4 text-[9px] font-bold uppercase tracking-[.24em] text-[#e76f32]">Product groups</p><div className="flex gap-1 overflow-x-auto md:block md:overflow-visible">{groups.map((group, index) => <button key={group.name} type="button" onClick={() => { setActiveGroup(group.name); setActiveMachine(group.machines[0] ?? null); }} className={`flex min-w-[180px] w-full items-center gap-3 px-3 py-3 text-left text-xs transition ${group.name === activeGroup ? "bg-[#111820] text-white" : "text-black/55 hover:bg-black/5 hover:text-black"}`}><span className={`text-[9px] ${group.name === activeGroup ? "text-[#e76f32]" : "text-black/25"}`}>{String(index + 1).padStart(2, "0")}</span><span className="flex-1">{group.name}</span><span className="text-[9px] opacity-50">{group.machines.length}</span></button>)}</div></div></aside>
      <div className="border-b border-black/10 md:border-b-0 md:border-r"><div className="border-b border-black/10 px-5 py-5"><p className="text-[9px] uppercase tracking-[.2em] text-black/35">Selected group</p><h3 className="mt-2 text-2xl font-medium tracking-[-.04em]">{active?.name}</h3><p className="mt-2 text-[11px] leading-5 text-black/45">{active?.machines.length} products · click to preview</p></div><div className="max-h-[570px] overflow-y-auto">{active?.machines.map((machine, index) => <button key={machine.slug} type="button" onMouseEnter={() => setActiveMachine(machine)} onFocus={() => setActiveMachine(machine)} onClick={() => setActiveMachine(machine)} className={`group flex min-h-[78px] w-full items-center border-b border-black/10 px-5 text-left transition ${activeMachine?.slug === machine.slug ? "bg-[#e7e3da]" : "hover:bg-[#ebe7df]"}`}><span className="w-7 shrink-0 text-[9px] text-[#e76f32]">{String(index + 1).padStart(2, "0")}</span><span className="flex-1 px-3 text-[13px] font-medium leading-5">{machine.title}</span><span className="text-[#e76f32] opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100">↗</span></button>)}</div></div>
      <div className="hidden bg-[#111820] text-white md:block">{activeMachine && <div className="flex min-h-[650px] flex-col"><div className="relative min-h-[280px] overflow-hidden bg-[#151a20]"><img src={activeMachine.image} alt={activeMachine.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /></div><div className="flex flex-1 flex-col justify-between p-7"><div><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{activeMachine.category}</p><h3 className="mt-4 text-[clamp(2.4rem,4vw,4.5rem)] font-medium leading-[.84] tracking-[-.065em]">{activeMachine.title}</h3><div className="mt-5 h-px w-12 bg-[#e76f32]" /><p className="mt-5 text-sm leading-6 text-white/60">{activeMachine.description}</p><div className="mt-6 grid grid-cols-2 border border-white/10"><div className="border-r border-white/10 p-4"><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Capacity</span><p className="mt-2 text-sm">{activeMachine.technical.capacity || "Catalogue not specified"}</p></div><div className="p-4"><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Catalogue</span><p className="mt-2 text-sm">{activeMachine.cataloguePages.length ? activeMachine.cataloguePages.join(" / ") : "—"}</p></div></div></div><Link href={`/machinery/${activeMachine.slug}`} className="mt-6 inline-flex w-fit bg-[#e76f32] px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Open product →</Link></div></div>}</div>
    </div>
    <div className="flex items-center justify-between gap-4 border-t border-black/10 px-5 py-4 md:px-7"><p className="text-[9px] uppercase tracking-[.16em] text-black/35">{machines.length} catalogue products</p><Link href="/machinery" className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e76f32]">View full machinery catalogue →</Link></div>
  </div>;
}
