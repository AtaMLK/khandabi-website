import Link from "next/link";
import MachineryCatalogue from "./MachineryCatalogue";
import { machines } from "./data";

export default function MachineryIndex() {
  return (
    <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
      <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <div className="flex items-center gap-7 text-[10px] font-semibold uppercase tracking-[.18em]">
          <Link href="/" className="transition hover:text-[#e76f32]">Home</Link>
          <Link href="/machinery" className="text-[#e76f32]">Machinery</Link>
          <Link href="/#lines" className="transition hover:text-[#e76f32]">Lines</Link>
          <Link href="/#contact" className="transition hover:text-[#e76f32]">Contact</Link>
        </div>
      </nav>
      <header className="border-b border-black/10 px-6 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Full range / {machines.length} machines</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">OUR<br />MACHINERY.</h1>
          </div>
          <p className="max-w-sm text-sm leading-7 text-black/50">Hover a machine to preview it. Open the product page for the full technical presentation and verified catalogue information.</p>
        </div>
      </header>
      <section className="py-10 md:py-14" id="range"><MachineryCatalogue machines={machines} /></section>
    </main>
  );
}
