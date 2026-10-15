import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Download, FileText, Loader2, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/dashboard/ModulePage";
import { useWorkspace } from "@/components/dashboard/WorkspaceProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCv, cvSections, type CvDocument, type CvSection } from "@/data/cv";
import { downloadCv } from "@/lib/cv-pdf";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/cv")({ head: () => ({ meta: [
  { title: "CV Builder — FolioPro" }, { name: "description", content: "Create, customize, preview, and download a professional CV from your FolioPro workspace." },
  { property: "og:title", content: "CV Builder — FolioPro" }, { property: "og:description", content: "Turn your professional story into a focused, downloadable CV." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
] }), component: CvPage });

function CvPage() {
  const { profile, entries } = useWorkspace();
  const [cv, setCv] = useState<CvDocument>(() => createCv(profile, entries));
  const [order, setOrder] = useState<CvSection[]>(cvSections);
  const [included, setIncluded] = useState<CvSection[]>(cvSections);
  const [template, setTemplate] = useState<"classic" | "modern">("modern");
  const [size, setSize] = useState<"a4" | "letter">("a4");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const move = (index: number, direction: number) => setOrder((current) => { const next = [...current]; const a = next[index]; const b = next[index + direction]; if (!a || !b) return current; next[index] = b; next[index + direction] = a; return next; });
  const updateItem = (key: CvSection, id: string, field: string, value: string) => setCv((current) => ({ ...current, sections: { ...current.sections, [key]: current.sections[key].map((item) => item.id === id ? { ...item, [field]: value } : item) } }));
  const exportPdf = async () => { if (!cv.name.trim()) { setError("Enter your name before downloading."); return; } setError(""); setBusy(true); try { await downloadCv(cv, order.filter((key) => included.includes(key)), template, size); toast.success("CV downloaded"); } catch { setError("Your CV could not be downloaded. Please try again."); } finally { setBusy(false); } };
  return <div className="space-y-7">
    <PageIntro eyebrow="Your next opportunity" title="CV Builder" description="A focused version of your professional story, ready for your next application." action={<Button disabled={busy} onClick={exportPdf} className="h-11 rounded-full px-5 shadow-accent">{busy ? <Loader2 className="animate-spin" /> : <Download />}Download PDF</Button>} />
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted-foreground">Unsaved CV · This session only</p><Button variant="outline" onClick={() => { setCv(createCv(profile, entries)); setError(""); }}><RotateCcw />Import workspace</Button></div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <div className="grid items-start gap-8 xl:grid-cols-[.85fr_1.15fr]">
      <section className="min-w-0"><Tabs defaultValue="content"><TabsList className="mb-5 grid w-full grid-cols-2"><TabsTrigger value="content">Content</TabsTrigger><TabsTrigger value="design">Design & sections</TabsTrigger></TabsList>
        <TabsContent value="content" className="space-y-7">
          <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 font-display text-lg font-bold">Personal details</legend>{([ ["name", "Full name"], ["headline", "Professional headline"], ["email", "Email"], ["phone", "Phone"], ["location", "Location"] ] as const).map(([key, label]) => <label key={key} className={cn("text-xs font-bold", key === "headline" && "sm:col-span-2")}>{label}<Input className="mt-2 bg-card" maxLength={180} value={cv[key]} onChange={(event) => setCv((current) => ({ ...current, [key]: event.target.value }))} /></label>)}<label className="text-xs font-bold sm:col-span-2">Professional summary<Textarea className="mt-2 bg-card" rows={4} maxLength={2000} value={cv.summary} onChange={(event) => setCv((current) => ({ ...current, summary: event.target.value }))} /></label></fieldset>
          {order.map((key) => <section key={key} className="border-t border-border pt-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-bold capitalize">{key}</h2><Button size="sm" variant="outline" onClick={() => setCv((current) => ({ ...current, sections: { ...current.sections, [key]: [...current.sections[key], { id: crypto.randomUUID(), title: "", subtitle: "", description: "" }] } }))}><Plus />Add</Button></div><div className="space-y-4">{cv.sections[key].map((item) => <article key={item.id} className="space-y-3 rounded-lg border border-border bg-card p-4"><div className="flex items-center gap-2"><Input aria-label={`${key} title`} placeholder="Title" value={item.title} onChange={(event) => updateItem(key, item.id, "title", event.target.value)} maxLength={180} /><Button variant="ghost" size="icon" aria-label={`Remove ${item.title || key}`} onClick={() => setCv((current) => ({ ...current, sections: { ...current.sections, [key]: current.sections[key].filter((row) => row.id !== item.id) } }))}><Trash2 /></Button></div><Input aria-label={`${key} organization and dates`} placeholder="Organization · Dates" value={item.subtitle} onChange={(event) => updateItem(key, item.id, "subtitle", event.target.value)} maxLength={255} /><Textarea aria-label={`${key} achievements`} placeholder="Achievements and outcomes" value={item.description} onChange={(event) => updateItem(key, item.id, "description", event.target.value)} maxLength={2000} /></article>)}</div></section>)}
        </TabsContent>
        <TabsContent value="design" className="space-y-7"><section><h2 className="mb-4 font-display text-lg font-bold">Template</h2><div className="grid grid-cols-2 gap-3">{(["modern", "classic"] as const).map((value) => <Button key={value} variant={template === value ? "default" : "outline"} aria-pressed={template === value} onClick={() => setTemplate(value)} className="h-24 flex-col capitalize"><FileText className="size-7" />{value}</Button>)}</div></section><section><h2 className="mb-4 font-display text-lg font-bold">Paper size</h2><div className="flex gap-2">{(["a4", "letter"] as const).map((value) => <Button key={value} aria-pressed={size === value} variant={size === value ? "default" : "outline"} onClick={() => setSize(value)} className="uppercase">{value}</Button>)}</div></section><section><h2 className="mb-3 font-display text-lg font-bold">Section order</h2>{order.map((key, index) => <div key={key} className="flex items-center gap-3 border-b border-border py-3"><Checkbox id={`cv-${key}`} checked={included.includes(key)} onCheckedChange={(value) => setIncluded((current) => value ? [...current, key] : current.filter((item) => item !== key))} /><label htmlFor={`cv-${key}`} className="flex-1 text-sm font-semibold capitalize">{key}</label><Button aria-label={`Move ${key} up`} title="Move up" size="icon" variant="ghost" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp /></Button><Button aria-label={`Move ${key} down`} title="Move down" size="icon" variant="ghost" disabled={index === order.length - 1} onClick={() => move(index, 1)}><ArrowDown /></Button></div>)}</section></TabsContent>
      </Tabs></section>
      <section className="min-w-0 xl:sticky xl:top-24"><div className="mb-3 flex justify-between text-xs font-semibold text-muted-foreground"><span>CV preview</span><span>{size === "a4" ? "A4" : "US Letter"} · {template === "modern" ? "Modern" : "Classic"}</span></div><article aria-label="CV preview" className={cn("cv-paper min-h-[48rem] bg-card px-6 py-9 text-card-foreground shadow-premium sm:px-10", template === "modern" && "border-t-8 border-accent")}><header className="border-b border-border pb-5"><h2 className={cn("break-words font-display font-bold", template === "modern" ? "text-3xl text-accent" : "text-2xl")}>{cv.name || "Your name"}</h2><p className="mt-2 break-words text-sm font-semibold">{cv.headline}</p><p className="mt-3 break-words text-[11px] leading-5 text-muted-foreground">{[cv.email, cv.phone, cv.location].filter(Boolean).join(" · ")}</p></header>{cv.summary && <section className="mt-6"><h3 className="text-xs font-bold uppercase">Profile</h3><p className="mt-3 whitespace-pre-line break-words text-xs leading-6">{cv.summary}</p></section>}{order.filter((key) => included.includes(key) && cv.sections[key].length).map((key) => <section key={key} className="mt-7"><h3 className={cn("border-b border-border pb-2 text-xs font-bold uppercase", template === "modern" && "text-accent")}>{key}</h3>{cv.sections[key].map((item) => <div key={item.id} className="mt-4 break-words"><h4 className="text-xs font-bold">{item.title || "Untitled"}</h4><p className="mt-1 text-[11px] text-muted-foreground">{item.subtitle}</p><p className="mt-2 whitespace-pre-line text-xs leading-6">{item.description}</p></div>)}</section>)}</article></section>
    </div>
  </div>;
}