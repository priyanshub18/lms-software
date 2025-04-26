"use client";
import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart } from "recharts";
import { Users, ChevronLeft, CheckCircle, XCircle, Calendar, Book, Clock, Activity } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import CourseCard from "./_components/CourseCard";
import { useTheme } from "next-themes";
// Enhanced mock data for courses
const initialCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript",
    students: 24,
    completionRate: 78,
    attendanceRate: 85,
    engagementRate: 72,
    startDate: "2025-03-15",
    endDate: "2025-05-30",
    lastSession: "2025-04-20",
    nextSession: "2025-04-27",
    totalSessions: 12,
    completedSessions: 6,
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master complex React patterns and architecture",
    students: 16,
    completionRate: 62,
    attendanceRate: 78,
    engagementRate: 68,
    startDate: "2025-02-10",
    endDate: "2025-04-25",
    lastSession: "2025-04-18",
    nextSession: "2025-04-25",
    totalSessions: 10,
    completedSessions: 8,
    difficulty: "Advanced",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Create beautiful and functional user interfaces",
    students: 32,
    completionRate: 85,
    attendanceRate: 90,
    engagementRate: 88,
    startDate: "2025-01-20",
    endDate: "2025-04-10",
    lastSession: "2025-04-03",
    nextSession: "2025-04-10",
    totalSessions: 12,
    completedSessions: 11,
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "JavaScript for Beginners",
    description: "Start your journey with JavaScript programming",
    students: 28,
    completionRate: 70,
    attendanceRate: 75,
    engagementRate: 65,
    startDate: "2025-03-01",
    endDate: "2025-05-15",
    lastSession: "2025-04-17",
    nextSession: "2025-04-24",
    totalSessions: 10,
    completedSessions: 7,
    difficulty: "Beginner",
  },
];

// Enhanced mock student data with attendance history
const initialStudents = [
  {
    id: 1,
    courseId: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    progress: 65,
    enrollmentDate: "2025-03-15",
    lastLogin: "2025-04-22",
    attendanceHistory: {
      "2025-03-18": true,
      "2025-03-25": true,
      "2025-04-01": false,
      "2025-04-08": true,
      "2025-04-15": false,
      "2025-04-22": false,
    },
  },
  // More students with similar data structure...
  {
    id: 2,
    courseId: 1,
    name: "Jamie Smith",
    email: "jamie@example.com",
    progress: 78,
    enrollmentDate: "2025-03-15",
    lastLogin: "2025-04-21",
    attendanceHistory: {
      "2025-03-18": true,
      "2025-03-25": true,
      "2025-04-01": true,
      "2025-04-08": true,
      "2025-04-15": true,
      "2025-04-22": true,
    },
  },
  // Add more students with similar attendance history pattern
  {
    id: 3,
    courseId: 1,
    name: "Casey Wilson",
    email: "casey@example.com",
    progress: 92,
    enrollmentDate: "2025-03-16",
    lastLogin: "2025-04-22",
    attendanceHistory: {
      "2025-03-18": true,
      "2025-03-25": true,
      "2025-04-01": true,
      "2025-04-08": true,
      "2025-04-15": true,
      "2025-04-22": false,
    },
  },
  {
    id: 4,
    courseId: 1,
    name: "Jordan Lee",
    email: "jordan@example.com",
    progress: 45,
    enrollmentDate: "2025-03-15",
    lastLogin: "2025-04-20",
    attendanceHistory: {
      "2025-03-18": false,
      "2025-03-25": true,
      "2025-04-01": false,
      "2025-04-08": false,
      "2025-04-15": true,
      "2025-04-22": true,
    },
  },
  {
    id: 5,
    courseId: 1,
    name: "Taylor Brown",
    email: "taylor@example.com",
    progress: 85,
    enrollmentDate: "2025-03-17",
    lastLogin: "2025-04-21",
    attendanceHistory: {
      "2025-03-18": true,
      "2025-03-25": true,
      "2025-04-01": true,
      "2025-04-08": false,
      "2025-04-15": true,
      "2025-04-22": false,
    },
  },
  {
    id: 6,
    courseId: 2,
    name: "Morgan Davis",
    email: "morgan@example.com",
    progress: 72,
    enrollmentDate: "2025-02-10",
    lastLogin: "2025-04-22",
    attendanceHistory: {
      "2025-02-14": true,
      "2025-02-21": true,
      "2025-02-28": true,
      "2025-03-07": false,
      "2025-03-14": true,
      "2025-03-21": true,
      "2025-03-28": false,
      "2025-04-04": true,
      "2025-04-11": true,
      "2025-04-18": true,
    },
  },
  // Additional students with similar data structure...
];

