"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, BookOpen, ChevronRight, Users, Plus } from "lucide-react";
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
      <motion.div initial='initial' animate='animate' variants={staggerContainer} className='space-y-8 max-w-7xl mx-auto '>
        <motion.div variants={fadeInUp} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Welcome back, Jane</h1>
            <p className='text-slate-500 dark:text-slate-400 mt-2 text-lg'>Monitor your courses and student performance</p>
          </div>
          <Button size='lg' className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300' asChild>
            <Link href='/dashboard/trainer/courses/create'>
              <Plus size={18} className='mr-2' />
              Create New Course
            </Link>
          </Button>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full'>
              <CardHeader className='bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 pb-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-600 rounded-lg text-white'>
                    <Users className='h-5 w-5' />
                  </div>
                  <CardTitle className='text-xl font-semibold'>Total Students</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-4xl font-bold text-slate-800 dark:text-slate-200'>105</span>
                  <span className='text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 flex items-center'>+12% this month</span>
                </div>
                <p className='text-sm text-slate-500 dark:text-slate-400 mt-3'>Across all your active courses</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full'>
              <CardHeader className='bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 pb-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-600 rounded-lg text-white'>
                    <BookOpen className='h-5 w-5' />
                  </div>
                  <CardTitle className='text-xl font-semibold'>Active Courses</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-4xl font-bold text-slate-800 dark:text-slate-200'>3</span>
                  <span className='text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1 flex items-center'>All Running</span>
                </div>
                <p className='text-sm text-slate-500 dark:text-slate-400 mt-3'>Successfully progressing courses</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full'>
              <CardHeader className='bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 pb-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-600 rounded-lg text-white'>
                    <BarChart3 className='h-5 w-5' />
                  </div>
                  <CardTitle className='text-xl font-semibold'>Avg. Completion</CardTitle>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-4xl font-bold text-slate-800 dark:text-slate-200'>61.7%</span>
                  <span className='text-sm font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30 rounded-full px-3 py-1 flex items-center'>Moderate</span>
                </div>
                <p className='text-sm text-slate-500 dark:text-slate-400 mt-3'>Course completion percentage</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          <motion.div variants={fadeInUp} className='md:col-span-2'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden'>
              <CardHeader className='bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border-b border-slate-200 dark:border-slate-700'>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='text-2xl font-semibold'>My Courses</CardTitle>
                    <CardDescription className='text-slate-600 dark:text-slate-400 mt-1'>Progress overview of your courses</CardDescription>
                  </div>
                  <Button variant='outline' size='sm' className='border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400' asChild>
                    <Link href='/dashboard/trainer/courses'>
                      View All
                      <ChevronRight size={16} className='ml-1' />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='pt-6'>
                <motion.div variants={staggerContainer} initial='initial' animate='animate' className='space-y-6 '>
                  {courses.map((course, index) => (
                    <motion.div key={course.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='group relative bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300'>
                      <div className='flex items-center justify-between mb-4'>
                        <div>
                          <h3 className='font-bold text-xl text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>{course.title}</h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <Users className='h-4 w-4 text-slate-500' />
                            <p className='text-sm text-slate-600 dark:text-slate-400'>{course.students} students enrolled</p>
                          </div>
                        </div>
                        <div className={`text-sm font-medium px-3 py-1.5 rounded-full ${course.avgProgress >= 70 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : course.avgProgress >= 50 ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}>{course.avgProgress}% complete</div>
                      </div>
                      <div className='relative mb-4'>
                        <Progress value={course.avgProgress} className={`h-2.5 rounded-full ${course.avgProgress >= 70 ? "bg-green-100 dark:bg-green-900/30" : course.avgProgress >= 50 ? "bg-blue-100 dark:bg-blue-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`} />
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='text-xs text-slate-500 dark:text-slate-400'>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</p>
                        <Link href={`/dashboard/trainer/courses/${course.id}`} className='text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center font-medium group-hover:underline'>
                          View details <ChevronRight size={16} className='ml-1' />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className='md:col-span-1'>
            <Card className='shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full'>
              <Tabs defaultValue='assessments' className='h-full flex flex-col'>
                <CardHeader className='bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border-b border-slate-200 dark:border-slate-700'>
                  <div className='flex items-center justify-between mb-2'>
                    <CardTitle className='text-2xl font-semibold'>Performance</CardTitle>
                    <TabsList className='grid grid-cols-2 bg-slate-200/80 dark:bg-slate-700/80 p-1 rounded-lg'>
                      <TabsTrigger value='assessments' className='text-sm rounded-md'>
                        Assessments
                      </TabsTrigger>
                      <TabsTrigger value='students' className='text-sm rounded-md'>
                        At Risk
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription className='text-slate-600 dark:text-slate-400'>Review results and student progress</CardDescription>
                </CardHeader>
                <CardContent className='pt-6 flex-grow overflow-auto'>
                  <TabsContent value='assessments' className='space-y-4 mt-0 h-full'>
                    <motion.div variants={staggerContainer} initial='initial' animate='animate'>
                      {recentAssessments.map((assessment, index) => (
                        <motion.div key={assessment.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300'>
                          <h3 className='font-bold text-slate-800 dark:text-slate-200'>{assessment.title}</h3>
                          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1'>{assessment.course}</p>
                          <div className='flex items-center justify-between mt-3'>
                            <span className='text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-slate-600 dark:text-slate-300'>{assessment.submissions} submissions</span>
                            <span className={`text-xs rounded-full px-2.5 py-1 font-medium ${assessment.avgScore >= 80 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : assessment.avgScore >= 65 ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}>Avg: {assessment.avgScore}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  <TabsContent value='students' className='space-y-4 mt-0 h-full'>
                    <motion.div variants={staggerContainer} initial='initial' animate='animate'>
                      {lowPerformingStudents.map((student, index) => (
                        <motion.div key={student.id} variants={fadeInUp} transition={{ delay: index * 0.1 }} className='bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 mb-4 relative overflow-hidden'>
                          <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-red-500'></div>
                          <h3 className='font-bold text-slate-800 dark:text-slate-200 pl-2'>{student.name}</h3>
                          <p className='text-sm text-slate-600 dark:text-slate-400 mt-1 pl-2'>{student.course}</p>
                          <div className='flex items-center justify-between mt-3 pl-2'>
                            <div>
                              <Progress value={student.progress} className='h-2 w-24 bg-slate-200 dark:bg-slate-700' />
                              <span className='text-xs text-slate-500 dark:text-slate-400 mt-1 block'>{student.progress}% progress</span>
                            </div>
                            <span className='text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2.5 py-1 font-medium'>Attention Needed</span>
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
