"use client";

import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";
import { LoginForm } from "./components/LoginForm";
import { Sidebar } from "./components/Sidebar";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
