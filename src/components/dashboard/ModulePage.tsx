import { Link } from "@tanstack/react-router";
import { Copy, Eye, FileUp, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useWorkspace, type WorkspaceEntry } from "@/components/dashboard/WorkspaceProvider";
import { modules, type ModuleKey } from "@/data/dashboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const genericFormSchema = z.record(z.string(), z.string().trim().max(1000));

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p></div>
      {action}
    </div>
  );
}

export function VisibilityBadge({ value }: { value: "Public" | "Private" | "Hidden" }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold", value === "Public" ? "bg-accent-soft text-accent" : value === "Private" ? "bg-highlight text-foreground" : "bg-muted text-muted-foreground")}><Eye className="size-3" />{value}</span>;
}

export function ModulePage({ moduleKey }: { moduleKey: ModuleKey }) {
  const definition = modules[moduleKey];
  const { entries, setEntries } = useWorkspace();
  const rows = entries[moduleKey];
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<WorkspaceEntry | null>(null);
  const [visibility, setVisibility] = useState<"Public" | "Private" | "Hidden">("Private");
  const [attachment, setAttachment] = useState("");
  const begin = (entry?: WorkspaceEntry) => { setEditing(entry ?? null); setForm(entry?.fields ?? {}); setVisibility(entry?.visibility ?? "Private"); setAttachment(entry?.evidence ?? ""); setErrors({}); setOpen(true); };
  const [open, setOpen] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = genericFormSchema.safeParse(form);
    const next: Record<string, string> = {};
    definition.fields.forEach((field) => { if (field.required && !form[field.key]?.trim()) next[field.key] = `${field.label} is required`; });
    if (form["url"] && !/^https?:\/\//i.test(form["url"])) next["url"] = "Enter a complete https:// or http:// URL.";
    if (!parsed.success) next["form"] = "Please review the information and try again.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const firstKey = definition.fields[0]?.key ?? "title";
    const secondKey = definition.fields[1]?.key ?? "";
    const entry: WorkspaceEntry = { id: editing?.id ?? crypto.randomUUID(), fields: { ...form }, title: form[firstKey]?.trim() ?? "Untitled", meta: form[secondKey] ?? "", detail: form["description"] ?? form["testimonial"] ?? "", visibility, ...(attachment ? { evidence: attachment } : {}) };
    setEntries((current) => ({ ...current, [moduleKey]: editing ? current[moduleKey].map((row) => row.id === editing.id ? entry : row) : [...current[moduleKey], entry] }));
    toast.success("Preview updated", { description: "Changes last for this workspace session." });
    setOpen(false); setForm({});
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Build your story" title={definition.title} description={definition.description} action={<Button onClick={() => begin()} className="h-11 rounded-full px-5 shadow-accent"><Plus />{definition.addLabel}</Button>} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label={`Search ${definition.title}`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${definition.title.toLowerCase()}`} className="h-10 rounded-xl bg-card pl-9" /></div>
        <p className="text-xs text-muted-foreground">{rows.length} {rows.length === 1 ? "entry" : "entries"}</p>
      </div>
      {rows.length ? (
        <div className="grid gap-4">
          {rows.filter((entry) => `${entry.title} ${entry.meta} ${entry.detail}`.toLowerCase().includes(query.toLowerCase())).map((entry) => (
            <article key={entry.id} className="group grid gap-5 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-[auto_1fr_auto] sm:items-start sm:p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent"><definition.icon className="size-5" /></span>
              <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-base font-bold">{entry.title}</h2><VisibilityBadge value={entry.visibility} /></div><p className="mt-1.5 text-xs font-semibold text-muted-foreground">{entry.meta}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{entry.detail}</p>{entry.evidence && <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent"><FileUp className="size-3.5" />{entry.evidence}</p>}</div>
              <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label={`Actions for ${entry.title}`}><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => begin(entry)}><Pencil />Edit</DropdownMenuItem><DropdownMenuItem onClick={() => setEntries((current) => ({ ...current, [moduleKey]: [...current[moduleKey], { ...entry, id: crypto.randomUUID(), title: `${entry.title} (copy)` }] }))}><Copy />Duplicate</DropdownMenuItem><DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteTitle(entry.id)}><Trash2 />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-y border-border bg-subtle px-5 py-16 text-center sm:px-10"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-card text-accent shadow-soft"><definition.icon className="size-6" /></span><h2 className="mt-5 font-display text-xl font-bold">{definition.emptyTitle}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{definition.emptyCopy}</p><Button onClick={() => begin()} className="mt-6 rounded-full"><Plus />{definition.addLabel}</Button></div>
      )}

      {query && !rows.some((entry) => `${entry.title} ${entry.meta} ${entry.detail}`.toLowerCase().includes(query.toLowerCase())) && <p className="py-8 text-center text-sm text-muted-foreground">No matching entries.</p>}
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-2xl"><DialogHeader><DialogTitle className="font-display text-2xl">{editing ? `Edit ${definition.singular}` : definition.addLabel}</DialogTitle><DialogDescription>Add the details that help this chapter feel credible and complete.</DialogDescription></DialogHeader><form onSubmit={submit} className="mt-3 grid gap-5 sm:grid-cols-2" noValidate>
        {definition.fields.map((field) => <label key={field.key} className={cn("text-xs font-bold", field.key === "description" || field.key === "testimonial" ? "sm:col-span-2" : "")}><span>{field.label}{field.required && <b className="text-accent"> *</b>}</span>{field.key === "description" || field.key === "testimonial" ? <Textarea maxLength={1000} rows={5} value={form[field.key] ?? ""} onChange={(e) => setForm((current) => ({ ...current, [field.key]: e.target.value }))} placeholder={field.placeholder} className="mt-2 rounded-xl bg-card" /> : <Input maxLength={255} type={field.type ?? "text"} value={form[field.key] ?? ""} onChange={(e) => setForm((current) => ({ ...current, [field.key]: e.target.value }))} placeholder={field.placeholder} className="mt-2 h-11 rounded-xl bg-card" />}{errors[field.key] && <span className="mt-1 block font-normal text-destructive">{errors[field.key]}</span>}</label>)}
        <label className="text-xs font-bold">Visibility<select aria-label="Entry visibility" value={visibility} onChange={(event) => { const value = event.target.value; if (value === "Public" || value === "Private" || value === "Hidden") setVisibility(value); }} className="mt-2 h-11 w-full rounded-lg border border-input bg-card px-3"><option>Private</option><option>Public</option><option>Hidden</option></select></label>
        {errors["form"] && <p role="alert" className="text-sm text-destructive">{errors["form"]}</p>}
        <div className="sm:col-span-2 rounded-xl border border-dashed border-border bg-subtle p-5"><div className="flex gap-3"><FileUp className="size-5 text-accent" /><div><p className="text-sm font-bold">Supporting evidence</p><p className="mt-1 text-xs leading-5 text-muted-foreground">New evidence stays private until you explicitly make it public.</p></div></div><Input aria-label="Attach supporting evidence" type="file" className="mt-4 bg-card" onChange={(event) => setAttachment(event.target.files?.[0]?.name ?? "")} />{attachment && <p className="mt-2 text-xs">{attachment} · Private attachment, session only</p>}</div>
        <DialogFooter className="sm:col-span-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Save {definition.singular}</Button></DialogFooter>
      </form></DialogContent></Dialog>

      <AlertDialog open={!!deleteTitle} onOpenChange={(value) => !value && setDeleteTitle(null)}><AlertDialogContent className="rounded-2xl"><AlertDialogHeader><AlertDialogTitle>Delete “{rows.find((entry) => entry.id === deleteTitle)?.title}”?</AlertDialogTitle><AlertDialogDescription>Remove this entry from your preview workspace? This changes only the current session.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep entry</AlertDialogCancel><AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={() => { setEntries((current) => ({ ...current, [moduleKey]: current[moduleKey].filter((entry) => entry.id !== deleteTitle) })); toast.success("Removed from preview"); setDeleteTitle(null); }}>Delete entry</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}