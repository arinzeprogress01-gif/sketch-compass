import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  FileBadge,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Menu,
  Scale,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROVEN — Your complete professional story" },
      { name: "description", content: "Build one credible professional portfolio for your experience, work, credentials, achievements, and evidence." },
      { property: "og:title", content: "PROVEN — Your complete professional story" },
      { property: "og:description", content: "Your career is more than a CV. Bring every chapter and the proof behind it into one beautiful professional identity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const professions = [
  [Code2, "Developer"],
  [Scale, "Lawyer"],
  [Settings2, "Engineer"],
  [BookOpen, "Author"],
  [GraduationCap, "Teacher"],
  [FlaskConical, "Researcher"],
] as const;

const featureCards = [
  [BriefcaseBusiness, "Experience", "Show your work history, roles, responsibilities, and meaningful outcomes."],
  [ShieldCheck, "Credentials", "Display certifications, licenses, qualifications, and the proof behind them."],
  [FolderKanban, "Projects", "Present your work, case studies, research, and real-world impact."],
  [GraduationCap, "Education", "Share your academic journey, learning milestones, and specialist training."],
  [Award, "Achievements", "Highlight awards, recognition, publications, and notable accomplishments."],
  [Settings2, "Customisable", "Choose the sections that fit your field and arrange your story your way."],
] as const;

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="PROVEN home">
      <span className={`grid size-8 place-items-center rounded-lg ${inverse ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}>
        <Check className="size-4 stroke-[3] transition-transform group-hover:scale-110" />
      </span>
      <span className="font-display text-base font-extrabold">PROVEN</span>
    </a>
  );
}

function ProfileAvatar({ initials, tone = "accent" }: { initials: string; tone?: "accent" | "warm" | "ink" }) {
  const toneClass = tone === "warm" ? "bg-highlight" : tone === "ink" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";
  return <span className={`grid shrink-0 place-items-center rounded-full font-display font-bold ${toneClass}`}>{initials}</span>;
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto h-[25.5rem] w-full max-w-[39rem] sm:h-[29rem] lg:translate-x-4">
      <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden rounded-2xl border border-border bg-card shadow-premium sm:left-3 sm:right-2">
        <aside className="absolute inset-y-0 left-0 hidden w-[6.4rem] bg-primary p-3 text-primary-foreground sm:block">
          <div className="mb-8 flex items-center gap-1.5 font-display text-[10px] font-extrabold"><span className="grid size-5 place-items-center rounded-md bg-accent">✓</span> PROVEN</div>
          {[[Sparkles,"Overview"],[UserRound,"Profile"],[BriefcaseBusiness,"Experience"],[GraduationCap,"Education"],[FolderKanban,"Projects"],[FileBadge,"Credentials"]].map(([Icon, label], index) => (
            <div key={label as string} className={`mb-1 flex items-center gap-2 rounded-md px-2 py-2 text-[7px] ${index === 0 ? "bg-accent" : "text-primary-foreground/65"}`}>
              <Icon className="size-2.5" /> {label as string}
            </div>
          ))}
        </aside>
        <div className="h-full p-4 sm:ml-[6.4rem] sm:p-5">
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div className="flex gap-3">
              <ProfileAvatar initials="AO" />
              <div><p className="font-display text-sm font-bold">Amara Okafor</p><p className="text-[8px] text-muted-foreground">Product Designer · Researcher</p><p className="mt-1 text-[7px] text-accent">Lagos, Nigeria · Available</p></div>
            </div>
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[7px] font-bold text-accent">PUBLIC</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1.08fr_.92fr]">
            <div className="rounded-xl border border-border bg-background p-3 shadow-soft">
              <div className="flex items-center justify-between"><p className="text-[8px] font-bold">Experience</p><span className="text-[7px] text-accent">View all</span></div>
              <div className="relative mt-3 space-y-3 pl-4 before:absolute before:bottom-1 before:left-[3px] before:top-1 before:w-px before:bg-accent-soft">
                {["Lead Product Designer", "Senior Product Designer", "UX Researcher"].map((role, index) => <div key={role} className="relative before:absolute before:-left-4 before:top-1 before:size-2 before:rounded-full before:bg-accent"><p className="text-[8px] font-bold">{role}</p><p className="mt-0.5 text-[7px] text-muted-foreground">{index === 0 ? "Civic Lab · 2022—Now" : index === 1 ? "Kora Systems · 2020—2022" : "Northstar · 2018—2020"}</p></div>)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-3 shadow-soft">
              <div className="flex items-center justify-between"><p className="text-[8px] font-bold">Featured work</p><span className="text-[7px] text-accent">3 projects</span></div>
              <div className="mt-3 grid grid-cols-[4.5rem_1fr] gap-2">
                <div className="grid h-16 place-items-center rounded-lg bg-primary text-primary-foreground"><FolderKanban className="size-5 text-accent" /></div>
                <div><p className="text-[8px] font-bold">Civic Access</p><p className="mt-1 text-[7px] leading-relaxed text-muted-foreground">Making public services easier to complete.</p><p className="mt-2 text-[7px] font-bold text-accent">CASE STUDY →</p></div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["12 projects", "8 credentials", "24 evidence files"].map((stat) => <div key={stat} className="rounded-lg bg-subtle px-2 py-3 text-center text-[7px] font-bold">{stat}</div>)}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-40 rounded-xl border border-border bg-card p-3 shadow-float sm:w-48">
        <p className="text-[7px] font-bold text-muted-foreground">VERIFIED CREDENTIAL</p>
        <div className="mt-2 flex gap-2"><span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent"><ShieldCheck className="size-4" /></span><div><p className="text-[8px] font-bold">Service Design</p><p className="mt-0.5 text-[7px] text-muted-foreground">Credential attached</p></div></div>
      </div>
      <div className="absolute -bottom-4 left-2 rounded-xl border border-border bg-card px-4 py-3 shadow-float sm:left-[4.8rem]">
        <p className="text-[7px] text-muted-foreground">Portfolio strength</p><p className="mt-1 font-display text-lg font-bold">92% <span className="text-[7px] font-medium text-accent">Excellent</span></p>
      </div>
    </div>
  );
}

function MiniProfileShowcase() {
  return (
    <div className="relative mx-auto h-[23rem] w-full max-w-[36rem]">
      <div className="absolute left-0 top-14 w-[44%] -rotate-3 rounded-2xl bg-primary p-4 text-primary-foreground shadow-premium">
        <div className="mb-20 h-16 rounded-lg bg-primary-foreground/10" />
        <p className="text-[9px] font-bold">Creative work.</p><p className="mt-1 text-[8px] text-primary-foreground/55">Ideas made visible.</p>
      </div>
      <div className="absolute right-0 top-12 w-[43%] rotate-3 rounded-2xl border border-border bg-card p-4 shadow-premium">
        <div className="grid h-20 place-items-center rounded-lg bg-accent-soft"><ShieldCheck className="size-8 text-accent" /></div>
        <p className="mt-8 text-[9px] font-bold">Verified expertise.</p><p className="mt-1 text-[8px] text-muted-foreground">Proof that travels.</p>
      </div>
      <div className="absolute left-1/2 top-0 z-10 w-[54%] -translate-x-1/2 rounded-2xl border border-border bg-card p-5 shadow-float">
        <ProfileAvatar initials="DK" tone="warm" />
        <h3 className="mt-3 font-display text-lg font-bold">Daniel Kalu</h3><p className="text-[8px] text-muted-foreground">Structural Engineer</p>
        <div className="my-4 h-px bg-border" />
        <p className="text-[8px] leading-relaxed text-muted-foreground">Designing safer, smarter structures for growing cities.</p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center"><div><b className="block text-sm">8+</b><span className="text-[6px] text-muted-foreground">YEARS</span></div><div><b className="block text-sm">12</b><span className="text-[6px] text-muted-foreground">PROJECTS</span></div><div><b className="block text-sm">5</b><span className="text-[6px] text-muted-foreground">CREDENTIALS</span></div></div>
      </div>
    </div>
  );
}

function Index() {
  return (
    <main id="top" className="overflow-hidden bg-background text-foreground">
      <header className="relative z-50 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <BrandMark />
          <nav className="hidden items-center gap-8 text-xs font-semibold md:flex" aria-label="Main navigation">
            <a href="#features" className="hover:text-accent">Features</a><a href="#example" className="hover:text-accent">Example</a><a href="#professionals" className="hover:text-accent">For professionals</a><a href="#why" className="hover:text-accent">Why PROVEN</a>
          </nav>
          <div className="hidden items-center gap-5 sm:flex"><a href="#start" className="text-xs font-semibold">Sign in</a><Button asChild className="rounded-full px-5 shadow-accent"><a href="#start">Get started <ArrowRight /></a></Button></div>
          <Menu className="size-5 sm:hidden" aria-label="Open navigation" />
        </div>
      </header>

      <section className="relative min-h-[46rem] pb-24 pt-16 sm:pt-24 lg:min-h-[43rem] lg:pb-28">
        <div className="hero-halo" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-8 lg:px-12">
          <div className="relative z-10">
            <p className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-[9px] font-extrabold uppercase text-accent">The universal professional portfolio</p>
            <h1 className="mt-6 max-w-2xl font-display text-[clamp(3.15rem,5.2vw,5.25rem)] font-bold leading-[1.03]">Your complete professional story. <span className="text-accent">All in one place.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Build a credible professional identity with your experience, education, credentials, work, achievements, and proof.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-13 rounded-full px-7 shadow-accent"><a href="#start">Create your portfolio <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="h-13 rounded-full px-7 shadow-none"><a href="#example">Explore an example</a></Button></div>
            <div className="mt-9 flex items-center gap-4"><div className="flex -space-x-2">{[["AO","accent"],["DK","warm"],["SM","ink"],["JL","accent"]].map(([name,tone]) => <span key={name} className="ring-2 ring-background"><ProfileAvatar initials={name} tone={tone as "accent" | "warm" | "ink"} /></span>)}</div><p className="text-xs leading-5 text-muted-foreground"><b className="text-foreground">Made for every field</b><br/>One profile. Every chapter.</p></div>
          </div>
          <div id="example" className="relative"><DashboardPreview /></div>
        </div>
      </section>

      <section className="border-y border-border bg-subtle py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><p className="text-center font-display text-sm font-bold">Built for professionals across every field</p><div className="mt-9 grid grid-cols-3 gap-6 sm:grid-cols-6">{professions.map(([Icon,label]) => <div key={label} className="group text-center"><span className="mx-auto grid size-12 place-items-center rounded-full bg-background text-accent shadow-soft transition-transform group-hover:-translate-y-1"><Icon className="size-5" /></span><p className="mt-3 text-[10px] font-semibold">{label}</p></div>)}</div></div>
      </section>

      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-12">
          <div className="lg:pt-10"><p className="eyebrow">Everything that matters</p><h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight sm:text-5xl">More than a portfolio. It’s your professional identity.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Showcase your work, prove your credentials, highlight your achievements, and tell the full story behind your career.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{featureCards.map(([Icon,title,copy]) => <a href="#start" key={title} className="feature-card group"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><Icon className="size-5" /></span><div><div className="flex items-center justify-between"><h3 className="font-display text-sm font-bold">{title}</h3><ChevronRight className="size-4 text-accent transition-transform group-hover:translate-x-1" /></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{copy}</p></div></a>)}</div>
        </div>
      </section>

      <section id="professionals" className="bg-subtle py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12">
          <div><p className="eyebrow">Built around you</p><h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-tight sm:text-5xl">Different paths. One place to prove them.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Whether you build, teach, create, write, research, advise, or lead, PROVEN gives your work the context it deserves.</p><Button asChild className="mt-8 rounded-full px-6 shadow-accent"><a href="#start">Create your portfolio <ArrowRight /></a></Button></div>
          <MiniProfileShowcase />
        </div>
      </section>

      <section id="why" className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12"><div><p className="text-[10px] font-bold uppercase text-accent-bright">Your work deserves context</p><h2 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-tight sm:text-6xl">Don’t just make claims. Connect every milestone to the evidence behind it.</h2></div><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">{["Documents", "Links", "Recommendations"].map((item) => <div key={item} className="flex min-w-44 items-center gap-3 border-b border-primary-foreground/20 py-3 text-sm"><Check className="size-4 text-accent-bright" />{item}</div>)}</div></div>
      </section>

      <section id="start" className="py-24 sm:py-32"><div className="mx-auto max-w-4xl px-5 text-center sm:px-8"><p className="eyebrow">Your next chapter</p><h2 className="mt-5 font-display text-5xl font-bold leading-tight sm:text-6xl">Build the place your career deserves.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">One polished profile for every role, project, credential, and achievement that shaped your work.</p><Button asChild size="lg" className="mt-8 h-13 rounded-full px-8 shadow-accent"><a href="#top">Create your portfolio <ArrowRight /></a></Button></div></section>

      <footer className="border-t border-border py-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"><div><BrandMark /><p className="mt-3 text-xs text-muted-foreground">Your professional story. All in one place.</p></div><nav className="flex flex-wrap gap-6 text-xs font-semibold"><a href="#features">Features</a><a href="#example">Example</a><a href="#professionals">For professionals</a><a href="#why">Why PROVEN</a></nav><p className="text-xs text-muted-foreground">© 2026 PROVEN</p></div></footer>
    </main>
  );
}