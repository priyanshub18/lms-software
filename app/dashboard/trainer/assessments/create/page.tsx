"use client";
import React, { useState, DragEvent, useRef, createRef } from "react";
import { CheckCircle, Circle, CheckSquare, Square, Edit3, Code, PlusCircle, Save, ChevronDown, ChevronUp, Trash2, ExternalLink, Play, Moon, Sun, Settings, Move, Plus, Copy, Menu, AlertTriangle, HelpCircle, CircleDot, ThumbsUp, FormInput, Upload, FileUp, Layout, FolderPlus, Check, ArrowRight, ImageIcon, X } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
type QuestionType = "singleChoice" | "multipleChoice" | "trueFalse" | "fillBlank" | "coding" | "shortAnswer" | "essay" | "matching";

interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
  points: number;
  expanded: boolean;
  sectionId: number;
  imageUrl?: string;
}

interface SingleChoiceQuestion extends BaseQuestion {
  type: "singleChoice";
  options: string[];
  correctAnswer: number;
  optionImages?: (string | undefined)[];
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multipleChoice";
  options: string[];
  correctAnswers: number[];
  optionImages?: (string | undefined)[];
}

interface TrueFalseQuestion extends BaseQuestion {
  type: "trueFalse";
  isTrue: boolean;
}

interface FillBlankQuestion extends BaseQuestion {
  type: "fillBlank";
  answer: string;
  alternativeAnswers?: string[];
  caseSensitive?: boolean;
  explanation?: string;
  images?: string[];
}

interface CodingQuestion extends BaseQuestion {
  type: "coding";
  sampleInput: string;
  sampleOutput: string;
  language: string;
  boilerplateCode: string;
  testCases: TestCase[];
  images?: (string | undefined)[];
}

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface ShortAnswerQuestion extends BaseQuestion {
  type: "shortAnswer";
  acceptableAnswers: string[];
  caseSensitive: boolean;
}

interface EssayQuestion extends BaseQuestion {
  type: "essay";
  modelAnswer: string;
  minWordCount: number;
}

interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  pairs: { left: string; right: string }[];
}

interface Section {
  id: number;
  title: string;
  description: string;
  expanded: boolean;
}

type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TrueFalseQuestion | FillBlankQuestion | CodingQuestion | ShortAnswerQuestion | EssayQuestion | MatchingQuestion;

interface QuestionEditorProps {
  question: Question;
  updateQuestion: (data: Partial<Question>) => void;
  accentColor: string;
}

interface SingleChoiceEditorProps {
  question: SingleChoiceQuestion;
  updateQuestion: (data: Partial<SingleChoiceQuestion>) => void;
  accentColor: string;
}

// Add this interface for CodingEditor props
interface CodingEditorProps {
  question: CodingQuestion;
  updateQuestion: (data: Partial<CodingQuestion>) => void;
  accentColor: string;
}

const initialSections: Section[] = [
  {
    id: 1,
    title: "Basic Programming Concepts",
    description: "Fundamental questions about programming principles",
    expanded: true,
  },
  {
    id: 2,
    title: "Advanced Topics",
    description: "Challenging questions for experienced developers",
    expanded: false,
  },
];

const initialQuestions: Question[] = [
  {
    id: 1,
    type: "singleChoice",
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
    points: 2,
    expanded: true,
    sectionId: 1,
  },
  {
    id: 2,
    type: "multipleChoice",
    question: "Which of the following are functional programming languages?",
    options: ["Python", "Haskell", "Java", "Clojure"],
    correctAnswers: [1, 3],
    points: 3,
    expanded: false,
    sectionId: 1,
  },
  {
    id: 3,
    type: "trueFalse",
    question: "In JavaScript, '==' compares values without checking types.",
    isTrue: true,
    points: 1,
    expanded: false,
    sectionId: 2,
  },
];

