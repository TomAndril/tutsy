import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import DashboardAside from "@/components/dashboard-aside";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

async function getUserSession() {
  const session = await getCurrentUser();

  if (session) {
    return session;
  }

  return null;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getUserSession();

  if (!session) {
    return redirect("api/auth/signin");
  }

  return <div className="container">{children}</div>;
}
