"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, Clock, DollarSign, Edit, FileText, Flag, HelpCircle, Image as ImageIcon, Layers, Plus, Save, Sparkles, Trash2, X } from "lucide-react";
import { useState } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.1,
    },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function CreateCoursePage() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    learningOutcomes: [""],
    prerequisites: [""],
    targetAudience: "",
    price: "",
    salePrice: "",
    estimatedHours: "",
    modules: [{ title: "", description: "", lessons: [{ title: "", duration: "" }] }],
    image: "",
    imagePreview: "",
    status: "Draft",
  });

  // Current form step (1: Basic Info, 2: Course Content, 3: Pricing & Settings)
  const [currentStep, setCurrentStep] = useState(1);

  // Module currently being edited in detail
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);

  // Form validation state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file) as string,
      });
    }
  };

  // Add new learning outcome field
  const addLearningOutcome = () => {
    setFormData({
      ...formData,
      learningOutcomes: [...formData.learningOutcomes, ""],
    });
  };

  // Update learning outcome
  const updateLearningOutcome = (index: any, value: any) => {
    const updatedOutcomes = [...formData.learningOutcomes];
    updatedOutcomes[index] = value;
    setFormData({ ...formData, learningOutcomes: updatedOutcomes });
  };

  // Remove learning outcome
  const removeLearningOutcome = (index: any) => {
    const updatedOutcomes = formData.learningOutcomes.filter((_, i) => i !== index);
    setFormData({ ...formData, learningOutcomes: updatedOutcomes });
  };

  // Add new prerequisite field
  const addPrerequisite = () => {
    setFormData({
      ...formData,
      prerequisites: [...formData.prerequisites, ""],
    });
  };

  // Update prerequisite
  const updatePrerequisite = (index: any, value: any) => {
    const updatedPrerequisites = [...formData.prerequisites];
    updatedPrerequisites[index] = value;
    setFormData({ ...formData, prerequisites: updatedPrerequisites });
  };

  // Remove prerequisite
  const removePrerequisite = (index: any) => {
    const updatedPrerequisites = formData.prerequisites.filter((_, i) => i !== index);
    setFormData({ ...formData, prerequisites: updatedPrerequisites });
  };

  // Add new module
  const addModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { title: "", description: "", lessons: [{ title: "", duration: "" }] }],
    });
  };

  // Update module
  const updateModule = (index: any, field: any, value: any) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setFormData({ ...formData, modules: updatedModules });
  };

  // Remove module
  const removeModule = (index: any) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  // Add new lesson to a module
  const addLesson = (moduleIndex: any) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons.push({ title: "", duration: "" });
    setFormData({ ...formData, modules: updatedModules });
  };

  // Update lesson
  const updateLesson = (moduleIndex: any, lessonIndex: any, field: any, value: any) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      [field]: value,
    };
    setFormData({ ...formData, modules: updatedModules });
  };

  // Remove lesson
  const removeLesson = (moduleIndex: any, lessonIndex: any) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    setFormData({ ...formData, modules: updatedModules });
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Validation logic would go here
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  // Go to previous step
  const goToPrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Set current module being edited
  const editModule = (index: any) => {
    setCurrentModuleIndex(index);
  };

  // Close module editor
  const closeModuleEditor = () => {
    setCurrentModuleIndex(null);
  };

  // Calculate total course duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    formData.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        const duration = parseInt(lesson.duration) || 0;
        totalMinutes += duration;
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // Content for each step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6'>
            {/* Course Title and Subtitle */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Course Title <span className='text-red-500'>*</span>
              </label>
              <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder="e.g. 'Advanced JavaScript Concepts'" className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' required />

              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Subtitle</label>
              <input type='text' name='subtitle' value={formData.subtitle} onChange={handleChange} placeholder="e.g. 'Master modern JavaScript patterns and practices'" className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' />
            </motion.div>

            {/* Course Description */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Description <span className='text-red-500'>*</span>
              </label>
              <textarea name='description' value={formData.description} onChange={handleChange} rows={5} placeholder='Provide a detailed description of your course...' className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' required />
            </motion.div>

            {/* Category and Difficulty */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Category <span className='text-red-500'>*</span>
                </label>
                <select name='category' value={formData.category} onChange={handleChange} className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' required>
                  <option value=''>Select Category</option>
                  <option value='web-development'>Web Development</option>
                  <option value='programming'>Programming</option>
                  <option value='data-science'>Data Science</option>
                  <option value='design'>Design</option>
                  <option value='business'>Business</option>
                  <option value='marketing'>Marketing</option>
                  <option value='personal-development'>Personal Development</option>
                </select>
              </div>

              <div className='space-y-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Difficulty Level <span className='text-red-500'>*</span>
                </label>
                <div className='flex space-x-4'>
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <label key={level} className='flex items-center'>
                      <input type='radio' name='difficulty' value={level} checked={formData.difficulty === level} onChange={handleChange} className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500' />
                      <span className={`text-sm ${formData.difficulty === level ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-gray-300 "}`}>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Course Image */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Course Image <span className='text-red-500'>*</span>
              </label>

              <div className='flex items-center justify-center w-full'>
                <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'>
                  {formData.imagePreview ? (
                    <div className='w-full h-full relative'>
                      <img src={formData.imagePreview} alt='Course Preview' className='w-full h-full object-cover rounded-lg' />
                      <button type='button' onClick={() => setFormData({ ...formData, image: "", imagePreview: "" })} className='absolute top-2 right-2 bg-gray-900/60 text-white p-1 rounded-full hover:bg-red-600/80'>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <ImageIcon className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span> or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (Recommended: 1280×720px)</p>
                    </div>
                  )}
                  <input type='file' className='hidden bg-white' accept='image/*' onChange={handleImageUpload} />
                </label>
              </div>
            </motion.div>

            {/* Target Audience */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Target Audience <span className='text-red-500'>*</span>
              </label>
              <textarea name='targetAudience' value={formData.targetAudience} onChange={handleChange} rows={3} placeholder='Who is this course for? Describe your target audience...' className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' required />
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <div className='flex justify-between items-center'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Learning Outcomes <span className='text-red-500'>*</span>
                </label>
                <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={addLearningOutcome} className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center'>
                  <Plus size={16} className='mr-1' /> Add Outcome
                </motion.button>
              </div>

              <div className='space-y-3'>
                {formData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className='flex items-center'>
                    <div className='flex-shrink-0 text-gray-400 dark:text-gray-500 mr-2'>
                      <CheckCircle size={18} />
                    </div>
                    <input type='text' value={outcome} onChange={(e) => updateLearningOutcome(index, e.target.value)} placeholder='e.g. Understand JavaScript promises and async/await' className='flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' />
                    {formData.learningOutcomes.length > 1 && (
                      <button type='button' onClick={() => removeLearningOutcome(index)} className='flex-shrink-0 ml-2 text-gray-400 hover:text-red-500'>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <div className='flex justify-between items-center'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Prerequisites</label>
                <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={addPrerequisite} className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center'>
                  <Plus size={16} className='mr-1' /> Add Prerequisite
                </motion.button>
              </div>

              <div className='space-y-3'>
                {formData.prerequisites.map((prerequisite, index) => (
                  <div key={index} className='flex items-center'>
                    <div className='flex-shrink-0 text-gray-400 dark:text-gray-500 mr-2'>
                      <Flag size={18} />
                    </div>
                    <input type='text' value={prerequisite} onChange={(e) => updatePrerequisite(index, e.target.value)} placeholder='e.g. Basic knowledge of JavaScript' className='flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' />
                    {formData.prerequisites.length > 1 && (
                      <button type='button' onClick={() => removePrerequisite(index)} className='flex-shrink-0 ml-2 text-gray-400 hover:text-red-500'>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6'>
            {/* Module Builder */}
            <motion.div variants={itemVariants} className='space-y-6'>
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Course Modules</h3>
                <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={addModule} className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center'>
                  <Plus size={16} className='mr-1' /> Add Module
                </motion.button>
              </div>

              {/* Module counter and total duration */}
              <div className='flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg'>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                  <Layers className='mr-2 h-4 w-4' />
                  <span>
                    {formData.modules.length} Module{formData.modules.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                  <Clock className='mr-2 h-4 w-4' />
                  <span>Total Duration: {calculateTotalDuration()}</span>
                </div>
              </div>

              {/* Modules List */}
              <div className='space-y-4'>
                {formData.modules.map((module, index) => (
                  <motion.div key={index} variants={itemVariants} className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
                    <div className='p-4 bg-white dark:bg-gray-800 flex justify-between items-center'>
                      <div className='flex items-center space-x-3'>
                        <span className='flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium'>{index + 1}</span>
                        <h4 className='font-medium text-gray-900 dark:text-gray-100'>{module.title || `Module ${index + 1}`}</h4>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={() => editModule(index)} className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'>
                          <Edit size={16} />
                        </motion.button>
                        {formData.modules.length > 1 && (
                          <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={() => removeModule(index)} className='text-gray-400 hover:text-red-500'>
                            <Trash2 size={16} />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Module Summary */}
                    <div className='p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4'>
                        <div className='flex items-center'>
                          <FileText className='mr-1 h-3 w-3' />
                          <span>
                            {module.lessons.length} Lesson{module.lessons.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <Clock className='mr-1 h-3 w-3' />
                          <span>{module.lessons.reduce((total, lesson) => total + (parseInt(lesson.duration) || 0), 0)} min</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Module Editor Modal */}
            {currentModuleIndex !== null && (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className='bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto'>
                  <div className='p-6 space-y-6'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100'>Edit Module {currentModuleIndex + 1}</h3>
                      <button type='button' onClick={closeModuleEditor} className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'>
                        <X size={20} />
                      </button>
                    </div>

                    <div className='space-y-6'>
                      {/* Module Title */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                          Module Title <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' value={formData.modules[currentModuleIndex].title} onChange={(e) => updateModule(currentModuleIndex, "title", e.target.value)} placeholder="e.g. 'Introduction to JavaScript'" className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 bg-white dark:text-white' required />
                      </div>

                      {/* Module Description */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Module Description</label>
                        <textarea value={formData.modules[currentModuleIndex].description} onChange={(e) => updateModule(currentModuleIndex, "description", e.target.value)} rows={3} placeholder='Describe what students will learn in this module...' className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white ' />
                      </div>

                      {/* Lessons */}
                      <div className='space-y-4'>
                        <div className='flex justify-between items-center'>
                          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                            Lessons <span className='text-red-500'>*</span>
                          </label>
                          <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' type='button' onClick={() => addLesson(currentModuleIndex)} className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center'>
                            <Plus size={16} className='mr-1' /> Add Lesson
                          </motion.button>
                        </div>

                        <div className='space-y-4 max-h-64 overflow-y-auto pr-2'>
                          {formData.modules[currentModuleIndex].lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className='grid grid-cols-8 gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700'>
                              <div className='col-span-1 flex items-center justify-center'>
                                <span className='flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium'>{lessonIndex + 1}</span>
                              </div>
                              <div className='col-span-5'>
                                <input type='text' value={lesson.title} onChange={(e) => updateLesson(currentModuleIndex, lessonIndex, "title", e.target.value)} placeholder='Lesson title' className='w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm bg-white' required />
                              </div>
                              <div className='col-span-1'>
                                <input type='number' value={lesson.duration} onChange={(e) => updateLesson(currentModuleIndex, lessonIndex, "duration", e.target.value)} placeholder='Min' min='1' className='w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm' />
                              </div>
                              <div className='col-span-1 flex items-center justify-center'>
                                {formData.modules[currentModuleIndex].lessons.length > 1 && (
                                  <button type='button' onClick={() => removeLesson(currentModuleIndex, lessonIndex)} className='text-gray-400 hover:text-red-500'>
                                    <X size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
                      <Button type='button' onClick={closeModuleEditor} variant='outline' className='px-4 py-2'>
                        Cancel
                      </Button>
                      <Button type='button' onClick={closeModuleEditor} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white'>
                        Save Module
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-6'>
            {/* Pricing */}
            <motion.div variants={itemVariants} className='space-y-6'>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>Pricing and Settings</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Regular Price <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <DollarSign className='w-5 h-5 text-gray-400' />
                    </div>
                    <input type='number' name='price' value={formData.price} onChange={handleChange} placeholder='49.99' className='pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' min='0' step='0.01' required />
                  </div>
                </div>

                <div className='space-y-4'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Sale Price (Optional)</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <DollarSign className='w-5 h-5 text-gray-400' />
                    </div>
                    <input type='number' name='salePrice' value={formData.salePrice} onChange={handleChange} placeholder='39.99' className='pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' min='0' step='0.01' />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Status */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Course Status</label>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {["Draft", "Published", "Coming Soon"].map((status) => (
                  <motion.div
                    key={status}
                    whileHover={{ scale: 1.02 }}
                    className={`border ${formData.status === status ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"} 
                      rounded-lg p-4 cursor-pointer transition-colors`}
                    onClick={() => setFormData({ ...formData, status })}
                  >
                    <div className='flex items-center'>
                      <input type='radio' name='status' value={status} checked={formData.status === status} onChange={() => setFormData({ ...formData, status })} className='h-4 w-4 text-blue-600 focus:ring-blue-500' />
                      <label className={`ml-2 block text-sm font-medium ${formData.status === status ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"} `}>{status}</label>
                    </div>
                    <p className='mt-1 text-xs text-gray-500 dark:text-gray-400 ml-6'>
                      {status === "Draft" && "Save as a draft to work on later."}
                      {status === "Published" && "Make your course available to students."}
                      {status === "Coming Soon" && "Show a preview but disable enrollment."}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Estimated Hours */}
            <motion.div variants={itemVariants} className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Estimated Total Hours <span className='text-gray-400 text-xs'>(automatically calculated: {calculateTotalDuration()})</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Clock className='w-5 h-5 text-gray-400' />
                </div>
                <input type='number' name='estimatedHours' value={formData.estimatedHours} onChange={handleChange} placeholder='24' className='pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white' min='0' step='0.5' />
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Optionally override the auto-calculated course duration with your estimate.</p>
            </motion.div>

            {/* Final Preview */}
            <motion.div variants={itemVariants} className='mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30'>
              <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center'>
                <Sparkles className='w-5 h-5 text-blue-500 mr-2' />
                Course Summary
              </h3>

              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Title</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>{formData.title || "Not set"}</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Category</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>{formData.category || "Not set"}</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Difficulty</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>{formData.difficulty}</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Price</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>
                      {formData.price ? `$${formData.price}` : "Not set"}
                      {formData.salePrice && <span className='ml-2 text-green-600 dark:text-green-400'>Sale: ${formData.salePrice}</span>}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Status</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>{formData.status}</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Duration</p>
                    <p className='text-base text-gray-900 dark:text-gray-100'>{formData.estimatedHours ? `${formData.estimatedHours} hours` : calculateTotalDuration()}</p>
                  </div>
                </div>

                <div>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Content</p>
                  <p className='text-base text-gray-900 dark:text-gray-100'>
                    {formData.modules.length} module{formData.modules.length !== 1 ? "s" : ""}, {formData.modules.reduce((total, module) => total + module.lessons.length, 0)} lesson{formData.modules.reduce((total, module) => total + module.lessons.length, 0) !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Progress indicator
  const renderProgressSteps = () => {
    return (
      <div className='mb-8'>
        <ol className='flex items-center w-full'>
          {[
            { step: 1, title: "Basic Information" },
            { step: 2, title: "Course Content" },
            { step: 3, title: "Settings" },
          ].map(({ step, title }) => (
            <li key={step} className={`flex items-center ${step !== 3 ? "w-full" : ""}`}>
              <button type='button' onClick={() => setCurrentStep(step)} className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"} transition-colors duration-200`}>
                {step}
              </button>

              <div className={`flex w-full items-center ${step !== 3 ? "" : "hidden"}`}>
                <span className='mx-2 text-sm font-medium text-gray-900 dark:text-gray-100'>{title}</span>
                <div className={`flex-1 h-0.5 ${currentStep > step ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}></div>
              </div>

              {step === 3 && <span className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-100'>{title}</span>}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  // Submit button text based on current step
  const getSubmitButtonText = () => {
    if (currentStep === 3) return "Create Course";
    return "Continue";
  };

  // Create course content
  const createCourseContent = (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='max-w-5xl mx-auto px-4 sm:px-6 pb-16'>
      {/* Header */}
      <motion.div className='mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4' variants={headerVariants} initial='hidden' animate='visible'>
        <div>
          <div className='flex items-center'>
            <motion.button variants={buttonVariants} whileHover='hover' whileTap='tap' onClick={() => window.history.back()} className='mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'>
              <ChevronLeft size={20} />
            </motion.button>
            <motion.h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' whileHover={{ scale: 1.02 }}>
              Create New Course
            </motion.h2>
          </div>
          <motion.p className='text-gray-500 dark:text-gray-400 mt-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Create a comprehensive learning experience for your students
          </motion.p>
        </div>

        <motion.div className='flex items-center gap-4' variants={headerVariants}>
          <motion.div variants={buttonVariants} whileHover='hover' whileTap='tap'>
            <Button variant='outline' className='gap-2' onClick={() => console.log("Saved as draft")}>
              <Save className='h-4 w-4' />
              Save Draft
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover='hover' whileTap='tap'>
            <Button className='gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20' onClick={handleSubmit}>
              <CheckCircle className='h-4 w-4' />
              {getSubmitButtonText()}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Progress Steps */}
        {renderProgressSteps()}

        {/* Step Content */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700'>{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className='flex justify-between items-center pt-4'>
          <Button type='button' onClick={goToPrevStep} disabled={currentStep === 1} variant='outline' className={`px-6 py-2 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
            Previous
          </Button>

          <motion.div className='flex items-center gap-3' variants={itemVariants}>
            {currentStep < 3 ? (
              <Button type='button' onClick={goToNextStep} className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white'>
                Next Step
              </Button>
            ) : (
              <Button type='submit' className='px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20'>
                Create Course
              </Button>
            )}
          </motion.div>
        </div>
      </form>

      {/* Help Card */}
      <motion.div className='mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>
            <HelpCircle className='h-5 w-5 text-blue-500' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-blue-800 dark:text-blue-300'>Need Help?</h3>
            <div className='mt-2 text-sm text-blue-700 dark:text-blue-400 space-y-1'>
              <p>Creating an engaging course requires planning and quality content.</p>
              <ul className='list-disc pl-5 space-y-1 mt-1'>
                <li>Use clear module titles that indicate what students will learn</li>
                <li>Break content into digestible lessons (10-15 minutes each)</li>
                <li>Include practical exercises and downloadable resources</li>
              </ul>
              <p className='mt-1'>
                <a href='#' className='font-medium underline hover:text-blue-800 dark:hover:text-blue-200'>
                  View our course creation guide
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Wrap the course content in the DashboardLayout
  return <DashboardLayout userRole='trainer'>{createCourseContent}</DashboardLayout>;
}
