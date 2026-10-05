import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { AuthShell, EMAIL_RE, Field, PASSWORD_MSG, PASSWORD_RE, SubmitButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — PROVEN" },
      { name: "description", content: "Reset your PROVEN password in three quick steps: email, verification code, new password." },
      { property: "og:title", content: "Reset your password — PROVEN" },
      { property: "og:description", content: "Regain access to your PROVEN portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPasswordPage,
});

const steps = ["Email", "Verify", "New password"];
const copy = [
  { title: "Forgot your password?", sub: "Enter the email on your account and we'll send you a 6-digit verification code." },
  { title: "Check your inbox.", sub: "Enter the 6-digit code we sent to your email." },
  { title: "Choose a new password.", sub: "Make it strong — this protects your portfolio and evidence." },
];

function ForgotPasswordPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"email" | "code" | "pw" | "confirm" | "password", string>>>({});
  const [loading, setLoading] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const proceed = (next: () => void) => { setLoading(true); setTimeout(() => { setLoading(false); next(); }, 700); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<"email" | "code" | "pw" | "confirm" | "password", string>> = {};
    if (step === 0 && !EMAIL_RE.test(email.trim().toLowerCase())) err.email = "Please enter a valid email address, e.g. user@example.com";
    if (step === 1 && code.join("").length !== 6) err.code = "Enter all 6 digits of your code";
    if (step === 2) {
      if (!PASSWORD_RE.test(pw)) err.pw = PASSWORD_MSG;
      if (confirm !== pw) err.confirm = "Passwords do not match";
    }
    setErrors(err);
    if (Object.keys(err).length) return;
    proceed(() => (step < 2 ? setStep(step + 1) : setDone(true)));
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "");
    if (d.length > 1) {
      const arr = d.slice(0, 6).split("");
      setCode([...arr, ...Array(6 - arr.length).fill("")]);
      refs.current[Math.min(arr.length, 5)]?.focus();
      return;
    }
    const next = [...code]; next[i] = d; setCode(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  if (done) {
    return (
      <AuthShell eyebrow="All set" title="Password updated." subtitle="Your new password is ready. Sign in to continue building your portfolio.">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="size-5 stroke-[3]" /></span>
          <p className="text-sm">Your account <span className="font-semibold">{email}</span> is secured.</p>
        </div>
        <Link to="/login" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-accent transition hover:-translate-y-0.5">Back to sign in <ArrowRight className="size-4" /></Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow={`Step ${step + 1} of 3`} title={copy[step]!.title} subtitle={copy[step]!.sub}>
      <ol className="mb-8 grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <li key={s}>
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-accent" : "bg-border"}`} />
            <p className={`mt-2 text-xs font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
          </li>
        ))}
      </ol>
      <form onSubmit={submit} noValidate className="space-y-5">
        {step === 0 && (
          <Field label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        )}
        {step === 1 && (
          <div>
            <p className="text-xs text-muted-foreground">Sent to <span className="font-semibold text-foreground">{email}</span></p>
            <div className="mt-3 flex gap-2 sm:gap-3">
              {code.map((d, i) => (
                <input key={i} ref={(el) => { refs.current[i] = el; }} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} aria-label={`Digit ${i + 1}`} value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus(); }}
                  className={`h-14 w-full min-w-0 rounded-xl border bg-card text-center font-display text-xl font-bold shadow-soft outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 ${errors.code ? "border-destructive" : "border-input"}`} />
              ))}
            </div>
            {errors.code && <p className="mt-1.5 text-xs text-destructive">{errors.code}</p>}
            <button type="button" className="mt-3 text-xs font-semibold text-accent hover:underline" onClick={() => setCode(Array(6).fill(""))}>Didn't get it? Resend code</button>
          </div>
        )}
        {step === 2 && (
          <>
            <Field label="New password" type="password" autoComplete="new-password" maxLength={128} placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} error={errors.pw} hint="Use uppercase, lowercase and a number." />
            <Field label="Confirm new password" type="password" autoComplete="new-password" placeholder="Repeat your new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
          </>
        )}
        <SubmitButton loading={loading}>{["Send code", "Verify code", "Reset password"][step]} <ArrowRight className="size-4" /></SubmitButton>
        <div className="flex justify-between text-sm">
          {step > 0 ? <button type="button" onClick={() => { setErrors({}); setStep(step - 1); }} className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back</button> : <span />}
          <Link to="/login" className="font-semibold text-accent hover:underline">Back to sign in</Link>
        </div>
      </form>
    </AuthShell>
  );
}
