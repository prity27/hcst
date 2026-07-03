import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, User as UserIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signIn, signUp, requestPasswordReset } from "@/lib/auth";
import { ROLE_LABELS, ROLE_DESCRIPTIONS, defaultLandingForRole, type Role } from "@/lib/roles";
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

const ROLES: Role[] = ["admin", "ops_director", "field_engineer", "admin_team", "reporting", "read_only"];

function LoginPage() {
  const navigate = useNavigate();

  // sign in
  const [email, setEmail] = useState("admin@hcts.agro");
  const [password, setPassword] = useState("demo1234");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  // sign up
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suRole, setSuRole] = useState<Role>("field_engineer");
  const [suLoading, setSuLoading] = useState(false);

  // forgot password
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

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suName || !suEmail || !suPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (suPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setSuLoading(true);
    setTimeout(() => {
      const user = signUp({ name: suName, email: suEmail, password: suPassword, role: suRole });
      toast.success(`Account created — signed in as ${ROLE_LABELS[user.role]}`);
      navigate({ to: defaultLandingForRole(user.role) });
    }, 500);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Enter your work email.");
      return;
    }
    setForgotLoading(true);
    setTimeout(() => {
      requestPasswordReset(forgotEmail);
      setForgotSent(true);
      setForgotLoading(false);
      toast.success("Password reset email sent");
    }, 600);
  };

  const openForgot = () => {
    setForgotEmail(email);
    setForgotSent(false);
    setForgotOpen(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[oklch(0.97_0.02_140)] via-background to-[oklch(0.93_0.04_125)]">
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

          {/* Auth card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-elegant backdrop-blur-xl sm:p-8">
              <div className="lg:hidden mb-6 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-glow to-primary shadow-md">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-base font-semibold">HCTS</span>
              </div>

              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Create account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">Welcome back</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to your operations dashboard
                  </p>
                  <form onSubmit={handleSignIn} className="mt-6 space-y-4">
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
                          onClick={openForgot}
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
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">Create your account</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Request access to the HCTS platform
                  </p>
                  <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="su-name">Full name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="su-name"
                          value={suName}
                          onChange={(e) => setSuName(e.target.value)}
                          placeholder="Jane Doe"
                          className="h-11 pl-9 bg-background/80"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="su-email">Work email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="su-email"
                          type="email"
                          value={suEmail}
                          onChange={(e) => setSuEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="h-11 pl-9 bg-background/80"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="su-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="su-password"
                          type="password"
                          value={suPassword}
                          onChange={(e) => setSuPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          className="h-11 pl-9 bg-background/80"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="su-role">Role</Label>
                      <Select value={suRole} onValueChange={(v) => setSuRole(v as Role)}>
                        <SelectTrigger id="su-role" className="h-11 bg-background/80">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r}>
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                <span className="font-medium">{ROLE_LABELS[r]}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[suRole]}</p>
                    </div>

                    <Button type="submit" disabled={suLoading} className="mt-2 h-11 w-full gap-1.5 text-sm font-medium">
                      {suLoading ? "Creating account..." : (<>Create account <ArrowRight className="h-4 w-4" /></>)}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Protected enterprise access. By continuing you agree to the{" "}
                <a className="text-primary hover:underline" href="#">terms</a> and{" "}
                <a className="text-primary hover:underline" href="#">privacy policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot password dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {forgotSent
                ? "We've sent password reset instructions to your inbox."
                : "Enter your work email and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>

          {!forgotSent ? (
            <form onSubmit={handleForgot} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="forgot-email">Work email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-11 pl-9"
                    autoFocus
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={forgotLoading}>
                  {forgotLoading ? "Sending..." : "Send reset link"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-foreground">
                  Check <span className="font-semibold">{forgotEmail}</span> for an email from{" "}
                  <span className="font-medium">no-reply@hcts.agro</span>. The reset link expires in 30 minutes.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Didn't receive it? Check your spam folder or contact your system administrator.
                </p>
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
