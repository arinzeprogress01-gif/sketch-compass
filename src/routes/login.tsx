import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AuthShell, EMAIL_RE, Field, SubmitButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PROVEN" },
      { name: "description", content: "Sign in to PROVEN to manage your evidence-backed professional portfolio." },
      { property: "og:title", content: "Sign in — PROVEN" },
      { property: "og:description", content: "Return to your professional portfolio on PROVEN." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"email" | "code" | "pw" | "confirm" | "password", string>>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<"email" | "code" | "pw" | "confirm" | "password", string>> = {};
    if (!EMAIL_RE.test(email.trim().toLowerCase())) next.email = "Please enter a valid email address, e.g. user@example.com";
    if (!password) next.password = "Please enter your password";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to your portfolio." subtitle="Pick up where you left off — your story and the proof behind it are waiting.">
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <div>
          <Field label="Password" type="password" autoComplete="current-password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          <Link to="/forgot-password" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">Forgot password?</Link>
        </div>
        <SubmitButton loading={loading}>Sign in <ArrowRight className="size-4" /></SubmitButton>
        <p className="text-center text-sm text-muted-foreground">New to PROVEN? <Link to="/register" className="font-semibold text-accent hover:underline">Create an account</Link></p>
      </form>
    </AuthShell>
  );
}
