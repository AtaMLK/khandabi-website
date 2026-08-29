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
  const rowInside = useRef(false);
  const modalInside = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (!rowInside.current && !modalInside.current) setActive(null);
    }, 220);
  };
  const enterRow = (machine: Machine) => {
    rowInside.current = true;
    cancelClose();
    setActive(machine);
  };
  const leaveRow = () => {
    rowInside.current = false;
    scheduleClose();
  };
  const enterModal = () => {
    modalInside.current = true;
    cancelClose();
  };
  const leaveModal = () => {
    modalInside.current = false;
    scheduleClose();
  };

  return (
    <>
      <section className="mx-6 overflow-hidden border border-black/10 md:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {machines.map((machine, i) => (
            <div
              key={machine.slug}
              className="group flex min-h-[92px] cursor-pointer items-center border-b border-black/10 px-5 transition-colors duration-300 hover:bg-[#f7f4ed] md:min-h-[102px] md:px-8"
              onPointerEnter={() => enterRow(machine)}
              onPointerLeave={leaveRow}
              onClick={() => setActive(machine)}
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
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/25 px-4 backdrop-blur-[3px] transition-opacity duration-200 md:px-8 ${active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onPointerEnter={enterModal}
        onPointerLeave={leaveModal}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
      >
        {active && (
          <div className="relative grid w-full max-w-[900px] overflow-hidden bg-[#f3f1ec] text-[#111820] shadow-[0_30px_100px_rgba(0,0,0,.25)] md:grid-cols-[1.08fr_.92fr]">
            <button type="button" aria-label="Close product preview" onClick={() => setActive(null)} className="absolute right-5 top-4 z-20 flex h-9 w-9 items-center justify-center text-2xl font-light text-white mix-blend-difference">×</button>
            <div className="relative min-h-[300px] bg-[#151a20] md:min-h-[500px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[.25em] text-white/75">KHANDABI / MACHINERY</div>
            </div>
            <div className="flex min-h-[300px] flex-col justify-between p-7 md:min-h-[500px] md:p-11">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e76f32]">{active.category}</p>
                <h3 className="mt-5 max-w-md text-[clamp(2.2rem,4vw,4.3rem)] font-medium leading-[.86] tracking-[-.06em]">{active.title}</h3>
                <div className="mt-7 h-px w-12 bg-[#e76f32]" />
                <p className="mt-6 max-w-md text-sm leading-7 text-black/55">{active.description}</p>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
                <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-black/35">Product detail</span>
                <Link href={`/machinery/${active.slug}`} className="bg-[#e76f32] px-5 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#111820]">View full product →</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
