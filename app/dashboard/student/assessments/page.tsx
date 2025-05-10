"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, FileText, CheckCircle, AlertTriangle, Award, BookOpen, Sparkles, PieChart, Clock3, ThumbsUp, BarChart3, Code2, Star, Download, Send, User, Book } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

interface Section {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Not Started";
  score: string;
  timeSpent: string;
  feedback: string;
}

interface Resource {
  name: string;
  type: "PDF" | "Code";
}

interface Announcement {
  date: string;
  message: string;
}

interface PeerStats {
  averageCompletion: number;
  averageScore: number;
  topScore: number;
}

interface AssessmentData {
  title: string;
  code: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Not Started";
  timeRemaining: string;
  progress: number;
  maxGrade: number;
  description: string;
  instructor: string;
  weightage: string;
  sections: Section[];
  resources: Resource[];
  announcements: Announcement[];
  peerStats: PeerStats;
}

export default function StudentAssessmentPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"overview" | "sections" | "resources" | "analytics" | "announcements">("overview");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "in progress" | "not started">("all");
  const [showAchievement, setShowAchievement] = useState<boolean>(false);

  useEffect(() => {
    // Simulate progress animation
    const timer = setTimeout(() => {
      setProgressValue(75);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show achievement notification after 3 seconds
    const timer = setTimeout(() => {
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDarkModeToggle = (): void => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const assessmentData: AssessmentData = {
    title: "Advanced Data Structures & Algorithms",
    code: "CS-301",
    dueDate: "May 15, 2025, 11:59 PM",
    status: "In Progress",
    timeRemaining: "3 days, 4 hours",
    progress: 75,
    maxGrade: 100,
    description: "This assessment tests your understanding of advanced data structures, algorithm complexity analysis, and problem-solving techniques. Complete all sections to demonstrate your mastery of the course material.",
    instructor: "Dr. Emily Chen",
    weightage: "30% of final grade",
    sections: [
      {
        id: 1,
        title: "Multiple Choice Questions",
        status: "Completed",
        score: "18/20",
        timeSpent: "45 minutes",
        feedback: "Good understanding of theoretical concepts. Review heap operations.",
      },
      {
        id: 2,
        title: "Short Answer Questions",
        status: "Completed",
        score: "15/20",
        timeSpent: "1 hour 10 minutes",
        feedback: "Well-articulated explanations. Be more concise in your time complexity analyses.",
      },
      {
        id: 3,
        title: "Programming Challenge",
        status: "In Progress",
        score: "17/30",
        timeSpent: "2 hours 30 minutes",
        feedback: "Good progress. Your graph algorithm needs optimization.",
      },
      {
        id: 4,
        title: "Final Project Submission",
        status: "Not Started",
        score: "0/30",
        timeSpent: "0 minutes",
        feedback: "",
      },
    ],
    resources: [
      { name: "Assessment Guidelines", type: "PDF" },
      { name: "Lecture Notes - Advanced Trees", type: "PDF" },
      { name: "Algorithm Complexity Cheat Sheet", type: "PDF" },
      { name: "Sample Solutions for Practice Questions", type: "Code" },
    ],
    announcements: [
      {
        date: "May 8, 2025",
        message: "Extended deadline for Final Project Submission section by 24 hours.",
      },
      {
        date: "May 7, 2025",
        message: "Additional resources for graph algorithms added to the resources section.",
      },
    ],
    peerStats: {
      averageCompletion: 65,
      averageScore: 72,
      topScore: 92,
    },
  };

  // Animation for confetti effect
  const renderConfetti = (): React.ReactElement | null => {
    if (!showConfetti) return null;

    const confettiPieces = Array(50)
      .fill(null)
      .map((_, i) => {
        const randomLeft = Math.floor(Math.random() * 100);
        const randomDelay = Math.random() * 2;
        const randomSize = Math.floor(Math.random() * 10) + 5;
        const colors = ["bg-purple-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={i}
            className={`absolute ${randomColor} rounded-full animate-confetti`}
            style={{
              left: `${randomLeft}%`,
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animationDelay: `${randomDelay}s`,
            }}
          />
        );
      });

    return <div className='fixed inset-0 pointer-events-none overflow-hidden z-50'>{confettiPieces}</div>;
  };

  const getStatusIcon = (status: "Completed" | "In Progress" | "Not Started"): React.ReactElement => {
    switch (status) {
      case "Completed":
        return <CheckCircle className='text-green-500' />;
      case "In Progress":
        return <Clock3 className='text-blue-500' />;
      case "Not Started":
        return <AlertTriangle className='text-yellow-500' />;
      default:
        return <FileText />;
    }
  };

  const getStatusColor = (status: "Completed" | "In Progress" | "Not Started"): string => {
    switch (status) {
      case "Completed":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "In Progress":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
      case "Not Started":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-800";
    }
  };

  const filterSections = (sections: Section[]): Section[] => {
    if (activeFilter === "all") return sections;
    return sections.filter((section) => section.status.toLowerCase() === activeFilter.toLowerCase());
  };

  return (
    <DashboardLayout userRole="student">
    <div className={`min-h-screen transition duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Achievement notification */}
    

      {/* Top Navigation Bar */}
      <nav className='bg-white dark:bg-gray-800 shadow-md'>
        <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <BookOpen className='h-6 w-6 text-purple-600 dark:text-purple-400' />
            <span className='font-bold text-lg text-gray-800 dark:text-white'>eduPulse</span>
          </div>

          <div className='flex items-center space-x-6'>
            <button className='bg-gray-200 dark:bg-gray-700 rounded-full w-12 h-6 flex items-center transition duration-300 focus:outline-none shadow' onClick={handleDarkModeToggle}>
              <div className={`bg-white dark:bg-purple-500 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-1"} flex items-center justify-center`}>{darkMode ? <span className='text-xs'>🌙</span> : <span className='text-xs'>☀️</span>}</div>
            </button>

            <div className='flex items-center space-x-2'>
              <div className='bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center'>
                <User className='h-4 w-4' />
              </div>
              <span className='text-sm font-medium hidden sm:block text-gray-800 dark:text-white'>Alex Johnson</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        {/* Header */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <div className='flex items-center space-x-2'>
                <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>{assessmentData.title}</h1>
                <span className='text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2.5 py-1 rounded'>{assessmentData.code}</span>
              </div>

              <div className='mt-2 flex flex-wrap gap-3'>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                  <Clock className='h-4 w-4 mr-1' />
                  Due: {assessmentData.dueDate}
                </div>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                  <User className='h-4 w-4 mr-1' />
                  {assessmentData.instructor}
                </div>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-300'>
                  <Award className='h-4 w-4 mr-1' />
                  {assessmentData.weightage}
                </div>
              </div>
            </div>

            <div className='mt-4 md:mt-0 flex flex-col items-center'>
              <div className='flex items-center'>
                <div className='relative h-16 w-16'>
                  <svg className='h-full w-full' viewBox='0 0 36 36'>
                    <circle cx='18' cy='18' r='16' fill='none' className='stroke-current text-gray-200 dark:text-gray-700' strokeWidth='2' />
                    <circle cx='18' cy='18' r='16' fill='none' className='stroke-current text-purple-500' strokeWidth='2' strokeDasharray='100' strokeDashoffset={100 - progressValue} strokeLinecap='round' transform='rotate(-90 18 18)' />
                  </svg>
                  <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center'>
                    <span className='text-lg font-bold text-gray-800 dark:text-white'>{progressValue}%</span>
                  </div>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-800 dark:text-white'>Completion</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessmentData.status)}`}>{assessmentData.status}</div>
                </div>
              </div>
              <p className='mt-2 text-sm text-red-500 flex items-center'>
                <Clock3 className='h-4 w-4 mr-1' />
                {assessmentData.timeRemaining} remaining
              </p>
            </div>
          </div>

          {/* Description */}
          <div className='mt-6'>
            <p className='text-gray-600 dark:text-gray-300'>{assessmentData.description}</p>
          </div>

          {/* Action buttons */}
          <div className='mt-6 flex flex-wrap gap-3'>
            <button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300'>
              <Send className='h-4 w-4 mr-2' />
              Submit Assessment
            </button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300'>
              <BookOpen className='h-4 w-4 mr-2' />
              Continue Working
            </button>
            <button className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300'>
              <Download className='h-4 w-4 mr-2' />
              Download Resources
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className='flex overflow-x-auto space-x-4 mb-6 pb-2'>
          <button onClick={() => setSelectedTab("overview")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${selectedTab === "overview" ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            Overview
          </button>
          <button onClick={() => setSelectedTab("sections")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${selectedTab === "sections" ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            Sections
          </button>
          <button onClick={() => setSelectedTab("resources")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${selectedTab === "resources" ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            Resources
          </button>
          <button onClick={() => setSelectedTab("analytics")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${selectedTab === "analytics" ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            Analytics
          </button>
          <button onClick={() => setSelectedTab("announcements")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 flex items-center ${selectedTab === "announcements" ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            Announcements
            <span className='ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>{assessmentData.announcements.length}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-6'>Assessment Overview</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Progress & Stats Card */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Your Progress</h3>

                  <div className='space-y-4'>
                    <div>
                      <div className='flex justify-between mb-1'>
                        <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Completion</span>
                        <span className='text-sm font-medium text-gray-800 dark:text-white'>{progressValue}%</span>
                      </div>
                      <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                        <div className='bg-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out' style={{ width: `${progressValue}%` }}></div>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>Sections Completed</span>
                          <span className='text-lg font-bold text-gray-800 dark:text-white'>2/4</span>
                        </div>
                      </div>
                      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>Current Score</span>
                          <span className='text-lg font-bold text-green-500'>50/100</span>
                        </div>
                      </div>
                      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>Time Spent</span>
                          <span className='text-lg font-bold text-gray-800 dark:text-white'>4h 25m</span>
                        </div>
                      </div>
                      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-600 dark:text-gray-400'>Est. Time Left</span>
                          <span className='text-lg font-bold text-orange-500'>3h 15m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class Comparison Card */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Class Comparison</h3>

                  <div className='space-y-6'>
                    <div>
                      <div className='flex justify-between mb-1'>
                        <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Class Average Completion</span>
                        <span className='text-sm font-medium text-gray-800 dark:text-white'>{assessmentData.peerStats.averageCompletion}%</span>
                      </div>
                      <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                        <div className='bg-blue-500 h-2.5 rounded-full' style={{ width: `${assessmentData.peerStats.averageCompletion}%` }}></div>
                      </div>
                      <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-1 relative'>
                        <div className='bg-purple-600 h-2.5 rounded-full' style={{ width: `${progressValue}%` }}></div>
                        <div className='absolute -top-6 -ml-2.5 text-xs' style={{ left: `${progressValue}%` }}>
                          <span className='px-2 py-1 bg-purple-600 text-white rounded-md'>You</span>
                        </div>
                      </div>
                    </div>

                    <div className='flex space-x-4 items-center'>
                      <div className='flex-1 text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Class Average</p>
                        <p className='text-xl font-bold text-blue-500'>{assessmentData.peerStats.averageScore}/100</p>
                      </div>
                      <div className='flex-1 text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Top Score</p>
                        <p className='text-xl font-bold text-yellow-500'>{assessmentData.peerStats.topScore}/100</p>
                      </div>
                    </div>

                    <div className='mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg'>
                      <div className='flex items-start'>
                        <Sparkles className='h-5 w-5 mr-2 text-blue-500 mt-0.5' />
                        <div>
                          <p className='text-sm font-medium text-blue-800 dark:text-blue-200'>Performance Insight</p>
                          <p className='text-sm text-blue-600 dark:text-blue-300'>You're in the top 25% of the class! Your approach to algorithm complexity analysis is particularly strong.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Upcoming Deadlines</h3>

                  <div className='bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-semibold text-gray-800 dark:text-white'>Final Project Submission</h4>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>Section 4 of this assessment</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium text-gray-800 dark:text-white'>May 15, 2025</p>
                        <p className='text-xs text-red-500'>3 days, 4 hours remaining</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback Summary */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center'>
                    Feedback Summary
                    <span className='ml-2 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>New</span>
                  </h3>

                  <div className='space-y-3'>
                    <div className='bg-white dark:bg-gray-800 rounded-lg p-4'>
                      <div className='flex items-start'>
                        <ThumbsUp className='h-5 w-5 text-green-500 mr-3 mt-1' />
                        <div>
                          <p className='text-sm text-gray-800 dark:text-white'>Good understanding of theoretical concepts. Review heap operations.</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Multiple Choice Questions</p>
                        </div>
                      </div>
                    </div>

                    <div className='bg-white dark:bg-gray-800 rounded-lg p-4'>
                      <div className='flex items-start'>
                        <ThumbsUp className='h-5 w-5 text-green-500 mr-3 mt-1' />
                        <div>
                          <p className='text-sm text-gray-800 dark:text-white'>Well-articulated explanations. Be more concise in your time complexity analyses.</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Short Answer Questions</p>
                        </div>
                      </div>
                    </div>

                    <div className='bg-white dark:bg-gray-800 rounded-lg p-4'>
                      <div className='flex items-start'>
                        <AlertTriangle className='h-5 w-5 text-yellow-500 mr-3 mt-1' />
                        <div>
                          <p className='text-sm text-gray-800 dark:text-white'>Your graph algorithm needs optimization. Consider using adjacency lists instead of matrices.</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Programming Challenge</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {selectedTab === "sections" && (
            <div>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800 dark:text-white'>Assessment Sections</h2>

                {/* Filter buttons */}
                <div className='flex space-x-2'>
                  <button onClick={() => setActiveFilter("all")} className={`px-3 py-1 text-xs font-medium rounded-md ${activeFilter === "all" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    All
                  </button>
                  <button onClick={() => setActiveFilter("completed")} className={`px-3 py-1 text-xs font-medium rounded-md ${activeFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    Completed
                  </button>
                  <button onClick={() => setActiveFilter("in progress")} className={`px-3 py-1 text-xs font-medium rounded-md ${activeFilter === "in progress" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    In Progress
                  </button>
                  <button onClick={() => setActiveFilter("not started")} className={`px-3 py-1 text-xs font-medium rounded-md ${activeFilter === "not started" ? "bg-yellow-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    Not Started
                  </button>
                </div>
              </div>

              {/* Sections list */}
              <div className='space-y-4'>
                {filterSections(assessmentData.sections).map((section: Section) => (
                  <div key={section.id} className='bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300'>
                    <div className='p-5'>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          {getStatusIcon(section.status)}
                          <h3 className='ml-3 text-lg font-medium text-gray-800 dark:text-white'>{section.title}</h3>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(section.status)}`}>{section.status}</div>
                      </div>

                      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='flex items-center'>
                          <div className='h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                            <Award className='h-5 w-5 text-blue-500' />
                          </div>
                          <div className='ml-3'>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Score</p>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>{section.score}</p>
                          </div>
                        </div>

                        <div className='flex items-center'>
                          <div className='h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                            <Clock className='h-5 w-5 text-purple-500' />
                          </div>
                          <div className='ml-3'>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>Time Spent</p>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>{section.timeSpent}</p>
                          </div>
                        </div>

                        {section.feedback && (
                          <div className='flex items-center'>
                            <div className='h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                              <FileText className='h-5 w-5 text-green-500' />
                            </div>
                            <div className='ml-3'>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>Feedback</p>
                              <p className='text-sm font-medium text-gray-800 dark:text-white truncate max-w-xs'>
                                {section.feedback.slice(0, 30)}
                                {section.feedback.length > 30 ? "..." : ""}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className='mt-4 flex justify-end space-x-3'>
                        {section.status !== "Completed" && <button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-lg transition-colors duration-300'>{section.status === "Not Started" ? "Start Section" : "Continue Working"}</button>}
                        {section.status === "Completed" && <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded-lg transition-colors duration-300'>View Feedback</button>}
                        <button className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm rounded-lg transition-colors duration-300'>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {selectedTab === "resources" && (
            <div>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-6'>Assessment Resources</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Resources list */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Available Resources</h3>

                  <div className='space-y-3'>
                    {assessmentData.resources.map((resource, index) => (
                      <div key={index} className='bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300'>
                        <div className='flex items-center'>
                          {resource.type === "PDF" ? (
                            <div className='h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center'>
                              <FileText className='h-5 w-5 text-red-500' />
                            </div>
                          ) : (
                            <div className='h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                              <Code2 className='h-5 w-5 text-blue-500' />
                            </div>
                          )}
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>{resource.name}</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>{resource.type}</p>
                          </div>
                        </div>
                        <button className='text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'>
                          <Download className='h-5 w-5' />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Recommended Resources */}
                  <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Recommended Resources</h3>

                    <div className='space-y-3'>
                      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow duration-300'>
                        <div className='h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
                          <Book className='h-5 w-5 text-purple-500' />
                        </div>
                        <div className='ml-3 flex-grow'>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>Advanced Graph Algorithms Tutorial</p>
                            <div className='flex'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className='h-4 w-4 text-yellow-400' fill={star <= 4 ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Based on your progress in Programming Challenge</p>
                        </div>
                      </div>

                      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow duration-300'>
                        <div className='h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
                          <Book className='h-5 w-5 text-green-500' />
                        </div>
                        <div className='ml-3 flex-grow'>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>Heap Operations Quick Reference</p>
                            <div className='flex'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className='h-4 w-4 text-yellow-400' fill={star <= 5 ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>Recommended based on your quiz performance</p>
                        </div>
                      </div>

                      <div className='bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow duration-300'>
                        <div className='h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                          <Book className='h-5 w-5 text-blue-500' />
                        </div>
                        <div className='ml-3 flex-grow'>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm font-medium text-gray-800 dark:text-white'>Time Complexity Analysis Framework</p>
                            <div className='flex'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className='h-4 w-4 text-yellow-400' fill={star <= 4 ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>From the class library</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {selectedTab === "analytics" && (
            <div>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-6'>Performance Analytics</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Time Spent Analytics */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Time Distribution</h3>

                  <div className='aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg p-4'>
                    <div className='flex items-center justify-center h-full'>
                      <PieChart className='h-40 w-40 text-gray-300 dark:text-gray-600' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>Total Time Spent</p>
                          <p className='text-2xl font-bold text-gray-800 dark:text-white'>4h 25m</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 space-y-3'>
                    <div className='flex items-center'>
                      <div className='h-4 w-4 bg-purple-500 rounded-sm mr-2'></div>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>Multiple Choice Questions (45m)</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='h-4 w-4 bg-blue-500 rounded-sm mr-2'></div>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>Short Answer Questions (1h 10m)</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='h-4 w-4 bg-green-500 rounded-sm mr-2'></div>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>Programming Challenge (2h 30m)</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='h-4 w-4 bg-gray-300 dark:bg-gray-500 rounded-sm mr-2'></div>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>Final Project (0m)</span>
                    </div>
                  </div>
                </div>

                {/* Score Analytics */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Score Distribution</h3>

                  <div className='aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg p-4'>
                    <div className='h-full flex items-end justify-around'>
                      <div className='flex flex-col items-center'>
                        <div className='bg-purple-500 w-12 h-16 rounded-t-lg'></div>
                        <p className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2'>MCQ</p>
                        <p className='text-xs font-bold text-gray-800 dark:text-white'>90%</p>
                      </div>
                      <div className='flex flex-col items-center'>
                        <div className='bg-blue-500 w-12 h-12 rounded-t-lg'></div>
                        <p className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2'>SAQ</p>
                        <p className='text-xs font-bold text-gray-800 dark:text-white'>75%</p>
                      </div>
                      <div className='flex flex-col items-center'>
                        <div className='bg-green-500 w-12 h-9 rounded-t-lg'></div>
                        <p className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2'>Prog</p>
                        <p className='text-xs font-bold text-gray-800 dark:text-white'>57%</p>
                      </div>
                      <div className='flex flex-col items-center'>
                        <div className='bg-gray-300 dark:bg-gray-500 w-12 h-0 rounded-t-lg'></div>
                        <p className='text-xs font-medium text-gray-600 dark:text-gray-400 mt-2'>Final</p>
                        <p className='text-xs font-bold text-gray-800 dark:text-white'>0%</p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg'>
                    <div className='flex items-start'>
                      <BarChart3 className='h-5 w-5 text-blue-500 mr-2 mt-0.5' />
                      <div>
                        <p className='text-sm font-medium text-blue-800 dark:text-blue-200'>Score Analysis</p>
                        <p className='text-sm text-blue-600 dark:text-blue-300'>You excel in theoretical questions but need improvement in practical implementation. Focus on optimizing your code in the programming challenge.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Assessment */}
                <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6 col-span-1 md:col-span-2'>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>Skills Assessment</h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Algorithm Analysis</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>85%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-green-500 h-2.5 rounded-full' style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Data Structures</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>80%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-green-500 h-2.5 rounded-full' style={{ width: "80%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Problem Solving</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>78%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-green-500 h-2.5 rounded-full' style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Code Optimization</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>62%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-yellow-500 h-2.5 rounded-full' style={{ width: "62%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Graph Algorithms</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>55%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-yellow-500 h-2.5 rounded-full' style={{ width: "55%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className='flex justify-between mb-1'>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>Heap Operations</span>
                          <span className='text-sm font-medium text-gray-600 dark:text-gray-300'>65%</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5'>
                          <div className='bg-yellow-500 h-2.5 rounded-full' style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {selectedTab === "announcements" && (
            <div>
              <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-6'>Announcements</h2>

              <div className='space-y-4'>
                {assessmentData.announcements.map((announcement, index) => (
                  <div key={index} className='bg-white dark:bg-gray-700 rounded-lg p-5 shadow-sm'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center'>
                          <User className='h-5 w-5 text-purple-600' />
                        </div>
                        <div className='ml-3'>
                          <p className='text-sm font-medium text-gray-800 dark:text-white'>{assessmentData.instructor}</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>{announcement.date}</p>
                        </div>
                      </div>
                      {index === 0 && <span className='bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>New</span>}
                    </div>

                    <div className='mt-4'>
                      <p className='text-gray-700 dark:text-gray-300'>{announcement.message}</p>
                    </div>

                    <div className='mt-4 flex justify-end'>
                      <button className='text-purple-600 hover:text-purple-800 dark:text-purple-400 text-sm font-medium'>Acknowledge</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer className='bg-white dark:bg-gray-800 shadow-md mt-8'>
            <div className='max-w-7xl mx-auto px-4 py-6'>
              <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='flex items-center mb-4 md:mb-0'>
                  <BookOpen className='h-6 w-6 text-purple-600 dark:text-purple-400 mr-2' />
                  <span className='font-bold text-gray-800 dark:text-white'>eduPulse</span>
                  <span className='text-gray-500 dark:text-gray-400 text-sm ml-2'>© 2025 All rights reserved</span>
                </div>

                <div className='flex space-x-6'>
                  <a href='#' className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 text-sm'>
                    Help Center
                  </a>
                  <a href='#' className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 text-sm'>
                    Privacy Policy
                  </a>
                  <a href='#' className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 text-sm'>
                    Terms of Service
                  </a>
                  <a href='#' className='text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 text-sm'>
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
