import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AuthShell, EMAIL_RE, Field, PASSWORD_MSG, PASSWORD_RE, SubmitButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — PROVEN" },
      { name: "description", content: "Create a PROVEN account and start building a professional portfolio backed by real evidence." },
      { property: "og:title", content: "Create your account — PROVEN" },
      { property: "og:description", content: "Start your evidence-backed professional portfolio on PROVEN." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

const initial = { name: "", email: "", password: "", phone: "", gender: "", dateOfBirth: "", street: "", city: "", state: "", country: "" };
type FormState = typeof initial;

function validate(f: FormState) {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!f.name.trim()) e.name = "Please enter your full name";
  if (!EMAIL_RE.test(f.email.trim().toLowerCase())) e.email = "Please enter a valid email address, e.g. user@example.com";
  if (!PASSWORD_RE.test(f.password) || f.password.length > 128) e.password = PASSWORD_MSG;
  if (f.phone.trim().length < 11) e.phone = "Phone number must be at least 11 digits";
  if (!["male", "female", "others"].includes(f.gender)) e.gender = "Please select your gender";
  if (!f.dateOfBirth) e.dateOfBirth = "Please enter your date of birth";
  return e;
}

function RegisterPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const set = (k: keyof FormState) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <AuthShell eyebrow="Create your account" title="Build the place your career deserves." subtitle="A few details to set up your account. You'll shape your portfolio right after.">
      <form onSubmit={submit} noValidate className="space-y-8">
        <Section n="01" title="Personal details">
          <Field className="sm:col-span-2" label="Full name" required autoComplete="name" placeholder="Amara Okafor" value={form.name} onChange={set("name")} error={errors.name} />
          <Field label="Email address" required type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set("email")} error={errors.email} />
          <Field label="Phone number" required type="tel" autoComplete="tel" placeholder="08012345678" value={form.phone} onChange={set("phone")} error={errors.phone} />
          <div>
            <span className="text-xs font-bold">Gender<span className="text-accent"> *</span></span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["male", "female", "others"] as const).map((g) => (
                <button key={g} type="button" onClick={() => setForm((f) => ({ ...f, gender: g }))} aria-pressed={form.gender === g}
                  className={`h-12 rounded-xl border text-sm font-semibold capitalize transition ${form.gender === g ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-accent"}`}>{g}</button>
              ))}
            </div>
            {errors.gender && <span className="mt-1.5 block text-xs text-destructive">{errors.gender}</span>}
          </div>
          <Field label="Date of birth" required type="date" max={new Date().toISOString().slice(0, 10)} value={form.dateOfBirth} onChange={set("dateOfBirth")} error={errors.dateOfBirth} />
        </Section>

        <Section n="02" title="Address" optional>
          <Field className="sm:col-span-2" label="Street" autoComplete="street-address" placeholder="12 Admiralty Way" value={form.street} onChange={set("street")} />
          <Field label="City" autoComplete="address-level2" placeholder="Lekki" value={form.city} onChange={set("city")} />
          <Field label="State" autoComplete="address-level1" placeholder="Lagos" value={form.state} onChange={set("state")} />
          <Field className="sm:col-span-2" label="Country" autoComplete="country-name" placeholder="Nigeria" value={form.country} onChange={set("country")} />
        </Section>

        <Section n="03" title="Secure your account">
          <Field className="sm:col-span-2" label="Password" required type="password" autoComplete="new-password" maxLength={128} placeholder="At least 8 characters" value={form.password} onChange={set("password")} error={errors.password} hint="Use uppercase, lowercase and a number." />
        </Section>

        <SubmitButton loading={loading}>Create account <ArrowRight className="size-4" /></SubmitButton>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-semibold text-accent hover:underline">Sign in</Link></p>
      </form>
    </AuthShell>
  );
}

function Section({ n, title, optional, children }: { n: string; title: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-border bg-card/70 p-5 shadow-soft sm:p-6">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-lg bg-accent-soft font-display text-xs font-bold text-accent">{n}</span>
        <h2 className="font-display text-base font-bold">{title}</h2>
        {optional && <span className="ml-auto text-xs text-muted-foreground">Optional</span>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
