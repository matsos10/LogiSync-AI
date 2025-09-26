import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlanCard } from "@/components/settings/SubscriptionPlanCard";
import { BillingHistory } from "@/components/settings/BillingHistory";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
export function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const handleSaveChanges = () => {
    toast.success("Profile updated successfully!");
  };
  return (
    <DashboardLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} readOnly />
                </div>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscription">
            <SubscriptionPlanCard />
          </TabsContent>
          <TabsContent value="billing">
            <BillingHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}