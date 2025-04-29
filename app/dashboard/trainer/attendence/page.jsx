"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ArrowUpRight, Award, BookOpen, BarChart, Star, CheckCircle, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

// Mock data for demonstration purposes
const mockCourses = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build modern web applications",
    coverImage: "/api/placeholder/400/200",
    category: "Web Development",
    startDate: "2025-01-15",
    endDate: "2025-05-15",
    nextSession: "2025-04-28T09:00:00",
    nextSessionEndingTime: "2025-04-28T10:00:00",
    totalStudents: 32,
    attendanceRate: 87,
    difficulty: "Medium",
    completionRate: 65,
    totalSessions: 24,
    completedSessions: 16,
    popularity: 4.7,
    color: "blue",
  },
  {
    id: "2",
    title: "Advanced JavaScript Patterns",
    description: "Master advanced JavaScript concepts and design patterns",
    coverImage: "/api/placeholder/400/200",
    category: "Programming",
    startDate: "2025-02-10",
    endDate: "2025-06-10",
    nextSession: "2025-04-28T12:00:00",
    nextSessionEndingTime: "2025-04-28T13:00:00",
    totalStudents: 24,
    attendanceRate: 92,
    difficulty: "Hard",
    completionRate: 58,
    totalSessions: 20,
    completedSessions: 12,
    popularity: 4.9,
    color: "purple",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Create intuitive user interfaces with modern design principles",
    coverImage: "/api/placeholder/400/200",
    category: "Design",
    startDate: "2025-01-20",
    endDate: "2025-05-20",
    nextSession: "2025-04-29T14:00:00",
    nextSessionEndingTime: "2025-04-29T15:00:00",
    totalStudents: 28,
    attendanceRate: 85,
    difficulty: "Easy",
    completionRate: 72,
    totalSessions: 16,
    completedSessions: 12,
    popularity: 4.5,
    color: "pink",
  },
  {
    id: "4",
    title: "Data Structures and Algorithms",
    description: "Build a strong foundation in computer science fundamentals",
    coverImage: "/api/placeholder/400/200",
    category: "Computer Science",
    startDate: "2025-03-01",
    endDate: "2025-07-01",
    nextSession: "2025-04-30T10:00:00",
    nextSessionEndingTime: "2025-04-30T11:00:00",
    totalStudents: 40,
    attendanceRate: 78,
    difficulty: "Hard",
    completionRate: 45,
    totalSessions: 30,
    completedSessions: 14,
    popularity: 4.8,
    color: "green",
  },
];

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Helper function to get time from datetime
const formatTime = (dateTimeString) => {
  try {
    // Ensure the date string is in a valid format
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateTimeString);
      return 'Invalid time';
    }
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time';
  }
};

// Helper function to check if a session is today
const isToday = (dateTimeString) => {
  const sessionDate = new Date(dateTimeString);
  const today = new Date();
  return sessionDate.getDate() === today.getDate() && sessionDate.getMonth() === today.getMonth() && sessionDate.getFullYear() === today.getFullYear();
};

