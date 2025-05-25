"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Code, Clock, Award, ChevronDown, ChevronUp, Trophy, Target, BookOpen, Brain, User, Clipboard, Sun, Moon, BarChart3, Star, CalendarDays, Book, CheckSquare, PenTool, Cpu, Medal, Share2, Download } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import type { ReactElement } from "react";
import ResultsNotLoaded from "./_components/ResultsNotLoaded";

// Add type definitions
type SectionType = "coding" | "multipleChoice" | "trueFalse" | "shortAnswer";

interface ExpandedSections {
  coding: boolean;
  multipleChoice: boolean;
  trueFalse: boolean;
  shortAnswer: boolean;
}

interface Question {
  id: number;
  type: SectionType;
  question: string;
  userAnswer: string | boolean;
  correctAnswer?: string | boolean;
  correct: boolean;
  points: number;
  maxPoints: number;
  timeSpent: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  feedback?: string;
  options?: string[];
}

interface Section {
  id: SectionType;
  title: string;
  score: number;
  maxScore: number;
  icon: ReactElement;
  description: string;
  questions: Question[];
}

interface AssessmentData {
  title: string;
  subtitle: string;
  date: string;
  duration: string;
  completionTime: string;
  score: number;
  maxScore: number;
  percentile: number;
  studentName: string;
  studentId: string;
  courseInstructor: string;
  courseCode: string;
  certificates: string[];
  badgesEarned: string[];
  previousScores: number[];
  sections: Section[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  nextLevelRequirements: string[];
}

interface TimeSpentByCategory {
  [key: string]: number;
}

// Helper function moved outside component
const getProgressColor = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return "bg-green-500";
  if (percentage >= 75) return "bg-blue-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

export default function AssessmentResults() {
  // All hooks at the top level
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    coding: true,
    multipleChoice: true,
    trueFalse: false,
    shortAnswer: false,
  });

  const [animateIn, setAnimateIn] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [activeTabId, setActiveTabId] = useState<SectionType>("coding");

  // Mock assessment data - in a real app, this would come from an API
  const assessmentData: AssessmentData = {
    title: "Advanced Web Development Assessment",
    subtitle: "Full Stack Development Certification Track",
    date: "May 12, 2025",
    duration: "1 hour 45 minutes",
    completionTime: "1 hour 32 minutes",
    score: 87,
    maxScore: 100,
    percentile: 84,
    studentName: "Alex Johnson",
    studentId: "S1023456",
    courseInstructor: "Dr. Sarah Williams",
    courseCode: "WEB-501",
    certificates: ["Front-end Developer", "React.js Specialist"],
    badgesEarned: ["Code Optimizer", "Problem Solver"],
    previousScores: [76, 81, 87],
    sections: [
      {
        id: "coding",
        title: "Coding Problems",
        score: 42,
        maxScore: 50,
        icon: <Code className='h-5 w-5' />,
        description: "Implementation of algorithms and practical coding solutions",
        questions: [
          {
            id: 1,
            type: "coding",
            question: "Write a function to find the longest substring without repeating characters.",
            userAnswer: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();
  
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    if (charMap.has(currentChar)) {
      start = Math.max(start, charMap.get(currentChar) + 1);
    }
    charMap.set(currentChar, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}`,
            correct: true,
            points: 15,
            maxPoints: 15,
            timeSpent: "14 minutes",
            difficulty: "Medium",
            tags: ["Algorithms", "Strings", "Optimization"],
          },
          {
            id: 2,
            type: "coding",
            question: "Implement a basic React component that fetches and displays data from an API.",
            userAnswer: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Data from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`,
            correctAnswer: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetch('https://api.example.com/data', { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          setError(error.message);
          setLoading(false);
        }
      });
      
    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Data from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`,
            correct: true,
            points: 12,
            maxPoints: 15,
            timeSpent: "18 minutes",
            difficulty: "Medium",
            tags: ["React", "Hooks", "API Integration"],
          },
          {
            id: 3,
            type: "coding",
            question: "Optimize the following SQL query for better performance.",
            userAnswer: `SELECT users.name, COUNT(orders.id) as order_count
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2025-01-01'
GROUP BY users.id
HAVING COUNT(orders.id) > 5
ORDER BY order_count DESC;`,
            correctAnswer: `SELECT users.name, COUNT(orders.id) as order_count
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2025-01-01'
GROUP BY users.id
HAVING COUNT(orders.id) > 5
ORDER BY order_count DESC
/* Use indexes: */
USE INDEX (idx_users_id, idx_orders_user_id, idx_orders_created_at);`,
            correct: true,
            points: 15,
            maxPoints: 20,
            timeSpent: "12 minutes",
            difficulty: "Hard",
            tags: ["SQL", "Database", "Optimization"],
          },
        ],
      },
      {
        id: "multipleChoice",
        title: "Multiple Choice",
        score: 25,
        maxScore: 25,
        icon: <CheckSquare className='h-5 w-5' />,
        description: "Testing knowledge of web development concepts and best practices",
        questions: [
          {
            id: 4,
            type: "multipleChoice",
            question: "Which HTTP status code indicates a successful request?",
            options: ["200", "404", "500", "301"],
            userAnswer: "200",
            correctAnswer: "200",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "45 seconds",
            difficulty: "Easy",
            tags: ["HTTP", "Web Protocols"],
          },
          {
            id: 5,
            type: "multipleChoice",
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Float", "Symbol"],
            userAnswer: "Float",
            correctAnswer: "Float",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "52 seconds",
            difficulty: "Easy",
            tags: ["JavaScript", "Programming Basics"],
          },
          {
            id: 6,
            type: "multipleChoice",
            question: "Which CSS property is used to create a grid layout?",
            options: ["display: flex", "display: grid", "display: block", "display: inline"],
            userAnswer: "display: grid",
            correctAnswer: "display: grid",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "38 seconds",
            difficulty: "Easy",
            tags: ["CSS", "Layout"],
          },
          {
            id: 7,
            type: "multipleChoice",
            question: "Which of the following is a stateless authentication method?",
            options: ["Session", "JWT", "Cookies", "Local Storage"],
            userAnswer: "JWT",
            correctAnswer: "JWT",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "1 minute 5 seconds",
            difficulty: "Medium",
            tags: ["Authentication", "Web Security"],
          },
          {
            id: 8,
            type: "multipleChoice",
            question: "Which pattern is best for handling asynchronous operations in JavaScript?",
            options: ["Observer Pattern", "Singleton Pattern", "Factory Pattern", "Module Pattern"],
            userAnswer: "Observer Pattern",
            correctAnswer: "Observer Pattern",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "1 minute 12 seconds",
            difficulty: "Medium",
            tags: ["Design Patterns", "JavaScript"],
          },
        ],
      },
      {
        id: "trueFalse",
        title: "True/False Questions",
        score: 10,
        maxScore: 15,
        icon: <Target className='h-5 w-5' />,
        description: "Testing factual knowledge about web technologies",
        questions: [
          {
            id: 9,
            type: "trueFalse",
            question: "React uses a Virtual DOM to improve performance.",
            userAnswer: true,
            correctAnswer: true,
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "32 seconds",
            difficulty: "Easy",
            tags: ["React", "Performance"],
          },
          {
            id: 10,
            type: "trueFalse",
            question: "WebSockets provide full-duplex communication channels.",
            userAnswer: true,
            correctAnswer: true,
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "48 seconds",
            difficulty: "Medium",
            tags: ["WebSockets", "Communication Protocols"],
          },
          {
            id: 11,
            type: "trueFalse",
            question: "SQL is a NoSQL database technology.",
            userAnswer: false,
            correctAnswer: false,
            correct: true,
            points: 0,
            maxPoints: 5,
            timeSpent: "40 seconds",
            difficulty: "Easy",
            tags: ["Databases", "SQL"],
          },
        ],
      },
      {
        id: "shortAnswer",
        title: "Short Answer Questions",
        score: 10,
        maxScore: 10,
        icon: <PenTool className='h-5 w-5' />,
        description: "Testing in-depth understanding and explanation abilities",
        questions: [
          {
            id: 12,
            type: "shortAnswer",
            question: "Explain the concept of CSS specificity.",
            userAnswer: "CSS specificity is a weight that determines which style declarations apply to an element when multiple rules could apply. It's calculated based on the number of ID selectors, class selectors, and type selectors in a CSS rule. The higher the specificity value, the more precedence the rule has.",
            correctAnswer: "CSS specificity is a weight or ranking system that determines which style declarations apply to an element when multiple conflicting rules could apply. The specificity value is calculated based on the number and types of selectors used: ID selectors (highest), class/attribute/pseudo-class selectors (middle), and element/pseudo-element selectors (lowest). The higher the specificity value, the more precedence the rule has when rendering styles. It follows a base-10 counting system (e.g., 1-0-0 for ID, 0-1-0 for class, 0-0-1 for element).",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "2 minutes 50 seconds",
            difficulty: "Medium",
            tags: ["CSS", "Web Design"],
          },
          {
            id: 13,
            type: "shortAnswer",
            question: "Describe the difference between useEffect and useLayoutEffect in React.",
            userAnswer: "useEffect runs asynchronously after the browser has painted, while useLayoutEffect runs synchronously before the browser paints. useLayoutEffect is useful for measuring DOM elements and updating the UI before the user sees it, preventing visual flickering.",
            correctAnswer: "useEffect and useLayoutEffect are React hooks with different execution timing. useEffect runs asynchronously after the browser has painted the DOM changes, making it suitable for most side effects without blocking visual updates. useLayoutEffect runs synchronously before the browser paints the updates, which is useful when you need to make DOM measurements and apply visual updates that should happen before the user sees the rendered elements. This prevents visual flickering but can impact performance if complex calculations are performed, as it blocks painting until completion.",
            correct: true,
            points: 5,
            maxPoints: 5,
            timeSpent: "3 minutes 15 seconds",
            difficulty: "Hard",
            tags: ["React", "Hooks", "Rendering"],
          },
        ],
      },
    ],
    strengths: ["JavaScript fundamentals", "React component architecture", "CSS layout techniques"],
    weaknesses: ["SQL optimization", "Advanced database concepts", "Performance tuning"],
    recommendations: ["Focus on SQL optimization techniques", "Review React component lifecycle methods", "Practice more complex coding problems", "Take the Advanced Database Design course"],
    nextLevelRequirements: ["Complete 3 more advanced projects", "Score 90+ on the Advanced Database assessment", "Submit the final certification project"],
  };

  useEffect(() => {
    // Randomly decide if results are ready (for demo purposes)
    const randomReady = Math.random() > 0.5;
    setIsResultReady(randomReady);
    setAnimateIn(true);
  }, []);

  const toggleSection = (section: SectionType) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Calculate overall statistics
  const totalCorrect = assessmentData.sections.reduce((acc, section) => {
    return acc + section.questions.filter((q) => q.correct).length;
  }, 0);

  const totalQuestions = assessmentData.sections.reduce((acc, section) => {
    return acc + section.questions.length;
  }, 0);

  // Difficulty distribution
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  assessmentData.sections.forEach((section) => {
    section.questions.forEach((q) => {
      if (q.difficulty) {
        difficultyCount[q.difficulty]++;
      }
    });
  });

  // Time spent calculation
  let totalTimeSpent = 0;
  let timeSpentByCategory: TimeSpentByCategory = {};

  assessmentData.sections.forEach((section) => {
    timeSpentByCategory[section.id] = 0;
    section.questions.forEach((q) => {
      if (q.timeSpent) {
        const timeStr = q.timeSpent.split(" ");
        if (timeStr.length >= 2) {
          const value = parseFloat(timeStr[0]);
          const unit = timeStr[1];
          if (!isNaN(value)) {
            if (unit.startsWith("minute")) {
              timeSpentByCategory[section.id] += value;
              totalTimeSpent += value;
            } else if (unit.startsWith("second")) {
              timeSpentByCategory[section.id] += value / 60;
              totalTimeSpent += value / 60;
            }
          }
        }
      }
    });
  });

  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case "coding":
        return (
          <div className='mb-6 last:mb-2'>
            <div className='bg-white dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border-l-4 border-blue-500 shadow-md'>
              <div className='flex justify-between items-start mb-4'>
                <div className='font-medium text-lg text-gray-900 dark:text-white mb-2'>{question.question}</div>
                <div className='flex items-center'>
                  {question.correct ? (
                    <span className='flex items-center text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full'>
                      <CheckCircle className='h-4 w-4 mr-1' /> Correct
                    </span>
                  ) : (
                    <span className='flex items-center text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full'>
                      <XCircle className='h-4 w-4 mr-1' /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {question.tags && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {question.tags.map((tag, idx) => (
                    <span key={idx} className='px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300'>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1' />
                  <span>{question.timeSpent || "N/A"}</span>
                </div>
                {question.difficulty && (
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 mr-1' />
                    <span>{question.difficulty}</span>
                  </div>
                )}
                <div className='flex items-center ml-auto'>
                  <span className='mr-2 text-gray-600 dark:text-gray-300'>Score:</span>
                  <span className={`font-medium ${question.points === question.maxPoints ? "text-green-600 dark:text-green-400" : question.points > 0 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}>
                    {question.points}/{question.maxPoints}
                  </span>
                </div>
              </div>

              {/* User's Solution */}
              <div className='mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>Your Solution:</h4>
                  {question.correct && !question.correctAnswer && <span className='text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full'>Perfect Match ✓</span>}
                </div>
                <div className='border-l-4 border-blue-400 dark:border-blue-600 rounded-md p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto shadow-inner'>
                  <pre className='whitespace-pre-wrap text-sm font-mono'>{question.userAnswer}</pre>
                </div>
              </div>

              {/* Correct Solution (if available) */}
              {question.correctAnswer && (
                <div className='mb-4'>
                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Model Solution:</h4>
                  <div className='border-l-4 border-green-400 dark:border-green-600 rounded-md p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto shadow-inner'>
                    <pre className='whitespace-pre-wrap text-sm font-mono'>{question.correctAnswer}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "multipleChoice":
        return (
          <div className='mb-6 last:mb-2'>
            <div className='bg-white dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border-l-4 border-purple-500 shadow-md'>
              <div className='flex justify-between items-start mb-4'>
                <div className='font-medium text-lg text-gray-900 dark:text-white mb-2'>{question.question}</div>
                <div className='flex items-center'>
                  {question.correct ? (
                    <span className='flex items-center text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full'>
                      <CheckCircle className='h-4 w-4 mr-1' /> Correct
                    </span>
                  ) : (
                    <span className='flex items-center text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full'>
                      <XCircle className='h-4 w-4 mr-1' /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {question.tags && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {question.tags.map((tag, idx) => (
                    <span key={idx} className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300'>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1' />
                  <span>{question.timeSpent || "N/A"}</span>
                </div>
                {question.difficulty && (
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 mr-1' />
                    <span>{question.difficulty}</span>
                  </div>
                )}
                <div className='flex items-center ml-auto'>
                  <span className='mr-2 text-gray-600 dark:text-gray-300'>Score:</span>
                  <span className={`font-medium ${question.points === question.maxPoints ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {question.points}/{question.maxPoints}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-3 mb-4'>
                {question.options?.map((option, index) => (
                  <div key={index} className={`p-4 rounded-lg flex items-center transition-all ${option === question.userAnswer ? (option === question.correctAnswer ? "bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-600 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-800 dark:text-red-200") : option === question.correctAnswer ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300" : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"}`}>
                    <span className='flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium'>{String.fromCharCode(65 + index)}</span>
                    <span className='font-medium'>{option}</span>
                    {option === question.userAnswer && option === question.correctAnswer && <CheckCircle className='ml-auto h-5 w-5 text-green-600 dark:text-green-400' />}
                    {option === question.userAnswer && option !== question.correctAnswer && <XCircle className='ml-auto h-5 w-5 text-red-600 dark:text-red-400' />}
                    {option !== question.userAnswer && option === question.correctAnswer && <CheckCircle className='ml-auto h-5 w-5 text-green-600 dark:text-green-400' />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "trueFalse":
        return (
          <div className='mb-6 last:mb-2'>
            <div className='bg-white dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border-l-4 border-amber-500 shadow-md'>
              <div className='flex justify-between items-start mb-4'>
                <div className='font-medium text-lg text-gray-900 dark:text-white mb-2'>{question.question}</div>
                <div className='flex items-center'>
                  {question.correct ? (
                    <span className='flex items-center text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full'>
                      <CheckCircle className='h-4 w-4 mr-1' /> Correct
                    </span>
                  ) : (
                    <span className='flex items-center text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full'>
                      <XCircle className='h-4 w-4 mr-1' /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {question.tags && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {question.tags.map((tag, idx) => (
                    <span key={idx} className='px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300'>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1' />
                  <span>{question.timeSpent || "N/A"}</span>
                </div>
                {question.difficulty && (
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 mr-1' />
                    <span>{question.difficulty}</span>
                  </div>
                )}
                <div className='flex items-center ml-auto'>
                  <span className='mr-2 text-gray-600 dark:text-gray-300'>Score:</span>
                  <span className={`font-medium ${question.points === question.maxPoints ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {question.points}/{question.maxPoints}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-2'>
                <div className={`p-4 rounded-lg flex items-center justify-center transition-all ${question.userAnswer === true ? (question.correctAnswer === true ? "bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-600 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-800 dark:text-red-200") : question.correctAnswer === true ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300" : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"}`}>
                  <span className='flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium'>T</span>
                  <span className='font-medium flex-1'>True</span>
                  {question.userAnswer === true && question.correctAnswer === true && <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />}
                  {question.userAnswer === true && question.correctAnswer !== true && <XCircle className='h-5 w-5 text-red-600 dark:text-red-400' />}
                  {question.userAnswer !== true && question.correctAnswer === true && <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />}
                </div>
                <div className={`p-4 rounded-lg flex items-center justify-center transition-all ${question.userAnswer === false ? (question.correctAnswer === false ? "bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-600 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-600 text-red-800 dark:text-red-200") : question.correctAnswer === false ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300" : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"}`}>
                  <span className='flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium'>F</span>
                  <span className='font-medium flex-1'>False</span>
                  {question.userAnswer === false && question.correctAnswer === false && <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />}
                  {question.userAnswer === false && question.correctAnswer !== false && <XCircle className='h-5 w-5 text-red-600 dark:text-red-400' />}
                  {question.userAnswer !== false && question.correctAnswer === false && <CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />}
                </div>
              </div>
            </div>
          </div>
        );

      case "shortAnswer":
        return (
          <div className='mb-6 last:mb-2'>
            <div className='bg-white dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg border-l-4 border-indigo-500 shadow-md'>
              <div className='flex justify-between items-start mb-4'>
                <div className='font-medium text-lg text-gray-900 dark:text-white mb-2'>{question.question}</div>
                <div className='flex items-center'>
                  {question.correct ? (
                    <span className='flex items-center text-green-600 dark:text-green-400 text-sm font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full'>
                      <CheckCircle className='h-4 w-4 mr-1' /> Correct
                    </span>
                  ) : (
                    <span className='flex items-center text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full'>
                      <XCircle className='h-4 w-4 mr-1' /> Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {question.tags && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {question.tags.map((tag, idx) => (
                    <span key={idx} className='px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-xs rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex flex-wrap gap-4 text-sm mb-4 text-gray-600 dark:text-gray-300'>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1' />
                  <span>{question.timeSpent || "N/A"}</span>
                </div>
                {question.difficulty && (
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 mr-1' />
                    <span>{question.difficulty}</span>
                  </div>
                )}
                <div className='flex items-center ml-auto'>
                  <span className='mr-2 text-gray-600 dark:text-gray-300'>Score:</span>
                  <span className={`font-medium ${question.points === question.maxPoints ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {question.points}/{question.maxPoints}
                  </span>
                </div>
              </div>

              {/* User's Answer */}
              <div className='mb-4'>
                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Your Answer:</h4>
                <div className='border-l-4 border-indigo-400 dark:border-indigo-600 rounded-md p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto shadow-inner'>
                  <p className='whitespace-pre-wrap text-sm'>{question.userAnswer}</p>
                </div>
              </div>

              {/* Model Answer */}
              <div>
                <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Model Answer:</h4>
                <div className='border-l-4 border-green-400 dark:border-green-600 rounded-md p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto shadow-inner'>
                  <p className='whitespace-pre-wrap text-sm'>{question.correctAnswer}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If results are not ready, show the waiting animation
  if (!isResultReady) {
    return <ResultsNotLoaded isResultReady={isResultReady} />;
  }

  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-black text-gray-900 dark:text-gray-100'>
        <div className='container mx-auto px-4 py-8'>
          {/* Top Navigation */}
          <nav className='bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 mb-8 flex justify-between items-center transition-all duration-300'>
            <div className='flex items-center'>
              <Book className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
              <div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>Assessment Center</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Student Portal</p>
              </div>
            </div>
          </nav>

          {/* Header */}
          <header className={`mb-8 transition-all duration-500 ${animateIn ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`}>
            <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative overflow-hidden'>
                <div className='absolute inset-0 bg-pattern opacity-10'></div>
                <div className='relative z-10'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h1 className='text-3xl font-bold text-white mb-2'>{assessmentData.title}</h1>
                      <p className='text-blue-100'>{assessmentData.subtitle}</p>
                      <div className='mt-4 flex flex-wrap gap-4'>
                        <div className='flex items-center text-blue-100'>
                          <CalendarDays className='h-4 w-4 mr-2' />
                          <span>{assessmentData.date}</span>
                        </div>
                        <div className='flex items-center text-blue-100'>
                          <Clock className='h-4 w-4 mr-2' />
                          <span>
                            {assessmentData.duration} (Completed in {assessmentData.completionTime})
                          </span>
                        </div>
                        <div className='flex items-center text-blue-100'>
                          <User className='h-4 w-4 mr-2' />
                          <span>
                            {assessmentData.studentName} • {assessmentData.studentId}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='relative h-32 w-32'>
                      <div className='absolute inset-0 rounded-full bg-blue-800 bg-opacity-30 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='text-4xl font-bold text-white'>{assessmentData.score}%</div>
                          <div className='text-blue-200 text-sm'>
                            {assessmentData.score}/{assessmentData.maxScore}
                          </div>
                        </div>
                      </div>
                      <svg className='absolute inset-0' viewBox='0 0 100 100'>
                        <circle cx='50' cy='50' r='45' fill='none' stroke='rgba(255,255,255,0.2)' strokeWidth='8' />
                        <circle cx='50' cy='50' r='45' fill='none' stroke='white' strokeWidth='8' strokeDasharray={`${(2 * Math.PI * 45 * assessmentData.score) / 100} ${2 * Math.PI * 45}`} strokeDashoffset={2 * Math.PI * 45 * 0.25} strokeLinecap='round' transform='rotate(-90 50 50)' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                {/* Student Performance */}
                <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-xl'>
                  <div className='flex items-center mb-4'>
                    <Medal className='h-5 w-5 mr-2 text-blue-500' />
                    <h3 className='font-bold'>Performance</h3>
                  </div>
                  <div className='space-y-3'>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Score Percentile</span>
                        <span className='font-medium'>{assessmentData.percentile}%</span>
                      </div>
                      <div className='w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2'>
                        <div className='bg-blue-600 h-2 rounded-full' style={{ width: `${assessmentData.percentile}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className='flex justify-between text-sm mb-1'>
                        <span>Questions Correct</span>
                        <span className='font-medium'>
                          {totalCorrect}/{totalQuestions}
                        </span>
                      </div>
                      <div className='w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2'>
                        <div className='bg-green-500 h-2 rounded-full' style={{ width: `${(totalCorrect / totalQuestions) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className='pt-2'>
                      <div className='text-sm font-medium mb-1'>Score History</div>
                      <div className='flex items-end h-20 space-x-1'>
                        {assessmentData.previousScores.map((score, idx) => (
                          <div key={idx} className='flex-1 flex flex-col items-center'>
                            <div className={`w-full rounded-t-sm ${getProgressColor(score, 100)}`} style={{ height: `${score * 0.2}px` }}></div>
                            <span className='text-xs mt-1'>{score}%</span>
                          </div>
                        ))}
                        <div className='flex-1 flex flex-col items-center'>
                          <div className='w-full rounded-t-sm bg-purple-500' style={{ height: `${assessmentData.score * 0.2}px` }}></div>
                          <span className='text-xs mt-1'>{assessmentData.score}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications & Badges */}

                {/* Stats */}
                <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-xl'>
                  <div className='flex items-center mb-4'>
                    <BarChart3 className='h-5 w-5 mr-2 text-blue-500' />
                    <h3 className='font-bold'>Assessment Stats</h3>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-white dark:bg-gray-900 p-3 rounded-lg'>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>Time Spent</div>
                      <div className='font-bold text-lg'>{totalTimeSpent} min</div>
                    </div>
                    <div className='bg-white dark:bg-gray-900 p-3 rounded-lg'>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>Questions</div>
                      <div className='font-bold text-lg'>{totalQuestions}</div>
                    </div>
                    <div className='bg-white dark:bg-gray-900 p-3 rounded-lg'>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>Course</div>
                      <div className='font-medium text-sm'>{assessmentData.courseCode}</div>
                    </div>
                    <div className='bg-white dark:bg-gray-900 p-3 rounded-lg'>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>Instructor</div>
                      <div className='font-medium text-sm truncate'>{assessmentData.courseInstructor}</div>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <div className='text-sm font-medium mb-2'>Difficulty Breakdown</div>
                    <div className='flex items-center'>
                      <div className='flex-1 grid grid-cols-3 gap-1'>
                        <div className='h-2 bg-green-500 rounded-l-full' style={{ width: `${(difficultyCount.Easy / totalQuestions) * 100}%` }}></div>
                        <div className='h-2 bg-yellow-500' style={{ width: `${(difficultyCount.Medium / totalQuestions) * 100}%` }}></div>
                        <div className='h-2 bg-red-500 rounded-r-full' style={{ width: `${(difficultyCount.Hard / totalQuestions) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className='flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400'>
                      <span>Easy ({difficultyCount.Easy})</span>
                      <span>Medium ({difficultyCount.Medium})</span>
                      <span>Hard ({difficultyCount.Hard})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Score Breakdown */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 transition-all duration-500 delay-150 ${animateIn ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`}>
            {assessmentData.sections.map((section) => (
              <div key={section.id} className='bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3 text-white'>{section.icon}</div>
                    <h3 className='font-bold'>{section.title}</h3>
                  </div>
                  <div className='font-bold'>
                    {section.score}/{section.maxScore}
                  </div>
                </div>
                <p className='text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2'>{section.description}</p>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden'>
                  <div className={`${getProgressColor(section.score, section.maxScore)} h-3 transition-all duration-1000 ease-out`} style={{ width: animateIn ? `${(section.score / section.maxScore) * 100}%` : "0%" }}></div>
                </div>
                <div className='flex justify-between text-xs mt-1'>
                  <span className='text-gray-500 dark:text-gray-400'>{section.questions.length} questions</span>
                  <span className='font-medium'>{Math.round((section.score / section.maxScore) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}

          {/* Sections */}
          <div className={`space-y-6 transition-all duration-500 delay-450 ${animateIn ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`}>
            {assessmentData.sections.map((section) => (
              <div key={section.id} className='bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden'>
                <button className='w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-colors' onClick={() => toggleSection(section.id)}>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3 text-white'>{section.icon}</div>
                    <div>
                      <h2 className='text-lg font-bold'>{section.title}</h2>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>{section.questions.length} questions</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='mr-4'>
                      <div className='text-right font-medium'>
                        {section.score}/{section.maxScore}
                      </div>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>{Math.round((section.score / section.maxScore) * 100)}%</div>
                    </div>
                    {expandedSections[section.id] ? <ChevronUp className='h-6 w-6 text-gray-400' /> : <ChevronDown className='h-6 w-6 text-gray-400' />}
                  </div>
                </button>

                {expandedSections[section.id] && (
                  <div className='p-6'>
                    {section.questions.map((question, index) => (
                      <div key={question.id} className='mb-8 last:mb-0'>
                        <div className='flex items-center justify-between mb-3'>
                          <h3 className='text-lg font-bold flex items-center'>
                            <span className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 mr-2 font-bold'>{index + 1}</span>
                            Question {index + 1}
                          </h3>
                          <div className='flex items-center'>
                            {question.correct ? (
                              <span className='flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm'>
                                <CheckCircle className='h-4 w-4 mr-1' />
                                Correct
                              </span>
                            ) : (
                              <span className='flex items-center px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm'>
                                <XCircle className='h-4 w-4 mr-1' />
                                Incorrect
                              </span>
                            )}
                          </div>
                        </div>
                        {renderQuestionContent(question)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendations & Next Steps */}

          <footer className='mt-12 text-center text-sm text-gray-500 dark:text-gray-400'>
            <p>Assessment results generated on {assessmentData.date}. This report is confidential and intended for student use only.</p>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}
