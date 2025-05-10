"use client";
import React from "react";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Search, Bell, User, Moon, Sun, Calendar, Clock, ChevronDown, Filter, ArrowRight, Bookmark, BookOpen, Code, Monitor, Shield, Database, Trophy, Award, Target, Zap, BarChart as BarChartIcon } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";
import DashboardLayout from "@/components/dashboard-layout";

// Types
interface Assessment {
  id: number;
  title: string;
  dueDate: string;
  status: "Upcoming" | "Completed" | "Missed";
  timeLimit: number | null;
  questions: number | null;
  subject: string;
  completion: number;
  type: string;
  icon: React.ReactElement;
  score?: number;
  color: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

interface CompletionStat {
  name: string;
  value: number;
  color: string;
}

interface ScoreStat {
  name: string;
  score: number;
}

interface MonthlyProgress {
  name: string;
  completed: number;
  total: number;
}

// Mock data for assessments with enhanced colors
const mockAssessments: Assessment[] = [
  {
    id: 1,
    title: "Midterm Exam: Data Structures",
    dueDate: "2025-05-15T14:00:00",
    status: "Upcoming" as const,
    timeLimit: 120,
    questions: 45,
    subject: "Computer Science",
    completion: 0,
    type: "Exam",
    icon: <Code className='h-10 w-10' />,
    color: "#8B5CF6", // Vibrant purple
    difficulty: "Hard",
  },
  {
    id: 2,
    title: "Weekly Quiz: JavaScript Basics",
    dueDate: "2025-05-12T23:59:00",
    status: "Upcoming" as const,
    timeLimit: 30,
    questions: 15,
    subject: "Web Development",
    completion: 0,
    type: "Quiz",
    icon: <Monitor className='h-10 w-10' />,
    color: "#3B82F6", // Bright blue
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Final Project: Machine Learning",
    dueDate: "2025-05-30T23:59:00",
    status: "Upcoming" as const,
    timeLimit: null,
    questions: null,
    subject: "AI & Machine Learning",
    completion: 25,
    type: "Project",
    icon: <BookOpen className='h-10 w-10' />,
    color: "#EC4899", // Vibrant pink
    difficulty: "Hard",
  },
  {
    id: 4,
    title: "Lab Assessment: Database Design",
    dueDate: "2025-05-08T10:00:00",
    status: "Completed" as const,
    timeLimit: 90,
    questions: 20,
    subject: "Database Systems",
    completion: 100,
    score: 89,
    type: "Lab",
    icon: <Database className='h-10 w-10' />,
    color: "#10B981", // Emerald green
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Peer Review: UI/UX Project",
    dueDate: "2025-05-05T23:59:00",
    status: "Completed" as const,
    timeLimit: null,
    questions: 5,
    subject: "UI/UX Design",
    completion: 100,
    score: 95,
    type: "Review",
    icon: <Bookmark className='h-10 w-10' />,
    color: "#F59E0B", // Amber
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Pop Quiz: Network Security",
    dueDate: "2025-05-03T15:30:00",
    status: "Missed" as const,
    timeLimit: 20,
    questions: 10,
    subject: "Cybersecurity",
    completion: 0,
    type: "Quiz",
    icon: <Shield className='h-10 w-10' />,
    color: "#EF4444", // Red
    difficulty: "Medium",
  },
];

// Enhanced mock data for statistics
const completionStats = [
  { name: "Completed", value: 2, color: "#10B981" }, // emerald
  { name: "Upcoming", value: 3, color: "#3B82F6" }, // blue
  { name: "Missed", value: 1, color: "#EF4444" }, // red
];

const scoreStats = [
  { name: "Database Systems", score: 89, fullMark: 100 },
  { name: "UI/UX Design", score: 95, fullMark: 100 },
  { name: "Web Development", score: 78, fullMark: 100 },
  { name: "Cybersecurity", score: 82, fullMark: 100 },
  { name: "AI & ML", score: 91, fullMark: 100 },
];

const monthlyProgress = [
  { name: "Jan", completed: 5, total: 5 },
  { name: "Feb", completed: 4, total: 6 },
  { name: "Mar", completed: 7, total: 8 },
  { name: "Apr", completed: 6, total: 7 },
  { name: "May", completed: 2, total: 6 },
];

// Enhanced color schemes
const STATUS_COLORS = {
  Upcoming: "bg-gradient-to-r from-blue-500 to-indigo-600",
  Completed: "bg-gradient-to-r from-emerald-500 to-teal-600",
  Missed: "bg-gradient-to-r from-rose-500 to-pink-600",
};

const STATUS_TEXT_COLORS = {
  Upcoming: "text-blue-500 dark:text-blue-400",
  Completed: "text-emerald-500 dark:text-emerald-400",
  Missed: "text-rose-500 dark:text-rose-400",
};

const STATUS_BORDER_COLORS = {
  Upcoming: "border-blue-500 dark:border-blue-600",
  Completed: "border-emerald-500 dark:border-emerald-600",
  Missed: "border-rose-500 dark:border-rose-600",
};

const PIE_COLORS = ["#10B981", "#3B82F6", "#EF4444"];
const PIE_COLORS_DARK = ["#059669", "#2563EB", "#DC2626"];

const DIFFICULTY_COLORS = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function AssessmentsDashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"dueDate" | "title" | "subject">("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAssessments(mockAssessments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateDaysLeft = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssessments = assessments
    .filter((assessment) => {
      const matchesFilter = filter === "All" || assessment.status === filter;
      const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) || assessment.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || assessment.status.toLowerCase() === activeTab.toLowerCase();
      return matchesFilter && matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return sortOrder === "asc" ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      return sortOrder === "asc" ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject);
    });

  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen -m-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
        <main className='  px-4 py-6 sm:px-6 lg:px-8'>
          {/* Dashboard Header with Glassmorphism */}
          <div className='mb-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl p-6 border border-white/20 dark:border-gray-700/30'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
              <div>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>Assessment Dashboard</h2>
                <p className='text-gray-600 dark:text-gray-400'>Track, manage, and complete your assessments</p>
              </div>
              <div className='mt-4 md:mt-0 flex gap-4'>
                <div className='relative w-full md:w-64'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Search className='h-5 w-5 text-black' />
                  </div>
                  <input type='text' className='block w-full pl-10 pr-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-lg leading-5 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200' placeholder='Search assessments...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className='p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-100/70 dark:hover:bg-blue-900/20 transition-colors duration-200'>
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards - Enhanced with gradients and animations */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3 mb-8'>
            <div className='bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl shadow-lg border border-blue-100/50 dark:border-blue-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group'>
              <div className='flex items-center'>
                <div className='rounded-full p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <Trophy className='h-6 w-6' />
                </div>
                <div className='ml-5'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Completion Rate</h3>
                  <div className='flex items-baseline'>
                    <p className='text-2xl font-semibold text-gray-900 dark:text-white'>78%</p>
                    <p className='ml-2 text-sm font-medium text-emerald-600 dark:text-emerald-400'>+12%</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                <div className='h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full' style={{ width: "78%" }}></div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-xl shadow-lg border border-purple-100/50 dark:border-purple-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group'>
              <div className='flex items-center'>
                <div className='rounded-full p-3 bg-gradient-to-br from-purple-500 to-pink-600 text-red-200 shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <AlertCircle className='h-6 w-6' />
                </div>
                <div className='ml-5'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Upcoming Assessments</h3>
                  <div className='flex items-baseline'>
                    <p className='text-2xl font-semibold text-gray-900 dark:text-white'>3</p>
                    <p className='ml-2 text-sm font-medium text-amber-600 dark:text-amber-400'>Next in 2 days</p>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400'>
                  <span>Javascript Quiz</span>
                  <span>May 12</span>
                </div>
                <div className='mt-1 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full'>
                  <div className='h-1.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full' style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 rounded-xl shadow-lg border border-green-100/50 dark:border-green-900/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group'>
              <div className='flex items-center'>
                <div className='rounded-full p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  <Award className='h-6 w-6' />
                </div>
                <div className='ml-5'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Average Score</h3>
                  <div className='flex items-baseline'>
                    <p className='text-2xl font-semibold text-gray-900 dark:text-white'>87%</p>
                    <p className='ml-2 text-sm font-medium text-emerald-600 dark:text-emerald-400'>+5%</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                <div className='h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full' style={{ width: "87%" }}></div>
              </div>
            </div>
          </div>

          {/* Charts Section with better styling */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
            {/* Progress Chart */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/30 p-6 lg:col-span-2 transition-all duration-300 hover:shadow-xl'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                <BarChartIcon className='h-5 w-5 mr-2 text-blue-500' />
                Monthly Progress
              </h3>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={monthlyProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id='colorTotal' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#94A3B8' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#94A3B8' stopOpacity={0.2} />
                      </linearGradient>
                      <linearGradient id='colorCompleted' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#3B82F6' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#3B82F6' stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey='name' stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                    <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                        borderColor: darkMode ? "#374151" : "#E5E7EB",
                        color: darkMode ? "#F9FAFB" : "#111827",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey='total' name='Total Assessments' fill='url(#colorTotal)' radius={[8, 8, 0, 0]} />
                    <Bar dataKey='completed' name='Completed' fill='url(#colorCompleted)' radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution - Enhanced */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/30 p-6 transition-all duration-300 hover:shadow-xl'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                <PieChart className='h-5 w-5 mr-2 text-purple-500' />
                Assessment Status
              </h3>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <defs>
                      {completionStats.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`color${index}`} x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor={entry.color} stopOpacity={0.9} />
                          <stop offset='100%' stopColor={entry.color} stopOpacity={0.6} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie data={completionStats} cx='50%' cy='50%' labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} innerRadius={30} dataKey='value' strokeWidth={3} stroke='#ffffff'>
                      {completionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#color${index})`} style={{ filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.15))" }} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                        borderColor: darkMode ? "#374151" : "#E5E7EB",
                        color: darkMode ? "#F9FAFB" : "#111827",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabs for filtering */}
          <div className='mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
            <div className='flex overflow-x-auto scrollbar-hide'>
              <button onClick={() => setActiveTab("all")} className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex-shrink-0 border-b-2 focus:outline-none ${activeTab === "all" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"}`}>
                All Assessments
              </button>
              <button onClick={() => setActiveTab("upcoming")} className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex-shrink-0 border-b-2 focus:outline-none ${activeTab === "upcoming" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"}`}>
                Upcoming
              </button>
              <button onClick={() => setActiveTab("completed")} className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex-shrink-0 border-b-2 focus:outline-none ${activeTab === "completed" ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"}`}>
                Completed
              </button>
              <button onClick={() => setActiveTab("missed")} className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex-shrink-0 border-b-2 focus:outline-none ${activeTab === "missed" ? "border-rose-500 text-rose-600 dark:text-rose-400" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"}`}>
                Missed
              </button>
            </div>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className='mb-6 flex items-center gap-4 flex-wrap'>
            <div className='relative'>
              <button onClick={() => setShowFilters(!showFilters)} className='flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300/50 dark:border-gray-600/50 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200'>
                <Filter className='mr-2 h-4 w-4 text-blue-500' />
                Filter: {filter}
                <ChevronDown className='ml-2 h-4 w-4' />
              </button>

              {showFilters && (
                <div className='absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm transition-all backdrop-blur-lg'>
                  {["All", "Upcoming", "Completed", "Missed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilter(status);
                        setShowFilters(false);
                      }}
                      className={`${filter === status ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"} block px-4 py-2 w-full text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className='flex gap-2 overflow-x-auto pb-1'>
              <button onClick={() => setSortBy("dueDate")} className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${sortBy === "dueDate" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}>
                Due Date
              </button>
              <button onClick={() => setSortBy("title")} className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${sortBy === "title" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}>
                Title
              </button>
              <button onClick={() => setSortBy("subject")} className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${sortBy === "subject" ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}>
                Subject
              </button>
            </div>
          </div>

          {/* Assessment Cards - With enhanced visuals */}
          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg'></div>
                    <div className='ml-4 flex-1'>
                      <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2'></div>
                      <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
                    </div>
                  </div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
                  <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
                  <div className='flex justify-between'>
                    <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4'></div>
                    <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4'></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAssessments.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredAssessments.map((assessment) => (
                <div key={assessment.id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 ${STATUS_BORDER_COLORS[assessment.status]} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group`}>
                  <div className='relative'>
                    <div className='absolute top-0 right-0 m-4'>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_TEXT_COLORS[assessment.status]} bg-opacity-10`}>
                        {assessment.status === "Upcoming" && <Clock className='mr-1 h-3 w-3' />}
                        {assessment.status === "Completed" && <CheckCircle className='mr-1 h-3 w-3' />}
                        {assessment.status === "Missed" && <AlertCircle className='mr-1 h-3 w-3' />}
                        {assessment.status}
                      </span>
                    </div>

                    {/* {assessment.difficulty && (
                      <div className='absolute top-0 left-0 m-4'>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DIFFICULTY_COLORS[assessment.difficulty]}`}>{assessment.difficulty}</span>
                      </div>
                    )} */}
                  </div>

                  <div className='p-6'>
                    <div className='flex items-center mb-4'>
                      <div className='rounded-lg p-2' style={{ backgroundColor: `${assessment.color}20` }}>
                        {/* @ts-ignore */}
                        {React.cloneElement(assessment.icon, { color: assessment.color })}
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-lg font-medium text-gray-900 dark:text-white line-clamp-1'>{assessment.title}</h3>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{assessment.subject}</p>
                      </div>
                    </div>

                    <div className='space-y-3 mb-4'>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400 flex items-center'>
                          <Calendar className='h-4 w-4 mr-1' />
                          {formatDate(assessment.dueDate)}
                        </span>
                        {assessment.status === "Upcoming" && <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>{calculateDaysLeft(assessment.dueDate)} days left</span>}
                      </div>

                      {assessment.timeLimit && (
                        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                          <Clock className='h-4 w-4 mr-1' />
                          Time limit: {assessment.timeLimit} minutes
                        </div>
                      )}

                      {assessment.questions && (
                        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                          <Target className='h-4 w-4 mr-1' />
                          {assessment.questions} questions
                        </div>
                      )}

                      {assessment.score && (
                        <div className='mt-2'>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Score: {assessment.score}%</span>
                          </div>
                          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div
                              className='h-2 rounded-full'
                              style={{
                                width: `${assessment.score}%`,
                                backgroundColor: assessment.color,
                                backgroundImage: `linear-gradient(90deg, ${assessment.color}, ${assessment.color}cc)`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {assessment.status === "Upcoming" && (
                        <div className='mt-2'>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Progress: {assessment.completion}%</span>
                          </div>
                          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div
                              className='h-2 rounded-full'
                              style={{
                                width: `${assessment.completion}%`,
                                backgroundColor: assessment.color,
                                backgroundImage: `linear-gradient(90deg, ${assessment.color}, ${assessment.color}cc)`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                      <span className='text-sm font-medium px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'>{assessment.type}</span>
                      {assessment.status === "Upcoming" && (
                        <button className='group-hover:bg-blue-600 bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center transition-all duration-200 hover:shadow-lg'>
                          Start
                          <ArrowRight className='ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
                        </button>
                      )}
                      {assessment.status === "Completed" && (
                        <button className='bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center transition-all duration-200 hover:shadow-lg hover:bg-emerald-600'>
                          Review
                          <ArrowRight className='ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
                        </button>
                      )}
                      {assessment.status === "Missed" && (
                        <button className='bg-gray-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center transition-all duration-200 hover:shadow-lg hover:bg-gray-600'>
                          View
                          <ArrowRight className='ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200' />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center'>
              <div className='flex flex-col items-center'>
                <Search className='h-12 w-12 text-gray-400 mb-4' />
                <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>No assessments found</h3>
                <p className='text-gray-500 dark:text-gray-400 max-w-md mb-6'>We couldn't find any assessments matching your search criteria. Try adjusting your filters or search term.</p>
                <button
                  onClick={() => {
                    setFilter("All");
                    setSearchTerm("");
                    setActiveTab("all");
                  }}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200'
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
