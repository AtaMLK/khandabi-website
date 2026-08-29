"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

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

  const open = (machine: Machine) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(machine);
  };

  const close = () => {
    closeTimer.current = setTimeout(() => setActive(null), 120);
  };

  return (
    <>
      <section className="mx-6 overflow-hidden rounded-sm border border-black/10 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {machines.map((machine, i) => (
            <div
              key={machine.slug}
              className="group flex min-h-[92px] cursor-pointer items-center border-b border-black/10 px-5 transition-colors duration-300 hover:bg-[#f7f4ed] md:min-h-[102px] md:px-8"
              onMouseEnter={() => open(machine)}
              onMouseLeave={close}
            >
              <Link href={`/machinery/${machine.slug}`} className="flex w-full items-center gap-5 py-5">
                <span className="w-6 text-[10px] font-medium tabular-nums text-[#e76f32]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[15px] font-medium tracking-[-.015em] md:text-[16px]">{machine.title}</span>
                <span className="text-[18px] font-light text-[#e76f32] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px] transition-opacity duration-200 md:px-8 ${active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onMouseEnter={() => active && open(active)}
        onMouseLeave={close}
      >
        {active && (
          <div className="relative grid w-full max-w-[790px] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_80px_rgba(0,0,0,.18)] md:grid-cols-[1.03fr_.97fr]">
            <button aria-label="Close preview" onClick={() => setActive(null)} className="absolute right-5 top-5 z-20 text-3xl font-light leading-none text-[#111820]/60 transition hover:text-[#111820]">×</button>

            <div className="relative min-h-[330px] bg-[#e9e7e1] md:min-h-[470px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 52vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[.22em] text-white/80">KHANDABI / MACHINERY</div>
            </div>

            <div className="flex min-h-[330px] flex-col justify-between p-7 md:min-h-[470px] md:p-10">
              <div className="pr-8">
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[.9] tracking-[-.055em]">{active.title}</h3>
                <div className="mt-5 h-px w-11 bg-[#e76f32]" />
                <p className="mt-5 text-[13px] leading-6 text-black/55">{active.description}</p>
              </div>

              <div className="mt-8 border-t border-black/10 pt-5">
                <Link href={`/machinery/${active.slug}`} className="flex w-full items-center justify-between bg-[#f36f21] px-5 py-4 text-[10px] font-bold uppercase tracking-[.17em] text-white transition hover:bg-[#111820]">
                  View full product <span className="text-lg font-light">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
