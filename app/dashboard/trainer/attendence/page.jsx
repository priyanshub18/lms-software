// "use client";
// import { createContext } from "react";
// import { useState, useEffect, useContext } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart } from "recharts";
// import { Users, ChevronLeft, CheckCircle, XCircle, Calendar, Book, Clock, Activity } from "lucide-react";
// import DashboardLayout from "@/components/dashboard-layout";
// import CourseCard from "./_components/CourseCard";
// import { useTheme } from "next-themes";
// // Enhanced mock data for courses
// const initialCourses = [
//   {
//     id: 1,
//     title: "Introduction to Web Development",
//     description: "Learn the fundamentals of HTML, CSS, and JavaScript",
//     students: 24,
//     completionRate: 78,
//     attendanceRate: 85,
//     engagementRate: 72,
//     startDate: "2025-03-15",
//     endDate: "2025-05-30",
//     lastSession: "2025-04-20",
//     nextSession: "2025-04-27",
//     totalSessions: 12,
//     completedSessions: 6,
//     difficulty: "Beginner",
//   },
//   {
//     id: 2,
//     title: "Advanced React Patterns",
//     description: "Master complex React patterns and architecture",
//     students: 16,
//     completionRate: 62,
//     attendanceRate: 78,
//     engagementRate: 68,
//     startDate: "2025-02-10",
//     endDate: "2025-04-25",
//     lastSession: "2025-04-18",
//     nextSession: "2025-04-25",
//     totalSessions: 10,
//     completedSessions: 8,
//     difficulty: "Advanced",
//   },
//   {
//     id: 3,
//     title: "UI/UX Design Fundamentals",
//     description: "Create beautiful and functional user interfaces",
//     students: 32,
//     completionRate: 85,
//     attendanceRate: 90,
//     engagementRate: 88,
//     startDate: "2025-01-20",
//     endDate: "2025-04-10",
//     lastSession: "2025-04-03",
//     nextSession: "2025-04-10",
//     totalSessions: 12,
//     completedSessions: 11,
//     difficulty: "Intermediate",
//   },
//   {
//     id: 4,
//     title: "JavaScript for Beginners",
//     description: "Start your journey with JavaScript programming",
//     students: 28,
//     completionRate: 70,
//     attendanceRate: 75,
//     engagementRate: 65,
//     startDate: "2025-03-01",
//     endDate: "2025-05-15",
//     lastSession: "2025-04-17",
//     nextSession: "2025-04-24",
//     totalSessions: 10,
//     completedSessions: 7,
//     difficulty: "Beginner",
//   },
// ];

// // Enhanced mock student data with attendance history
// const initialStudents = [
//   {
//     id: 1,
//     courseId: 1,
//     name: "Alex Johnson",
//     email: "alex@example.com",
//     progress: 65,
//     enrollmentDate: "2025-03-15",
//     lastLogin: "2025-04-22",
//     attendanceHistory: {
//       "2025-03-18": true,
//       "2025-03-25": true,
//       "2025-04-01": false,
//       "2025-04-08": true,
//       "2025-04-15": false,
//       "2025-04-22": false,
//     },
//   },
//   // More students with similar data structure...
//   {
//     id: 2,
//     courseId: 1,
//     name: "Jamie Smith",
//     email: "jamie@example.com",
//     progress: 78,
//     enrollmentDate: "2025-03-15",
//     lastLogin: "2025-04-21",
//     attendanceHistory: {
//       "2025-03-18": true,
//       "2025-03-25": true,
//       "2025-04-01": true,
//       "2025-04-08": true,
//       "2025-04-15": true,
//       "2025-04-22": true,
//     },
//   },
//   // Add more students with similar attendance history pattern
//   {
//     id: 3,
//     courseId: 1,
//     name: "Casey Wilson",
//     email: "casey@example.com",
//     progress: 92,
//     enrollmentDate: "2025-03-16",
//     lastLogin: "2025-04-22",
//     attendanceHistory: {
//       "2025-03-18": true,
//       "2025-03-25": true,
//       "2025-04-01": true,
//       "2025-04-08": true,
//       "2025-04-15": true,
//       "2025-04-22": false,
//     },
//   },
//   {
//     id: 4,
//     courseId: 1,
//     name: "Jordan Lee",
//     email: "jordan@example.com",
//     progress: 45,
//     enrollmentDate: "2025-03-15",
//     lastLogin: "2025-04-20",
//     attendanceHistory: {
//       "2025-03-18": false,
//       "2025-03-25": true,
//       "2025-04-01": false,
//       "2025-04-08": false,
//       "2025-04-15": true,
//       "2025-04-22": true,
//     },
//   },
//   {
//     id: 5,
//     courseId: 1,
//     name: "Taylor Brown",
//     email: "taylor@example.com",
//     progress: 85,
//     enrollmentDate: "2025-03-17",
//     lastLogin: "2025-04-21",
//     attendanceHistory: {
//       "2025-03-18": true,
//       "2025-03-25": true,
//       "2025-04-01": true,
//       "2025-04-08": false,
//       "2025-04-15": true,
//       "2025-04-22": false,
//     },
//   },
//   {
//     id: 6,
//     courseId: 2,
//     name: "Morgan Davis",
//     email: "morgan@example.com",
//     progress: 72,
//     enrollmentDate: "2025-02-10",
//     lastLogin: "2025-04-22",
//     attendanceHistory: {
//       "2025-02-14": true,
//       "2025-02-21": true,
//       "2025-02-28": true,
//       "2025-03-07": false,
//       "2025-03-14": true,
//       "2025-03-21": true,
//       "2025-03-28": false,
//       "2025-04-04": true,
//       "2025-04-11": true,
//       "2025-04-18": true,
//     },
//   },
//   // Additional students with similar data structure...
// ];

