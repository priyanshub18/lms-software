"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Users, Award, BarChart2, Clipboard, CheckCircle, XCircle, TrendingUp, FileText, Download, UserCheck, AlertTriangle, MessageCircle, Flag, Filter, ChevronDown, ChevronRight, Settings, Search, PieChart, User } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// Sample assessment data for the selected assessment
const assessmentDetails = {
  id: 1,
  title: "Quarterly Performance Review",
  description: "Comprehensive evaluation of employee performance across technical skills, communication, and project execution over Q1 2025.",
  type: "Performance Review",
  score: 85,
  maxScore: 100,
  completed: "Apr 15, 2025",
  duration: "45 min",
  status: "Completed",
  dueDate: "Apr 20, 2025",
  creator: "Jane Smith",
  department: "Engineering",
  tags: ["Technical", "Quarterly", "Required"],
  criteria: [
    { name: "Technical Knowledge", weight: 30, score: 27 },
    { name: "Problem Solving", weight: 25, score: 22 },
    { name: "Communication", weight: 20, score: 15 },
    { name: "Project Execution", weight: 15, score: 12 },
    { name: "Team Collaboration", weight: 10, score: 9 },
  ],
  studentPerformance: [
    { id: 1, name: "Alex Johnson", score: 92, status: "Completed", submissionDate: "Apr 14, 2025", timeSpent: "42 min", attempts: 1 },
    { id: 2, name: "Maya Patel", score: 88, status: "Completed", submissionDate: "Apr 15, 2025", timeSpent: "39 min", attempts: 1 },
    { id: 3, name: "Daniel Kim", score: 76, status: "Completed", submissionDate: "Apr 13, 2025", timeSpent: "45 min", attempts: 2 },
    { id: 4, name: "Sarah Williams", score: 95, status: "Completed", submissionDate: "Apr 12, 2025", timeSpent: "38 min", attempts: 1 },
    { id: 5, name: "James Rodriguez", score: 82, status: "Completed", submissionDate: "Apr 15, 2025", timeSpent: "44 min", attempts: 1 },
    { id: 6, name: "Emma Chen", score: 79, status: "Completed", submissionDate: "Apr 14, 2025", timeSpent: "41 min", attempts: 2 },
    { id: 7, name: "Marcus Lee", score: 85, status: "Completed", submissionDate: "Apr 15, 2025", timeSpent: "40 min", attempts: 1 },
    { id: 8, name: "Rachel Kumar", score: 91, status: "Completed", submissionDate: "Apr 13, 2025", timeSpent: "39 min", attempts: 1 },
  ],
  performanceDistribution: {
    "90-100": 3,
    "80-89": 3,
    "70-79": 2,
    "60-69": 0,
    "Below 60": 0,
  },
  questions: [
    {
      id: 1,
      type: "Multiple Choice",
      text: "Which methodology would be most appropriate for rapid prototyping?",
      correctAnswer: "Agile",
      options: ["Waterfall", "Agile", "Six Sigma", "Traditional"],
      difficulty: "Medium",
      successRate: 85,
    },
    {
      id: 2,
      type: "Short Answer",
      text: "Describe two advantages of continuous integration.",
      keywords: ["early detection", "bugs", "faster development", "code quality", "feedback"],
      difficulty: "Hard",
      successRate: 72,
    },
    {
      id: 3,
      type: "True/False",
      text: "Kubernetes is primarily used for container orchestration.",
      correctAnswer: "True",
      difficulty: "Easy",
      successRate: 95,
    },
  ],
  feedback: [
    { id: 1, student: "Daniel Kim", comment: "Found the technical questions challenging but fair.", rating: 4, date: "Apr 13, 2025" },
    { id: 2, student: "Maya Patel", comment: "Great assessment. Could use more practical scenarios.", rating: 4, date: "Apr 15, 2025" },
    { id: 3, student: "Sarah Williams", comment: "Very comprehensive, covers all key topics.", rating: 5, date: "Apr 12, 2025" },
  ],
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

interface Student {
  id: number;
  name: string;
  score: number;
  status: string;
  submissionDate: string;
  timeSpent: string;
  attempts: number;
}

interface Question {
  id: number;
  type: string;
  text: string;
  correctAnswer: string;
  options?: string[];
  keywords?: string[];
  difficulty: string;
  successRate: number;
}

function AssessmentDetailsPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score"); // Default sort by score
  const [sortOrder, setSortOrder] = useState("desc"); // Default descending order

  // Filter students based on search query
  const filteredStudents = assessmentDetails.studentPerformance
    .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a: Student, b: Student) => {
      const factor = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name) * factor;
      }
      const aValue = a[sortBy as keyof Student];
      const bValue = b[sortBy as keyof Student];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * factor;
      }
      return 0;
    });

  // Set initial state
  useEffect(() => {
    // Delay to ensure animations trigger after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Custom score color function
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  // Toggle sort order and column
  const handleSort = (column: keyof Student) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Calculate total scores for chart
  const totalStudents = assessmentDetails.studentPerformance.length;

  return (
    <DashboardLayout userRole='trainer'>
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 pb-8'>
        {/* Header */}
        <header className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white py-6 px-6 shadow-lg'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center mb-4'>
              <motion.button className='flex items-center mr-4 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => router.back()}>
                <ArrowLeft size={18} />
              </motion.button>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>{assessmentDetails.title}</h1>
            </div>
            <div className='flex flex-wrap items-center gap-4 text-sm'>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-1'>
                <Calendar size={14} className='mr-1.5' />
                <span>Created: {assessmentDetails.completed}</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-1'>
                <Clock size={14} className='mr-1.5' />
                <span>Duration: {assessmentDetails.duration}</span>
              </div>
              <div className='flex items-center bg-white/10 rounded-full px-3 py-1'>
                <Users size={14} className='mr-1.5' />
                <span>Students: {assessmentDetails.studentPerformance.length}</span>
              </div>
              <div className='flex items-center bg-green-400/20 text-green-300 rounded-full px-3 py-1'>
                <Award size={14} className='mr-1.5' />
                <span>Avg. Score: {assessmentDetails.studentPerformance.reduce((acc, student) => acc + student.score, 0) / assessmentDetails.studentPerformance.length}%</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='container max-w-7xl mx-auto px-4 py-6'>
          {/* Tabs Navigation */}
          <div className='mb-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex overflow-x-auto hide-scrollbar'>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "overview" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("overview")}>
                Overview
              </button>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "students" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("students")}>
                Student Performance
              </button>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "questions" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("questions")}>
                Questions
              </button>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "feedback" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("feedback")}>
                Feedback
              </button>
              <button className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "settings" ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("settings")}>
                Settings
              </button>
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={staggerContainer}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                {/* Left Column - Assessment Details */}
                <motion.div className='md:col-span-1' variants={fadeIn}>
                  <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6'>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <Clipboard className='mr-2 h-5 w-5' />
                      Assessment Details
                    </h3>
                    <div className='space-y-4'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>Description</p>
                        <p className='text-gray-700 dark:text-gray-200'>{assessmentDetails.description}</p>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <p className='text-gray-500 dark:text-gray-400 text-sm'>Type</p>
                          <p className='text-gray-700 dark:text-gray-200'>{assessmentDetails.type}</p>
                        </div>
                        <div>
                          <p className='text-gray-500 dark:text-gray-400 text-sm'>Department</p>
                          <p className='text-gray-700 dark:text-gray-200'>{assessmentDetails.department}</p>
                        </div>
                        <div>
                          <p className='text-gray-500 dark:text-gray-400 text-sm'>Created By</p>
                          <p className='text-gray-700 dark:text-gray-200'>{assessmentDetails.creator}</p>
                        </div>
                        <div>
                          <p className='text-gray-500 dark:text-gray-400 text-sm'>Due Date</p>
                          <p className='text-gray-700 dark:text-gray-200'>{assessmentDetails.dueDate}</p>
                        </div>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>Tags</p>
                        <div className='flex flex-wrap gap-2 mt-1'>
                          {assessmentDetails.tags.map((tag, index) => (
                            <span key={index} className='px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs'>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' variants={fadeIn}>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <Award className='mr-2 h-5 w-5' />
                      Scoring Criteria
                    </h3>
                    <div className='space-y-4'>
                      {assessmentDetails.criteria.map((criterion, index) => (
                        <div key={index}>
                          <div className='flex justify-between text-sm mb-1'>
                            <div className='flex items-center'>
                              <span className='text-gray-700 dark:text-gray-200'>{criterion.name}</span>
                              <span className='text-gray-500 dark:text-gray-400 ml-2'>({criterion.weight}%)</span>
                            </div>
                            <span className='font-medium text-blue-600 dark:text-blue-400'>
                              {criterion.score}/{criterion.weight}
                            </span>
                          </div>
                          <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden'>
                            <motion.div className='bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: `${(criterion.score / criterion.weight) * 100}%` }} transition={{ duration: 1, delay: 0.2 + index * 0.1 }}></motion.div>
                          </div>
                        </div>
                      ))}
                      <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                        <div className='flex justify-between'>
                          <span className='font-semibold text-gray-700 dark:text-gray-200'>Total Score</span>
                          <span className='font-bold text-lg text-blue-600 dark:text-blue-400'>
                            {assessmentDetails.score}/{assessmentDetails.maxScore}
                          </span>
                        </div>
                        <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden mt-2'>
                          <motion.div className='bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full' initial={{ width: 0 }} animate={{ width: `${(assessmentDetails.score / assessmentDetails.maxScore) * 100}%` }} transition={{ duration: 1, delay: 0.7 }}></motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Performance Metrics */}
                <motion.div className='md:col-span-2' variants={fadeIn}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                    {/* Completion Rate */}
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
                      <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                        <UserCheck className='mr-2 h-5 w-5' />
                        Completion Stats
                      </h3>
                      <div className='flex justify-center items-center h-52'>
                        <div className='relative h-40 w-40'>
                          <svg viewBox='0 0 100 100' className='h-full w-full'>
                            {/* Background circle */}
                            <circle cx='50' cy='50' r='40' fill='none' stroke='#E5E7EB' strokeWidth='10' />
                            {/* Progress circle - animated */}
                            <motion.circle cx='50' cy='50' r='40' fill='none' stroke='url(#gradientCompletion)' strokeWidth='10' strokeLinecap='round' strokeDasharray={`${2 * Math.PI * 40}`} initial={{ strokeDashoffset: 2 * Math.PI * 40 }} animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - 1) }} transition={{ duration: 1.5, delay: 0.5 }} transform='rotate(-90 50 50)' />
                            <defs>
                              <linearGradient id='gradientCompletion' x1='0%' y1='0%' x2='100%' y2='0%'>
                                <stop offset='0%' stopColor='#3B82F6' />
                                <stop offset='100%' stopColor='#60A5FA' />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className='absolute inset-0 flex flex-col justify-center items-center'>
                            <span className='text-3xl font-bold text-blue-600 dark:text-blue-400'>100%</span>
                            <span className='text-gray-500 dark:text-gray-400 text-sm'>Completion</span>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4 mt-2'>
                        <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3'>
                          <p className='text-gray-500 dark:text-gray-400 text-xs'>Total Students</p>
                          <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>{totalStudents}</p>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3'>
                          <p className='text-gray-500 dark:text-gray-400 text-xs'>Avg Time Spent</p>
                          <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>41 min</p>
                        </div>
                      </div>
                    </div>

                    {/* Score Distribution */}
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
                      <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                        <PieChart className='mr-2 h-5 w-5' />
                        Score Distribution
                      </h3>
                      <div className='space-y-3'>
                        {Object.entries(assessmentDetails.performanceDistribution).map(([range, count], index) => (
                          <div key={range}>
                            <div className='flex justify-between text-sm mb-1'>
                              <span className='text-gray-700 dark:text-gray-300'>{range}%</span>
                              <span className='text-gray-500 dark:text-gray-400'>
                                {count} students ({Math.round((count / totalStudents) * 100)}%)
                              </span>
                            </div>
                            <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                              <motion.div className={`h-2.5 rounded-full ${range === "90-100" ? "bg-emerald-500" : range === "80-89" ? "bg-blue-500" : range === "70-79" ? "bg-yellow-500" : range === "60-69" ? "bg-orange-500" : "bg-red-500"}`} initial={{ width: 0 }} animate={{ width: `${(count / totalStudents) * 100}%` }} transition={{ duration: 1, delay: 0.3 + index * 0.1 }}></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Question Analysis */}
                  <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' variants={fadeIn}>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <BarChart2 className='mr-2 h-5 w-5' />
                      Question Analysis
                    </h3>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full'>
                        <thead>
                          <tr>
                            <th className='text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3'>Question</th>
                            <th className='text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3'>Type</th>
                            <th className='text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3'>Difficulty</th>
                            <th className='text-left text-sm font-medium text-gray-500 dark:text-gray-400 pb-3'>Success Rate</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                          {assessmentDetails.questions.map((question, index) => (
                            <tr key={question.id} className='hover:bg-gray-50 dark:hover:bg-gray-700/30'>
                              <td className='py-3 pr-4'>
                                <div className='flex items-center'>
                                  <span className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2'>{index + 1}</span>
                                  <span className='text-gray-700 dark:text-gray-200 line-clamp-1'>{question.text}</span>
                                </div>
                              </td>
                              <td className='py-3 pr-4 text-gray-700 dark:text-gray-300'>{question.type}</td>
                              <td className='py-3 pr-4'>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${question.difficulty === "Easy" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : question.difficulty === "Medium" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>{question.difficulty}</span>
                              </td>
                              <td className='py-3'>
                                <div className='flex items-center'>
                                  <div className='w-32 bg-gray-100 dark:bg-gray-700 rounded-full h-2 mr-2'>
                                    <motion.div className={`h-2 rounded-full ${question.successRate >= 90 ? "bg-emerald-500" : question.successRate >= 75 ? "bg-blue-500" : question.successRate >= 60 ? "bg-yellow-500" : "bg-red-500"}`} initial={{ width: 0 }} animate={{ width: `${question.successRate}%` }} transition={{ duration: 1, delay: 0.2 + index * 0.1 }}></motion.div>
                                  </div>
                                  <span className='text-gray-700 dark:text-gray-200'>{question.successRate}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div className='flex flex-wrap gap-4 justify-end' variants={fadeIn}>
                <motion.button className='px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium shadow-md flex items-center' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Download size={16} className='mr-2' />
                  Export Results
                </motion.button>
                <motion.button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-md flex items-center' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <FileText size={16} className='mr-2' />
                  Generate Report
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Student Performance Tab Content */}
          {activeTab === "students" && (
            <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={staggerContainer}>
              {/* Search and Filter */}
              <motion.div className='flex flex-wrap gap-4 mb-6' variants={fadeIn}>
                <div className='relative grow max-w-md'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
                  <input type='text' placeholder='Search students...' className='w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-10 pr-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className='flex items-center'>
                  <span className='text-gray-500 dark:text-gray-400 mr-2 text-sm'>Filter:</span>
                  <button className='flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                    <Filter size={14} className='mr-1.5' />
                    All Students
                    <ChevronDown size={14} className='ml-1.5' />
                  </button>
                </div>
              </motion.div>

              {/* Students Table */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6' variants={fadeIn}>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className='bg-gray-50 dark:bg-gray-700/50'>
                      <tr>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer' onClick={() => handleSort("name")}>
                          <div className='flex items-center'>
                            Student
                            {sortBy === "name" && <ChevronDown size={14} className={`ml-1 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer' onClick={() => handleSort("score")}>
                          <div className='flex items-center'>
                            Score
                            {sortBy === "score" && <ChevronDown size={14} className={`ml-1 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer' onClick={() => handleSort("submissionDate")}>
                          <div className='flex items-center'>
                            Submission Date
                            {sortBy === "submissionDate" && <ChevronDown size={14} className={`ml-1 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer' onClick={() => handleSort("timeSpent")}>
                          <div className='flex items-center'>
                            Time Spent
                            {sortBy === "timeSpent" && <ChevronDown size={14} className={`ml-1 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer' onClick={() => handleSort("attempts")}>
                          <div className='flex items-center'>
                            Attempts
                            {sortBy === "attempts" && <ChevronDown size={14} className={`ml-1 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                      {filteredStudents.map((student) => (
                        <motion.tr key={student.id} className='hover:bg-gray-50 dark:hover:bg-gray-700/30' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium'>
                                {student.name
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")}
                              </div>
                              <div className='ml-3'>
                                <div className='text-sm font-medium text-gray-700 dark:text-gray-200'>{student.name}</div>
                                <div className='text-xs text-gray-500 dark:text-gray-400'>Student ID: {student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className={`text-base font-semibold ${getScoreColor(student.score)}`}>{student.score}%</div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{student.submissionDate}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{student.timeSpent}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300'>{student.attempts}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <button className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-3'>View</button>
                            <button className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'>Report</button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' variants={fadeIn}>
                  <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                    <TrendingUp className='mr-2 h-5 w-5' />
                    Performance Trends
                  </h3>
                  <div className='flex items-center justify-center h-64'>
                    {/* Simplified visualization of performance trends */}
                    <div className='w-full h-full flex items-end justify-between px-4'>
                      {[92, 88, 76, 95, 82, 79, 85, 91].map((score, index) => (
                        <motion.div key={index} className={`w-8 rounded-t-lg ${score >= 90 ? "bg-gradient-to-b from-emerald-500 to-emerald-600" : score >= 80 ? "bg-gradient-to-b from-blue-500 to-blue-600" : score >= 70 ? "bg-gradient-to-b from-yellow-500 to-yellow-600" : "bg-gradient-to-b from-red-500 to-red-600"}`} initial={{ height: 0 }} animate={{ height: `${score * 0.6}%` }} transition={{ duration: 1, delay: 0.1 * index }}>
                          <div className='text-xs text-center mt-2 text-white font-medium -rotate-90 origin-left translate-y-6'>{filteredStudents[index]?.name.split(" ")[0]}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' variants={fadeIn}>
                  <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                    <Clock className='mr-2 h-5 w-5' />
                    Time Analysis
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span className='text-gray-500 dark:text-gray-300'>Average Time Spent</span>
                        <span className='text-gray-700 dark:text-gray-200 font-medium'>41 min</span>
                      </div>
                      <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2'>
                        <motion.div className='bg-blue-500 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1 }}></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span className='text-gray-500 dark:text-gray-300'>Fastest Completion</span>
                        <span className='text-gray-700 dark:text-gray-200 font-medium'>38 min (Sarah Williams)</span>
                      </div>
                      <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2'>
                        <motion.div className='bg-emerald-500 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1, delay: 0.2 }}></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span className='text-gray-500 dark:text-gray-300'>Slowest Completion</span>
                        <span className='text-gray-700 dark:text-gray-200 font-medium'>45 min (Daniel Kim)</span>
                      </div>
                      <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2'>
                        <motion.div className='bg-yellow-500 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.4 }}></motion.div>
                      </div>
                    </div>
                    <div className='pt-4 mt-2 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex justify-between text-sm mb-1'>
                        <span className='text-gray-500 dark:text-gray-300'>Multiple Attempts</span>
                        <span className='text-gray-700 dark:text-gray-200 font-medium'>2 Students (25%)</span>
                      </div>
                      <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2'>
                        <motion.div className='bg-red-500 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: "25%" }} transition={{ duration: 1, delay: 0.6 }}></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Questions Tab Content */}
          {activeTab === "questions" && (
            <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={staggerContainer}>
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6' variants={fadeIn}>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center'>
                    <FileText className='mr-2 h-5 w-5' />
                    Question Details
                  </h3>
                  <div className='space-y-8'>
                    {assessmentDetails.questions.map((question, index) => (
                      <div key={question.id} className='border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0'>
                        <div className='flex items-center mb-4'>
                          <div className='bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3'>{index + 1}</div>
                          <h4 className='text-lg font-medium text-gray-700 dark:text-gray-200'>{question.text}</h4>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-4'>
                          <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4'>
                            <p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>Question Type</p>
                            <p className='text-gray-700 dark:text-gray-200 font-medium'>{question.type}</p>
                          </div>
                          <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4'>
                            <p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>Difficulty</p>
                            <p className='text-gray-700 dark:text-gray-200 font-medium flex items-center'>
                              <span className={`h-2 w-2 rounded-full mr-2 ${question.difficulty === "Easy" ? "bg-green-400" : question.difficulty === "Medium" ? "bg-yellow-400" : "bg-red-400"}`}></span>
                              {question.difficulty}
                            </p>
                          </div>
                          <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4'>
                            <p className='text-gray-500 dark:text-gray-400 text-sm mb-1'>Success Rate</p>
                            <p className='text-gray-700 dark:text-gray-200 font-medium flex items-center'>
                              {question.successRate}%<span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${question.successRate >= 90 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : question.successRate >= 75 ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : question.successRate >= 60 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>{question.successRate >= 90 ? "Excellent" : question.successRate >= 75 ? "Good" : question.successRate >= 60 ? "Average" : "Poor"}</span>
                            </p>
                          </div>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4'>
                          <p className='text-gray-500 dark:text-gray-400 text-sm mb-2'>Correct Answer</p>
                          {question.type === "Multiple Choice" && question.options ? (
                            <div className='space-y-2'>
                              {question.options.map((option, i) => (
                                <div key={i} className={`flex items-center p-2 rounded-lg ${option === question.correctAnswer ? "bg-green-100 dark:bg-green-900/20 border border-green-500/30" : "border border-gray-200 dark:border-gray-700"}`}>
                                  {option === question.correctAnswer ? <CheckCircle size={16} className='text-green-500 mr-2' /> : <XCircle size={16} className='text-gray-400 mr-2' />}
                                  <span className={option === question.correctAnswer ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}>{option}</span>
                                </div>
                              ))}
                            </div>
                          ) : question.type === "True/False" ? (
                            <div className='flex items-center p-2 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-500/30'>
                              <CheckCircle size={16} className='text-green-500 mr-2' />
                              <span className='text-green-700 dark:text-green-400'>{question.correctAnswer}</span>
                            </div>
                          ) : question.keywords ? (
                            <div className='p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
                              <p className='text-gray-700 dark:text-gray-300'>Keywords: {question.keywords.join(", ")}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Feedback Tab Content */}
          {activeTab === "feedback" && (
            <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={staggerContainer}>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <motion.div className='md:col-span-2' variants={fadeIn}>
                  <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6'>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <MessageCircle className='mr-2 h-5 w-5' />
                      Student Feedback
                    </h3>
                    <div className='space-y-4'>
                      {assessmentDetails.feedback.map((item) => (
                        <motion.div key={item.id} className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <div className='flex justify-between mb-2'>
                            <div className='flex items-center'>
                              <div className='h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm'>
                                {item.student
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")}
                              </div>
                              <div className='ml-2'>
                                <div className='text-gray-700 dark:text-gray-200 font-medium'>{item.student}</div>
                                <div className='text-gray-500 dark:text-gray-400 text-xs'>{item.date}</div>
                              </div>
                            </div>
                            <div className='flex'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} filled={star <= item.rating} />
                              ))}
                            </div>
                          </div>
                          <p className='text-gray-700 dark:text-gray-300'>{item.comment}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div className='md:col-span-1' variants={fadeIn}>
                  <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6'>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <BarChart2 className='mr-2 h-5 w-5' />
                      Rating Summary
                    </h3>
                    <div className='space-y-3'>
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = assessmentDetails.feedback.filter((f) => f.rating === rating).length;
                        const percentage = (count / assessmentDetails.feedback.length) * 100;

                        return (
                          <div key={rating} className='flex items-center'>
                            <div className='flex items-center w-12'>
                              <span className='text-gray-700 dark:text-gray-200 text-sm'>{rating}</span>
                              <Star filled={true} small={true} />
                            </div>
                            <div className='flex-1 mx-2'>
                              <div className='w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2'>
                                <motion.div className='bg-blue-500 h-2 rounded-full' initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.2 }}></motion.div>
                              </div>
                            </div>
                            <div className='w-8 text-right'>
                              <span className='text-gray-500 dark:text-gray-300 text-sm'>{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <div className='text-gray-500 dark:text-gray-400 text-sm'>Average Rating</div>
                          <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>4.3</div>
                        </div>
                        <div className='flex'>
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} filled={true} />
                          ))}
                          <Star filled={false} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' variants={fadeIn}>
                    <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                      <AlertTriangle className='mr-2 h-5 w-5' />
                      Improvement Areas
                    </h3>
                    <div className='space-y-3'>
                      <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3'>
                        <div className='flex items-center'>
                          <Flag className='text-yellow-500 mr-2' size={16} />
                          <span className='text-gray-700 dark:text-gray-200'>Add more practical scenarios</span>
                        </div>
                      </div>
                      <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3'>
                        <div className='flex items-center'>
                          <Flag className='text-yellow-500 mr-2' size={16} />
                          <span className='text-gray-700 dark:text-gray-200'>Improve technical question clarity</span>
                        </div>
                      </div>
                      <div className='bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3'>
                        <div className='flex items-center'>
                          <Flag className='text-yellow-500 mr-2' size={16} />
                          <span className='text-gray-700 dark:text-gray-200'>Expand on communication criteria</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab Content */}
          {activeTab === "settings" && (
            <motion.div initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={staggerContainer}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6' variants={fadeIn}>
                  <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                    <Settings className='mr-2 h-5 w-5' />
                    Assessment Settings
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Assessment Title</label>
                      <input type='text' className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' value={assessmentDetails.title} readOnly />
                    </div>
                    <div>
                      <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Description</label>
                      <textarea className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' rows={4} value={assessmentDetails.description} readOnly></textarea>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Department</label>
                        <select className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <option>{assessmentDetails.department}</option>
                        </select>
                      </div>
                      <div>
                        <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Type</label>
                        <select className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <option>{assessmentDetails.type}</option>
                        </select>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Due Date</label>
                        <input type='text' className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' value={assessmentDetails.dueDate} readOnly />
                      </div>
                      <div>
                        <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Duration</label>
                        <input type='text' className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' value={assessmentDetails.duration} readOnly />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6' variants={fadeIn}>
                  <h3 className='text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center'>
                    <User className='mr-2 h-5 w-5' />
                    Access & Permissions
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Created By</label>
                      <input type='text' className='w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500' value={assessmentDetails.creator} readOnly />
                    </div>
                    <div>
                      <div className='flex justify-between mb-1'>
                        <label className='block text-gray-500 dark:text-gray-400 text-sm'>Assessment Visibility</label>
                        <span className='text-blue-600 dark:text-blue-400 text-sm'>Restricted</span>
                      </div>
                      <div className='bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4'>
                        <div className='flex items-center'>
                          <input type='checkbox' className='rounded text-blue-500 bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500' checked readOnly />
                          <label className='ml-2 text-gray-700 dark:text-gray-300'>Engineering Department</label>
                        </div>
                        <div className='flex items-center mt-2'>
                          <input type='checkbox' className='rounded text-blue-500 bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500' checked readOnly />
                          <label className='ml-2 text-gray-700 dark:text-gray-300'>Junior Developers</label>
                        </div>
                        <div className='flex items-center mt-2'>
                          <input type='checkbox' className='rounded text-blue-500 bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500' checked readOnly />
                          <label className='ml-2 text-gray-700 dark:text-gray-300'>Tech Leads</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className='block text-gray-500 dark:text-gray-400 text-sm mb-1'>Sharing Options</label>
                      <div className='bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg'>
                        <div className='border-b border-gray-200 dark:border-gray-600 p-3 flex items-center justify-between'>
                          <span className='text-gray-700 dark:text-gray-300'>Allow result export</span>
                          <div className='bg-blue-500 w-12 h-6 rounded-full relative'>
                            <div className='w-4 h-4 bg-white rounded-full absolute right-1 top-1'></div>
                          </div>
                        </div>
                        <div className='border-b border-gray-200 dark:border-gray-600 p-3 flex items-center justify-between'>
                          <span className='text-gray-700 dark:text-gray-300'>Make public to organization</span>
                          <div className='bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full relative'>
                            <div className='w-4 h-4 bg-white rounded-full absolute left-1 top-1'></div>
                          </div>
                        </div>
                        <div className='p-3 flex items-center justify-between'>
                          <span className='text-gray-700 dark:text-gray-300'>Allow commenting</span>
                          <div className='bg-blue-500 w-12 h-6 rounded-full relative'>
                            <div className='w-4 h-4 bg-white rounded-full absolute right-1 top-1'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div className='flex justify-between mt-6' variants={fadeIn}>
                <motion.button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium shadow-md flex items-center' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <XCircle size={16} className='mr-2' />
                  Delete Assessment
                </motion.button>
                <motion.button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-md flex items-center' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <CheckCircle size={16} className='mr-2' />
                  Save Changes
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}

// Star component for ratings
function Star({ filled, small = false }: { filled: boolean; small?: boolean }) {
  return (
    <svg width={small ? "12" : "18"} height={small ? "12" : "18"} viewBox='0 0 24 24' fill={filled ? "#FACC15" : "none"} stroke={filled ? "#FACC15" : "#6B7280"} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='ml-0.5'>
      <polygon points='12 2 15.09 8.26 22 9.24 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.24 8.91 8.26' />
    </svg>
  );
}

export default AssessmentDetailsPage;
