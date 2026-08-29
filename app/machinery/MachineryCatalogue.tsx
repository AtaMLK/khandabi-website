"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Machine = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const [active, setActive] = useState<Machine | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (machine: Machine) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(machine);
  };

  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 120);
  };

  const cancelHide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      <section className="mx-6 border border-black/10 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {machines.map((machine, i) => (
            <button
              type="button"
              key={machine.slug}
              className="group flex min-h-[92px] w-full cursor-pointer items-center border-b border-black/10 bg-transparent px-5 text-left transition-colors duration-200 hover:bg-[#ebe7df] md:min-h-[102px] md:px-8"
              onMouseEnter={() => show(machine)}
              onMouseLeave={hide}
              onFocus={() => show(machine)}
              onBlur={hide}
              onClick={() => show(machine)}
            >
              <span className="w-6 shrink-0 text-[10px] tabular-nums text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 px-5 text-[15px] font-medium md:text-[16px]">{machine.title}</span>
              <span className="text-lg text-[#e76f32] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
            </button>
          ))}
        </div>
      </section>

      <div
        aria-hidden={!active}
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/35 px-4 py-6 transition-opacity duration-200 ${active ? "visible opacity-100" : "invisible opacity-0"}`}
        onMouseEnter={cancelHide}
        onMouseLeave={hide}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
      >
        {active && (
          <div className="relative grid w-full max-w-[960px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.3)] md:grid-cols-[1.08fr_.92fr]">
            <button type="button" onClick={() => setActive(null)} aria-label="Close preview" className="absolute right-5 top-4 z-20 flex h-9 w-9 items-center justify-center bg-black/60 text-xl text-white">×</button>
            <div className="relative min-h-[300px] overflow-hidden bg-[#151a20] md:min-h-[540px]">
              <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[.25em] text-white/80">KHANDABI / MACHINERY</span>
            </div>
            <div className="flex min-h-[300px] flex-col justify-between p-8 md:min-h-[540px] md:p-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                <div className="mt-7 h-px w-12 bg-[#e76f32]" />
                <p className="mt-6 max-w-md text-sm leading-7 text-black/60">{active.description}</p>
              </div>
              <Link href={`/machinery/${active.slug}`} className="mt-10 flex w-fit items-center gap-4 bg-[#e76f32] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#111820]">View full product <span>→</span></Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
