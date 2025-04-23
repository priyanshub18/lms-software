"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, BookOpen, ChevronRight, Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

export default function TrainerDashboardPage() {
  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      students: 45,
      avgProgress: 68,
      lastUpdated: "2025-04-18",
    },
    {
      id: 2,
      title: "System Design",
      students: 32,
      avgProgress: 42,
      lastUpdated: "2025-04-20",
    },
    {
      id: 3,
      title: "Frontend Development",
      students: 28,
      avgProgress: 75,
      lastUpdated: "2025-04-21",
    },
  ];

  const recentAssessments = [
    {
      id: 1,
      title: "DSA Mid-term",
      course: "Data Structures & Algorithms",
      submissions: 42,
      avgScore: 78,
    },
    {
      id: 2,
      title: "Database Design Quiz",
      course: "System Design",
      submissions: 30,
      avgScore: 65,
    },
    {
      id: 3,
      title: "JavaScript Challenge",
      course: "Frontend Development",
      submissions: 25,
      avgScore: 82,
    },
  ];

  const lowPerformingStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      course: "Data Structures & Algorithms",
      progress: 35,
      lastActive: "2025-04-15",
    },
    {
      id: 2,
      name: "Maria Garcia",
      course: "System Design",
      progress: 28,
      lastActive: "2025-04-19",
    },
    {
      id: 3,
      name: "Raj Patel",
      course: "Frontend Development",
      progress: 40,
      lastActive: "2025-04-20",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DashboardLayout userRole='trainer'>
      <motion.div initial='initial' animate='animate' variants={staggerContainer} className='space-y-6'>
        <motion.div variants={fadeInUp} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-semibold tracking-tight'>Welcome back, Jane</h1>
            <p className='text-muted-foreground'>Monitor your courses and student performance</p>
          </div>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white' asChild>
            <Link href='/dashboard/trainer/courses/create'>
              <span className='flex items-center gap-2'>
                Create Course <ChevronRight size={16} />
              </span>
            </Link>
          </Button>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-md border-0 overflow-hidden h-full'>
              <CardHeader className='bg-blue-50 dark:bg-blue-950 border-b pb-3'>
                <div className='flex items-center gap-2'>
                  <Users className='h-5 w-5 text-blue-600' />
                  <CardTitle className='text-lg font-medium'>Total Students</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold'>105</span>
                  <span className='text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 rounded-full px-2 py-1'>+12% this month</span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>Across all your active courses</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-md border-0 overflow-hidden h-full'>
              <CardHeader className='bg-blue-50 dark:bg-blue-950 border-b pb-3'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='h-5 w-5 text-blue-600' />
                  <CardTitle className='text-lg font-medium'>Active Courses</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold'>3</span>
                  <span className='text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 rounded-full px-2 py-1'>All Running</span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>Successfully progressing courses</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-md border-0 overflow-hidden h-full'>
              <CardHeader className='bg-blue-50 dark:bg-blue-950 border-b pb-3'>
                <div className='flex items-center gap-2'>
                  <BarChart3 className='h-5 w-5 text-blue-600' />
                  <CardTitle className='text-lg font-medium'>Avg. Completion</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-bold'>61.7%</span>
                  <span className='text-sm font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30 rounded-full px-2 py-1'>Moderate</span>
                </div>
                <p className='text-sm text-muted-foreground mt-2'>Course completion percentage</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <motion.div variants={fadeInUp} className='md:col-span-2'>
            <Card className='shadow-md border-0 overflow-hidden'>
              <CardHeader className='bg-blue-50 dark:bg-blue-950 border-b'>
                <CardTitle className='text-lg font-medium'>My Courses</CardTitle>
                <CardDescription>Progress overview of your courses</CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <motion.div variants={staggerContainer} initial='initial' animate='animate' className='space-y-6'>
                  {courses.map((course, index) => (
                    <motion.div key={course.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='group relative space-y-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg hover:shadow-md transition-all duration-200'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h3 className='font-medium text-lg text-blue-700 dark:text-blue-400'>{course.title}</h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <Users className='h-4 w-4 text-slate-500' />
                            <p className='text-sm text-slate-600 dark:text-slate-400'>{course.students} students enrolled</p>
                          </div>
                        </div>
                        <span className='text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full'>{course.avgProgress}% complete</span>
                      </div>
                      <div className='relative'>
                        <Progress value={course.avgProgress} className='h-2 bg-slate-200 dark:bg-slate-700' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs text-slate-500 dark:text-slate-400'>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</p>
                        <Link href={`/dashboard/trainer/courses/${course.id}`} className='text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center'>
                          View details <ChevronRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-md border-0 overflow-hidden h-full'>
              <Tabs defaultValue='assessments' className='h-full flex flex-col'>
                <CardHeader className='bg-blue-50 dark:bg-blue-950 border-b'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-lg font-medium'>Performance</CardTitle>
                    <TabsList className='grid grid-cols-2 h-8'>
                      <TabsTrigger value='assessments' className='text-xs'>
                        Assessments
                      </TabsTrigger>
                      <TabsTrigger value='students' className='text-xs'>
                        At Risk
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription>Review assessment results and student performance</CardDescription>
                </CardHeader>
                <CardContent className='pt-6 flex-grow overflow-auto'>
                  <TabsContent value='assessments' className='space-y-4 mt-0 h-full'>
                    <motion.div variants={staggerContainer} initial='initial' animate='animate'>
                      {recentAssessments.map((assessment, index) => (
                        <motion.div key={assessment.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='bg-slate-50 dark:bg-slate-900 p-3 rounded-lg mb-3 hover:shadow-sm transition-all duration-200'>
                          <h3 className='font-medium text-blue-700 dark:text-blue-400'>{assessment.title}</h3>
                          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>{assessment.course}</p>
                          <div className='flex items-center justify-between text-xs mt-2'>
                            <span className='text-slate-500 dark:text-slate-400'>{assessment.submissions} submissions</span>
                            <span className='rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1'>Avg: {assessment.avgScore}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  <TabsContent value='students' className='space-y-4 mt-0 h-full'>
                    <motion.div variants={staggerContainer} initial='initial' animate='animate'>
                      {lowPerformingStudents.map((student, index) => (
                        <motion.div key={student.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='bg-slate-50 dark:bg-slate-900 p-3 rounded-lg mb-3 border-l-4 border-red-500 hover:shadow-sm transition-all duration-200'>
                          <h3 className='font-medium'>{student.name}</h3>
                          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>{student.course}</p>
                          <div className='flex items-center justify-between text-xs mt-2'>
                            <span className='text-slate-500 dark:text-slate-400'>Progress: {student.progress}%</span>
                            <span className='rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1'>Attention Needed</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
