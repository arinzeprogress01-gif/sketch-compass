import { Link } from "@tanstack/react-router";
import { Check, Eye, EyeOff, FileBadge, ShieldCheck } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="hero-halo" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.15fr_.85fr]">
        <main className="flex flex-col px-5 py-6 sm:px-8 lg:px-12">
          <Link to="/" className="group flex w-fit items-center gap-2.5" aria-label="PROVEN home">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Check className="size-4 stroke-[3] transition-transform group-hover:scale-110" />
            </span>
            <span className="font-display text-base font-extrabold">PROVEN</span>
          </Link>
          <div className="flex flex-1 items-center py-12">
            <div className="w-full max-w-xl">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-md leading-7 text-muted-foreground">{subtitle}</p>
              <div className="mt-10">{children}</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 PROVEN · Your professional story, backed by evidence.</p>
        </main>
        <aside className="relative hidden items-center px-10 py-12 lg:flex">{aside ?? <DefaultAside />}</aside>
      </div>
    </div>
  );
}

function DefaultAside() {
  return (
    <div className="relative w-full">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <span className="grid size-11 place-items-center rounded-full bg-accent font-display font-bold text-accent-foreground">AO</span>
          <div>
            <p className="font-display text-sm font-bold">Amara Okafor</p>
            <p className="text-xs text-muted-foreground">Product Designer · Researcher</p>
          </div>
          <span className="ml-auto rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-accent">PUBLIC</span>
        </div>
        {[
          ["Lead Product Designer", "Civic Lab · 2022 — Now"],
          ["MSc Human-Computer Interaction", "University of Lagos"],
          ["Certified UX Researcher", "Credential verified"],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center gap-3 border-b border-border py-4 last:border-0">
            <FileBadge className="size-4 text-accent" />
            <div><p className="text-sm font-semibold">{a}</p><p className="text-xs text-muted-foreground">{b}</p></div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-8 -left-8 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-float">
        <span className="grid size-9 place-items-center rounded-lg bg-highlight"><ShieldCheck className="size-4" /></span>
        <div><p className="text-xs font-bold">3 evidence attachments</p><p className="text-[11px] text-muted-foreground">Every claim, connected to proof</p></div>
      </div>
    </div>
  );
}

export function Field({
  label,
  error,
  hint,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const [show, setShow] = useState(false);
  const isPassword = props.type === "password";
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold">{label}{props.required && <span className="text-accent"> *</span>}</span>
      <span className="relative mt-2 block">
        <input
          {...props}
          type={isPassword && show ? "text" : props.type}
          aria-invalid={!!error}
          className={`h-12 w-full rounded-xl border bg-card px-4 text-sm shadow-soft outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-4 focus:ring-accent/15 ${error ? "border-destructive" : "border-input"} ${isPassword ? "pr-11" : ""}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute inset-y-0 right-3 grid place-items-center text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </span>
      {error ? <span className="mt-1.5 block text-xs text-destructive">{error}</span> : hint ? <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function SubmitButton({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <button type="submit" disabled={loading} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-accent transition hover:-translate-y-0.5 disabled:opacity-60">
      {loading ? "Please wait…" : children}
    </button>
  );
}

export const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const PASSWORD_MSG = "Password must be at least 8 characters with uppercase, lowercase and a number";
