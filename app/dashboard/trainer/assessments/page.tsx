"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, Users, ChevronRight, BarChart2, Award, TrendingUp, Sparkles, Search, Filter, Download, Plus, User, AlertTriangle, Settings, Sun, Moon } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
// Sample trainer assessment data
const trainerData = {
  Students: [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Developer",
      department: "Engineering",
      avgScore: 85,
      assessmentsDue: 1,
      assessmentsCompleted: 3,
      lastAssessment: "Apr 15, 2025",
      trend: "up",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Project Manager",
      department: "Operations",
      avgScore: 92,
      assessmentsDue: 0,
      assessmentsCompleted: 4,
      lastAssessment: "Apr 22, 2025",
      trend: "up",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Data Analyst",
      department: "Analytics",
      avgScore: 78,
      assessmentsDue: 2,
      assessmentsCompleted: 2,
      lastAssessment: "Mar 30, 2025",
      trend: "down",
    },
    {
      id: 4,
      name: "Rachel Lee",
      role: "UX Designer",
      department: "Design",
      avgScore: 88,
      assessmentsDue: 1,
      assessmentsCompleted: 3,
      lastAssessment: "Apr 10, 2025",
      trend: "flat",
    },
    {
      id: 5,
      name: "David Chen",
      role: "Marketing Specialist",
      department: "Marketing",
      avgScore: 81,
      assessmentsDue: 1,
      assessmentsCompleted: 2,
      lastAssessment: "Mar 15, 2025",
      trend: "up",
    },
  ],
  upcomingAssessments: [
    {
      id: 1,
      title: "Quarterly Technical Skills",
      department: "Engineering",
      dueDate: "May 15, 2025",
      duration: "2 hours",
      StudentsAssigned: 8,
      StudentsCompleted: 0,
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Leadership Competency",
      department: "Multiple",
      dueDate: "May 10, 2025",
      duration: "1.5 hours",
      StudentsAssigned: 12,
      StudentsCompleted: 3,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Annual Performance Review",
      department: "All",
      dueDate: "June 30, 2025",
      StudentsAssigned: 45,
      StudentsCompleted: 0,
      status: "Not Started",
    },
  ],
  stats: {
    totalStudents: 45,
    assessmentsScheduled: 5,
    assessmentsCompleted: 87,
    overdueAssessments: 3,
    averageCompletionRate: 92,
    departmentsTracked: [
      { name: "Engineering", Students: 15, avgScore: 84 },
      { name: "Operations", Students: 8, avgScore: 89 },
      { name: "Marketing", Students: 6, avgScore: 81 },
      { name: "Analytics", Students: 9, avgScore: 86 },
      { name: "Design", Students: 7, avgScore: 88 },
    ],
  },
  recentActivities: [
    { Student: "Sarah Williams", action: "completed", assessment: "Project Management Skills", time: "2 hours ago" },
    { Student: "Alex Johnson", action: "started", assessment: "Technical Skills Assessment", time: "5 hours ago" },
    { Student: "Rachel Lee", action: "submitted", assessment: "UI/UX Evaluation", time: "1 day ago" },
    { Student: "David Chen", action: "missed deadline", assessment: "Marketing Strategy Test", time: "2 days ago" },
  ],
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

// Custom score color function
const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-500 dark:text-emerald-400";
  if (score >= 80) return "text-blue-500 dark:text-blue-400";
  if (score >= 70) return "text-yellow-500 dark:text-yellow-400";
  return "text-red-500 dark:text-red-400";
};

// Get trend icon
const getTrendIcon = (trend: string) => {
  if (trend === "up") return <span className='text-green-500'>↑</span>;
  if (trend === "down") return <span className='text-red-500'>↓</span>;
  return <span className='text-gray-500'>→</span>;
};

// Assessment type definition
interface Assessment {
  id: number;
  title: string;
  department: string;
  dueDate: string;
  duration: string;
  StudentsAssigned: number;
  StudentsCompleted: number;
  status: string;
}

function TrainerAssessmentPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [activeTab, setActiveTab] = useState("Students");

  // Filter Students based on search and department
  const filteredStudents = trainerData.Students.filter((Student) => {
    const matchesSearch = Student.name.toLowerCase().includes(searchTerm.toLowerCase()) || Student.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || Student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Department options
  const departments = ["All", ...new Set(trainerData.Students.map((Student) => Student.department))];

  // Trigger animations after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout userRole='trainer'>
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 pb-8'>
        {/* Header */}
        <header className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900 text-white py-6 px-6 shadow-lg'>
          <div className='flex justify-between items-center max-w-7xl mx-auto'>
            <div className='flex items-center space-x-2'>
              <Award className='h-8 w-8 text-yellow-300' />
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>Trainer Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='container max-w-7xl mx-auto px-4 py-6'>
          {/* Stats Overview Cards */}
          <section className='mb-12'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400'>Dashboard Overview</h2>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>Q2 2025</span>
                <div className='bg-indigo-100 dark:bg-indigo-900/40 p-1.5 rounded-md'>
                  <Download size={16} className='text-indigo-600 dark:text-indigo-400' />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* Total Students Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 mr-3'>
                    <Users className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Total Students</h3>
                </div>
                <p className='text-4xl font-bold text-indigo-600 dark:text-indigo-400'>{trainerData.stats.totalStudents}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Across {trainerData.stats.departmentsTracked.length} departments</p>
              </motion.div>

              {/* Assessments Scheduled Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 mr-3'>
                    <Calendar className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Scheduled</h3>
                </div>
                <p className='text-4xl font-bold text-blue-600 dark:text-blue-400'>{trainerData.stats.assessmentsScheduled}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>In the next 30 days</p>
              </motion.div>

              {/* Completion Rate Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-500 mr-3'>
                    <CheckCircle className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Completion Rate</h3>
                </div>
                <p className='text-4xl font-bold text-green-600 dark:text-green-400'>{trainerData.stats.averageCompletionRate}%</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Last 30 days · {trainerData.stats.assessmentsCompleted} total</p>
              </motion.div>

              {/* Overdue Assessments Card */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden relative border border-transparent hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.4 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <div className='absolute top-0 right-0 h-20 w-20 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                <div className='flex items-center mb-4'>
                  <div className='p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-500 mr-3'>
                    <AlertTriangle className='h-5 w-5' />
                  </div>
                  <h3 className='font-medium'>Overdue</h3>
                </div>
                <p className='text-4xl font-bold text-amber-600 dark:text-amber-400'>{trainerData.stats.overdueAssessments}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Requiring attention</p>
              </motion.div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow mb-8'>
            <div className='flex border-b border-gray-200 dark:border-gray-700'>
              <button className={`px-6 py-3 font-medium text-sm flex-grow text-center border-b-2 transition-all duration-200 ${activeTab === "Students" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("Students")}>
                Manage Students
              </button>
              <button className={`px-6 py-3 font-medium text-sm flex-grow text-center border-b-2 transition-all duration-200 ${activeTab === "assessments" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("assessments")}>
                Assessments
              </button>
              <button className={`px-6 py-3 font-medium text-sm flex-grow text-center border-b-2 transition-all duration-200 ${activeTab === "analytics" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("analytics")}>
                Analytics
              </button>
              <button className={`px-6 py-3 font-medium text-sm flex-grow text-center border-b-2 transition-all duration-200 ${activeTab === "activity" ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`} onClick={() => setActiveTab("activity")}>
                Recent Activity
              </button>
            </div>
          </div>

          {/* Dynamic content based on active tab */}
          {activeTab === "Students" && (
            <section>
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
                <h2 className='text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400'>Students Overview</h2>
                <div className='flex flex-col md:flex-row gap-3 w-full md:w-auto'>
                  <div className='relative flex-grow md:flex-grow-0'>
                    <input type='text' placeholder='Search Students...' className='w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={16} />
                  </div>
                  <select className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <button className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 font-medium'>
                    <Plus size={16} />
                    Add Student
                  </button>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full bg-white dark:bg-gray-800 rounded-xl shadow'>
                  <thead>
                    <tr className='bg-gray-50 dark:bg-gray-700/50 text-left'>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Student</th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Department</th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Average Score</th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Status</th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Last Assessment</th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {filteredStudents.map((Student) => (
                      <motion.tr key={Student.id} className='hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 flex items-center justify-center mr-3'>
                              <User size={16} />
                            </div>
                            <div>
                              <div className='font-medium'>{Student.name}</div>
                              <div className='text-sm text-gray-500 dark:text-gray-400'>{Student.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'>{Student.department}</span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <span className={`text-lg font-semibold ${getScoreColor(Student.avgScore)}`}>{Student.avgScore}%</span>
                            <span className='ml-2'>{getTrendIcon(Student.trend)}</span>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm'>
                            <div className='flex items-center gap-1'>
                              <span className={Student.assessmentsDue > 0 ? "text-amber-500" : "text-green-500"}>{Student.assessmentsDue > 0 ? `${Student.assessmentsDue} assessment(s) due` : "Up to date"}</span>
                            </div>
                            <div className='text-xs text-gray-500 dark:text-gray-400'>{Student.assessmentsCompleted} completed</div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300'>{Student.lastAssessment}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-right'>
                          <div className='flex space-x-2 justify-end'>
                            <button className='p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'>
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "assessments" && (
            <section>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400'>Assessment Management</h2>
                <button className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 font-medium'>
                  <Plus size={16} />
                  Create Assessment
                </button>
              </div>

              {/* Scheduled/Upcoming Assessments */}
              <div className='mb-10'>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <Calendar size={18} className='mr-2 text-indigo-500' />
                  Upcoming Assessments
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {trainerData.upcomingAssessments.map((assessment, idx) => (
                    <motion.div key={assessment.id} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group cursor-pointer' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                      <div
                        className={`px-5 py-3 flex justify-between items-center
                        ${assessment.status === "In Progress" ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800" : assessment.status === "Scheduled" ? "bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800" : "bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800"}`}
                      >
                        <h3 className='font-semibold text-white'>{assessment.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium
                          ${assessment.status === "In Progress" ? "bg-blue-100 text-blue-800" : assessment.status === "Scheduled" ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {assessment.status}
                        </span>
                      </div>
                      <div className='p-5'>
                        <div className='flex justify-between items-center mb-4'>
                          <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                            <Calendar size={16} className='mr-1.5 text-indigo-500' />
                            <span>Due {assessment.dueDate}</span>
                          </div>
                          <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                            <Clock size={16} className='mr-1.5 text-indigo-500' />
                            <span>{assessment.duration}</span>
                          </div>
                        </div>
                        <div className='flex justify-between items-center mb-4 gap-2'>
                          <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                            <Users size={16} className='mr-1.5 text-indigo-500' />
                            {/* <span>Completion</span> */}
                            <span>
                              {assessment.StudentsCompleted}/{assessment.StudentsAssigned}
                            </span>
                          </div>
                          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div className='bg-indigo-500 h-2 rounded-full' style={{ width: `${(assessment.StudentsCompleted / assessment.StudentsAssigned) * 100}%` }}></div>
                          </div>
                        </div>
                        <div className='flex justify-end'>
                          <button className='px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium flex items-center' onClick={() => router.push(`/dashboard/trainer/assessments/${assessment.id}`)}>
                            Manage
                            <ChevronRight size={16} className='ml-1' />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "analytics" && (
            <section>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400'>Performance Analytics</h2>
                <div className='flex items-center gap-3'>
                  <select className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                  </select>
                  <button className='p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700'>
                    <Download size={16} className='text-gray-500' />
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                {/* Department Performance Card */}
                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h3 className='text-lg font-semibold mb-4 flex items-center'>
                    <BarChart2 size={18} className='mr-2 text-indigo-500' />
                    Department Performance
                  </h3>
                  <div className='space-y-4 mt-6'>
                    {trainerData.stats.departmentsTracked.map((dept, idx) => (
                      <div key={dept.name} className='mb-4'>
                        <div className='flex justify-between items-center mb-1'>
                          <span className='font-medium text-sm'>{dept.name}</span>
                          <span className={`font-semibold ${getScoreColor(dept.avgScore)}`}>{dept.avgScore}%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden'>
                          <motion.div className={`h-2.5 rounded-full ${dept.avgScore >= 90 ? "bg-emerald-500" : dept.avgScore >= 80 ? "bg-blue-500" : dept.avgScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`} initial='hidden' animate={isLoaded ? "visible" : "hidden"} custom={dept.avgScore} variants={progressVariants} transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}></motion.div>
                        </div>
                        <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{dept.Students} Students</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills Gap Analysis Card */}
                <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.3 }}>
                  <h3 className='text-lg font-semibold mb-4 flex items-center'>
                    <TrendingUp size={18} className='mr-2 text-indigo-500' />
                    Skills Distribution
                  </h3>
                  <div className='h-64 flex items-center justify-center'>
                    <p className='text-gray-500 dark:text-gray-400 text-center'>
                      Skills distribution chart would go here.
                      <br />
                      (Visualization placeholder)
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Trends and Insights */}
              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.4 }}>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <Sparkles size={18} className='mr-2 text-indigo-500' />
                  Insights & Recommendations
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800'>
                    <h4 className='font-medium text-blue-700 dark:text-blue-400 mb-2'>Engineering Department</h4>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>Technical skills assessment scores dropping by 5% since last quarter. Consider refresher training.</p>
                  </div>
                  <div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800'>
                    <h4 className='font-medium text-green-700 dark:text-green-400 mb-2'>Top Performer</h4>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>Sarah Williams consistently scores 90%+ across all assessments. Consider mentorship program.</p>
                  </div>
                  <div className='bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800'>
                    <h4 className='font-medium text-amber-700 dark:text-amber-400 mb-2'>Overdue Assessments</h4>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>3 Students have missed assessment deadlines. Schedule follow-up sessions.</p>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {activeTab === "activity" && (
            <section>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400'>Recent Activity</h2>
                <button className='px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg font-medium'>View All</button>
              </div>

              <motion.div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden' initial='hidden' animate={isLoaded ? "visible" : "hidden"} variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 }}>
                <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {trainerData.recentActivities.map((activity, idx) => (
                    <motion.div key={idx} className='p-5 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors duration-150' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}>
                      <div className='flex items-start'>
                        <div className='h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 flex items-center justify-center mr-4'>
                          <User size={16} />
                        </div>
                        <div className='flex-1'>
                          <p className='text-gray-800 dark:text-gray-200'>
                            <span className='font-semibold'>{activity.Student}</span>{" "}
                            <span
                              className={`
                              ${activity.action === "completed" ? "text-green-600 dark:text-green-400" : ""}
                              ${activity.action === "started" ? "text-blue-600 dark:text-blue-400" : ""}
                              ${activity.action === "submitted" ? "text-indigo-600 dark:text-indigo-400" : ""}
                              ${activity.action === "missed deadline" ? "text-red-600 dark:text-red-400" : ""}
                            `}
                            >
                              {activity.action}
                            </span>{" "}
                            the <span className='italic'>{activity.assessment}</span>
                          </p>
                          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{activity.time}</p>
                        </div>
                        <button className='p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}

export default TrainerAssessmentPage;
