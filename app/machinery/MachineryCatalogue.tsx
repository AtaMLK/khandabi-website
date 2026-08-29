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
          <div
            key={machine.slug}
            onMouseEnter={() => setActive(machine)}
            className="group relative min-h-[150px] cursor-pointer border-b border-black/15 p-7 transition-colors hover:bg-[#111820] hover:text-white md:min-h-[180px] md:p-10"
          >
            <Link href={`/machinery/${machine.slug}`} className="flex h-full items-center">
              <div className="flex w-full items-center gap-5">
                <span className="w-7 text-[10px] text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-xl font-medium tracking-[-.03em] transition-transform group-hover:translate-x-2 md:text-2xl">{machine.title}</span>
                <span className="text-xl opacity-30 transition-transform group-hover:translate-x-1 group-hover:opacity-100">↗</span>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px] transition-opacity duration-200 md:px-8 ${active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onMouseLeave={() => setActive(null)}
      >
        {active && (
          <div className="grid w-full max-w-5xl overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-2xl md:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[300px] bg-[#111820] md:min-h-[540px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[.22em] text-white/70">Khandabi / Machinery</span>
            </div>
            <div className="flex flex-col justify-between p-7 md:p-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 max-w-lg text-[clamp(2.4rem,4.5vw,5rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                <p className="mt-7 max-w-md text-sm leading-7 text-black/55">{active.description}</p>
              </div>
              <div className="mt-10 border-t border-black/15 pt-6">
                <Link href={`/machinery/${active.slug}`} className="inline-flex w-full items-center justify-between bg-[#e76f32] px-5 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition hover:bg-[#111820] hover:text-white">
                  View full product <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
