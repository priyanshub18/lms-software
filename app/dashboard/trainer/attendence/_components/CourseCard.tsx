"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Book, Clock, Award } from "lucide-react";

import { useTheme } from "next-themes";

const CircularChart = ({ value, color }: any) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const { theme } = useTheme();
  const strokeDashoffset = circumference - (value / 100) * circumference;
  useEffect(() => {}, [theme]);

  return (
    <div className='relative h-20 w-20 flex items-center justify-center'>
      <svg width='100%' height='100%' viewBox='0 0 80 80' className='transform -rotate-90'>
        {/* Background circle */}
        <circle cx='40' cy='40' r={radius} fill='none' stroke='#e5e7eb' strokeWidth='8' />
        {/* Progress circle */}
        <circle cx='40' cy='40' r={radius} fill='none' stroke={color} strokeWidth='8' strokeLinecap='round' strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
      </svg>
      <div className='absolute text-lg font-bold'>{value}%</div>
    </div>
  );
};

const CourseCard = ({ course, onClick }: any) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const formattedStartDate = new Date(course.startDate).toLocaleDateString();
  const formattedEndDate = new Date(course.endDate).toLocaleDateString();
  const nextSessionDate = new Date(course.nextSession).toLocaleDateString();

  // Calculate days until next session
  const today = new Date();
  const nextSession = new Date(course.nextSession);
  //@ts-ignore
  const daysUntilNext = Math.ceil((nextSession - today) / (1000 * 60 * 60 * 24));

  // Theme-specific styles
  const styles = {
    card: theme === "dark" ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white border-gray-200 shadow-gray-200",
    title: theme === "dark" ? "text-white" : "text-gray-800",
    description: theme === "dark" ? "text-gray-300" : "text-gray-600",
    subText: theme === "dark" ? "text-gray-400" : "text-gray-500",
    nextSession: theme === "dark" ? "bg-blue-900/30 border-blue-800 text-blue-300" : "bg-blue-50 border-blue-100 text-blue-700",
    nextSessionLabel: theme === "dark" ? "text-blue-400" : "text-blue-600",
  };

  // Difficulty badge color
  const difficultyStyles = {
    Beginner: theme === "dark" ? "bg-green-900/50 text-green-300 border-green-700" : "bg-green-100 text-green-800 border-green-200",
    Intermediate: theme === "dark" ? "bg-blue-900/50 text-blue-300 border-blue-700" : "bg-blue-100 text-blue-800 border-blue-200",
    Advanced: theme === "dark" ? "bg-purple-900/50 text-purple-300 border-purple-700" : "bg-purple-100 text-purple-800 border-purple-200",
    Default: theme === "dark" ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-200 text-gray-700 border-gray-300",
  };
  //@ts-ignore
  const difficultyColor = difficultyStyles[course.difficulty] || difficultyStyles.Default;

  // Chart colors
  const chartColors = {
    completion: theme === "dark" ? "#60a5fa" : "#2563eb",
    attendance: theme === "dark" ? "#34d399" : "#059669",
    engagement: theme === "dark" ? "#a78bfa" : "#7c3aed",
  };

  return (
    <motion.div className={`rounded-lg p-5 border ${styles.card} overflow-hidden`} onClick={() => onClick(course)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div className='flex justify-between items-start mb-4' animate={{ scale: isHovered ? 1.02 : 1 }} transition={{ duration: 0.2 }}>
        <div>
          <h3 className={`font-bold text-lg ${styles.title}`}>{course.title}</h3>
          <p className={`${styles.description} text-sm mt-1`}>{course.description}</p>
        </div>
        <motion.div className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColor}`} whileHover={{ scale: 1.05 }}>
          {course.difficulty}
        </motion.div>
      </motion.div>

      <div className='flex items-center mt-3 mb-4'>
        <Calendar size={16} className={styles.subText} />
        <span className={`ml-2 text-sm ${styles.subText}`}>
          {formattedStartDate} - {formattedEndDate}
        </span>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <Users size={16} className={styles.subText} />
          <span className={`ml-2 text-sm font-medium ${styles.title}`}>{course.students} students</span>
        </div>
        <div className='flex items-center'>
          <Book size={16} className={styles.subText} />
          <span className={`ml-2 text-sm ${styles.subText}`}>
            {course.completedSessions}/{course.totalSessions} sessions
          </span>
        </div>
      </div>

      <motion.div
        className={`p-4 rounded-md border ${styles.nextSession} mb-5`}
        whileHover={{ scale: 1.02 }}
        animate={{ scale: daysUntilNext <= 3 ? [1, 1.03, 1] : 1 }}
        transition={{
          repeat: daysUntilNext <= 3 ? Infinity : 0,
          repeatType: "reverse",
          duration: 1.5,
        }}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className={`text-xs ${styles.nextSessionLabel}`}>Next Session</span>
            <span className={`text-sm font-medium ${styles.nextSession}`}>{nextSessionDate}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock size={16} className={styles.nextSessionLabel} />
            <span className={`text-sm font-bold ${styles.nextSession}`}>
              {daysUntilNext} day{daysUntilNext !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </motion.div>

      <div className='grid grid-cols-3 gap-3 mt-5'>
        <motion.div
          className='flex flex-col items-center p-2 rounded-lg'
          whileHover={{
            scale: 1.05,
            backgroundColor: theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(219, 234, 254, 1)",
          }}
        >
          <CircularChart value={course.completionRate} color={chartColors.completion} />
          <p className={`text-xs font-medium ${styles.subText} mt-1`}>Completion</p>
          <p className={`text-sm font-semibold ${styles.title}`}>{course.completionRate}%</p>
        </motion.div>

        <motion.div
          className='flex flex-col items-center p-2 rounded-lg'
          whileHover={{
            scale: 1.05,
            backgroundColor: theme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(209, 250, 229, 1)",
          }}
        >
          <CircularChart value={course.attendanceRate} color={chartColors.attendance} />
          <p className={`text-xs font-medium ${styles.subText} mt-1`}>Attendance</p>
          <p className={`text-sm font-semibold ${styles.title}`}>{course.attendanceRate}%</p>
        </motion.div>

        <motion.div
          className='flex flex-col items-center p-2 rounded-lg'
          whileHover={{
            scale: 1.05,
            backgroundColor: theme === "dark" ? "rgba(139, 92, 246, 0.1)" : "rgba(237, 233, 254, 1)",
          }}
        >
          <CircularChart value={course.engagementRate} color={chartColors.engagement} />
          <p className={`text-xs font-medium ${styles.subText} mt-1`}>Engagement</p>
          <p className={`text-sm font-semibold ${styles.title}`}>{course.engagementRate}%</p>
        </motion.div>
      </div>

      <motion.div className={`mt-4 pt-3 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`} initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }}>
        <div className='flex justify-end'>
          <motion.button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${theme === "dark" ? "bg-blue-900/50 text-blue-300 hover:bg-blue-800" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Award size={16} />
            Course Details
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;
