"use client";
import { useState } from "react";
import { BookOpen, Award, Calendar, Clock, PieChart, Bookmark, CheckCircle, Smile, Star, BarChart, FileText, ArrowRight, User, Mail, Phone, MapPin, Building, Book, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

// Define types for the student data
interface Badge {
  name: string;
  icon: "Star" | "Award" | "CheckCircle";
  count: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  institution: string;
  grade: string;
  enrollmentDate: string;
  avatar: string;
  bio: string;
  attendance: number;
  overallProgress: number;
  averageScore: number;
  completedCourses: number;
  activeCourses: number;
  assessmentsDue: number;
  badges: Badge[];
}

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample student data
  const student: Student = {
    id: "ST12345",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 234 567 8910",
    address: "123 Campus Drive, College Town",
    institution: "Riverside High School",
    grade: "11th Grade",
    enrollmentDate: "September 5, 2024",
    avatar: "/api/placeholder/150/150",
    bio: "Enthusiastic student passionate about mathematics and science. Aims to pursue engineering in college.",
    attendance: 95,
    overallProgress: 78,
    averageScore: 87,
    completedCourses: 7,
    activeCourses: 3,
    assessmentsDue: 2,
    badges: [
      { name: "Math Whiz", icon: "Star", count: 3 },
      { name: "Science Pro", icon: "Award", count: 2 },
      { name: "Perfect Attendance", icon: "CheckCircle", count: 1 },
    ],
  };

  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      progress: 85,
      score: 92,
      lastActivity: "2 days ago",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Physics Fundamentals",
      progress: 70,
      score: 85,
      lastActivity: "Yesterday",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Computer Science Basics",
      progress: 60,
      score: 78,
      lastActivity: "Today",
      status: "In Progress",
    },
    {
      id: 4,
      name: "English Literature",
      progress: 100,
      score: 88,
      lastActivity: "2 weeks ago",
      status: "Completed",
    },
  ];

  const upcomingAssessments = [
    {
      id: 1,
      title: "Mathematics Midterm",
      course: "Advanced Mathematics",
      dueDate: "May 10, 2025",
      timeRemaining: "9 days",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Physics Fundamentals",
      dueDate: "May 7, 2025",
      timeRemaining: "6 days",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed quiz",
      course: "Computer Science Basics",
      score: "18/20",
      timestamp: "Today, 10:45 AM",
    },
    {
      id: 2,
      action: "Watched video lecture",
      course: "Physics Fundamentals",
      duration: "45 minutes",
      timestamp: "Yesterday, 3:22 PM",
    },
    {
      id: 3,
      action: "Submitted assignment",
      course: "Advanced Mathematics",
      timestamp: "2 days ago, 11:30 AM",
    },
  ];

  // Render the Badge component with proper types
  const Badge = ({ name, icon, count }: Badge) => {
    const IconComponent = {
      Star: Star,
      Award: Award,
      CheckCircle: CheckCircle,
    }[icon];

    return (
      <div className='flex flex-col items-center bg-gray-800 rounded-lg p-3 w-32'>
        <div className='bg-gray-700 rounded-full p-3 mb-2'>
          <IconComponent className='text-yellow-400' size={20} />
        </div>
        <p className='text-gray-100 font-medium text-sm'>{name}</p>
        {count > 1 && <p className='text-gray-400 text-xs'>x{count}</p>}
      </div>
    );
  };

  // Render the appropriate tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <BookOpen size={18} className='mr-2' />
                  <span className='text-sm'>Active Courses</span>
                </div>
                <span className='text-2xl font-semibold text-white'>{student.activeCourses}</span>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <CheckCircle size={18} className='mr-2' />
                  <span className='text-sm'>Completed Courses</span>
                </div>
                <span className='text-2xl font-semibold text-white'>{student.completedCourses}</span>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <PieChart size={18} className='mr-2' />
                  <span className='text-sm'>Overall Progress</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-2xl font-semibold text-white'>{student.overallProgress}%</span>
                  <div className='ml-2 bg-gray-700 rounded-full h-2 w-full'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: `${student.overallProgress}%` }}></div>
                  </div>
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <AlertCircle size={18} className='mr-2' />
                  <span className='text-sm'>Assessments Due</span>
                </div>
                <span className='text-2xl font-semibold text-white'>{student.assessmentsDue}</span>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-white mb-4'>Current Courses</h3>
                <div className='space-y-4'>
                  {courses
                    .filter((course) => course.status === "In Progress")
                    .map((course) => (
                      <div key={course.id} className='border-b border-gray-700 pb-3 last:border-0'>
                        <div className='flex justify-between items-center mb-2'>
                          <h4 className='font-medium text-gray-100'>{course.name}</h4>
                          <span className='bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs'>{course.status}</span>
                        </div>
                        <div className='flex justify-between text-xs text-gray-400 mb-2'>
                          <span>Progress: {course.progress}%</span>
                          <span>Score: {course.score}/100</span>
                        </div>
                        <div className='w-full bg-gray-700 rounded-full h-1.5'>
                          <div className='bg-blue-500 h-1.5 rounded-full' style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-white mb-4'>Upcoming Assessments</h3>
                {upcomingAssessments.length > 0 ? (
                  <div className='space-y-4'>
                    {upcomingAssessments.map((assessment) => (
                      <div key={assessment.id} className='border-b border-gray-700 pb-3 last:border-0'>
                        <h4 className='font-medium text-gray-100'>{assessment.title}</h4>
                        <p className='text-gray-400 text-sm'>{assessment.course}</p>
                        <div className='flex justify-between mt-2 text-sm'>
                          <div className='flex items-center text-gray-400'>
                            <Calendar size={14} className='mr-1' />
                            <span>{assessment.dueDate}</span>
                          </div>
                          <div className='flex items-center text-yellow-400'>
                            <Clock size={14} className='mr-1' />
                            <span>{assessment.timeRemaining} remaining</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-400'>No upcoming assessments</p>
                )}
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Recent Activity</h3>
              <div className='space-y-4'>
                {recentActivity.map((activity) => (
                  <div key={activity.id} className='flex items-start border-b border-gray-700 pb-3 last:border-0'>
                    <div className='bg-gray-700 rounded-full p-2 mr-3'>
                      <FileText size={16} className='text-blue-400' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <h4 className='font-medium text-gray-100'>{activity.action}</h4>
                        <span className='text-gray-400 text-xs'>{activity.timestamp}</span>
                      </div>
                      <p className='text-gray-400 text-sm'>{activity.course}</p>
                      {activity.score && <p className='text-green-400 text-sm'>Score: {activity.score}</p>}
                      {activity.duration && <p className='text-gray-400 text-sm'>Duration: {activity.duration}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "courses":
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Active Courses</h3>
              <div className='space-y-4'>
                {courses
                  .filter((course) => course.status === "In Progress")
                  .map((course) => (
                    <div key={course.id} className='bg-gray-700 rounded-lg p-4'>
                      <div className='flex justify-between items-center mb-3'>
                        <h4 className='font-medium text-gray-100'>{course.name}</h4>
                        <span className='bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs'>{course.status}</span>
                      </div>

                      <div className='grid grid-cols-3 gap-4 mb-3'>
                        <div className='text-center'>
                          <p className='text-gray-400 text-xs mb-1'>Progress</p>
                          <p className='text-white font-medium'>{course.progress}%</p>
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-400 text-xs mb-1'>Score</p>
                          <p className='text-white font-medium'>{course.score}/100</p>
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-400 text-xs mb-1'>Last Activity</p>
                          <p className='text-white font-medium'>{course.lastActivity}</p>
                        </div>
                      </div>

                      <div className='w-full bg-gray-800 rounded-full h-2 mb-3'>
                        <div className='bg-blue-500 h-2 rounded-full' style={{ width: `${course.progress}%` }}></div>
                      </div>

                      <div className='flex justify-end'>
                        <button className='flex items-center text-blue-400 hover:text-blue-300 text-sm'>
                          View Details
                          <ArrowRight size={14} className='ml-1' />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Completed Courses</h3>
              <div className='space-y-4'>
                {courses
                  .filter((course) => course.status === "Completed")
                  .map((course) => (
                    <div key={course.id} className='bg-gray-700 rounded-lg p-4'>
                      <div className='flex justify-between items-center mb-3'>
                        <h4 className='font-medium text-gray-100'>{course.name}</h4>
                        <span className='bg-green-900 text-green-300 px-2 py-1 rounded text-xs'>{course.status}</span>
                      </div>

                      <div className='grid grid-cols-2 gap-4 mb-3'>
                        <div className='text-center'>
                          <p className='text-gray-400 text-xs mb-1'>Final Score</p>
                          <p className='text-white font-medium'>{course.score}/100</p>
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-400 text-xs mb-1'>Last Activity</p>
                          <p className='text-white font-medium'>{course.lastActivity}</p>
                        </div>
                      </div>

                      <div className='w-full bg-gray-800 rounded-full h-2 mb-3'>
                        <div className='bg-green-500 h-2 rounded-full' style={{ width: `${course.progress}%` }}></div>
                      </div>

                      <div className='flex justify-end'>
                        <button className='flex items-center text-blue-400 hover:text-blue-300 text-sm'>
                          View Certificate
                          <ArrowRight size={14} className='ml-1' />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "assessments":
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Upcoming Assessments</h3>
              {upcomingAssessments.length > 0 ? (
                <div className='space-y-4'>
                  {upcomingAssessments.map((assessment) => (
                    <div key={assessment.id} className='bg-gray-700 rounded-lg p-4'>
                      <h4 className='font-medium text-gray-100'>{assessment.title}</h4>
                      <p className='text-gray-400 text-sm'>{assessment.course}</p>
                      <div className='flex justify-between mt-4'>
                        <div className='flex items-center text-gray-400'>
                          <Calendar size={16} className='mr-2' />
                          <span>{assessment.dueDate}</span>
                        </div>
                        <div className='flex items-center text-yellow-400'>
                          <Clock size={16} className='mr-2' />
                          <span>{assessment.timeRemaining} remaining</span>
                        </div>
                      </div>
                      <div className='mt-4 flex justify-end'>
                        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm'>Start Assessment</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-gray-400'>No upcoming assessments</p>
              )}
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Past Assessments</h3>
              <div className='space-y-4'>
                <div className='bg-gray-700 rounded-lg p-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium text-gray-100'>Physics Quiz 3</h4>
                    <span className='bg-green-900 text-green-300 px-2 py-1 rounded text-xs'>Completed</span>
                  </div>
                  <p className='text-gray-400 text-sm'>Physics Fundamentals</p>
                  <div className='flex justify-between mt-4'>
                    <div className='text-gray-400'>
                      <p className='text-xs'>Date Completed</p>
                      <p className='text-sm'>April 25, 2025</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-xs text-gray-400'>Score</p>
                      <p className='text-green-400 font-medium'>85/100</p>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-700 rounded-lg p-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium text-gray-100'>Math Assignment #5</h4>
                    <span className='bg-green-900 text-green-300 px-2 py-1 rounded text-xs'>Completed</span>
                  </div>
                  <p className='text-gray-400 text-sm'>Advanced Mathematics</p>
                  <div className='flex justify-between mt-4'>
                    <div className='text-gray-400'>
                      <p className='text-xs'>Date Completed</p>
                      <p className='text-sm'>April 22, 2025</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-xs text-gray-400'>Score</p>
                      <p className='text-green-400 font-medium'>92/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Badges</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {student.badges.map((badge, index) => (
                  <Badge key={index} name={badge.name} icon={badge.icon} count={badge.count} />
                ))}
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Progress Milestones</h3>
              <div className='space-y-4'>
                <div className='flex items-center p-3 bg-gray-700 rounded-lg'>
                  <div className='bg-green-900 p-2 rounded-full mr-3'>
                    <CheckCircle size={20} className='text-green-400' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-100'>Course Completion</h4>
                    <p className='text-gray-400 text-sm'>Completed 7 courses</p>
                  </div>
                </div>

                <div className='flex items-center p-3 bg-gray-700 rounded-lg'>
                  <div className='bg-blue-900 p-2 rounded-full mr-3'>
                    <Star size={20} className='text-blue-400' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-100'>High Achiever</h4>
                    <p className='text-gray-400 text-sm'>Maintained 85%+ average score</p>
                  </div>
                </div>

                <div className='flex items-center p-3 bg-gray-700 rounded-lg'>
                  <div className='bg-purple-900 p-2 rounded-full mr-3'>
                    <Calendar size={20} className='text-purple-400' />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-100'>Excellent Attendance</h4>
                    <p className='text-gray-400 text-sm'>95% attendance rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Performance Chart</h3>
              <div className='bg-gray-700 rounded-lg p-4 h-64 flex items-center justify-center'>
                <p className='text-gray-400'>Performance trends visualization would appear here</p>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Personal Information</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Full Name</p>
                    <div className='flex items-center'>
                      <User size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.name}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Email Address</p>
                    <div className='flex items-center'>
                      <Mail size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.email}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Phone Number</p>
                    <div className='flex items-center'>
                      <Phone size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Address</p>
                    <div className='flex items-center'>
                      <MapPin size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.address}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Institution</p>
                    <div className='flex items-center'>
                      <Building size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.institution}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Grade/Year</p>
                    <div className='flex items-center'>
                      <Book size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{student.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Bio</h3>
              <p className='text-gray-300'>{student.bio}</p>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Enrollment Information</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-gray-400 text-sm mb-1'>Student ID</p>
                  <p className='text-gray-100'>{student.id}</p>
                </div>
                <div>
                  <p className='text-gray-400 text-sm mb-1'>Enrollment Date</p>
                  <p className='text-gray-100'>{student.enrollmentDate}</p>
                </div>
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Account Settings</h3>
              <div className='space-y-3'>
                <button className='w-full bg-gray-700 hover:bg-gray-600 text-gray-100 text-left px-4 py-3 rounded flex justify-between items-center'>
                  <span>Change Password</span>
                  <ArrowRight size={16} />
                </button>
                <button className='w-full bg-gray-700 hover:bg-gray-600 text-gray-100 text-left px-4 py-3 rounded flex justify-between items-center'>
                  <span>Notification Preferences</span>
                  <ArrowRight size={16} />
                </button>
                <button className='w-full bg-gray-700 hover:bg-gray-600 text-gray-100 text-left px-4 py-3 rounded flex justify-between items-center'>
                  <span>Privacy Settings</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole='trainer'>
      <div className='min-h-screen bg-gray-900 text-gray-100'>
        <div className='max-w-6xl mx-auto p-4'>
          {/* Header section with student info */}
          <div className='bg-gray-800 rounded-lg p-6 mb-6'>
            <div className='flex flex-col md:flex-row items-center md:items-start'>
              <div className='mb-4 md:mb-0 md:mr-6'>
                <img src={student.avatar} alt={student.name} className='rounded-full w-24 h-24 object-cover border-4 border-blue-500' />
              </div>

              <div className='flex-1 text-center md:text-left'>
                <h1 className='text-2xl font-bold text-white'>{student.name}</h1>
                <p className='text-gray-400 mb-2'>
                  {student.id} • {student.grade}
                </p>
                <p className='text-gray-400 mb-4'>{student.institution}</p>

                <div className='flex flex-wrap justify-center md:justify-start gap-3 mb-2'>
                  <div className='bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <BookOpen size={14} className='mr-1' />
                    <span>{student.activeCourses} Active Courses</span>
                  </div>
                  <div className='bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <Award size={14} className='mr-1' />
                    <span>{student.averageScore}% Average Score</span>
                  </div>
                  <div className='bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <Smile size={14} className='mr-1' />
                    <span>{student.attendance}% Attendance</span>
                  </div>
                </div>
              </div>

              <div className='mt-4 md:mt-0 flex flex-col items-center'>
                <div className='flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-2'>
                  <p className='text-2xl font-bold text-white'>{student.overallProgress}%</p>
                </div>
                <p className='text-gray-400 text-sm'>Overall Progress</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className='flex overflow-x-auto mb-6 bg-gray-800 rounded-lg p-1'>
            <button onClick={() => setActiveTab("overview")} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${activeTab === "overview" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}>
              <PieChart size={16} className='mr-2' />
              Overview
            </button>
            <button onClick={() => setActiveTab("courses")} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${activeTab === "courses" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}>
              <BookOpen size={16} className='mr-2' />
              Courses
            </button>
            <button onClick={() => setActiveTab("assessments")} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${activeTab === "assessments" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}>
              <FileText size={16} className='mr-2' />
              Assessments
            </button>
            <button onClick={() => setActiveTab("achievements")} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${activeTab === "achievements" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}>
              <Award size={16} className='mr-2' />
              Achievements
            </button>
            <button onClick={() => setActiveTab("profile")} className={`px-4 py-2 rounded-md text-sm font-medium flex items-center whitespace-nowrap ${activeTab === "profile" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}>
              <User size={16} className='mr-2' />
              Profile
            </button>
          </div>

          {/* Content / Tab Panels */}
          {renderTabContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}
