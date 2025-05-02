"use client";
import React, { useState, DragEvent } from "react";
import { CheckCircle, Circle, CheckSquare, Square, Edit3, Code, PlusCircle, Save, ChevronDown, ChevronUp, Trash2, ExternalLink, Play, Moon, Sun, Settings, Move, Plus, Copy, Menu, AlertTriangle, HelpCircle, CircleDot, ThumbsUp, FormInput } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
type QuestionType = "singleChoice" | "multipleChoice" | "trueFalse" | "fillBlank" | "coding";

interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
  points: number;
  expanded: boolean;
}

interface SingleChoiceQuestion extends BaseQuestion {
  type: "singleChoice";
  options: string[];
  correctAnswer: number;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multipleChoice";
  options: string[];
  correctAnswers: number[];
}

interface TrueFalseQuestion extends BaseQuestion {
  type: "trueFalse";
  isTrue: boolean;
}

interface FillBlankQuestion extends BaseQuestion {
  type: "fillBlank";
  answer: string;
}

interface CodingQuestion extends BaseQuestion {
  type: "coding";
  sampleInput: string;
  sampleOutput: string;
  language: string;
}

type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TrueFalseQuestion | FillBlankQuestion | CodingQuestion;

interface QuestionEditorProps {
  question: Question;
  updateQuestion: (data: Partial<Question>) => void;
  accentColor: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    type: "singleChoice",
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
    points: 2,
    expanded: true,
  },
  {
    id: 2,
    type: "multipleChoice",
    question: "Which of the following are functional programming languages?",
    options: ["Python", "Haskell", "Java", "Clojure"],
    correctAnswers: [1, 3],
    points: 3,
    expanded: false,
  },
  {
    id: 3,
    type: "trueFalse",
    question: "In JavaScript, '==' compares values without checking types.",
    isTrue: true,
    points: 1,
    expanded: false,
  },
];

