"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle, XCircle, Clock, Filter, Calendar, User, CheckSquare, AlertTriangle, RotateCcw, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

// Types
type Session = {
  id: string;
  time: string;
  duration: string;
  room: string;
};

type Student = {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  enrollmentDate: string;
  lastLogin: string;
  progress: number;
  attendanceHistory: {
    [date: string]: {
      [sessionId: string]: boolean;
    };
  };
};

type Course = {
  id: string;
  title: string;
  code: string;
};

type AttendanceTrackerProps = {
  course: Course;
  onBack: () => void;
};

// Components
const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
    <div className={`${color} h-2.5 rounded-full transition-all duration-300 ease-in-out`} style={{ width: `${percentage}%` }}></div>
  </div>
);

const DateSelector = ({ dates, selectedDate, onSelectDate, sessions }: { dates: string[]; selectedDate: string; onSelectDate: (date: string) => void; sessions: Session[] }) => {
  // Group dates by month for better organization
  const groupedDates = dates.reduce((acc, date) => {
    const month = new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(date);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={20} className="text-indigo-500 dark:text-indigo-400" />
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Select Date</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {Object.entries(groupedDates).map(([month, monthDates]) => (
          <div key={month} className="flex-shrink-0">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1">{month}</div>
            <div className="flex gap-2">
              {monthDates.map((date) => {
                const dateObj = new Date(date);
                const isToday = new Date().toDateString() === dateObj.toDateString();
                const isPast = dateObj < new Date();

                return (
                  <button
                    key={date}
                    onClick={() => onSelectDate(date)}
                    className={`px-3 py-2 text-xs rounded-lg transition-all duration-200 flex flex-col items-center min-w-14 shadow-sm border
                      ${selectedDate === date
                        ? "bg-indigo-500 text-white border-indigo-600 shadow-md transform scale-105"
                        : isPast
                          ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}
                      ${isToday && selectedDate !== date ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""}
                    `}
                  >
                    <span className="font-bold text-sm">{dateObj.getDate()}</span>
                    <span className="text-[10px] mt-1 font-medium">{dateObj.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SessionSelector = ({ sessions, selectedSession, onSelectSession }: { sessions: Session[]; selectedSession: string; onSelectSession: (sessionId: string) => void }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={20} className="text-purple-500 dark:text-purple-400" />
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Session Time</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 border shadow-sm
              ${selectedSession === session.id
                ? "bg-purple-500 text-white border-purple-600 shadow-md transform scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`}
          >
            <Clock size={18} />
            <div className="flex flex-col items-start">
              <span className="font-medium">{session.time}</span>
              <span className="text-xs opacity-80">{session.duration} • {session.room}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ course, onBack }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessionDates, setSessionDates] = useState<string[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [attendanceLoading, setAttendanceLoading] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock data generation functions
  const generateSessionDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 30);

    for (let i = 0; i < 45; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      if ([1, 3, 5].includes(date.getDay())) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  const generateSessions = (): Session[] => {
    return [
      { id: "morning", time: "9:00 AM", duration: "1h 30m", room: "Room 101" },
      { id: "afternoon", time: "2:30 PM", duration: "1h 30m", room: "Room 203" },
      { id: "evening", time: "6:00 PM", duration: "1h 30m", room: "Lab 3" },
    ];
  };

  const generateStudents = (count: number): Student[] => {
    const students: Student[] = [];
    const names = ["Emma Johnson", "Liam Smith", "Olivia Brown", "Noah Williams", "Ava Jones", "William Davis", "Sophia Miller", "James Wilson", "Isabella Moore", "Oliver Taylor", "Charlotte Anderson", "Elijah Thomas", "Amelia Jackson", "Lucas White", "Mia Harris"];

    for (let i = 0; i < count; i++) {
      const enrollmentDate = new Date();
      enrollmentDate.setDate(enrollmentDate.getDate() - Math.floor(Math.random() * 120));

      const lastLogin = new Date();
      lastLogin.setDate(lastLogin.getDate() - Math.floor(Math.random() * 14));

      const attendanceHistory: Record<string, Record<string, boolean>> = {};
      sessionDates.forEach((date) => {
        if (new Date(date) < new Date()) {
          attendanceHistory[date] = {};
          sessions.forEach((session) => {
            attendanceHistory[date][session.id] = Math.random() < 0.85;
          });
        } else {
          attendanceHistory[date] = {};
          sessions.forEach((session) => {
            attendanceHistory[date][session.id] = false;
          });
        }
      });

      students.push({
        id: `ST${(1000 + i).toString()}`,
        rollNumber: `R${(2000 + i).toString()}`,
        name: names[i % names.length],
        email: `${names[i % names.length].split(" ")[0].toLowerCase()}${i}@example.com`,
        enrollmentDate: enrollmentDate.toISOString(),
        lastLogin: lastLogin.toISOString(),
        progress: Math.floor(Math.random() * 100),
        attendanceHistory,
      });
    }

    return students;
  };

  useEffect(() => {
    const dates = generateSessionDates();
    setSessionDates(dates);

    const sessionsList = generateSessions();
    setSessions(sessionsList);

    const today = new Date();
    const mostRecentDate = dates.filter((date) => new Date(date) <= today).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || dates[0];
    setSelectedDate(mostRecentDate);
    setSelectedSession(sessionsList[0].id);

    setTimeout(() => {
      const studentsList = generateStudents(15);
      setStudents(studentsList);
    }, 100);
  }, []);

  const handleAttendanceToggle = async (studentId: string) => {
    setAttendanceLoading((prev) => ({ ...prev, [studentId]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      setStudents((prevStudents) =>
        prevStudents.map((student) => {
          if (student.id === studentId) {
            const updatedHistory = { ...student.attendanceHistory };
            if (!updatedHistory[selectedDate]) {
              updatedHistory[selectedDate] = {};
            }
            updatedHistory[selectedDate][selectedSession] = !updatedHistory[selectedDate][selectedSession];

            return {
              ...student,
              attendanceHistory: updatedHistory,
            };
          }
          return student;
        })
      );
    } catch (error) {
      console.error("Error updating attendance:", error);
    } finally {
      setAttendanceLoading((prev) => ({ ...prev, [studentId]: false }));
    }
  };

  const handleMarkAllPresent = async () => {
    setIsMarkingAll(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStudents((prevStudents) =>
        prevStudents.map((student) => {
          const updatedHistory = { ...student.attendanceHistory };
          if (!updatedHistory[selectedDate]) {
            updatedHistory[selectedDate] = {};
          }
          updatedHistory[selectedDate][selectedSession] = true;

          return {
            ...student,
            attendanceHistory: updatedHistory,
          };
        })
      );
    } catch (error) {
      console.error("Error marking all present:", error);
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getSessionById = (sessionId: string): Session | undefined => {
    return sessions.find((session) => session.id === sessionId);
  };

  const calculateAttendanceRate = (): number => {
    const relevantStudents = filteredStudents();
    const presentCount = relevantStudents.filter((student) => student.attendanceHistory[selectedDate]?.[selectedSession]).length;
    return relevantStudents.length > 0 ? Math.round((presentCount / relevantStudents.length) * 100) : 0;
  };

  const calculateOverallAttendance = (student: Student): number => {
    let totalSessions = 0;
    let attendedSessions = 0;

    const today = new Date();

    Object.keys(student.attendanceHistory).forEach((date) => {
      if (new Date(date) <= today) {
        Object.keys(student.attendanceHistory[date]).forEach((sessionId) => {
          totalSessions++;
          if (student.attendanceHistory[date][sessionId]) {
            attendedSessions++;
          }
        });
      }
    });

    return totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;
  };

  const isSelectedDateInPast = (): boolean => {
    return new Date(selectedDate) <= new Date();
  };

  const filteredStudents = (): Student[] => {
    return students.filter((student) => {
      const searchMatch = searchTerm === "" || student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());

      let statusMatch = true;
      if (filterStatus !== "all") {
        const isPresent = student.attendanceHistory[selectedDate]?.[selectedSession] || false;
        statusMatch = (filterStatus === "present" && isPresent) || (filterStatus === "absent" && !isPresent);
      }

      return searchMatch && statusMatch;
    });
  };

  const getAttendanceStatusColor = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-500 dark:bg-emerald-600";
    if (percentage >= 75) return "bg-green-500 dark:bg-green-600";
    if (percentage >= 60) return "bg-yellow-500 dark:bg-yellow-600";
    return "bg-red-500 dark:bg-red-600";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 dark:bg-black min-h-screen transition-colors duration-300">
      {/* Course header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-700"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{course?.title || "Web Development"}</h1>
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded text-xs font-medium">{course?.code || "CS305"}</span>
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span>{students.length} students enrolled</span>
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg animate-pulse">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Attendance saved successfully!</span>
          </div>
        )}
      </div>

      {/* Date and Session selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
          <DateSelector dates={sessionDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} sessions={sessions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
          <SessionSelector sessions={sessions} selectedSession={selectedSession} onSelectSession={setSelectedSession} />
        </div>
      </div>

      {/* Attendance statistics card */}
      <div className="mb-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Attendance for {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </h3>
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded mr-3">
                <Clock size={16} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {getSessionById(selectedSession)?.time} ({getSessionById(selectedSession)?.duration}) • {getSessionById(selectedSession)?.room}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-1.5">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {filteredStudents().filter((s) => s.attendanceHistory[selectedDate]?.[selectedSession]).length} of {filteredStudents().length} students present
                  </p>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-200">{calculateAttendanceRate()}%</p>
              </div>
              <ProgressBar percentage={calculateAttendanceRate()} color={getAttendanceStatusColor(calculateAttendanceRate())} />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {isSelectedDateInPast() ? (
              <>
                <button
                  onClick={handleMarkAllPresent}
                  disabled={isMarkingAll}
                  className={`px-4 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg text-sm transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow
                    ${isMarkingAll ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isMarkingAll ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Marking...
                    </>
                  ) : (
                    <>
                      <CheckSquare size={16} />
                      Mark All Present
                    </>
                  )}
                </button>

                <button
                  onClick={handleSaveAttendance}
                  disabled={isSaving}
                  className={`px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-lg text-sm transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow
                    ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Attendance
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center px-4 py-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-sm shadow-sm">
                <AlertTriangle size={16} className="mr-2" />
                Future session - attendance not yet available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-200"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex items-center">
            <label htmlFor="statusFilter" className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Filter size={14} className="inline mr-1" />
              Status:
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="all">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("all");
            }}
            className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 gap-2 border border-gray-200 dark:border-gray-600"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Students table */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID/Roll No
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Overall Attendance
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {isSelectedDateInPast() ? "Attendance" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents().length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <User size={36} className="mx-auto mb-3 opacity-40" />
                    <p className="text-lg font-medium">No students match your search criteria</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search term</p>
                  </td>
                </tr>
              ) : (
                filteredStudents().map((student) => {
                  const attendanceRate = calculateOverallAttendance(student);
                  const isPresent = student.attendanceHistory[selectedDate]?.[selectedSession] || false;

                  return (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{student.id}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Roll: {student.rollNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 text-white flex items-center justify-center font-medium">
                            {getInitials(student.name)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{student.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Last login: {new Date(student.lastLogin).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{student.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center mb-1">
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mr-2">{attendanceRate}%</div>
                          <div className={`h-2.5 w-2.5 rounded-full ${attendanceRate >= 90 ? 'bg-emerald-500' :
                            attendanceRate >= 75 ? 'bg-green-500' :
                              attendanceRate >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}></div>
                        </div>
                        <ProgressBar
                          percentage={attendanceRate}
                          color={getAttendanceStatusColor(attendanceRate)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSelectedDateInPast() ? (
                          <button
                            onClick={() => handleAttendanceToggle(student.id)}
                            disabled={attendanceLoading[student.id]}
                            className={`flex items-center px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium
                              ${isPresent
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'} 
                              ${attendanceLoading[student.id] ? 'opacity-70 cursor-wait' : ''}`}
                          >
                            {attendanceLoading[student.id] ? (
                              <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : isPresent ? (
                              <CheckCircle size={16} className="mr-1.5" />
                            ) : (
                              <XCircle size={16} className="mr-1.5" />
                            )}
                            {isPresent ? 'Present' : 'Absent'}
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            Not Available
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination or load more control would go here */}
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredStudents().length} of {students.length} students
      </div>
    </div>
  );
};

// Main component that uses DashboardLayout
export default function AttendanceTrackerPage() {
  const [course] = useState<Course>({
    id: "CS305",
    title: "Web Development",
    code: "CS305",
  });

  const handleBack = () => {
    // In a real app, this would navigate back or to a specific route
    console.log("Navigate back");
  };

  return (
    <DashboardLayout userRole='trainer'>
      <AttendanceTracker course={course} onBack={handleBack} />
    </DashboardLayout>
  );
}