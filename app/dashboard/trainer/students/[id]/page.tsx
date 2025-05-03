"use client";
import { useState } from "react";
import { BookOpen, Award, Calendar, Clock, PieChart, CheckCircle, Smile, Star, FileText, ArrowRight, User, Mail, Phone, MapPin, Building, Book, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

// Types
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

interface Course {
  id: number;
  name: string;
  progress: number;
  score: number;
  lastActivity: string;
  status: "In Progress" | "Completed";
}

interface Assessment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  timeRemaining: string;
}

interface Activity {
  id: number;
  action: string;
  course: string;
  score?: string;
  duration?: string;
  timestamp: string;
}

// Sample data - In a real app, this would come from an API
const sampleStudent: Student = {
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

const sampleCourses: Course[] = [
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

const sampleAssessments: Assessment[] = [
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

const sampleActivity: Activity[] = [
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

// Components
const Badge: React.FC<Badge> = ({ name, icon, count }) => {
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

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className='w-full bg-gray-700 rounded-full h-2'>
    <div className='bg-blue-500 h-2 rounded-full' style={{ width: `${progress}%` }}></div>
  </div>
);

type TabType = "overview" | "profile";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

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
                <span className='text-2xl font-semibold text-white'>{sampleStudent.activeCourses}</span>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <CheckCircle size={18} className='mr-2' />
                  <span className='text-sm'>Completed Courses</span>
                </div>
                <span className='text-2xl font-semibold text-white'>{sampleStudent.completedCourses}</span>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <PieChart size={18} className='mr-2' />
                  <span className='text-sm'>Overall Progress</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-2xl font-semibold text-white'>{sampleStudent.overallProgress}%</span>
                  <ProgressBar progress={sampleStudent.overallProgress} />
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4 flex flex-col'>
                <div className='flex items-center text-gray-400 mb-2'>
                  <AlertCircle size={18} className='mr-2' />
                  <span className='text-sm'>Assessments Due</span>
                </div>
                <span className='text-2xl font-semibold text-white'>{sampleStudent.assessmentsDue}</span>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-white mb-4'>Current Courses</h3>
                <div className='space-y-4'>
                  {sampleCourses
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
                        <ProgressBar progress={course.progress} />
                      </div>
                    ))}
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-medium text-white mb-4'>Upcoming Assessments</h3>
                {sampleAssessments.length > 0 ? (
                  <div className='space-y-4'>
                    {sampleAssessments.map((assessment) => (
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
                {sampleActivity.map((activity) => (
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
                      <p className='text-gray-100'>{sampleStudent.name}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Email Address</p>
                    <div className='flex items-center'>
                      <Mail size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{sampleStudent.email}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Phone Number</p>
                    <div className='flex items-center'>
                      <Phone size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{sampleStudent.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Address</p>
                    <div className='flex items-center'>
                      <MapPin size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{sampleStudent.address}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Institution</p>
                    <div className='flex items-center'>
                      <Building size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{sampleStudent.institution}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-gray-400 text-sm mb-1'>Grade/Year</p>
                    <div className='flex items-center'>
                      <Book size={16} className='text-gray-500 mr-2' />
                      <p className='text-gray-100'>{sampleStudent.grade}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-lg font-medium text-white mb-4'>Bio</h3>
              <p className='text-gray-300'>{sampleStudent.bio}</p>
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
                <img src={sampleStudent.avatar} alt={sampleStudent.name} className='rounded-full w-24 h-24 object-cover border-4 border-blue-500' />
              </div>

              <div className='flex-1 text-center md:text-left'>
                <h1 className='text-2xl font-bold text-white'>{sampleStudent.name}</h1>
                <p className='text-gray-400 mb-2'>
                  {sampleStudent.id} • {sampleStudent.grade}
                </p>
                <p className='text-gray-400 mb-4'>{sampleStudent.institution}</p>

                <div className='flex flex-wrap justify-center md:justify-start gap-3 mb-2'>
                  <div className='bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <BookOpen size={14} className='mr-1' />
                    <span>{sampleStudent.activeCourses} Active Courses</span>
                  </div>
                  <div className='bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <Award size={14} className='mr-1' />
                    <span>{sampleStudent.averageScore}% Average Score</span>
                  </div>
                  <div className='bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center'>
                    <Smile size={14} className='mr-1' />
                    <span>{sampleStudent.attendance}% Attendance</span>
                  </div>
                </div>
              </div>

              <div className='mt-4 md:mt-0 flex flex-col items-center'>
                <div className='flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 mb-2'>
                  <p className='text-2xl font-bold text-white'>{sampleStudent.overallProgress}%</p>
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