// // Generate session dates for a course
// const generateSessionDates = (course) => {
//   const start = new Date(course.startDate);
//   const end = new Date(course.endDate);
//   const sessions = [];
//   const daysBetween = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//   const sessionInterval = Math.floor(daysBetween / course.totalSessions);

//   for (let i = 0; i < course.totalSessions; i++) {
//     const sessionDate = new Date(start);
//     sessionDate.setDate(start.getDate() + i * sessionInterval);
//     sessions.push(sessionDate.toISOString().split("T")[0]);
//   }

//   return sessions;
// };

// // Progress bar component with theme support
// const ProgressBar = ({ percentage, color }) => {
//   const { theme } = useTheme();

//   return (
//     <div className={`w-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2.5`}>
//       <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
//     </div>
//   );
// };

// // Course overview page
// const CourseOverview = ({ courses, onCourseSelect }) => {
//   const { theme } = useTheme();
//   const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";

//   return (
//     <div className='p-6 w-full'>
//       <h2 className={`text-2xl font-bold ${textColor} mb-6`}>My Courses</h2>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//         {courses.map((course) => (
//           <CourseCard key={course.id} course={course} onClick={onCourseSelect} />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Date selector component for attendance
// const DateSelector = ({ dates, selectedDate, onSelectDate, course }) => {
//   const { theme } = useTheme();

//   const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
//   const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
//   const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
//   const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";
//   const selectedBgColor = theme === "dark" ? "bg-blue-900" : "bg-blue-100";
//   const selectedTextColor = theme === "dark" ? "text-blue-300" : "text-blue-800";

//   return (
//     <div className='mb-6'>
//       <label className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-2`}>Select Session Date</label>
//       <div className='flex flex-wrap gap-2'>
//         {dates.map((date) => {
//           const isSelected = date === selectedDate;
//           const isPast = new Date(date) < new Date();
//           const formattedDate = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });

//           // Calculate opacity for past dates
//           const opacity = isPast ? (theme === "dark" ? "opacity-80" : "opacity-70") : "";

//           return (
//             <button
//               key={date}
//               onClick={() => onSelectDate(date)}
//               className={`px-3 py-2 rounded-md text-sm font-medium border ${borderColor} transition-colors
//                 ${isSelected ? `${selectedBgColor} ${selectedTextColor} border-transparent` : `${bgColor} ${textColor} ${hoverBgColor}`}
//                 ${opacity}`}
//             >
//               {formattedDate}
//               {isPast && <span className={`ml-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>✓</span>}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // Enhanced student list component with date-wise attendance
// const StudentList = ({ students, course, onAttendanceUpdate, onBack }) => {
//   const { theme } = useTheme();
//   const [sessionDates, setSessionDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [attendanceLoading, setAttendanceLoading] = useState({});
//   const [isSaving, setIsSaving] = useState(false);

