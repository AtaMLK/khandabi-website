const products = [
  { no: "01", title: "Chocolate", text: "From preparation and storage to coating and complete bar systems." },
  { no: "02", title: "Candy", text: "Cooking, forming, cooling and finishing systems for hard and soft candy." },
  { no: "03", title: "Bars", text: "Cereal, protein, nut and chocolate bar production solutions." },
  { no: "04", title: "Halva & Sesame", text: "Integrated cooking, forming and processing solutions." },
];

const machines = [
  "Continuous Vacuum Cooker",
  "Continuous Cooker",
  "Batch Cooker",
  "Nougat Cooker & Aeration",
  "Enrober & Coating Systems",
  "Cooling Tunnels",
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/10 text-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <a href="#" className="flex items-center gap-3 font-semibold tracking-[.18em]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e86b2d] text-sm text-[#e86b2d]">K</span>
            KHANDABI
          </a>
          <div className="hidden items-center gap-7 text-sm text-white/75 lg:flex">
            <a href="#machines" className="hover:text-white">Products</a>
            <a href="#lines" className="hover:text-white">Production Lines</a>
            <a href="#applications" className="hover:text-white">Applications</a>
            <a href="#engineering" className="hover:text-white">Engineering</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden text-sm text-white/70 sm:block">EN</button>
            <a href="#contact" className="rounded-full bg-[#e86b2d] px-5 py-3 text-xs font-bold tracking-[.12em] transition hover:bg-[#f17d40]">REQUEST A QUOTE</a>
          </div>
        </div>
      </nav>

      <section className="hero-grid relative min-h-[760px] bg-[#07131f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(232,107,45,.18),transparent_32%),linear-gradient(115deg,#07131f_30%,#0d2233_100%)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[.3em] text-[#ffb07b]">Confectionery machinery · Process engineering</p>
            <h1 className="text-5xl font-semibold leading-[.96] tracking-[-.045em] sm:text-7xl lg:text-[88px]">
              From ingredients<br />to <span className="text-[#e86b2d]">finished product.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65 sm:text-xl">
              Machinery and complete production solutions for chocolate, candy, bars, nougat, fondant, halva and more.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#machines" className="rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#07131f] transition hover:bg-[#ffb07b]">Explore Machinery <span className="ml-3">↗</span></a>
              <a href="#lines" className="rounded-full border border-white/20 px-6 py-4 text-sm font-semibold transition hover:border-white/50">Explore Production Lines</a>
            </div>
          </div>

          <div className="relative hidden h-[500px] lg:block">
            <div className="machine-glow float-slow absolute left-[10%] top-[15%] h-[350px] w-[78%] rounded-[38%] border border-white/10 bg-white/[.025]" />
            <div className="absolute left-[16%] top-[23%] h-[240px] w-[68%] rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[.08] to-transparent backdrop-blur-sm">
              <div className="absolute left-8 right-8 top-8 h-3 rounded-full bg-white/15" />
              <div className="absolute bottom-10 left-8 right-8 flex items-end gap-3">
                <span className="h-20 flex-1 rounded-sm bg-white/10" />
                <span className="h-28 flex-1 rounded-sm bg-[#e86b2d]/60" />
                <span className="h-24 flex-1 rounded-sm bg-white/10" />
                <span className="h-36 flex-1 rounded-sm bg-white/15" />
              </div>
            </div>
            <div className="absolute bottom-[16%] left-0 right-0 flex items-center gap-4 text-[10px] uppercase tracking-[.25em] text-white/35">
              <span className="h-px flex-1 bg-white/10" />
              KHANDABI PROCESS SYSTEM
              <span className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      <section id="applications" className="bg-[#f4f1eb] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#e86b2d]">Start with your product</p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-.035em] text-[#10202d] sm:text-5xl">What do you produce?</h2>
              <p className="mt-5 max-w-md leading-7 text-[#71808b]">Begin with the product you want to manufacture. We connect the process to the equipment and the complete line.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-3xl bg-[#10202d]/10 sm:grid-cols-2">
              {products.map((item) => (
                <a key={item.no} href="#lines" className="group bg-[#f4f1eb] p-7 transition hover:bg-white sm:p-9">
                  <span className="text-xs font-mono text-[#e86b2d]">{item.no}</span>
                  <h3 className="mt-12 text-2xl font-semibold text-[#10202d]">{item.title}</h3>
                  <p className="mt-3 leading-6 text-[#71808b]">{item.text}</p>
                  <span className="mt-8 inline-block text-lg transition group-hover:translate-x-2">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="machines" className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 border-b border-[#10202d]/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#e86b2d]">Machines</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-.035em] sm:text-5xl">Built around the process.</h2>
            </div>
            <a href="#contact" className="text-sm font-semibold">View all machinery <span className="ml-2">↗</span></a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine, index) => (
              <article key={machine} className="group relative min-h-[310px] overflow-hidden rounded-3xl bg-[#07131f] p-7 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(232,107,45,.16),transparent_38%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex justify-between text-xs text-white/40"><span>0{index + 1}</span><span>MACHINE</span></div>
                  <div>
                    <div className="mb-8 h-20 w-full rounded-xl border border-white/10 bg-white/[.03] p-4">
                      <div className="h-full rounded-lg border border-white/10 bg-gradient-to-r from-white/10 via-[#e86b2d]/20 to-transparent" />
                    </div>
                    <h3 className="text-xl font-semibold">{machine}</h3>
                    <p className="mt-2 text-sm text-white/50">Technical details, applications and related process equipment.</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lines" className="bg-[#07131f] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#ffb07b]">Production lines</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-.035em] sm:text-5xl">Not just machines.<br />Complete systems.</h2>
              <p className="mt-6 max-w-md leading-7 text-white/55">From individual equipment to coordinated production lines, Khandabi connects each stage of the process.</p>
              <a href="#contact" className="mt-9 inline-block rounded-full border border-white/20 px-6 py-4 text-sm font-semibold transition hover:border-white/50">Explore production lines ↗</a>
            </div>
            <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0d2233] p-8">
              <div className="absolute inset-0 opacity-50" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",backgroundSize:"48px 48px"}} />
              <div className="relative flex h-full flex-col justify-center gap-5">
                {['Preparation','Cooking','Forming','Coating','Cooling','Packaging'].map((step, i) => (
                  <div key={step} className="flex items-center gap-5">
                    <span className="w-8 font-mono text-xs text-[#ffb07b]">0{i + 1}</span>
                    <div className="h-12 flex-1 rounded-xl border border-white/10 bg-white/[.04] px-5 flex items-center justify-between">
                      <span className="text-sm font-medium">{step}</span><span className="text-white/30">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="engineering" className="bg-[#e9e4da] px-6 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px] grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#e86b2d]">Engineering capability</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-6xl">One process. Many engineering decisions.</h2>
          </div>
          <p className="max-w-md leading-7 text-[#71808b]">We will use the new site to explain how Khandabi connects preparation, cooking, forming, coating, cooling and complete production systems.</p>
        </div>
      </section>

      <section id="contact" className="bg-[#e86b2d] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px] flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-white/65">Start a project</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-.045em] sm:text-7xl">Tell us what you want to produce.</h2>
          </div>
          <a href="mailto:info@khandabi.com" className="shrink-0 rounded-full bg-[#07131f] px-7 py-5 text-sm font-semibold transition hover:bg-[#102c41]">Request a Quote ↗</a>
        </div>
      </section>

      <footer id="about" className="bg-[#07131f] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 text-sm text-white/45 sm:flex-row">
          <span className="font-semibold tracking-[.16em] text-white">KHANDABI</span>
          <span>Confectionery machinery & process engineering</span>
          <span>EN · TR · FA</span>
        </div>
      </footer>
    </main>
  );
}
