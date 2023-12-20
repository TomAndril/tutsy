import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import PlayerConfigForm from "@/components/player-config-form";
import ThemeSelectorForm from "@/components/theme-selector-form";
import { getUserConfiguration } from "@/lib/user";
import { cookies } from "next/headers";

export default async function SettingsPage() {
  const { config } = await getUserConfiguration(cookies());

  return (
    <div>
      <DashboardHeader
        title="Settings"
        subheading="Change your player configuration and theme"
      />
      <DashboardContent>
        <PlayerConfigForm config={config} />
        <ThemeSelectorForm />
      </DashboardContent>
    </div>
  );
}
