"use client";
import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Flag, Eye, EyeOff, Save, CheckSquare, ArrowLeft, ArrowRight, AlertTriangle, Maximize, Minimize, Menu, X, Camera, Video, Info, Layout, Grid, Moon, Sun } from "lucide-react";

// Type definitions
interface Section {
  id: number;
  title: string;
  description: string;
  expanded: boolean;
}

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface Question {
  id: number;
  type: "singleChoice" | "multipleChoice" | "trueFalse" | "fillBlank" | "coding" | "shortAnswer" | "matching";
  question: string;
  points: number;
  expanded: boolean;
  sectionId: number;
  flagged: boolean;
  userAnswer: any;
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  isTrue?: boolean;
  answer?: string;
  alternativeAnswers?: string[];
  caseSensitive?: boolean;
  sampleInput?: string;
  sampleOutput?: string;
  language?: string;
  boilerplateCode?: string;
  testCases?: TestCase[];
  acceptableAnswers?: string[];
  pairs?: Array<{ left: string; right: string }>;
  imageUrl?: string;
  optionImages?: string[];
  images?: string[];
}

// Main component
export default function EnhancedAssessmentUI() {
  // States
  const [sections, setSections] = useState<Section[]>([
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
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "singleChoice",
      question: "Which sorting algorithm has the best average time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      correctAnswer: 1,
      points: 2,
      expanded: true,
      sectionId: 1,
      userAnswer: null,
      flagged: false,
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
      userAnswer: [],
      flagged: false,
    },
    {
      id: 3,
      type: "trueFalse",
      question: "In JavaScript, '==' compares values without checking types.",
      isTrue: true,
      points: 1,
      expanded: false,
      sectionId: 1,
      userAnswer: null,
      flagged: false,
    },
    {
      id: 4,
      type: "fillBlank",
      question: "The process of finding and fixing errors in code is called _____.",
      answer: "debugging",
      alternativeAnswers: ["debug", "troubleshooting"],
      caseSensitive: false,
      points: 2,
      expanded: false,
      sectionId: 1,
      userAnswer: "",
      flagged: false,
    },
    {
      id: 5,
      type: "coding",
      question: "Write a function that returns the factorial of a given number.",
      sampleInput: "5",
      sampleOutput: "120",
      language: "javascript",
      boilerplateCode: "function factorial(n) {\n  // Your code here\n}",
      testCases: [
        { id: 1, input: "5", expectedOutput: "120", isHidden: false },
        { id: 2, input: "0", expectedOutput: "1", isHidden: false },
        { id: 3, input: "10", expectedOutput: "3628800", isHidden: true },
      ],
      points: 5,
      expanded: false,
      sectionId: 2,
      userAnswer: "function factorial(n) {\n  // Your code here\n}",
      flagged: false,
    },
    {
      id: 6,
      type: "shortAnswer",
      question: "What does API stand for?",
      acceptableAnswers: ["Application Programming Interface"],
      caseSensitive: false,
      points: 2,
      expanded: false,
      sectionId: 1,
      userAnswer: "",
      flagged: false,
    },
    {
      id: 7,
      type: "matching",
      question: "Match the programming language with its primary paradigm.",
      pairs: [
        { left: "Python", right: "Multi-paradigm" },
        { left: "Haskell", right: "Functional" },
        { left: "Java", right: "Object-oriented" },
        { left: "SQL", right: "Declarative" },
      ],
      points: 4,
      expanded: false,
      sectionId: 2,
      userAnswer: {},
      flagged: false,
    },
    {
      id: 8,
      type: "singleChoice",
      question: "Which of these is not a JavaScript framework?",
      options: ["Angular", "React", "Django", "Vue"],
      correctAnswer: 2,
      points: 2,
      expanded: false,
      sectionId: 1,
      userAnswer: null,
      flagged: false,
    },
    {
      id: 9,
      type: "fillBlank",
      question: "In SQL, the command to retrieve data from a database is _____.",
      answer: "SELECT",
      alternativeAnswers: ["SELECT", "select"],
      caseSensitive: false,
      points: 1,
      expanded: false,
      sectionId: 1,
      userAnswer: "",
      flagged: false,
    },
    {
      id: 10,
      type: "multipleChoice",
      question: "Which of these data structures are linear?",
      options: ["Array", "Tree", "Linked List", "Graph"],
      correctAnswers: [0, 2],
      points: 3,
      expanded: false,
      sectionId: 2,
      userAnswer: [],
      flagged: false,
    },
    {
      id: 11,
      type: "trueFalse",
      question: "HTTP is a stateless protocol.",
      isTrue: true,
      points: 1,
      expanded: false,
      sectionId: 2,
      userAnswer: null,
      flagged: false,
    },
    {
      id: 12,
      type: "shortAnswer",
      question: "What design pattern is used to create a single instance of a class?",
      acceptableAnswers: ["Singleton", "Singleton Pattern"],
      caseSensitive: false,
      points: 2,
      expanded: false,
      sectionId: 2,
      userAnswer: "",
      flagged: false,
    },
    {
      id: 13,
      type: "coding",
      question: "Write a function to reverse a string.",
      language: "javascript",
      boilerplateCode: "function reverseString(str) {\n  // Your code here\n}",
      testCases: [
        { id: 1, input: '"hello"', expectedOutput: '"olleh"', isHidden: false },
        { id: 2, input: '""', expectedOutput: '""', isHidden: false },
      ],
      points: 3,
      expanded: false,
      sectionId: 1,
      userAnswer: "function reverseString(str) {\n  // Your code here\n}",
      flagged: false,
    },
    {
      id: 14,
      type: "singleChoice",
      question: "Which symbol is used for the spread operator in JavaScript?",
      options: ["&", "...", "*", "=>"],
      correctAnswer: 1,
      points: 1,
      expanded: false,
      sectionId: 1,
      userAnswer: null,
      flagged: false,
    },
    {
      id: 15,
      type: "matching",
      question: "Match the HTTP status code with its meaning.",
      pairs: [
        { left: "200", right: "OK" },
        { left: "404", right: "Not Found" },
        { left: "500", right: "Internal Server Error" },
        { left: "301", right: "Moved Permanently" },
      ],
      points: 4,
      expanded: false,
      sectionId: 2,
      userAnswer: {},
      flagged: false,
    },
    {
      id: 16,
      type: "multipleChoice",
      question: "Which of these are valid CSS selectors?",
      options: [".class", "#id", "*element", "&hover"],
      correctAnswers: [0, 1],
      points: 2,
      expanded: false,
      sectionId: 1,
      userAnswer: [],
      flagged: false,
    },
    {
      id: 17,
      type: "fillBlank",
      question: "The command to create a new Git branch is git _____ branch-name.",
      answer: "checkout -b",
      alternativeAnswers: ["checkout -b", "branch"],
      caseSensitive: false,
      points: 2,
      expanded: false,
      sectionId: 2,
      userAnswer: "",
      flagged: false,
    },
    {
      id: 18,
      type: "trueFalse",
      question: "CSS stands for Cascading Style Sheets.",
      isTrue: true,
      points: 1,
      expanded: false,
      sectionId: 1,
      userAnswer: null,
      flagged: false,
    },
  ]);

  // UI States
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(1);

  useEffect(() => {
    // Set default theme to light mode on initial page load
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  }, []);
  // Format time remaining as MM:SS
  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err: any) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle start assessment
  const startAssessment = () => {
    setWelcomeScreen(false);
    setIsTimerRunning(true);
    toggleFullScreen();
  };

  // Handle identity verification
  const verifyIdentity = () => {
    setShowCamera(true);
  };

  const completeVerification = () => {
    setShowCamera(false);
    setIsIdentityVerified(true);
  };

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (isTimerRunning && timeRemaining > 0 && !assessmentSubmitted) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !assessmentSubmitted) {
      handleSubmitAssessment();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeRemaining, assessmentSubmitted]);

  // Calculate stats
  const answeredQuestions = questions.filter((q) => {
    if (q.type === "singleChoice" || q.type === "trueFalse") {
      return q.userAnswer !== null;
    } else if (q.type === "multipleChoice") {
      return Array.isArray(q.userAnswer) && q.userAnswer.length > 0;
    } else if (q.type === "fillBlank" || q.type === "shortAnswer" || q.type === "coding") {
      return typeof q.userAnswer === "string" && q.userAnswer.trim() !== "";
    } else if (q.type === "matching") {
      return typeof q.userAnswer === "object" && Object.keys(q.userAnswer).length === q.pairs?.length;
    }
    return false;
  }).length;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const flaggedQuestions = questions.filter((q) => q.flagged).length;

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: any) => {
    setCurrentQuestionIndex(index);
    if (window.innerWidth < 768 && !gridView) {
      setSidebarCollapsed(true);
    }
  };

  // Handle flag toggle
  const toggleFlag = (index: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].flagged = !updatedQuestions[index].flagged;
    setQuestions(updatedQuestions);
  };

  // Handle question answers
  const handleAnswerChange = (questionIndex: any, answer: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  // Handle matching question answers
  const handleMatchingAnswer = (questionIndex: any, leftId: any, rightId: any) => {
    const updatedQuestions = [...questions];
    const currentAnswers = { ...updatedQuestions[questionIndex].userAnswer };
    currentAnswers[leftId] = rightId;
    updatedQuestions[questionIndex].userAnswer = currentAnswers;
    setQuestions(updatedQuestions);
  };

  // Handle multiple choice answers
  const handleMultipleChoiceAnswer = (questionIndex: any, optionIndex: any) => {
    const updatedQuestions = [...questions];
    const currentAnswers = [...(updatedQuestions[questionIndex].userAnswer || [])];

    const optionPosition = currentAnswers.indexOf(optionIndex);
    if (optionPosition === -1) {
      currentAnswers.push(optionIndex);
    } else {
      currentAnswers.splice(optionPosition, 1);
    }

    updatedQuestions[questionIndex].userAnswer = currentAnswers;
    setQuestions(updatedQuestions);
  };

  // Handle submission
  const handleSubmitAssessment = () => {
    if (confirmSubmit) {
      setAssessmentSubmitted(true);
      setIsTimerRunning(false);
    } else {
      setConfirmSubmit(true);
    }
  };

  // Cancel submission
  const cancelSubmit = () => {
    setConfirmSubmit(false);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Get questions by section
  const questionsBySection = sections.map((section: any) => ({
    section,
    questions: questions.filter((q) => q.sectionId === section.id),
  }));

  // Helper function to get global index from question ID
  const getGlobalIndex = (questionId: number) => {
    return questions.findIndex((q) => q.id === questionId);
  };

  // Question Type Icons
  const getQuestionTypeIcon = (type: any) => {
    switch (type) {
      case "singleChoice":
        return "⭕";
      case "multipleChoice":
        return "☑️";
      case "trueFalse":
        return "❓";
      case "fillBlank":
        return "➖";
      case "coding":
        return "💻";
      case "shortAnswer":
        return "✏️";
      case "matching":
        return "🔄";
      default:
        return "❓";
    }
  };

  // Render question grid
  const renderQuestionGrid = () => {
    return (
      <div className='w-full h-full p-6'>
        {questionsBySection.map(({ section, questions: sectionQuestions }: any) => (
          <div key={section.id} className={`mb-8 p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}>
            <h2 className='text-xl font-bold mb-4'>{section.title}</h2>
            <p className='text-gray-500 dark:text-gray-400 mb-6'>{section.description}</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {sectionQuestions.map((question: any) => {
                const globalIndex = getGlobalIndex(question.id);
                const isAnswered = question.type === "singleChoice" || question.type === "trueFalse" 
                  ? question.userAnswer !== null 
                  : question.type === "multipleChoice" 
                    ? Array.isArray(question.userAnswer) && question.userAnswer.length > 0 
                    : question.type === "fillBlank" || question.type === "shortAnswer" || question.type === "coding" 
                      ? typeof question.userAnswer === "string" && question.userAnswer.trim() !== "" 
                      : question.type === "matching" 
                        ? typeof question.userAnswer === "object" && Object.keys(question.userAnswer).length === question.pairs?.length 
                        : false;

                return (
                  <button
                    key={question.id}
                    onClick={() => {
                      goToQuestion(globalIndex);
                      setGridView(false);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                      ${question.flagged ? "border-yellow-500" : isAnswered ? (darkMode ? "border-green-600" : "border-green-500") : darkMode ? "border-gray-700" : "border-gray-300"}
                      ${currentQuestionIndex === globalIndex ? (darkMode ? "bg-blue-900 text-white" : "bg-blue-50") : darkMode ? "bg-gray-800" : "bg-white"}
                    `}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <span
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                        ${isAnswered ? (darkMode ? "bg-green-700 text-white" : "bg-green-500 text-white") : darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"}
                      `}
                      >
                        {globalIndex + 1}
                      </span>
                      <div className='flex gap-1'>
                        <span title={question.type} className='text-lg'>
                          {getQuestionTypeIcon(question.type)}
                        </span>
                        {question.flagged && <Flag className='h-5 w-5 text-yellow-500' />}
                      </div>
                    </div>
                    <div className='text-left'>
                      <p className='text-sm font-medium line-clamp-2'>{question.question}</p>
                      <div className='flex justify-between items-center mt-3'>
                        <span
                          className={`text-xs px-2 py-1 rounded-full
                          ${darkMode ? "bg-gray-700" : "bg-gray-200"}
                        `}
                        >
                          {question.points} {question.points === 1 ? "pt" : "pts"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render question component
  const renderQuestion = (question: any, index: any) => {
    if (!question) return null;

    const progressPercentage = ((index + 1) / questions.length) * 100;

    return (
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-4`}>
        {/* Question navigation header */}
        <div className={`flex justify-between items-center pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className='flex items-center gap-2'>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
              ${darkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-blue-800"}
            `}
            >
              {index + 1}
            </div>
            <div>
              <div className='text-sm opacity-75'>
                Question {index + 1} of {questions.length}
              </div>
              <div className='flex flex-wrap gap-2 mt-1'>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full
                  ${darkMode ? "bg-gray-700" : "bg-gray-200"}
                `}
                >
                  {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full
                  ${darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800"}
                `}
                >
                  {question.points} {question.points === 1 ? "point" : "points"}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full
                  ${darkMode ? "bg-purple-900 text-purple-100" : "bg-purple-100 text-purple-800"}
                `}
                >
                  {sections.find((s: any) => s.id === question.sectionId)?.title}
                </span>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <button
              onClick={() => toggleFlag(index)}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                ${question.flagged ? "text-yellow-500" : "text-gray-400"}
              `}
              title={question.flagged ? "Remove flag" : "Flag for review"}
            >
              <Flag className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className='mt-2 mb-6'>
          <div className={`h-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full w-full`}>
            <div className='h-1 bg-blue-500 rounded-full transition-all duration-300' style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>

        {/* Question content */}
        <div className='py-6'>
          <h3 className='text-xl font-medium mb-6'>{question.question}</h3>

          {/* Render specific question type UI */}
          {question.type === "singleChoice" && (
            <div className='space-y-3 mt-6'>
              {question.options?.map((option: any, optionIndex: any) => (
                <label
                  key={optionIndex}
                  className={`flex items-center w-full p-4 rounded-lg border cursor-pointer transition-colors
                    ${question.userAnswer === optionIndex ? (darkMode ? "border-blue-500 bg-blue-900 bg-opacity-20" : "border-blue-500 bg-blue-50") : darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}
                  `}
                >
                  <input type='radio' className='form-radio h-5 w-5 text-blue-500' checked={question.userAnswer === optionIndex} onChange={() => handleAnswerChange(index, optionIndex)} />
                  <span className='ml-3'>{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "multipleChoice" && (
            <div className='space-y-3 mt-6'>
              {question.options?.map((option: any, optionIndex: any) => (
                <label
                  key={optionIndex}
                  className={`flex items-center w-full p-4 rounded-lg border cursor-pointer transition-colors
                    ${(question.userAnswer || []).includes(optionIndex) ? (darkMode ? "border-blue-500 bg-blue-900 bg-opacity-20" : "border-blue-500 bg-blue-50") : darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}
                  `}
                >
                  <input type='checkbox' className='form-checkbox h-5 w-5 text-blue-500' checked={(question.userAnswer || []).includes(optionIndex)} onChange={() => handleMultipleChoiceAnswer(index, optionIndex)} />
                  <span className='ml-3'>{option}</span>
                </label>
              ))}
              <p className='text-sm italic opacity-70 mt-2'>Select all that apply</p>
            </div>
          )}

          {question.type === "trueFalse" && (
            <div className='flex gap-4 mt-6'>
              <label
                className={`flex items-center p-6 rounded-lg border cursor-pointer transition-colors flex-1 justify-center
                  ${question.userAnswer === true ? (darkMode ? "border-blue-500 bg-blue-900 bg-opacity-20" : "border-blue-500 bg-blue-50") : darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}
                `}
              >
                <input type='radio' className='form-radio h-5 w-5 text-blue-500' checked={question.userAnswer === true} onChange={() => handleAnswerChange(index, true)} />
                <span className='ml-3 font-medium text-lg'>True</span>
              </label>
              <label
                className={`flex items-center p-6 rounded-lg border cursor-pointer transition-colors flex-1 justify-center
                  ${question.userAnswer === false ? (darkMode ? "border-blue-500 bg-blue-900 bg-opacity-20" : "border-blue-500 bg-blue-50") : darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}
                `}
              >
                <input type='radio' className='form-radio h-5 w-5 text-blue-500' checked={question.userAnswer === false} onChange={() => handleAnswerChange(index, false)} />
                <span className='ml-3 font-medium text-lg'>False</span>
              </label>
            </div>
          )}

          {question.type === "fillBlank" && (
            <div className='mt-6'>
              <h3 className='text-lg font-medium'>
                {question.question.split("_____").map((part: any, i: any, arr: any) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <input
                        type='text'
                        className={`border-b-2 border-blue-500 mx-1 px-2 py-1 focus:outline-none min-w-32 bg-transparent
                          ${darkMode ? "text-white" : "text-black"}
                        `}
                        value={question.userAnswer || ""}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder='Enter answer'
                      />
                    )}
                  </span>
                ))}
              </h3>
            </div>
          )}

          {question.type === "shortAnswer" && (
            <div className='mt-6'>
              <input
                type='text'
                className={`w-full p-4 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none
                  ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}
                `}
                placeholder='Enter your answer'
                value={question.userAnswer || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          )}

          {question.type === "coding" && (
            <div className='grid md:grid-cols-2 gap-6 mt-6'>
              <div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-medium'>Code Editor</span>
                  <div className='text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700'>{question.language}</div>
                </div>
                <textarea
                  className={`w-full h-64 p-4 font-mono text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none
          ${darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-gray-50 border-gray-300"}
        `}
                  value={question.userAnswer || question.boilerplateCode || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder='Write your code here...'
                />
              </div>
              <div>
                <div className='mb-4'>
                  <div className='font-medium mb-2'>Sample Input</div>
                  <div
                    className={`p-3 rounded-lg font-mono text-sm
          ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100"}
        `}
                  >
                    {question.sampleInput}
                  </div>
                </div>
                <div>
                  <div className='font-medium mb-2'>Expected Output</div>
                  <div
                    className={`p-3 rounded-lg font-mono text-sm
          ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100"}
        `}
                  >
                    {question.sampleOutput}
                  </div>
                </div>

                <div className='mt-4'>
                  <div className='font-medium mb-2'>Test Cases</div>
                  <div className='space-y-2'>
                    {question.testCases
                      ?.filter((test: any) => !test.isHidden)
                      .map((test: any) => (
                        <div
                          key={test.id}
                          className={`p-3 rounded-lg text-sm border
                ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}
              `}
                        >
                          <div className='flex justify-between text-xs mb-1'>
                            <span>Input:</span>
                            <span>Expected Output:</span>
                          </div>
                          <div className='flex justify-between font-mono'>
                            <span>{test.input}</span>
                            <span>{test.expectedOutput}</span>
                          </div>
                        </div>
                      ))}
                    {question.testCases?.filter((test: any) => test.isHidden).length > 0 && (
                      <div
                        className={`p-3 rounded-lg text-sm flex items-center gap-2
              ${darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-500"}
            `}
                      >
                        <EyeOff className='w-4 h-4' />
                        <span>{question.testCases.filter((test: any) => test.isHidden).length} hidden test case(s)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {question.type === "matching" && (
            <div className='mt-6'>
              <div className='grid md:grid-cols-2 gap-8'>
                <div className='space-y-3'>
                  <h4 className='font-medium mb-2'>Items</h4>
                  {question.pairs?.map((pair: any, pairIndex: any) => (
                    <div
                      key={pairIndex}
                      className={`p-4 rounded-lg border
              ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
            `}
                    >
                      {pair.left}
                    </div>
                  ))}
                </div>

                <div className='space-y-3'>
                  <h4 className='font-medium mb-2'>Matches</h4>
                  {question.pairs?.map((pair: any, pairIndex: any) => (
                    <select
                      key={pairIndex}
                      className={`w-full p-4 rounded-lg border appearance-none
              ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"}
            `}
                      value={question.userAnswer?.[pairIndex] ?? ""}
                      onChange={(e) => handleMatchingAnswer(index, pairIndex, parseInt(e.target.value))}
                    >
                      <option value=''>-- Select a match --</option>
                      {question.pairs?.map((matchPair: any, matchIndex: any) => (
                        <option key={matchIndex} value={matchIndex}>
                          {matchPair.right}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              </div>

              <div className='mt-6'>
                {question.pairs?.map((pair: any, pairIndex: any) => {
                  if (question.userAnswer?.[pairIndex] !== undefined) {
                    const matchedWith = question.pairs[question.userAnswer[pairIndex]].right;
                    return (
                      <div key={pairIndex} className='flex items-center gap-3 mb-2'>
                        <div
                          className={`px-3 py-2 rounded
                ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"}
              `}
                        >
                          {pair.left}
                        </div>
                        <ArrowRight className='w-4 h-4' />
                        <div
                          className={`px-3 py-2 rounded
                ${darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"}
              `}
                        >
                          {matchedWith}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className='flex justify-between items-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700'>
            <button
              onClick={goToPreviousQuestion}
              disabled={index === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg
      ${index === 0 ? "opacity-50 cursor-not-allowed" : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}
    `}
            >
              <ChevronLeft className='w-5 h-5' />
              Previous
            </button>

            <button
              onClick={goToNextQuestion}
              disabled={index === questions.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg
      ${index === questions.length - 1 ? "opacity-50 cursor-not-allowed" : darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600 text-white"}
    `}
            >
              Next
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render final page when assessment is submitted
  const renderSubmittedPage = () => {
    return (
      <div
        className={`flex flex-col items-center justify-center h-full py-12
  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}
`}
      >
        <div
          className={`max-w-3xl w-full mx-auto p-8 rounded-lg shadow-lg
    ${darkMode ? "bg-gray-800" : "bg-white"}
  `}
        >
          <div className='flex flex-col items-center mb-8'>
            <CheckCircle className='w-16 h-16 text-green-500 mb-4' />
            <h2 className='text-2xl font-bold mb-2'>Assessment Submitted</h2>
            <p className='text-center text-gray-500 dark:text-gray-400'>Your assessment has been successfully submitted.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mb-8'>
            <div
              className={`p-6 rounded-lg text-center
        ${darkMode ? "bg-gray-700" : "bg-blue-50"}
      `}
            >
              <div className='text-3xl font-bold mb-2'>
                {answeredQuestions}/{questions.length}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>Questions Answered</div>
            </div>

            <div
              className={`p-6 rounded-lg text-center
        ${darkMode ? "bg-gray-700" : "bg-green-50"}
      `}
            >
              <div className='text-3xl font-bold mb-2'>
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>Time Remaining</div>
            </div>

            <div
              className={`p-6 rounded-lg text-center
        ${darkMode ? "bg-gray-700" : "bg-yellow-50"}
      `}
            >
              <div className='text-3xl font-bold mb-2'>{totalPoints}</div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>Total Points Possible</div>
            </div>
          </div>

          <p className='text-center mb-8'>Your instructor will review your answers and provide feedback soon.</p>

          <button
            className={`w-full py-3 rounded-lg font-medium text-center
        ${darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-600 text-white"}
      `}
            onClick={() => window.location.reload()}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  };

  // Render confirm submit modal
  const renderConfirmSubmitModal = () => {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div
          className={`max-w-md w-full p-6 rounded-lg shadow-lg
    ${darkMode ? "bg-gray-800" : "bg-white"}
  `}
        >
          <div className='flex flex-col items-center mb-6'>
            <AlertCircle className='w-12 h-12 text-yellow-500 mb-4' />
            <h2 className='text-xl font-bold mb-2'>Submit Assessment?</h2>
            <p className='text-center text-gray-500 dark:text-gray-400'>Are you sure you want to submit your assessment? You cannot change your answers after submission.</p>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-6'>
            <button
              className={`py-3 rounded-lg font-medium
          ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}
        `}
              onClick={cancelSubmit}
            >
              Continue Working
            </button>
            <button className='py-3 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white' onClick={handleSubmitAssessment}>
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render identity verification modal
  const renderIdentityVerificationModal = () => {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div
          className={`max-w-md w-full p-6 rounded-lg shadow-lg
    ${darkMode ? "bg-gray-800" : "bg-white"}
  `}
        >
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold'>Identity Verification</h2>
            <button onClick={() => setShowCamera(false)} className='p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
              <X className='w-5 h-5' />
            </button>
          </div>

          <div
            className={`aspect-video bg-black rounded-lg flex items-center justify-center mb-6
      ${darkMode ? "border border-gray-700" : ""}
    `}
          >
            {showCamera ? (
              <div className='relative w-full h-full'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Camera className='w-12 h-12 text-white opacity-20' />
                </div>
                {/* Camera would be initialized here in a real app */}
              </div>
            ) : (
              <div className='text-center p-8'>
                <Camera className='w-12 h-12 mx-auto mb-4 text-gray-500' />
                <p className='text-gray-500 dark:text-gray-400'>Camera access is required for identity verification</p>
              </div>
            )}
          </div>

          <p className='text-sm text-gray-500 dark:text-gray-400 mb-6'>Please position your face within the frame and click "Verify" to confirm your identity</p>

          <button className='w-full py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600' onClick={completeVerification}>
            Verify Identity
          </button>
        </div>
      </div>
    );
  };

  // Render welcome screen
  const renderWelcomeScreen = () => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center
  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}
`}
      >
        <div
          className={`max-w-3xl w-full mx-auto p-8 rounded-lg shadow-lg
    ${darkMode ? "bg-gray-800" : "bg-white"}
  `}
        >
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold mb-2'>Programming Skills Assessment</h1>
            <p className='text-gray-500 dark:text-gray-400'>Welcome to your programming assessment. Please read the instructions carefully before beginning.</p>
          </div>

          {showInstructions && (
            <div
              className={`p-6 rounded-lg mb-8
        ${darkMode ? "bg-gray-700" : "bg-gray-50"}
      `}
            >
              <h2 className='text-xl font-bold mb-4'>Instructions</h2>
              <ul className='space-y-3 list-disc pl-6'>
                <li>
                  This assessment contains {questions.length} questions worth a total of {totalPoints} points.
                </li>
                <li>You have 60 minutes to complete the assessment.</li>
                <li>Answer all questions to the best of your ability.</li>
                <li>You can flag questions to review later.</li>
                <li>For coding questions, make sure to test your solutions before submitting.</li>
                <li>Once you submit the assessment, you cannot change your answers.</li>
                <li>The assessment must be completed in one sitting.</li>
                <li>The assessment will be submitted automatically when the time expires.</li>
                <li>Identity verification is required before beginning.</li>
              </ul>
            </div>
          )}

          <div className='flex flex-col space-y-4'>
            {!isIdentityVerified ? (
              <button className='w-full py-3 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white' onClick={verifyIdentity}>
                Verify Identity to Begin
              </button>
            ) : (
              <button className='w-full py-3 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white' onClick={startAssessment}>
                Begin Assessment
              </button>
            )}
            <button
              className={`w-full py-3 rounded-lg font-medium
          ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}
        `}
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {welcomeScreen ? (
        renderWelcomeScreen()
      ) : assessmentSubmitted ? (
        renderSubmittedPage()
      ) : (
        <div className='relative h-screen flex flex-col'>
          {/* Header */}
          <header
            className={`p-4 flex items-center justify-between shadow-md
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
          >
            <div className='flex items-center space-x-4'>
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                {sidebarCollapsed ? <Menu className='w-5 h-5' /> : <X className='w-5 h-5' />}
              </button>
              <h1 className='text-xl font-bold'>Programming Assessment</h1>
            </div>

            <div className='flex items-center space-x-4'>
              <div
                className={`px-4 py-2 rounded-full font-mono
            ${darkMode ? "bg-gray-700" : "bg-gray-100"}
          `}
              >
                <Clock className='w-4 h-4 inline-block mr-2' />
                {formatTime(timeRemaining)}
              </div>

              <div className='flex space-x-2'>
                <button onClick={toggleFullScreen} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700' title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}>
                  {isFullScreen ? <Minimize className='w-5 h-5' /> : <Maximize className='w-5 h-5' />}
                </button>
                <button onClick={toggleDarkMode} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700' title={darkMode ? "Light mode" : "Dark mode"}>
                  {darkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
                </button>
                <button onClick={() => setGridView(!gridView)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700' title={gridView ? "Question view" : "Grid view"}>
                  {gridView ? <Layout className='w-5 h-5' /> : <Grid className='w-5 h-5' />}
                </button>
              </div>

              <button onClick={() => setConfirmSubmit(true)} className='px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'>
                Submit Assessment
              </button>
            </div>
          </header>

          {/* Main content */}
          <div className='flex flex-1 overflow-hidden'>
            {/* Sidebar */}
            <aside
              className={`
            ${sidebarCollapsed ? "hidden md:w-0 md:min-w-0" : "w-64 md:w-72"}
            transition-all duration-300 overflow-y-auto
            ${darkMode ? "bg-gray-800" : "bg-white"}
            ${sidebarCollapsed ? "md:hidden" : ""}
          `}
            >
              <div className='p-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='font-bold'>Questions</h2>
                  <div className='text-sm'>
                    {answeredQuestions}/{questions.length} answered
                  </div>
                </div>

                <div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6'>
                  <div className='h-2 bg-blue-500 rounded-full transition-all' style={{ width: `${(answeredQuestions / questions.length) * 100}%` }} />
                </div>

                <div className='flex gap-2 mb-4 flex-wrap'>
                  <div className='text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'>{answeredQuestions} Answered</div>
                  <div className='text-xs px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'>{flaggedQuestions} Flagged</div>
                  <div className='text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'>{questions.length - answeredQuestions} Unanswered</div>
                </div>

                {sections.map((section) => (
                  <div key={section.id} className='mb-4'>
                    <button
                      className={`w-full text-left p-2 rounded-lg mb-2 flex justify-between items-center
                    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                  `}
                      onClick={() => {
                        const updatedSections = sections.map((s) => ({
                          ...s,
                          expanded: s.id === section.id ? !s.expanded : s.expanded,
                        }));
                        setSections(updatedSections);
                      }}
                    >
                      <span className='font-medium'>{section.title}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${section.expanded ? "transform rotate-90" : ""}`} />
                    </button>

                    {section.expanded && (
                      <div className='ml-2 space-y-1'>
                        {questions
                          .filter((q) => q.sectionId === section.id)
                          .map((question) => {
                            const globalIndex = getGlobalIndex(question.id);
                            const isAnswered = question.type === "singleChoice" || question.type === "trueFalse" 
                              ? question.userAnswer !== null 
                              : question.type === "multipleChoice" 
                                ? Array.isArray(question.userAnswer) && question.userAnswer.length > 0 
                                : question.type === "fillBlank" || question.type === "shortAnswer" || question.type === "coding" 
                                  ? typeof question.userAnswer === "string" && question.userAnswer.trim() !== "" 
                                  : question.type === "matching" 
                                    ? typeof question.userAnswer === "object" && Object.keys(question.userAnswer).length === question.pairs?.length 
                                    : false;

                            return (
                              <button
                                key={question.id}
                                className={`w-full flex items-center p-2 rounded-lg text-left
                              ${globalIndex === currentQuestionIndex ? (darkMode ? "bg-blue-900" : "bg-blue-100") : darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                            `}
                                onClick={() => goToQuestion(globalIndex)}
                              >
                                <span
                                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs mr-2
                                ${isAnswered ? (darkMode ? "bg-green-700 text-white" : "bg-green-500 text-white") : darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-700"}
                              `}
                                >
                                  {globalIndex + 1}
                                </span>
                                <span className='truncate flex-1'>{question.question.substring(0, 20)}...</span>
                                <div className='flex items-center gap-1'>
                                  {question.flagged && <Flag className='w-4 h-4 text-yellow-500' />}
                                  <span className='text-xs px-1.5 rounded bg-gray-200 dark:bg-gray-700'>{question.points}</span>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Main question area */}
            <main className='flex-1 overflow-y-auto p-4'>{gridView ? renderQuestionGrid() : renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}</main>
          </div>
        </div>
      )}

      {/* Modals */}
      {confirmSubmit && renderConfirmSubmitModal()}
      {showCamera && renderIdentityVerificationModal()}
    </div>
  );
}
