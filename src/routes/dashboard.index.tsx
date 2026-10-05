import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy, Eye, FileBadge, FolderKanban, GraduationCap, Plus, Sparkles, UserRound } from "lucide-react";
import { toast } from "sonner";
import { activities, completionItems, modules, viewer } from "@/data/dashboard";
import { PageIntro } from "@/components/dashboard/ModulePage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [
    { title: "Dashboard — FolioX" }, { name: "description", content: "Continue building your complete professional identity in FolioX." },
    { property: "og:title", content: "Dashboard — FolioX" }, { property: "og:description", content: "Your FolioX professional identity command center." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: DashboardHome,
});

const overview = [
  [UserRound, "Profile", "83%", "/dashboard/profile"], [modules.experience.icon, "Experience", "2", "/dashboard/experience"],
  [FolderKanban, "Projects", "2", "/dashboard/projects"], [FileBadge, "Credentials", "2", "/dashboard/certifications"],
  [modules.skills.icon, "Skills", "3", "/dashboard/skills"], [modules.awards.icon, "Awards", "1", "/dashboard/awards"],
] as const;

function DashboardHome() {
  return <div className="space-y-9">
    <PageIntro eyebrow="Your command center" title={`Good morning, ${viewer.firstName}.`} description="Continue building the professional identity that brings every chapter of your work together." action={<Link to="/dashboard/portfolio/preview" className={buttonVariants({ className: "h-11 rounded-full px-5 shadow-accent" })}><Eye />Preview portfolio</Link>} />
    <section className="grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-premium sm:p-8">
        <div className="absolute right-[-3rem] top-[-5rem] size-64 rounded-full border-[3rem] border-primary-foreground/5" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase text-accent-bright">Professional profile</p><h2 className="mt-4 max-w-xl font-display text-2xl font-bold sm:text-3xl">Your story is 83% complete.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/65">One final detail will make your identity feel more personal and recognizable.</p><Progress value={83} className="mt-7 h-2 bg-primary-foreground/15 [&>div]:bg-accent-bright" /><div className="mt-6 flex flex-wrap gap-2">{completionItems.map((item) => <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-[10px] font-semibold">{item.complete ? <Check className="size-3 text-accent-bright"/> : <Plus className="size-3 text-accent-bright"/>}{item.label}</span>)}</div></div><Link to="/dashboard/profile" className={buttonVariants({ variant: "secondary", className: "h-11 w-fit rounded-full px-5" })}>Continue building <ArrowRight /></Link></div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent"><Sparkles className="size-5" /></span><span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-bold text-accent">PUBLISHED</span></div><h2 className="mt-6 font-display text-xl font-bold">Your portfolio is live.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Share your professional story at</p><button onClick={() => { navigator.clipboard?.writeText("foliox.me/amara"); toast.success("Portfolio URL copied"); }} className="mt-4 flex w-full items-center justify-between rounded-xl bg-subtle px-4 py-3 text-xs font-bold">foliox.me/amara <Copy className="size-4 text-accent" /></button><div className="mt-5 flex gap-2"><Link to="/dashboard/portfolio/preview" className={buttonVariants({ variant: "outline", className: "flex-1 rounded-full" })}>Preview</Link><Link to="/dashboard/portfolio" className={buttonVariants({ className: "flex-1 rounded-full" })}>Manage</Link></div></div>
    </section>
    <section><div className="mb-4 flex items-end justify-between"><div><p className="eyebrow">At a glance</p><h2 className="mt-2 font-display text-xl font-bold">Your professional identity</h2></div></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">{overview.map(([Icon,label,value,to]) => <Link key={label} to={to} className="group rounded-xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-1 hover:border-accent/30"><Icon className="size-4 text-accent"/><p className="mt-5 font-display text-2xl font-bold">{value}</p><p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">{label}</p></Link>)}</div></section>
    <section className="grid gap-6 xl:grid-cols-[1fr_.8fr]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft"><div className="flex items-center justify-between"><div><p className="eyebrow">Momentum</p><h2 className="mt-2 font-display text-xl font-bold">Recent activity</h2></div><span className="text-xs text-muted-foreground">Preview data</span></div><div className="mt-6 divide-y divide-border">{activities.map((activity) => <div key={activity.text} className="flex items-center gap-4 py-4"><span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent"><activity.icon className="size-4" /></span><div><p className="text-sm font-semibold">{activity.text}</p><p className="mt-0.5 text-xs text-muted-foreground">{activity.time}</p></div></div>)}</div></div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft"><p className="eyebrow">Quick actions</p><h2 className="mt-2 font-display text-xl font-bold">Keep building</h2><div className="mt-6 grid gap-2 sm:grid-cols-2">{[["Add experience","/dashboard/experience",modules.experience.icon],["Add project","/dashboard/projects",FolderKanban],["Add education","/dashboard/education",GraduationCap],["Add credential","/dashboard/certifications",FileBadge]] as const).map(([label,to,Icon]) => <Link key={label} to={to} className="flex items-center gap-3 rounded-xl bg-subtle p-3 text-xs font-bold hover:bg-accent-soft hover:text-accent"><span className="grid size-8 place-items-center rounded-lg bg-card shadow-soft"><Icon className="size-4"/></span>{label}</Link>)}</div></div>
    </section>
  </div>;
}