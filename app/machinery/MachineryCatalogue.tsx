"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Machine } from "./data";

const GROUP_ORDER = [
  "Cooking & Preparation",
  "Mixing & Preparation",
  "Chocolate Systems",
  "Coating Systems",
  "Bar Lines",
  "Dragee & Gum",
  "Halva & Sesame",
  "Fondant Systems",
  "Grinding",
  "Laboratory",
  "Confectionery Machinery",
];

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const groups = useMemo(() => {
    const map = new Map<string, Machine[]>();
    machines.forEach((machine) => {
      const list = map.get(machine.category) ?? [];
      list.push(machine);
      map.set(machine.category, list);
    });
    return GROUP_ORDER.filter((name) => map.has(name)).map((name) => ({ name, machines: map.get(name)! }));
  }, [machines]);

  const [activeGroup, setActiveGroup] = useState(groups[0]?.name ?? "");
  const [hovered, setHovered] = useState<Machine | null>(groups[0]?.machines[0] ?? null);
  const [selected, setSelected] = useState<Machine | null>(null);

  const active = groups.find((group) => group.name === activeGroup) ?? groups[0];

  useEffect(() => {
    if (!active) return;
    setHovered(active.machines[0] ?? null);
  }, [activeGroup]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <>
      <section className="mx-4 border border-black/10 bg-[#f3f1ec] md:mx-10">
        <div className="grid min-h-[680px] md:grid-cols-[230px_360px_minmax(0,1fr)]">
          <aside className="border-b border-black/10 md:border-b-0 md:border-r">
            <div className="sticky top-20 p-4 md:p-5">
              <p className="px-3 pb-4 text-[9px] font-bold uppercase tracking-[.24em] text-[#e76f32]">Product groups</p>
              <div className="flex gap-1 overflow-x-auto md:block md:overflow-visible">
                {groups.map((group, index) => {
                  const activeGroupClass = group.name === activeGroup;
                  return (
                    <button
                      key={group.name}
                      type="button"
                      onClick={() => setActiveGroup(group.name)}
                      className={`group flex min-w-[180px] items-center gap-3 px-3 py-3 text-left text-xs transition md:w-full ${activeGroupClass ? "bg-[#111820] text-white" : "text-black/55 hover:bg-black/5 hover:text-black"}`}
                    >
                      <span className={`text-[9px] ${activeGroupClass ? "text-[#e76f32]" : "text-black/25"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="flex-1">{group.name}</span>
                      <span className="text-[9px] opacity-50">{group.machines.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="border-b border-black/10 md:border-b-0 md:border-r">
            <div className="border-b border-black/10 px-5 py-5">
              <p className="text-[9px] uppercase tracking-[.2em] text-black/35">Selected group</p>
              <h3 className="mt-2 text-2xl font-medium tracking-[-.04em]">{active?.name}</h3>
              <p className="mt-2 text-[11px] leading-5 text-black/45">{active?.machines.length} products · hover to preview · click to open</p>
            </div>
            <div className="max-h-[620px] overflow-y-auto">
              {active?.machines.map((machine, index) => {
                const isHovered = hovered?.slug === machine.slug;
                return (
                  <button
                    type="button"
                    key={machine.slug}
                    onMouseEnter={() => setHovered(machine)}
                    onFocus={() => setHovered(machine)}
                    onClick={() => setSelected(machine)}
                    className={`group flex min-h-[82px] w-full items-center border-b border-black/10 px-5 text-left transition ${isHovered ? "bg-[#e7e3da]" : "hover:bg-[#ebe7df]"}`}
                  >
                    <span className="w-7 shrink-0 text-[9px] tabular-nums text-[#e76f32]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 px-3 text-[13px] font-medium leading-5">{machine.title}</span>
                    <span className={`text-[#e76f32] transition ${isHovered ? "translate-x-1 opacity-100" : "opacity-30"}`}>↗</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden bg-[#111820] text-white md:block">
            {hovered ? (
              <div className="sticky top-20 flex min-h-[680px] flex-col">
                <div className="relative min-h-[330px] overflow-hidden bg-[#151a20]">
                  <img src={hovered.image} alt={hovered.title} className="absolute inset-0 h-full w-full object-cover transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex justify-between gap-4 text-[9px] uppercase tracking-[.2em] text-white/65"><span>KHANDABI / MACHINERY</span><span>{hovered.cataloguePages.length ? `CATALOGUE ${hovered.cataloguePages.join(" / ")}` : ""}</span></div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 md:p-9">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{hovered.category}</p>
                    <h3 className="mt-4 text-[clamp(2.5rem,4vw,5rem)] font-medium leading-[.84] tracking-[-.065em]">{hovered.title}</h3>
                    <div className="mt-6 h-px w-12 bg-[#e76f32]" />
                    <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">{hovered.description}</p>
                    <div className="mt-7 grid grid-cols-2 border border-white/10">
                      <div className="border-r border-white/10 p-4"><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Capacity</span><p className="mt-2 text-sm">{hovered.technical.capacity || "Not specified in catalogue"}</p></div>
                      <div className="p-4"><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Source</span><p className="mt-2 text-sm">{hovered.cataloguePage ? `Catalogue p.${hovered.cataloguePage}` : "Catalogue"}</p></div>
                    </div>
                    {hovered.applications.length > 0 && <div className="mt-6"><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Applications</span><p className="mt-2 text-xs leading-5 text-white/55">{hovered.applications.join(" · ")}</p></div>}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-8"><button type="button" onClick={() => setSelected(hovered)} className="bg-[#e76f32] px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Quick view</button><Link href={`/machinery/${hovered.slug}`} className="border border-white/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Full product →</Link></div>
                </div>
              </div>
            ) : <div className="flex h-full items-center justify-center text-xs text-white/30">Select a product</div>}
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-4 md:px-10"><p className="text-[10px] uppercase tracking-[.16em] text-black/35">{machines.length} catalogue products · grouped for faster technical discovery</p><a href="https://exhibitor-manual-004.s3.ap-south-1.amazonaws.com/Production/exb_doc/2016/21901/catalogue-te_966885.pdf" target="_blank" rel="noreferrer" className="border border-black/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-[#111820] hover:text-white">Download machinery catalogue ↗</a></div>

      {selected && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <article className="relative grid max-h-[90vh] w-full max-w-[1100px] overflow-auto bg-[#f3f1ec] text-[#111820] md:grid-cols-[1.05fr_.95fr] md:overflow-hidden">
            <button type="button" onClick={() => setSelected(null)} aria-label="Close" className="absolute right-5 top-5 z-20 h-9 w-9 bg-black/70 text-xl text-white">×</button>
            <div className="relative min-h-[330px] bg-[#151a20] md:min-h-[620px]"><img src={selected.image} alt={selected.title} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /></div>
            <div className="overflow-y-auto p-8 md:p-11"><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{selected.category}</p><h3 className="mt-4 text-[clamp(2.7rem,5vw,5.5rem)] font-medium leading-[.82] tracking-[-.07em]">{selected.title}</h3><div className="mt-7 h-px w-12 bg-[#e76f32]" /><p className="mt-6 text-sm leading-7 text-black/60">{selected.description}</p><div className="mt-8 grid grid-cols-2 gap-px bg-black/10"><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span><p className="mt-2 text-sm">{selected.technical.capacity || "Not specified in catalogue"}</p></div><div className="bg-[#f3f1ec] p-4"><span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span><p className="mt-2 text-sm">{selected.cataloguePages.length ? selected.cataloguePages.join(" / ") : "—"}</p></div></div>{selected.catalogueImages.length > 0 && <div className="mt-8"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-black/35">Catalogue references</p><div className="mt-3 grid grid-cols-3 gap-2">{selected.catalogueImages.slice(0,6).map((src,i)=><img key={`${src}-${i}`} src={src} alt={`${selected.title} catalogue ${i+1}`} className="aspect-[4/3] w-full object-cover" />)}</div></div>}<Link href={`/machinery/${selected.slug}`} className="mt-10 inline-flex bg-[#e76f32] px-6 py-4 text-[9px] font-bold uppercase tracking-[.18em] text-white">Open full product →</Link></div>
          </article>
        </div>
      )}
    </>
  );
}
