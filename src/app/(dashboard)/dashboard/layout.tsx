import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import DashboardAside from "@/components/dashboard-aside";
import Navbar from "@/components/navbar";

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

  return (
    <>
      <Navbar borderBottom />
      <div className="container">
        <div className="grid flex-1 md:grid-cols-[200px_1fr] mt-8 gap-12">
          <DashboardAside />
          {children}
        </div>
      </div>
    </>
  );
}
