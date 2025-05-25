"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, Trash2, Edit, Plus, X, Save, UserPlus, Calendar, CheckCircle, AlertCircle, Clock, Award, BookOpen, Upload, GraduationCap, TrendingUp, Users } from "lucide-react";
import DashboardLayout from "../../../../components/dashboard-layout";

// Define the Student type
interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: "Active" | "Inactive" | "On Leave";
  avatar: string;
  attendance: string;
  fees: "Paid" | "Pending" | "Overdue";
}

// Define the NewStudent type (without id and avatar)
type NewStudent = Omit<Student, "id" | "avatar">;

// Mock data with proper types
const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    course: "Computer Science",
    enrollmentDate: "2024-01-15",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=John+Doe",
    attendance: "95%",
    fees: "Paid",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "Data Science",
    enrollmentDate: "2024-01-20",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
    attendance: "92%",
    fees: "Paid",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    course: "Software Engineering",
    enrollmentDate: "2024-02-01",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Michael+Johnson",
    attendance: "88%",
    fees: "Pending",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.b@example.com",
    course: "Artificial Intelligence",
    enrollmentDate: "2024-01-25",
    status: "On Leave",
    avatar: "https://ui-avatars.com/api/?name=Emily+Brown",
    attendance: "85%",
    fees: "Paid",
  },
  {
    id: 5,
    name: "William Davis",
    email: "william.d@example.com",
    course: "Cybersecurity",
    enrollmentDate: "2024-02-05",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=William+Davis",
    attendance: "94%",
    fees: "Paid",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    course: "Web Development",
    enrollmentDate: "2024-01-10",
    status: "Inactive",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson",
    attendance: "78%",
    fees: "Overdue",
  },
  {
    id: 7,
    name: "James Taylor",
    email: "james.t@example.com",
    course: "Mobile Development",
    enrollmentDate: "2024-02-15",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=James+Taylor",
    attendance: "91%",
    fees: "Paid",
  },
  {
    id: 8,
    name: "Emma Anderson",
    email: "emma.a@example.com",
    course: "Cloud Computing",
    enrollmentDate: "2024-01-30",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Emma+Anderson",
    attendance: "89%",
    fees: "Pending",
  },
  {
    id: 9,
    name: "Alexander Martin",
    email: "alex.m@example.com",
    course: "Computer Science",
    enrollmentDate: "2024-02-10",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Alexander+Martin",
    attendance: "93%",
    fees: "Paid",
  },
  {
    id: 10,
    name: "Olivia Thompson",
    email: "olivia.t@example.com",
    course: "Data Analytics",
    enrollmentDate: "2024-01-18",
    status: "On Leave",
    avatar: "https://ui-avatars.com/api/?name=Olivia+Thompson",
    attendance: "86%",
    fees: "Paid",
  },
  {
    id: 11,
    name: "Daniel White",
    email: "daniel.w@example.com",
    course: "Software Engineering",
    enrollmentDate: "2024-02-08",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Daniel+White",
    attendance: "90%",
    fees: "Paid",
  },
  {
    id: 12,
    name: "Sophia Clark",
    email: "sophia.c@example.com",
    course: "Artificial Intelligence",
    enrollmentDate: "2024-01-22",
    status: "Inactive",
    avatar: "https://ui-avatars.com/api/?name=Sophia+Clark",
    attendance: "75%",
    fees: "Overdue",
  },
  {
    id: 13,
    name: "Lucas Rodriguez",
    email: "lucas.r@example.com",
    course: "Cybersecurity",
    enrollmentDate: "2024-02-12",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Lucas+Rodriguez",
    attendance: "95%",
    fees: "Paid",
  },
  {
    id: 14,
    name: "Ava Martinez",
    email: "ava.m@example.com",
    course: "Web Development",
    enrollmentDate: "2024-01-28",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Ava+Martinez",
    attendance: "88%",
    fees: "Pending",
  },
  {
    id: 15,
    name: "Ethan Lee",
    email: "ethan.l@example.com",
    course: "Mobile Development",
    enrollmentDate: "2024-02-03",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Ethan+Lee",
    attendance: "92%",
    fees: "Paid",
  },
  {
    id: 16,
    name: "Isabella Garcia",
    email: "isabella.g@example.com",
    course: "Data Science",
    enrollmentDate: "2024-01-15",
    status: "On Leave",
    avatar: "https://ui-avatars.com/api/?name=Isabella+Garcia",
    attendance: "87%",
    fees: "Paid",
  },
  {
    id: 17,
    name: "Mason Scott",
    email: "mason.s@example.com",
    course: "Cloud Computing",
    enrollmentDate: "2024-02-18",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Mason+Scott",
    attendance: "91%",
    fees: "Paid",
  },
  {
    id: 18,
    name: "Charlotte King",
    email: "charlotte.k@example.com",
    course: "Computer Science",
    enrollmentDate: "2024-01-12",
    status: "Inactive",
    avatar: "https://ui-avatars.com/api/?name=Charlotte+King",
    attendance: "76%",
    fees: "Overdue",
  },
  {
    id: 19,
    name: "Henry Adams",
    email: "henry.a@example.com",
    course: "Software Engineering",
    enrollmentDate: "2024-02-07",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Henry+Adams",
    attendance: "94%",
    fees: "Paid",
  },
  {
    id: 20,
    name: "Victoria Wright",
    email: "victoria.w@example.com",
    course: "Data Analytics",
    enrollmentDate: "2024-01-24",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Victoria+Wright",
    attendance: "89%",
    fees: "Pending",
  },
];