export default function ImprovedAssessmentBuilder() {
  const { theme, setTheme } = useTheme();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>("singleChoice");
  const accentColor = "blue";

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const addNewQuestion = () => {
    const newQuestion = createEmptyQuestion(selectedQuestionType);
    setQuestions([...questions, newQuestion]);
    setActiveQuestion(questions.length);
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
        };
      case "trueFalse":
        return {
          id,
          type: "trueFalse",
          question: "New true/false statement",
          isTrue: true,
          points: 1,
          expanded: true,
        };
      case "fillBlank":
        return {
          id,
          type: "fillBlank",
          question: "New fill in the blank question with ___",
          answer: "answer",
          points: 1,
          expanded: true,
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
    if (questions.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg'>
          <div className='bg-yellow-500 bg-opacity-10 p-6 rounded-full mb-6'>
            <AlertTriangle className='w-16 h-16 text-yellow-500' />
          </div>
          <h3 className='text-2xl font-semibold mb-3'>No Questions Yet</h3>
          <p className='text-center mb-8 max-w-md opacity-80'>Start by adding your first question to the assessment.</p>
          <button onClick={addNewQuestion} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-8 py-3 rounded-xl flex items-center font-medium text-lg'>
            <PlusCircle className='w-5 h-5 mr-2' />
            Add First Question
          </button>
        </div>
      );
    }

    const currentQuestion = questions[activeQuestion];

    switch (currentQuestion.type) {
      case "singleChoice":
        return <SingleChoiceEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(activeQuestion, data)} accentColor={accentColor} />;
      case "multipleChoice":
        return <MultipleChoiceEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(activeQuestion, data)} accentColor={accentColor} />;
      case "trueFalse":
        return <TrueFalseEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(activeQuestion, data)} accentColor={accentColor} />;
      case "fillBlank":
        return <FillBlankEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(activeQuestion, data)} accentColor={accentColor} />;
      case "coding":
        return <CodingEditor question={currentQuestion} updateQuestion={(data) => updateQuestion(activeQuestion, data)} accentColor={accentColor} />;
      default:
        return <div>Unknown question type</div>;
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
                <div className='p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-wrap gap-2'>
                  <h2 className='font-medium text-lg'>Questions ({questions.length})</h2>
                  <div className='flex flex-row'>
                    <select className='text-sm mr-2 rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3' value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value as QuestionType)}>
                      <option value='singleChoice'>Single Choice</option>
                      <option value='multipleChoice'>Multiple Choice</option>
                      <option value='trueFalse'>True/False</option>
                      <option value='fillBlank'>Fill in Blank</option>
                      <option value='coding'>Coding</option>
                    </select>

                    <button onClick={addNewQuestion} className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all text-sm p-2 rounded-lg'>
                      <Plus className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                <div className='flex-1 overflow-y-auto'>
                  <AnimatePresence mode='popLayout'>
                    {questions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div
                          className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                          draggable
                          onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, index)}
                          onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)}
                          onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e, index)}
                        >
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
                                  toggleQuestionExpanded(index);
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
                                  duplicateQuestion(index);
                                }}
                                className='py-1 px-2 rounded-md flex items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 transition-colors'
                              >
                                <Copy className='w-3 h-3 mr-1' />
                                <span>Duplicate</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeQuestion(index);
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`px-8 pt-8 ${questions.length === 0 ? "pb-4" : "pb-0"}`}>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold'>{questions.length > 0 ? `Question ${activeQuestion + 1}: ${getQuestionTypeName(questions[activeQuestion]?.type)}` : "Create Your Assessment"}</h2>

                {questions.length > 0 && (
                  <div className='flex items-center space-x-3'>
                    <button onClick={() => duplicateQuestion(activeQuestion)} className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all px-4 py-2 rounded-lg flex items-center text-sm'>
                      <Copy className='w-4 h-4 mr-2' />
                      Duplicate
                    </button>
                    <button onClick={() => removeQuestion(activeQuestion)} className='bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:bg-opacity-20 dark:hover:bg-opacity-30 text-red-500 dark:text-red-400 px-4 py-2 rounded-lg flex items-center text-sm transition-colors'>
                      <Trash2 className='w-4 h-4 mr-2' />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Question editor */}
            <motion.div layout className='px-8 pb-8 flex-1 overflow-y-auto'>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg rounded-xl border'>
                {renderQuestionEditor()}
              </motion.div>
            </motion.div>

            {/* Footer */}
            {questions.length > 0 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className='p-5 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span className='mr-3 text-gray-500 dark:text-gray-400 font-medium'>Points:</span>
                    <input
                      type='number'
                      min='1'
                      max='100'
                      value={questions[activeQuestion]?.points || 1}
                      onChange={(e) => {
                        const value = Math.max(1, Math.min(100, parseInt(e.target.value) || 1));
                        updateQuestion(activeQuestion, { points: value });
                      }}
                      className='w-16 p-2 text-center rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='flex'>
                      <button onClick={() => setActiveQuestion(Math.max(0, activeQuestion - 1))} disabled={activeQuestion === 0} className={`px-4 py-2 rounded-l-lg border-r ${activeQuestion === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all`}>
                        Previous
                      </button>
                      <button onClick={() => setActiveQuestion(Math.min(questions.length - 1, activeQuestion + 1))} disabled={activeQuestion === questions.length - 1} className={`px-4 py-2 rounded-r-lg ${activeQuestion === questions.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all`}>
                        Next
                      </button>
                    </div>

                    <button className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-6 py-2 rounded-lg font-medium'>Save Question</button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

// Question Editor Components
function SingleChoiceEditor({ question, updateQuestion, accentColor }: QuestionEditorProps) {
  if (question.type !== "singleChoice") return null;

  const addOption = () => {
    const newOptions = [...question.options, `Option ${question.options.length + 1}`];
    updateQuestion({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (question.options.length <= 2) return;

    const newOptions = [...question.options];
    newOptions.splice(index, 1);

    let newCorrectAnswer = question.correctAnswer;
    if (question.correctAnswer === index) {
      newCorrectAnswer = 0;
    } else if (question.correctAnswer > index) {
      newCorrectAnswer = question.correctAnswer - 1;
    }

    updateQuestion({
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    updateQuestion({ options: newOptions });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='p-8'>
      <div className='mb-8'>
        <label className='block mb-3 text-sm font-medium'>Question</label>
        <textarea value={question.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-md' rows={3} placeholder='Enter your question here...' />
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <label className='text-sm font-medium'>Options</label>
          <button onClick={addOption} className='flex items-center space-x-1 px-3 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all'>
            <Plus className='w-4 h-4 mr-1' />
            Add Option
          </button>
        </div>

        <div className='space-y-4'>
          {question.options.map((option: string, index: number) => (
            <motion.div key={index} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`flex items-center ${question.correctAnswer === index ? "bg-green-50 border-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800" : ""} p-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors`}>
              <div onClick={() => updateQuestion({ correctAnswer: index })} className={`mr-4 cursor-pointer flex items-center justify-center w-6 h-6 rounded-full ${question.correctAnswer === index ? `text-${accentColor}-600 dark:text-${accentColor}-400 border-2 border-current` : `border-2 border-gray-300 dark:border-gray-600`} transition-colors`}>
                {question.correctAnswer === index && <div className={`w-3 h-3 rounded-full text-${accentColor}-600 dark:text-${accentColor}-400 bg-current`}></div>}
              </div>
              <input type='text' value={option} onChange={(e) => updateOption(index, e.target.value)} className='flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all' placeholder={`Option ${index + 1}`} />
              <button onClick={() => removeOption(index)} className={`ml-3 p-2 rounded-lg ${question.options.length <= 2 ? "opacity-50 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-300"} transition-colors`} disabled={question.options.length <= 2}>
                <Trash2 className='w-4 h-4' />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MultipleChoiceEditor({ question, updateQuestion, accentColor }: QuestionEditorProps) {
  if (question.type !== "multipleChoice") return null;

  const addOption = () => {
    const newOptions = [...question.options, `Option ${question.options.length + 1}`];
    updateQuestion({ options: newOptions });
  };

  const removeOption = (index: number) => {
    if (question.options.length <= 2) return;

    const newOptions = [...question.options];
    newOptions.splice(index, 1);

    const newCorrectAnswers = question.correctAnswers.filter((answerIndex) => answerIndex !== index).map((answerIndex) => (answerIndex > index ? answerIndex - 1 : answerIndex));

    updateQuestion({
      options: newOptions,
      correctAnswers: newCorrectAnswers,
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    updateQuestion({ options: newOptions });
  };

  const toggleCorrectAnswer = (index: number) => {
    const currentCorrectAnswers = [...question.correctAnswers];
    const answerIndex = currentCorrectAnswers.indexOf(index);

    if (answerIndex === -1) {
      // Add to correct answers
      currentCorrectAnswers.push(index);
    } else {
      // Remove from correct answers if there's more than one (must have at least one correct answer)
      if (currentCorrectAnswers.length > 1) {
        currentCorrectAnswers.splice(answerIndex, 1);
      }
    }

    updateQuestion({ correctAnswers: currentCorrectAnswers });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='p-8'>
      <div className='mb-8'>
        <label className='block mb-3 text-sm font-medium'>Question</label>
        <textarea value={question.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-md' rows={3} placeholder='Enter your question here...' />
      </div>

      <div className='mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <label className='text-sm font-medium'>
            Options <span className='text-gray-500 text-xs ml-2'>(Select multiple correct answers)</span>
          </label>
          <button onClick={addOption} className='flex items-center space-x-1 px-3 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white shadow-sm hover:shadow-md transition-all'>
            <Plus className='w-4 h-4 mr-1' />
            Add Option
          </button>
        </div>

        <div className='space-y-4'>
          {question.options.map((option: string, index: number) => (
            <motion.div key={index} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`flex items-center ${question.correctAnswers.includes(index) ? "bg-green-50 border-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800" : ""} p-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors`}>
              <div onClick={() => toggleCorrectAnswer(index)} className={`mr-4 cursor-pointer flex items-center justify-center w-6 h-6 rounded-md ${question.correctAnswers.includes(index) ? `text-${accentColor}-600 dark:text-${accentColor}-400 border-2 border-current` : `border-2 border-gray-300 dark:border-gray-600`} transition-colors`}>
                {question.correctAnswers.includes(index) && <CheckSquare className='w-4 h-4' />}
              </div>
              <input type='text' value={option} onChange={(e) => updateOption(index, e.target.value)} className='flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all' placeholder={`Option ${index + 1}`} />
              <button onClick={() => removeOption(index)} className={`ml-3 p-2 rounded-lg ${question.options.length <= 2 ? "opacity-50 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-300"} transition-colors`} disabled={question.options.length <= 2}>
                <Trash2 className='w-4 h-4' />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TrueFalseEditor({ question, updateQuestion, accentColor }: QuestionEditorProps) {
  if (question.type !== "trueFalse") return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='p-8'>
      <div className='mb-8'>
        <label className='block mb-3 text-sm font-medium'>Statement</label>
        <textarea value={question.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-md' rows={3} placeholder='Enter a statement to be marked as true or false...' />
      </div>

      <div className='mb-6'>
        <label className='block mb-4 text-sm font-medium'>Correct Answer</label>

        <div className='flex space-x-4'>
          <div onClick={() => updateQuestion({ isTrue: true })} className={`flex-1 cursor-pointer rounded-xl p-5 border ${question.isTrue ? `bg-green-50 border-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800` : `border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750`} transition-colors flex items-center justify-between`}>
            <div className='flex items-center'>
              <CheckCircle className={`w-5 h-5 mr-3 ${question.isTrue ? `text-${accentColor}-600 dark:text-${accentColor}-400` : "text-gray-400 dark:text-gray-500"}`} />
              <span className='font-medium'>True</span>
            </div>
            {question.isTrue && <div className={`text-${accentColor}-600 dark:text-${accentColor}-400 text-sm font-medium`}>Selected</div>}
          </div>

          <div onClick={() => updateQuestion({ isTrue: false })} className={`flex-1 cursor-pointer rounded-xl p-5 border ${!question.isTrue ? `bg-green-50 border-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800` : `border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750`} transition-colors flex items-center justify-between`}>
            <div className='flex items-center'>
              <Circle className={`w-5 h-5 mr-3 ${!question.isTrue ? `text-${accentColor}-600 dark:text-${accentColor}-400` : "text-gray-400 dark:text-gray-500"}`} />
              <span className='font-medium'>False</span>
            </div>
            {!question.isTrue && <div className={`text-${accentColor}-600 dark:text-${accentColor}-400 text-sm font-medium`}>Selected</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FillBlankEditor({ question, updateQuestion, accentColor }: QuestionEditorProps) {
  if (question.type !== "fillBlank") return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='p-8'>
      <div className='mb-8'>
        <label className='block mb-3 text-sm font-medium'>Question</label>
        <div className='mb-2 text-sm text-gray-500 dark:text-gray-400'>Use underscores "_" to indicate the blank space</div>
        <textarea value={question.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-md' rows={3} placeholder='Enter your question with ___ for blanks...' />
      </div>

      <div className='mb-6'>
        <label className='block mb-3 text-sm font-medium'>Correct Answer</label>
        <input type='text' value={question.answer} onChange={(e) => updateQuestion({ answer: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all' placeholder='Enter the correct answer...' />
      </div>

      <div className='p-5 rounded-xl bg-gray-50 dark:bg-gray-700 mb-2'>
        <h4 className='font-medium mb-2 flex items-center'>
          <Play className='w-4 h-4 mr-2 text-blue-500' />
          Preview
        </h4>
        <p className='mb-3'>
          {question.question.split("___").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className='inline-block mx-1 px-6 py-0.5 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 border border-blue-200 dark:border-blue-800 rounded'>
                  <span className='opacity-50'>blank</span>
                </span>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

function CodingEditor({ question, updateQuestion, accentColor }: QuestionEditorProps) {
  if (question.type !== "coding") return null;

  const languageOptions = ["javascript", "python", "java", "c", "cpp", "csharp", "php", "ruby", "go", "rust", "swift", "kotlin"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='p-8'>
      <div className='mb-8'>
        <label className='block mb-3 text-sm font-medium'>Problem Statement</label>
        <textarea value={question.question} onChange={(e) => updateQuestion({ question: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:shadow-md' rows={5} placeholder='Describe the coding problem...' />
      </div>

      <div className='mb-6'>
        <label className='block mb-3 text-sm font-medium'>Programming Language</label>
        <select value={question.language} onChange={(e) => updateQuestion({ language: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div>
          <label className='block mb-3 text-sm font-medium'>Sample Input</label>
          <textarea value={question.sampleInput} onChange={(e) => updateQuestion({ sampleInput: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm' rows={4} placeholder='Sample input for the problem...' />
        </div>
        <div>
          <label className='block mb-3 text-sm font-medium'>Expected Output</label>
          <textarea value={question.sampleOutput} onChange={(e) => updateQuestion({ sampleOutput: e.target.value })} className='w-full p-4 border rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm' rows={4} placeholder='Expected output for the sample input...' />
        </div>
      </div>

      <div className='p-5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'>
        <div className='flex items-center justify-between mb-3'>
          <h4 className='font-medium flex items-center'>
            <Code className='w-4 h-4 mr-2 text-blue-500' />
            Code Editor Preview
          </h4>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Language: <span className='font-medium text-blue-600 dark:text-blue-400'>{question.language}</span>
          </div>
        </div>
        <div className='bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm min-h-28 opacity-80 flex items-center justify-center'>
          <div className='text-gray-400'>Code editor will appear here for students</div>
        </div>
      </div>
    </motion.div>
  );
}
