import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { toast } from "sonner";
import { ClarifyBanner } from "@/components/common/ClarifyBanner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — HCTS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage company profile and system configuration" />
      <div className="p-6">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
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
                  <p className="text-sm text-muted-foreground">Avocado producer &amp; exporter</p>
                </div>
              </div>
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved."); }}>
                <Field label="Company name" defaultValue="Hacienda Verde Agro S.A." />
                <Field label="Tax ID" defaultValue="MX-AGRO-2026-001" />
                <Field label="Email" type="email" defaultValue="ops@hcts.agro" />
                <Field label="Phone" defaultValue="+52 55 4321-9870" />
                <div className="sm:col-span-2 space-y-1.5">
                  <Label>Address</Label>
                  <Textarea defaultValue="Av. del Campo 1840, Uruapan, Michoacán, México" rows={2} />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                  <Button variant="outline" type="reset">Cancel</Button>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="max-w-3xl border-border p-6 shadow-card gap-5">
              <Field label="Estimated pallet weight (kg)" type="number" defaultValue="480" />
              <Field label="Offline timeout (minutes)" type="number" defaultValue="30" />
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("System config saved.")}>Save configuration</Button>
              </div>
            </Card>
            <div className="mt-4 max-w-3xl">
              <ClarifyBanner
                title="Pending PM approval"
                items={[
                  "QR Prefix — not in WBS. Awaiting confirmation before re-enabling.",
                  "Backup frequency — not in WBS.",
                  "Two-factor authentication policy — not in WBS.",
                  "Audit log retention — not in WBS.",
                  "Maintenance mode toggle — not in WBS.",
                ]}
              />
            </div>
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