export default function EnhancedStudentManagement() {
  // State management with proper types
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: "asc" | "desc" }>({ key: "name", direction: "asc" });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<"All" | Student["status"]>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: "",
    email: "",
    course: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    status: "Active",
    attendance: "90%",
    fees: "Paid",
  });
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const studentsPerPage = 8;

  // Load mock data
  useEffect(() => {
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setIsLoading(false);
  }, []);

  // Filtering and sorting
  useEffect(() => {
    let result = [...students];

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter((student) => student.name.toLowerCase().includes(searchTermLower) || student.email.toLowerCase().includes(searchTermLower) || student.course.toLowerCase().includes(searchTermLower));
    }

    // Apply status filter
    if (selectedStatus !== "All") {
      result = result.filter((student) => student.status === selectedStatus);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredStudents(result);
  }, [students, searchTerm, sortConfig, selectedStatus]);

  // Request sort function
  const requestSort = (key: keyof Student) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Selection functions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(currentStudents.map((student) => student.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Bulk delete function
  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedRows.length} student(s)?`)) {
      const updatedStudents = students.filter((student) => !selectedRows.includes(student.id));
      setStudents(updatedStudents);
      setSelectedRows([]);
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Enrollment Date", "Course", "Status", "Attendance", "Fees"];
    const csvData = filteredStudents.map((student) => [student.id, student.name, student.email, student.enrollmentDate, student.course, student.status, student.attendance, student.fees].join(","));

    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Sort icon renderer
  const renderSortIcon = (key: keyof Student) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='ml-1'>
          <path d='M18 15L12 9L6 15' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </motion.div>
    ) : (
      <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='ml-1'>
          <path d='M18 15L12 9L6 15' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </motion.div>
    );
  };

  // Edit student
  const openEditModal = (student: Student) => {
    setCurrentStudent({ ...student });
    setShowEditModal(true);
  };

  const saveEditedStudent = () => {
    // @ts-ignore
    const updatedStudents = students.map((student) => (student.id === currentStudent.id ? currentStudent : student));
    // @ts-ignore
    setStudents(updatedStudents);
    setShowEditModal(false);
  };

  // Add new student
  const addNewStudent = () => {
    const id = Math.max(...students.map((s) => s.id)) + 1;
    const studentToAdd = {
      ...newStudent,
      id,
      avatar: "/api/placeholder/40/40",
    };
    setStudents([...students, studentToAdd]);
    setNewStudent({
      name: "",
      email: "",
      course: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: "Active",
      attendance: "90%",
      fees: "Paid",
    });
    setShowAddModal(false);
  };

  // Pagination controls
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate attendance badge color based on percentage
  const getAttendanceColor = (attendance: string) => {
    const value = parseInt(attendance);
    if (value >= 90) return "bg-green-100 text-green-800";
    if (value >= 75) return "bg-blue-100 text-blue-800";
    if (value >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value === "All" ? "All" : (value as Student["status"]));
  };

  // Handle fees status change
  const handleFeesChange = (e: React.ChangeEvent<HTMLSelectElement>, student: Student) => {
    const value = e.target.value as Student["fees"];
    setCurrentStudent({ ...student, fees: value });
  };

  // Handle status change
  const handleStatusChangeEdit = (e: React.ChangeEvent<HTMLSelectElement>, student: Student) => {
    const value = e.target.value as Student["status"];
    setCurrentStudent({ ...student, status: value });
  };

  // Delete student with proper type safety
  const deleteStudent = (id: number) => {
    // Clear current student if it matches the deleted one
    if (currentStudent?.id === id) {
      setCurrentStudent(null);
    }

    // Filter out the deleted student
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };

  // Edit modal with proper null checks
  const renderEditModal = () => {
    if (!currentStudent) return null;

    return (
      <div className='fixed inset-0 overflow-y-auto z-50 flex items-center justify-center'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' onClick={() => setShowEditModal(false)}></motion.div>

        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", bounce: 0.3 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all max-w-lg w-full p-6 z-10'>
          <div className='flex justify-between items-center mb-5'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Edit Student</h3>
            <button onClick={() => setShowEditModal(false)} className='text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'>
              <X className='h-5 w-5' />
            </button>
          </div>

          <div className='space-y-4'>
            <div>
              <label htmlFor='edit-name' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Name
              </label>
              <input type='text' name='edit-name' id='edit-name' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.name} onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })} />
            </div>

            <div>
              <label htmlFor='edit-email' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Email
              </label>
              <input type='email' name='edit-email' id='edit-email' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.email} onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })} />
            </div>

            <div>
              <label htmlFor='edit-course' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Course
              </label>
              <input type='text' name='edit-course' id='edit-course' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.course} onChange={(e) => setCurrentStudent({ ...currentStudent, course: e.target.value })} />
            </div>

            <div>
              <label htmlFor='edit-enrollmentDate' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Enrollment Date
              </label>
              <input type='date' name='edit-enrollmentDate' id='edit-enrollmentDate' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.enrollmentDate} onChange={(e) => setCurrentStudent({ ...currentStudent, enrollmentDate: e.target.value })} />
            </div>

            <div>
              <label htmlFor='edit-status' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Status
              </label>
              <select id='edit-status' name='edit-status' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.status} onChange={(e) => handleStatusChangeEdit(e, currentStudent)}>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='On Leave'>On Leave</option>
              </select>
            </div>

            <div>
              <label htmlFor='edit-fees' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Fees Status
              </label>
              <select id='edit-fees' name='edit-fees' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.fees} onChange={(e) => handleFeesChange(e, currentStudent)}>
                <option value='Paid'>Paid</option>
                <option value='Pending'>Pending</option>
                <option value='Overdue'>Overdue</option>
              </select>
            </div>

            <div>
              <label htmlFor='edit-attendance' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Attendance (%)
              </label>
              <input type='text' name='edit-attendance' id='edit-attendance' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={currentStudent.attendance} onChange={(e) => setCurrentStudent({ ...currentStudent, attendance: e.target.value })} />
            </div>
          </div>

          <div className='mt-6 flex justify-end space-x-3'>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEditModal(false)} className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Cancel
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={saveEditedStudent} className='inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              <Save className='h-4 w-4 mr-2' />
              Save Changes
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Import CSV function
  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());

        // Validate headers
        const requiredHeaders = ["Name", "Email", "Course", "Enrollment Date", "Status", "Attendance", "Fees"];
        const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));

        if (missingHeaders.length > 0) {
          setImportError(`Missing required columns: ${missingHeaders.join(", ")}`);
          return;
        }

        const newStudents: Student[] = [];
        let hasError = false;

        // Process each row
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue; // Skip empty rows

          const values = rows[i].split(",").map((value) => value.trim());
          if (values.length !== headers.length) {
            setImportError(`Row ${i + 1} has incorrect number of columns`);
            hasError = true;
            break;
          }

          const student: Student = {
            id: Math.max(...students.map((s) => s.id)) + newStudents.length + 1,
            name: values[headers.indexOf("Name")],
            email: values[headers.indexOf("Email")],
            course: values[headers.indexOf("Course")],
            enrollmentDate: values[headers.indexOf("Enrollment Date")],
            status: values[headers.indexOf("Status")] as Student["status"],
            attendance: values[headers.indexOf("Attendance")],
            fees: values[headers.indexOf("Fees")] as Student["fees"],
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(values[headers.indexOf("Name")])}`,
          };

          // Validate student data
          if (!student.name || !student.email || !student.course) {
            setImportError(`Row ${i + 1} is missing required fields`);
            hasError = true;
            break;
          }

          if (!["Active", "Inactive", "On Leave"].includes(student.status)) {
            setImportError(`Row ${i + 1} has invalid status`);
            hasError = true;
            break;
          }

          if (!["Paid", "Pending", "Overdue"].includes(student.fees)) {
            setImportError(`Row ${i + 1} has invalid fees status`);
            hasError = true;
            break;
          }

          newStudents.push(student);
        }

        if (!hasError) {
          setStudents([...students, ...newStudents]);
          setImportSuccess(`Successfully imported ${newStudents.length} students`);
          setTimeout(() => setImportSuccess(null), 3000);
        }
      } catch (error) {
        setImportError("Error processing CSV file");
      }
    };

    reader.onerror = () => {
      setImportError("Error reading file");
    };

    reader.readAsText(file);
    event.target.value = ""; // Reset file input
  };

  return (
    <DashboardLayout userRole='admin'>
      <div className='bg-gray-50 dark:bg-gray-900 min-h-screen -m-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className='bg-gradient-to-r from-blue-600 via-indigo-700 to-violet-800 shadow-xl rounded-b-lg pt-5'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <div>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className='text-3xl md:text-4xl font-bold text-white flex items-center'>
                  <GraduationCap className='mr-3' size={32} />
                  Students Management
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className='mt-2 text-lg text-indigo-100'>
                  Manage enrolled students, view details, and track progress
                </motion.p>
              </div>

              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className='mt-4 md:mt-0 flex gap-4'>
                <div className='bg-white bg-opacity-20 rounded-lg px-4 py-3 flex items-center'>
                  <Users className='text-white mr-2' />
                  <span className='text-white font-semibold'>328 Students</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Stats Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
            <motion.div whileHover={{ y: -5 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Total Students</h3>
                  <p className='text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2'>{students.length}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Overall enrolled students</p>
                </div>
                <div className='bg-blue-100 dark:bg-blue-900 p-3 rounded-lg'>
                  <BookOpen className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Active Students</h3>
                  <p className='text-3xl font-bold text-green-600 dark:text-green-400 mt-2'>{students.filter((student) => student.status === "Active").length}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Currently active students</p>
                </div>
                <div className='bg-green-100 dark:bg-green-900 p-3 rounded-lg'>
                  <CheckCircle className='h-6 w-6 text-green-600 dark:text-green-400' />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-yellow-500'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Pending Fees</h3>
                  <p className='text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2'>{students.filter((student) => student.fees !== "Paid").length}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Students with pending fees</p>
                </div>
                <div className='bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg'>
                  <AlertCircle className='h-6 w-6 text-yellow-600 dark:text-yellow-400' />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>On Leave</h3>
                  <p className='text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2'>{students.filter((student) => student.status === "On Leave").length}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Students currently on leave</p>
                </div>
                <div className='bg-purple-100 dark:bg-purple-900 p-3 rounded-lg'>
                  <Clock className='h-6 w-6 text-purple-600 dark:text-purple-400' />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Control Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8'>
            <div className='flex flex-col space-y-4'>
              {/* Search and Filter Row */}
              <div className='flex flex-col md:flex-row gap-4'>
                {/* Search Bar */}
                <div className='relative flex-grow'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <Search className='h-5 w-5 text-gray-400 dark:text-gray-500' />
                  </span>
                  <input type='text' className='pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400' placeholder='Search students by name, email or course...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Filter Dropdown */}
                <div className='flex items-center shrink-0'>
                  <Filter className='h-5 w-5 text-gray-500 dark:text-gray-400 mr-2' />
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap'>Status:</span>
                  <select className='rounded-lg border border-gray-200 dark:border-gray-700 py-2.5 px-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={selectedStatus} onChange={handleStatusChange}>
                    <option value='All'>All</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='On Leave'>On Leave</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-wrap justify-end gap-3'>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddModal(true)} className='flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-lg shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                  <UserPlus className='h-4 w-4 mr-2' />
                  <span className='whitespace-nowrap'>Add Student</span>
                </motion.button>

                <div className='relative'>
                  <input type='file' accept='.csv' onChange={importFromCSV} className='hidden' id='csv-import' />
                  <motion.label whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} htmlFor='csv-import' className='flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
                    <Upload className='h-4 w-4 mr-2' />
                    <span className='whitespace-nowrap'>Import CSV</span>
                  </motion.label>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={exportToCSV} className='flex items-center px-4 py-2 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500'>
                  <Download className='h-4 w-4 mr-2' />
                  <span className='whitespace-nowrap'>Export CSV</span>
                </motion.button>

                {selectedRows.length > 0 && (
                  <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBulkDelete} className='flex items-center px-4 py-2 bg-red-600 dark:bg-red-700 text-white font-medium rounded-lg shadow hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500'>
                    <Trash2 className='h-4 w-4 mr-2' />
                    <span className='whitespace-nowrap'>Delete ({selectedRows.length})</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Import Status Messages */}
            <AnimatePresence>
              {importError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg flex items-center justify-between'>
                  <div className='flex items-center'>
                    <AlertCircle className='h-5 w-5 mr-2 flex-shrink-0' />
                    <span>{importError}</span>
                  </div>
                  <button onClick={() => setImportError(null)} className='text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'>
                    <X className='h-4 w-4' />
                  </button>
                </motion.div>
              )}

              {importSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-200 rounded-lg flex items-center justify-between'>
                  <div className='flex items-center'>
                    <CheckCircle className='h-5 w-5 mr-2 flex-shrink-0' />
                    <span>{importSuccess}</span>
                  </div>
                  <button onClick={() => setImportSuccess(null)} className='text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300'>
                    <X className='h-4 w-4' />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Students Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            {isLoading ? (
              <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400'></div>
              </div>
            ) : (
              <>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className='bg-gray-50 dark:bg-gray-700'>
                      <tr>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                          <div className='flex items-center'>
                            <input type='checkbox' className='h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded' checked={currentStudents.length > 0 && selectedRows.length === currentStudents.length} onChange={handleSelectAll} />
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("name")}>
                          <div className='flex items-center'>
                            Student
                            {renderSortIcon("name")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("course")}>
                          <div className='flex items-center'>
                            Course
                            {renderSortIcon("course")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("enrollmentDate")}>
                          <div className='flex items-center'>
                            Enrollment Date
                            {renderSortIcon("enrollmentDate")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("status")}>
                          <div className='flex items-center'>
                            Status
                            {renderSortIcon("status")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("attendance")}>
                          <div className='flex items-center'>
                            Attendance
                            {renderSortIcon("attendance")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer' onClick={() => requestSort("fees")}>
                          <div className='flex items-center'>
                            Fees
                            {renderSortIcon("fees")}
                          </div>
                        </th>
                        <th scope='col' className='px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                      <AnimatePresence>
                        {currentStudents.map((student) => (
                          <motion.tr key={student.id} className='hover:bg-gray-50 dark:hover:bg-gray-700' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <input type='checkbox' className='h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded' checked={selectedRows.includes(student.id)} onChange={() => toggleRowSelection(student.id)} />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='h-10 w-10 flex-shrink-0'>
                                  <img className='h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600' src={student.avatar} alt={student.name} />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>{student.name}</div>
                                  <div className='text-xs text-gray-500 dark:text-gray-400'>{student.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-900 dark:text-gray-100'>{student.course}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-sm text-gray-500 dark:text-gray-400 flex items-center'>
                                <Calendar className='h-4 w-4 mr-1 text-gray-400 dark:text-gray-500' />
                                {student.enrollmentDate}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${student.status === "Active" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : student.status === "Inactive" ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"}`}
                              >
                                {student.status}
                              </span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAttendanceColor(student.attendance)}`}>{student.attendance}</span>
                                <div className='ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                                  <div className={`h-2 rounded-full ${parseInt(student.attendance) >= 90 ? "bg-green-500 dark:bg-green-400" : parseInt(student.attendance) >= 75 ? "bg-blue-500 dark:bg-blue-400" : parseInt(student.attendance) >= 60 ? "bg-yellow-500 dark:bg-yellow-400" : "bg-red-500 dark:bg-red-400"}`} style={{ width: student.attendance }}></div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${student.fees === "Paid" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : student.fees === "Pending" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"}`}
                              >
                                {student.fees}
                              </span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openEditModal(student)} className='text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 p-2 rounded-lg'>
                                <Edit className='h-4 w-4' />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className='bg-white dark:bg-gray-800 px-4 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6'>
                  <div className='flex-1 flex justify-between items-center'>
                    <div>
                      <p className='text-sm text-gray-700 dark:text-gray-300'>
                        Showing <span className='font-medium'>{indexOfFirstStudent + 1}</span> to <span className='font-medium'>{Math.min(indexOfLastStudent, filteredStudents.length)}</span> of <span className='font-medium'>{filteredStudents.length}</span> results
                      </p>
                    </div>
                    <div className='flex space-x-1'>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={`relative inline-flex items-center px-4 py-2 rounded-md border ${currentPage === 1 ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        Previous
                      </motion.button>

                      {/* Page numbers */}
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = Math.max(1, currentPage - 2) + i;
                          if (pageNum > totalPages) {
                            pageNum = totalPages - (4 - i);
                          }
                        }
                        if (pageNum > totalPages) return null;

                        return (
                          <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => changePage(pageNum)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${currentPage === pageNum ? "z-10 bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500 text-white" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                            {pageNum}
                          </motion.button>
                        );
                      })}

                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={`relative inline-flex items-center px-4 py-2 rounded-md border ${currentPage === totalPages ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                        Next
                      </motion.button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Add Student Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className='fixed inset-0 overflow-y-auto z-50 flex items-center justify-center'>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' onClick={() => setShowAddModal(false)}></motion.div>

              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", bounce: 0.3 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all max-w-lg w-full p-6 z-10'>
                <div className='flex justify-between items-center mb-5'>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Add New Student</h3>
                  <button onClick={() => setShowAddModal(false)} className='text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'>
                    <X className='h-5 w-5' />
                  </button>
                </div>

                <div className='space-y-4'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Name
                    </label>
                    <input type='text' name='name' id='name' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' placeholder='John Doe' value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Email
                    </label>
                    <input type='email' name='email' id='email' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' placeholder='john.doe@example.com' value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
                  </div>

                  <div>
                    <label htmlFor='course' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Course
                    </label>
                    <input type='text' name='course' id='course' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' placeholder='Computer Science' value={newStudent.course} onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} />
                  </div>

                  <div>
                    <label htmlFor='enrollmentDate' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Enrollment Date
                    </label>
                    <input type='date' name='enrollmentDate' id='enrollmentDate' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={newStudent.enrollmentDate} onChange={(e) => setNewStudent({ ...newStudent, enrollmentDate: e.target.value })} />
                  </div>

                  <div>
                    <label htmlFor='status' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Status
                    </label>
                    <select id='status' name='status' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={newStudent.status} onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as Student["status"] })}>
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                      <option value='On Leave'>On Leave</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='fees' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Fees Status
                    </label>
                    <select id='fees' name='fees' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={newStudent.fees} onChange={(e) => setNewStudent({ ...newStudent, fees: e.target.value as Student["fees"] })}>
                      <option value='Paid'>Paid</option>
                      <option value='Pending'>Pending</option>
                      <option value='Overdue'>Overdue</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='attendance' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Attendance (%)
                    </label>
                    <input type='text' name='attendance' id='attendance' className='mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' placeholder='95%' value={newStudent.attendance} onChange={(e) => setNewStudent({ ...newStudent, attendance: e.target.value })} />
                  </div>
                </div>

                <div className='mt-6 flex justify-end space-x-3'>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowAddModal(false)} className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Cancel
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addNewStudent} disabled={!newStudent.name || !newStudent.email || !newStudent.course} className={`inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!newStudent.name || !newStudent.email || !newStudent.course ? "bg-indigo-300 dark:bg-indigo-900 cursor-not-allowed" : "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}`}>
                    <Plus className='h-4 w-4 mr-2' />
                    Add Student
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Student Modal */}
        <AnimatePresence>{showEditModal && renderEditModal()}</AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
