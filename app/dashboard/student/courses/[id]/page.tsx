"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  type LucideIcon,
  Play,
  PlayCircle,
  Users,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashboardLayout from "@/components/dashboard-layout"

// Type definitions
type ContentType = "video" | "document" | "quiz" | "code" | "assignment"
type ModuleStatus = "completed" | "in-progress" | "locked" | "upcoming"

interface ModuleContent {
  id: number
  title: string
  type: ContentType
  duration?: string
  questions?: number
  problems?: number
  completed: boolean
}

interface CourseModule {
  id: number
  title: string
  description: string
  status: ModuleStatus
  completed: boolean
  content: ModuleContent[]
  startDate?: string
  endDate?: string
}

interface CourseData {
  id: string
  title: string
  instructor: string
  instructorTitle: string
  instructorAvatar: string
  description: string
  longDescription: string
  progress: number
  totalModules: number
  completedModules: number
  totalStudents: number
  rating: number
  reviews: number
  duration: string
  level: string
  lastUpdated: string
  tags: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  modules: CourseModule[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string

  const [activeModule, setActiveModule] = useState<number>(0)

  // Mock course data
  const course: CourseData = {
    id: courseId,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Jane Smith",
    instructorTitle: "Senior Computer Science Professor",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    description:
      "A comprehensive course covering fundamental data structures and algorithms essential for technical interviews and competitive programming.",
    longDescription:
      "This course provides a deep dive into data structures and algorithms, covering everything from basic arrays and strings to advanced graph algorithms and dynamic programming. You'll learn how to analyze algorithm complexity, optimize solutions, and apply these concepts to solve real-world problems. By the end of this course, you'll have a solid foundation in DSA concepts and be well-prepared for technical interviews at top tech companies.",
    progress: 65,
    totalModules: 8,
    completedModules: 5,
    totalStudents: 1245,
    rating: 4.8,
    reviews: 328,
    duration: "12 weeks",
    level: "Intermediate",
    lastUpdated: "2025-03-15",
    tags: ["Programming", "Algorithms", "Data Structures", "Problem Solving"],
    prerequisites: [
      "Basic programming knowledge in any language",
      "Understanding of basic mathematics concepts",
      "Familiarity with time and space complexity (helpful but not required)",
    ],
    learningOutcomes: [
      "Understand and implement common data structures",
      "Analyze algorithm time and space complexity",
      "Apply appropriate data structures to solve problems efficiently",
      "Optimize algorithms for better performance",
      "Solve coding interview questions with confidence",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Algorithms",
        description: "Fundamentals of algorithm analysis and complexity theory",
        status: "completed",
        completed: true,
        content: [
          { id: 1, title: "Course Overview", type: "video", duration: "10:15", completed: true },
          { id: 2, title: "Big O Notation", type: "document", duration: "15 min read", completed: true },
          { id: 3, title: "Algorithm Analysis", type: "video", duration: "18:30", completed: true },
          { id: 4, title: "Module Quiz", type: "quiz", questions: 10, completed: true },
        ],
        startDate: "2025-01-10",
        endDate: "2025-01-17",
      },
      {
        id: 2,
        title: "Arrays and Strings",
        description: "Working with fundamental data structures: arrays and strings",
        status: "completed",
        completed: true,
        content: [
          { id: 5, title: "Array Basics", type: "video", duration: "12:45", completed: true },
          { id: 6, title: "String Manipulation", type: "document", duration: "20 min read", completed: true },
          { id: 7, title: "Coding Exercise", type: "code", problems: 3, completed: true },
          { id: 8, title: "Module Quiz", type: "quiz", questions: 8, completed: true },
        ],
        startDate: "2025-01-18",
        endDate: "2025-01-25",
      },
      {
        id: 3,
        title: "Linked Lists",
        description: "Understanding and implementing linked list data structures",
        status: "in-progress",
        completed: false,
        content: [
          { id: 9, title: "Linked List Basics", type: "video", duration: "15:20", completed: true },
          {
            id: 10,
            title: "Singly vs Doubly Linked Lists",
            type: "document",
            duration: "18 min read",
            completed: true,
          },
          { id: 11, title: "Common Operations", type: "video", duration: "20:10", completed: false },
          { id: 12, title: "Coding Exercise", type: "code", problems: 4, completed: false },
          { id: 13, title: "Module Quiz", type: "quiz", questions: 10, completed: false },
        ],
        startDate: "2025-01-26",
        endDate: "2025-02-02",
      },
      {
        id: 4,
        title: "Stacks and Queues",
        description: "Implementation and applications of stack and queue data structures",
        status: "upcoming",
        completed: false,
        content: [
          { id: 14, title: "Stack Implementation", type: "video", duration: "14:30", completed: false },
          { id: 15, title: "Queue Implementation", type: "document", duration: "15 min read", completed: false },
          { id: 16, title: "Applications", type: "video", duration: "18:45", completed: false },
          { id: 17, title: "Coding Exercise", type: "code", problems: 3, completed: false },
          { id: 18, title: "Module Quiz", type: "quiz", questions: 8, completed: false },
        ],
        startDate: "2025-02-03",
        endDate: "2025-02-10",
      },
      {
        id: 5,
        title: "Trees and Graphs",
        description: "Exploring hierarchical and network data structures",
        status: "locked",
        completed: false,
        content: [
          { id: 19, title: "Tree Basics", type: "video", duration: "16:20", completed: false },
          { id: 20, title: "Binary Trees", type: "document", duration: "25 min read", completed: false },
          { id: 21, title: "Graph Representation", type: "video", duration: "22:15", completed: false },
          { id: 22, title: "Tree Traversal", type: "video", duration: "18:30", completed: false },
          { id: 23, title: "Coding Exercise", type: "code", problems: 5, completed: false },
          { id: 24, title: "Module Quiz", type: "quiz", questions: 12, completed: false },
        ],
        startDate: "2025-02-11",
        endDate: "2025-02-18",
      },
      {
        id: 6,
        title: "Sorting and Searching",
        description: "Algorithms for organizing and finding data efficiently",
        status: "locked",
        completed: false,
        content: [
          { id: 25, title: "Basic Sorting Algorithms", type: "video", duration: "20:10", completed: false },
          { id: 26, title: "Advanced Sorting", type: "document", duration: "30 min read", completed: false },
          { id: 27, title: "Binary Search", type: "video", duration: "15:45", completed: false },
          { id: 28, title: "Coding Exercise", type: "code", problems: 4, completed: false },
          { id: 29, title: "Module Assignment", type: "assignment", completed: false },
        ],
        startDate: "2025-02-19",
        endDate: "2025-02-26",
      },
      {
        id: 7,
        title: "Dynamic Programming",
        description: "Solving complex problems by breaking them down into simpler subproblems",
        status: "locked",
        completed: false,
        content: [
          { id: 30, title: "Introduction to DP", type: "video", duration: "25:30", completed: false },
          { id: 31, title: "Memoization vs Tabulation", type: "document", duration: "20 min read", completed: false },
          { id: 32, title: "Common DP Problems", type: "video", duration: "28:15", completed: false },
          { id: 33, title: "Advanced DP Techniques", type: "video", duration: "22:40", completed: false },
          { id: 34, title: "Coding Exercise", type: "code", problems: 6, completed: false },
          { id: 35, title: "Module Quiz", type: "quiz", questions: 10, completed: false },
        ],
        startDate: "2025-02-27",
        endDate: "2025-03-06",
      },
      {
        id: 8,
        title: "Advanced Topics",
        description: "Specialized algorithms and techniques for complex problems",
        status: "locked",
        completed: false,
        content: [
          { id: 36, title: "Graph Algorithms", type: "video", duration: "30:15", completed: false },
          { id: 37, title: "Greedy Algorithms", type: "document", duration: "25 min read", completed: false },
          { id: 38, title: "Backtracking", type: "video", duration: "24:30", completed: false },
          { id: 39, title: "Final Project", type: "assignment", completed: false },
          { id: 40, title: "Final Assessment", type: "quiz", questions: 20, completed: false },
        ],
        startDate: "2025-03-07",
        endDate: "2025-03-14",
      },
    ],
  }

