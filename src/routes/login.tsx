import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn, requestPasswordReset } from "@/lib/auth";
import { defaultLandingForRole } from "@/lib/roles";
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

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = signIn(email, password);
      toast.success(`Welcome back, ${user.name}`);
      navigate({ to: defaultLandingForRole(user.role) });
    }, 400);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { toast.error("Enter your work email."); return; }
    setForgotLoading(true);
    setTimeout(() => {
      requestPasswordReset(forgotEmail);
      setForgotSent(true);
      setForgotLoading(false);
      toast.success("Password reset email sent");
    }, 600);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_140)] via-background to-[oklch(0.93_0.04_125)]">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
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
              Accounts are provisioned by your System Administrator. Contact your admin if you need access.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-elegant backdrop-blur-xl sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Sign in</h2>
              <p className="mt-1 text-sm text-muted-foreground">Access your operations dashboard</p>
              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="h-11 pl-9 bg-background/80" autoComplete="email" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" onClick={() => { setForgotEmail(email); setForgotSent(false); setForgotOpen(true); }} className="text-xs font-medium text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 pl-9 pr-10 bg-background/80" autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground" aria-label={showPass ? "Hide password" : "Show password"}>
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Remember me for 30 days</Label>
                </div>
                <Button type="submit" disabled={loading} className="mt-2 h-11 w-full gap-1.5 text-sm font-medium">
                  {loading ? "Signing in..." : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
                </Button>
              </form>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Need access? Contact your System Administrator.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {forgotSent ? "We've sent password reset instructions to your inbox." : "Enter your work email and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          {!forgotSent ? (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="forgot-email">Work email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="forgot-email" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="name@company.com" className="h-11 pl-9" autoFocus />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={forgotLoading}>{forgotLoading ? "Sending..." : "Send reset link"}</Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                Check <span className="font-semibold">{forgotEmail}</span> for a reset link.
              </div>
              <DialogFooter>
                <Button onClick={() => setForgotOpen(false)} className="w-full">Back to sign in</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
