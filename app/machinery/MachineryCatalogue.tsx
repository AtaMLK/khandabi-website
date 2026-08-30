"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Machine } from "./data";

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const [active, setActive] = useState<Machine | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (machine: Machine) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(machine);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 180);
  };

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      <section className="mx-6 border border-black/10 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {machines.map((machine, i) => {
            const isLeftColumn = i % 2 === 0;

            return (
              <div
                key={machine.slug}
                className="group relative min-h-[92px] cursor-pointer border-b border-black/10 transition-colors duration-200 hover:bg-[#ebe7df] md:min-h-[102px]"
                onMouseEnter={() => open(machine)}
                onMouseLeave={close}
                onFocus={() => open(machine)}
                onBlur={close}
                onClick={() => open(machine)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open(machine);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Preview ${machine.title}`}
              >
                <div className="flex min-h-[92px] items-center px-5 py-5 md:min-h-[102px] md:px-8">
                  <span className="w-6 shrink-0 text-[10px] tabular-nums text-[#e76f32]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 px-5 text-[15px] font-medium md:text-[16px]">
                    {machine.title}
                  </span>
                  <span className="text-lg text-[#e76f32] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </div>

                {/* Desktop hover preview: always rendered on the OPPOSITE half so the hovered column remains visible. */}
                <div
                  className={`pointer-events-none fixed inset-y-0 z-[9000] hidden w-1/2 items-center px-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:flex md:px-8 ${
                    isLeftColumn ? "right-0 justify-start" : "left-0 justify-end"
                  }`}
                >
                  <div className="grid w-full max-w-[720px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.28)] md:grid-cols-[1.05fr_.95fr]">
                    <div className="relative min-h-[420px] overflow-hidden bg-[#151a20]">
                      <img src={machine.image} alt={machine.title} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                        <span className="text-[9px] font-bold uppercase tracking-[.25em] text-white/80">KHANDABI / MACHINERY</span>
                        {machine.cataloguePages.length > 0 && (
                          <span className="text-[9px] uppercase tracking-[.15em] text-white/65">
                            Catalogue {machine.cataloguePages.join(" / ")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex min-h-[420px] flex-col justify-between overflow-hidden p-7 md:p-9">
                      <div className="overflow-y-auto pr-1">
                        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{machine.category}</p>
                        <h3 className="mt-4 text-[clamp(2rem,3.6vw,4rem)] font-medium leading-[.86] tracking-[-.06em]">
                          {machine.title}
                        </h3>
                        <div className="mt-6 h-px w-12 bg-[#e76f32]" />
                        <p className="mt-5 text-sm leading-6 text-black/60">{machine.description}</p>

                        <div className="mt-6 grid grid-cols-2 gap-px border border-black/10 bg-black/10">
                          <div className="bg-[#f3f1ec] p-3">
                            <span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span>
                            <p className="mt-2 text-sm">{machine.technical.capacity || "Not specified"}</p>
                          </div>
                          <div className="bg-[#f3f1ec] p-3">
                            <span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span>
                            <p className="mt-2 text-sm">{machine.cataloguePage ? `Page ${machine.cataloguePage}` : "Not specified"}</p>
                          </div>
                        </div>

                        {machine.technical.options.length > 0 && (
                          <div className="mt-5">
                            <span className="text-[9px] font-bold uppercase tracking-[.16em] text-black/35">Options</span>
                            <p className="mt-2 text-xs leading-5 text-black/60">{machine.technical.options.join(" · ")}</p>
                          </div>
                        )}
                      </div>

                      <span className="mt-6 shrink-0 text-[9px] font-bold uppercase tracking-[.18em] text-black/35">
                        Click to open product
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Click / keyboard preview. Hover is intentionally separate so it never blocks the list. */}
      {active && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <article className="relative grid max-h-[90vh] w-full max-w-[1100px] overflow-auto bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.35)] md:grid-cols-[1.05fr_.95fr] md:overflow-hidden">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close preview"
              className="absolute right-5 top-4 z-20 flex h-9 w-9 items-center justify-center bg-black/70 text-xl text-white transition hover:bg-[#e76f32]"
            >
              ×
            </button>

            <div className="relative min-h-[320px] overflow-hidden bg-[#151a20] md:min-h-[600px]">
              <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/70">
                <span>KHANDABI / MACHINERY</span>
                {active.cataloguePages.length > 0 && <span>Catalogue {active.cataloguePages.join(" / ")}</span>}
              </div>
            </div>

            <div className="flex min-h-[320px] flex-col justify-between overflow-y-auto p-8 md:min-h-[600px] md:p-11">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                <div className="mt-7 h-px w-12 bg-[#e76f32]" />
                <p className="mt-6 max-w-md text-sm leading-7 text-black/60">{active.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-px border border-black/10 bg-black/10">
                  <div className="bg-[#f3f1ec] p-4">
                    <span className="text-[9px] uppercase tracking-[.16em] text-black/35">Capacity</span>
                    <p className="mt-2 text-sm">{active.technical.capacity || "Not specified"}</p>
                  </div>
                  <div className="bg-[#f3f1ec] p-4">
                    <span className="text-[9px] uppercase tracking-[.16em] text-black/35">Catalogue</span>
                    <p className="mt-2 text-sm">{active.cataloguePage ? `Page ${active.cataloguePage}` : "Not specified"}</p>
                  </div>
                </div>

                {active.catalogueImages.length > 0 && (
                  <div className="mt-8">
                    <p className="text-[9px] font-bold uppercase tracking-[.18em] text-black/35">Catalogue references</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {active.catalogueImages.slice(0, 6).map((src, index) => (
                        <img key={`${src}-${index}`} src={src} alt={`${active.title} catalogue reference ${index + 1}`} className="aspect-[4/3] w-full object-cover bg-black/5" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href={`/machinery/${active.slug}`} className="mt-10 flex w-fit items-center gap-4 bg-[#e76f32] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#111820]">
                View full product <span>→</span>
              </Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