//   // Theme-specific styling
//   const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
//   const bgColorSecondary = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
//   const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
//   const textColorSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
//   const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
//   const buttonBgColor = theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600";
//   const buttonTextColor = "text-white";
//   const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";

//   useEffect(() => {
//     if (course) {
//       const dates = generateSessionDates(course);
//       setSessionDates(dates);

//       const today = new Date();
//       const mostRecentDate = dates.filter((date) => new Date(date) <= today).sort((a, b) => new Date(b) - new Date(a))[0] || dates[0];
//       setSelectedDate(mostRecentDate);
//     }
//   }, [course]);

//   // Simulate a backend call to update attendance
//   const handleAttendanceToggle = async (studentId) => {
//     // Show loading state for this specific student
//     setAttendanceLoading((prev) => ({ ...prev, [studentId]: true }));

//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 600));

//     // Update the attendance
//     onAttendanceUpdate(studentId, selectedDate);

//     // Remove loading state
//     setAttendanceLoading((prev) => ({ ...prev, [studentId]: false }));
//   };

//   // Simulate saving all attendance data
//   const handleSaveAttendance = async () => {
//     setIsSaving(true);
//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 1200));
//     setIsSaving(false);

//     // Show success message (could be implemented with a toast notification)
//     alert(`Attendance for ${new Date(selectedDate).toLocaleDateString()} has been saved!`);
//   };

//   // Calculate attendance rate for selected date
//   const calculateAttendanceRate = () => {
//     const presentCount = students.filter((student) => student.attendanceHistory[selectedDate]).length;
//     return students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;
//   };

//   // Check if selected date is in the past
//   const isSelectedDateInPast = new Date(selectedDate) <= new Date();

//   return (
//     <div className='p-6 w-full'>
//       <div className='flex items-center mb-6'>
//         <button onClick={onBack} className={`mr-4 p-2 rounded-full ${theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"} transition duration-200`}>
//           <ChevronLeft size={20} />
//         </button>
//         <div>
//           <h2 className={`text-2xl font-bold ${textColor}`}>{course.title}</h2>
//           <p className={textColorSecondary}>{course.students} students enrolled</p>
//         </div>
//       </div>

//       {/* Session date selector */}
//       <DateSelector dates={sessionDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} course={course} />

//       {/* Attendance statistics card */}
//       <div className={`mb-6 p-4 rounded-lg border ${borderColor} ${bgColor}`}>
//         <div className='flex justify-between items-center'>
//           <div>
//             <h3 className={`font-medium ${textColor}`}>Attendance for {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h3>
//             <p className={textColorSecondary}>
//               {students.filter((s) => s.attendanceHistory[selectedDate]).length} of {students.length} students present ({calculateAttendanceRate()}%)
//             </p>
//           </div>
//           <button
//             onClick={handleSaveAttendance}
//             disabled={isSaving || !isSelectedDateInPast}
//             className={`px-4 py-2 ${buttonBgColor} ${buttonTextColor} rounded-md text-sm transition duration-200 flex items-center
//               ${isSaving || !isSelectedDateInPast ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {isSaving ? (
//               <>
//                 <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
//                   <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                   <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               "Save Attendance"
//             )}
//           </button>
//         </div>
//       </div>

//       <div className={`rounded-lg shadow-md overflow-hidden border ${borderColor}`}>
//         <div className={`p-4 ${bgColorSecondary} border-b ${borderColor} flex justify-between items-center`}>
//           <h3 className={`font-medium ${textColor}`}>Students</h3>
//           <div className='flex space-x-2'>
//             {!isSelectedDateInPast && (
//               <div className={`text-sm ${theme === "dark" ? "text-amber-400" : "text-amber-600"} flex items-center`}>
//                 <Clock size={16} className='mr-1' />
//                 Future session - attendance not yet available
//               </div>
//             )}
//           </div>
//         </div>

