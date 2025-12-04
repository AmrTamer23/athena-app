import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: Page,
});

import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import UserDropdown from "@/components/user-dropdown";
// import FeedbackDialog from "@/components/feedback-dialog";
// import ContactsTable from "@/components/contacts-table";
import { RiScanLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
// import { StatsGrid } from "@/components/stats-grid";

function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          {/* <div className="flex gap-3 ml-auto">
            <FeedbackDialog />
            <UserDropdown />
          </div> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
