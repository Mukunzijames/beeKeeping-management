"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UserButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <nav className="w-full h-16 border-b flex items-center justify-between px-4 bg-white">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <OrganizationSwitcher />
              <UserButton />
            </div>
          </nav>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
