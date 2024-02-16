import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import DashboardAside from "@/components/dashboard-aside";
import Navbar from "@/components/navbar";
import { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Tutsy / Videos",
  description: "Tutsy videos dashboard",
};

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
        <div className="mt-8 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <DashboardAside />
          {children}
        </div>
      </div>
    </main>
  );
}
