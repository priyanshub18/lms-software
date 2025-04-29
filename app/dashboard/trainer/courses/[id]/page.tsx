"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Calendar, CheckCircle2, ChevronRight, Clock, FileText, GraduationCap, type LucideIcon, Play, PlayCircle, Users, Video, Download, Star, MapPin, User, Book, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/dashboard-layout";
import OfflineClassesTab from "../_components/Offline";

// Type definitions
type ContentType = "video" | "document" | "quiz" | "code" | "assignment";
type ModuleStatus = "completed" | "in-progress" | "locked" | "upcoming";

interface Class {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  attendees: number;
  maxCapacity: number;
}

interface Resource {
  id: number;
  title: string;
  type: "PDF" | "Video";
  size: string;
  downloadable: boolean;
}

interface ModuleContent {
  id: number;
  title: string;
  type: ContentType;
  duration?: string;
  questions?: number;
  problems?: number;
  completed: boolean;
}

interface CourseModule {
  id: number;
  title: string;
  description: string;
  status: ModuleStatus;
  completed: boolean;
  content: ModuleContent[];
  startDate?: string;
  endDate?: string;
}

interface CourseData {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  description: string;
  longDescription: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  totalStudents: number;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
  lastUpdated: string;
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  modules: CourseModule[];
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CourseDetailPage() {
  const [nextClass, setNextClass] = useState<Class | null>(null);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [activeModule, setActiveModule] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setNextClass({
        id: 1,
        title: "Advanced React Component Architecture",
        date: "April 30, 2025",
        time: "10:00 AM - 12:30 PM",
        location: "Tech Hub, Floor 3, Room 302",
        instructor: "Sarah Johnson",
        attendees: 18,
        maxCapacity: 25,
      });

      setUpcomingClasses([
        {
          id: 2,
          title: "UI/UX Design Principles",
          date: "May 3, 2025",
          time: "2:00 PM - 4:30 PM",
          location: "Design Studio, Floor 2, Room 205",
          instructor: "Michael Chen",
          attendees: 12,
          maxCapacity: 20,
        },
        {
          id: 3,
          title: "Backend Integration Workshop",
          date: "May 7, 2025",
          time: "9:30 AM - 1:00 PM",
          location: "Tech Hub, Floor 3, Room 310",
          instructor: "Priya Patel",
          attendees: 15,
          maxCapacity: 25,
        },
        {
          id: 4,
          title: "Advanced State Management",
          date: "May 12, 2025",
          time: "11:00 AM - 2:00 PM",
          location: "Tech Hub, Floor 3, Room 302",
          instructor: "Sarah Johnson",
          attendees: 8,
          maxCapacity: 25,
        },
      ]);

      setResources([
        {
          id: 1,
          title: "Component Architecture Slides",
          type: "PDF",
          size: "3.2 MB",
          downloadable: true,
        },
        {
          id: 2,
          title: "Workshop Recordings - April 20",
          type: "Video",
          size: "238 MB",
          downloadable: true,
        },
        {
          id: 3,
          title: "Practical Exercise Guide",
          type: "PDF",
          size: "1.8 MB",
          downloadable: true,
        },
      ]);

      setLoaded(true);
    }, 800);
  }, []);

  const handleRegister = (classId: number): void => {
    // Handle registration logic
    console.log(`Registered for class ${classId}`);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock course data
  const course: CourseData = {
    id: courseId,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Jane Smith",
    instructorTitle: "Senior Computer Science Professor",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    description: "A comprehensive course covering fundamental data structures and algorithms essential for technical interviews and competitive programming.",
    longDescription: "This course provides a deep dive into data structures and algorithms, covering everything from basic arrays and strings to advanced graph algorithms and dynamic programming. You'll learn how to analyze algorithm complexity, optimize solutions, and apply these concepts to solve real-world problems. By the end of this course, you'll have a solid foundation in DSA concepts and be well-prepared for technical interviews at top tech companies.",
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
    prerequisites: ["Basic programming knowledge in any language", "Understanding of basic mathematics concepts", "Familiarity with time and space complexity (helpful but not required)"],
    learningOutcomes: ["Understand and implement common data structures", "Analyze algorithm time and space complexity", "Apply appropriate data structures to solve problems efficiently", "Optimize algorithms for better performance", "Solve coding interview questions with confidence"],
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
  };

  // Helper function to get icon based on content type
  const getContentIcon = (type: ContentType): LucideIcon => {
    switch (type) {
      case "video":
        return Video;
      case "document":
        return FileText;
      case "quiz":
        return BookOpen;
      case "code":
        return Play;
      case "assignment":
        return FileText;
      default:
        return FileText;
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status: ModuleStatus) => {
    switch (status) {
      case "completed":
        return <Badge className='bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700'>Completed</Badge>;
      case "in-progress":
        return <Badge className='bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'>In Progress</Badge>;
      case "upcoming":
        return (
          <Badge variant='outline' className='text-amber-500 dark:text-amber-400 border-amber-200 dark:border-amber-700'>
            Upcoming
          </Badge>
        );
      case "locked":
        return (
          <Badge variant='secondary' className='bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>
            Locked
          </Badge>
        );
      default:
        return null;
    }
  };

  // Helper function to get module status icon
  const getModuleStatusIcon = (status: ModuleStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className='h-5 w-5 text-emerald-500 dark:text-emerald-400' />;
      case "in-progress":
        return <Play className='h-5 w-5 text-blue-500 dark:text-blue-400' />;
      case "upcoming":
        return <Clock className='h-5 w-5 text-amber-500 dark:text-amber-400' />;
      case "locked":
        return <Clock className='h-5 w-5 text-gray-400 dark:text-gray-500' />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole='trainer'>
      <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className='space-y-6'>
        {/* Course Header */}
        <motion.div variants={slideUp} className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700'>
          <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
            <div>
              <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                <Link href='/dashboard/trainer/courses' className='hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200'>
                  Courses
                </Link>

                <ChevronRight className='h-4 w-4' />
                <span>Data Structures & Algorithms</span>
              </div>
              <h1 className='text-2xl font-bold md:text-3xl bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent'>{course.title}</h1>
              <p className='text-gray-600 dark:text-gray-300 mt-2'>{course.description}</p>

              <div className='flex flex-wrap items-center gap-4 mt-4'>
                <motion.div whileHover={{ scale: 1.05 }} className='flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 py-1 px-3 rounded-full'>
                  <Avatar className='h-6 w-6 border-2 border-blue-100 dark:border-blue-800'>
                    <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} alt={course.instructor} />
                    <AvatarFallback className='bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'>JS</AvatarFallback>
                  </Avatar>
                  <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>{course.instructor}</span>
                </motion.div>
                <div className='flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 py-1 px-3 rounded-full'>
                  <Users className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span className='text-sm'>{course.totalStudents.toLocaleString()} students</span>
                </div>
                <div className='flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 py-1 px-3 rounded-full'>
                  <Clock className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span className='text-sm'>{course.duration}</span>
                </div>
                <div className='flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700/50 py-1 px-3 rounded-full'>
                  <GraduationCap className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <span className='text-sm'>{course.level}</span>
                </div>
                <div className='flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 py-1 px-3 rounded-full'>
                  <Star className='h-4 w-4 text-amber-500 dark:text-amber-400' />
                  <span className='text-sm font-medium text-amber-700 dark:text-amber-300'>{course.rating}</span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>({course.reviews} reviews)</span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2 mt-4'>
                {course.tags.map((tag, index) => (
                  <span key={index} className='inline-block text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} className='flex flex-col gap-3 min-w-[250px] bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-blue-100 dark:border-gray-600 shadow-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700 dark:text-gray-200'>Overall Progress</span>
                <span className='text-sm font-bold text-blue-600 dark:text-blue-300'>{course.progress}%</span>
              </div>
              <div className='h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden'>
                <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1, ease: "easeOut" }} className='h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 rounded-full' />
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                {course.completedModules} of {course.totalModules} modules completed
              </p>
              <Button className='mt-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white' onClick={() => router.push(`/dashboard/trainer/courses/${course.id}/module/1}`)}>
                Continue Learning
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <Tabs defaultValue='modules' className='space-y-4'>
          <TabsList className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 rounded-lg'>
            <TabsTrigger value='modules' className='data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600'>
              Modules
            </TabsTrigger>
            <TabsTrigger value='overview' className='data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600'>
              Overview
            </TabsTrigger>
            <TabsTrigger value='timeline' className='data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600'>
              Timeline
            </TabsTrigger>
            <TabsTrigger value='resources' className='data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600'>
              Resources
            </TabsTrigger>
            <TabsTrigger value='offline' className='data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600'>
              Offline Classes
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value='modules'>
            <motion.div variants={staggerContainer} initial='hidden' animate='visible' className='grid gap-6 md:grid-cols-3'>
              <motion.div variants={slideUp} className='md:col-span-1'>
                <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden'>
                  <CardHeader className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-700'>
                    <CardTitle className='text-blue-600 dark:text-blue-300'>Course Modules</CardTitle>
                    <CardDescription>Track your progress through each module</CardDescription>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                      {course.modules.map((module, index) => (
                        <motion.button key={module.id} whileHover={module.status !== "locked" ? { backgroundColor: "rgba(59, 130, 246, 0.05)" } : {}} className={`flex items-start gap-3 w-full p-4 text-left transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/10 ${activeModule === index ? "bg-blue-50 dark:bg-blue-900/20" : ""}`} onClick={() => module.status !== "locked" && setActiveModule(index)} disabled={module.status === "locked"}>
                          <div className='mt-0.5'>
                            <motion.div whileHover={module.status !== "locked" ? { scale: 1.1 } : {}} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                              {getModuleStatusIcon(module.status)}
                            </motion.div>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between gap-2'>
                              <h3 className={`font-medium truncate ${module.status === "locked" ? "text-gray-400 dark:text-gray-500" : ""}`}>{module.title}</h3>
                              {getStatusBadge(module.status)}
                            </div>
                            <p className={`text-sm text-muted-foreground line-clamp-2 ${module.status === "locked" ? "text-gray-400 dark:text-gray-500" : ""}`}>{module.description}</p>
                            {module.startDate && (
                              <div className='flex items-center mt-1 text-xs text-muted-foreground'>
                                <Calendar className='mr-1 h-3 w-3' />
                                <span>
                                  {new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate!).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideUp} className='md:col-span-2'>
                <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm'>
                  <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-blue-600 dark:text-blue-300'>{course.modules[activeModule].title}</CardTitle>
                        <CardDescription>{course.modules[activeModule].description}</CardDescription>
                      </div>
                      {getStatusBadge(course.modules[activeModule].status)}
                    </div>
                  </CardHeader>
                  <CardContent className='p-6'>
                    <motion.div variants={staggerContainer} initial='hidden' animate='visible' className='space-y-4'>
                      {course.modules[activeModule].content.map((content) => (
                        <motion.div key={content.id} variants={slideUp} whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 10 }} className={`flex items-start gap-4 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow ${content.completed ? "bg-blue-50/50 dark:bg-blue-900/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}>
                          <div className='mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'>{React.createElement(getContentIcon(content.type), { className: "h-5 w-5" })}</div>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                              <h4 className='font-medium'>{content.title}</h4>
                              {content.completed && (
                                <Badge className='bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border-0 hover:bg-emerald-200 dark:hover:bg-emerald-900/40'>
                                  <CheckCircle2 className='mr-1 h-3 w-3' /> Completed
                                </Badge>
                              )}
                            </div>
                            <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                              <span className='capitalize bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-xs'>{content.type}</span>
                              {content.duration && (
                                <span className='flex items-center'>
                                  <Clock className='mr-1 h-3 w-3' /> {content.duration}
                                </span>
                              )}
                              {content.questions && (
                                <span className='flex items-center'>
                                  <BookOpen className='mr-1 h-3 w-3' /> {content.questions} questions
                                </span>
                              )}
                              {content.problems && (
                                <span className='flex items-center'>
                                  <Play className='mr-1 h-3 w-3' /> {content.problems} problems
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter className='flex justify-between border-t border-gray-200 dark:border-gray-700 p-4'>
                    <Button variant='outline' disabled={activeModule === 0} onClick={() => setActiveModule(Math.max(0, activeModule - 1))} className='border-gray-300 dark:border-gray-600'>
                      Previous Module
                    </Button>
                    <Button disabled={activeModule === course.modules.length - 1 || course.modules[activeModule + 1].status === "locked"} onClick={() => setActiveModule(Math.min(course.modules.length - 1, activeModule + 1))} className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'>
                      Next Module
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value='overview'>
            <motion.div variants={fadeIn} initial='hidden' animate='visible' className='space-y-6'>
              <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden'>
                <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className='space-y-6 p-6'>
                  <div>
                    <h3 className='font-semibold text-lg mb-3'>About This Course</h3>
                    <p className='text-gray-600 dark:text-gray-300'>{course.longDescription}</p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-lg mb-3'>Prerequisites</h3>
                    <ul className='space-y-2 ml-6 list-disc'>
                      {course.prerequisites.map((item, index) => (
                        <li key={index} className='text-gray-600 dark:text-gray-300'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className='font-semibold text-lg mb-3'>Learning Outcomes</h3>
                    <ul className='space-y-2 ml-6 list-disc'>
                      {course.learningOutcomes.map((item, index) => (
                        <li key={index} className='text-gray-600 dark:text-gray-300'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className='font-semibold text-lg mb-3'>Instructor</h3>
                    <div className='flex items-start gap-4'>
                      <Avatar className='h-12 w-12 border-2 border-blue-100 dark:border-blue-800'>
                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                        <AvatarFallback className='bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className='font-medium text-blue-600 dark:text-blue-300'>{course.instructor}</h4>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{course.instructorTitle}</p>
                        <p className='text-sm mt-2'>Experienced educator with over 10 years of teaching Computer Science and Data Structures.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value='timeline'>
            <motion.div variants={fadeIn} initial='hidden' animate='visible' className='space-y-6'>
              <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm'>
                <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                  <CardTitle>Course Timeline</CardTitle>
                  <CardDescription>Course schedule and important dates</CardDescription>
                </CardHeader>
                <CardContent className='p-0'>
                  <div className='relative'>
                    {course.modules.map((module, index) => (
                      <div key={module.id} className='flex relative'>
                        <div className='flex flex-col items-center mr-4'>
                          <div className='w-px bg-gray-200 dark:bg-gray-700 h-full absolute left-4 top-0 z-0'></div>
                          <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${module.completed ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300" : module.status === "in-progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"} mt-5 mb-5`}>{module.completed ? <CheckCircle2 className='h-5 w-5' /> : module.status === "in-progress" ? <Play className='h-4 w-4' /> : <span className='text-sm font-medium'>{index + 1}</span>}</div>
                        </div>
                        <div className='pb-8 pt-4 px-4 w-full'>
                          <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-lg font-medium'>{module.title}</h3>
                            {getStatusBadge(module.status)}
                          </div>
                          <p className='text-gray-600 dark:text-gray-300 mb-3'>{module.description}</p>
                          {module.startDate && (
                            <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                              <Calendar className='mr-2 h-4 w-4' />
                              <span>
                                {new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate!).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value='resources'>
            <motion.div variants={fadeIn} initial='hidden' animate='visible' className='grid gap-6 md:grid-cols-2'>
              <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm'>
                <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                  <CardTitle>Course Materials</CardTitle>
                  <CardDescription>Download study materials and resources</CardDescription>
                </CardHeader>
                <CardContent className='p-0'>
                  <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {[
                      { title: "Course Syllabus", type: "PDF", size: "320 KB" },
                      { title: "Big O Notation Cheat Sheet", type: "PDF", size: "512 KB" },
                      { title: "Linked List Implementation", type: "Code", size: "42 KB" },
                      { title: "Common Algorithm Problems", type: "Document", size: "1.2 MB" },
                      { title: "Sorting Algorithms Comparison", type: "Spreadsheet", size: "780 KB" },
                    ].map((resource, index) => (
                      <motion.div key={index} whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }} className='flex items-center justify-between p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'>
                            <FileText className='h-5 w-5' />
                          </div>
                          <div>
                            <p className='font-medium'>{resource.title}</p>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                              {resource.type} · {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button size='sm' variant='outline' className='gap-1'>
                          <Download className='h-4 w-4' />
                          <span>Download</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm'>
                <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
                  <CardTitle>Recommended Reading</CardTitle>
                  <CardDescription>Additional resources to aid your learning</CardDescription>
                </CardHeader>
                <CardContent className='p-0'>
                  <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {[
                      { title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest & Stein" },
                      { title: "Algorithms, 4th Edition", author: "Robert Sedgewick & Kevin Wayne" },
                      { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell" },
                      { title: "Data Structures and Algorithms in Python", author: "Michael T. Goodrich" },
                      { title: "The Algorithm Design Manual", author: "Steven S. Skiena" },
                    ].map((book, index) => (
                      <motion.div key={index} whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }} className='flex items-center gap-3 p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300'>
                          <BookOpen className='h-5 w-5' />
                        </div>
                        <div>
                          <p className='font-medium'>{book.title}</p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>by {book.author}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value='offline' className='w-full'>
            <div className='bg-slate-900 text-slate-200 rounded-lg p-6 min-h-screen'>
              <motion.div initial='hidden' animate={loaded ? "visible" : "hidden"} variants={staggerContainer} className='space-y-8'>
                {/* Header */}
                <motion.div variants={fadeIn} className='pb-4 border-b border-slate-700'>
                  <h2 className='text-2xl font-bold text-blue-400'>Offline Classes</h2>
                  <p className='text-slate-400 mt-1'>In-person sessions to enhance your learning experience</p>
                </motion.div>

                {/* Next Upcoming Class */}
                {nextClass && (
                  <motion.div variants={fadeIn}>
                    <h3 className='text-xl font-semibold text-slate-200 mb-4'>Next Class</h3>
                    <motion.div whileHover={{ scale: 1.02 }} className='bg-slate-800 rounded-lg p-6 border-l-4 border-blue-500 shadow-lg'>
                      <h4 className='text-lg font-semibold text-blue-400'>{nextClass.title}</h4>

                      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3'>
                          <Calendar className='h-5 w-5 text-blue-400' />
                          <span>{nextClass.date}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Clock className='h-5 w-5 text-blue-400' />
                          <span>{nextClass.time}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <MapPin className='h-5 w-5 text-blue-400' />
                          <span>{nextClass.location}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <User className='h-5 w-5 text-blue-400' />
                          <span>{nextClass.instructor}</span>
                        </div>
                      </div>

                      <div className='mt-6 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Users className='h-5 w-5 text-slate-400' />
                          <span className='text-slate-400'>
                            {nextClass.attendees} / {nextClass.maxCapacity} enrolled
                          </span>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-white' onClick={() => handleRegister(nextClass.id)}>
                          Reserve Seat
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Calendar View */}
                <motion.div variants={fadeIn} className='mt-8'>
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-semibold text-slate-200'>Upcoming Schedule</h3>
                    <button className='text-blue-400 flex items-center gap-1 hover:text-blue-300'>View Calendar</button>
                  </div>

                  <motion.div variants={staggerContainer} className='space-y-4'>
                    {upcomingClasses.map((cls) => (
                      <motion.div key={cls.id} variants={fadeIn} whileHover={{ scale: 1.01 }} className='bg-slate-800 p-4 rounded-lg flex flex-col md:flex-row justify-between gap-4'>
                        <div>
                          <h4 className='font-medium text-slate-200'>{cls.title}</h4>
                          <div className='flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-slate-400'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              <span>{cls.date}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Clock className='h-4 w-4' />
                              <span>{cls.time}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <User className='h-4 w-4' />
                              <span>{cls.instructor}</span>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center gap-3'>
                          <span className='text-sm text-slate-400'>
                            {cls.attendees}/{cls.maxCapacity}
                          </span>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded' onClick={() => handleRegister(cls.id)}>
                            Register
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Class Resources */}
                <motion.div variants={fadeIn} className='mt-8'>
                  <h3 className='text-xl font-semibold text-slate-200 mb-4'>Class Resources</h3>
                  <div className='bg-slate-800 rounded-lg p-6'>
                    <motion.div variants={staggerContainer} className='divide-y divide-slate-700'>
                      {resources.map((resource) => (
                        <motion.div key={resource.id} variants={fadeIn} className='py-3 flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            {resource.type === "PDF" ? <Book className='h-5 w-5 text-blue-400' /> : <Video className='h-5 w-5 text-blue-400' />}
                            <div>
                              <h4 className='font-medium text-slate-200'>{resource.title}</h4>
                              <p className='text-sm text-slate-400'>
                                {resource.type} · {resource.size}
                              </p>
                            </div>
                          </div>

                          {resource.downloadable && (
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-slate-700'>
                              <Download className='h-5 w-5' />
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Performance & Attendance */}
                <motion.div variants={fadeIn} className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-slate-800 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2'>
                      <CheckCircle className='h-5 w-5 text-blue-400' />
                      Attendance Record
                    </h3>
                    <div className='flex items-center gap-4'>
                      <div className='relative w-20 h-20'>
                        <svg className='w-full h-full' viewBox='0 0 36 36'>
                          <path
                            d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                            fill='none'
                            stroke='#334155'
                            strokeWidth='2'
                          />
                          <path
                            d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                            fill='none'
                            stroke='#3b82f6'
                            strokeWidth='2'
                            strokeDasharray='85, 100'
                          />
                        </svg>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white'>85%</div>
                      </div>
                      <div>
                        <p className='text-slate-400'>You've attended 17 out of 20 classes</p>
                        <p className='text-sm text-blue-400 mt-1'>Great attendance rate!</p>
                      </div>
                    </div>
                  </div>

                  <div className='bg-slate-800 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2'>
                      <Award className='h-5 w-5 text-blue-400' />
                      Performance
                    </h3>
                    <div className='space-y-3'>
                      <div>
                        <div className='flex justify-between text-sm mb-1'>
                          <span className='text-slate-400'>Participation</span>
                          <span className='text-blue-400'>Excellent</span>
                        </div>
                        <div className='h-2 bg-slate-700 rounded-full'>
                          <div className='h-2 bg-blue-500 rounded-full w-4/5'></div>
                        </div>
                      </div>
                      <div>
                        <div className='flex justify-between text-sm mb-1'>
                          <span className='text-slate-400'>Practical Exercises</span>
                          <span className='text-blue-400'>Good</span>
                        </div>
                        <div className='h-2 bg-slate-700 rounded-full'>
                          <div className='h-2 bg-blue-500 rounded-full w-3/5'></div>
                        </div>
                      </div>
                      <div>
                        <div className='flex justify-between text-sm mb-1'>
                          <span className='text-slate-400'>Assignments</span>
                          <span className='text-blue-400'>Excellent</span>
                        </div>
                        <div className='h-2 bg-slate-700 rounded-full'>
                          <div className='h-2 bg-blue-500 rounded-full w-4/5'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div variants={fadeIn} className='mt-8'>
                  <h3 className='text-xl font-semibold text-slate-200 mb-4'>Frequently Asked Questions</h3>
                  <div className='space-y-4'>
                    <div className='bg-slate-800 rounded-lg p-4'>
                      <h4 className='font-medium text-blue-400'>How do I change my registered class?</h4>
                      <p className='mt-2 text-slate-400'>You can cancel your registration up to 24 hours before the class starts. Go to "My Classes" section and select "Cancel Registration" next to the class you wish to change.</p>
                    </div>
                    <div className='bg-slate-800 rounded-lg p-4'>
                      <h4 className='font-medium text-blue-400'>What should I bring to offline classes?</h4>
                      <p className='mt-2 text-slate-400'>You should bring your laptop, notebook, and any course materials specified for that particular class. Check the class description for specific requirements.</p>
                    </div>
                    <div className='bg-slate-800 rounded-lg p-4'>
                      <h4 className='font-medium text-blue-400'>Are recordings available for missed classes?</h4>
                      <p className='mt-2 text-slate-400'>Yes, recordings are typically available within 48 hours after the class ends. You can find them in the "Class Resources" section.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {!loaded && (
                <div className='flex items-center justify-center h-64'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
}
