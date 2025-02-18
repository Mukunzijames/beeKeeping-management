'use client';

import { 
  LayoutGrid, 
  ShoppingBag, 
  MessageSquare, 
  ClipboardList, 
  Calendar, 
  Activity,
  BarChart2,
  MessageCircle,
  Settings,
  LogOut
} from "lucide-react"
import { Switch } from "@/components/ui/switch"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const overviewItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutGrid,
  },
  {
    title: "Colony",
    url: "#",
    icon: ShoppingBag,
  },
  {
    title: "Equipment",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "feeds",
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Sales",
    url: "#",
    icon: Activity,
  },
  {
    title: "Statistics",
    url: "#",
    icon: BarChart2,
  },
  {
    title: "Disease",
    url: "#",
    icon: BarChart2,
  },
  {
    title: "Honey",
    url: "#",
    icon: BarChart2,
  },

  
]

const accountItems = [
  {
    title: "Chat",
    url: "#",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Log out",
    url: "#",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="flex flex-col justify-between h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs text-muted-foreground">OVERVIEW</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-4 py-2 hover:bg-accent/50 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-xs text-muted-foreground">ACCOUNT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-4 py-2 hover:bg-accent/50 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 flex items-center gap-2">
        <Switch />
        <span className="text-sm">Dark Mode</span>
      </div>
    </Sidebar>
  )
}
