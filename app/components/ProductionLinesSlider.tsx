"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const lines = [
  { no: "01", title: "Choco Bar Line", type: "Extruder system", text: "Complete chocolate bar production from forming through cutting and cooling.", image: "https://images.unsplash.com/photo-1575377427642-087cf684f04d?auto=format&fit=crop&w=1800&q=85", href: "/machinery" },
  { no: "02", title: "Choco Bar Line", type: "Drum / slab system", text: "A complete forming route for chocolate and bar products using drum-based production.", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1800&q=85", href: "/machinery" },
  { no: "03", title: "Smart Chocolate Line", type: "Dragee production", text: "Integrated chocolate dragee production for coating and finishing products.", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1800&q=85", href: "/machinery" },
  { no: "04", title: "Halva Production", type: "Cooking + forming", text: "Complete halva preparation, cooking, aeration and forming workflow.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85", href: "/machinery" },
];

export default function ProductionLinesSlider() {
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!track.current) return;
    dragging.current = true;
    startX.current = event.clientX;
    startScroll.current = track.current.scrollLeft;
    track.current.setPointerCapture(event.pointerId);
    track.current.classList.add("cursor-grabbing");
  };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !track.current) return;
    track.current.scrollLeft = startScroll.current - (event.clientX - startX.current) * 1.15;
  };
  const pointerUp = () => {
    dragging.current = false;
    track.current?.classList.remove("cursor-grabbing");
  };

  return (
    <div>
      <div ref={track} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} className="flex snap-x snap-mandatory cursor-grab gap-5 overflow-x-auto px-6 pb-5 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
        {lines.map((line) => (
          <article key={line.no} className="group relative h-[500px] w-[82vw] shrink-0 snap-start overflow-hidden md:w-[52vw] lg:w-[42vw]">
            <Image src={line.image} alt={line.title} fill draggable={false} className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 82vw, 42vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-9">
              <div className="flex justify-between text-[9px] uppercase tracking-[.2em] text-white/55"><span>{line.no}</span><span>Complete system</span></div>
              <div>
                <p className="text-[9px] uppercase tracking-[.18em] text-[#e76f32]">{line.type}</p>
                <h3 className="mt-2 text-4xl font-medium tracking-[-.05em] md:text-5xl">{line.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/60">{line.text}</p>
                <Link href={line.href} onPointerDown={(event) => event.stopPropagation()} className="mt-6 inline-block text-[9px] font-bold uppercase tracking-[.18em] transition-transform group-hover:translate-x-2">Explore production system →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between px-6 text-[9px] uppercase tracking-[.18em] text-white/35 md:px-10"><span>Drag to explore</span><span>← 01 — 04 →</span></div>
    </div>
  );
}
