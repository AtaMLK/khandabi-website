import Link from "next/link";

const events = [
  { year: "2026", name: "F Istanbul", place: "Istanbul Expo Center", dates: "26–29 August 2026", detail: "Hall 6 · Stand DN144", status: "Upcoming" },
  { year: "2026", name: "Anuga FoodTec Fair", place: "Mumbai – Bombay Exhibition Center", dates: "29 September–1 October 2026", detail: "Hall 2 · Stand A87", status: "Upcoming" },
  { year: "2026", name: "19th Iran Tabriz International Confectionery Fair", place: "Tabriz International Permanent Fairgrounds", dates: "10–13 July 2026", detail: "Hall Amir Kabir", status: "2026" },
  { year: "2026", name: "33rd Iran Agrofood Fair", place: "Tehran International Permanent Fairgrounds", dates: "18–21 June 2026", detail: "Hall 38B · Stand 32", status: "2026" },
  { year: "2025", name: "2nd Iran Coffee & Cafe Festival", place: "Tehran · Gooft-o-goo Park", dates: "2–5 December 2025", detail: "Stand T26", status: "Past" },
  { year: "2025", name: "UAE Gulfood Manufacturing Fair", place: "Dubai World Trade Center", dates: "4–6 November 2025", detail: "Za'abeel Hall 2 · Stand Z2-D2", status: "Past" },
  { year: "2025", name: "24th Iran International Confectionery Fair", place: "Tehran", dates: "18–21 September 2025", detail: "Hall 41", status: "Past" },
  { year: "2025", name: "ProSweet Exhibition", place: "Cologne", dates: "2–5 February 2025", detail: "Hall 10.1 · Stand D-051", status: "Past" },
];

export default function ExhibitionsPage() {
  return <main className="min-h-screen bg-[#f3f1ec] text-[#111820]">
    <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 md:px-10"><Link href="/" className="text-xl font-black tracking-[-.04em]">KHANDABI<span className="text-[#e76f32]">.</span></Link><div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[.18em]"><Link href="/machinery">Machinery</Link><Link href="/customers">Customers</Link><Link href="/">Home</Link></div></nav>
    <header className="px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">News & Events / Exhibitions</p><h1 className="mt-6 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[.78] tracking-[-.075em]">WHERE WE<br /><span className="text-[#e76f32]">MEET.</span></h1><p className="mt-10 max-w-2xl text-base leading-7 text-black/55">Khandabi's exhibition presence brings its confectionery machinery and production-line capabilities closer to manufacturers and partners.</p></header>
    <section className="border-t border-black/10">{events.map((event, i) => <article key={`${event.name}-${event.dates}`} className="group grid border-b border-black/10 px-6 py-8 transition hover:bg-[#e7e3da] md:grid-cols-[90px_1fr_1fr_150px] md:items-center md:px-10 md:py-10"><span className="text-[10px] font-bold text-[#e76f32]">{event.year}</span><div><h2 className="text-2xl font-medium tracking-[-.035em]">{event.name}</h2><p className="mt-2 text-xs text-black/45">{event.place}</p></div><p className="mt-5 text-sm text-black/55 md:mt-0">{event.dates}<br /><span className="text-xs">{event.detail}</span></p><span className="mt-5 text-[9px] font-bold uppercase tracking-[.18em] text-black/35 md:mt-0 md:text-right">{event.status} ↗</span></article>)}</section>
    <section className="bg-[#111820] px-6 py-24 text-white md:px-10 md:py-32"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#e76f32]">Meet Khandabi</p><div className="mt-8 flex flex-col justify-between gap-10 md:flex-row md:items-end"><h2 className="max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.82] tracking-[-.07em]">BUILD THE<br /><span className="text-[#e76f32]">NEXT LINE.</span></h2><Link href="/contact" className="border border-white/25 px-6 py-4 text-[9px] font-bold uppercase tracking-[.18em]">Talk to our team →</Link></div></section>
  </main>;
}
