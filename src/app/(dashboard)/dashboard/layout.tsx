import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import DashboardAside from "@/components/dashboard-aside";
import Navbar from "@/components/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getCurrentUser();

  if (!session) {
    return redirect("api/auth/signin");
  }

  return (
    <main className="bg-main-gradient">
      <Navbar borderBottom />
      <div className="container">
        <div className="grid flex-1 md:grid-cols-[200px_1fr] mt-8 gap-12">
          <DashboardAside />
          {children}
        </div>
      </div>
    </main>
  );
}