//         <div className='overflow-x-auto'>
//           <table className='min-w-full divide-y divide-gray-700'>
//             <thead className={bgColorSecondary}>
//               <tr>
//                 <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
//                   Name
//                 </th>
//                 <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
//                   Email
//                 </th>
//                 <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
//                   Progress
//                 </th>
//                 <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
//                   Overall Attendance
//                 </th>
//                 <th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${textColorSecondary} uppercase tracking-wider`}>
//                   {isSelectedDateInPast ? "Attendance" : "Status"}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className={`${bgColor} divide-y ${borderColor}`}>
//               {students.map((student) => {
//                 // Calculate overall attendance rate
//                 const attendanceDates = Object.keys(student.attendanceHistory);
//                 const attendedCount = attendanceDates.filter((date) => student.attendanceHistory[date]).length;
//                 const attendanceRate = attendanceDates.length > 0 ? Math.round((attendedCount / attendanceDates.length) * 100) : 0;

//                 // Get attendance for selected date
//                 const isPresent = student.attendanceHistory[selectedDate];

//                 return (
//                   <tr key={student.id} className={hoverBgColor}>
//                     <td className='px-6 py-4 whitespace-nowrap'>
//                       <div className='flex items-center'>
//                         <div className={`flex-shrink-0 h-10 w-10 rounded-full ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"} flex items-center justify-center font-medium`}>
//                           {student.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </div>
//                         <div className='ml-4'>
//                           <div className={`text-sm font-medium ${textColor}`}>{student.name}</div>
//                           <div className={`text-xs ${textColorSecondary}`}>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className='px-6 py-4 whitespace-nowrap'>
//                       <div className={`text-sm ${textColorSecondary}`}>{student.email}</div>
//                       <div className={`text-xs ${textColorSecondary}`}>Last active: {new Date(student.lastLogin).toLocaleDateString()}</div>
//                     </td>
//                     <td className='px-6 py-4 whitespace-nowrap'>
//                       <div className='w-full max-w-xs'>
//                         <ProgressBar percentage={student.progress} color={theme === "dark" ? "bg-blue-500" : "bg-blue-600"} />
//                         <div className={`text-xs mt-1 text-right ${textColorSecondary}`}>{student.progress}%</div>
//                       </div>
//                     </td>
//                     <td className='px-6 py-4 whitespace-nowrap'>
//                       <div className='flex items-center'>
//                         <div className={`mr-2 px-2 py-1 rounded-md text-xs font-medium ${attendanceRate >= 80 ? (theme === "dark" ? "bg-green-900 text-green-400" : "bg-green-100 text-green-800") : attendanceRate >= 60 ? (theme === "dark" ? "bg-yellow-900 text-yellow-400" : "bg-yellow-100 text-yellow-800") : theme === "dark" ? "bg-red-900 text-red-400" : "bg-red-100 text-red-800"}`}>{attendanceRate}%</div>
//                         <div className='w-20'>
//                           <ProgressBar percentage={attendanceRate} color={attendanceRate >= 80 ? "bg-green-500" : attendanceRate >= 60 ? "bg-yellow-500" : "bg-red-500"} />
//                         </div>
//                       </div>
//                     </td>
//                     <td className='px-6 py-4 whitespace-nowrap'>
//                       {isSelectedDateInPast ? (
//                         <button onClick={() => handleAttendanceToggle(student.id)} disabled={attendanceLoading[student.id]} className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors duration-200 ${isPresent ? (theme === "dark" ? "bg-green-900" : "bg-green-100") : theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
//                           {attendanceLoading[student.id] ? (
//                             <svg className='animate-spin h-4 w-4 text-blue-500' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
//                               <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
//                               <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
//                             </svg>
//                           ) : isPresent ? (
//                             <CheckCircle size={16} className={theme === "dark" ? "text-green-400" : "text-green-600"} />
//                           ) : (
//                             <XCircle size={16} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
//                           )}
//                         </button>
//                       ) : (
//                         <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Pending</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Analytics component
// const CourseAnalytics = ({ course, students }) => {
//   const { theme } = useTheme();
//   const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
//   const textColorSecondary = theme === "dark" ? "text-gray-400" : "text-gray-500";
//   const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
//   const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

//   // Calculate attendance trend data
//   const sessionDates = generateSessionDates(course);
//   const attendanceTrend = sessionDates.map((date) => {
//     const presentCount = students.filter((student) => student.attendanceHistory[date] === true).length;
//     const attendanceRate = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;
//     return {
//       date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//       value: attendanceRate,
//     };
//   });

