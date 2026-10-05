import { Link } from "@tanstack/react-router";
import { Copy, Eye, FileUp, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
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
  const [open, setOpen] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = genericFormSchema.safeParse(form);
    const next: Record<string, string> = {};
    definition.fields.forEach((field) => { if (field.required && !form[field.key]?.trim()) next[field.key] = `${field.label} is required`; });
    if (!parsed.success) next["form"] = "Please review the information and try again.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success(`${definition.singular[0]?.toUpperCase()}${definition.singular.slice(1)} ready to save`, { description: "This preview does not store changes yet." });
    setOpen(false); setForm({});
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Build your story" title={definition.title} description={definition.description} action={<Button onClick={() => setOpen(true)} className="h-11 rounded-full px-5 shadow-accent"><Plus />{definition.addLabel}</Button>} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label={`Search ${definition.title}`} placeholder={`Search ${definition.title.toLowerCase()}`} className="h-10 rounded-xl bg-card pl-9" /></div>
        <p className="text-xs text-muted-foreground">{definition.entries.length} {definition.entries.length === 1 ? "entry" : "entries"}</p>
      </div>
      {definition.entries.length ? (
        <div className="grid gap-4">
          {definition.entries.map((entry) => (
            <article key={entry.title} className="group grid gap-5 rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-[auto_1fr_auto] sm:items-start sm:p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent"><definition.icon className="size-5" /></span>
              <div><div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-base font-bold">{entry.title}</h2><VisibilityBadge value={entry.visibility} /></div><p className="mt-1.5 text-xs font-semibold text-muted-foreground">{entry.meta}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{entry.detail}</p>{entry.evidence && <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent"><FileUp className="size-3.5" />{entry.evidence}</p>}</div>
              <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label={`Actions for ${entry.title}`}><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => setOpen(true)}><Pencil />Edit</DropdownMenuItem><DropdownMenuItem onClick={() => toast.message("Duplicate prepared", { description: "This preview does not store changes yet." })}><Copy />Duplicate</DropdownMenuItem><DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteTitle(entry.title)}><Trash2 />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-y border-border bg-subtle px-5 py-16 text-center sm:px-10"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-card text-accent shadow-soft"><definition.icon className="size-6" /></span><h2 className="mt-5 font-display text-xl font-bold">{definition.emptyTitle}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{definition.emptyCopy}</p><Button onClick={() => setOpen(true)} className="mt-6 rounded-full"><Plus />{definition.addLabel}</Button></div>
      )}

      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-2xl"><DialogHeader><DialogTitle className="font-display text-2xl">{definition.addLabel}</DialogTitle><DialogDescription>Add the details that help this chapter feel credible and complete.</DialogDescription></DialogHeader><form onSubmit={submit} className="mt-3 grid gap-5 sm:grid-cols-2" noValidate>
        {definition.fields.map((field) => <label key={field.key} className={cn("text-xs font-bold", field.key === "description" || field.key === "testimonial" ? "sm:col-span-2" : "")}><span>{field.label}{field.required && <b className="text-accent"> *</b>}</span>{field.key === "description" || field.key === "testimonial" ? <Textarea maxLength={1000} rows={5} value={form[field.key] ?? ""} onChange={(e) => setForm((current) => ({ ...current, [field.key]: e.target.value }))} placeholder={field.placeholder} className="mt-2 rounded-xl bg-card" /> : <Input maxLength={255} type={field.type ?? "text"} value={form[field.key] ?? ""} onChange={(e) => setForm((current) => ({ ...current, [field.key]: e.target.value }))} placeholder={field.placeholder} className="mt-2 h-11 rounded-xl bg-card" />}{errors[field.key] && <span className="mt-1 block font-normal text-destructive">{errors[field.key]}</span>}</label>)}
        <div className="sm:col-span-2 rounded-xl border border-dashed border-border bg-subtle p-5"><div className="flex gap-3"><FileUp className="size-5 text-accent" /><div><p className="text-sm font-bold">Supporting evidence</p><p className="mt-1 text-xs leading-5 text-muted-foreground">New evidence stays private until you explicitly make it public.</p></div></div></div>
        <DialogFooter className="sm:col-span-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Save {definition.singular}</Button></DialogFooter>
      </form></DialogContent></Dialog>

      <AlertDialog open={!!deleteTitle} onOpenChange={(value) => !value && setDeleteTitle(null)}><AlertDialogContent className="rounded-2xl"><AlertDialogHeader><AlertDialogTitle>Delete “{deleteTitle}”?</AlertDialogTitle><AlertDialogDescription>This would permanently remove the entry from your professional story. This preview will not actually delete it.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep entry</AlertDialogCancel><AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={() => { toast.info("Preview only", { description: "No entry was deleted." }); setDeleteTitle(null); }}>Delete entry</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}