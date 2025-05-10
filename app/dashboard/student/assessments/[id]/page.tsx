"use client"
import { useState, useEffect, ReactElement } from "react";
import { Clock, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Flag, Eye, EyeOff, Save, CheckSquare, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

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
  type: 'singleChoice' | 'multipleChoice' | 'trueFalse' | 'fillBlank' | 'coding' | 'shortAnswer' | 'matching';
  question: string;
  points: number;
  expanded: boolean;
  sectionId: number;
  flagged: boolean;
  userAnswer: any; // This will be properly typed based on question type
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

interface QuestionProps {
  question: Question;
  index: number;
  onChange: (index: number, answer: any) => void;
}

interface MatchingQuestionProps {
  question: Question;
  index: number;
  onChange: (index: number, leftId: number, rightId: number) => void;
}

// Main assessment component
export default function AssessmentUI() {
  // Sample data - in a real app this would come from an API
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
      sectionId: 2,
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
  ]);

  // Timer settings
  const initialTime = 60 * 60; // 60 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // UI state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestionList, setShowQuestionList] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [confirmSubmit, setConfirmSubmit] = useState<boolean>(false);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Format time remaining as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0 && !assessmentSubmitted) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !assessmentSubmitted) {
      handleSubmitAssessment();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeRemaining, assessmentSubmitted]);

  // Calculate the number of questions answered
  const answeredQuestions = questions.filter((q) => {
    if (q.type === "singleChoice" || q.type === "trueFalse") {
      return q.userAnswer !== null;
    } else if (q.type === "multipleChoice") {
      return Array.isArray(q.userAnswer) && q.userAnswer.length > 0;
    } else if (q.type === "fillBlank" || q.type === "shortAnswer" || q.type === "coding") {
      return typeof q.userAnswer === 'string' && q.userAnswer.trim() !== "";
    } else if (q.type === "matching") {
      return typeof q.userAnswer === 'object' && Object.keys(q.userAnswer).length === q.pairs?.length;
    }
    return false;
  }).length;

  // Calculate total points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  // Calculate flagged questions
  const flaggedQuestions = questions.filter((q) => q.flagged).length;

  // Handle question navigation
  const goToNextQuestion = (): void => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number): void => {
    setCurrentQuestionIndex(index);
    if (window.innerWidth < 768) {
      setShowQuestionList(false);
    }
  };

  // Handle flag toggle
  const toggleFlag = (index: number): void => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].flagged = !updatedQuestions[index].flagged;
    setQuestions(updatedQuestions);
  };

  // Handle question answers
  const handleAnswerChange = (questionIndex: number, answer: any): void => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  // Handle matching question answers
  const handleMatchingAnswer = (questionIndex: number, leftId: number, rightId: number): void => {
    const updatedQuestions = [...questions];
    const currentAnswers = { ...updatedQuestions[questionIndex].userAnswer };
    currentAnswers[leftId] = rightId;
    updatedQuestions[questionIndex].userAnswer = currentAnswers;
    setQuestions(updatedQuestions);
  };

  // Handle multiple choice answers
  const handleMultipleChoiceAnswer = (questionIndex: number, optionIndex: number): void => {
    const updatedQuestions = [...questions];
    const currentAnswers = [...(updatedQuestions[questionIndex].userAnswer as number[])];

    const optionPosition = currentAnswers.indexOf(optionIndex);
    if (optionPosition === -1) {
      currentAnswers.push(optionIndex);
    } else {
      currentAnswers.splice(optionPosition, 1);
    }

    updatedQuestions[questionIndex].userAnswer = currentAnswers;
    setQuestions(updatedQuestions);
  };

  // Handle assessment submission
  const handleSubmitAssessment = (): void => {
    if (confirmSubmit) {
      // In a real app, this would send data to a server
      setAssessmentSubmitted(true);
      setIsTimerRunning(false);
    } else {
      setConfirmSubmit(true);
    }
  };

  // Cancel submission
  const cancelSubmit = (): void => {
    setConfirmSubmit(false);
  };

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  // Get questions for current section
  const questionsForCurrentSection = questions.filter((q) => q.sectionId === sections[0].id);

  // Render appropriate question component based on type
  const renderQuestion = (question: Question, index: number): ReactElement => {
    switch (question.type) {
      case "singleChoice":
        return <SingleChoiceQuestion question={question} index={index} onChange={handleAnswerChange} />;
      case "multipleChoice":
        return <MultipleChoiceQuestion question={question} index={index} onChange={handleMultipleChoiceAnswer} />;
      case "trueFalse":
        return <TrueFalseQuestion question={question} index={index} onChange={handleAnswerChange} />;
      case "fillBlank":
        return <FillBlankQuestion question={question} index={index} onChange={handleAnswerChange} />;
      case "coding":
        return <CodingQuestion question={question} index={index} onChange={handleAnswerChange} />;
      case "shortAnswer":
        return <ShortAnswerQuestion question={question} index={index} onChange={handleAnswerChange} />;
      case "matching":
        return <MatchingQuestion question={question} index={index} onChange={handleMatchingAnswer} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      {/* Header */}
      <header className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md py-3 px-4 flex items-center justify-between sticky top-0 z-10`}>
        <h1 className='text-xl font-bold'>Programming Assessment</h1>

        <div className='flex items-center space-x-4'>
          {/* Time remaining */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full 
            ${timeRemaining < 300 ? "bg-red-100 text-red-800" : timeRemaining < 600 ? "bg-yellow-100 text-yellow-800" : darkMode ? "bg-gray-700" : "bg-blue-100 text-blue-800"}`}
          >
            <Clock className='w-4 h-4' />
            <span className='font-mono font-bold'>{formatTime(timeRemaining)}</span>
          </div>

          {/* Progress indicator */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full 
            ${darkMode ? "bg-gray-700" : "bg-green-100 text-green-800"}`}
          >
            <CheckCircle className='w-4 h-4' />
            <span>
              {answeredQuestions}/{questions.length} Questions
            </span>
          </div>

          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className='container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6'>
        {/* Sidebar with question list */}
        <div className={`md:w-1/4 ${showQuestionList ? "block" : "hidden md:block"}`}>
          <div className={`sticky top-20 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-4`}>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='font-bold text-lg'>Questions</h2>
              <button onClick={() => setShowQuestionList(!showQuestionList)} className='md:hidden p-2 rounded-full bg-gray-200'>
                <ArrowLeft className='w-4 h-4' />
              </button>
            </div>

            {/* Progress bar */}
            <div className='mb-4'>
              <div className='flex justify-between text-sm mb-1'>
                <span>
                  {answeredQuestions} of {questions.length} answered
                </span>
                <span>{Math.round((answeredQuestions / questions.length) * 100)}%</span>
              </div>
              <div className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <div className='h-2 rounded-full bg-blue-500' style={{ width: `${(answeredQuestions / questions.length) * 100}%` }}></div>
              </div>
            </div>

            {/* Question navigation list */}
            <div className='space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto'>
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(index)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left text-sm
                    ${index === currentQuestionIndex ? (darkMode ? "bg-blue-900 text-white" : "bg-blue-500 text-white") : darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                    ${q.flagged ? (darkMode ? "border-l-4 border-yellow-500" : "border-l-4 border-yellow-500") : ""}
                  `}
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs 
                      ${q.userAnswer !== null && 
                        ((q.type === 'multipleChoice' && q.userAnswer.length > 0) || 
                         (q.type === 'fillBlank' && q.userAnswer.trim() !== '') || 
                         (q.type === 'shortAnswer' && q.userAnswer.trim() !== '') ||
                         (q.type === 'coding' && q.userAnswer !== q.boilerplateCode) ||
                         (q.type === 'matching' && Object.keys(q.userAnswer).length === q.pairs.length) ||
                         q.type === 'singleChoice' ||
                         q.type === 'trueFalse'
                        ) ? 
                        (darkMode ? 'bg-green-700 text-white' : 'bg-green-500 text-white') : 
                        (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300')}"
                    >
                      {index + 1}
                    </span>
                    <span className='truncate max-w-[120px]'>{q.question.length > 20 ? q.question.substring(0, 20) + "..." : q.question}</span>
                  </div>
                  <div className='flex items-center'>
                    {q.flagged && <Flag className='w-4 h-4 text-yellow-500' />}
                    <span className='text-xs ml-1'>{q.points} pts</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats at bottom of sidebar */}
            <div className={`mt-4 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} text-sm space-y-2`}>
              <div className='flex justify-between'>
                <span>Total Points:</span>
                <span className='font-bold'>{totalPoints}</span>
              </div>
              <div className='flex justify-between'>
                <span>Flagged Questions:</span>
                <span className={`font-bold ${flaggedQuestions > 0 ? "text-yellow-500" : ""}`}>{flaggedQuestions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main question area */}
        <div className='md:w-3/4'>
          {showQuestionList && !assessmentSubmitted && (
            <button onClick={() => setShowQuestionList(false)} className='md:hidden mb-4 flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md'>
              <ArrowRight /> View Current Question
            </button>
          )}

          {/* Instructions panel (shows only at start) */}
          {showInstructions && !assessmentSubmitted && (
            <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6 mb-6`}>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>Assessment Instructions</h2>
                <button onClick={() => setShowInstructions(false)} className={`p-1 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  ✕
                </button>
              </div>
              <div className='space-y-3'>
                <p>Welcome to your programming assessment! Please read the following instructions carefully:</p>
                <ul className='list-disc list-inside space-y-2'>
                  <li>
                    You have <strong>60 minutes</strong> to complete this assessment.
                  </li>
                  <li>
                    There are <strong>{questions.length} questions</strong> worth a total of <strong>{totalPoints} points</strong>.
                  </li>
                  <li>You can navigate between questions using the sidebar or the next/previous buttons.</li>
                  <li>Flag questions you want to review later by clicking the flag icon.</li>
                  <li>Your answers are saved automatically as you work.</li>
                  <li>Click "Submit Assessment" when you are finished or when time runs out.</li>
                </ul>
                <div className='mt-6 flex justify-end'>
                  <button onClick={() => setShowInstructions(false)} className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>
                    Begin Assessment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Question content */}
          {!assessmentSubmitted ? (
            <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg`}>
              {/* Question header */}
              <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
                <div className='flex items-center gap-2'>
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium 
                    ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    {currentQuestionIndex + 1}
                  </span>
                  <div>
                    <span className='text-sm opacity-75'>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>{questions[currentQuestionIndex].type === "singleChoice" ? "Single Choice" : questions[currentQuestionIndex].type === "multipleChoice" ? "Multiple Choice" : questions[currentQuestionIndex].type === "trueFalse" ? "True/False" : questions[currentQuestionIndex].type === "fillBlank" ? "Fill in the Blank" : questions[currentQuestionIndex].type === "coding" ? "Coding" : questions[currentQuestionIndex].type === "shortAnswer" ? "Short Answer" : questions[currentQuestionIndex].type === "matching" ? "Matching" : questions[currentQuestionIndex].type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"}`}>
                        {questions[currentQuestionIndex].points} {questions[currentQuestionIndex].points === 1 ? "point" : "points"}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleFlag(currentQuestionIndex)} className={`p-2 rounded-full ${questions[currentQuestionIndex].flagged ? "text-yellow-500" : darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-900"}`} title={questions[currentQuestionIndex].flagged ? "Unflag question" : "Flag for review"}>
                  <Flag className='w-5 h-5' />
                </button>
              </div>

              {/* Question content */}
              <div className='p-6'>{renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}</div>

              {/* Question navigation footer */}
              <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between`}>
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 flex items-center gap-2 rounded-md 
                    ${currentQuestionIndex === 0 ? (darkMode ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed") : darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}
                  `}
                >
                  <ChevronLeft className='w-5 h-5' />
                  Previous
                </button>

                <div className='flex gap-3'>
                  <button
                    onClick={() => setShowQuestionList(!showQuestionList)}
                    className={`md:hidden px-4 py-2 flex items-center gap-2 rounded-md 
                      ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    Questions
                  </button>

                  {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={handleSubmitAssessment} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2'>
                      <Save className='w-5 h-5' />
                      Submit Assessment
                    </button>
                  ) : (
                    <button onClick={goToNextQuestion} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2'>
                      Next
                      <ChevronRight className='w-5 h-5' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <SubmissionSummary questions={questions} totalPoints={totalPoints} darkMode={darkMode} />
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmSubmit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl p-6 max-w-md w-full`}>
            <div className='flex items-center gap-3 mb-4'>
              <AlertTriangle className='w-6 h-6 text-yellow-500' />
              <h3 className='text-xl font-bold'>Confirm Submission</h3>
            </div>
            <p className='mb-6'>
              Are you sure you want to submit your assessment? You have answered {answeredQuestions} out of {questions.length} questions.
            </p>
            <div className='flex justify-end gap-3'>
              <button onClick={cancelSubmit} className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>
                Cancel
              </button>
              <button onClick={handleSubmitAssessment} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile question list toggle */}
      {!showQuestionList && !assessmentSubmitted && (
        <button onClick={() => setShowQuestionList(true)} className='md:hidden fixed bottom-4 left-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg'>
          <CheckSquare className='w-6 h-6' />
        </button>
      )}
    </div>
  );
}

