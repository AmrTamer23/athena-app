import * as React from "react";

// import { SearchForm } from "@/components/search-form";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  RiScanLine,
  RiBardLine,
  RiUserFollowLine,
  RiCodeSSlashLine,
  RiLoginCircleLine,
  RiLayoutLeftLine,
  RiSettings3Line,
  RiLeafLine,
  RiMailLine,
  RiLogoutBoxLine,
  RiGroupLine,
} from "@remixicon/react";
import { useLocation } from "@tanstack/react-router";

// This is sample data.
const data = {
  teams: [
    {
      name: "InnovaCraft",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Acme Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
    {
      name: "Evil Corp.",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
  ],
  navMain: [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: RiScanLine,
        },
        // {
        //   title: "Insights",
        //   url: "#",
        //   icon: RiBardLine,
        // },
        // {
        //   title: "Contacts",
        //   url: "#",
        //   icon: RiUserFollowLine,
        //   isActive: true,
        // },
        // {
        //   title: "Tools",
        //   url: "#",
        //   icon: RiCodeSSlashLine,
        // },
        // {
        //   title: "Integration",
        //   url: "#",
        //   icon: RiLoginCircleLine,
        // },
        // {
        //   title: "Layouts",
        //   url: "#",
        //   icon: RiLayoutLeftLine,
        // },
        // {
        //   title: "Reports",
        //   url: "#",
        //   icon: RiLeafLine,
        // },
      ],
    },
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Invite Employees",
          url: "/invite",
          icon: RiMailLine,
        },
        {
          title: "Squads",
          url: "/squads",
          icon: RiGroupLine,
        },
        // {
        //   title: "Help Center",
        //   url: "#",
        //   icon: RiLeafLine,
        // },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center gap-2">
        <img
          src="/athena.avif"
          alt="Logo"
          className="w-14 h-14 object-cover rounded-full"
        />
        <h1 className="text-2xl font-bold font-serif italic mt-2">Athena HQ</h1>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                      isActive={location.pathname === item.url}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              <RiLogoutBoxLine
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
                aria-hidden="true"
              />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