  // Helper function to get icon based on content type
  const getContentIcon = (type: ContentType): LucideIcon => {
    switch (type) {
      case "video":
        return Video
      case "document":
        return FileText
      case "quiz":
        return BookOpen
      case "code":
        return Play
      case "assignment":
        return FileText
      default:
        return FileText
    }
  }

  // Helper function to get status badge
  const getStatusBadge = (status: ModuleStatus) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      case "locked":
        return <Badge variant="secondary">Locked</Badge>
      default:
        return null
    }
  }

  // Helper function to get module status icon
  const getModuleStatusIcon = (status: ModuleStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Play className="h-5 w-5 text-primary" />
      case "upcoming":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      case "locked":
        return <Clock className="h-5 w-5 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/dashboard/student/courses" className="hover:underline">
                Courses
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Data Structures & Algorithms</span>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <span className="text-sm">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.totalStudents.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.level}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.completedModules} of {course.totalModules} modules completed
            </p>
            <Button className="mt-2">Continue Learning</Button>
          </div>
        </div>

        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules</CardTitle>
                    <CardDescription>Track your progress through each module</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {course.modules.map((module, index) => (
                        <button
                          key={module.id}
                          className={`flex items-start gap-3 w-full p-4 text-left transition-colors hover:bg-muted/50 ${
                            activeModule === index ? "bg-muted" : ""
                          }`}
                          onClick={() => setActiveModule(index)}
                          disabled={module.status === "locked"}
                        >
                          <div className="mt-0.5">{getModuleStatusIcon(module.status)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium truncate">{module.title}</h3>
                              {getStatusBadge(module.status)}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
                            {module.startDate && (
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>
                                  {new Date(module.startDate).toLocaleDateString()} -{" "}
                                  {new Date(module.endDate!).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{course.modules[activeModule].title}</CardTitle>
                        <CardDescription>{course.modules[activeModule].description}</CardDescription>
                      </div>
                      {getStatusBadge(course.modules[activeModule].status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.modules[activeModule].content.map((content) => (
                        <div
                          key={content.id}
                          className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50"
                        >
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border bg-muted">
                            {React.createElement(getContentIcon(content.type), { className: "h-4 w-4" })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{content.title}</h4>
                              {content.completed && (
                                <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                                  Completed
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="capitalize">{content.type}</span>
                              {content.duration && <span>{content.duration}</span>}
                              {content.questions && <span>{content.questions} questions</span>}
                              {content.problems && <span>{content.problems} problems</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      disabled={activeModule === 0}
                      onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                    >
                      Previous Module
                    </Button>
                    <Button
                      disabled={
                        activeModule === course.modules.length - 1 ||
                        course.modules[activeModule + 1].status === "locked"
                      }
                      onClick={() => setActiveModule(Math.min(course.modules.length - 1, activeModule + 1))}
                    >
                      Next Module
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About This Course</h3>
                  <p>{course.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Course Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Level</p>
                        <p className="text-sm text-muted-foreground">{course.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Students</p>
                        <p className="text-sm text-muted-foreground">
                          {course.totalStudents.toLocaleString()} enrolled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(course.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Instructor</h3>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{course.instructor}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructorTitle}</p>
                      <p className="text-sm mt-2">
                        Dr. Jane Smith is a renowned computer scientist with over 15 years of experience in teaching
                        algorithms and data structures. She has worked at leading tech companies and has published
                        numerous research papers on algorithm optimization.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Timeline</CardTitle>
                <CardDescription>Your learning journey through this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-0">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                  {course.modules.map((module, index) => (
                    <div key={module.id} className="relative flex gap-4 pb-8 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-0 -translate-x-1/2 z-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                          {getModuleStatusIcon(module.status)}
                        </div>
                      </div>

                      {/* Timeline content */}
                      <div className="flex-1 ml-12 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                          {getStatusBadge(module.status)}
                        </div>

                        {module.startDate && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            {new Date(module.startDate).toLocaleDateString()} -{" "}
                            {new Date(module.endDate!).toLocaleDateString()}
                          </div>
                        )}

                        {module.status === "in-progress" && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Current Progress</p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={
                                  (module.content.filter((item) => item.completed).length / module.content.length) * 100
                                }
                                className="h-2 flex-1"
                              />
                              <span className="text-xs text-muted-foreground">
                                {module.content.filter((item) => item.completed).length}/{module.content.length} items
                              </span>
                            </div>
                          </div>
                        )}

                        {module.status === "in-progress" && (
                          <Button size="sm" variant="default" asChild className="mt-2">
                            <Link href={`/dashboard/student/courses/${courseId}/modules/${module.id}`}>
                              Continue Module
                            </Link>
                          </Button>
                        )}

                        {module.status === "completed" && (
                          <Button size="sm" variant="outline" asChild className="mt-2">
                            <Link href={`/dashboard/student/courses/${courseId}/modules/${module.id}`}>
                              Review Module
                            </Link>
                          </Button>
                        )}

                        {module.status === "upcoming" && (
                          <Button size="sm" variant="outline" asChild className="mt-2">
                            <Link href={`/dashboard/student/courses/${courseId}/modules/${module.id}`}>
                              Preview Module
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
                <CardDescription>Additional materials to support your learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Downloadable Materials</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Course Syllabus</p>
                            <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Algorithm Cheat Sheet</p>
                            <p className="text-sm text-muted-foreground">PDF, 1.8 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Data Structures Reference Guide</p>
                            <p className="text-sm text-muted-foreground">PDF, 3.2 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommended Books</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Introduction to Algorithms</h4>
                        <p className="text-sm text-muted-foreground">
                          by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Algorithms</h4>
                        <p className="text-sm text-muted-foreground">by Robert Sedgewick and Kevin Wayne</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Cracking the Coding Interview</h4>
                        <p className="text-sm text-muted-foreground">by Gayle Laakmann McDowell</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Data Structures and Algorithms in Python</h4>
                        <p className="text-sm text-muted-foreground">
                          by Michael T. Goodrich, Roberto Tamassia, and Michael H. Goldwasser
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">Video Lectures</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg border overflow-hidden">
                        <div className="aspect-video bg-muted relative flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Algorithm Analysis Lecture"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-16 w-16 text-white opacity-80" />
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">Algorithm Analysis Masterclass</h4>
                          <p className="text-sm text-muted-foreground">
                            A deep dive into analyzing algorithm efficiency
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg border overflow-hidden">
                        <div className="aspect-video bg-muted relative flex items-center justify-center">
                          <img
                            src="/placeholder.svg?height=200&width=400"
                            alt="Data Structures Overview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-16 w-16 text-white opacity-80" />
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">Data Structures Fundamentals</h4>
                          <p className="text-sm text-muted-foreground">
                            Understanding the building blocks of efficient programs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
