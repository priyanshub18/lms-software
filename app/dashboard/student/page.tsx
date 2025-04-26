"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Search, Clock, ChevronRight, Book, Users, Star, Award, BarChart2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Enhanced course data with more statistics
const demoData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    totalModules: 12,
    completedModules: 9,
    progress: 75,
    lastAccessed: "2 days ago",
    instructor: "Alex Johnson",
    enrolledStudents: 2453,
    averageRating: 4.7,
    totalHours: 24,
    completedHours: 18,
    difficulty: "Beginner",
    certificate: true,
    image: "/web-dev-course.jpg",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    totalModules: 8,
    completedModules: 3,
    progress: 45,
    lastAccessed: "Yesterday",
    instructor: "Maria Garcia",
    enrolledStudents: 1872,
    averageRating: 4.9,
    totalHours: 36,
    completedHours: 16,
    difficulty: "Advanced",
    certificate: true,
    image: "/js-advanced.jpg",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    totalModules: 10,
    completedModules: 2,
    progress: 20,
    lastAccessed: "4 days ago",
    instructor: "James Smith",
    enrolledStudents: 3210,
    averageRating: 4.5,
    totalHours: 20,
    completedHours: 4,
    difficulty: "Intermediate",
    certificate: true,
    image: "/uiux-design.jpg",
  },
  {
    id: 4,
    title: "React Framework Deep Dive",
    totalModules: 15,
    completedModules: 1,
    progress: 10,
    lastAccessed: "1 week ago",
    instructor: "Sarah Chen",
    enrolledStudents: 4125,
    averageRating: 4.8,
    totalHours: 42,
    completedHours: 4,
    difficulty: "Advanced",
    certificate: true,
    image: "/react-course.jpg",
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    totalModules: 20,
    completedModules: 12,
    progress: 60,
    lastAccessed: "3 days ago",
    instructor: "Michael Brown",
    enrolledStudents: 2841,
    averageRating: 4.6,
    totalHours: 48,
    completedHours: 28,
    difficulty: "Advanced",
    certificate: true,
    image: "/dsa-course.jpg",
  },
  {
    id: 6,
    title: "System Design for Frontend",
    totalModules: 8,
    completedModules: 0,
    progress: 0,
    lastAccessed: "New",
    instructor: "Emily Taylor",
    enrolledStudents: 1250,
    averageRating: 4.9,
    totalHours: 28,
    completedHours: 0,
    difficulty: "Intermediate",
    certificate: true,
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

const progressVariants = {
  initial: { width: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 1, ease: "easeOut" },
  }),
};

