// import Link from "next/link"
// import { Clock, FileCheck, FileQuestion } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import DashboardLayout from "@/components/dashboard-layout"

// export default function AssessmentsPage() {
//   // Mock assessment data
//   const upcomingAssessments = [
//     {
//       id: 1,
//       title: "DSA Weekly Quiz",
//       course: "Data Structures & Algorithms",
//       dueDate: "2025-04-25",
//       type: "MCQ",
//       questions: 15,
//       duration: 30,
//     },
//     {
//       id: 2,
//       title: "System Design Case Study",
//       course: "System Design",
//       dueDate: "2025-04-28",
//       type: "Subjective",
//       questions: 5,
//       duration: 60,
//     },
//     {
//       id: 3,
//       title: "React Component Challenge",
//       course: "Frontend Development",
//       dueDate: "2025-04-30",
//       type: "Coding",
//       questions: 3,
//       duration: 90,
//     },
//   ]

//   const completedAssessments = [
//     {
//       id: 4,
//       title: "Introduction to Algorithms Quiz",
//       course: "Data Structures & Algorithms",
//       completedDate: "2025-04-15",
//       type: "MCQ",
//       score: 85,
//       totalQuestions: 10,
//     },
//     {
//       id: 5,
//       title: "Array Manipulation Challenge",
//       course: "Data Structures & Algorithms",
//       completedDate: "2025-04-10",
//       type: "Coding",
//       score: 90,
//       totalQuestions: 3,
//     },
//     {
//       id: 6,
//       title: "Database Design Exercise",
//       course: "System Design",
//       completedDate: "2025-04-05",
//       type: "Subjective",
//       score: 75,
//       totalQuestions: 5,
//     },
//   ]

//   return (
//     <DashboardLayout userRole="student">
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold">Assessments</h1>
//           <p className="text-muted-foreground">View and take your assessments</p>
//         </div>

//         <Tabs defaultValue="upcoming" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//             <TabsTrigger value="completed">Completed</TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming" className="space-y-4">
//             {upcomingAssessments.length === 0 ? (
//               <Card>
//                 <CardContent className="flex flex-col items-center justify-center py-10">
//                   <FileQuestion className="h-10 w-10 text-muted-foreground mb-4" />
//                   <p className="text-muted-foreground text-center">You don't have any upcoming assessments.</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {upcomingAssessments.map((assessment) => (
//                   <Card key={assessment.id}>
//                     <CardHeader className="pb-2">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle>{assessment.title}</CardTitle>
//                           <CardDescription>{assessment.course}</CardDescription>
//                         </div>
//                         <Badge
//                           variant={
//                             assessment.type === "MCQ"
//                               ? "default"
//                               : assessment.type === "Subjective"
//                                 ? "secondary"
//                                 : "outline"
//                           }
//                         >
//                           {assessment.type}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center">
//                           <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                           <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <FileQuestion className="mr-2 h-4 w-4 text-muted-foreground" />
//                           <span>
//                             {assessment.questions} questions ({assessment.duration} min)
//                           </span>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button className="w-full" asChild>
//                         <Link href={`/dashboard/student/assessments/${assessment.id}`}>Start Assessment</Link>
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="completed" className="space-y-4">
//             {completedAssessments.length === 0 ? (
//               <Card>
//                 <CardContent className="flex flex-col items-center justify-center py-10">
//                   <FileCheck className="h-10 w-10 text-muted-foreground mb-4" />
//                   <p className="text-muted-foreground text-center">You haven't completed any assessments yet.</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {completedAssessments.map((assessment) => (
//                   <Card key={assessment.id}>
//                     <CardHeader className="pb-2">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle>{assessment.title}</CardTitle>
//                           <CardDescription>{assessment.course}</CardDescription>
//                         </div>
//                         <Badge
//                           variant={
//                             assessment.type === "MCQ"
//                               ? "default"
//                               : assessment.type === "Subjective"
//                                 ? "secondary"
//                                 : "outline"
//                           }
//                         >
//                           {assessment.type}
//                         </Badge>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center">
//                           <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                           <span>Completed: {new Date(assessment.completedDate).toLocaleDateString()}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <FileCheck className="mr-2 h-4 w-4 text-muted-foreground" />
//                           <span>
//                             Score: {assessment.score}% ({(assessment.score * assessment.totalQuestions) / 100}/
//                             {assessment.totalQuestions})
//                           </span>
//                         </div>
//                       </div>
//                     </CardContent>
//                     <CardFooter>
//                       <Button variant="outline" className="w-full" asChild>
//                         <Link href={`/dashboard/student/assessments/${assessment.id}/review`}>View Results</Link>
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </DashboardLayout>
//   )
// }

