"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp, Search, Menu, X, UserCircle, Bell, MessageSquare } from "lucide-react";

export default function FeedbackSystem() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Popular", "Recent", "My Courses"];

  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      reviews: 342,
      image: "/api/placeholder/400/320",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript to build responsive websites from scratch.",
      tags: ["Web Development", "Beginner"],
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      instructor: "Mark Williams",
      rating: 4.9,
      reviews: 216,
      image: "/api/placeholder/400/320",
      description: "Master React hooks, context API, and server-side rendering with Next.js for building modern web applications.",
      tags: ["React", "Next.js", "Advanced"],
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      instructor: "Prof. James Liu",
      rating: 4.7,
      reviews: 189,
      image: "/api/placeholder/400/320",
      description: "Introduction to statistics, Python, and data visualization to kickstart your data science journey.",
      tags: ["Data Science", "Python", "Beginner"],
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "Alicia Garcia",
      rating: 4.9,
      reviews: 273,
      image: "/api/placeholder/400/320",
      description: "Learn the principles of user-centered design and create beautiful, functional interfaces.",
      tags: ["Design", "UI/UX", "Intermediate"],
    },
    {
      id: 5,
      title: "Machine Learning Bootcamp",
      instructor: "Dr. Michael Brown",
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/400/320",
      description: "Comprehensive introduction to machine learning algorithms and practical applications.",
      tags: ["Machine Learning", "Python", "Advanced"],
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCourseExpand = (id) => {
    if (expandedCourse === id) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(id);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />);
  };

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

  const courseCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const expandVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className='min-h-screen bg-gray-50 overflow-hidden'>
      {/* Navigation */}
      <nav className='bg-white shadow-md sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center'>
                <motion.div className='h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <MessageSquare className='h-5 w-5 text-white' />
                </motion.div>
                <motion.span className='ml-2 text-xl font-bold text-gray-800' initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  FeedbackHub
                </motion.span>
              </div>
            </div>

            <div className='hidden md:flex items-center space-x-4'>
              <motion.div className='relative' initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} transition={{ duration: 0.5, delay: 0.2 }}>
                <input type='text' placeholder='Search courses...' className='w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              </motion.div>
              <motion.button className='px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Browse
              </motion.button>
              <motion.button className='px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Help
              </motion.button>
              <motion.button className='relative p-1 rounded-full text-gray-600 hover:bg-gray-100' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Bell className='h-6 w-6' />
                <motion.span
                  className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 10,
                  }}
                ></motion.span>
              </motion.button>
              <motion.div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <UserCircle className='h-6 w-6 text-indigo-600' />
              </motion.div>
            </div>

            <div className='flex md:hidden items-center'>
              <motion.button onClick={toggleMenu} className='p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none' whileTap={{ scale: 0.95 }}>
                {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div className='md:hidden bg-white pt-2 pb-4 px-4 space-y-3' initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className='relative'>
                <input type='text' placeholder='Search courses...' className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
              </div>
              <div className='space-y-1'>
                <motion.button className='w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileTap={{ backgroundColor: "#F3F4F6" }}>
                  Browse
                </motion.button>
                <motion.button className='w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileTap={{ backgroundColor: "#F3F4F6" }}>
                  Help
                </motion.button>
                <motion.button className='w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileTap={{ backgroundColor: "#F3F4F6" }}>
                  Notifications
                </motion.button>
                <motion.button className='w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100' whileTap={{ backgroundColor: "#F3F4F6" }}>
                  My Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Tabs */}
        <motion.div className='flex overflow-x-auto pb-3 mb-6 space-x-4 border-b border-gray-200' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {tabs.map((tab, index) => (
            <motion.button key={tab} className={`px-4 py-2 font-medium text-sm rounded-md whitespace-nowrap ${activeTab === tab ? "text-indigo-700 bg-indigo-50" : "text-gray-600 hover:text-gray-800"}`} onClick={() => setActiveTab(tab)} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Search Bar for Mobile (Fixed Position) */}
        <motion.div className='sticky top-16 z-10 mb-6 bg-gray-50 pt-2 pb-4 md:hidden' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className='relative'>
            <input type='text' placeholder='Search courses...' className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
          </div>
        </motion.div>

        {/* Course Cards */}
        <motion.div className='space-y-6' variants={containerVariants} initial='hidden' animate='visible'>
          {courses.map((course, index) => (
            <motion.div key={course.id} className='bg-white rounded-lg shadow-md overflow-hidden' variants={courseCardVariants} whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} transition={{ type: "spring", stiffness: 200 }}>
              <div className='p-6'>
                <div className='md:flex'>
                  <div className='md:flex-shrink-0'>
                    <motion.img className='h-48 w-full object-cover md:w-48 rounded-md' src={course.image} alt={course.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.05 }} />
                  </div>
                  <div className='mt-4 md:mt-0 md:ml-6 flex-1'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <motion.h2 className='text-xl font-bold text-gray-900' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}>
                          {course.title}
                        </motion.h2>
                        <motion.p className='mt-1 text-sm text-gray-600' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}>
                          By {course.instructor}
                        </motion.p>
                      </div>
                      <motion.button onClick={() => toggleCourseExpand(course.id)} className='p-2 rounded-full hover:bg-gray-100' whileHover={{ scale: 1.1, backgroundColor: "#F3F4F6" }} whileTap={{ scale: 0.95 }}>
                        {expandedCourse === course.id ? <ChevronUp className='h-5 w-5 text-gray-500' /> : <ChevronDown className='h-5 w-5 text-gray-500' />}
                      </motion.button>
                    </div>

                    <motion.div className='mt-2 flex items-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}>
                      <div className='flex items-center'>{renderStars(course.rating)}</div>
                      <span className='ml-2 text-sm text-gray-600'>
                        {course.rating} ({course.reviews} reviews)
                      </span>
                    </motion.div>

                    <motion.div className='mt-3 flex flex-wrap gap-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}>
                      {course.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                            delay: 0.4 + index * 0.05 + tagIndex * 0.1,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div className='mt-4 flex justify-between items-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}>
                      <div className='flex space-x-2'>
                        <motion.button className='px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 shadow-sm' whileHover={{ scale: 1.05, backgroundColor: "#4338CA" }} whileTap={{ scale: 0.95 }}>
                          Leave Feedback
                        </motion.button>
                        <motion.button className='px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50' whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }} whileTap={{ scale: 0.95 }}>
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedCourse === course.id && (
                    <motion.div className='mt-6 pt-6 border-t border-gray-200' variants={expandVariants} initial='hidden' animate='visible' exit='hidden'>
                      <motion.h3 className='text-lg font-medium text-gray-900' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        Course Description
                      </motion.h3>
                      <motion.p className='mt-2 text-gray-600' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        {course.description}
                      </motion.p>

                      <motion.div className='mt-6' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h3 className='text-lg font-medium text-gray-900'>Recent Feedback</h3>
                        <div className='mt-3 space-y-4'>
                          <motion.div className='bg-gray-50 p-4 rounded-lg' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center'>
                                <motion.div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center' whileHover={{ scale: 1.1 }}>
                                  <UserCircle className='h-6 w-6 text-indigo-600' />
                                </motion.div>
                                <div className='ml-3'>
                                  <p className='text-sm font-medium text-gray-900'>Alex Johnson</p>
                                  <div className='flex items-center mt-1'>
                                    <div className='flex'>
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className='text-sm text-gray-500'>2 days ago</span>
                            </div>
                            <p className='mt-2 text-sm text-gray-600'>Excellent course! The content was well-structured and the instructor explained complex topics clearly. Highly recommended!</p>
                          </motion.div>

                          <motion.div className='bg-gray-50 p-4 rounded-lg' initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center'>
                                <motion.div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center' whileHover={{ scale: 1.1 }}>
                                  <UserCircle className='h-6 w-6 text-indigo-600' />
                                </motion.div>
                                <div className='ml-3'>
                                  <p className='text-sm font-medium text-gray-900'>Maria Garcia</p>
                                  <div className='flex items-center mt-1'>
                                    <div className='flex'>
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className='text-sm text-gray-500'>1 week ago</span>
                            </div>
                            <p className='mt-2 text-sm text-gray-600'>Great course with good practical examples. I would have liked more in-depth projects, but overall it was very valuable.</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div className='flex items-center justify-between mt-10 border-t border-gray-200 pt-6' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <div className='flex items-center'>
            <p className='text-sm text-gray-700'>
              Showing <span className='font-medium'>1</span> to <span className='font-medium'>5</span> of <span className='font-medium'>24</span> courses
            </p>
          </div>
          <div className='flex space-x-2'>
            <motion.button className='px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50' whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }} whileTap={{ scale: 0.95 }}>
              Previous
            </motion.button>
            <motion.button className='px-3 py-1 border border-gray-300 rounded-md text-sm bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100' whileHover={{ scale: 1.05, backgroundColor: "#EEF2FF" }} whileTap={{ scale: 0.95 }}>
              1
            </motion.button>
            <motion.button className='px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50' whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }} whileTap={{ scale: 0.95 }}>
              2
            </motion.button>
            <motion.button className='px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50' whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }} whileTap={{ scale: 0.95 }}>
              3
            </motion.button>
            <motion.button className='px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50' whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }} whileTap={{ scale: 0.95 }}>
              Next
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
