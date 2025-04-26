import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, PlusCircle, ChevronDown, ChevronUp, Clock, CheckCircle, BookOpen, FileText, Award, Filter, ArrowUpDown } from "lucide-react";

// Demo data for modules
const demoModules = [
  {
    id: 1,
    title: "Introduction to User Experience Design",
    description: "Learn the fundamental principles of UX design and how to apply them to create user-centered digital products.",
    estimatedTime: 45, // minutes
    status: "Completed",
    completionDate: "Apr 15, 2025",
    hasAssignment: true,
    hasQuiz: true,
    category: "Design",
    dateCreated: "2025-01-10",
    contents: [
      { type: "video", title: "What is UX Design?", duration: 12 },
      { type: "reading", title: "Core UX Principles", duration: 15 },
      { type: "quiz", title: "UX Fundamentals Quiz", duration: 10 },
    ],
  },
  {
    id: 2,
    title: "User Research Methods",
    description: "Discover various research techniques to gain valuable insights about your users and their needs.",
    estimatedTime: 60,
    status: "In Progress",
    progress: 65,
    hasQuiz: true,
    category: "Research",
    dateCreated: "2025-01-15",
    contents: [
      { type: "video", title: "Qualitative vs Quantitative Research", duration: 18 },
      { type: "reading", title: "User Interviews Best Practices", duration: 20 },
      { type: "assignment", title: "Create a Research Plan", duration: 30 },
    ],
  },
  {
    id: 3,
    title: "Wireframing Basics",
    description: "Master the art of creating wireframes to visualize your ideas and communicate them effectively to stakeholders.",
    estimatedTime: 90,
    status: "Not Started",
    hasAssignment: true,
    category: "Design",
    dateCreated: "2025-01-22",
    contents: [
      { type: "video", title: "Wireframing Tools Overview", duration: 15 },
      { type: "demo", title: "Creating Your First Wireframe", duration: 25 },
      { type: "practice", title: "Wireframing Exercise", duration: 40 },
    ],
  },
  {
    id: 4,
    title: "Prototype Testing",
    description: "Learn how to test your prototypes with real users and gather actionable feedback to improve your designs.",
    estimatedTime: 75,
    status: "Completed",
    completionDate: "Apr 22, 2025",
    hasQuiz: true,
    category: "Testing",
    dateCreated: "2025-02-05",
    contents: [
      { type: "video", title: "Prototype Testing Approaches", duration: 20 },
      { type: "reading", title: "Writing Test Scenarios", duration: 15 },
      { type: "quiz", title: "Testing Knowledge Check", duration: 10 },
    ],
  },
  {
    id: 5,
    title: "Design Systems Fundamentals",
    description: "Understand what design systems are, why they matter, and how to create one for your organization.",
    estimatedTime: 120,
    status: "In Progress",
    progress: 30,
    hasAssignment: true,
    hasQuiz: true,
    category: "Design",
    dateCreated: "2025-02-12",
    contents: [
      { type: "video", title: "Introduction to Design Systems", duration: 18 },
      { type: "case study", title: "Successful Design System Examples", duration: 25 },
      { type: "practice", title: "Component Documentation Exercise", duration: 40 },
    ],
  },
  {
    id: 6,
    title: "Advanced Interaction Design",
    description: "Take your interaction design skills to the next level by learning advanced techniques and principles.",
    estimatedTime: 105,
    status: "Not Started",
    hasQuiz: true,
    category: "Design",
    dateCreated: "2025-02-20",
    contents: [
      { type: "video", title: "Microinteractions", duration: 22 },
      { type: "demo", title: "Creating Complex Animations", duration: 35 },
      { type: "quiz", title: "Interaction Design Challenge", duration: 25 },
    ],
  },
  {
    id: 7,
    title: "Information Architecture",
    description: "Learn how to organize and structure content to create intuitive and user-friendly digital experiences.",
    estimatedTime: 90,
    status: "Completed",
    completionDate: "Apr 10, 2025",
    hasAssignment: true,
    category: "Planning",
    dateCreated: "2025-03-01",
    contents: [
      { type: "reading", title: "IA Principles and Patterns", duration: 30 },
      { type: "video", title: "Card Sorting Techniques", duration: 20 },
      { type: "assignment", title: "Create a Site Map", duration: 40 },
    ],
  },
  {
    id: 8,
    title: "Responsive Design",
    description: "Master the techniques for creating designs that work beautifully across different screen sizes and devices.",
    estimatedTime: 85,
    status: "In Progress",
    progress: 45,
    hasQuiz: true,
    category: "Development",
    dateCreated: "2025-03-10",
    contents: [
      { type: "video", title: "Responsive Design Principles", duration: 18 },
      { type: "demo", title: "Breakpoints and Media Queries", duration: 25 },
      { type: "practice", title: "Mobile-First Exercise", duration: 30 },
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const progressVariants = {
  initial: (progress) => ({ width: 0 }),
  animate: (progress) => ({
    width: `${progress}%`,
    transition: { duration: 1, ease: "easeOut" },
  }),
};

// Get content type icon
const getContentTypeIcon = (type) => {
  switch (type) {
    case "video":
      return (
        <motion.div className='p-1 bg-blue-50 dark:bg-blue-900/30 rounded-full'>
          <BookOpen className='h-3 w-3 text-blue-600 dark:text-blue-400' />
        </motion.div>
      );
    case "quiz":
      return (
        <motion.div className='p-1 bg-amber-50 dark:bg-amber-900/30 rounded-full'>
          <Award className='h-3 w-3 text-amber-600 dark:text-amber-400' />
        </motion.div>
      );
    case "reading":
      return (
        <motion.div className='p-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-full'>
          <FileText className='h-3 w-3 text-emerald-600 dark:text-emerald-400' />
        </motion.div>
      );
    case "assignment":
      return (
        <motion.div className='p-1 bg-purple-50 dark:bg-purple-900/30 rounded-full'>
          <FileText className='h-3 w-3 text-purple-600 dark:text-purple-400' />
        </motion.div>
      );
    case "demo":
      return (
        <motion.div className='p-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full'>
          <BookOpen className='h-3 w-3 text-indigo-600 dark:text-indigo-400' />
        </motion.div>
      );
    case "practice":
      return (
        <motion.div className='p-1 bg-pink-50 dark:bg-pink-900/30 rounded-full'>
          <FileText className='h-3 w-3 text-pink-600 dark:text-pink-400' />
        </motion.div>
      );
    case "case study":
      return (
        <motion.div className='p-1 bg-cyan-50 dark:bg-cyan-900/30 rounded-full'>
          <BookOpen className='h-3 w-3 text-cyan-600 dark:text-cyan-400' />
        </motion.div>
      );
    default:
      return (
        <motion.div className='p-1 bg-gray-50 dark:bg-gray-900/30 rounded-full'>
          <BookOpen className='h-3 w-3 text-gray-600 dark:text-gray-400' />
        </motion.div>
      );
  }
};

// Main component
const CourseModulesView = () => {
  const [modules, setModules] = useState(demoModules);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModule, setExpandedModule] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("dateCreated");
  const [sortDirection, setSortDirection] = useState("desc");

  // Categories derived from modules
  const categories = ["All", ...new Set(demoModules.map((module) => module.category))];

  // Filter and sort modules
  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || module.category === filterCategory;
    const matchesStatus = filterStatus === "All" || module.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort modules
  const sortedModules = [...filteredModules].sort((a, b) => {
    let compareResult = 0;

    switch (sortOption) {
      case "title":
        compareResult = a.title.localeCompare(b.title);
        break;
      case "estimatedTime":
        compareResult = a.estimatedTime - b.estimatedTime;
        break;
      case "status":
        compareResult = a.status.localeCompare(b.status);
        break;
      case "dateCreated":
        compareResult = new Date(a.dateCreated) - new Date(b.dateCreated);
        break;
      default:
        compareResult = 0;
    }

    return sortDirection === "asc" ? compareResult : -compareResult;
  });

  // Toggle sort direction
  const toggleSort = (option) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  // Toggle expand/collapse module
  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-7xl mx-auto px-4 sm:px-6'>
      {/* Header */}
      <motion.div className='mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div>
          <motion.h2 className='text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' whileHover={{ scale: 1.02 }}>
            Course Modules
          </motion.h2>
          <motion.p className='text-gray-500 dark:text-gray-400' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Browse and manage all available learning modules
          </motion.p>
        </div>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20'>
          <PlusCircle className='h-4 w-4' />
          <span>Create New Module</span>
        </motion.button>
      </motion.div>

      {/* Filters and Search */}
      <motion.div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
          <input type='text' placeholder='Search modules...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent' />
        </div>

        <div className='flex items-center gap-2'>
          <Filter className='h-4 w-4 text-gray-500' />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm'>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <CheckCircle className='h-4 w-4 text-gray-500' />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm'>
            <option value='All'>All Statuses</option>
            <option value='Completed'>Completed</option>
            <option value='In Progress'>In Progress</option>
            <option value='Not Started'>Not Started</option>
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <ArrowUpDown className='h-4 w-4 text-gray-500' />
          <select
            value={`${sortOption}-${sortDirection}`}
            onChange={(e) => {
              const [option, direction] = e.target.value.split("-");
              setSortOption(option);
              setSortDirection(direction);
            }}
            className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm'
          >
            <option value='dateCreated-desc'>Latest First</option>
            <option value='dateCreated-asc'>Oldest First</option>
            <option value='title-asc'>Title (A-Z)</option>
            <option value='title-desc'>Title (Z-A)</option>
            <option value='estimatedTime-asc'>Duration (Shortest)</option>
            <option value='estimatedTime-desc'>Duration (Longest)</option>
            <option value='status-asc'>Status (A-Z)</option>
          </select>
        </div>
      </motion.div>

      {/* Stats summary */}
      <motion.div className='mb-8 grid grid-cols-2 md:grid-cols-4 gap-4' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <motion.div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Total Modules</h3>
          <p className='text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100'>{modules.length}</p>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Completed</h3>
          <p className='text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100'>{modules.filter((m) => m.status === "Completed").length}</p>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>In Progress</h3>
          <p className='text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100'>{modules.filter((m) => m.status === "In Progress").length}</p>
        </motion.div>

        <motion.div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/50 shadow-sm' whileHover={{ y: -5, transition: { duration: 0.2 } }}>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Not Started</h3>
          <p className='text-2xl font-bold mt-1 text-gray-800 dark:text-gray-100'>{modules.filter((m) => m.status === "Not Started").length}</p>
        </motion.div>
      </motion.div>

      {/* Modules List */}
      <motion.div className='space-y-4' variants={containerVariants} initial='hidden' animate='visible'>
        {sortedModules.length > 0 ? (
          sortedModules.map((module) => (
            <motion.div key={module.id} variants={itemVariants} className='group bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden'>
              {/* Module Header - Always Visible */}
              <motion.div className='p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer' onClick={() => toggleModule(module.id)} whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.5)", dark: { backgroundColor: "rgba(30, 58, 138, 0.1)" } }}>
                <div className='flex items-start md:items-center gap-3 flex-grow'>
                  {/* Status indicator */}
                  <div className='mt-1 md:mt-0'>
                    {module.status === "Completed" ? (
                      <motion.div whileHover={{ scale: 1.2 }} className='h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
                        <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
                      </motion.div>
                    ) : module.status === "In Progress" ? (
                      <motion.div whileHover={{ scale: 1.2 }} className='h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
                        <motion.div className='h-5 w-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full' animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.2 }} className='h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                        <Clock className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                      </motion.div>
                    )}
                  </div>

                  {/* Title and description */}
                  <div className='flex-grow'>
                    <div className='flex items-center flex-wrap gap-2'>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{module.title}</h3>
                      <div className='flex items-center space-x-2'>
                        {module.hasQuiz && <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'>Quiz</span>}
                        {module.hasAssignment && <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400'>Assignment</span>}
                      </div>
                    </div>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 md:line-clamp-2'>{module.description}</p>
                  </div>
                </div>

                <div className='flex items-center gap-6 self-end md:self-auto'>
                  {/* Time and category */}
                  <div className='flex flex-col items-end'>
                    <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                      <Clock className='mr-1 h-4 w-4' />
                      <span>{module.estimatedTime} min</span>
                    </div>
                    <span className='text-xs text-gray-400 dark:text-gray-500 mt-1'>{module.category}</span>
                  </div>

                  {/* Status badge and expand/collapse button */}
                  <div className='flex items-center gap-3'>
                    <div className={`hidden md:flex px-3 py-1 rounded-full text-xs font-medium ${module.status === "Completed" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" : module.status === "In Progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}`}>{module.status === "In Progress" ? `${module.progress}%` : module.status}</div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className='h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                      {expandedModule === module.id ? <ChevronUp className='h-5 w-5 text-gray-600 dark:text-gray-300' /> : <ChevronDown className='h-5 w-5 text-gray-600 dark:text-gray-300' />}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Progress indicator for "In Progress" modules */}
              {module.status === "In Progress" && (
                <div className='h-1 w-full bg-gray-100 dark:bg-gray-700'>
                  <motion.div className='h-full bg-gradient-to-r from-blue-500 to-indigo-500' variants={progressVariants} initial='initial' animate='animate' custom={module.progress} />
                </div>
              )}

              {/* Expanded content */}
              <motion.div initial={false} animate={{ height: expandedModule === module.id ? "auto" : 0, opacity: expandedModule === module.id ? 1 : 0 }} className='overflow-hidden border-t border-gray-100 dark:border-gray-700'>
                <div className='p-5 bg-blue-50/30 dark:bg-blue-900/10'>
                  {/* Module content preview */}
                  <div className='mb-5'>
                    <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>Module Contents</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {module.contents?.map((item, index) => (
                        <motion.div key={index} whileHover={{ x: 5 }} className='flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm'>
                          {getContentTypeIcon(item.type)}
                          <div className='ml-3 flex-grow'>
                            <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>{item.title}</p>
                            <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1'>
                              <Clock className='h-3 w-3 mr-1' />
                              <span>{item.duration} min</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className='flex flex-wrap justify-end gap-3 pt-3 border-t border-gray-200 dark:border-gray-700'>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                      View Details
                    </motion.button>

                    {module.status !== "Completed" && (
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className='px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg text-sm font-medium text-white shadow-sm shadow-blue-600/20'>
                        {module.status === "In Progress" ? "Continue Learning" : "Start Module"}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          // Empty state when no modules match the filter criteria
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-10 flex flex-col items-center justify-center text-center p-10 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700'>
            <motion.div className='mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-6' whileHover={{ rotate: 10 }}>
              <Search className='h-8 w-8 text-blue-600 dark:text-blue-400' />
            </motion.div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>No modules found</h3>
            <p className='mt-2 text-gray-500 dark:text-gray-400 max-w-md'>We couldn't find any modules matching your current filters. Try adjusting your search criteria or filter options.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium'
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("All");
                setFilterStatus("All");
              }}
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Pagination control */}
      {sortedModules.length > 0 && (
        <motion.div className='mt-8 flex justify-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className='flex items-center space-x-2'>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'>
              Previous
            </motion.button>

            {[1, 2, 3].map((page) => (
              <motion.button key={page} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`w-8 h-8 flex items-center justify-center rounded-md ${page === 1 ? "bg-blue-600 text-white" : "border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"}`}>
                {page}
              </motion.button>
            ))}

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'>
              Next
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CourseModulesView;
