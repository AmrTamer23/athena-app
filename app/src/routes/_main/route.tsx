import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/services/auth";

export const Route = createFileRoute("/_main")({
  beforeLoad: async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        throw redirect({
          to: "/login",
          search: {
            verified: "",
            message: ""
          }
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("redirect")) {
        throw error;
      }
      throw redirect({
        to: "/login",
        search: {
          verified: "",
          message: ""
        }
      });
    }
  },
  component: Page,
});

import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
          </div>
          {/* <div className="flex gap-3 ml-auto">
            <FeedbackDialog />
            <UserDropdown />
          </div> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:gap-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
