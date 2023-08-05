import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import ThemeSelectorForm from "@/components/theme-selector-form";

export default function SettingsPage() {
  return (
    <div>
      <DashboardHeader
        title="Settings"
        subheading="Change your account settings"
      />
      <DashboardContent>
        <ThemeSelectorForm />
      </DashboardContent>
    </div>
  );
}
