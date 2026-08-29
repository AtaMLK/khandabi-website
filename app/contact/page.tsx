import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#111820] text-white">
      <nav className="flex h-20 items-center justify-between border-b border-white/10 px-6 md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[.18em]">← Home</Link>
      </nav>
      <section className="px-6 py-24 md:px-10 md:py-36">
        <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Khandabi / Contact</p>
        <h1 className="mt-6 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[.8] tracking-[-.075em]">LET'S BUILD<br /><span className="text-[#e76f32]">YOUR LINE.</span></h1>
        <div className="mt-20 grid gap-12 border-t border-white/15 pt-10 md:grid-cols-3">
          <div><p className="text-[10px] uppercase tracking-[.2em] text-white/40">General enquiries</p><a href="mailto:info@khandabi.com" className="mt-4 block text-xl hover:text-[#e76f32]">info@khandabi.com</a></div>
          <div><p className="text-[10px] uppercase tracking-[.2em] text-white/40">Machinery</p><Link href="/machinery" className="mt-4 block text-xl hover:text-[#e76f32]">View full range →</Link></div>
          <div><p className="text-[10px] uppercase tracking-[.2em] text-white/40">Product enquiries</p><p className="mt-4 max-w-sm text-sm leading-6 text-white/55">Contact the Khandabi team for verified technical information, product documentation and project requirements.</p></div>
        </div>
      </section>
    </main>
  );
}
