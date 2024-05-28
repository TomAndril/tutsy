import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import PlayerConfigForm from "@/components/player-config-form";
import ThemeSelectorForm from "@/components/theme-selector-form";
import { auth } from "@/lib/auth";
import { getPlayerConfig } from "@/lib/user";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tutsy / Settings",
  description: "Customize your experience",
};

export default async function SettingsPage() {
  const { config } = await getPlayerConfig(cookies());

  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <DashboardHeader
        title="Settings"
        subheading="Customize your experience"
      />
      <DashboardContent>
        <PlayerConfigForm config={config} />
        <ThemeSelectorForm />
      </DashboardContent>
    </div>
  );
}
