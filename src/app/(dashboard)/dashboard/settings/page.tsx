import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import PlayerConfigForm from "@/components/player-config-form";
import ThemeSelectorForm from "@/components/theme-selector-form";
import UserConfigForm from "@/components/user-config-form";
import { authOptions } from "@/lib/auth";
import { getPlayerConfig } from "@/lib/user";
import { Session, getServerSession } from "next-auth";
import { cookies } from "next/headers";

export default async function SettingsPage() {
  const { config } = await getPlayerConfig(cookies());
  const session = await getServerSession(authOptions);

  return (
    <div>
      <DashboardHeader
        title="Settings"
        subheading="Change your player configuration and theme"
      />
      <DashboardContent>
        <UserConfigForm session={session as Session} />
        <PlayerConfigForm config={config} />
        <ThemeSelectorForm />
      </DashboardContent>
    </div>
  );
}
