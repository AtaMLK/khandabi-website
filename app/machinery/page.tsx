import Link from "next/link";
import MachineryCatalogue from "./MachineryCatalogue";
import { machines } from "./data";

export default function MachineryIndex() {
  return <main className="min-h-screen bg-white text-[#171a1f]">
    <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10">
      <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
      <div className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[.12em]">
        <Link href="/" className="hover:text-[#e76f32]">Home</Link>
        <Link href="/machinery" className="text-[#e76f32]">Products</Link>
        <Link href="/#lines" className="hover:text-[#e76f32]">Projects</Link>
      </div>
    </nav>
    <header className="flex items-end justify-between border-b border-black/10 px-6 pb-7 pt-12 md:px-10 md:pt-16">
      <div><p className="text-[11px] font-medium uppercase tracking-[.18em] text-[#f36f21]">Full range</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] md:text-4xl">OUR MACHINERY</h1></div>
      <Link href="#range" className="hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[.14em] text-[#f36f21] md:flex">⌕ &nbsp; Explore all machinery</Link>
    </header>
    <div id="range"><MachineryCatalogue machines={machines} /></div>
  </main>;
}
