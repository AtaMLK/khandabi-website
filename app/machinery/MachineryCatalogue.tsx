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

  const [hovered, setHovered] = useState<Machine | null>(null);
  const [selected, setSelected] = useState<Machine | null>(null);

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

  const preview = hovered;

  return (
    <>
      <section className="mx-4 border border-black/10 bg-white md:mx-10">
        {/* The preview occupies its own row. It never floats over the catalogue, so the next machines remain visible and hoverable. */}
        <div className={`overflow-hidden border-b border-black/10 bg-[#111820] text-white transition-[max-height,opacity] duration-300 ${preview ? "max-h-[430px] opacity-100" : "max-h-0 opacity-0"}`}>
          {preview && (
            <div className="grid min-h-[300px] md:grid-cols-[42%_1fr]">
              <div className="relative min-h-[260px] overflow-hidden bg-[#151a20]">
                <img src={preview.image} alt={preview.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex justify-between gap-4 text-[9px] uppercase tracking-[.2em] text-white/65">
                  <span>KHANDABI / MACHINERY</span>
                  <span>{preview.cataloguePages.length ? `CATALOGUE ${preview.cataloguePages.join(" / ")}` : ""}</span>
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 md:p-9">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{preview.category}</p>
                  <h3 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[.85] tracking-[-.06em]">{preview.title}</h3>
                  <p className="mt-5 max-w-3xl text-sm leading-6 text-white/60">{preview.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="border border-white/10 px-3 py-2 text-[9px] uppercase tracking-[.15em] text-white/55">Capacity: {preview.technical.capacity || "Catalogue not specified"}</span>
                    <span className="border border-white/10 px-3 py-2 text-[9px] uppercase tracking-[.15em] text-white/55">Catalogue: {preview.cataloguePages.length ? preview.cataloguePages.join(" / ") : "—"}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-6">
                  <button type="button" onClick={() => setSelected(preview)} className="bg-[#e76f32] px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Quick view</button>
                  <Link href={`/machinery/${preview.slug}`} className="border border-white/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-white hover:text-black">Full product →</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {groups.map((group, groupIndex) => (
          <section key={group.name} className="border-b border-black/10 last:border-b-0">
            <header className="flex items-end justify-between gap-6 bg-[#f3f1ec] px-5 py-5 md:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#e76f32]">{String(groupIndex + 1).padStart(2, "0")} / Product group</p>
                <h3 className="mt-2 text-2xl font-medium tracking-[-.04em] md:text-3xl">{group.name}</h3>
              </div>
              <span className="text-[9px] uppercase tracking-[.18em] text-black/35">{group.machines.length} products</span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {group.machines.map((machine, index) => {
                const isHovered = preview?.slug === machine.slug;
                return (
                  <button
                    type="button"
                    key={machine.slug}
                    onMouseEnter={() => setHovered(machine)}
                    onFocus={() => setHovered(machine)}
                    onClick={() => setSelected(machine)}
                    className={`group flex min-h-[78px] w-full items-center border-t border-black/10 px-5 text-left transition md:min-h-[88px] md:px-7 ${isHovered ? "bg-[#e7e3da]" : "hover:bg-[#f5f2ec]"}`}
                  >
                    <span className="w-8 shrink-0 text-[9px] tabular-nums text-[#e76f32]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1 px-3 text-[12px] font-medium leading-5 md:text-[13px]">{machine.title}</span>
                    <span className={`text-[#e76f32] transition ${isHovered ? "translate-x-1 opacity-100" : "opacity-25 group-hover:translate-x-1 group-hover:opacity-100"}`}>↗</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-4 md:px-10">
        <p className="text-[10px] uppercase tracking-[.16em] text-black/35">{machines.length} catalogue products · grouped by machine family</p>
        <a href="https://exhibitor-manual-004.s3.ap-south-1.amazonaws.com/Production/exb_doc/2016/21901/catalogue-te_966885.pdf" target="_blank" rel="noreferrer" className="border border-black/20 px-5 py-3 text-[9px] font-bold uppercase tracking-[.18em] transition hover:bg-[#111820] hover:text-white">Download machinery catalogue ↗</a>
      </div>

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
