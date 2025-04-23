"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronRight, MoreHorizontal, Mail, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";
import ProgressBar from "./_components/ProgressBar";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      college: "MIT",
      enrolledCourses: ["Data Structures & Algorithms", "System Design"],
      progress: 65,
      lastActive: "2025-04-21",
      status: "active",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      college: "Stanford",
      enrolledCourses: ["System Design"],
      progress: 28,
      lastActive: "2025-04-19",
      status: "at-risk",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj.p@example.com",
      college: "Berkeley",
      enrolledCourses: ["Frontend Development", "Data Structures & Algorithms"],
      progress: 40,
      lastActive: "2025-04-20",
      status: "at-risk",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      college: "MIT",
      enrolledCourses: ["Data Structures & Algorithms"],
      progress: 85,
      lastActive: "2025-04-21",
      status: "active",
    },
    {
      id: 5,
      name: "James Chen",
      email: "james.c@example.com",
      college: "Stanford",
      enrolledCourses: ["System Design", "Frontend Development"],
      progress: 72,
      lastActive: "2025-04-20",
      status: "active",
    },
    {
      id: 6,
      name: "Sophia Kim",
      email: "sophia.k@example.com",
      college: "Berkeley",
      enrolledCourses: ["Data Structures & Algorithms", "System Design"],
      progress: 90,
      lastActive: "2025-04-21",
      status: "active",
    },
    {
      id: 7,
      name: "David Rodriguez",
      email: "david.r@example.com",
      college: "MIT",
      enrolledCourses: ["Frontend Development"],
      progress: 15,
      lastActive: "2025-04-15",
      status: "inactive",
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query) || student.college.toLowerCase().includes(query) || student.enrolledCourses.some((course) => course.toLowerCase().includes(query));
  });

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "at-risk":
        return "warning";
      case "inactive":
        return "destructive";
      default:
        return "default";
    }
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <DashboardLayout userRole='trainer'>
      <div className='space-y-6'>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-semibold text-blue-800 dark:text-blue-300'>Students</h1>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>Manage and monitor student progress and performance</p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='relative w-full md:w-64'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type='search' placeholder='Search students...' className='w-full pl-10 border-blue-200 dark:border-blue-800 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='outline' size='icon' className='rounded-lg border-blue-200 dark:border-blue-800'>
                    <SlidersHorizontal className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                    <span className='sr-only'>Filter</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className='border-l border-blue-200 dark:border-blue-800'>
                  <SheetHeader>
                    <SheetTitle className='text-blue-800 dark:text-blue-300'>Filter Students</SheetTitle>
                    <SheetDescription>Refine student list based on criteria</SheetDescription>
                  </SheetHeader>
                  <div className='grid gap-5 py-6'>
                    <div className='space-y-3'>
                      <Label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Status</Label>
                      <div className='space-y-2'>
                        <div className='flex items-center space-x-2'>
                          <Checkbox id='active' className='text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500' />
                          <Label htmlFor='active' className='text-sm'>
                            Active
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Checkbox id='at-risk' className='text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500' />
                          <Label htmlFor='at-risk' className='text-sm'>
                            At Risk
                          </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Checkbox id='inactive' className='text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500' />
                          <Label htmlFor='inactive' className='text-sm'>
                            Inactive
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <Label className='text-sm font-medium text-gray-700 dark:text-gray-300'>College</Label>
                      <Select>
                        <SelectTrigger className='w-full border-gray-300 dark:border-gray-600 focus:ring-blue-500 rounded-lg'>
                          <SelectValue placeholder='Select college' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>All Colleges</SelectItem>
                          <SelectItem value='mit'>MIT</SelectItem>
                          <SelectItem value='stanford'>Stanford</SelectItem>
                          <SelectItem value='berkeley'>Berkeley</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-3'>
                      <Label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Course</Label>
                      <Select>
                        <SelectTrigger className='w-full border-gray-300 dark:border-gray-600 focus:ring-blue-500 rounded-lg'>
                          <SelectValue placeholder='Select course' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>All Courses</SelectItem>
                          <SelectItem value='dsa'>Data Structures & Algorithms</SelectItem>
                          <SelectItem value='system'>System Design</SelectItem>
                          <SelectItem value='frontend'>Frontend Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-3'>
                      <Label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Progress</Label>
                      <Select>
                        <SelectTrigger className='w-full border-gray-300 dark:border-gray-600 focus:ring-blue-500 rounded-lg'>
                          <SelectValue placeholder='Select progress range' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>All</SelectItem>
                          <SelectItem value='0-25'>0-25%</SelectItem>
                          <SelectItem value='26-50'>26-50%</SelectItem>
                          <SelectItem value='51-75'>51-75%</SelectItem>
                          <SelectItem value='76-100'>76-100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='flex justify-end gap-3'>
                    <Button variant='outline' className='rounded-lg border-gray-300 dark:border-gray-600'>
                      Reset
                    </Button>
                    <Button className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white'>Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        <Card className='border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden rounded-xl'>
          <div className='p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-lg font-medium text-gray-800 dark:text-gray-200'>Student List</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{filteredStudents.length} students found</p>
              </div>
              <Button className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white'>
                <span>Export Data</span>
                <FileText className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
          <CardContent className='p-0'>
            <AnimatePresence>
              {isLoaded && (
                <motion.div variants={containerVariants} initial='hidden' animate='visible' className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-gray-50 dark:bg-gray-800/50'>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>Student</TableHead>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>College</TableHead>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>Courses</TableHead>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>Progress</TableHead>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>Status</TableHead>
                        <TableHead className='text-xs font-medium text-gray-500 dark:text-gray-400'>Last Active</TableHead>
                        <TableHead className='w-[50px]'></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student, index) => (
                        <motion.tr key={student.id} variants={itemVariants} className='border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150'>
                          <TableCell className='py-4'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                                <User className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                              </div>
                              <div>
                                <div className='font-medium text-gray-900 dark:text-gray-100'>{student.name}</div>
                                <div className='text-sm text-gray-500 dark:text-gray-400'>{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className='text-sm text-gray-600 dark:text-gray-300'>{student.college}</TableCell>
                          <TableCell>
                            <div className='flex flex-col gap-1'>
                              {student.enrolledCourses.map((course, index) => (
                                <span key={index} className='text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full inline-block mb-1'>
                                  {course}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-3'>
                              <ProgressBar  value={student.progress} />
                              
                              {/* <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{student.progress}%</span> */}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className={`
                                capitalize font-medium text-xs px-2 py-1 
                                ${student.status === "active" ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" : student.status === "at-risk" ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800" : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"}
                              `}
                            >
                              {student.status.replace("-", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-sm text-gray-600 dark:text-gray-300'>
                            {new Date(student.lastActive).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' className='rounded-full h-8 w-8'>
                                  <MoreHorizontal className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                                  <span className='sr-only'>Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end' className='w-48 border-gray-200 dark:border-gray-700'>
                                <DropdownMenuItem asChild className='flex items-center cursor-pointer'>
                                  <Link href={`/dashboard/trainer/students/${student.id}`} className='flex items-center w-full'>
                                    <User className='mr-2 h-4 w-4 text-blue-600 dark:text-blue-400' />
                                    <span>View Profile</span>
                                    <ChevronRight className='ml-auto h-4 w-4 text-gray-400' />
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='flex items-center cursor-pointer'>
                                  <Mail className='mr-2 h-4 w-4 text-blue-600 dark:text-blue-400' />
                                  <span>Send Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='flex items-center cursor-pointer'>
                                  <FileText className='mr-2 h-4 w-4 text-blue-600 dark:text-blue-400' />
                                  <span>Generate Report</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              )}
            </AnimatePresence>
            {filteredStudents.length === 0 && (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='p-4 rounded-full bg-blue-50 dark:bg-blue-900/20'>
                  <Search className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
                <h3 className='mt-4 text-lg font-medium text-gray-900 dark:text-gray-100'>No students found</h3>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
