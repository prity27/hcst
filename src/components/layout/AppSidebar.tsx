import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Megaphone,
  Database,
  MapPin,
  Layers,
  Droplets,
  Trees,
  Sprout,
  Building2,
  UserCog,
  Briefcase,
  Truck,
  Tractor,
  Wrench,
  ShoppingCart,
  Warehouse,
  QrCode,
  ScanLine,
  ClipboardList,
  Eye,
  FileText,
  ArrowRightLeft,
  BarChart3,
  TrendingUp,
  GitCompare,
  Network,
  PackageCheck,
  History,
  Settings,
  Leaf,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

type Item = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };
type Group = { label: string; items: Item[]; collapsible?: boolean };

const groups: Group[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "User Management",
    collapsible: true,
    items: [
      { title: "Users", url: "/users", icon: Users },
      { title: "Roles & Permissions", url: "/roles", icon: ShieldCheck },
    ],
  },
  {
    label: "Campaign Management",
    items: [{ title: "Campaigns", url: "/campaigns", icon: Megaphone }],
  },
  {
    label: "Master Data",
    collapsible: true,
    items: [
      { title: "Farms", url: "/farms", icon: MapPin },
      { title: "Plots", url: "/plots", icon: Layers },
      { title: "Valves", url: "/valves", icon: Droplets },
      { title: "Parks", url: "/parks", icon: Trees },
      { title: "Varieties", url: "/varieties", icon: Sprout },
      { title: "Employment Companies", url: "/employment-companies", icon: Building2 },
      { title: "Workers", url: "/workers", icon: UserCog },
      { title: "Satellite Roles", url: "/satellite-roles", icon: Briefcase },
      { title: "Machines", url: "/machines", icon: Tractor },
      { title: "Machine Operators", url: "/machine-operators", icon: Wrench },
      { title: "Buyers", url: "/buyers", icon: ShoppingCart },
      { title: "Destination Centers", url: "/destination-centers", icon: Warehouse },
      { title: "Transport Providers", url: "/transport-providers", icon: Truck },
    ],
  },
  {
    label: "QR Management",
    collapsible: true,
    items: [
      { title: "QR Series", url: "/qr-series", icon: QrCode },
      { title: "QR Inventory", url: "/qr-inventory", icon: ScanLine },
    ],
  },
  {
    label: "Operations",
    collapsible: true,
    items: [
      { title: "Harvest Assignments", url: "/harvest-assignments", icon: ClipboardList },
      { title: "Collection Monitoring", url: "/collection-monitoring", icon: Eye },
      { title: "Dispatch Notes", url: "/dispatch-notes", icon: FileText },
      { title: "Transfer Orders", url: "/transfer-orders", icon: ArrowRightLeft },
    ],
  },
  {
    label: "Reports",
    collapsible: true,
    items: [
      { title: "Harvest Reports", url: "/reports/harvest", icon: BarChart3 },
      { title: "Worker Productivity", url: "/reports/productivity", icon: TrendingUp },
      { title: "Forecast vs Actual", url: "/reports/forecast", icon: GitCompare },
      { title: "Traceability Reports", url: "/reports/traceability", icon: Network },
      { title: "Dispatch Reports", url: "/reports/dispatch", icon: PackageCheck },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Audit Logs", url: "/audit-logs", icon: History },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-glow to-primary shadow-md">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-sidebar-foreground">HCTS</span>
              <span className="text-[11px] text-sidebar-foreground/60">Harvest Control</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {groups.map((group) => {
          const groupActive = group.items.some((i) => isActive(i.url));
          if (group.collapsible && !collapsed) {
            return (
              <Collapsible
                key={group.label}
                defaultOpen={groupActive}
                className="group/collapsible"
              >
                <SidebarGroup className="py-1">
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="cursor-pointer hover:text-sidebar-foreground">
                      {group.label}
                      <ChevronDown className="ml-auto h-3.5 w-3.5 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                              <Link to={item.url}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          }
          return (
            <SidebarGroup key={group.label} className="py-1">
              {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

export { groups as sidebarGroups };
