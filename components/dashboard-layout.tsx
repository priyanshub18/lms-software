"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, FileText, LayoutDashboard, LogOut, Settings, Users, PieChart, FileQuestion, User, Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "trainer" | "admin";
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");

    // Check for mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/dashboard/${userRole}`,
        icon: LayoutDashboard,
        notification: 0,
      },
      {
        title: "Profile",
        href: `/dashboard/${userRole}/profile`,
        icon: User,
        notification: 0,
      },
      {
        title: "Settings",
        href: `/dashboard/${userRole}/settings`,
        icon: Settings,
        notification: 0,
      },
    ];

    const roleSpecificItems = {
      student: [
        {
          title: "My Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
          notification: 2,
        },
        {
          title: "Coding Practice",
          href: `/dashboard/${userRole}/coding`,
          icon: Code,
          notification: 0,
        },
        {
          title: "Study Materials",
          href: `/dashboard/${userRole}/materials`,
          icon: FileText,
          notification: 1,
        },
        {
          title: "Assessments",
          href: `/dashboard/${userRole}/assessments`,
          icon: FileQuestion,
          notification: 0,
        },
      ],
      trainer: [
        {
          title: "Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
          notification: 0,
        },
        {
          title: "Students",
          href: `/dashboard/${userRole}/students`,
          icon: Users,
          notification: 3,
        },
        {
          title: "Assessments",
          href: `/dashboard/${userRole}/assessments`,
          icon: FileQuestion,
          notification: 0,
        },
        {
          title: "Attendance",
          href: `/dashboard/${userRole}/attendence`,
          icon: PieChart,
          notification: 0,
        },
      ],
      admin: [
        {
          title: "Courses",
          href: `/dashboard/${userRole}/courses`,
          icon: BookOpen,
          notification: 0,
        },
        {
          title: "Trainers",
          href: `/dashboard/${userRole}/trainers`,
          icon: Users,
          notification: 1,
        },
        {
          title: "Students",
          href: `/dashboard/${userRole}/students`,
          icon: Users,
          notification: 2,
        },
        {
          title: "Reports",
          href: `/dashboard/${userRole}/reports`,
          icon: PieChart,
          notification: 0,
        },
      ],
    };

    return [...baseItems, ...roleSpecificItems[userRole]];
  };

  const navItems = getNavItems();

  return (
    <div className='flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100'>
      <SidebarProvider>
        <Sidebar className='border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full'>
          <SidebarHeader className='flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-4'>
            <Link href='/' className='flex items-center gap-2 font-bold'>
              <BookOpen className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              <span className='text-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text'>PrepLMS</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className='px-2 py-4'>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild className={cn("relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all", pathname === item.href ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 dark:from-blue-500/20 dark:to-indigo-500/20 text-blue-700 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-800")} isActive={pathname === item.href}>
                          <Link href={item.href} className='flex items-center gap-3 w-full'>
                            <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400")} />
                            <span>{item.title}</span>
                            {item.notification > 0 && <Badge className='ml-auto bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'>{item.notification}</Badge>}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side='right' className='dark:bg-gray-800 dark:text-gray-100'>
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className='border-t border-gray-200 dark:border-gray-800 p-4'>
            <div className='flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 p-3'>
              <Avatar className='h-10 w-10 border-2 border-white dark:border-gray-700'>
                <AvatarImage src='/placeholder.svg?height=40&width=40' alt='User' />
                <AvatarFallback className='bg-blue-600 text-white'>{userRole === "student" ? "ST" : userRole === "trainer" ? "TR" : "AD"}</AvatarFallback>
              </Avatar>
              <div className='grid gap-0.5 text-sm'>
                <div className='font-medium'>{userRole === "student" ? "John Doe" : userRole === "trainer" ? "Jane Smith" : "Admin User"}</div>
                <div className='text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1'>
                  <span className={cn("w-2 h-2 rounded-full", userRole === "admin" ? "bg-red-500" : userRole === "trainer" ? "bg-yellow-500" : "bg-green-500")}></span>
                  {userRole}
                </div>
              </div>
              <Button variant='ghost' size='icon' asChild className='ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
                <Link href='/login'>
                  <LogOut className='h-5 w-5' />
                  <span className='sr-only'>Log out</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content wrapper - takes all remaining space */}
        <div className='flex-1 flex flex-col min-w-0'>
          <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6'>
            <SidebarTrigger className='mr-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' />

            <div className='relative hidden md:flex items-center max-w-sm w-full'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400' />
              <Input placeholder='Search...' className='pl-10 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500' />
            </div>

            <div className='ml-auto flex items-center gap-3'>
              <Button variant='ghost' size='icon' className='relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
                <Bell className='h-5 w-5' />
                {notifications > 0 && <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>{notifications}</span>}
              </Button>

              <Button variant='ghost' size='icon' onClick={toggleDarkMode} className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
                {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
              </Button>

              <div className='hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-800'></div>

              <div className='hidden sm:flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder.svg?height=40&width=40' alt='User' />
                  <AvatarFallback className='bg-blue-600 text-white'>{userRole === "student" ? "ST" : userRole === "trainer" ? "TR" : "AD"}</AvatarFallback>
                </Avatar>
                <div className='text-sm font-medium'>{userRole === "student" ? "John Doe" : userRole === "trainer" ? "Jane Smith" : "Admin User"}</div>
              </div>
            </div>
          </header>

          {/* Main content area - will expand to fill available space */}
          <main className='flex-1 overflow-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950 w-full'>{children}</main>

          <footer className='border-t border-gray-200 dark:border-gray-800 py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400'>
            <p>© {new Date().getFullYear()} Placement Prep LMS. All rights reserved.</p>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
}