// Question component type definitions
function SingleChoiceQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}
      <div className='space-y-3 mt-4'>
        {question.options?.map((option, optionIndex) => (
          <div key={optionIndex} className='flex items-center'>
            <label className='flex items-center w-full p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
              <input 
                type='radio' 
                className='form-radio h-5 w-5 text-blue-500' 
                checked={question.userAnswer === optionIndex} 
                onChange={() => onChange(index, optionIndex)} 
              />
              <span className='ml-3'>{option}</span>
              {question.optionImages?.[optionIndex] && (
                <img 
                  src={question.optionImages[optionIndex]} 
                  alt={`Option ${optionIndex + 1}`} 
                  className='ml-4 h-10 object-contain' 
                />
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function MultipleChoiceQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}
      <div className='space-y-3 mt-4'>
        {question.options?.map((option, optionIndex) => (
          <div key={optionIndex} className='flex items-center'>
            <label className='flex items-center w-full p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
              <input 
                type='checkbox' 
                className='form-checkbox h-5 w-5 text-blue-500' 
                checked={(question.userAnswer as number[])?.includes(optionIndex)} 
                onChange={() => onChange(index, optionIndex)} 
              />
              <span className='ml-3'>{option}</span>
              {question.optionImages?.[optionIndex] && (
                <img 
                  src={question.optionImages[optionIndex]} 
                  alt={`Option ${optionIndex + 1}`} 
                  className='ml-4 h-10 object-contain' 
                />
              )}
            </label>
          </div>
        ))}
      </div>
      <p className='text-sm mt-3 italic opacity-70'>Select all that apply</p>
    </div>
  );
}

function TrueFalseQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}
      <div className='flex gap-4 mt-6'>
        <label className='flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 justify-center'>
          <input 
            type='radio' 
            className='form-radio h-5 w-5 text-blue-500' 
            checked={question.userAnswer === true} 
            onChange={() => onChange(index, true)} 
          />
          <span className='ml-3 font-medium'>True</span>
        </label>
        <label className='flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 justify-center'>
          <input 
            type='radio' 
            className='form-radio h-5 w-5 text-blue-500' 
            checked={question.userAnswer === false} 
            onChange={() => onChange(index, false)} 
          />
          <span className='ml-3 font-medium'>False</span>
        </label>
      </div>
    </div>
  );
}

function FillBlankQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>
        {question.question.split("_____").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <input 
                type='text' 
                className='border-b-2 border-blue-500 mx-1 px-1 py-0 focus:outline-none w-32 bg-transparent' 
                value={question.userAnswer as string} 
                onChange={(e) => onChange(index, e.target.value)} 
                placeholder='Enter answer' 
              />
            )}
          </span>
        ))}
      </h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}
      {question.images && question.images.length > 0 && (
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {question.images.map((img, imgIndex) => (
            <div key={imgIndex} className='border rounded-lg overflow-hidden'>
              <img src={img} alt={`Reference ${imgIndex + 1}`} className='w-full' />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CodingQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}

      <div className='grid md:grid-cols-2 gap-6 mt-6'>
        <div>
          <div className='flex justify-between items-center mb-2'>
            <h4 className='font-medium'>Your Solution ({question.language})</h4>
            <div className='text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
              {question.language}
            </div>
          </div>
          <textarea 
            className='w-full h-64 p-3 font-mono text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none bg-gray-50 dark:bg-gray-900' 
            value={question.userAnswer as string} 
            onChange={(e) => onChange(index, e.target.value)}
          />
        </div>

        <div>
          <div className='space-y-4'>
            <div>
              <h4 className='font-medium mb-2'>Sample Input</h4>
              <div className='p-3 font-mono text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-x-auto'>
                {question.sampleInput}
              </div>
            </div>

            <div>
              <h4 className='font-medium mb-2'>Expected Output</h4>
              <div className='p-3 font-mono text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-x-auto'>
                {question.sampleOutput}
              </div>
            </div>

            <div>
              <h4 className='font-medium mb-2'>Test Cases</h4>
              <div className='space-y-2'>
                {question.testCases
                  ?.filter((tc) => !tc.isHidden)
                  .map((testCase) => (
                    <div key={testCase.id} className='p-3 border rounded-lg bg-gray-50 dark:bg-gray-900'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div>
                          <div className='text-xs text-gray-500 mb-1'>Input:</div>
                          <div className='font-mono text-sm'>{testCase.input}</div>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500 mb-1'>Expected Output:</div>
                          <div className='font-mono text-sm'>{testCase.expectedOutput}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                {question.testCases?.some((tc) => tc.isHidden) && (
                  <div className='text-xs italic opacity-70 mt-1'>
                    + {question.testCases.filter((tc) => tc.isHidden).length} hidden test case(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortAnswerQuestion({ question, index, onChange }: QuestionProps): ReactElement {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}
      <div className='mt-6'>
        <input 
          type='text' 
          className='w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none bg-transparent' 
          placeholder='Enter your answer' 
          value={question.userAnswer as string} 
          onChange={(e) => onChange(index, e.target.value)} 
        />
      </div>
    </div>
  );
}

function MatchingQuestion({ question, index, onChange }: MatchingQuestionProps): ReactElement {
  // Create arrays of left and right items for drag/drop matching
  const leftItems = question.pairs?.map((pair, i) => ({ id: i, text: pair.left })) || [];
  const rightItems = question.pairs?.map((pair, i) => ({ id: i, text: pair.right })) || [];

  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>{question.question}</h3>
      {question.imageUrl && (
        <div className='mb-4'>
          <img src={question.imageUrl} alt='Question' className='max-w-full rounded-lg shadow-sm' />
        </div>
      )}

      <div className='mt-6 space-y-4'>
        {leftItems.map((leftItem) => (
          <div key={leftItem.id} className='flex items-center gap-4'>
            <div className='w-1/2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900'>{leftItem.text}</div>
            <div className='w-8 text-center'>→</div>
            <div className='w-1/2'>
              <select 
                className='w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none bg-transparent' 
                value={(question.userAnswer as Record<number, number>)[leftItem.id]?.toString() || ""} 
                onChange={(e) => {
                  const rightId = e.target.value !== "" ? parseInt(e.target.value) : -1;
                  if (rightId !== -1) {
                    onChange(index, leftItem.id, rightId);
                  }
                }}
              >
                <option value=''>-- Select match --</option>
                {rightItems.map((rightItem) => (
                  <option 
                    key={rightItem.id} 
                    value={rightItem.id} 
                    disabled={Object.values(question.userAnswer as Record<number, number>).includes(rightItem.id) && 
                             (question.userAnswer as Record<number, number>)[leftItem.id] !== rightItem.id}
                  >
                    {rightItem.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SubmissionSummaryProps {
  questions: Question[];
  totalPoints: number;
  darkMode: boolean;
}

function SubmissionSummary({ questions, totalPoints, darkMode }: SubmissionSummaryProps): ReactElement {
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate score calculation
    const timer = setTimeout(() => {
      // For demo, calculate a random score between 60-95% of total points
      const calculatedScore = Math.floor(totalPoints * (0.6 + Math.random() * 0.35));
      setScore(calculatedScore);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [totalPoints]);

  // Group questions by section
  const sectionMap = questions.reduce<Record<number, Question[]>>((acc, question) => {
    if (!acc[question.sectionId]) {
      acc[question.sectionId] = [];
    }
    acc[question.sectionId].push(question);
    return acc;
  }, {});

  // Calculate score per section
  const sectionScores = Object.keys(sectionMap).map((sectionId) => {
    const sectionQuestions = sectionMap[parseInt(sectionId)];
    const sectionTotalPoints = sectionQuestions.reduce((sum, q) => sum + q.points, 0);
    // For demo, calculate random section scores that sum up to the total score
    const sectionScore = Math.floor(sectionTotalPoints * (score / totalPoints) * (0.8 + Math.random() * 0.4));
    return {
      sectionId: parseInt(sectionId),
      title: sectionId === "1" ? "Basic Programming Concepts" : "Advanced Topics",
      totalPoints: sectionTotalPoints,
      score: Math.min(sectionScore, sectionTotalPoints), // Ensure section score doesn't exceed max
    };
  });

  // Ensure section scores sum to total score
  const sumSectionScores = sectionScores.reduce((sum, s) => sum + s.score, 0);
  if (sumSectionScores !== score) {
    const diff = score - sumSectionScores;
    sectionScores[0].score += diff;
  }

  if (loading) {
    return (
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8 text-center`}>
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4'></div>
          <h3 className='text-xl font-semibold'>Calculating Your Score</h3>
          <p className='mt-2 opacity-75'>Please wait while we evaluate your answers...</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalPoints) * 100);
  let grade = "";
  let gradeColor = "";

  if (percentage >= 90) {
    grade = "A";
    gradeColor = darkMode ? "text-green-400" : "text-green-600";
  } else if (percentage >= 80) {
    grade = "B";
    gradeColor = darkMode ? "text-blue-400" : "text-blue-600";
  } else if (percentage >= 70) {
    grade = "C";
    gradeColor = darkMode ? "text-yellow-400" : "text-yellow-600";
  } else if (percentage >= 60) {
    grade = "D";
    gradeColor = darkMode ? "text-orange-400" : "text-orange-600";
  } else {
    grade = "F";
    gradeColor = darkMode ? "text-red-400" : "text-red-600";
  }

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6`}>
      <div className='text-center py-8'>
        <h2 className='text-2xl font-bold mb-6'>Assessment Complete!</h2>

        <div className='max-w-md mx-auto'>
          {/* Score summary */}
          <div className='flex justify-between items-center py-6 border-y'>
            <div className='text-left'>
              <p className='opacity-75'>Your Score</p>
              <p className='text-2xl font-bold'>
                {score} / {totalPoints}
              </p>
            </div>
            <div className='text-right'>
              <p className='opacity-75'>Grade</p>
              <p className={`text-4xl font-bold ${gradeColor}`}>{grade}</p>
            </div>
          </div>

          {/* Progress circle */}
          <div className='relative w-48 h-48 mx-auto my-8'>
            <svg viewBox='0 0 100 100' className='w-full'>
              {/* Background circle */}
              <circle cx='50' cy='50' r='40' fill='none' stroke={darkMode ? "#374151" : "#e5e7eb"} strokeWidth='8' />
              {/* Progress circle */}
              <circle
                cx='50'
                cy='50'
                r='40'
                fill='none'
                stroke={
                  percentage >= 90
                    ? "#10B981" // green
                    : percentage >= 80
                    ? "#3B82F6" // blue
                    : percentage >= 70
                    ? "#F59E0B" // yellow
                    : percentage >= 60
                    ? "#F97316" // orange
                    : "#EF4444" // red
                }
                strokeWidth='8'
                strokeDasharray='251.2'
                strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                strokeLinecap='round'
                transform='rotate(-90 50 50)'
              />
              <text x='50' y='55' fontSize='16' fontWeight='bold' textAnchor='middle' fill='currentColor'>
                {percentage}%
              </text>
            </svg>
          </div>

          {/* Section scores */}
          <div className='mt-6 space-y-4'>
            <h3 className='font-bold text-lg'>Section Breakdown</h3>
            {sectionScores.map((section) => (
              <div key={section.sectionId} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className='flex justify-between mb-2'>
                  <h4 className='font-medium'>{section.title}</h4>
                  <p className='font-medium'>
                    {section.score} / {section.totalPoints}
                  </p>
                </div>
                <div className={`h-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}>
                  <div 
                    className='h-2 rounded-full bg-blue-500' 
                    style={{ width: `${(section.score / section.totalPoints) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className='mt-8 flex flex-col sm:flex-row justify-center gap-4'>
          <button className={`px-6 py-3 rounded-lg font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}>
            View Detailed Results
          </button>
          <button className='px-6 py-3 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600'>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
