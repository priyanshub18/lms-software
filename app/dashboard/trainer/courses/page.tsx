"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, BarChart2, BookOpen, Clock, Edit, Eye, FileText, MessageSquare, PlusCircle, Search, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Enhanced course data for instructor dashboard
const demoData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    totalModules: 12,
    publishedModules: 12,
    draftModules: 0,
    enrolledStudents: 2453,
    activeStudents: 1845,
    averageRating: 4.7,
    totalHours: 24,
    lastUpdated: "2 days ago",
    completionRate: 68,
    questionsAnswered: 145,
    assignments: 8,
    quizzes: 12,
    discussions: 24,
    earnings: "$12,450",
    status: "Published",
    difficulty: "Beginner",
    image: "/web-dev-course.jpg",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    totalModules: 8,
    publishedModules: 6,
    draftModules: 2,
    enrolledStudents: 1872,
    activeStudents: 1241,
    averageRating: 4.9,
    totalHours: 36,
    lastUpdated: "Yesterday",
    completionRate: 45,
    questionsAnswered: 98,
    assignments: 12,
    quizzes: 8,
    discussions: 36,
    earnings: "$9,870",
    status: "Published",
    difficulty: "Advanced",
    image: "/js-advanced.jpg",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    totalModules: 10,
    publishedModules: 7,
    draftModules: 3,
    enrolledStudents: 3210,
    activeStudents: 2105,
    averageRating: 4.5,
    totalHours: 20,
    lastUpdated: "4 days ago",
    completionRate: 72,
    questionsAnswered: 210,
    assignments: 15,
    quizzes: 10,
    discussions: 42,
    earnings: "$15,280",
    status: "Published",
    difficulty: "Intermediate",
    image: "/uiux-design.jpg",
  },
  {
    id: 4,
    title: "React Framework Deep Dive",
    totalModules: 15,
    publishedModules: 8,
    draftModules: 7,
    enrolledStudents: 4125,
    activeStudents: 3250,
    averageRating: 4.8,
    totalHours: 42,
    lastUpdated: "1 week ago",
    completionRate: 38,
    questionsAnswered: 176,
    assignments: 18,
    quizzes: 15,
    discussions: 65,
    earnings: "$19,450",
    status: "Partially Published",
    difficulty: "Advanced",
    image: "/react-course.jpg",
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    totalModules: 20,
    publishedModules: 20,
    draftModules: 0,
    enrolledStudents: 2841,
    activeStudents: 1975,
    averageRating: 4.6,
    totalHours: 48,
    lastUpdated: "3 days ago",
    completionRate: 56,
    questionsAnswered: 320,
    assignments: 24,
    quizzes: 20,
    discussions: 48,
    earnings: "$16,890",
    status: "Published",
    difficulty: "Advanced",
    image: "/dsa-course.jpg",
  },
  {
    id: 6,
    title: "System Design for Frontend",
    totalModules: 8,
    publishedModules: 0,
    draftModules: 8,
    enrolledStudents: 0,
    activeStudents: 0,
    averageRating: 0,
    totalHours: 28,
    lastUpdated: "Yesterday",
    completionRate: 0,
    questionsAnswered: 0,
    assignments: 6,
    quizzes: 8,
    discussions: 0,
    earnings: "$0",
    status: "Draft",
    difficulty: "Intermediate",
    image: "/system-design.jpg",
  },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.1,
    },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function InstructorCoursePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate instructor statistics
  const totalStudents = demoData.reduce((acc, course) => acc + course.enrolledStudents, 0);
  const totalModules = demoData.reduce((acc, course) => acc + course.totalModules, 0);
  const publishedModules = demoData.reduce((acc, course) => acc + course.publishedModules, 0);
  const totalEarnings = demoData.reduce((acc, course) => acc + parseInt(course.earnings.replace(/[^0-9]/g, "")), 0);
  const averageRating = demoData.filter((course) => course.averageRating > 0).reduce((acc, course) => acc + course.averageRating, 0) / demoData.filter((course) => course.averageRating > 0).length;
  const totalQuestions = demoData.reduce((acc, course) => acc + course.questionsAnswered, 0);

  // Filter courses based on search query and status filter
  const filteredCourses = demoData.filter((course) => {
    const matchesSearch = searchQuery === "" || course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.status.toLowerCase().includes(searchQuery.toLowerCase()) || course.difficulty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || course.status.toLowerCase().includes(filterStatus.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "students") return b.enrolledStudents - a.enrolledStudents;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    if (sortBy === "earnings") return parseInt(b.earnings.replace(/[^0-9]/g, "")) - parseInt(a.earnings.replace(/[^0-9]/g, ""));
    if (sortBy === "completion") return b.completionRate - a.completionRate;
    return 0; // Default to order in array
  });

  // Format rating with stars
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className='flex items-center'>
        <span className='text-amber-500 mr-1'>{rating > 0 ? rating : "N/A"}</span>
        {rating > 0 && (
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <Award key={i} className={`h-3 w-3 ${i < fullStars ? "fill-amber-500 text-amber-500" : i === fullStars && hasHalfStar ? "fill-amber-500 text-amber-500 opacity-60" : "text-gray-300"}`} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // The content to be rendered inside the DashboardLayout
  const courseContent = (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-7xl mx-auto px-4 sm:px-6'>
      {/* Dashboard Header */}
      <motion.div className='mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4' variants={headerVariants} initial='hidden' animate='visible'>
        <div>
          <motion.h2 className='text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' whileHover={{ scale: 1.02 }}>
            Course Management
          </motion.h2>
          <motion.p className='text-gray-500 dark:text-gray-400' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Create, manage and monitor your courses
          </motion.p>
        </div>

        {/* <motion.div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto' variants={headerVariants}>
          <motion.div variants={buttonVariants} whileHover='hover' whileTap='tap'>
            <Button className='w-full sm:w-auto flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20' onClick={() => router.push("/dashboard/trainer/courses/create")}>
              <PlusCircle className='h-4 w-4' />
              <span>Create New Course</span>
            </Button>
          </motion.div>
        </motion.div> */}
      </motion.div>

      {/* Instructor Statistics */}
      <motion.div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
        <motion.div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Students</h3>
            <Users className='h-5 w-5 text-blue-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{totalStudents.toLocaleString()}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <span className='text-green-500'>+243</span> this month
          </div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Published Modules</h3>
            <BookOpen className='h-5 w-5 text-purple-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>
            <span>{publishedModules}</span>
            <span className='text-sm ml-1 font-normal text-gray-500'>/ {totalModules}</span>
          </p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <span className='text-amber-500'>{totalModules - publishedModules}</span> in draft
          </div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Average Rating</h3>
            <Award className='h-5 w-5 text-green-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{averageRating.toFixed(1)}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>From {totalQuestions} student reviews</div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Earnings</h3>
            <BarChart2 className='h-5 w-5 text-amber-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>${totalEarnings.toLocaleString()}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <span className='text-green-500'>+$2,450</span> this month
          </div>
        </motion.div>
      </motion.div>

      {/* Filter and Search */}
      <motion.div className='mb-6 flex flex-col sm:flex-row items-center justify-between gap-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='relative w-full sm:w-64'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <input type='text' placeholder='Search courses...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent' />
          </div>

          <div className='flex gap-2 w-full sm:w-auto'>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className='px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm flex-1 sm:flex-none'>
              <option value='all'>All Statuses</option>
              <option value='published'>Published</option>
              <option value='partially'>Partially Published</option>
              <option value='draft'>Draft</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm flex-1 sm:flex-none'>
              <option value='lastUpdated'>Recently Updated</option>
              <option value='students'>Most Students</option>
              <option value='rating'>Highest Rated</option>
              <option value='earnings'>Highest Earnings</option>
              <option value='completion'>Highest Completion</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' variants={containerVariants} initial='hidden' animate='visible'>
        {sortedCourses.map((course) => (
          <motion.div key={course.id} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm transition-all hover:shadow-xl'>
            {/* Course image with status badge */}
            <div className='relative h-36 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10' />
              <div className='absolute top-4 right-4 z-20'>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.status === "Published" ? "bg-green-100 text-green-800" : course.status === "Partially Published" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"}`}>{course.status}</span>
              </div>
              <div className='absolute bottom-4 left-4 z-20'>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.difficulty === "Beginner" ? "bg-green-100 text-green-800" : course.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{course.difficulty}</span>
              </div>
            </div>

            {/* Course card content */}
            <div className='p-5'>
              <div className='mb-3 flex items-center justify-between'>
                <span className='rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400'>
                  {course.publishedModules}/{course.totalModules} modules
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400 flex items-center'>
                  <Clock className='mr-1 h-3 w-3' />
                  {course.lastUpdated}
                </span>
              </div>

              <h3 className='mb-2 text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2'>{course.title}</h3>

              {/* Course stats */}
              <div className='grid grid-cols-2 gap-2 mb-4'>
                <div className='flex items-center text-xs text-gray-500 dark:text-gray-400'>
                  <Users className='mr-1 h-3 w-3' />
                  <span>{course.enrolledStudents.toLocaleString()} students</span>
                </div>
                <div className='flex items-center text-xs text-gray-500 dark:text-gray-400'>
                  <BarChart2 className='mr-1 h-3 w-3' />
                  <span>{course.completionRate}% completion</span>
                </div>
                <div className='flex items-center text-xs text-gray-500 dark:text-gray-400'>
                  <MessageSquare className='mr-1 h-3 w-3' />
                  <span>{course.questionsAnswered} questions</span>
                </div>
                <div className='flex items-center text-xs text-gray-500 dark:text-gray-400'>
                  <FileText className='mr-1 h-3 w-3' />
                  <span>{course.assignments} assignments</span>
                </div>
              </div>

              {/* Revenue and rating */}
              <div className='flex items-center justify-between mb-4'>
                {/* <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>{course.earnings}</div> */}
                <div className='flex items-center'>{renderRating(course.averageRating)}</div>
              </div>

              {/* Module status */}
              <div className='mb-5'>
                <div className='flex justify-between text-xs mb-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Modules Status</span>
                  <span className='text-gray-700 dark:text-gray-300'>
                    {course.publishedModules} published, {course.draftModules} drafts
                  </span>
                </div>
                <div className='h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                  <div className='h-full bg-green-500' style={{ width: `${(course.publishedModules / course.totalModules) * 100}%` }} />
                </div>
              </div>

              {/* Action buttons */}
              <div className='flex justify-between gap-2'>
                {/* <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex-1 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center' onClick={() => router.push(`/dashboard/trainer/courses/module`)}>
                  <Edit className='h-3.5 w-3.5 mr-1' />
                  Edit
                </motion.button> */}

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex-1 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex items-center justify-center' onClick={() => router.push(`/dashboard/trainer/courses/1`)}>
                  <Eye className='h-3.5 w-3.5 mr-1' />
                  Preview
                </motion.button>

                {/* <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex-1 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center'>
                  <Trash2 className='h-3.5 w-3.5 mr-1' />
                  Delete
                </motion.button> */}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <motion.div className='mt-16 flex flex-col items-center justify-center text-center' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div className='mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-6' whileHover={{ rotate: 360 }} transition={{ duration: 1, type: "spring" }}>
            <Search className='h-8 w-8 text-gray-400 dark:text-gray-500' />
          </motion.div>
          <motion.h3 className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-100' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            No courses found
          </motion.h3>
          <motion.p className='text-gray-500 dark:text-gray-400' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Try adjusting your search criteria
          </motion.p>
        </motion.div>
      )}

      {/* "Add New Course" Button at bottom */}
      {/* <motion.div className='mt-8 flex justify-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' className='py-2.5 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg flex items-center'>
          <PlusCircle className='mr-2 h-5 w-5' />
          Add New Course
        </motion.button>
      </motion.div> */}
    </motion.div>
  );

  // Wrap the course content in the DashboardLayout
  return <DashboardLayout userRole='trainer'>{courseContent}</DashboardLayout>;
}
