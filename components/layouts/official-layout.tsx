"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Home,
  Map,
  AlertTriangle,
  Settings,
  LogOut,
  User,
  BarChart4,
  FileText,
  Users,
  ShieldAlert,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export function OfficialLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [notifications, setNotifications] = useState(12)

  const navigation = [
    { name: "Dashboard", href: "/official/dashboard", icon: Home },
    { name: "Hazard Reports", href: "/official/reports", icon: AlertTriangle },
    { name: "Analytics", href: "/official/analytics", icon: BarChart4 },
    { name: "Map View", href: "/official/map", icon: Map },
    { name: "Action Plans", href: "/official/action-plans", icon: FileText },
    { name: "Team", href: "/official/team", icon: Users },
    { name: "Emergency", href: "/official/emergency", icon: ShieldAlert },
    { name: "Settings", href: "/official/settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary">RoadSafe</span>
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-1 py-0.5 rounded">OFFICIAL</span>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.slice(0, 4).map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.slice(4).map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/logout">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="bg-background border-b h-14 flex items-center px-4">
            <SidebarTrigger />
            <div className="flex items-center ml-auto">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-muted/20">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

