"use client";

import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, FileText, LayoutDashboard, LogOut, Settings, Users, PieChart, FileQuestion, User, Bell, Search, Moon, Sun, Menu, ChevronRight, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "student" | "trainer" | "admin";
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Use localStorage to persist dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      // Return true if savedMode is "true" or if it's null (default to dark)
      return savedMode === null ? true : savedMode === "true";
    }
    return true; // Default to dark mode
  });

  // Initialize on component mount
  useEffect(() => {
    // Apply dark mode based on state
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Check for mobile screen size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    // Restore sidebar state from localStorage
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState !== null) {
      setSidebarOpen(savedSidebarState === "true");
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Update localStorage when sidebar state changes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", sidebarOpen.toString());
  }, [sidebarOpen]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          icon: Edit3,
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
          icon: Edit3,
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

    return [...roleSpecificItems[userRole], ...baseItems];
  };

  const navItems = getNavItems();
  const totalNotifications = navItems.reduce((acc, item) => acc + item.notification, 0);

  return (
    <div className='flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100'>
      {/* Sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 ease-in-out transform bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800", sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20")}>
        {/* Logo Section */}
        <div className='flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800'>
          <Link href='/' className='flex items-center gap-2 font-bold'>
            <BookOpen className='h-6 w-6 text-blue-600 dark:text-blue-400' />
            {sidebarOpen && <span className='text-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text'>PrepLMS</span>}
          </Link>
          <Button variant='ghost' size='icon' className='ml-auto md:flex hidden' onClick={toggleSidebar}>
            <ChevronRight className={cn("h-5 w-5 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className='flex-1 overflow-y-auto py-4 px-3'>
          <nav className='space-y-1'>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn("flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all", pathname === item.href ? "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800")}>
                <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400")} />

                {sidebarOpen && (
                  <>
                    <span className='ml-3 flex-1 whitespace-nowrap'>{item.title}</span>
                    {item.notification > 0 && <Badge className='ml-auto bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'>{item.notification}</Badge>}
                  </>
                )}

                {!sidebarOpen && item.notification > 0 && <Badge className='ml-auto h-5 w-5 p-0 flex items-center justify-center bg-blue-500 dark:bg-blue-600'>{item.notification}</Badge>}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className='border-t border-gray-200 dark:border-gray-800 p-4'>
          <div className={cn("flex items-center gap-3", sidebarOpen ? "justify-start" : "justify-center")}>
            <Avatar className='h-10 w-10 border-2 border-white dark:border-gray-700 cursor-pointer'>
              <AvatarImage src='/placeholder.svg?height=40&width=40' alt='User' />
              <AvatarFallback className='bg-blue-600 text-white'>{userRole === "student" ? "ST" : userRole === "trainer" ? "TR" : "AD"}</AvatarFallback>
            </Avatar>

            {sidebarOpen && (
              <div className='grid gap-0.5 text-sm'>
                <div className='font-medium'>{userRole === "student" ? "John Doe" : userRole === "trainer" ? "Jane Smith" : "Admin User"}</div>
                <div className='text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1'>
                  <span className={cn("w-2 h-2 rounded-full", userRole === "admin" ? "bg-red-500" : userRole === "trainer" ? "bg-yellow-500" : "bg-green-500")}></span>
                  {userRole}
                </div>
              </div>
            )}

            {sidebarOpen && (
              <Button variant='ghost' size='icon' asChild className='ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
                <Link href='/login'>
                  <LogOut className='h-5 w-5' />
                  <span className='sr-only'>Log out</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && <div className='fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden' onClick={toggleSidebar}></div>}

      {/* Main Content Area */}
      <div className={cn("flex flex-col flex-1 transition-all duration-300 ease-in-out", sidebarOpen ? "md:ml-64" : "md:ml-20")}>
        {/* Header */}
        <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm'>
          <Button variant='ghost' size='icon' className='md:hidden' onClick={toggleSidebar}>
            <Menu className='h-5 w-5' />
          </Button>

          <div className='relative flex items-center max-w-md w-full'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input placeholder='Search...' className='pl-10 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500' />
          </div>

          <div className='ml-auto flex items-center gap-3'>
            <Button variant='ghost' size='icon' className='relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
              <Bell className='h-5 w-5' />
              {totalNotifications > 0 && <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>{totalNotifications}</span>}
            </Button>

            <Button variant='ghost' size='icon' onClick={toggleDarkMode} className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
              {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
            </Button>

            <div className='hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-800'></div>

            <div className='hidden sm:flex items-center gap-2'>
              <Avatar className='h-8 w-8 ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-800'>
                <AvatarImage src='/placeholder.svg?height=40&width=40' alt='User' />
                <AvatarFallback className='bg-blue-600 text-white'>{userRole === "student" ? "ST" : userRole === "trainer" ? "TR" : "AD"}</AvatarFallback>
              </Avatar>
              <div className='text-sm font-medium'>{userRole === "student" ? "John Doe" : userRole === "trainer" ? "Jane Smith" : "Admin User"}</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='flex-1 overflow-auto bg-gray-50 dark:bg-gray-950'>
          <div className='container mx-auto p-4 md:p-6 '>{children}</div>
        </main>

        {/* Footer */}
        <footer className='border-t border-gray-200 dark:border-gray-800 py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900'>
          <p>© {new Date().getFullYear()} Placement Prep LMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