//   // Calculate progress distribution
//   const progressGroups = {
//     "0-25": students.filter((s) => s.progress < 25).length,
//     "26-50": students.filter((s) => s.progress >= 25 && s.progress < 50).length,
//     "51-75": students.filter((s) => s.progress >= 50 && s.progress < 75).length,
//     "76-100": students.filter((s) => s.progress >= 75).length,
//   };

//   const progressData = Object.entries(progressGroups).map(([range, count]) => ({
//     name: range + "%",
//     value: count,
//   }));

//   return (
//     <div className={`mt-8 p-4 rounded-lg border ${borderColor} ${bgColor}`}>
//       <h3 className={`text-lg font-medium ${textColor} mb-4`}>Course Analytics</h3>

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//         {/* Attendance trend */}
//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <h4 className={`text-sm font-medium ${textColor} mb-2`}>Attendance Trend</h4>
//           <ResponsiveContainer width='100%' height={200}>
//             <LineChart data={attendanceTrend}>
//               <XAxis dataKey='date' axisLine={{ stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" }} tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }} />
//               <YAxis domain={[0, 100]} axisLine={{ stroke: theme === "dark" ? "#4B5563" : "#D1D5DB" }} tick={{ fill: theme === "dark" ? "#9CA3AF" : "#6B7280" }} />
//               <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF", borderColor: theme === "dark" ? "#374151" : "#E5E7EB" }} />
//               <Line type='monotone' dataKey='value' stroke={theme === "dark" ? "#3B82F6" : "#2563EB"} strokeWidth={2} dot={{ stroke: theme === "dark" ? "#3B82F6" : "#2563EB", fill: theme === "dark" ? "#1E3A8A" : "#DBEAFE" }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Progress distribution */}
//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <h4 className={`text-sm font-medium ${textColor} mb-2`}>Student Progress Distribution</h4>
//           <div className='flex items-center justify-center h-48'>
//             <ResponsiveContainer width='100%' height='100%'>
//               <PieChart>
//                 <Pie data={progressData} cx='50%' cy='50%' outerRadius={80} fill='#8884d8' dataKey='value' label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
//                   {progressData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={index === 0 ? (theme === "dark" ? "#EF4444" : "#F87171") : index === 1 ? (theme === "dark" ? "#F59E0B" : "#FBBF24") : index === 2 ? (theme === "dark" ? "#3B82F6" : "#60A5FA") : theme === "dark" ? "#10B981" : "#34D399"} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Summary stats */}
//       <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Average Progress</div>
//           <div className={`text-xl font-bold ${textColor}`}>{Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length)}%</div>
//         </div>

//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Average Attendance</div>
//           <div className={`text-xl font-bold ${textColor}`}>{Math.round(course.attendanceRate)}%</div>
//         </div>

//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>At Risk Students</div>
//           <div className={`text-xl font-bold ${textColor}`}>{students.filter((s) => s.progress < 50).length}</div>
//         </div>

//         <div className={`p-4 rounded-lg border ${borderColor}`}>
//           <div className={`text-xs font-medium ${textColorSecondary} mb-1`}>Course Completion</div>
//           <div className={`text-xl font-bold ${textColor}`}>{Math.round((course.completedSessions / course.totalSessions) * 100)}%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main dashboard component
// export default function AttendanceDashboard() {
//   const [courses, setCourses] = useState(initialCourses);
//   const [students, setStudents] = useState(initialStudents);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentView, setCurrentView] = useState("courses"); // 'courses', 'attendance', 'analytics'

//   // Simulating data loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Handle course selection
//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setCurrentView("attendance");
//   };

//   // Toggle student attendance for a specific date
//   const handleAttendanceUpdate = (studentId, date) => {
//     setStudents((prevStudents) =>
//       prevStudents.map((student) =>
//         student.id === studentId
//           ? {
//               ...student,
//               attendanceHistory: {
//                 ...student.attendanceHistory,
//                 [date]: !student.attendanceHistory[date],
//               },
//             }
//           : student
//       )
//     );

//     // Recalculate course attendance rate
//     updateCourseAttendanceRate(selectedCourse.id);
//   };

