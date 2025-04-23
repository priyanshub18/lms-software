"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash, ChevronDown, ChevronUp, Clock, Layers, BookOpen, AlertCircle, Play, FileText, HelpCircle, Code, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard-layout";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

interface CourseData {
  title: string;
  description: string;
  category: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface Content {
  title: string;
  type: "video" | "document" | "quiz" | "code";
  duration: string;
}

interface Module {
  title: string;
  description: string;
  contents: Content[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "beginner",
  });

  const [modules, setModules] = useState([{ title: "", description: "", contents: [{ title: "", type: "video", duration: "" }] }]);

  const handleCourseChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof CourseData, value: string) => {
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [name]: value as string };
    setModules(newModules);
  };

  const handleContentChange = (moduleIndex: number, contentIndex: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newModules = [...modules];
    newModules[moduleIndex].contents[contentIndex] = {
      ...newModules[moduleIndex].contents[contentIndex],
      [name]: value,
    };
    setModules(newModules);
  };

  const handleContentTypeChange = (moduleIndex: number, contentIndex: number, value: Content["type"]) => {
    const newModules = [...modules];
    newModules[moduleIndex].contents[contentIndex] = {
      ...newModules[moduleIndex].contents[contentIndex],
      type: value,
    };
    setModules(newModules);
  };

  const addModule = () => {
    const newModule: Module = {
      title: "",
      description: "",
      contents: [{ title: "", type: "video", duration: "" }],
    };
    setModules([...modules, newModule]);
    // Expand the newly added module
    setTimeout(() => setExpandedModule(modules.length), 100);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const newModules = [...modules];
      newModules.splice(index, 1);
      setModules(newModules);

      // If the removed module was expanded, collapse it
      if (expandedModule === index) {
        setExpandedModule(null);
      } else if (expandedModule !== null && expandedModule > index) {
        // Adjust the expanded module index if necessary
        setExpandedModule(expandedModule - 1);
      }
    }
  };

  const addContent = (moduleIndex: number) => {
    const newModules = [...modules];
    newModules[moduleIndex].contents.push({ title: "", type: "video", duration: "" });
    setModules(newModules);
  };

  const removeContent = (moduleIndex: number, contentIndex: number) => {
    if (modules[moduleIndex].contents.length > 1) {
      const newModules = [...modules];
      newModules[moduleIndex].contents.splice(contentIndex, 1);
      setModules(newModules);
    }
  };

  const toggleModuleExpansion = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const validateForm = () => {
    const errors = [];

    if (!courseData.title.trim()) errors.push("Course title is required");
    if (!courseData.description.trim()) errors.push("Course description is required");
    if (!courseData.category) errors.push("Course category is required");

    modules.forEach((module, i) => {
      if (!module.title.trim()) errors.push(`Module ${i + 1} title is required`);

      module.contents.forEach((content, j) => {
        if (!content.title.trim()) errors.push(`Content title in Module ${i + 1}, item ${j + 1} is required`);
      });
    });

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <ul className='list-disc pl-4 mt-2'>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to the server
    toast({
      title: "Course Created",
      description: "Your course has been created successfully",
    });

    // Redirect to courses page
    router.push("/dashboard/trainer/courses");
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className='h-4 w-4 text-blue-600' />;
      case "document":
        return <FileText className='h-4 w-4 text-blue-600' />;
      case "quiz":
        return <HelpCircle className='h-4 w-4 text-blue-600' />;
      case "code":
        return <Code className='h-4 w-4 text-blue-600' />;
      default:
        return <File className='h-4 w-4 text-blue-600' />;
    }
  };

  return (
    <DashboardLayout userRole='trainer'>
      <motion.div className='max-w-5xl mx-auto space-y-8 pb-16' initial='hidden' animate='visible' variants={containerVariants}>
        <motion.div variants={itemVariants} className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100'>Create New Course</h1>
          <p className='text-base text-gray-600 dark:text-gray-400'>Design your course structure and content</p>
          <Separator className='mt-4' />
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className='space-y-6'>
            <motion.div variants={itemVariants}>
              <Card className='shadow-md border dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
                <CardHeader className='border-b border-gray-100 dark:border-gray-700'>
                  <div className='flex items-center gap-2'>
                    <BookOpen className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                    <CardTitle className='text-xl font-medium text-gray-900 dark:text-gray-100'>Course Information</CardTitle>
                  </div>
                  <CardDescription className='text-gray-500 dark:text-gray-400'>Provide the core details about your course</CardDescription>
                </CardHeader>
                <CardContent className='pt-6 space-y-6'>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='title' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Course Title <span className='text-red-500'>*</span>
                      </Label>
                      <Input id='title' name='title' placeholder='e.g., Data Structures & Algorithms' value={courseData.title} onChange={handleCourseChange} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow' required />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='category' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Category <span className='text-red-500'>*</span>
                      </Label>
                      <Select value={courseData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                        <SelectTrigger className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow'>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='programming'>Programming</SelectItem>
                          <SelectItem value='data-structures'>Data Structures</SelectItem>
                          <SelectItem value='algorithms'>Algorithms</SelectItem>
                          <SelectItem value='system-design'>System Design</SelectItem>
                          <SelectItem value='frontend'>Frontend Development</SelectItem>
                          <SelectItem value='backend'>Backend Development</SelectItem>
                          <SelectItem value='devops'>DevOps</SelectItem>
                          <SelectItem value='cloud'>Cloud Computing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='description' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Description <span className='text-red-500'>*</span>
                    </Label>
                    <Textarea id='description' name='description' placeholder='Provide a detailed description of your course' rows={4} value={courseData.description} onChange={handleCourseChange} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow resize-none' required />
                  </div>

                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='duration' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Estimated Duration (weeks)
                      </Label>
                      <div className='relative'>
                        <Input id='duration' name='duration' type='number' placeholder='e.g., 8' value={courseData.duration} onChange={handleCourseChange} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow pl-8' />
                        <Clock className='absolute left-2.5 top-2.5 h-4 w-4 text-blue-500' />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='level' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Difficulty Level
                      </Label>
                      <Select value={courseData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                        <SelectTrigger className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow'>
                          <SelectValue placeholder='Select level' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='beginner'>Beginner</SelectItem>
                          <SelectItem value='intermediate'>Intermediate</SelectItem>
                          <SelectItem value='advanced'>Advanced</SelectItem>
                          <SelectItem value='expert'>Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className='space-y-5'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Layers className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                  <h2 className='text-xl font-medium text-gray-900 dark:text-gray-100'>Course Modules</h2>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type='button' onClick={addModule} variant='outline' size='sm' className='border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Module
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add a new module to your course</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <AnimatePresence>
                {modules.map((module, moduleIndex) => (
                  <motion.div key={moduleIndex} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
                    <Card className='shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden dark:bg-gray-800'>
                      <CardHeader className={`flex flex-row items-center justify-between py-4 cursor-pointer ${expandedModule === moduleIndex ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"} border-b border-gray-100 dark:border-gray-700`} onClick={() => toggleModuleExpansion(moduleIndex)}>
                        <div className='flex items-center gap-3'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium text-sm'>{moduleIndex + 1}</div>
                          <div>
                            <CardTitle className='text-lg font-medium text-gray-900 dark:text-gray-100'>{module.title || `Module ${moduleIndex + 1}`}</CardTitle>
                            {module.title && (
                              <CardDescription className='text-xs mt-1 text-gray-500 dark:text-gray-400'>
                                {module.contents.length} content item{module.contents.length !== 1 ? "s" : ""}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          {modules.length > 1 && (
                            <Button
                              type='button'
                              onClick={(e) => {
                                e.stopPropagation();
                                removeModule(moduleIndex);
                              }}
                              variant='ghost'
                              size='sm'
                              className='h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'
                            >
                              <Trash className='h-4 w-4' />
                            </Button>
                          )}
                          <motion.div initial={false} animate={{ rotate: expandedModule === moduleIndex ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                          </motion.div>
                        </div>
                      </CardHeader>

                      <AnimatePresence>
                        {expandedModule === moduleIndex && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                            <CardContent className='pt-6 space-y-6'>
                              <div className='space-y-4'>
                                <div className='space-y-2'>
                                  <Label htmlFor={`module-${moduleIndex}-title`} className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Module Title <span className='text-red-500'>*</span>
                                  </Label>
                                  <Input id={`module-${moduleIndex}-title`} name='title' placeholder='e.g., Introduction to Algorithms' value={module.title} onChange={(e) => handleModuleChange(moduleIndex, e)} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow' required />
                                </div>
                                <div className='space-y-2'>
                                  <Label htmlFor={`module-${moduleIndex}-description`} className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Module Description
                                  </Label>
                                  <Textarea id={`module-${moduleIndex}-description`} name='description' placeholder='Describe what this module covers' rows={2} value={module.description} onChange={(e) => handleModuleChange(moduleIndex, e)} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow resize-none' />
                                </div>
                              </div>

                              <Separator className='my-4' />

                              <div className='space-y-5'>
                                <div className='flex items-center justify-between'>
                                  <div className='flex items-center gap-2'>
                                    <AlertCircle className='h-4 w-4 text-blue-500' />
                                    <Label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Module Content</Label>
                                  </div>
                                  <Button type='button' onClick={() => addContent(moduleIndex)} variant='outline' size='sm' className='border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'>
                                    <Plus className='mr-2 h-4 w-4' />
                                    Add Content
                                  </Button>
                                </div>

                                <div className='space-y-3'>
                                  <AnimatePresence>
                                    {module.contents.map((content, contentIndex) => (
                                      <motion.div key={contentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className='grid grid-cols-1 gap-4 rounded-md border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-700 shadow-sm sm:grid-cols-12'>
                                        <div className='space-y-2 sm:col-span-5'>
                                          <Label htmlFor={`content-${moduleIndex}-${contentIndex}-title`} className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                                            Title <span className='text-red-500'>*</span>
                                          </Label>
                                          <Input id={`content-${moduleIndex}-${contentIndex}-title`} name='title' placeholder='e.g., Introduction Video' value={content.title} onChange={(e) => handleContentChange(moduleIndex, contentIndex, e)} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow' required />
                                        </div>
                                        <div className='space-y-2 sm:col-span-4'>
                                          <Label htmlFor={`content-${moduleIndex}-${contentIndex}-type`} className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                                            Type
                                          </Label>
                                          <Select value={content.type} onValueChange={(value) => handleContentTypeChange(moduleIndex, contentIndex, value as Content["type"])}>
                                            <SelectTrigger id={`content-${moduleIndex}-${contentIndex}-type`} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow'>
                                              <SelectValue placeholder='Select type' />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value='video'>
                                                <div className='flex items-center gap-2'>
                                                  <Play className='h-3.5 w-3.5 text-blue-500' />
                                                  <span>Video</span>
                                                </div>
                                              </SelectItem>
                                              <SelectItem value='document'>
                                                <div className='flex items-center gap-2'>
                                                  <FileText className='h-3.5 w-3.5 text-blue-500' />
                                                  <span>Document</span>
                                                </div>
                                              </SelectItem>
                                              <SelectItem value='quiz'>
                                                <div className='flex items-center gap-2'>
                                                  <HelpCircle className='h-3.5 w-3.5 text-blue-500' />
                                                  <span>Quiz</span>
                                                </div>
                                              </SelectItem>
                                              <SelectItem value='code'>
                                                <div className='flex items-center gap-2'>
                                                  <Code className='h-3.5 w-3.5 text-blue-500' />
                                                  <span>Coding Exercise</span>
                                                </div>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className='sm:col-span-3 flex items-end space-y-2'>
                                          <div className='flex w-full items-end gap-2'>
                                            <div className='flex-1 space-y-2'>
                                              <Label htmlFor={`content-${moduleIndex}-${contentIndex}-duration`} className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                                                {content.type === "video" ? "Duration (min)" : "Est. Time (min)"}
                                              </Label>
                                              <Input id={`content-${moduleIndex}-${contentIndex}-duration`} name='duration' placeholder='e.g., 15' value={content.duration} onChange={(e) => handleContentChange(moduleIndex, contentIndex, e)} className='border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow' />
                                            </div>
                                            {module.contents.length > 1 && (
                                              <Button type='button' onClick={() => removeContent(moduleIndex, contentIndex)} variant='ghost' size='icon' className='h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 self-end'>
                                                <Trash className='h-4 w-4' />
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className='shadow-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800'>
                <CardFooter className='flex justify-between p-6'>
                  <Button type='button' variant='outline' onClick={() => router.back()} className='border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'>
                    Cancel
                  </Button>
                  <Button type='submit' className='bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700'>
                    Create Course
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
}