"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, XCircle, ChevronRight, BarChart2, Award, TrendingUp, Sparkles, ArrowUp } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { motion } from "framer-motion";

// Sample assessment data
const assessmentData = {
  past: [
    { id: 1, title: "Quarterly Performance Review", score: 85, completed: "Apr 15, 2025", duration: "45 min", status: "Completed" },
    { id: 2, title: "Technical Skills Assessment", score: 92, completed: "Mar 28, 2025", duration: "60 min", status: "Completed" },
    { id: 3, title: "Leadership Evaluation", score: 78, completed: "Feb 10, 2025", duration: "30 min", status: "Completed" },
  ],
  upcoming: [
    { id: 4, title: "Annual Performance Review", scheduled: "May 10, 2025", duration: "60 min", status: "Scheduled" },
    { id: 5, title: "Project Management Skills", scheduled: "May 18, 2025", duration: "45 min", status: "Not Started" },
  ],
  stats: {
    averageScore: 85,
    completedCount: 3,
    upcomingCount: 2,
    improvementAreas: ["Communication", "Time Management"],
    strengths: ["Technical Knowledge", "Problem Solving"],
  },
};

// Card variants for animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Progress bar animation
const progressVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({ width: `${width}%`, transition: { duration: 1, ease: "easeOut" } }),
};

function AssessmentPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Set initial dark mode based on system preference and trigger animations
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Delay to ensure animations trigger after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Custom score color function
  const getScoreColor = (score: any) => {
    if (score >= 90) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 80) return "text-blue-500 dark:text-blue-400";
    if (score >= 70) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 pb-8'>
        {/* Header */}
        <header className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white py-6 px-6 shadow-lg'>
          <div className='flex justify-between items-center max-w-7xl mx-auto'>
            <div className='flex items-center space-x-2'>
              <Award className='h-8 w-8 text-yellow-300' />
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>Assessment Dashboard</h1>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className='hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5'>
              <span className='text-sm mr-2'>Overall Progress: </span>
              <span className='text-yellow-300 font-semibold'>Excellent</span>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className='container max-w-7xl mx-auto px-4 py-6'>
          {/* Stats Overview Cards */}
          <section className='mb-12'>
            <div className='flex items-center mb-6'>
              <h2 className='text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400'>Performance Overview</h2>
              <div className='ml-2 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300'>2025 Q2</div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Average Score Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 mr-3'>
                    <Award className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Average Score</h3>
                </div>
                <p className='text-4xl font-bold text-blue-600 dark:text-blue-400 flex items-baseline'>
                  {assessmentData.stats.averageScore}%
                  <span className='text-sm ml-2 text-green-500 flex items-center'>
                    <ArrowUp className='h-3 w-3 mr-0.5' /> 3%
                  </span>
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Compared to last quarter</p>
              </motion.div>

              {/* Completed Assessments Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-500 mr-3'>
                    <CheckCircle className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Completed</h3>
                </div>
                <p className='text-4xl font-bold text-green-600 dark:text-green-400'>{assessmentData.stats.completedCount}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>This quarter</p>
              </motion.div>

              {/* Upcoming Assessments Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.3 }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-500 mr-3'>
                    <Calendar className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Upcoming</h3>
                </div>
                <p className='text-4xl font-bold text-amber-600 dark:text-amber-400'>{assessmentData.stats.upcomingCount}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Next 30 days</p>
              </motion.div>

              {/* Improvement Areas Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.4 }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-500 mr-3'>
                    <TrendingUp className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Growth Areas</h3>
                </div>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {assessmentData.stats.improvementAreas.map((area, index) => (
                    <span key={index} className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs'>
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Past Assessments */}
          <section className='mb-12'>
            <h2 className='text-xl md:text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400'>Past Assessments</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {assessmentData.past.map((assessment, idx) => (
                <motion.div key={assessment.id} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group cursor-pointer' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                  <div className='bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 px-5 py-3 flex justify-between items-center'>
                    <h3 className='font-semibold text-white'>{assessment.title}</h3>
                    <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium'>{assessment.status}</span>
                  </div>
                  <div className='p-5'>
                    <div className='flex justify-between items-center mb-4'>
                      <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                        <Calendar size={16} className='mr-1.5 text-blue-500' />
                        <span>{assessment.completed}</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                        <Clock size={16} className='mr-1.5 text-blue-500' />
                        <span>{assessment.duration}</span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Score</p>
                        <p className={`text-3xl font-bold ${getScoreColor(assessment.score)}`}>{assessment.score}%</p>
                      </div>
                      <div className='bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full text-blue-600 dark:text-blue-400 transform transition-transform group-hover:translate-x-1'>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Upcoming Assessments */}
          <section className='mb-12'>
            <h2 className='text-xl md:text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400'>Upcoming Assessments</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {assessmentData.upcoming.map((assessment, idx) => (
                <motion.div key={assessment.id} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group cursor-pointer' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                  <div className='bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-600 dark:to-amber-700 px-5 py-3 flex justify-between items-center'>
                    <h3 className='font-semibold text-white'>{assessment.title}</h3>
                    <span className='bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium'>{assessment.status}</span>
                  </div>
                  <div className='p-5'>
                    <div className='flex justify-between items-center mb-4'>
                      <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                        <Calendar size={16} className='mr-1.5 text-amber-500' />
                        <span>{assessment.scheduled}</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                        <Clock size={16} className='mr-1.5 text-amber-500' />
                        <span>{assessment.duration}</span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <motion.button className='px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Prepare Now
                      </motion.button>
                      <div className='bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full text-blue-600 dark:text-blue-400 transform transition-transform group-hover:translate-x-1'>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Performance Analytics */}
          <section>
            <h2 className='text-xl md:text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400'>Performance Analysis</h2>
            <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 overflow-hidden' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.6 }}>
              <div className='mb-8'>
                <h3 className='font-semibold mb-5 flex items-center text-lg'>
                  <div className='p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 mr-2'>
                    <BarChart2 size={18} />
                  </div>
                  Performance Breakdown
                </h3>
                <div className='space-y-5'>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='font-medium'>Technical Knowledge</span>
                      <span className='font-bold text-green-600 dark:text-green-400'>92%</span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                      <motion.div className='bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full' custom={92} initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={progressVariants}></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='font-medium'>Problem Solving</span>
                      <span className='font-bold text-blue-600 dark:text-blue-400'>88%</span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                      <motion.div className='bg-gradient-to-r from-blue-400 to-blue-500 h-2.5 rounded-full' custom={88} initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={progressVariants}></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='font-medium'>Communication</span>
                      <span className='font-bold text-yellow-600 dark:text-yellow-400'>75%</span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                      <motion.div className='bg-gradient-to-r from-yellow-400 to-yellow-500 h-2.5 rounded-full' custom={75} initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={progressVariants}></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='font-medium'>Time Management</span>
                      <span className='font-bold text-amber-600 dark:text-amber-400'>70%</span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                      <motion.div className='bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full' custom={70} initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={progressVariants}></motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='font-semibold mb-5 flex items-center text-lg'>
                  <div className='p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-500 mr-2'>
                    <Sparkles size={18} />
                  </div>
                  Key Strengths
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {assessmentData.stats.strengths.map((strength, index) => (
                    <motion.span key={index} className='px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800/30 shadow-sm' initial={{ opacity: 0, x: -20 }} animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}>
                      {strength}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default AssessmentPage;