const AttendanceDashboard = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);

  useEffect(() => {
    // Sort courses by next session time
    const sortedCourses = [...mockCourses].sort((a, b) => {
      return new Date(a.nextSession) - new Date(b.nextSession);
    });

    // Filter courses for today and upcoming
    const today = [];
    const upcoming = [];

    sortedCourses.forEach((course) => {
      if (isToday(course.nextSession)) {
        today.push(course);
      } else {
        upcoming.push(course);
      }
    });

    setTodayCourses(today);
    setUpcomingCourses(upcoming);
    setCourses(sortedCourses);
  }, []);

  const navigateToCourse = (courseId) => {
    router.push(`/dashboard/trainer/attendence/course/${courseId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  // Function to determine difficulty badge styles
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return {
          icon: <CheckCircle className='w-4 h-4 mr-1' />,
          classes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      case "Medium":
        return {
          icon: <Star className='w-4 h-4 mr-1' />,
          classes: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      case "Hard":
        return {
          icon: <AlertTriangle className='w-4 h-4 mr-1' />,
          classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        };
      default:
        return {
          icon: <Star className='w-4 h-4 mr-1' />,
          classes: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        };
    }
  };

  // Function to get card gradient based on course color
  const getCardGradient = (color) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800";
      case "purple":
        return "from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800";
      case "pink":
        return "from-pink-500 to-rose-600 dark:from-pink-700 dark:to-rose-800";
      case "green":
        return "from-green-500 to-emerald-600 dark:from-green-700 dark:to-emerald-800";
      default:
        return "from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800";
    }
  };

  // Course card component - enhanced design
  const CourseCard = ({ course }) => {
    const difficultyBadge = getDifficultyBadge(course.difficulty);
    const gradient = getCardGradient(course.color);

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{ scale: 0.98 }}
        className='rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer transform transition-all'
        onClick={() => navigateToCourse(course.id)}
      >
        {/* Header with gradient background */}
        <div className={`bg-gradient-to-r ${gradient} p-6 relative overflow-hidden`}>
          <div className='absolute top-0 right-0 w-32 h-32 bg-white dark:bg-gray-900 opacity-10 rounded-full -mt-10 -mr-10'></div>
          <div className='absolute bottom-0 left-0 w-24 h-24 bg-white dark:bg-gray-900 opacity-10 rounded-full -mb-10 -ml-10'></div>

          <div className='flex justify-between items-start'>
            <div>
              <span className='text-xs font-medium text-white bg-white bg-opacity-20 dark:bg-opacity-30 rounded-full px-3 py-1 inline-flex items-center'>{course.category}</span>
              <h3 className='text-xl font-bold text-white mt-2 mb-1'>{course.title}</h3>
              <p className='text-white text-opacity-80 text-sm line-clamp-2'>{course.description}</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-md'>
                <span className='text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'>{Math.round(course.attendanceRate)}%</span>
              </div>
              <span className='text-xs text-white text-opacity-90 mt-1'>Attendance</span>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex items-center justify-between mb-1'>
              <span className='text-xs font-medium text-white text-opacity-90'>Average Attendance</span>
              <span className='text-xs font-medium text-white text-opacity-90'>{course.completionRate}%</span>
            </div>
            <div className='w-full bg-white bg-opacity-30 rounded-full h-1.5'>
              <div className='bg-white h-1.5 rounded-full' style={{ width: `${course.completionRate}%` }}></div>
            </div>
          </div>
        </div>

        {/* Course details */}
        <div className='p-6'>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Date</span>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 text-gray-500 dark:text-gray-400 mr-1' />
                <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>{formatDate(course.nextSession)}</span>
              </div>
            </div>

            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Next Session</span>
              <div className='flex items-center'>
                <Clock className='w-4 h-4 text-gray-500 dark:text-gray-400 mr-1' />
                <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>{formatTime(course.nextSession)}-{formatTime(course.nextSessionEndingTime)}</span>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-2'>
            <div className='flex items-center'>
              <Users className='w-4 h-4 text-gray-500 dark:text-gray-400 mr-1' />
              <span className='text-sm text-gray-700 dark:text-gray-300'>{course.totalStudents} Students</span>
            </div>

            <div className='flex items-center'>
              <span
                className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mr-2 ml-auto 
                            bg-opacity-80 dark:bg-opacity-70 shadow-sm
                            ${difficultyBadge.classes}'
              >
                {course.completedSessions}/{course.totalSessions} Sessions
              </span>

              <div className='bg-blue-50 dark:bg-blue-900 p-2 rounded-full shadow-inner'>
                <ArrowUpRight className='w-4 h-4 text-blue-600 dark:text-blue-300' />
              </div>
            </div>
          </div>
        </div>

        {/* Duration tag */}
        {/* <div className='absolute top-0 right-0 mt-6 mr-6'>
          <div className='flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-30 text-white'>
            <span>
              {difficultyBadge.icon}
              {course.difficulty}
            </span>
          </div>
        </div> */}
      </motion.div>
    );
  };

  // Section renderer with enhanced styling
  const renderCourseSection = (title, courseList, icon, description) => (
    <div className='mb-12'>
      <div className='flex items-center mb-2'>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${title.includes("Today") ? "from-red-500 to-orange-500" : "from-blue-500 to-indigo-500"} text-white`}>{icon}</div>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white ml-3'>{title}</h2>
      </div>

      <p className='text-gray-600 dark:text-gray-400 mb-6 ml-11 text-sm'>{description}</p>

      {courseList.length > 0 ? (
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      ) : (
        <div className='bg-gray-50 dark:bg-gray-800/50 rounded-xl p-10 text-center'>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Calendar className='w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-700 dark:text-gray-300 mb-2'>No courses scheduled</h3>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>There are no {title.toLowerCase()} at the moment.</p>
          </motion.div>
        </div>
      )}
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-black px-6 py-10'>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className='max-w-7xl mx-auto'>
        {/* Header with glass effect */}
        <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-2xl p-8 mb-10 shadow-xl'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-20 -mr-20'></div>
          <div className='absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -mb-32 -ml-32'></div>

          <div className='flex flex-col md:flex-row justify-between items-start md:items-end'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Attendance Dashboard</h1>
              <p className='text-blue-100 text-opacity-90 max-w-2xl'>Monitor your course attendance, track student progress, and manage your teaching schedule all in one place.</p>
            </div>

            <div className='mt-4 md:mt-0'>
              <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white backdrop-blur-sm'>
                <Award className='w-5 h-5 mr-2' />
                Instructor View
              </span>
            </div>
          </div>

          {/* Stats cards with glass effect */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
            <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 flex items-center shadow-lg'>
              <div className='bg-white p-3 rounded-xl mr-4'>
                <BookOpen className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <div className='text-blue-100 text-sm'>Active Courses</div>
                <div className='text-2xl font-bold text-white'>{courses.length}</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 flex items-center shadow-lg'>
              <div className='bg-white p-3 rounded-xl mr-4'>
                <Users className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <div className='text-blue-100 text-sm'>Total Students</div>
                <div className='text-2xl font-bold text-white'>{courses.reduce((sum, course) => sum + course.totalStudents, 0)}</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} className='bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 flex items-center shadow-lg'>
              <div className='bg-white p-3 rounded-xl mr-4'>
                <BarChart className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <div className='text-blue-100 text-sm'>Avg. Attendance</div>
                <div className='text-2xl font-bold text-white'>{Math.round(courses.reduce((sum, course) => sum + course.attendanceRate, 0) / Math.max(1, courses.length))}%</div>
              </div>
            </motion.div>
          </div>
        </div>

        {renderCourseSection("Today's Classes", todayCourses, <Calendar className='w-5 h-5' />, "Classes scheduled for today are shown here, ordered by time. Track attendance and manage your day efficiently.")}

        {renderCourseSection("Upcoming Classes", upcomingCourses, <Clock className='w-5 h-5' />, "Future classes are shown here in chronological order. Plan ahead and prepare your teaching materials.")}
      </motion.div>
    </div>
  );
};

export default function Page() {
  return (
    <DashboardLayout userRole='trainer'>
      <AttendanceDashboard />
    </DashboardLayout>
  );
}
