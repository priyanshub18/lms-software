"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
  ]

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.college.toLowerCase().includes(query) ||
      student.enrolledCourses.some((course) => course.toLowerCase().includes(query))
    )
  })

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "at-risk":
        return "warning"
      case "inactive":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <DashboardLayout userRole="trainer">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Students</h1>
            <p className="text-muted-foreground">Manage and monitor student progress</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Students</SheetTitle>
                  <SheetDescription>Filter students by various criteria</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="at-risk" />
                        <Label htmlFor="at-risk">At Risk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="inactive" />
                        <Label htmlFor="inactive">Inactive</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>College</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Colleges</SelectItem>
                        <SelectItem value="mit">MIT</SelectItem>
                        <SelectItem value="stanford">Stanford</SelectItem>
                        <SelectItem value="berkeley">Berkeley</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="dsa">Data Structures & Algorithms</SelectItem>
                        <SelectItem value="system">System Design</SelectItem>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select progress range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="0-25">0-25%</SelectItem>
                        <SelectItem value="26-50">26-50%</SelectItem>
                        <SelectItem value="51-75">51-75%</SelectItem>
                        <SelectItem value="76-100">76-100%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Student List</CardTitle>
            <CardDescription>{filteredStudents.length} students found</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </TableCell>
                    <TableCell>{student.college}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {student.enrolledCourses.map((course, index) => (
                          <span key={index} className="text-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={student.progress} className="h-2 w-[60px]" />
                        <span className="text-sm">{student.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(student.status) as any} className="capitalize">
                        {student.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(student.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/trainer/students/${student.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
