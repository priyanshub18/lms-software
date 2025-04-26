"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, ChevronLeft, ChevronRight, Upload, PlusCircle, Edit3, Trash2, BookOpen, Film, Code, Link, FileText, HelpCircle, CheckCircle, Moon, Sun, X, ChevronDown, MessageSquare, FileQuestion } from "lucide-react";
import Page from "../page";
import DashboardLayout from "@/components/dashboard-layout";

export function CourseModuleCreator() {
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState([""]);
  const [progress, setProgress] = useState(30);
  const [activeSection, setActiveSection] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const [activeTool, setActiveTool] = useState("text");
  const [content, setContent] = useState("");
  const [resources, setResources] = useState([{ name: "Module_Reading.pdf", type: "pdf" }]);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentInstructions, setAssignmentInstructions] = useState("");
  const [allowUploads, setAllowUploads] = useState(true);
  const [enableDiscussion, setEnableDiscussion] = useState(true);
  const [enableModeration, setEnableModeration] = useState(false);
  const [enableNotes, setEnableNotes] = useState(true);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate progress based on filled fields
  useEffect(() => {
    let totalFields = 5; // Basic sections to fill
    let filledFields = 0;

    if (title.trim()) filledFields++;
    if (description.trim()) filledFields++;
    if (objectives.some((obj) => obj.trim())) filledFields++;
    if (content.trim()) filledFields++;
    if (assignmentTitle.trim() || assignmentInstructions.trim()) filledFields++;

    const newProgress = Math.min(Math.round((filledFields / totalFields) * 100), 100);
    setProgress(newProgress);
  }, [title, description, objectives, content, assignmentTitle, assignmentInstructions]);

  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const updateObjective = (index: any, value: any) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const removeObjective = (index: any) => {
    const newObjectives = [...objectives].filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  const addResource = () => {
    // In a real app, you would handle file uploads here
    setResources([...resources, { name: "New_Resource.pdf", type: "pdf" }]);
  };

  const removeResource = (index: any) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  const scrollToSection = (section: any) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(section);
    setShowMenu(false);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300'>
      {/* Floating navigation bar */}
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg px-2 py-1'>
        <div className='flex items-center space-x-1'>
          <button onClick={() => setShowMenu(!showMenu)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'>
            {showMenu ? <X size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className='absolute top-12 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 overflow-hidden'>
                <div className='p-2 space-y-1'>
                  <button onClick={() => scrollToSection("title")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "title" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Title</span>
                  </button>
                  <button onClick={() => scrollToSection("objectives")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "objectives" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Objectives</span>
                  </button>
                  <button onClick={() => scrollToSection("content")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "content" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Content</span>
                  </button>
                  <button onClick={() => scrollToSection("resources")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "resources" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Resources</span>
                  </button>
                  <button onClick={() => scrollToSection("quiz")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "quiz" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Quiz</span>
                  </button>
                  <button onClick={() => scrollToSection("assignment")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "assignment" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Assignment</span>
                  </button>
                  <button onClick={() => scrollToSection("discussion")} className={`flex items-center w-full px-3 py-2 rounded-lg ${activeSection === "discussion" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span>Discussion</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='h-6 w-px bg-gray-300 dark:bg-gray-600'></div>

          <button onClick={() => setDarkMode(!darkMode)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' aria-label='Toggle dark mode'>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className='h-6 w-px bg-gray-300 dark:bg-gray-600'></div>

          <button className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'>
            <Save size={18} />
          </button>
        </div>
      </motion.div>

      <div className='max-w-5xl mx-auto p-4 md:p-8 pt-20'>
        <motion.header initial='hidden' animate='visible' variants={containerVariants} className='mb-8'>
          <motion.h1 variants={itemVariants} className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
            Create New Course Module
          </motion.h1>

          <motion.div variants={itemVariants} className='flex items-center'>
            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
              <motion.div initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className='bg-blue-500 dark:bg-blue-600 h-3 rounded-full'></motion.div>
            </div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='ml-4 text-sm font-medium text-gray-600 dark:text-gray-300'>
              {progress}% Complete
            </motion.span>
          </motion.div>
        </motion.header>

        <motion.main initial='hidden' animate='visible' variants={containerVariants} className='space-y-8'>
          {/* Module Title Section */}
          <motion.section id='title' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <motion.label variants={fadeIn} className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Module Title
            </motion.label>
            <motion.input whileFocus={{ scale: 1.01 }} type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter an engaging title for your module' className='w-full text-2xl md:text-3xl font-bold p-3 border-b-2 border-blue-200 dark:border-blue-900 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />

            <motion.div variants={fadeIn} className='mt-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Short Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Briefly describe what students will learn in this module' className='w-full h-24 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white'></textarea>
            </motion.div>
          </motion.section>

          {/* Learning Objectives Section */}
          <motion.section id='objectives' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Learning Objectives</h2>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addObjective} className='flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
                <PlusCircle size={18} className='mr-1' />
                <span>Add Objective</span>
              </motion.button>
            </div>

            <div className='space-y-3 mt-4'>
              <AnimatePresence>
                {objectives.map((objective, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className='flex items-center gap-2'>
                    <div className='flex-shrink-0 text-blue-600 dark:text-blue-400'>•</div>
                    <input type='text' value={objective} onChange={(e) => updateObjective(index, e.target.value)} placeholder='Enter a learning objective' className='flex-grow p-2 border-b border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
                    <motion.button whileHover={{ scale: 1.1, color: "#ef4444" }} whileTap={{ scale: 0.9 }} onClick={() => removeObjective(index)} className='text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'>
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Content Editor Section */}
          <motion.section id='content' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4'>Lesson Content</h2>

            <div className='border rounded-lg overflow-hidden dark:border-gray-600'>
              <div className='bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 p-2 flex gap-2'>
                {["text", "reading", "video", "code", "link"].map((tool, index) => {
                  const icons = {
                    text: <Edit3 size={16} />,
                    reading: <BookOpen size={16} />,
                    video: <Film size={16} />,
                    code: <Code size={16} />,
                    link: <Link size={16} />,
                  };

                  return (
                    <motion.button key={tool} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveTool(tool)} className={`p-2 rounded ${activeTool === tool ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"}`}>
                      {icons[tool]}
                    </motion.button>
                  );
                })}
              </div>

              <div className='p-4 min-h-64 bg-white dark:bg-gray-800'>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full h-64 p-3 focus:outline-none bg-transparent dark:text-white resize-none' placeholder='Start creating your rich lesson content here. You can format text, add images, embed videos, and include code snippets.'></textarea>
              </div>
            </div>
          </motion.section>

          {/* Resource Upload Section */}
          <motion.section id='resources' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4'>Resources</h2>

            <motion.div whileHover={{ scale: 1.01 }} className='border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-8 text-center'>
              <motion.div initial={{ y: 0 }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}>
                <Upload size={36} className='mx-auto text-gray-400 dark:text-gray-500 mb-2' />
              </motion.div>
              <p className='text-gray-600 dark:text-gray-300 mb-2'>Drag and drop files or click to upload</p>
              <p className='text-gray-400 dark:text-gray-500 text-sm mb-4'>PDFs, documents, or external links</p>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addResource} className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors'>
                Upload Files
              </motion.button>
            </motion.div>

            <div className='mt-4 space-y-2'>
              <AnimatePresence>
                {resources.map((resource, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                    <div className='flex items-center'>
                      <FileText size={18} className='text-blue-500 dark:text-blue-400 mr-2' />
                      <span className='dark:text-white'>{resource.name}</span>
                    </div>
                    <motion.button whileHover={{ scale: 1.1, color: "#ef4444" }} whileTap={{ scale: 0.9 }} onClick={() => removeResource(index)} className='text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'>
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Mini Quiz Section */}
          <motion.section id='quiz' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Mini Quiz</h2>
              <FileQuestion size={20} className='text-blue-500 dark:text-blue-400' />
            </div>

            <div className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4'>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>Add quick comprehension questions to test understanding</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
                <PlusCircle size={18} className='mr-1' />
                <span>Add Question</span>
              </motion.button>
            </div>
          </motion.section>

          {/* Assignment Upload Section */}
          <motion.section id='assignment' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Assignment</h2>
              <FileText size={20} className='text-blue-500 dark:text-blue-400' />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Assignment Title</label>
              <input type='text' value={assignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} placeholder='Enter assignment title' className='w-full p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Instructions</label>
              <textarea value={assignmentInstructions} onChange={(e) => setAssignmentInstructions(e.target.value)} placeholder='Enter detailed instructions for the assignment' className='w-full h-24 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white'></textarea>
            </div>

            <div className='flex items-center'>
              <motion.div whileTap={{ scale: 0.9 }} className='relative'>
                <input type='checkbox' id='allowUploads' checked={allowUploads} onChange={() => setAllowUploads(!allowUploads)} className='sr-only' />
                <div className={`w-10 h-5 rounded-full ${allowUploads ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <motion.div initial={false} animate={{ x: allowUploads ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
                </div>
              </motion.div>
              <label htmlFor='allowUploads' className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                Allow file submissions
              </label>
            </div>
          </motion.section>

          {/* Discussion Forum Panel */}
          <motion.section id='discussion' variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Discussion Forum</h2>
                <MessageSquare size={18} className='ml-2 text-blue-500 dark:text-blue-400' />
              </div>
              <motion.div whileTap={{ scale: 0.9 }} className='relative'>
                <input type='checkbox' id='enableDiscussion' checked={enableDiscussion} onChange={() => setEnableDiscussion(!enableDiscussion)} className='sr-only' />
                <div className={`w-10 h-5 rounded-full ${enableDiscussion ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <motion.div initial={false} animate={{ x: enableDiscussion ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
                </div>
              </motion.div>
            </div>

            <motion.div animate={{ opacity: enableDiscussion ? 1 : 0.5 }} className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='flex items-start mb-4'>
                <HelpCircle size={20} className='text-blue-500 dark:text-blue-400 mr-2 mt-1 flex-shrink-0' />
                <div>
                  <p className='font-medium dark:text-white'>Students can ask questions and discuss the content</p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>You'll be notified when new discussions are posted</p>
                </div>
              </div>

              <div className='flex items-center'>
                <motion.div whileTap={{ scale: 0.9 }} className='relative'>
                  <input type='checkbox' id='moderation' checked={enableModeration} onChange={() => setEnableModeration(!enableModeration)} disabled={!enableDiscussion} className='sr-only' />
                  <div className={`w-10 h-5 rounded-full ${enableModeration ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                    <motion.div initial={false} animate={{ x: enableModeration ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
                  </div>
                </motion.div>
                <label htmlFor='moderation' className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                  Enable comment moderation
                </label>
              </div>
            </motion.div>
          </motion.section>

          {/* Personal Notes Panel */}
          <motion.section variants={itemVariants} className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Personal Notes</h2>
              <motion.div whileTap={{ scale: 0.9 }} className='relative'>
                <input type='checkbox' id='enableNotes' checked={enableNotes} onChange={() => setEnableNotes(!enableNotes)} className='sr-only' />
                <div className={`w-10 h-5 rounded-full ${enableNotes ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                  <motion.div initial={false} animate={{ x: enableNotes ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
                </div>
              </motion.div>
            </div>

            <motion.div animate={{ opacity: enableNotes ? 1 : 0.5 }} className='p-6 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <div className='flex items-start mb-4'>
                <CheckCircle size={20} className='text-blue-500 dark:text-blue-400 mr-2 mt-1 flex-shrink-0' />
                <div>
                  <p className='font-medium dark:text-white'>Allow students to take personal notes</p>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>Notes remain private to each student</p>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </motion.main>

        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className='flex justify-between items-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700'>
          <button className='flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
            <ChevronLeft size={18} className='mr-1' />
            <span>Previous Step</span>
          </button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center'>
            <span>Save & Continue</span>
            <ChevronRight size={18} className='ml-1' />
          </motion.button>
        </motion.footer>
      </div>
    </div>
  );
}

export default function CourseModuleCreatorPage() {
  return (
    <DashboardLayout userRole='trainer'>
      <CourseModuleCreator />
    </DashboardLayout>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Save, ChevronLeft, ChevronRight, Upload, PlusCircle, Edit3, Trash2, BookOpen, Film, Code, Link, FileText, HelpCircle, CheckCircle, Moon, Sun, X, ChevronDown, MessageSquare, FileQuestion, ArrowLeft, Layout, Clock, Users, Zap, AlertTriangle, Menu, Settings, Check } from "lucide-react";
// import DashboardLayout from "@/components/dashboard-layout";

// export function CourseModuleCreator() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [objectives, setObjectives] = useState([""]);
//   const [progress, setProgress] = useState(30);
//   const [activeSection, setActiveSection] = useState("all");
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeTool, setActiveTool] = useState("text");
//   const [content, setContent] = useState("");
//   const [resources, setResources] = useState([{ name: "Module_Reading.pdf", type: "pdf", size: "2.4MB" }]);
//   const [assignmentTitle, setAssignmentTitle] = useState("");
//   const [assignmentInstructions, setAssignmentInstructions] = useState("");
//   const [allowUploads, setAllowUploads] = useState(true);
//   const [enableDiscussion, setEnableDiscussion] = useState(true);
//   const [enableModeration, setEnableModeration] = useState(false);
//   const [enableNotes, setEnableNotes] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [viewMode, setViewMode] = useState("edit"); // edit, preview, compact
//   const [hasChanges, setHasChanges] = useState(false);
//   const [showAIPanel, setShowAIPanel] = useState(false);
//   const [activeResourceTab, setActiveResourceTab] = useState("files");
//   const [showHelp, setShowHelp] = useState(false);

//   const menuRef = useRef(null);

//   // Toggle dark mode
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Outside click handler
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       // @ts-ignore
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setShowMenu(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Calculate progress based on filled fields
//   useEffect(() => {
//     let totalFields = 5; // Basic sections to fill
//     let filledFields = 0;

//     if (title.trim()) filledFields++;
//     if (description.trim()) filledFields++;
//     if (objectives.some((obj) => obj.trim())) filledFields++;
//     if (content.trim()) filledFields++;
//     if (assignmentTitle.trim() || assignmentInstructions.trim()) filledFields++;

//     const newProgress = Math.min(Math.round((filledFields / totalFields) * 100), 100);
//     setProgress(newProgress);
//     setHasChanges(true);
//   }, [title, description, objectives, content, assignmentTitle, assignmentInstructions]);

//   const addObjective = () => {
//     setObjectives([...objectives, ""]);
//   };

//   const updateObjective = (index: any, value: any) => {
//     const newObjectives = [...objectives];
//     newObjectives[index] = value;
//     setObjectives(newObjectives);
//   };

//   const removeObjective = (index: any) => {
//     const newObjectives = [...objectives].filter((_, i) => i !== index);
//     setObjectives(newObjectives);
//   };

//   const addResource = () => {
//     // In a real app, you would handle file uploads here
//     setResources([...resources, { name: `New_Resource_${resources.length + 1}.pdf`, type: "pdf", size: "1.2MB" }]);
//   };

//   const removeResource = (index: any) => {
//     const newResources = resources.filter((_, i) => i !== index);
//     setResources(newResources);
//   };

//   const scrollToSection = (section: any) => {
//     const element = document.getElementById(section);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//     setActiveSection(section);
//     setShowMenu(false);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   };

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } },
//   };

//   // Get icon for resource type
//   const getResourceIcon = (type: any) => {
//     switch (type) {
//       case "pdf":
//         return <FileText size={18} className='text-red-500' />;
//       case "doc":
//         return <FileText size={18} className='text-blue-500' />;
//       case "video":
//         return <Film size={18} className='text-purple-500' />;
//       case "link":
//         return <Link size={18} className='text-green-500' />;
//       default:
//         return <FileText size={18} className='text-gray-500' />;
//     }
//   };

//   // Sections data for sidebar
//   const sections = [
//     { id: "title", name: "Title & Description", icon: <Layout size={18} /> },
//     { id: "objectives", name: "Learning Objectives", icon: <Zap size={18} /> },
//     { id: "content", name: "Content Editor", icon: <Edit3 size={18} /> },
//     { id: "resources", name: "Resources", icon: <FileText size={18} /> },
//     { id: "quiz", name: "Assessment", icon: <FileQuestion size={18} /> },
//     { id: "assignment", name: "Assignment", icon: <Clock size={18} /> },
//     { id: "discussion", name: "Discussion", icon: <MessageSquare size={18} /> },
//   ];

//   // Mock notifications
//   const notifications = [
//     { id: 1, text: "Your previous module has been published", time: "2 hours ago" },
//     { id: 2, text: "New template available: Interactive Quiz", time: "1 day ago" },
//     { id: 3, text: "Remember to save your changes", time: "Just now", isWarning: true },
//   ];

//   return (
//     <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
//       {/* Top Navigation Bar */}
//       <div className='fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50'>
//         <div className='flex justify-between items-center p-4'>
//           <div className='flex items-center space-x-3'>
//             <button onClick={() => setShowSidebar(!showSidebar)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
//               <Menu size={20} className='text-gray-700 dark:text-gray-200' />
//             </button>
//             <div className='flex items-center'>
//               <ArrowLeft size={16} className='mr-2 text-blue-600 dark:text-blue-400' />
//               <span className='text-gray-500 dark:text-gray-400 text-sm'>Back to Courses</span>
//             </div>
//           </div>

//           <div className='flex-1 text-center'>
//             <h1 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>{title ? title : "New Course Module"}</h1>
//           </div>

//           <div className='flex items-center space-x-2'>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-2 py-1 rounded ${hasChanges ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
//               {hasChanges ? "Unsaved Changes" : "All Saved"}
//             </motion.div>

//             <div className='relative' ref={menuRef}>
//               <button onClick={() => setShowNotifications(!showNotifications)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 relative'>
//                 <Settings size={20} />
//                 {hasChanges && <span className='absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full'></span>}
//               </button>

//               <AnimatePresence>
//                 {showNotifications && (
//                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className='absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 z-50'>
//                     <div className='p-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-800 dark:text-gray-200'>Settings</div>
//                     <div className='p-3'>
//                       <div className='flex items-center justify-between mb-3'>
//                         <span className='text-sm text-gray-700 dark:text-gray-300'>Dark Mode</span>
//                         <motion.div whileTap={{ scale: 0.9 }} className='relative'>
//                           <input type='checkbox' checked={darkMode} onChange={() => setDarkMode(!darkMode)} className='sr-only' />
//                           <div className={`w-10 h-5 rounded-full ${darkMode ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
//                             <motion.div initial={false} animate={{ x: darkMode ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
//                           </div>
//                         </motion.div>
//                       </div>

//                       <div className='flex items-center justify-between mb-3'>
//                         <span className='text-sm text-gray-700 dark:text-gray-300'>View Mode</span>
//                         <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className='text-sm bg-gray-100 dark:bg-gray-700 border-none rounded p-1 text-gray-800 dark:text-gray-200'>
//                           <option value='edit'>Edit</option>
//                           <option value='preview'>Preview</option>
//                           <option value='compact'>Compact</option>
//                         </select>
//                       </div>

//                       <div className='flex items-center justify-between'>
//                         <span className='text-sm text-gray-700 dark:text-gray-300'>Show AI Assistant</span>
//                         <motion.div whileTap={{ scale: 0.9 }} className='relative'>
//                           <input type='checkbox' checked={showAIPanel} onChange={() => setShowAIPanel(!showAIPanel)} className='sr-only' />
//                           <div className={`w-10 h-5 rounded-full ${showAIPanel ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
//                             <motion.div initial={false} animate={{ x: showAIPanel ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
//                           </div>
//                         </motion.div>
//                       </div>
//                     </div>

//                     <div className='border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-700/50'>
//                       <button className='w-full text-center text-sm text-blue-600 dark:text-blue-400 py-1 hover:underline'>Help Center</button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center'>
//               <Save size={16} className='mr-2' />
//               Save
//             </motion.button>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className='h-1 w-full bg-gray-200 dark:bg-gray-700'>
//           <motion.div initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-full ${progress < 50 ? "bg-amber-500" : "bg-emerald-500"}`}></motion.div>
//         </div>
//       </div>

//       <div className='flex h-screen pt-16'>
//         {/* Left Sidebar */}
//         <AnimatePresence>
//           {showSidebar && (
//             <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }} className='fixed left-0 top-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden z-40'>
//               <div className='p-4'>
//                 <div className='flex justify-between items-center mb-6'>
//                   <h2 className='font-semibold text-gray-800 dark:text-gray-100'>Module Sections</h2>
//                   <div className='bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full'>{progress}% Complete</div>
//                 </div>

//                 <div className='space-y-1'>
//                   {sections.map((section) => (
//                     <motion.button key={section.id} whileHover={{ x: 5 }} onClick={() => scrollToSection(section.id)} className={`w-full flex items-center py-3 px-4 rounded-lg text-left ${activeSection === section.id ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"}`}>
//                       <span className='mr-3'>{section.icon}</span>
//                       <span>{section.name}</span>

//                       {activeSection === section.id && <div className='ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400'></div>}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>

//               <div className='absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-4'>
//                 <div className='mb-4'>
//                   <div className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Estimated Duration</div>
//                   <div className='flex items-center'>
//                     <Clock size={16} className='text-blue-600 dark:text-blue-400 mr-2' />
//                     <span className='text-gray-800 dark:text-gray-200'>30 minutes</span>
//                   </div>
//                 </div>

//                 <div>
//                   <div className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Target Audience</div>
//                   <div className='flex items-center'>
//                     <Users size={16} className='text-blue-600 dark:text-blue-400 mr-2' />
//                     <span className='text-gray-800 dark:text-gray-200'>Intermediate</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <main className={`flex-1 transition-all duration-300 ${showSidebar ? "pl-72" : ""} ${showAIPanel ? "pr-72" : ""} p-6`}>
//           <motion.div initial='hidden' animate='visible' variants={containerVariants} className='space-y-6 max-w-4xl mx-auto pb-24'>
//             {/* Module Title Section */}
//             <motion.section id='title' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <Layout size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Module Information</h2>
//                 </div>
//                 <div className='bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs'>Required</div>
//               </div>

//               <div className='p-6'>
//                 <div className='mb-6'>
//                   <motion.label variants={fadeIn} className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
//                     Module Title
//                   </motion.label>
//                   <motion.input whileFocus={{ scale: 1.01 }} type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter an engaging title for your module' className='w-full text-2xl md:text-3xl font-bold p-3 border-b-2 border-blue-200 dark:border-blue-900 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white rounded-lg' />
//                 </div>

//                 <motion.div variants={fadeIn}>
//                   <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Short Description</label>
//                   <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Briefly describe what students will learn in this module' className='w-full h-24 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white'></textarea>
//                 </motion.div>
//               </div>
//             </motion.section>

//             {/* Learning Objectives Section */}
//             <motion.section id='objectives' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <Zap size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Learning Objectives</h2>
//                 </div>
//                 <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addObjective} className='flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-1'>
//                   <PlusCircle size={16} className='mr-1' />
//                   <span>Add Objective</span>
//                 </motion.button>
//               </div>

//               <div className='p-6'>
//                 <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>Define what students will be able to do after completing this module</p>

//                 <div className='space-y-3'>
//                   <AnimatePresence>
//                     {objectives.map((objective, index) => (
//                       <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className='flex items-center gap-2 group'>
//                         <div className='flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium'>{index + 1}</div>
//                         <input type='text' value={objective} onChange={(e) => updateObjective(index, e.target.value)} placeholder='Enter a learning objective' className='flex-grow p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
//                         <motion.button whileHover={{ scale: 1.1, color: "#ef4444" }} whileTap={{ scale: 0.9 }} onClick={() => removeObjective(index)} className='opacity-0 group-hover:opacity-100 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-opacity'>
//                           <Trash2 size={16} />
//                         </motion.button>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Content Editor Section */}
//             <motion.section id='content' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <Edit3 size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Lesson Content</h2>
//                 </div>
//                 <div className='flex space-x-2'>
//                   <select className='bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm px-3 py-1'>
//                     <option>Normal Text</option>
//                     <option>Heading 1</option>
//                     <option>Heading 2</option>
//                     <option>Quote</option>
//                   </select>
//                 </div>
//               </div>

//               <div className='p-6'>
//                 <div className='bg-white dark:bg-gray-800 border rounded-lg overflow-hidden dark:border-gray-600'>
//                   <div className='bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 p-2 flex gap-2 flex-wrap'>
//                     {[
//                       { id: "text", icon: <Edit3 size={16} />, tooltip: "Text" },
//                       { id: "reading", icon: <BookOpen size={16} />, tooltip: "Reading" },
//                       { id: "video", icon: <Film size={16} />, tooltip: "Video" },
//                       { id: "code", icon: <Code size={16} />, tooltip: "Code" },
//                       { id: "link", icon: <Link size={16} />, tooltip: "Link" },
//                     ].map((tool) => (
//                       <motion.button key={tool.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveTool(tool.id)} className={`p-2 rounded relative group ${activeTool === tool.id ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"}`} aria-label={tool.tooltip}>
//                         {tool.icon}
//                         <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity'>{tool.tooltip}</div>
//                       </motion.button>
//                     ))}

//                     <div className='h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1'></div>

//                     {["B", "I", "U"].map((format) => (
//                       <button key={format} className='px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium'>
//                         {format}
//                       </button>
//                     ))}
//                   </div>

//                   <div className='p-4'>
//                     <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full h-64 p-3 focus:outline-none bg-transparent dark:text-white resize-none' placeholder='Start creating your lesson content here. You can format text, add images, embed videos, and include code snippets.'></textarea>
//                   </div>
//                 </div>

//                 <div className='mt-4 grid grid-cols-2 gap-4'>
//                   <div className='border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30'>
//                     <div className='flex items-center mb-2'>
//                       <Film size={16} className='text-violet-500 mr-2' />
//                       <h3 className='font-medium text-gray-800 dark:text-gray-200'>Video Embedding</h3>
//                     </div>
//                     <p className='text-sm text-gray-500 dark:text-gray-400'>Embed videos from YouTube, Vimeo or upload your own</p>
//                   </div>

//                   <div className='border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30'>
//                     <div className='flex items-center mb-2'>
//                       <Zap size={16} className='text-amber-500 mr-2' />
//                       <h3 className='font-medium text-gray-800 dark:text-gray-200'>Interactive Elements</h3>
//                     </div>
//                     <p className='text-sm text-gray-500 dark:text-gray-400'>Add polls, quizzes, and knowledge checks</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Resource Upload Section */}
//             <motion.section id='resources' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <FileText size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Resources</h2>
//                 </div>
//                 <div className='flex space-x-2'>
//                   <button onClick={() => setActiveResourceTab("files")} className={`px-3 py-1 rounded-lg text-sm ${activeResourceTab === "files" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}>
//                     Files
//                   </button>
//                   <button onClick={() => setActiveResourceTab("links")} className={`px-3 py-1 rounded-lg text-sm ${activeResourceTab === "links" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}>
//                     Links
//                   </button>
//                 </div>
//               </div>

//               <div className='p-6'>
//                 <motion.div whileHover={{ scale: 1.01 }} className='border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/80'>
//                   <motion.div initial={{ y: 0 }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }} className='w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4'>
//                     <Upload size={28} className='text-blue-500 dark:text-blue-400' />
//                   </motion.div>
//                   <h3 className='text-lg font-medium text-gray-800 dark:text-gray-100 mb-2'>Add Your Resources</h3>
//                   <p className='text-gray-600 dark:text-gray-300 mb-2'>Drag and drop files or click to upload</p>
//                   <p className='text-gray-400 dark:text-gray-500 text-sm mb-6'>PDFs, documents, images, or videos</p>

//                   <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addResource} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md'>
//                     Select Files
//                   </motion.button>
//                 </motion.div>

//                 <div className='mt-6'>
//                   <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>Uploaded Resources</h3>

//                   <div className='space-y-2'>
//                     <AnimatePresence>
//                       {resources.map((resource, index) => (
//                         <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 group hover:border-blue-200 dark:hover:border-blue-900 transition-colors'>
//                           <div className='flex items-center'>
//                             <div className='w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center mr-3'>{getResourceIcon(resource.type)}</div>
//                             <div>
//                               <span className='font-medium text-gray-800 dark:text-gray-200'>{resource.name}</span>
//                               <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1'>
//                                 <span className='mr-3'>{resource.size}</span>
//                                 <span>Added Today</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className='flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
//                             <button className='p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400'>
//                               <Edit3 size={16} />
//                             </button>
//                             <motion.button whileHover={{ scale: 1.1, color: "#ef4444" }} whileTap={{ scale: 0.9 }} onClick={() => removeResource(index)} className='p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'>
//                               <Trash2 size={16} />
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Mini Quiz Section */}
//             <motion.section id='quiz' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <FileQuestion size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Assessment</h2>
//                 </div>
//                 <div className='bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs'>Recommended</div>
//               </div>

//               <div className='p-6'>
//                 <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
//                   <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} className='flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 cursor-pointer'>
//                     <div className='w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3'>
//                       <FileQuestion size={24} className='text-indigo-600 dark:text-indigo-400' />
//                     </div>
//                     <h3 className='font-medium text-gray-800 dark:text-gray-100 mb-1'>Multiple Choice</h3>
//                     <p className='text-xs text-center text-gray-500 dark:text-gray-400'>Test knowledge with options</p>
//                   </motion.div>

//                   <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} className='flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 cursor-pointer'>
//                     <div className='w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3'>
//                       <Edit3 size={24} className='text-emerald-600 dark:text-emerald-400' />
//                     </div>
//                     <h3 className='font-medium text-gray-800 dark:text-gray-100 mb-1'>Short Answer</h3>
//                     <p className='text-xs text-center text-gray-500 dark:text-gray-400'>Encourage written responses</p>
//                   </motion.div>

//                   <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} className='flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30 cursor-pointer'>
//                     <div className='w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3'>
//                       <Check size={24} className='text-amber-600 dark:text-amber-400' />
//                     </div>
//                     <h3 className='font-medium text-gray-800 dark:text-gray-100 mb-1'>True/False</h3>
//                     <p className='text-xs text-center text-gray-500 dark:text-gray-400'>Quick assessment questions</p>
//                   </motion.div>
//                 </div>

//                 <div className='bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700'>
//                   <div className='flex justify-between items-center mb-4'>
//                     <h3 className='font-medium text-gray-800 dark:text-gray-100'>Question 1</h3>
//                     <div className='flex space-x-2'>
//                       <button className='text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'>
//                         <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
//                           <path d='M18 6 6 18' />
//                           <path d='m6 6 12 12' />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>

//                   <div className='mb-4'>
//                     <input type='text' placeholder='Enter your question' className='w-full p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
//                   </div>

//                   {["A", "B", "C", "D"].map((option, i) => (
//                     <div key={i} className='flex items-center mb-3'>
//                       <div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400 font-medium'>{option}</div>
//                       <input type='text' placeholder={`Option ${option}`} className='flex-grow p-2 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
//                       <div className='ml-3'>
//                         <input type='radio' name='correct' id={`option-${option}`} className='mr-2' />
//                         <label htmlFor={`option-${option}`} className='text-sm text-gray-600 dark:text-gray-300'>
//                           Correct
//                         </label>
//                       </div>
//                     </div>
//                   ))}

//                   <div className='mt-6 flex justify-end'>
//                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
//                       <PlusCircle size={18} className='mr-1' />
//                       <span>Add Question</span>
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Assignment Upload Section */}
//             <motion.section id='assignment' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <Clock size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Assignment</h2>
//                 </div>
//                 <div className='bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs'>Optional</div>
//               </div>

//               <div className='p-6'>
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                   <div>
//                     <div className='mb-4'>
//                       <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Assignment Title</label>
//                       <input type='text' value={assignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} placeholder='Enter a clear title' className='w-full p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none bg-transparent dark:text-white' />
//                     </div>

//                     <div className='mb-4'>
//                       <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Instructions</label>
//                       <textarea value={assignmentInstructions} onChange={(e) => setAssignmentInstructions(e.target.value)} placeholder='Provide detailed instructions' className='w-full h-32 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white'></textarea>
//                     </div>

//                     <div className='flex items-center mb-4'>
//                       <motion.div whileTap={{ scale: 0.9 }} className='relative'>
//                         <input type='checkbox' id='allowUploads' checked={allowUploads} onChange={() => setAllowUploads(!allowUploads)} className='sr-only' />
//                         <div className={`w-10 h-5 rounded-full ${allowUploads ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
//                           <motion.div initial={false} animate={{ x: allowUploads ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
//                         </div>
//                       </motion.div>
//                       <label htmlFor='allowUploads' className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
//                         Allow file submissions
//                       </label>
//                     </div>
//                   </div>

//                   <div className='bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30'>
//                     <h3 className='font-medium text-gray-800 dark:text-gray-100 mb-4 flex items-center'>
//                       <Settings size={16} className='text-purple-500 mr-2' />
//                       Assignment Settings
//                     </h3>

//                     <div className='space-y-4'>
//                       <div>
//                         <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Due Date</label>
//                         <input type='date' className='w-full p-2 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none bg-transparent dark:text-white' />
//                       </div>

//                       <div>
//                         <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Points</label>
//                         <input type='number' placeholder='100' className='w-full p-2 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none bg-transparent dark:text-white' />
//                       </div>

//                       <div className='flex items-center'>
//                         <input type='checkbox' id='allowLate' className='rounded border-gray-300 text-purple-600 mr-2' />
//                         <label htmlFor='allowLate' className='text-sm text-gray-700 dark:text-gray-300'>
//                           Accept late submissions
//                         </label>
//                       </div>

//                       <div className='flex items-center'>
//                         <input type='checkbox' id='groupAssignment' className='rounded border-gray-300 text-purple-600 mr-2' />
//                         <label htmlFor='groupAssignment' className='text-sm text-gray-700 dark:text-gray-300'>
//                           Group assignment
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Discussion Forum Panel */}
//             <motion.section id='discussion' variants={itemVariants} className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
//               <div className='border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center'>
//                 <div className='flex items-center'>
//                   <MessageSquare size={18} className='text-blue-600 dark:text-blue-400 mr-2' />
//                   <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Discussion Forum</h2>
//                 </div>
//                 <motion.div whileTap={{ scale: 0.9 }} className='relative'>
//                   <input type='checkbox' id='enableDiscussion' checked={enableDiscussion} onChange={() => setEnableDiscussion(!enableDiscussion)} className='sr-only' />
//                   <div className={`w-10 h-5 rounded-full ${enableDiscussion ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
//                     <motion.div initial={false} animate={{ x: enableDiscussion ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
//                   </div>
//                 </motion.div>
//               </div>

//               <motion.div animate={{ opacity: enableDiscussion ? 1 : 0.5 }} className='p-6'>
//                 <div className='bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30 mb-6'>
//                   <div className='flex items-start'>
//                     <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0'>
//                       <MessageSquare size={20} className='text-blue-600 dark:text-blue-400' />
//                     </div>
//                     <div>
//                       <h3 className='font-medium text-gray-800 dark:text-gray-100 mb-1'>Encourage Peer Interaction</h3>
//                       <p className='text-sm text-gray-600 dark:text-gray-300'>Create a structured discussion environment where students can ask questions, share insights, and collaborate on module content</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                   <div className='space-y-4'>
//                     <div className='flex items-center'>
//                       <motion.div whileTap={{ scale: 0.9 }} className='relative'>
//                         <input type='checkbox' id='moderation' checked={enableModeration} onChange={() => setEnableModeration(!enableModeration)} disabled={!enableDiscussion} className='sr-only' />
//                         <div className={`w-10 h-5 rounded-full ${enableModeration ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
//                           <motion.div initial={false} animate={{ x: enableModeration ? 20 : 0 }} className='w-5 h-5 rounded-full bg-white shadow transform' />
//                         </div>
//                       </motion.div>
//                       <label htmlFor='moderation' className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
//                         Enable comment moderation
//                       </label>
//                     </div>

//                     <div className='flex items-center'>
//                       <input type='checkbox' id='notification' className='rounded border-gray-300 text-blue-600 mr-2' />
//                       <label htmlFor='notification' className='text-sm text-gray-700 dark:text-gray-300'>
//                         Receive notifications for new comments
//                       </label>
//                     </div>

//                     <div className='flex items-center'>
//                       <input type='checkbox' id='threadedDiscussions' className='rounded border-gray-300 text-blue-600 mr-2' />
//                       <label htmlFor='threadedDiscussions' className='text-sm text-gray-700 dark:text-gray-300'>
//                         Enable threaded discussions
//                       </label>
//                     </div>
//                   </div>

//                   <div className='space-y-4'>
//                     <div>
//                       <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Discussion Prompt (Optional)</label>
//                       <textarea placeholder='Add a question or prompt to start the discussion' className='w-full h-20 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white'></textarea>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.section>
//           </motion.div>
//         </main>

//         {/* Right AI Assistant Panel */}
//         {/* <AnimatePresence>
//           {showAIPanel && (
//             <motion.aside
//               initial={{ width: 0, opacity: 0, right: 0 }}
//               animate={{ width: 320, opacity: 1 }}
//               exit={{ width: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed right-0 top-16 h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden z-40"
//             >
//               <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center">
//                   <Zap size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
//                   AI Assistant
//                 </h2>
//                 <button 
//                   onClick={() => setShowAIPanel(false)}
//                   className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>
              
//               <div className="p-4">
//                 <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 mb-4">
//                   <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Suggestions</h3>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-start">
//                       <Zap size={14} className="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
//                       <span className="text-gray-700 dark:text-gray-300">Add more interactive elements to increase engagement</span>
//                     </li>
//                     <li className="flex items-start">
//                       <Zap size={14} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
//                       <span className="text-gray-700 dark:text-gray-300">Your learning objectives could be more specific and measurable</span>
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div className="mb-4">
//                   <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Quick Actions</h3>
//                   <div className="grid grid-cols-2 gap-2">
//                     <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-2 text-sm text-gray-800 dark:text-gray-200 text-center">
//                       Generate Quiz
//                     </button>
//                     <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-2 text-sm text-gray-800 dark:text-gray-200 text-center">
//                       Improve Content
//                     </button>
//                     <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-2 text-sm text-gray-800 dark:text-gray-200 text-center">
//                       Add Resources
//                     </button>
//                     <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-2 text-sm text-gray-800 dark:text-gray-200 text-center">
//                       Fix Issues
//                     </button>
//                   </div>
//                 </div>
                
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="font-medium text-gray-800 dark:text-gray-100">Ask AI</h3>
//                     <span className="text-xs text-blue-600 dark:text-blue-400">Powered by Claude</span>
//                   </div>
//                   <textarea
//                     placeholder="Ask a question about your module..."
//                     className="w-full h-20 p-3 border rounded-lg border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none resize-none bg-transparent dark:text-white text-sm"
//                   ></textarea>
//                   <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center">
//                     <ChatAlt2 size={16} className="mr-2" />
//                     Ask Question
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence> */}
//       </div>
//     </div>
//   );
// }

// export default function CourseModuleCreatorPage() {
//   return (
//     <DashboardLayout userRole='trainer'>
//       <CourseModuleCreator />
//     </DashboardLayout>
//   );
// }