// Generate session dates for a course
const generateSessionDates = (course) => {
  const start = new Date(course.startDate);
  const end = new Date(course.endDate);
  const sessions = [];
  const daysBetween = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const sessionInterval = Math.floor(daysBetween / course.totalSessions);

  for (let i = 0; i < course.totalSessions; i++) {
    const sessionDate = new Date(start);
    sessionDate.setDate(start.getDate() + i * sessionInterval);
    sessions.push(sessionDate.toISOString().split("T")[0]);
  }

  return sessions;
};

// Progress bar component with theme support
const ProgressBar = ({ percentage, color }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2.5`}>
      <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

// Course overview page
const CourseOverview = ({ courses, onCourseSelect }) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";

  return (
    <div className='p-6 w-full'>
      <h2 className={`text-2xl font-bold ${textColor} mb-6`}>My Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onClick={onCourseSelect} />
        ))}
      </div>
    </div>
  );
};

// Date selector component for attendance
const DateSelector = ({ dates, selectedDate, onSelectDate, course }) => {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const selectedBgColor = theme === "dark" ? "bg-blue-900" : "bg-blue-100";
  const selectedTextColor = theme === "dark" ? "text-blue-300" : "text-blue-800";

  return (
    <div className='mb-6'>
      <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-2`}>Select Session Date</label>
      <div className='flex flex-wrap gap-2'>
        {dates.map((date) => {
          const isSelected = date === selectedDate;
          const isPast = new Date(date) < new Date();
          const formattedDate = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

          // Calculate opacity for past dates
          const opacity = isPast ? (theme === "dark" ? "opacity-80" : "opacity-70") : "";

          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`px-3 py-2 rounded-md text-sm font-medium border ${borderColor} transition-colors
                ${isSelected ? `${selectedBgColor} ${selectedTextColor} border-transparent` : `${bgColor} ${textColor} ${hoverBgColor}`}
                ${opacity}`}
            >
              {formattedDate}
              {isPast && <span className={`ml-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced student list component with date-wise attendance
const StudentList = ({ students, course, onAttendanceUpdate, onBack }) => {
  const { theme } = useTheme();
  const [sessionDates, setSessionDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceLoading, setAttendanceLoading] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Theme-specific styling
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const bgColorSecondary = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textColorSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const buttonBgColor = theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600";
  const buttonTextColor = "text-white";
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";

  useEffect(() => {
    if (course) {
      const dates = generateSessionDates(course);
      setSessionDates(dates);

      const today = new Date();
      const mostRecentDate = dates.filter((date) => new Date(date) <= today).sort((a, b) => new Date(b) - new Date(a))[0] || dates[0];
      setSelectedDate(mostRecentDate);
    }
  }, [course]);

  // Simulate a backend call to update attendance
  const handleAttendanceToggle = async (studentId) => {
    // Show loading state for this specific student
    setAttendanceLoading((prev) => ({ ...prev, [studentId]: true }));

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Update the attendance
    onAttendanceUpdate(studentId, selectedDate);

    // Remove loading state
    setAttendanceLoading((prev) => ({ ...prev, [studentId]: false }));
  };

  // Simulate saving all attendance data
  const handleSaveAttendance = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);

    // Show success message (could be implemented with a toast notification)
    alert(`Attendance for ${new Date(selectedDate).toLocaleDateString()} has been saved!`);
  };

  // Calculate attendance rate for selected date
  const calculateAttendanceRate = () => {
    const presentCount = students.filter((student) => student.attendanceHistory[selectedDate]).length;
    return students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;
  };

  // Check if selected date is in the past
  const isSelectedDateInPast = new Date(selectedDate) <= new Date();

  return (
    <div className='p-6 w-full'>
      <div className='flex items-center mb-6'>
        <button onClick={onBack} className={`mr-4 p-2 rounded-full ${theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"} transition duration-200`}>
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>{course.title}</h2>
          <p className={textColorSecondary}>{course.students} students enrolled</p>
        </div>
      </div>

      {/* Session date selector */}
      <DateSelector dates={sessionDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} course={course} />

      {/* Attendance statistics card */}
      <div className={`mb-6 p-4 rounded-lg border ${borderColor} ${bgColor}`}>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className={`font-medium ${textColor}`}>Attendance for {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h3>
            <p className={textColorSecondary}>
              {students.filter((s) => s.attendanceHistory[selectedDate]).length} of {students.length} students present ({calculateAttendanceRate()}%)
            </p>
          </div>
          <button
            onClick={handleSaveAttendance}
            disabled={isSaving || !isSelectedDateInPast}
            className={`px-4 py-2 ${buttonBgColor} ${buttonTextColor} rounded-md text-sm transition duration-200 flex items-center
              ${isSaving || !isSelectedDateInPast ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSaving ? (
              <>
                <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Attendance"
            )}
          </button>
        </div>
      </div>

      <div className={`rounded-lg shadow-md overflow-hidden border ${borderColor}`}>
        <div className={`p-4 ${bgColorSecondary} border-b ${borderColor} flex justify-between items-center`}>
          <h3 className={`font-medium ${textColor}`}>Students</h3>
          <div className='flex space-x-2'>
            {!isSelectedDateInPast && (
              <div className={`text-sm ${theme === "dark" ? "text-amber-400" : "text-amber-600"} flex items-center`}>
                <Clock size={16} className='mr-1' />
                Future session - attendance not yet available
              </div>
            )}
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead className={bgColorSecondary}>
              <tr>
                <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
                  Name
                </th>
                <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
                  Email
                </th>
                <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
                  Progress
                </th>
                <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
                  Overall Attendance
                </th>
                <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
                  {isSelectedDateInPast ? "Attendance" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className={`${bgColor} divide-y ${borderColor}`}>
              {students.map((student) => {
                // Calculate overall attendance rate
                const attendanceDates = Object.keys(student.attendanceHistory);
                const attendedCount = attendanceDates.filter((date) => student.attendanceHistory[date]).length;
                const attendanceRate = attendanceDates.length > 0 ? Math.round((attendedCount / attendanceDates.length) * 100) : 0;

                // Get attendance for selected date
                const isPresent = student.attendanceHistory[selectedDate];

                return (
                  <tr key={student.id} className={hoverBgColor}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"} flex items-center justify-center font-medium`}>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className='ml-4'>
                          <div className={`text-sm font-medium ${textColor}`}>{student.name}</div>
                          <div className={`text-xs ${textColorSecondary}`}>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className={`text-sm ${textColorSecondary}`}>{student.email}</div>
                      <div className={`text-xs ${textColorSecondary}`}>Last active: {new Date(student.lastLogin).toLocaleDateString()}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='w-full max-w-xs'>
                        <ProgressBar percentage={student.progress} color={theme === "dark" ? "bg-blue-500" : "bg-blue-600"} />
                        <div className={`text-xs mt-1 text-right ${textColorSecondary}`}>{student.progress}%</div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className={`mr-2 px-2 py-1 rounded-md text-xs font-medium ${attendanceRate >= 80 ? (theme === "dark" ? "bg-green-900 text-green-400" : "bg-green-100 text-green-800") : attendanceRate >= 60 ? (theme === "dark" ? "bg-yellow-900 text-yellow-400" : "bg-yellow-100 text-yellow-800") : theme === "dark" ? "bg-red-900 text-red-400" : "bg-red-100 text-red-800"}`}>{attendanceRate}%</div>
                        <div className='w-20'>
                          <ProgressBar percentage={attendanceRate} color={attendanceRate >= 80 ? "bg-green-500" : attendanceRate >= 60 ? "bg-yellow-500" : "bg-red-500"} />
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {isSelectedDateInPast ? (
                        <button onClick={() => handleAttendanceToggle(student.id)} disabled={attendanceLoading[student.id]} className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors duration-200 ${isPresent ? (theme === "dark" ? "bg-green-900" : "bg-green-100") : theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                          {attendanceLoading[student.id] ? (
                            <svg className='animate-spin h-4 w-4 text-blue-500' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
                          ) : isPresent ? (
                            <CheckCircle size={16} className={theme === "dark" ? "text-green-400" : "text-green-600"} />
                          ) : (
                            <XCircle size={16} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                          )}
                        </button>
                      ) : (
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Analytics component
const CourseAnalytics = ({ course, students }) => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const textColorSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  // Calculate attendance trend data
  const sessionDates = generateSessionDates(course);
  const attendanceTrend = sessionDates.map((date) => {
    const presentCount = students.filter((student) => student.attendanceHistory[date] === true).length;
    const attendanceRate = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;
    return {
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: attendanceRate,
    };
  });

  // Calculate progress distribution
  const progressGroups = {
    "0-25": students.filter((s) => s.progress < 25).length,
    "26-50": students.filter((s) => s.progress >= 25 && s.progress < 50).length,
    "51-75": students.filter((s) => s.progress >= 50 && s.progress < 75).length,
    "76-100": students.filter((s) => s.progress >= 75).length,
  };

  const progressData = Object.entries(progressGroups).map(([range, count]) => ({
    name: range + "%",
    value: count,
  }));

  return (
    <div className={`mt-8 p-4 rounded-lg border ${borderColor} ${bgColor}`}>
      <h3 className={`text-lg font-medium ${textColor} mb-4`}>Course Analytics</h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Attendance trend */}
        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <h4 className={`text-sm font-medium ${textColor} mb-2`}>Attendance Trend</h4>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={attendanceTrend}>
              <XAxis dataKey='date' axisLine={{ stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" }} tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }} />
              <YAxis domain={[0, 100]} axisLine={{ stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" }} tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }} />
              <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF", borderColor: theme === "dark" ? "#374151" : "#E5E7EB" }} />
              <Line type='monotone' dataKey='value' stroke={theme === "dark" ? "#3B82F6" : "#2563EB"} strokeWidth={2} dot={{ stroke: theme === "dark" ? "#3B82F6" : "#2563EB", fill: theme === "dark" ? "#1E3A8A" : "#DBEAFE" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Progress distribution */}
        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <h4 className={`text-sm font-medium ${textColor} mb-2`}>Student Progress Distribution</h4>
          <div className='flex items-center justify-center h-48'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={progressData} cx='50%' cy='50%' outerRadius={80} fill='#8884d8' dataKey='value' label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? (theme === "dark" ? "#EF4444" : "#F87171") : index === 1 ? (theme === "dark" ? "#F59E0B" : "#FBBF24") : index === 2 ? (theme === "dark" ? "#3B82F6" : "#60A5FA") : theme === "dark" ? "#10B981" : "#34D399"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Average Progress</div>
          <div className={`text-xl font-bold ${textColor}`}>{Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length)}%</div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Average Attendance</div>
          <div className={`text-xl font-bold ${textColor}`}>{Math.round(course.attendanceRate)}%</div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>At Risk Students</div>
          <div className={`text-xl font-bold ${textColor}`}>{students.filter((s) => s.progress < 50).length}</div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Course Completion</div>
          <div className={`text-xl font-bold ${textColor}`}>{Math.round((course.completedSessions / course.totalSessions) * 100)}%</div>
        </div>
      </div>
    </div>
  );
};

// Main dashboard component
export default function AttendanceDashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [students, setStudents] = useState(initialStudents);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("courses"); // 'courses', 'attendance', 'analytics'

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView("attendance");
  };

  // Toggle student attendance for a specific date
  const handleAttendanceUpdate = (studentId, date) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendanceHistory: {
                ...student.attendanceHistory,
                [date]: !student.attendanceHistory[date],
              },
            }
          : student
      )
    );

    // Recalculate course attendance rate
    updateCourseAttendanceRate(selectedCourse.id);
  };

  // Update course attendance rate based on student attendance
  const updateCourseAttendanceRate = (courseId) => {
    const courseStudents = students.filter((s) => s.courseId === courseId);

    // Calculate average attendance rate across all sessions and students
    let totalAttendance = 0;
    let totalSessions = 0;

    courseStudents.forEach((student) => {
      const attendanceDates = Object.keys(student.attendanceHistory);
      const attendedCount = attendanceDates.filter((date) => student.attendanceHistory[date]).length;
      totalAttendance += attendedCount;
      totalSessions += attendanceDates.length;
    });

    const newAttendanceRate = totalSessions > 0 ? Math.round((totalAttendance / totalSessions) * 100) : 0;

    setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? { ...course, attendanceRate: newAttendanceRate } : course)));
  };

  // Handle going back to course list
  const handleBack = () => {
    setSelectedCourse(null);
    setCurrentView("courses");
  };

  // Switch to analytics view
  const handleViewAnalytics = () => {
    setCurrentView("analytics");
  };

  // Filter students for selected course
  const filteredStudents = students.filter((student) => selectedCourse?.id && student.courseId === selectedCourse.id);

  // Main content based on selection
  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      );
    }

    if (selectedCourse) {
      return (
        <>
          {currentView === "attendance" && (
            <>
              <StudentList students={filteredStudents} course={selectedCourse} onAttendanceUpdate={handleAttendanceUpdate} onBack={handleBack} />
              <div className='flex justify-center mt-4'>
                <button onClick={handleViewAnalytics} className='flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'>
                  <Activity size={16} className='mr-1' />
                  View Course Analytics
                </button>
              </div>
            </>
          )}

          {currentView === "analytics" && (
            <>
              <div className='px-6'>
                <div className='flex items-center mb-6'>
                  <button onClick={() => setCurrentView("attendance")} className='mr-4 p-2 rounded-full hover:bg-gray-700 transition duration-200 text-gray-300'>
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-100'>{selectedCourse.title} Analytics</h2>
                    <p className='text-gray-400'>{selectedCourse.students} students enrolled</p>
                  </div>
                </div>
                <CourseAnalytics course={selectedCourse} students={filteredStudents} />
              </div>
            </>
          )}
        </>
      );
    }

    return <CourseOverview courses={courses} onCourseSelect={handleCourseSelect} />;
  };

  return (
    <DashboardLayout userRole='trainer'>
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <header className='py-6 px-4 border-b border-gray-800 dark:border-gray-800 light:border-gray-200 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-white dark:text-white light:text-gray-800'>Instructor Attendance Dashboard</h1>
            <div className='flex items-center'></div>
          </header>

          <main className='w-full'>{renderContent()}</main>
        </div>
      </div>
    </DashboardLayout>
  );
}
