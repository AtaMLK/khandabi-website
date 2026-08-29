"use client";

import Image from "next/image";
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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (machine: Machine) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(machine);
  };

  const close = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 180);
  };

  const keepOpen = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <>
      <section className="mx-6 border border-black/10 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {machines.map((machine, i) => (
            <div
              key={machine.slug}
              className="group flex min-h-[92px] cursor-pointer items-center border-b border-black/10 px-5 transition-colors duration-200 hover:bg-[#ebe7df] md:min-h-[102px] md:px-8"
              onMouseEnter={() => open(machine)}
              onMouseLeave={close}
              onClick={() => open(machine)}
            >
              <div className="flex w-full items-center gap-5 py-5">
                <span className="w-6 text-[10px] tabular-nums text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[15px] font-medium md:text-[16px]">{machine.title}</span>
                <span className="text-lg text-[#e76f32] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 px-4 py-8 backdrop-blur-[2px]"
          onMouseEnter={keepOpen}
          onMouseLeave={close}
          onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
        >
          <article className="relative grid w-full max-w-[980px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-2xl md:grid-cols-[1.1fr_.9fr]">
            <button type="button" onClick={() => setActive(null)} aria-label="Close" className="absolute right-5 top-4 z-10 text-2xl leading-none mix-blend-difference text-white">×</button>
            <div className="relative min-h-[300px] bg-[#151a20] md:min-h-[540px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[.25em] text-white/75">KHANDABI / MACHINERY</span>
            </div>
            <div className="flex min-h-[300px] flex-col justify-between p-8 md:min-h-[540px] md:p-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 text-[clamp(2.5rem,4.5vw,4.8rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                <div className="mt-7 h-px w-12 bg-[#e76f32]" />
                <p className="mt-6 max-w-md text-sm leading-7 text-black/60">{active.description}</p>
              </div>
              <Link href={`/machinery/${active.slug}`} className="mt-10 flex w-fit items-center gap-4 bg-[#e76f32] px-6 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white hover:bg-[#111820]">View full product <span>→</span></Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
