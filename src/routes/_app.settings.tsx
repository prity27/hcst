import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf } from "lucide-react";
import { toast } from "sonner";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — HCTS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage company profile, user preferences and system configuration" />
      <div className="p-6">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="preferences">User Preferences</TabsTrigger>
            <TabsTrigger value="system">System Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="max-w-3xl border-border p-6 shadow-card gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-glow to-primary shadow-elegant">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Hacienda Verde Agro S.A.</h3>
                  <p className="text-sm text-muted-foreground">Avocado producer & exporter</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Change logo</Button>
              </div>
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved (demo)."); }}
              >
                <Field label="Company name" defaultValue="Hacienda Verde Agro S.A." />
                <Field label="Tax ID" defaultValue="MX-AGRO-2026-001" />
                <Field label="Email" type="email" defaultValue="ops@hcts.agro" />
                <Field label="Phone" defaultValue="+52 55 4321-9870" />
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Address</Label>
                  <Textarea defaultValue="Av. del Campo 1840, Uruapan, Michoacán, México" rows={2} />
                </div>
                <Field label="Country" defaultValue="Mexico" />
                <Field label="Currency" defaultValue="MXN" />
                <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                  <Button variant="outline" type="reset">Cancel</Button>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="max-w-3xl border-border p-6 shadow-card gap-5">
              <div className="space-y-1.5">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Time zone</Label>
                <Select defaultValue="cdmx">
                  <SelectTrigger className="max-w-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdmx">America/Mexico_City</SelectItem>
                    <SelectItem value="lima">America/Lima</SelectItem>
                    <SelectItem value="bogota">America/Bogota</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Preferences saved (demo).")}>Save preferences</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="max-w-3xl border-border p-6 shadow-card gap-5">
              <p className="text-sm text-muted-foreground">
                WBS-scoped system configuration. Additional options (QR prefix, backup, maintenance mode,
                2FA enforcement, audit retention) are pending PM approval.
              </p>
              <Field label="Estimated pallet weight (kg)" type="number" defaultValue="480" />
              <Field label="Offline timeout (minutes)" type="number" defaultValue="30" />

              <ClarifyNote>
                The following legacy options were removed pending PM confirmation: QR Prefix, Backup frequency,
                Maintenance mode, Two-factor authentication toggle, Audit log retention window.
              </ClarifyNote>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("System config saved (demo).")}>Save configuration</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
