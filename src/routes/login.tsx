import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — HCTS" },
      { name: "description", content: "Sign in to the Harvest Control & Traceability System." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@hcts.agro");
  const [password, setPassword] = useState("demo1234");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email);
      toast.success("Welcome back");
      navigate({ to: "/dashboard" });
    }, 500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_140)] via-background to-[oklch(0.93_0.04_125)]">
      {/* Decorative agriculture background */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="leaves" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 10 C 55 25, 55 45, 40 60 C 25 45, 25 25, 40 10 Z" fill="oklch(0.35 0.10 148)" />
            <line x1="40" y1="14" x2="40" y2="58" stroke="oklch(0.25 0.06 148)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaves)" />
      </svg>
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          {/* Brand panel */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-glow to-primary shadow-elegant">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avocado Harvest</p>
                <p className="text-lg font-semibold text-foreground">HCTS Platform</p>
              </div>
            </div>
            <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight text-foreground">
              Harvest Control &amp;<br />
              <span className="text-primary">Traceability System</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Enterprise-grade operations for avocado harvesting — from campaign planning and
              field assignments to QR traceability and dispatch logistics.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { v: "2.4M", l: "QR Generated" },
                { v: "184", l: "Active Farms" },
                { v: "99.7%", l: "Traceability" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-semibold text-foreground tabular-nums">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Login card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/40 bg-white/60 p-8 shadow-elegant backdrop-blur-xl sm:p-10">
              <div className="lg:hidden mb-6 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-glow to-primary shadow-md">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-base font-semibold">HCTS</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to your operations dashboard
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="h-11 pl-9 bg-background/80"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => toast.info("Password reset link sent (demo).")}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 pl-9 pr-10 bg-background/80"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(Boolean(v))}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" disabled={loading} className="mt-2 h-11 w-full gap-1.5 text-sm font-medium">
                  {loading ? "Signing in..." : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Protected enterprise access. By signing in you agree to the{" "}
                <a className="text-primary hover:underline" href="#">terms</a> and{" "}
                <a className="text-primary hover:underline" href="#">privacy policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
