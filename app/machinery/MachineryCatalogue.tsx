"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Machine = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
};

export default function MachineryCatalogue({ machines }: { machines: Machine[] }) {
  const [active, setActive] = useState<Machine | null>(null);

  return (
    <>
      <section className="grid grid-cols-1 border-t border-black/15 md:grid-cols-2">
        {machines.map((machine, i) => (
          <Link
            href={`/machinery/${machine.slug}`}
            key={machine.slug}
            onMouseEnter={() => setActive(machine)}
            onMouseLeave={() => setActive(null)}
            className="group relative flex min-h-[150px] items-center border-b border-black/15 p-7 transition-colors hover:bg-[#111820] hover:text-white md:min-h-[180px] md:p-10"
          >
            <div className="flex w-full items-center gap-5">
              <span className="w-7 text-[10px] text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-xl font-medium tracking-[-.03em] transition-transform group-hover:translate-x-2 md:text-2xl">{machine.title}</span>
              <span className="text-xl opacity-30 transition-transform group-hover:translate-x-1 group-hover:opacity-100">↗</span>
            </div>
          </Link>
        ))}
      </section>

      <div
        className={`pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-black/20 px-5 transition-opacity duration-200 md:px-10 ${active ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`pointer-events-auto grid w-full max-w-5xl overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-2xl transition-all duration-300 md:grid-cols-[1.05fr_.95fr] ${active ? "translate-y-0 scale-100" : "translate-y-3 scale-[.98]"}`}
          onMouseEnter={() => active && setActive(active)}
          onMouseLeave={() => setActive(null)}
        >
          {active && (
            <>
              <div className="relative min-h-[280px] bg-[#111820] md:min-h-[520px]">
                <Image src={active.image} alt={active.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 52vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[.22em] text-white/70">Khandabi / Machinery</span>
              </div>
              <div className="flex flex-col justify-between p-7 md:p-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">{active.category}</p>
                  <h3 className="mt-5 max-w-lg text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                  <p className="mt-7 max-w-md text-sm leading-7 text-black/55">{active.description}</p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-black/15 pt-6">
                  <span className="text-[10px] uppercase tracking-[.18em] text-black/40">Product overview</span>
                  <Link href={`/machinery/${active.slug}`} className="bg-[#e76f32] px-5 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-[#111820] hover:text-white">View full product →</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