export default function ImprovedAssessmentBuilder() {
  const { theme, setTheme } = useTheme();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>("singleChoice");
  const accentColor = "blue";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addNewQuestion = () => {
    const newQuestion = createNewQuestion(selectedQuestionType, activeSectionId);
    setQuestions([...questions, newQuestion]);
    setActiveQuestion(questions.length);
  };

  const addNewSection = () => {
    const newSectionId = sections.length > 0 ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
    const newSection = {
      id: newSectionId,
      title: `Section ${newSectionId}`,
      description: "New section description",
      expanded: true,
    };
    setSections([...sections, newSection]);
    setActiveSectionId(newSectionId);
  };

  const updateSection = (id: number, data: Partial<Section>) => {
    const newSections = sections.map((section) => (section.id === id ? { ...section, ...data } : section));
    setSections(newSections);
  };

  const removeSection = (id: number) => {
    // Don't allow removing if it's the last section
    if (sections.length <= 1) return;

    // Remove the section
    const newSections = sections.filter((section) => section.id !== id);
    setSections(newSections);

    // If removing active section, set a new active section
    if (activeSectionId === id) {
      setActiveSectionId(newSections[0].id);
    }

    // Reassign questions from this section to the first available section
    const targetSectionId = newSections[0].id;
    const newQuestions = questions.map((question) => (question.sectionId === id ? { ...question, sectionId: targetSectionId } : question));
    setQuestions(newQuestions);
  };

  const toggleSectionExpanded = (id: number) => {
    const newSections = sections.map((section) => (section.id === id ? { ...section, expanded: !section.expanded } : section));
    setSections(newSections);
  };

  const createEmptyQuestion = (type: QuestionType): Question => {
    const id = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;

    switch (type) {
      case "singleChoice":
        return {
          id,
          type: "singleChoice",
          question: "New single choice question",
          options: ["Option 1", "Option 2", "Option 3"],
          correctAnswer: 0,
          points: 1,
          expanded: true,
          sectionId: activeSectionId,
          optionImages: [],
        };
      case "multipleChoice":
        return {
          id,
          type: "multipleChoice",
          question: "New multiple choice question",
          options: ["Option 1", "Option 2", "Option 3"],
          correctAnswers: [0],
          points: 1,
          expanded: true,
          sectionId: activeSectionId,
          optionImages: [],
        };
      case "trueFalse":
        return {
          id,
          type: "trueFalse",
          question: "New true/false statement",
          isTrue: true,
          points: 1,
          expanded: true,
          sectionId: activeSectionId,
        };
      case "fillBlank":
        return {
          id,
          type: "fillBlank",
          question: "New fill in the blank question with ___",
          answer: "answer",
          points: 1,
          expanded: true,
          sectionId: activeSectionId,
        };
      case "coding":
        return {
          id,
          type: "coding",
          question: "New coding question",
          sampleInput: "",
          sampleOutput: "",
          language: "javascript",
          points: 3,
          expanded: true,
          sectionId: activeSectionId,
          boilerplateCode: "// Write your code here\n\n",
          testCases: [
            {
              id: 1,
              input: "Example input",
              expectedOutput: "Example output",
              isHidden: false,
            },
          ],
        };
      default:
        return {
          id,
          type: "singleChoice",
          question: "New question",
          options: ["Option 1", "Option 2", "Option 3"],
          correctAnswer: 0,
          points: 1,
          expanded: true,
          sectionId: activeSectionId,
        };
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    if (activeQuestion >= newQuestions.length) {
      setActiveQuestion(Math.max(0, newQuestions.length - 1));
    }
  };

  const duplicateQuestion = (index: number) => {
    const questionToDuplicate = { ...questions[index] };
    questionToDuplicate.id = Math.max(...questions.map((q) => q.id)) + 1;
    questionToDuplicate.question = `Copy of ${questionToDuplicate.question}`;

    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, questionToDuplicate);
    setQuestions(newQuestions);
  };

  const toggleQuestionExpanded = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].expanded = !newQuestions[index].expanded;
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, updatedData: Partial<Question>) => {
    const newQuestions = [...questions];
    //@ts-ignore
    newQuestions[index] = { ...newQuestions[index], ...updatedData };
    setQuestions(newQuestions);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const draggedItemIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (draggedItemIndex === index) return;

    const newQuestions = [...questions];
    const draggedItem = newQuestions[draggedItemIndex];

    newQuestions.splice(draggedItemIndex, 1);
    newQuestions.splice(index, 0, draggedItem);

    setQuestions(newQuestions);
    if (activeQuestion === draggedItemIndex) {
      setActiveQuestion(index);
    }
  };

  // Filter questions by active section
  const filteredQuestions = questions.filter((q) => q.sectionId === activeSectionId);

  // Type icon mapping
  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case "singleChoice":
        return <CircleDot className='w-5 h-5' />; // Radio button with dot for single choice
      case "multipleChoice":
        return <CheckSquare className='w-5 h-5' />; // Checkbox with check for multiple choice
      case "trueFalse":
        return <ThumbsUp className='w-5 h-5' />; // Thumbs up for true/false
      case "fillBlank":
        return <FormInput className='w-5 h-5' />; // Form input for fill in the blank
      case "coding":
        return <Code className='w-5 h-5' />;
      default:
        return <HelpCircle className='w-5 h-5' />; // Help circle for unknown types
    }
  };

  const getQuestionTypeName = (type: QuestionType) => {
    switch (type) {
      case "singleChoice":
        return "Single Choice";
      case "multipleChoice":
        return "Multiple Choice";
      case "trueFalse":
        return "True/False";
      case "fillBlank":
        return "Fill in Blank";
      case "coding":
        return "Coding";
      default:
        return "Unknown";
    }
  };

  const renderQuestionEditor = () => {
    if (!filteredQuestions || filteredQuestions.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg'>
          <div className='bg-yellow-500 bg-opacity-10 p-6 rounded-full mb-6'>
            <AlertTriangle className='w-16 h-16 text-yellow-500' />
          </div>
          <h3 className='text-2xl font-semibold mb-3'>No Questions In This Section</h3>
          <p className='text-center mb-8 max-w-md opacity-80'>Start by adding your first question to this section.</p>
          <button onClick={addNewQuestion} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-8 py-3 rounded-xl flex items-center font-medium text-lg'>
            <PlusCircle className='w-5 h-5 mr-2' />
            Add First Question
          </button>
        </div>
      );
    }

    const currentQuestion = filteredQuestions[activeQuestion];
    if (!currentQuestion) {
      return null;
    }

    switch (currentQuestion.type) {
      case "singleChoice":
        return <SingleChoiceEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;
      case "multipleChoice":
        return <MultipleChoiceEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;
      case "trueFalse":
        return <TrueFalseEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;
      case "fillBlank":
        return <FillBlankEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;
      case "coding":
        return <CodingEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;

      case "matching":
        return <MatchingEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(questions.indexOf(currentQuestion), data)} accentColor={accentColor} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole='trainer'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='bg-gray-50 -m-6 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col'>
        {/* Header */}
        <motion.header initial={{ y: -20 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className='bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between shadow-md'>
          <div className='flex items-center'>
            <button onClick={toggleSidebar} className='mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
              <Menu className='w-5 h-5' />
            </button>
            <h1 className='text-2xl font-bold flex items-center'>
              <span className='text-blue-600 dark:text-blue-400 mr-2'>Assessment</span>
              <span>Builder</span>
            </h1>
          </div>

          <div className='flex items-center space-x-4'>
            <button className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all px-4 py-2 rounded-lg flex items-center text-sm'>
              <Save className='w-4 h-4 mr-2' />
              Save Draft
            </button>

            <button className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-6 py-2 rounded-lg flex items-center text-sm font-medium'>
              <ExternalLink className='w-4 h-4 mr-2' />
              Publish
            </button>
          </div>
        </motion.header>

        <div className='flex flex-1 overflow-hidden'>
          {/* Sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }} transition={{ type: "spring", stiffness: 100 }} className='w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col'>
                {/* Sections management */}
                <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
                  <h2 className='font-medium text-lg'>Sections</h2>
                  <button onClick={addNewSection} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all text-sm p-2 rounded-lg'>
                    <FolderPlus className='w-4 h-4' />
                  </button>
                </div>

                <div className='border-b border-gray-200 dark:border-gray-700'>
                  {sections.map((section) => (
                    <div key={section.id} className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${activeSectionId === section.id ? "bg-blue-50 dark:bg-gray-700" : ""}`} onClick={() => setActiveSectionId(section.id)}>
                      <div className='p-4'>
                        <div className='flex justify-between items-center mb-1'>
                          <div className='flex items-center'>
                            <Layout className='w-4 h-4 mr-2 text-blue-600 dark:text-blue-400' />
                            <input type='text' value={section.title} onChange={(e) => updateSection(section.id, { title: e.target.value })} className='font-medium bg-transparent border-none focus:ring-0 p-0 w-full' onClick={(e) => e.stopPropagation()} />
                          </div>
                          <div className='flex items-center'>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSectionExpanded(section.id);
                              }}
                              className='p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                            >
                              {section.expanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                            </button>
                          </div>
                        </div>

                        {section.expanded && (
                          <div className='mt-2 flex flex-col gap-2'>
                            <textarea value={section.description} onChange={(e) => updateSection(section.id, { description: e.target.value })} className='text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 w-full' placeholder='Section description' rows={2} onClick={(e) => e.stopPropagation()} />

                            <div className='flex gap-2'>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSection(section.id);
                                }}
                                className='py-1 px-2 rounded-md flex items-center text-xs bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:bg-opacity-30 dark:hover:bg-opacity-50 text-red-500 dark:text-red-400 transition-colors'
                                disabled={sections.length <= 1}
                              >
                                <Trash2 className='w-3 h-3 mr-1' />
                                <span>Delete</span>
                              </button>

                              <div className='text-xs text-gray-500 dark:text-gray-400 flex items-center'>{questions.filter((q) => q.sectionId === section.id).length} questions</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Questions list */}
                <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-2'>
                  <h2 className='font-medium text-lg'>Questions ({filteredQuestions.length})</h2>
                  <div className='flex flex-row'>
                    <select className='text-sm mr-2 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3' value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value as QuestionType)}>
                      <option value='singleChoice'>Single Choice</option>
                      <option value='multipleChoice'>Multiple Choice</option>
                      <option value='trueFalse'>True/False</option>
                      <option value='fillBlank'>Fill in Blank</option>
                      <option value='coding'>Coding</option>
                      <option value='matching'>Matching</option>
                    </select>

                    <button onClick={addNewQuestion} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all text-sm p-2 rounded-lg'>
                      <Plus className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                <div className='flex-1 overflow-y-auto'>
                  <AnimatePresence mode='popLayout'>
                    {filteredQuestions.map((question, index) => (
                      <motion.div key={question.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                        <div className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer' draggable onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, questions.indexOf(question))} onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)} onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e, questions.indexOf(question))}>
                          <div className={`flex items-start p-4 ${activeQuestion === index ? "bg-blue-50 dark:bg-gray-700 dark:bg-opacity-70" : ""} transition-colors`} onClick={() => setActiveQuestion(index)}>
                            <div className='cursor-move p-1 mr-2 opacity-50 hover:opacity-100'>
                              <Move className='w-4 h-4' />
                            </div>

                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center mb-1'>
                                <span className='mr-2 text-blue-600 dark:text-blue-400 flex items-center text-sm'>{getQuestionTypeIcon(question.type)}</span>
                                <span className='font-medium truncate text-sm'>
                                  Q{index + 1}. {question.question.length > 40 ? question.question.substring(0, 40) + "..." : question.question}
                                </span>
                              </div>

                              <div className='flex items-center text-xs'>
                                <span className='text-gray-500 dark:text-gray-400'>{getQuestionTypeName(question.type)}</span>
                                <span className='mx-2 text-gray-300 dark:text-gray-600'>•</span>
                                <span className='text-blue-600 dark:text-blue-400 font-medium'>
                                  {question.points} {question.points === 1 ? "point" : "points"}
                                </span>
                              </div>
                            </div>

                            <div className='flex items-center ml-2'>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleQuestionExpanded(questions.indexOf(question));
                                }}
                                className='p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                              >
                                {question.expanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                              </button>
                            </div>
                          </div>

                          {question.expanded && (
                            <div className={`px-4 pb-4 text-sm flex gap-3 ${activeQuestion === index ? "bg-blue-50 dark:bg-gray-700 dark:bg-opacity-70" : ""}`}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateQuestion(questions.indexOf(question));
                                }}
                                className='py-1 px-2 rounded-md flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 transition-colors'
                              >
                                <Copy className='w-3 h-3 mr-1' />
                                <span>Duplicate</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeQuestion(questions.indexOf(question));
                                }}
                                className='py-1 px-2 rounded-md flex items-center bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:bg-opacity-30 dark:hover:bg-opacity-50 text-red-500 dark:text-red-400 transition-colors'
                              >
                                <Trash2 className='w-3 h-3 mr-1' />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm font-medium'>
                      <span className='opacity-80'>Total:</span> <span className='text-blue-600 dark:text-blue-400'>{questions.reduce((acc, q) => acc + q.points, 0)} points</span>
                    </div>
                    <button className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all px-3 py-2 rounded-lg text-sm flex items-center'>
                      <Settings className='w-4 h-4 mr-1' />
                      Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content area */}
          <motion.div layout className='flex-1 flex flex-col overflow-hidden'>
            {/* Question type tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`px-8 pt-8 ${filteredQuestions.length === 0 ? "pb-4" : "pb-0"}`}>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h2 className='text-xl font-semibold'>{sections.find((s) => s.id === activeSectionId)?.title || "Section"}</h2>
                  {filteredQuestions.length > 0 && (
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      Question {activeQuestion + 1}: {getQuestionTypeName(filteredQuestions[activeQuestion]?.type)}
                    </p>
                  )}
                </div>

                {filteredQuestions.length > 0 && (
                  <div className='flex items-center space-x-3'>
                    <button onClick={() => duplicateQuestion(questions.indexOf(filteredQuestions[activeQuestion]))} className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow transition-all px-3 py-2 rounded-lg text-sm flex items-center'>
                      <Copy className='w-4 h-4 mr-1' />
                      Duplicate
                    </button>

                    <button onClick={() => removeQuestion(questions.indexOf(filteredQuestions[activeQuestion]))} className='bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-30 dark:hover:bg-opacity-50 text-red-600 dark:text-red-400 shadow-sm hover:shadow transition-all px-3 py-2 rounded-lg text-sm flex items-center'>
                      <Trash2 className='w-4 h-4 mr-1' />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Question editor */}
            <div className='flex-1 overflow-y-auto p-8 pt-4'>
              <AnimatePresence mode='wait'>
                <motion.div key={activeQuestion + "-" + (filteredQuestions[activeQuestion]?.id || "empty")} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className='w-full'>
                  {renderQuestionEditor()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

// SingleChoiceEditor component
const SingleChoiceEditor: React.FC<SingleChoiceEditorProps> = ({ question, updateQuestion, accentColor }) => {
  const q = question;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const optionFileInputRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);

  const addOption = () => {
    const newOptions = [...q.options, `Option ${q.options.length + 1}`];
    updateQuestion({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (q.options.length <= 2) return; // Keep at least 2 options

    const newOptions = [...q.options];
    newOptions.splice(index, 1);

    // Remove image for this option if it exists
    const newOptionImages = [...(q.optionImages || [])];
    if (newOptionImages.length > index) {
      newOptionImages.splice(index, 1);
    }

    // Update correct answer index if needed
    let newCorrectAnswer = q.correctAnswer;
    if (index === q.correctAnswer) {
      newCorrectAnswer = 0; // Default to first option if removed
    } else if (index < q.correctAnswer) {
      newCorrectAnswer -= 1; // Adjust index
    }

    updateQuestion({
      options: newOptions,
      optionImages: newOptionImages,
      correctAnswer: newCorrectAnswer,
    });
  };

  // Handle actual file upload for question image
  const handleQuestionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);
    updateQuestion({ imageUrl });
  };

  // Handle actual file upload for option images
  const handleOptionImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);

    const newOptionImages = [...(q.optionImages || [])];
    while (newOptionImages.length < q.options.length) {
      newOptionImages.push(undefined);
    }
    newOptionImages[index] = imageUrl;

    updateQuestion({ optionImages: newOptionImages });
  };

  const removeImage = (index: number) => {
    const newOptionImages = [...(q.optionImages || [])];
    newOptionImages[index] = undefined;
    updateQuestion({ optionImages: newOptionImages });
  };

  // Initialize option file input refs
  if (optionFileInputRefs.current.length !== q.options.length) {
    optionFileInputRefs.current = Array(q.options.length)
      .fill(null)
      .map((_, i) => optionFileInputRefs.current[i] || createRef<HTMLInputElement>());
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Question</label>
        <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={3} placeholder='Enter your question here' />
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>
          Options
          <span className='ml-2 text-gray-500 dark:text-gray-400 text-xs font-normal'>(select the correct answer)</span>
        </label>

        <div className='space-y-3'>
          {q.options.map((option, index) => (
            <div key={index} className='flex items-start space-x-3'>
              <div className='flex-shrink-0 pt-2'>
                <button onClick={() => updateQuestion({ correctAnswer: index })} className={`w-5 h-5 rounded-full flex items-center justify-center border ${q.correctAnswer === index ? `bg-blue-600 border-blue-600 text-white` : "border-gray-300 dark:border-gray-600"}`}>
                  {q.correctAnswer === index && <div className='w-2 h-2 bg-white rounded-full' />}
                </button>
              </div>

              <div className='flex-1 flex flex-col'>
                <div className='flex'>
                  <input
                    type='text'
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...q.options];
                      newOptions[index] = e.target.value;
                      updateQuestion({ options: newOptions });
                    }}
                    className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2'
                    placeholder={`Option ${index + 1}`}
                  />

                  <div className='flex ml-2'>
                    {q.optionImages && q.optionImages[index] ? (
                      <button onClick={() => removeImage(index)} className='p-2 bg-red-50 dark:bg-red-900 dark:bg-opacity-30 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-opacity-50 transition-colors'>
                        <Trash2 className='w-4 h-4' />
                      </button>
                    ) : (
                      <>
                        <input type='file' accept='image/*' ref={optionFileInputRefs.current[index]} onChange={(e) => handleOptionImageUpload(e, index)} className='hidden' />
                        <button onClick={() => optionFileInputRefs.current[index]?.current?.click()} className='p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                          <Upload className='w-4 h-4' />
                        </button>
                      </>
                    )}

                    {q.options.length > 2 && (
                      <button onClick={() => removeOption(index)} className='p-2 ml-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                        <Trash2 className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                </div>

                {q.optionImages && q.optionImages[index] && (
                  <div className='mt-2 relative inline-block'>
                    <img src={q.optionImages[index]} alt={`Option ${index + 1} image`} className='max-h-24 rounded-lg border border-gray-200 dark:border-gray-700' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button onClick={addOption} className='mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium'>
          <PlusCircle className='w-4 h-4 mr-1' />
          Add Option
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <label className='block text-sm font-medium mr-2'>Points:</label>
          <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' />
        </div>

        <div>
          <input type='file' ref={fileInputRef} accept='image/*' onChange={handleQuestionImageUpload} className='hidden' />
          <button onClick={() => fileInputRef.current?.click()} className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow transition-all px-3 py-2 rounded-lg text-sm flex items-center'>
            <FileUp className='w-4 h-4 mr-1' />
            Add Question Image
          </button>
        </div>
      </div>

      {q.imageUrl && (
        <div className='mt-4 relative inline-block'>
          <img src={q.imageUrl} alt='Question image' className='max-h-48 rounded-lg border border-gray-200 dark:border-gray-700' />
          <button onClick={() => updateQuestion({ imageUrl: undefined })} className='absolute top-2 right-2 p-1 bg-red-100 dark:bg-red-900 dark:bg-opacity-70 text-red-500 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-opacity-100 transition-colors'>
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      )}
    </div>
  );
};

// MultipleChoiceEditor component
const MultipleChoiceEditor: React.FC<QuestionEditorProps> = ({ question, updateQuestion, accentColor }) => {
  const q = question as MultipleChoiceQuestion;

  const addOption = () => {
    const newOptions = [...q.options, `Option ${q.options.length + 1}`];
    updateQuestion({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (q.options.length <= 2) return; // Keep at least 2 options

    const newOptions = [...q.options];
    newOptions.splice(index, 1);

    // Update correct answers if needed
    const newCorrectAnswers = q.correctAnswers
      .filter((i) => {
        if (i === index) return false;
        if (i > index) return i - 1;
        return i;
      })
      .map((i) => (typeof i === "number" ? i : 0));

    updateQuestion({
      options: newOptions,
      correctAnswers: newCorrectAnswers,
    });
  };

  const toggleCorrectAnswer = (index: number) => {
    const currentAnswers = [...q.correctAnswers];
    const answerIndex = currentAnswers.indexOf(index);

    if (answerIndex === -1) {
      // Add to correct answers
      currentAnswers.push(index);
    } else {
      // Remove from correct answers if there's more than one correct answer
      if (currentAnswers.length > 1) {
        currentAnswers.splice(answerIndex, 1);
      }
    }

    updateQuestion({ correctAnswers: currentAnswers });
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Question</label>
        <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={3} placeholder='Enter your question here' />
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>
          Options
          <span className='ml-2 text-gray-500 dark:text-gray-400 text-xs font-normal'>(select all correct answers)</span>
        </label>

        <div className='space-y-3'>
          {q.options.map((option, index) => (
            <div key={index} className='flex items-start space-x-3'>
              <div className='flex-shrink-0 pt-2'>
                <button onClick={() => toggleCorrectAnswer(index)} className={`w-5 h-5 rounded flex items-center justify-center border ${q.correctAnswers.includes(index) ? `bg-${accentColor}-600 border-${accentColor}-600 text-white` : "border-gray-300 dark:border-gray-600"}`}>
                  {q.correctAnswers.includes(index) && <Check className='w-3 h-3' />}
                </button>
              </div>

              <div className='flex-1'>
                <div className='flex'>
                  <input
                    type='text'
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...q.options];
                      newOptions[index] = e.target.value;
                      updateQuestion({ options: newOptions });
                    }}
                    className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2'
                    placeholder={`Option ${index + 1}`}
                  />

                  {q.options.length > 2 && (
                    <button onClick={() => removeOption(index)} className='p-2 ml-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                      <Trash2 className='w-4 h-4' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addOption} className='mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-sm font-medium'>
          <PlusCircle className='w-4 h-4 mr-1' />
          Add Option
        </button>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <label className='block text-sm font-medium mr-2'>Points:</label>
          <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' />
        </div>
      </div>
    </div>
  );
};

// TrueFalseEditor component
const TrueFalseEditor: React.FC<QuestionEditorProps> = ({ question, updateQuestion, accentColor }) => {
  const q = question as TrueFalseQuestion;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Statement</label>
        <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={3} placeholder='Enter your true/false statement here' />
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Correct Answer</label>
        <div className='flex items-center space-x-4'>
          <button onClick={() => updateQuestion({ isTrue: true })} className={`px-4 py-2 rounded-lg flex items-center ${q.isTrue ? `bg-${accentColor}-600 text-white` : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
            <CheckCircle className={`w-4 h-4 mr-2 ${q.isTrue ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
            True
          </button>

          <button onClick={() => updateQuestion({ isTrue: false })} className={`px-4 py-2 rounded-lg flex items-center ${!q.isTrue ? `bg-${accentColor}-600 text-white` : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
            <Circle className={`w-4 h-4 mr-2 ${!q.isTrue ? "text-white" : "text-gray-400 dark:text-gray-500"}`} />
            False
          </button>
        </div>
      </div>

      <div className='flex items-center'>
        <label className='block text-sm font-medium mr-2'>Points:</label>
        <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' />
      </div>
    </div>
  );
};

const FillBlankEditor: React.FC<QuestionEditorProps> = ({
  question,
  updateQuestion,
  accentColor = "#3b82f6", // Default to blue if not provided
}) => {
  const q = question as FillBlankQuestion;
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to check if the question has a blank
  const hasBlank = (text: string) => text.includes("___");

  // Function to handle alternative answers
  const handleAlternativeAnswerChange = (index: number, value: string) => {
    const updatedAlternatives = [...(q.alternativeAnswers || [])];
    updatedAlternatives[index] = value;
    updateQuestion({ alternativeAnswers: updatedAlternatives });
  };

  // Function to add a new alternative answer
  const addAlternativeAnswer = () => {
    const updatedAlternatives = [...(q.alternativeAnswers || []), ""];
    updateQuestion({ alternativeAnswers: updatedAlternatives });
  };

  // Function to remove an alternative answer
  const removeAlternativeAnswer = (index: number) => {
    const updatedAlternatives = [...(q.alternativeAnswers || [])];
    updatedAlternatives.splice(index, 1);
    updateQuestion({ alternativeAnswers: updatedAlternatives });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload only image files");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        // Update the question with the new image
        updateQuestion({
          images: [...(q.images || []), imageData],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...(q.images || [])];
    newImages.splice(index, 1);
    updateQuestion({ images: newImages });
  };

  // Custom button style using the accent color
  const buttonStyle = {
    backgroundColor: accentColor,
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      {/* Question input */}
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Question</label>
        <div className='relative'>
          <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-blue-500 p-4' rows={3} placeholder='Enter your question with ___ for the blank' />
          <div className='mt-1 flex items-center'>
            <div className='text-xs text-gray-500 dark:text-gray-400'>Use ___ (three underscores) where you want the blank to appear</div>
            {!hasBlank(q.question) && q.question.trim() !== "" && <div className='ml-2 text-xs text-red-500'>No blank found! Add ___ to your question.</div>}
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <label className='block text-sm font-medium'>Question Images</label>
          <label className='cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-xs'>
            <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageUpload} className='hidden' multiple={true} />
            <ImageIcon className='w-3 h-3 mr-1' />
            Add Images
          </label>
        </div>

        {(q.images || []).length > 0 && (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
            {(q.images || []).map((image, index) => (
              <div key={index} className='relative group'>
                <img src={image} alt={`Question image ${index + 1}`} className='w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700' />
                <button
                  onClick={() => removeImage(index)}
                  className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Correct answer input */}
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Correct Answer</label>
        <input type='text' value={q.answer} onChange={(e) => updateQuestion({ answer: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-blue-500 p-4' placeholder='Correct answer for the blank' />
      </div>

      {/* Points and Case Sensitivity settings */}
      <div className='flex flex-wrap items-center justify-between mb-6'>
        <div className='flex items-center mb-2 md:mb-0'>
          <label className='block text-sm font-medium mr-2'>Points:</label>
          <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-blue-500 p-2' />
        </div>

        <div className='flex items-center'>
          <input type='checkbox' id='caseSensitive' checked={q.caseSensitive || false} onChange={(e) => updateQuestion({ caseSensitive: e.target.checked })} className='mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
          <label htmlFor='caseSensitive' className='text-sm font-medium'>
            Case sensitive
          </label>
        </div>
      </div>

      {/* Toggle advanced settings */}
      <button type='button' onClick={() => setShowAdvanced(!showAdvanced)} className='mb-4 text-sm font-medium flex items-center text-blue-600 dark:text-blue-400 hover:underline' style={{ color: accentColor }}>
        {showAdvanced ? "Hide" : "Show"} advanced options
        <svg className={`ml-1 h-4 w-4 transform ${showAdvanced ? "rotate-180" : ""}`} fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
          <path d='M19 9l-7 7-7-7'></path>
        </svg>
      </button>

      {/* Advanced settings */}
      {showAdvanced && (
        <div className='border-t border-gray-200 dark:border-gray-700 pt-4'>
          {/* Alternative answers */}
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Alternative Answers</label>

            {(q.alternativeAnswers || []).map((alt, index) => (
              <div key={index} className='flex items-center mb-2'>
                <input type='text' value={alt} onChange={(e) => handleAlternativeAnswerChange(index, e.target.value)} className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2' placeholder={`Alternative answer ${index + 1}`} />
                <button type='button' onClick={() => removeAlternativeAnswer(index)} className='ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <svg className='h-5 w-5 text-gray-500 dark:text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            ))}

            <button type='button' onClick={addAlternativeAnswer} className='mt-2 px-3 py-1 text-sm font-medium rounded-md text-white' style={buttonStyle}>
              + Add alternative answer
            </button>
          </div>

          {/* Explanation */}
          <div>
            <label className='block text-sm font-medium mb-2'>Explanation (optional)</label>
            <textarea value={q.explanation || ""} onChange={(e) => updateQuestion({ explanation: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-blue-500 p-4' rows={2} placeholder='Explain why this answer is correct' />
          </div>
        </div>
      )}

      {/* Preview section */}
      <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
        <h3 className='text-sm font-medium mb-2'>Preview</h3>
        <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4'>
          {q.question && (
            <div className='mb-2'>
              {q.question.split("___").map((part, i, array) => (
                <React.Fragment key={i}>
                  {part}
                  {i < array.length - 1 && <span className='inline-block min-w-12 h-6 border-b-2 border-gray-400 dark:border-gray-500 mx-1'></span>}
                </React.Fragment>
              ))}
            </div>
          )}
          {!q.question && <p className='text-gray-500 dark:text-gray-400'>Question preview will appear here</p>}
        </div>
      </div>
    </div>
  );
};

// CodingEditor component
const CodingEditor: React.FC<CodingEditorProps> = ({ question, updateQuestion, accentColor }) => {
  const q = question;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialImage = q.images?.[0] ?? null;
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage);

  const addTestCase = () => {
    const newTestCases = [
      ...q.testCases,
      {
        id: q.testCases.length > 0 ? Math.max(...q.testCases.map((tc: TestCase) => tc.id)) + 1 : 1,
        input: "",
        expectedOutput: "",
        isHidden: false,
      },
    ];
    updateQuestion({ testCases: newTestCases });
  };

  const removeTestCase = (id: number) => {
    // Keep at least one test case
    if (q.testCases.length <= 1) return;

    const newTestCases = q.testCases.filter((tc: TestCase) => tc.id !== id);
    updateQuestion({ testCases: newTestCases });
  };

  const updateTestCase = (id: number, data: Partial<TestCase>) => {
    const newTestCases = q.testCases.map((tc: TestCase) => (tc.id === id ? { ...tc, ...data } : tc));
    updateQuestion({ testCases: newTestCases });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Create a FileReader to read the image
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      // Update the question with the new image
      updateQuestion({
        images: [...(q.images || []), imageData],
      });
      setImagePreview(imageData);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateQuestion({ images: [] });
    setImagePreview(null);
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Question</label>
        <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={3} placeholder='Describe the coding problem here' />
      </div>

      {/* Image Upload Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <label className='block text-sm font-medium'>Question Image</label>
          {!imagePreview && (
            <label className='cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-xs'>
              <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageUpload} className='hidden' />
              <ImageIcon className='w-3 h-3 mr-1' />
              Add Image
            </label>
          )}
        </div>

        {imagePreview && (
          <div className='relative border border-gray-200 dark:border-gray-700 rounded-lg p-2 mt-2'>
            <button onClick={removeImage} className='absolute top-2 right-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
              <X className='w-4 h-4' />
            </button>
            <img src={imagePreview} alt='Question illustration' className='max-h-64 mx-auto rounded' />
            <div className='mt-2 flex justify-center'>
              <label className='cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-xs'>
                <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageUpload} className='hidden' multiple={true} />
                <ImageIcon className='w-3 h-3 mr-1' />
                Add More Images
              </label>
            </div>
          </div>
        )}
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Language</label>
        <select value={q.language} onChange={(e) => updateQuestion({ language: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2'>
          <option value='javascript'>JavaScript</option>
          <option value='python'>Python</option>
          <option value='java'>Java</option>
          <option value='csharp'>C#</option>
          <option value='cpp'>C++</option>
        </select>
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Boilerplate Code</label>
        <textarea value={q.boilerplateCode} onChange={(e) => updateQuestion({ boilerplateCode: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={5} placeholder='// Initial code provided to students' />
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <label className='block text-sm font-medium'>Test Cases</label>
          <button onClick={addTestCase} className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-xs'>
            <PlusCircle className='w-3 h-3 mr-1' />
            Add Test Case
          </button>
        </div>

        <div className='space-y-4'>
          {q.testCases.map((testCase: TestCase) => (
            <div key={testCase.id} className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
              <div className='flex justify-between items-center mb-3'>
                <div className='flex items-center'>
                  <h4 className='text-sm font-medium'>Test Case {testCase.id}</h4>
                  <label className='flex items-center ml-4 text-xs'>
                    <input type='checkbox' checked={testCase.isHidden} onChange={(e) => updateTestCase(testCase.id, { isHidden: e.target.checked })} className='rounded text-blue-600 focus:ring-blue-500 mr-1' />
                    Hidden from students
                  </label>
                </div>

                <button onClick={() => removeTestCase(testCase.id)} className='p-1 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-30 rounded'>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs font-medium mb-1'>Input</label>
                  <textarea value={testCase.input} onChange={(e) => updateTestCase(testCase.id, { input: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' rows={3} placeholder='Test input' />
                </div>
                <div>
                  <label className='block text-xs font-medium mb-1'>Expected Output</label>
                  <textarea value={testCase.expectedOutput} onChange={(e) => updateTestCase(testCase.id, { expectedOutput: e.target.value })} className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' rows={3} placeholder='Expected output' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center'>
        <label className='block text-sm font-medium mr-2'>Points:</label>
        <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' />
      </div>
    </div>
  );
};

// MatchingEditor component
const MatchingEditor: React.FC<QuestionEditorProps> = ({ question, updateQuestion, accentColor }) => {
  const q = question as MatchingQuestion;

  const addPair = () => {
    const newPairs = [...q.pairs, { left: `Item ${q.pairs.length + 1}`, right: `Match ${q.pairs.length + 1}` }];
    updateQuestion({ pairs: newPairs });
  };

  const removePair = (index: number) => {
    // Keep at least 2 pairs
    if (q.pairs.length <= 2) return;

    const newPairs = [...q.pairs];
    newPairs.splice(index, 1);
    updateQuestion({ pairs: newPairs });
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6'>
      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Question</label>
        <textarea value={q.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-4' rows={3} placeholder='Enter your matching question instructions here' />
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <label className='block text-sm font-medium'>Matching Pairs</label>
          <button onClick={addPair} className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center text-xs'>
            <PlusCircle className='w-3 h-3 mr-1' />
            Add Pair
          </button>
        </div>

        <div className='space-y-2'>
          {q.pairs.map((pair, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <input
                type='text'
                value={pair.left}
                onChange={(e) => {
                  const newPairs = [...q.pairs];
                  newPairs[index] = { ...pair, left: e.target.value };
                  updateQuestion({ pairs: newPairs });
                }}
                className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2'
                placeholder='Left item'
              />

              <div className='flex-shrink-0 text-gray-400'>
                <ArrowRight className='w-4 h-4' />
              </div>

              <input
                type='text'
                value={pair.right}
                onChange={(e) => {
                  const newPairs = [...q.pairs];
                  newPairs[index] = { ...pair, right: e.target.value };
                  updateQuestion({ pairs: newPairs });
                }}
                className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2'
                placeholder='Right match'
              />

              {q.pairs.length > 2 && (
                <button onClick={() => removePair(index)} className='p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'>
                  <Trash2 className='w-4 h-4' />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center'>
        <label className='block text-sm font-medium mr-2'>Points:</label>
        <input type='number' min='1' value={q.points} onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 1 })} className='w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2' />
      </div>
    </div>
  );
};

// Helper function to create new questions
const createNewQuestion = (type: QuestionType, sectionId: number): Question => {
  const id = Date.now();
  const defaultQuestion = {
    id,
    question: "",
    points: 1,
    expanded: true,
    sectionId,
  };

  switch (type) {
    case "singleChoice":
      return {
        ...defaultQuestion,
        type: "singleChoice",
        options: ["Option 1", "Option 2"],
        correctAnswer: 0,
        optionImages: [],
      };
    case "multipleChoice":
      return {
        ...defaultQuestion,
        type: "multipleChoice",
        options: ["Option 1", "Option 2"],
        correctAnswers: [0],
        optionImages: [],
      };
    case "trueFalse":
      return {
        ...defaultQuestion,
        type: "trueFalse",
        isTrue: true,
      };
    case "fillBlank":
      return {
        ...defaultQuestion,
        type: "fillBlank",
        answer: "",
      };
    case "coding":
      return {
        ...defaultQuestion,
        type: "coding",
        language: "javascript",
        boilerplateCode: "// Your code here",
        testCases: [
          {
            id: 1,
            input: "",
            expectedOutput: "",
            isHidden: false,
          },
        ],
        sampleInput: "",
        sampleOutput: "",
      };
    case "shortAnswer":
      return {
        ...defaultQuestion,
        type: "shortAnswer",
        acceptableAnswers: [""],
        caseSensitive: false,
      };
    case "essay":
      return {
        ...defaultQuestion,
        type: "essay",
        modelAnswer: "",
        minWordCount: 0,
      };
    case "matching":
      return {
        ...defaultQuestion,
        type: "matching",
        pairs: [
          { left: "Item 1", right: "Match 1" },
          { left: "Item 2", right: "Match 2" },
        ],
      };
    default:
      return {
        ...defaultQuestion,
        type: "singleChoice",
        options: ["Option 1", "Option 2"],
        correctAnswer: 0,
        optionImages: [],
      };
  }
};
