"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Code,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  PieChart,
  FileQuestion,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  userRole: "student" | "trainer" | "admin"
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname()

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/dashboard/${userRole}`,
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        href: `/dashboard/${userRole}/profile`,
        icon: User,
      },
      {
        title: "Settings",
        href: `/dashboard/${userRole}/settings`,
        icon: Settings,
      },
    ]

    const roleSpecificItems = {
      student: [
        {
          title: "My Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
        },
        {
          title: "Coding Practice",
          href: `/dashboard/${userRole}/coding`,
          icon: Code,
        },
        {
          title: "Study Materials",
          href: `/dashboard/${userRole}/materials`,
          icon: FileText,
        },
        {
          title: "Assessments",
          href: `/dashboard/${userRole}/assessments`,
          icon: FileQuestion,
        },
      ],
      trainer: [
        {
          title: "Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
        },
        {
          title: "Students",
          href: `/dashboard/${userRole}/students`,
          icon: Users,
        },
        {
          title: "Assessments",
          href: `/dashboard/${userRole}/assessments`,
          icon: FileQuestion,
        },
        {
          title: "Reports",
          href: `/dashboard/${userRole}/reports`,
          icon: PieChart,
        },
      ],
      admin: [
        {
          title: "Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
        },
        {
          title: "Trainers",
          href: `/dashboard/${userRole}/trainers`,
          icon: Users,
        },
        {
          title: "Students",
          href: `/dashboard/${userRole}/students`,
          icon: Users,
        },
        {
          title: "Reports",
          href: `/dashboard/${userRole}/reports`,
          icon: PieChart,
        },
      ],
    }

    return [...baseItems, ...roleSpecificItems[userRole]]
  }

  const navItems = getNavItems()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-6 w-6" />
              <span>Placement Prep LMS</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>{userRole === "student" ? "ST" : userRole === "trainer" ? "TR" : "AD"}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <div className="font-medium">
                  {userRole === "student" ? "John Doe" : userRole === "trainer" ? "Jane Smith" : "Admin User"}
                </div>
                <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
              </div>
              <Button variant="ghost" size="icon" asChild className="ml-auto">
                <Link href="/login">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold capitalize">{userRole} Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
