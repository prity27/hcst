import { Bell, Search, LogOut, User as UserIcon, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sidebarGroups } from "./AppSidebar";
import { getAuthUser, signOut } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/roles";

function useBreadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items: { label: string; url: string }[] = [{ label: "Home", url: "/dashboard" }];
  for (const g of sidebarGroups) {
    for (const it of g.items) {
      if (pathname === it.url || pathname.startsWith(it.url + "/")) {
        if (g.label !== "Overview") items.push({ label: g.label, url: it.url });
        items.push({ label: it.title, url: it.url });
        return items;
      }
    }
  }
  return items;
}

export function TopBar() {
  const navigate = useNavigate();
  const user = typeof window !== "undefined" ? getAuthUser() : null;
  const initials = (user?.name ?? "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const crumbs = useBreadcrumbs();

  const handleLogout = () => {
    signOut();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-6" />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => (
          <span key={c.url + i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/50">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-foreground">{c.label}</span>
            ) : (
              <Link to={c.url} className="text-muted-foreground hover:text-foreground transition-colors">
                {c.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, farms, QR..."
            className="h-9 w-72 pl-9 bg-background"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>
              <Badge variant="secondary" className="text-[10px]">3 new</Badge>
            </div>
            <div className="max-h-80 overflow-auto">
              {[
                { t: "Dispatch DN-0014 approved", d: "Maria Lopez · 2 min ago" },
                { t: "QR series HCTS-2026-0019 ready", d: "QR module · 18 min ago" },
                { t: "Plot P011 flagged for inspection", d: "Field · 1 hr ago" },
              ].map((n, i) => (
                <div key={i} className="flex gap-3 border-b px-4 py-3 last:border-0 hover:bg-muted/50">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{n.t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-2">
              <Button variant="ghost" size="sm" className="w-full">View all</Button>
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-1.5 py-1 hover:bg-muted transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium leading-tight">{user?.name ?? "User"}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">{user?.email ?? ""}</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <SettingsIcon className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