//   // Update course attendance rate based on student attendance
//   const updateCourseAttendanceRate = (courseId) => {
//     const courseStudents = students.filter((s) => s.courseId === courseId);

//     // Calculate average attendance rate across all sessions and students
//     let totalAttendance = 0;
//     let totalSessions = 0;

//     courseStudents.forEach((student) => {
//       const attendanceDates = Object.keys(student.attendanceHistory);
//       const attendedCount = attendanceDates.filter((date) => student.attendanceHistory[date]).length;
//       totalAttendance += attendedCount;
//       totalSessions += attendanceDates.length;
//     });

//     const newAttendanceRate = totalSessions > 0 ? Math.round((totalAttendance / totalSessions) * 100) : 0;

//     setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? { ...course, attendanceRate: newAttendanceRate } : course)));
//   };

//   // Handle going back to course list
//   const handleBack = () => {
//     setSelectedCourse(null);
//     setCurrentView("courses");
//   };

//   // Switch to analytics view
//   const handleViewAnalytics = () => {
//     setCurrentView("analytics");
//   };

//   // Filter students for selected course
//   const filteredStudents = students.filter((student) => selectedCourse?.id && student.courseId === selectedCourse.id);

//   // Main content based on selection
//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className='flex justify-center items-center h-64'>
//           <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
//         </div>
//       );
//     }

//     if (selectedCourse) {
//       return (
//         <>
//           {currentView === "attendance" && (
//             <>
//               <StudentList students={filteredStudents} course={selectedCourse} onAttendanceUpdate={handleAttendanceUpdate} onBack={handleBack} />
//             </>
//           )}

//           {currentView === "analytics" && (
//             <>
//               <div className='px-6'>
//                 <div className='flex items-center mb-6'>
//                   <button onClick={() => setCurrentView("attendance")} className='mr-4 p-2 rounded-full hover:bg-gray-700 transition duration-200 text-gray-300'>
//                     <ChevronLeft size={20} />
//                   </button>
//                   <div>
//                     <h2 className='text-2xl font-bold text-gray-100'>{selectedCourse.title} Analytics</h2>
//                     <p className='text-gray-400'>{selectedCourse.students} students enrolled</p>
//                   </div>
//                 </div>
//                 <CourseAnalytics course={selectedCourse} students={filteredStudents} />
//               </div>
//             </>
//           )}
//         </>
//       );
//     }

//     return <CourseOverview courses={courses} onCourseSelect={handleCourseSelect} />;
//   };

//   return (
//     <DashboardLayout userRole='trainer'>
//       <div className='min-h-screen'>
//         <div className='container mx-auto'>
//           <header className='py-6 px-4 border-b border-gray-800 dark:border-gray-800 light:border-gray-200 flex justify-between items-center'>
//             <h1 className='text-2xl font-bold text-white dark:text-white light:text-gray-800'>Instructor Attendance Dashboard</h1>
//             <div className='flex items-center'></div>
//           </header>

//           <main className='w-full'>{renderContent()}</main>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

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
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(dateTimeString).toLocaleTimeString("en-US", options);
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
              <span className='text-xs font-medium text-white text-opacity-90'>Course Progress</span>
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
              <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Next Session</span>
              <div className='flex items-center'>
                <Clock className='w-4 h-4 text-gray-500 dark:text-gray-400 mr-1' />
                <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>{formatTime(course.nextSession)}</span>
              </div>
            </div>

            <div className='flex flex-col'>
              <span className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Date</span>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 text-gray-500 dark:text-gray-400 mr-1' />
                <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>{formatDate(course.nextSession)}</span>
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
                {difficultyBadge.icon}
                {course.difficulty}
              </span>

              <div className='bg-blue-50 dark:bg-blue-900 p-2 rounded-full shadow-inner'>
                <ArrowUpRight className='w-4 h-4 text-blue-600 dark:text-blue-300' />
              </div>
            </div>
          </div>
        </div>

        {/* Duration tag */}
        <div className='absolute top-0 right-0 mt-6 mr-6'>
          <div className='flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-30 text-white'>
            <span>
              {course.completedSessions}/{course.totalSessions} Sessions
            </span>
          </div>
        </div>
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
