import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROVEN — Your career, backed by evidence" },
      { name: "description", content: "Build a complete professional portfolio for your experience, education, credentials, projects, achievements, and proof." },
      { property: "og:title", content: "PROVEN — Your career, backed by evidence" },
      { property: "og:description", content: "A universal professional portfolio that brings your whole career together in one credible place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const modules = [
  ["01", "Experience", "Roles, impact, and outcomes"],
  ["02", "Education", "Degrees, research, and learning"],
  ["03", "Projects & work", "What you made and why it matters"],
  ["04", "Credentials", "Licenses and verified certificates"],
  ["05", "Publications", "Books, papers, articles, and reports"],
  ["06", "Awards", "Recognition with supporting proof"],
];

const professions = ["ENGINEER", "LAWYER", "DOCTOR", "DESIGNER", "TEACHER", "RESEARCHER", "FOUNDER", "WRITER"];

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="PROVEN home">
      <span className="grid size-8 place-items-center bg-foreground">
        <span className="size-3.5 rounded-full border-2 border-background" />
      </span>
      <span className="font-display text-sm font-extrabold">PROVEN</span>
    </a>
  );
}

function PortfolioPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] pt-8 lg:pt-0">
      <div className="absolute -right-2 top-0 z-10 bg-highlight px-4 py-3 font-display text-xs font-bold uppercase sm:right-8 lg:-right-6 lg:top-10">Public profile · live</div>
      <article className="border-2 border-foreground bg-background shadow-[10px_10px_0_var(--foreground)]">
        <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-3">
          <span className="font-display text-xs font-bold">proven.me/amara</span>
          <span className="text-xs font-bold text-signal">● AVAILABLE</span>
        </div>
        <div className="p-5 sm:p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">Product designer · Researcher</p>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Amara Okafor</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">I turn complex public services into clear, inclusive digital experiences.</p>
            </div>
            <div className="grid size-14 shrink-0 place-items-center bg-signal font-display text-xl font-bold text-accent-foreground sm:size-20">AO</div>
          </div>
          <div className="my-6 h-px bg-border" />
          <div className="grid grid-cols-2 gap-px bg-foreground">
            <div className="bg-background p-4">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Current</p>
              <p className="mt-2 font-display text-sm font-semibold">Lead Product Designer</p>
              <p className="mt-1 text-xs text-muted-foreground">Civic Lab · 2022—Now</p>
            </div>
            <div className="bg-highlight p-4">
              <p className="text-[10px] font-bold uppercase">Outcome</p>
              <p className="mt-2 font-display text-2xl font-bold">+38%</p>
              <p className="mt-1 text-xs">Service completion</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold">Attached evidence</p>
              <span className="text-[10px] font-bold uppercase text-signal">3 items</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {["CASE STUDY ↗", "RESEARCH PDF ↗", "RECOMMENDATION ↗"].map((item) => (
                <div key={item} className="border border-border px-3 py-3 text-[10px] font-bold">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Index() {
  return (
    <main id="top" className="overflow-x-hidden bg-background text-foreground">
      <header className="border-b-2 border-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-8 lg:px-12">
          <BrandMark />
          <nav className="hidden items-center gap-8 text-xs font-bold md:flex" aria-label="Main navigation">
            <a href="#showcase" className="transition-colors hover:text-signal">What you can show</a>
            <a href="#professionals" className="transition-colors hover:text-signal">For professionals</a>
            <a href="#evidence" className="transition-colors hover:text-signal">Why PROVEN</a>
          </nav>
          <a href="#start" className="shrink-0 bg-foreground px-4 py-3 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:px-6">CREATE YOURS ↗</a>
        </div>
      </header>

      <section className="border-b-2 border-foreground">
        <div className="mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl lg:grid-cols-[1.08fr_.92fr]">
          <div className="flex flex-col justify-between border-foreground px-4 py-10 sm:px-8 sm:py-14 lg:border-r-2 lg:px-12 lg:py-16">
            <div>
              <div className="mb-9 flex items-center gap-3">
                <span className="size-2 bg-signal" />
                <span className="text-[10px] font-bold uppercase">The universal professional portfolio</span>
              </div>
              <h1 className="max-w-3xl font-display text-[clamp(3.25rem,8vw,7.7rem)] font-medium leading-[0.92]">
                Your career is more than a <span className="relative inline-block"><span className="relative z-10">CV.</span><span className="absolute bottom-[6%] left-0 -z-0 h-[24%] w-full bg-highlight" /></span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Bring your experience, education, work, credentials, achievements, and evidence together in one professional identity.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#start" className="bg-signal px-6 py-4 text-center text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5">CREATE YOUR PORTFOLIO ↗</a>
                <a href="#example" className="border-2 border-foreground px-6 py-4 text-center text-sm font-bold transition-colors hover:bg-foreground hover:text-primary-foreground">EXPLORE AN EXAMPLE</a>
              </div>
            </div>
            <div className="mt-14 grid grid-cols-3 border-t border-border pt-5 text-[10px] font-bold uppercase text-muted-foreground">
              <span>01 · Build</span><span>02 · Prove</span><span>03 · Share</span>
            </div>
          </div>
          <div id="example" className="flex items-center bg-quiet px-4 py-12 sm:px-8 lg:px-12">
            <PortfolioPreview />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b-2 border-foreground bg-highlight py-4">
        <p className="whitespace-nowrap font-display text-sm font-bold uppercase">CV → LinkedIn → Drive → Certificates → GitHub → Publications → Social media → <span className="text-signal">Bring it all together.</span></p>
      </div>

      <section id="showcase" className="border-b-2 border-foreground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-bold uppercase text-signal">What you can showcase</p>
              <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight sm:text-5xl">Your whole professional world.</h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Choose only what fits your field. Every section connects to the work, documents, and outcomes that support it.</p>
            </div>
            <div className="border-t-2 border-foreground">
              {modules.map(([number, title, detail]) => (
                <div key={title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-border py-5 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center">
                  <span className="text-xs font-bold text-signal">{number}</span>
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{title}</h3>
                  <p className="col-start-2 text-sm text-muted-foreground sm:col-auto">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="professionals" className="border-b-2 border-foreground bg-foreground py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div><p className="text-[10px] font-bold uppercase text-highlight">Built for every professional</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">The platform adapts to you. Not the other way around.</h2></div>
            <p className="max-w-lg leading-relaxed text-primary-foreground/60 lg:justify-self-end">A lawyer can lead with credentials and publications. An engineer with projects and licenses. An author with books and speaking. Same platform. Different identity.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 border-l border-t border-primary-foreground/25 sm:grid-cols-4">
            {professions.map((profession, index) => <div key={profession} className={`${index === 3 ? "bg-signal" : index === 6 ? "bg-highlight text-foreground" : ""} border-b border-r border-primary-foreground/25 p-5 font-display text-sm font-bold sm:p-7`}>{profession}<span className="mt-6 block text-right text-xs">↗</span></div>)}
          </div>
        </div>
      </section>

      <section id="evidence" className="border-b-2 border-foreground py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="text-[10px] font-bold uppercase text-signal">A career, not a list</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold leading-tight sm:text-5xl">Show the story. Then show the proof.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Connect every milestone to the document, result, link, or recommendation behind it.</p>
          </div>
          <div className="border-l-2 border-foreground pl-5 sm:pl-9">
            {[["2017", "Education", "BSc. Computer Engineering"], ["2019", "First role", "Systems Engineer · Lagos"], ["2022", "Breakthrough project", "Reduced processing time by 42%"], ["2024", "Professional credential", "Cloud Architecture · Certificate attached"], ["NOW", "Independent practice", "Consulting across West Africa"]].map(([year, label, title], index) => (
              <div key={year} className="relative border-b border-border py-7 first:pt-0">
                <span className={`absolute -left-[1.8rem] top-8 size-3 border-2 border-foreground sm:-left-[2.65rem] ${index === 4 ? "bg-signal" : "bg-background"}`} />
                <p className="text-[10px] font-bold text-signal">{year} · {label.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
                {index > 1 && <span className="mt-3 inline-block border border-border px-2 py-1 text-[10px] font-bold">EVIDENCE ATTACHED ↗</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="bg-highlight py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div><p className="text-[10px] font-bold uppercase">Your professional story starts here</p><h2 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[.98] sm:text-7xl">Build the place your career deserves.</h2></div>
            <a href="#top" className="bg-foreground px-8 py-5 text-center text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1">CREATE YOUR PORTFOLIO ↗</a>
          </div>
        </div>
      </section>

      <footer className="bg-foreground px-4 py-8 text-primary-foreground sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><BrandMark /><p className="text-xs text-primary-foreground/50">One profile. Every chapter. All the evidence.</p><p className="text-xs">© 2026 PROVEN</p></div>
      </footer>
    </main>
  );
}