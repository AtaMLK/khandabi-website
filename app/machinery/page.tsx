import Link from "next/link";
import MachineryCatalogue from "./MachineryCatalogue";
import { machines } from "./data";

export default function MachineryIndex() {
  return (
    <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
      <nav className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-black/10 bg-[#f3f1ec]/95 px-6 backdrop-blur md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <div className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[.18em] md:gap-7"><Link href="/" className="transition hover:text-[#e76f32]">Home</Link><Link href="/machinery" className="text-[#e76f32]">Machinery</Link><Link href="/#lines" className="hidden transition hover:text-[#e76f32] sm:block">Lines</Link><Link href="/contact" className="transition hover:text-[#e76f32]">Contact</Link></div>
      </nav>
      <header className="border-b border-black/10 px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Full range / {machines.length} machines</p><h1 className="mt-5 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">OUR<br />MACHINERY.</h1></div><p className="max-w-sm text-sm leading-7 text-black/50">Explore the complete machinery range. Hover for a visual preview; click to open the dedicated product presentation.</p></div>
      </header>
      <section className="py-10 md:py-14" id="range"><MachineryCatalogue machines={machines} /></section>
      <footer className="mt-10 flex flex-col justify-between gap-5 bg-black px-6 py-8 text-white md:flex-row md:items-center md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><Link href="/contact" className="text-[10px] uppercase tracking-[.18em] text-white/50 transition hover:text-white">Start an inquiry →</Link><span className="text-[10px] uppercase tracking-[.18em] text-white/35">© Khandabi Machinery Co.</span></footer>
    </main>
  );
}