export default function CoursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("lastAccessed");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredCourses = searchQuery ? demoData.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) || course.difficulty.toLowerCase().includes(searchQuery.toLowerCase())) : demoData;

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    if (sortBy === "modules") return b.totalModules - a.totalModules;
    return 0; // Default to order in array
  });

  // Format rating with stars
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className='flex items-center'>
        <span className='text-amber-500 mr-1'>{rating}</span>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < fullStars ? "fill-amber-500 text-amber-500" : i === fullStars && hasHalfStar ? "fill-amber-500 text-amber-500 opacity-60" : "text-gray-300"}`} />
          ))}
        </div>
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
            My Learning Dashboard
          </motion.h2>
          <motion.p className='text-gray-500 dark:text-gray-400' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Track your progress and continue where you left off
          </motion.p>
        </div>

        <motion.div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto' variants={headerVariants}>
          <div className='relative w-full md:w-64'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <input type='text' placeholder='Search courses...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent' />
          </div>

          <div className='flex gap-2'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm'>
              <option value='lastAccessed'>Recently Accessed</option>
              <option value='progress'>Progress</option>
              <option value='rating'>Rating</option>
              <option value='modules'>Most Content</option>
            </select>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20'>
                <PlusCircle className='h-4 w-4' />
                <span>Add Course</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Learning Progress Summary */}
      <motion.div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <motion.div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Active Courses</h3>
            <Book className='h-5 w-5 text-blue-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{demoData.length}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <span className='text-green-500'>+2</span> this month
          </div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Average Progress</h3>
            <BarChart2 className='h-5 w-5 text-purple-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{Math.round(demoData.reduce((acc, course) => acc + course.progress, 0) / demoData.length)}%</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
            <span className='text-green-500'>+5%</span> from last week
          </div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Completed Modules</h3>
            <Award className='h-5 w-5 text-green-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{demoData.reduce((acc, course) => acc + course.completedModules, 0)}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>Out of {demoData.reduce((acc, course) => acc + course.totalModules, 0)} total</div>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Learning Hours</h3>
            <Clock className='h-5 w-5 text-amber-500' />
          </div>
          <p className='text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100'>{demoData.reduce((acc, course) => acc + course.completedHours, 0)}</p>
          <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>Out of {demoData.reduce((acc, course) => acc + course.totalHours, 0)} hours</div>
        </motion.div>
      </motion.div>

      {/* Course Grid */}
      <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' variants={containerVariants} initial='hidden' animate='visible'>
        {sortedCourses.map((course) => (
          <motion.div key={course.id} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.2 } }} className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-sm transition-all hover:shadow-xl'>
            {/* Course image - using placeholder if real image not available */}
            <div className='relative h-48 w-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10' />
              <div className='absolute bottom-4 left-4 z-20'>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.difficulty === "Beginner" ? "bg-green-100 text-green-800" : course.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{course.difficulty}</span>
                {course.certificate && <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>Certificate</span>}
              </div>
            </div>

            {/* Progress indicator */}
            <div className='absolute inset-x-0 bottom-0 h-1.5 bg-gray-100 dark:bg-gray-700'>
              <motion.div className='h-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500' variants={progressVariants} initial='initial' animate='animate' custom={course.progress} />
            </div>

            {/* Course card content */}
            <div className='p-6'>
              <motion.div className='mb-4 flex items-center justify-between' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <span className='rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400'>
                  {course.completedModules}/{course.totalModules} modules
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400 flex items-center'>
                  <Clock className='mr-1 h-3 w-3' />
                  {course.lastAccessed}
                </span>
              </motion.div>

              <motion.h3 className='mb-2 text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2' whileHover={{ x: 5 }}>
                {course.title}
              </motion.h3>

              <div className='mb-4 flex items-center text-xs text-gray-500 dark:text-gray-400'>
                <Users className='mr-1 h-3 w-3' />
                <span className='mr-3'>{course.enrolledStudents.toLocaleString()} students</span>
                {renderRating(course.averageRating)}
              </div>

              <div className='mb-2 text-xs text-gray-600 dark:text-gray-300'>
                <span className='font-medium'>Instructor:</span> {course.instructor}
              </div>

              {/* Learning hours */}
              <div className='mb-4 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300'>
                <span>
                  {course.completedHours} of {course.totalHours} hours completed
                </span>
                <span>{Math.round((course.completedHours / course.totalHours) * 100)}%</span>
              </div>

              {/* Time indicator bar */}
              <div className='mb-4 h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                <div className='h-full bg-gradient-to-r from-green-500 to-emerald-500' style={{ width: `${(course.completedHours / course.totalHours) * 100}%` }} />
              </div>

              <div className='mt-4 flex items-center justify-between'>
                <div className='text-sm text-gray-500 dark:text-gray-400'>{course.progress}% overall progress</div>

                <motion.button whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }} className='flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-500 dark:hover:text-blue-300'>
                  Continue
                  <ChevronRight className='ml-1 h-4 w-4' />
                </motion.button>
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
    </motion.div>
  );

  // Wrap the course content in the DashboardLayout
  return <DashboardLayout userRole='student'>{courseContent}</DashboardLayout>;
}
