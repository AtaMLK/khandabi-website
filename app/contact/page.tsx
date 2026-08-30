"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = `Website enquiry from ${name || "Khandabi website"}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:info@khandabi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#111820] text-white">
      <nav className="flex h-20 items-center justify-between border-b border-white/10 px-6 md:px-10">
        <Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link>
        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[.18em]"><Link href="/machinery" className="text-white/60 hover:text-white">Machinery</Link><Link href="/" className="hover:text-[#e76f32]">← Home</Link></div>
      </nav>
      <section className="grid border-b border-white/10 md:grid-cols-[1fr_.9fr]">
        <div className="px-6 py-20 md:px-10 md:py-28">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Khandabi / Contact</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.8] tracking-[-.075em]">LET'S BUILD<br /><span className="text-[#e76f32]">YOUR LINE.</span></h1>
          <div className="mt-16 grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-2">
            <div><p className="text-[10px] uppercase tracking-[.2em] text-white/35">General enquiries</p><a href="mailto:info@khandabi.com" className="mt-4 block text-lg transition hover:text-[#e76f32]">info@khandabi.com</a></div>
            <div><p className="text-[10px] uppercase tracking-[.2em] text-white/35">Machinery</p><Link href="/machinery" className="mt-4 block text-lg transition hover:text-[#e76f32]">View full range →</Link></div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-[#f3f1ec] px-6 py-16 text-[#111820] md:border-l md:border-t-0 md:px-10 md:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Project enquiry</p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-.04em] md:text-4xl">Tell us what you are building.</h2>
          <form onSubmit={submit} className="mt-10 space-y-7">
            <label className="block"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Name *</span><input required name="name" className="mt-3 w-full border-b border-black/20 bg-transparent py-3 outline-none transition focus:border-[#e76f32]" /></label>
            <label className="block"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Company</span><input name="company" className="mt-3 w-full border-b border-black/20 bg-transparent py-3 outline-none transition focus:border-[#e76f32]" /></label>
            <label className="block"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Email *</span><input required type="email" name="email" className="mt-3 w-full border-b border-black/20 bg-transparent py-3 outline-none transition focus:border-[#e76f32]" /></label>
            <label className="block"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-black/40">Project / requirements *</span><textarea required name="message" rows={5} className="mt-3 w-full resize-none border-b border-black/20 bg-transparent py-3 outline-none transition focus:border-[#e76f32]" /></label>
            <button type="submit" className="w-full bg-[#e76f32] px-6 py-5 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#111820]">Open email enquiry ↗</button>
            {sent && <p className="text-xs leading-6 text-black/50">Your email client should now open with the enquiry prepared. If it did not, email <a className="underline" href="mailto:info@khandabi.com">info@khandabi.com</a> directly.</p>}
          </form>
        </div>
      </section>
      <footer className="flex flex-col justify-between gap-5 px-6 py-9 md:flex-row md:items-center md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><span className="text-[10px] uppercase tracking-[.18em] text-white/35">© Khandabi Machinery Co.</span></footer>
    </main>
  );
}
