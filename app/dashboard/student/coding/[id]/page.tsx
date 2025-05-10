"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Play, Send, Info, Book, MessageCircle, CheckCircle, Code, Settings, ChevronDown, Moon, Sun, Save, Share, Trophy, Clock, Bookmark, BookmarkCheck, Heart, RefreshCw, AlertCircle, Plus, Trash2, XCircle, Database, Copy } from "lucide-react";
import CodeEditor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import DashboardLayout from "@/components/dashboard-layout";
import { useTheme } from "next-themes";

interface TestCase {
  id: number;
  name: string;
  status: "passed" | "failed" | "running" | "pending";
  expected?: string;
  actual?: string;
  input?: string;
  output?: string;
  executionTime?: number;
  memoryUsage?: number;
}

interface UserTestCase {
  id: string;
  input: string;
  expected: string;
  description?: string;
}

interface TestResults {
  passed: number;
  failed: number;
  details: TestCase[];
}

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface StarterCode {
  [key: string]: string;
}

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  hints: string[];
  starterCode: StarterCode;
  testCases: {
    input: any;
    target?: number;
    expected: any;
  }[];
}

interface Problems {
  [key: string]: Problem;
}

interface Submission {
  id: string;
  timestamp: string;
  language: string;
  status: "accepted" | "wrong_answer" | "time_limit_exceeded" | "runtime_error";
  executionTime: number;
  memoryUsage: number;
  code: string;
  testCasesPassed: number;
  totalTestCases: number;
}

interface SubmissionStatus {
  show: boolean;
  status: "success" | "error" | null;
  message: string;
}

// Sample problems data - in a real app this would come from an API
const problems: Problems = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Table"],
    description: `
      Given an array of integers \`nums\` and an integer \`target\`, return _indices of the two numbers such that they add up to \`target\`_.

      You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

      You can return the answer in any order.
    `,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    hints: ["A brute force approach would be to check every possible pair of numbers in the array. Can you think of a more efficient way?", "Consider using a hash table to store values you've already seen, so you can quickly look up if the complement exists.", "In a single pass through the array, you can check if target - current element exists in the hash table. If it does, you've found your pair."],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
  
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
    },
    testCases: [
      { input: [2, 7, 11, 15], target: 9, expected: [0, 1] },
      { input: [3, 2, 4], target: 6, expected: [1, 2] },
      { input: [3, 3], target: 6, expected: [0, 1] },
      { input: [1, 5, 8, 10], target: 18, expected: [2, 3] },
    ],
  },
  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    description: `
      Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

      An input string is valid if:
      1. Open brackets must be closed by the same type of brackets.
      2. Open brackets must be closed in the correct order.
      3. Every close bracket has a corresponding open bracket of the same type.
    `,
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    hints: ["Think about using a stack data structure.", "When you encounter an opening bracket, push it onto the stack.", "When you encounter a closing bracket, check if it matches the top bracket on the stack. If yes, pop the top bracket. If no, the string is invalid."],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your code here
  
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Your code here
        pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        
    }
}`,
    },
    testCases: [
      { input: "()", expected: true },
      { input: "()[]{}", expected: true },
      { input: "(]", expected: false },
      { input: "([)]", expected: false },
      { input: "{[]}", expected: true },
    ],
  },
};

// Discussions data
const discussionsData = [
  {
    id: 1,
    title: "Optimizing beyond O(n) time complexity?",
    content: "I'm wondering if there's any way to solve this problem in better than O(n) time...",
    author: "UserName123",
    replies: 8,
    timeAgo: "1 day ago",
  },
  {
    id: 2,
    title: "Space complexity trade-offs",
    content: "Let's discuss the trade-offs between optimizing for time vs space complexity...",
    author: "AlgorithmPro",
    replies: 12,
    timeAgo: "3 days ago",
  },
  {
    id: 3,
    title: "Edge case handling in solution",
    content: "Has anyone found a cleaner way to handle the edge cases in this problem?",
    author: "CodeMaster42",
    replies: 5,
    timeAgo: "5 days ago",
  },
];

interface ExecutionStats {
  time: number;
  memory: number;
}

export default function CodingPractice() {
  const router = useRouter();
  const params = useParams();
  const problemId = params?.id as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"problem" | "hints" | "testcases" | "submissions">("problem");
  const { theme } = useTheme();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [editorMounted, setEditorMounted] = useState<boolean>(false);
  const [discussions, setDiscussions] = useState(discussionsData);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userTestCases, setUserTestCases] = useState<UserTestCase[]>([]);
  const [newTestCase, setNewTestCase] = useState<UserTestCase>({
    id: "",
    input: "",
    expected: "",
    description: "",
  });
  const [showAddTestCase, setShowAddTestCase] = useState<boolean>(false);
  const [executionStats, setExecutionStats] = useState<ExecutionStats>({
    time: 0,
    memory: 0,
  });
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      timestamp: "2024-03-20T10:30:00",
      language: "javascript",
      status: "accepted",
      executionTime: 45,
      memoryUsage: 2.1,
      code: "function twoSum(nums, target) { ... }",
      testCasesPassed: 4,
      totalTestCases: 4
    },
    {
      id: "2",
      timestamp: "2024-03-20T10:15:00",
      language: "python",
      status: "wrong_answer",
      executionTime: 38,
      memoryUsage: 2.0,
      code: "def twoSum(nums, target): ...",
      testCasesPassed: 2,
      totalTestCases: 4
    },
    {
      id: "3",
      timestamp: "2024-03-20T10:00:00",
      language: "java",
      status: "time_limit_exceeded",
      executionTime: 2000,
      memoryUsage: 2.5,
      code: "public int[] twoSum(int[] nums, int target) { ... }",
      testCasesPassed: 1,
      totalTestCases: 4
    }
  ]);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    show: false,
    status: null,
    message: ""
  });

  // Function to load problem data
  useEffect(() => {
    setProblem(problems["two-sum"]);
  }, [problemId, language]);

    useEffect(()=>{
      
    } , [theme])
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (newLanguage: string) => {
    if (language !== newLanguage && problem?.starterCode[newLanguage]) {
      setLanguage(newLanguage);
      setCode(problem.starterCode[newLanguage]);
      setShowLanguageDropdown(false);
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditor(editor);
    setEditorMounted(true);
  };

  const runTests = () => {
    if (!problem) {
      setError("No problem loaded");
      return;
    }

    setIsRunning(true);
    setError(null);

    try {
      // Simulate test execution
      setTimeout(() => {
        setIsRunning(false);
        setTestResults({
          passed: 3,
          failed: 1,
          details: [
            { id: 1, name: "Test Case 1", status: "passed", expected: "[0,1]", actual: "[0,1]" },
            { id: 2, name: "Test Case 2", status: "passed", expected: "[1,2]", actual: "[1,2]" },
            { id: 3, name: "Test Case 3", status: "passed", expected: "[0,1]", actual: "[0,1]" },
            { id: 4, name: "Test Case 4", status: "failed", expected: "[1,2]", actual: "[0,1]" },
          ],
        });
        setExecutionStats({
          time: 150,
          memory: 2.5,
        });
      }, 2000);
    } catch (err) {
      setError("Failed to run tests");
      console.error("Error running tests:", err);
      setIsRunning(false);
    }
    setActiveTab("testcases");
  };

  const submitSolution = () => {
    if (!problem) {
      setError("No problem loaded");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo
        setSubmissionStatus({
          show: true,
          status: isSuccess ? 'success' : 'error',
          message: isSuccess ? 'Solution accepted!' : 'Some test cases failed'
        });
        
        // Hide the status after 3 seconds
        setTimeout(() => {
          setSubmissionStatus(prev => ({ ...prev, show: false }));
        }, 3000);

        setTestResults({
          passed: isSuccess ? 9 : 3,
          failed: isSuccess ? 1 : 7,
          details: [
            { id: 1, name: "Test Case 1", status: "passed" },
            { id: 2, name: "Test Case 2", status: "passed" },
            { id: 3, name: "Test Case 3", status: "passed" },
            { id: 4, name: "Test Case 4", status: isSuccess ? "passed" : "failed" },
          ],
        });
      }, 2000);
    } catch (err) {
      setError("Failed to submit solution");
      console.error("Error submitting solution:", err);
      setIsSubmitting(false);
    }
    setActiveTab("testcases");
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Calculate progress for UI display
  const totalTestCases = testResults ? testResults.passed + testResults.failed : 0;
  const progressPercentage = totalTestCases > 0 ? ((testResults?.passed || 0) / totalTestCases) * 100 : 0;

  const containerClass = darkMode ? "dark" : "";

  const addTestCase = () => {
    if (newTestCase.input && newTestCase.expected) {
      setUserTestCases([
        ...userTestCases,
        {
          ...newTestCase,
          id: Date.now().toString(),
        },
      ]);
      setNewTestCase({
        id: "",
        input: "",
        expected: "",
        description: "",
      });
      setShowAddTestCase(false);
    }
  };

  const deleteTestCase = (id: string) => {
    setUserTestCases(userTestCases.filter((tc) => tc.id !== id));
  };

  // Add this component right after the DashboardLayout opening tag
  const SubmissionStatusOverlay = () => {
    if (!submissionStatus.show) return null;

    return (
      <div className="fixed top-4 right-4 z-50">
        <div className={`transform transition-all duration-500 ease-in-out ${
          submissionStatus.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
            submissionStatus.status === 'success' 
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
          }`}>
            {submissionStatus.status === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              submissionStatus.status === 'success' 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {submissionStatus.message}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // If there's an error, show error state
  if (error) {
    return (
      <div className={`${containerClass} h-screen w-full`}>
        <div className='dark:bg-gray-900 bg-white h-full flex items-center justify-center'>
          <div className='flex flex-col items-center p-8 bg-red-50 dark:bg-red-900/30 rounded-lg'>
            <AlertCircle size={48} className='text-red-500 dark:text-red-400 mb-4' />
            <h2 className='text-xl font-semibold text-red-700 dark:text-red-300 mb-2'>Error Loading Problem</h2>
            <p className='text-red-600 dark:text-red-400 text-center'>{error}</p>
            <button onClick={() => router.push("/dashboard/student/coding")} className='mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors'>
              Return to Problems
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If problem is loading
  if (!problem) {
    return (
      <div className={`${containerClass} h-screen w-full`}>
        <div className='dark:bg-gray-900 bg-white h-full flex items-center justify-center'>
          <div className='flex flex-col items-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4'></div>
            <p className='dark:text-white text-gray-800'>Loading problem...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout userRole='student'>
      <SubmissionStatusOverlay />
      <div className={`${containerClass} h-screen w-full -m-6`}>
        <div className='dark:bg-gray-900 bg-white h-full flex flex-col'>
          {/* Header */}
          <header className='dark:bg-gray-800 bg-gray-100 py-3 px-6 flex items-center justify-between border-b dark:border-gray-700 border-gray-200'>
            <div className='flex items-center space-x-4'>
              <h1 className='font-bold text-xl dark:text-white text-gray-800'>{problem?.title}</h1>
              <span
                className={`px-2 py-1 rounded-full text-xs 
                ${problem?.difficulty === "Easy" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : 
                  problem?.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : 
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
              >
                {problem?.difficulty}
              </span>
              <div className='flex space-x-1'>
                {problem?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs 
                    ${index % 2 === 0 ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : 
                      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button onClick={toggleBookmark} className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                {isBookmarked ? <BookmarkCheck size={20} className='text-blue-500' /> : <Bookmark size={20} className='dark:text-gray-300 text-gray-600' />}
              </button>
              <button className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                <Heart size={20} className='dark:text-gray-300 text-gray-600' />
              </button>
              <button onClick={toggleDarkMode} className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'>
                {darkMode ? <Sun size={20} className='text-gray-200' /> : <Moon size={20} className='text-gray-700' />}
              </button>
              <button className='dark:bg-gray-700 bg-gray-200 dark:text-white text-gray-800 px-3 py-1 rounded-md text-sm flex items-center'>
                <Settings size={16} className='mr-1' /> Settings
              </button>
            </div>
          </header>

          {/* Main Content */}
          <div className='flex-1 flex overflow-hidden'>
            {/* Left Panel - Problem Description */}
            <div className='w-1/2 border-r dark:border-gray-700 border-gray-200 flex flex-col'>
              <div className='border-b dark:border-gray-700 border-gray-200'>
                <div className='flex'>
                  <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "problem" ? "dark:text-white text-gray-800 border-b-2 dark:border-blue-500 border-blue-600" : "dark:text-gray-400 text-gray-500"}`} 
                    onClick={() => setActiveTab("problem")}
                  >
                    <div className='flex items-center'>
                      <Book size={16} className='mr-2' /> Description
                    </div>
                  </button>
                  <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "hints" ? "dark:text-white text-gray-800 border-b-2 dark:border-blue-500 border-blue-600" : "dark:text-gray-400 text-gray-500"}`} 
                    onClick={() => setActiveTab("hints")}
                  >
                    <div className='flex items-center'>
                      <Info size={16} className='mr-2' /> Hints
                    </div>
                  </button>
                  <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "testcases" ? "dark:text-white text-gray-800 border-b-2 dark:border-blue-500 border-blue-600" : "dark:text-gray-400 text-gray-500"}`} 
                    onClick={() => setActiveTab("testcases")}
                  >
                    <div className='flex items-center'>
                      <CheckCircle size={16} className='mr-2' /> Test Cases
                    </div>
                  </button>
                  <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === "submissions" ? "dark:text-white text-gray-800 border-b-2 dark:border-blue-500 border-blue-600" : "dark:text-gray-400 text-gray-500"}`} 
                    onClick={() => setActiveTab("submissions")}
                  >
                    <div className='flex items-center'>
                      <MessageCircle size={16} className='mr-2' /> Submissions
                    </div>
                  </button>
                </div>
              </div>
              <div className='flex-1 overflow-y-auto p-6 dark:text-gray-200 text-gray-800'>
                {activeTab === "testcases" && (
                  <div className='space-y-6'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold'>Custom Test Cases</h3>
                      <button
                        onClick={() => setShowAddTestCase(true)}
                        className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium flex items-center'
                      >
                        <Plus size={16} className='mr-2' /> Add Test Case
                      </button>
                    </div>

                    {showAddTestCase && (
                      <div className='border dark:border-gray-700 border-gray-200 rounded-lg p-4 space-y-4'>
                        <div>
                          <label className='block text-sm font-medium mb-1'>Input</label>
                          <textarea
                            value={newTestCase.input}
                            onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
                            className='w-full h-24 p-2 border dark:border-gray-700 border-gray-200 rounded-md dark:bg-gray-800 bg-white'
                            placeholder='Enter test input...'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium mb-1'>Expected Output</label>
                          <textarea
                            value={newTestCase.expected}
                            onChange={(e) => setNewTestCase({ ...newTestCase, expected: e.target.value })}
                            className='w-full h-24 p-2 border dark:border-gray-700 border-gray-200 rounded-md dark:bg-gray-800 bg-white'
                            placeholder='Enter expected output...'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium mb-1'>Description (Optional)</label>
                          <input
                            type='text'
                            value={newTestCase.description}
                            onChange={(e) => setNewTestCase({ ...newTestCase, description: e.target.value })}
                            className='w-full p-2 border dark:border-gray-700 border-gray-200 rounded-md dark:bg-gray-800 bg-white'
                            placeholder='Enter test case description...'
                          />
                        </div>
                        <div className='flex justify-end space-x-2'>
                          <button
                            onClick={() => setShowAddTestCase(false)}
                            className='px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm font-medium'
                          >
                            Cancel
                          </button>
                          <button
                            onClick={addTestCase}
                            className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium'
                          >
                            Add Test Case
                          </button>
                        </div>
                      </div>
                    )}

                    <div className='space-y-4'>
                      {userTestCases.map((testCase) => (
                        <div key={testCase.id} className='border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden'>
                          <div className='dark:bg-gray-800 bg-gray-100 px-4 py-3 flex justify-between items-center'>
                            <div className='font-medium'>Test Case {testCase.id}</div>
                            <button
                              onClick={() => deleteTestCase(testCase.id)}
                              className='text-red-500 hover:text-red-600'
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className='p-4 space-y-3'>
                            {testCase.description && (
                              <p className='text-sm text-gray-500 dark:text-gray-400'>{testCase.description}</p>
                            )}
                            <div className='grid grid-cols-2 gap-4'>
                              <div>
                                <label className='block text-sm font-medium mb-1'>Input</label>
                                <pre className='bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm'>{testCase.input}</pre>
                              </div>
                              <div>
                                <label className='block text-sm font-medium mb-1'>Expected Output</label>
                                <pre className='bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm'>{testCase.expected}</pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {testResults && (
                      <div className='mt-6'>
                        <h3 className='text-lg font-semibold mb-4'>Test Results</h3>
                        <div className='space-y-4'>
                          {testResults.details.map((test) => (
                            <div
                              key={test.id}
                              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                                test.status === "passed"
                                  ? "border-green-200 dark:border-green-800"
                                  : "border-red-200 dark:border-red-800"
                              }`}
                            >
                              <div
                                className={`px-4 py-3 flex items-center justify-between ${
                                  test.status === "passed"
                                    ? "bg-green-50 dark:bg-green-900/30"
                                    : "bg-red-50 dark:bg-red-900/30"
                                }`}
                              >
                                <div className='flex items-center'>
                                  {test.status === "passed" ? (
                                    <CheckCircle size={20} className='text-green-500 mr-2' />
                                  ) : (
                                    <XCircle size={20} className='text-red-500 mr-2' />
                                  )}
                                  <span className='font-medium'>{test.name}</span>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    test.status === "passed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                                  }`}
                                >
                                  {test.status}
                                </span>
                              </div>
                              {test.expected && test.actual && (
                                <div className='p-4 grid grid-cols-2 gap-4'>
                                  <div>
                                    <label className='block text-sm font-medium mb-1'>Expected</label>
                                    <pre className='bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm'>{test.expected}</pre>
                                  </div>
                                  <div>
                                    <label className='block text-sm font-medium mb-1'>Actual</label>
                                    <pre className='bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm'>{test.actual}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {executionStats.time > 0 && (
                      <div className='mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        <h4 className='text-sm font-medium mb-2'>Execution Statistics</h4>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='flex items-center'>
                            <Clock size={16} className='mr-2 text-gray-500' />
                            <span className='text-sm'>Time: {executionStats.time}ms</span>
                          </div>
                          <div className='flex items-center'>
                            <Database size={16} className='mr-2 text-gray-500' />
                            <span className='text-sm'>Memory: {executionStats.memory}MB</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "problem" && (
                  <div className='space-y-4'>
                    <div className='markdown-content'>
                      {problem.description.split("\n").map((paragraph, idx) =>
                        paragraph.trim() ? (
                          <p key={idx} className='mb-3'>
                            {paragraph}
                          </p>
                        ) : null
                      )}
                    </div>

                    <div className='mt-6'>
                      <p className='font-medium mb-2'>Examples:</p>
                      {problem.examples.map((example, idx) => (
                        <div key={idx} className='mt-4'>
                          <p className='font-medium mb-2'>Example {idx + 1}:</p>
                          <pre className='bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto'>
                            <div>
                              <span className='text-gray-500'>Input:</span> {example.input}
                            </div>
                            <div>
                              <span className='text-gray-500'>Output:</span> {example.output}
                            </div>
                            {example.explanation && (
                              <div>
                                <span className='text-gray-500'>Explanation:</span> {example.explanation}
                              </div>
                            )}
                          </pre>
                        </div>
                      ))}
                    </div>

                    <div className='mt-6'>
                      <p className='font-medium'>Constraints:</p>
                      <ul className='list-disc pl-5 mt-2 space-y-1'>
                        {problem.constraints.map((constraint, idx) => (
                          <li key={idx}>
                            <code className='bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded'>{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='mt-8 flex gap-4'>
                      <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                        <Trophy size={16} className='mr-1' />
                        <span>85% Success Rate</span>
                      </div>
                      <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                        <Clock size={16} className='mr-1' />
                        <span>Avg. Time: 15 min</span>
                      </div>
                    </div>

                    <div className='mt-4 border-t dark:border-gray-700 border-gray-200 pt-4'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-semibold'>Related Problems:</h3>
                        <button className='text-blue-500 hover:text-blue-600 text-sm' onClick={() => router.push("/problems/valid-parentheses")}>
                          See more
                        </button>
                      </div>
                      <div className='mt-2 grid grid-cols-2 gap-2'>
                        <div className='border dark:border-gray-700 border-gray-200 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                          <div className='text-sm font-medium'>3Sum</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1'>
                            <span className='px-1.5 text-xs rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>Medium</span>
                          </div>
                        </div>
                        <div className='border dark:border-gray-700 border-gray-200 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'>
                          <div className='text-sm font-medium'>4Sum</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1'>
                            <span className='px-1.5 text-xs rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'>Hard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "hints" && (
                  <div className='space-y-6'>
                    {problem.hints.map((hint, idx) => (
                      <div key={idx} className='border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden'>
                        <div className='dark:bg-gray-800 bg-gray-100 px-4 py-3 font-medium'>Hint {idx + 1}</div>
                        <div className='p-4'>
                          <p>{hint}</p>
                        </div>
                      </div>
                    ))}

                    <div className='border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden'>
                      <div className='dark:bg-gray-800 bg-gray-100 px-4 py-3 font-medium'>Solution Approach</div>
                      <div className='p-4'>
                        <button className='text-blue-600 dark:text-blue-400 font-medium flex items-center'>
                          <ChevronDown size={16} className='mr-1' /> Click to reveal solution approach
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "submissions" && (
                  <div className='space-y-6'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold'>Submission History</h3>
                      <div className='flex items-center space-x-2'>
                        <select className='px-3 py-1.5 border dark:border-gray-700 border-gray-200 rounded-md dark:bg-gray-800 bg-white text-sm'>
                          <option value="all">All Languages</option>
                          <option value="javascript">JavaScript</option>
                          <option value="python">Python</option>
                          <option value="java">Java</option>
                        </select>
                        <select className='px-3 py-1.5 border dark:border-gray-700 border-gray-200 rounded-md dark:bg-gray-800 bg-white text-sm'>
                          <option value="all">All Status</option>
                          <option value="accepted">Accepted</option>
                          <option value="wrong_answer">Wrong Answer</option>
                          <option value="time_limit_exceeded">Time Limit Exceeded</option>
                          <option value="runtime_error">Runtime Error</option>
                        </select>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      {submissions.map((submission) => (
                        <div key={submission.id} className='border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden'>
                          <div className='dark:bg-gray-800 bg-gray-100 px-4 py-3 flex justify-between items-center'>
                            <div className='flex items-center space-x-4'>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                submission.status === "accepted" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : submission.status === "wrong_answer"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : submission.status === "time_limit_exceeded"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              }`}>
                                {submission.status.replace(/_/g, ' ').toUpperCase()}
                              </span>
                              <span className='text-sm font-medium'>{new Date(submission.timestamp).toLocaleString()}</span>
                            </div>
                            <div className='flex items-center space-x-4'>
                              <span className='text-sm text-gray-500 dark:text-gray-400'>
                                {submission.testCasesPassed}/{submission.totalTestCases} test cases passed
                              </span>
                              <span className='text-sm text-gray-500 dark:text-gray-400'>
                                {submission.language}
                              </span>
                            </div>
                          </div>
                          <div className='p-4 space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                              <div className='flex items-center space-x-2'>
                                <Clock size={16} className='text-gray-500' />
                                <span className='text-sm'>{submission.executionTime}ms</span>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <Database size={16} className='text-gray-500' />
                                <span className='text-sm'>{submission.memoryUsage}MB</span>
                              </div>
                            </div>
                            <div className='relative'>
                              <pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm'>
                                <code>{submission.code}</code>
                              </pre>
                              <button className='absolute top-2 right-2 p-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>
                                <Copy size={16} className='text-gray-500' />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Code Editor */}
            <div className='w-1/2 flex flex-col'>
              <div className='border-b dark:border-gray-700 border-gray-200 flex items-center justify-between px-4 py-2'>
                <div className='flex items-center'>
                  <div className='relative'>
                    <button className='flex items-center px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium' onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                      <Code size={16} className='mr-2' /> {language.charAt(0).toUpperCase() + language.slice(1)}
                      <ChevronDown size={14} className='ml-1' />
                    </button>
                    {showLanguageDropdown && (
                      <div className='absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-md shadow-lg z-10'>
                        <div className='py-1'>
                          <button className={`block w-full text-left px-4 py-2 text-sm ${language === "javascript" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => changeLanguage("javascript")}>
                            JavaScript
                          </button>
                          <button className={`block w-full text-left px-4 py-2 text-sm ${language === "python" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => changeLanguage("python")}>
                            Python
                          </button>
                          <button className={`block w-full text-left px-4 py-2 text-sm ${language === "java" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`} onClick={() => changeLanguage("java")}>
                            Java
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {editorMounted && (
                    <button className='ml-3 text-sm text-blue-600 dark:text-blue-400 font-medium' onClick={() => setCode(problem.starterCode[language])}>
                      Reset Code
                    </button>
                  )}
                </div>
                <div className='flex space-x-2'>
                  <button className='px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm font-medium flex items-center' onClick={runTests} disabled={isRunning}>
                    {isRunning ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500 mr-2'></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <Play size={16} className='mr-2' /> Run
                      </>
                    )}
                  </button>
                  <button className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium flex items-center' onClick={submitSolution} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2'></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} className='mr-2' /> Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className='flex-1 overflow-hidden'>
                <CodeEditor
                  height='100%'
                  language={language}
                  value={code}
                  theme={darkMode ? "vs-dark" : "light"}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 18,
                    tabSize: 2,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    lineNumbers: "on",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className='dark:bg-gray-800 bg-gray-100 px-6 py-2 border-t dark:border-gray-700 border-gray-200 flex items-center justify-between'>
            <div className='flex items-center text-sm dark:text-gray-400 text-gray-600'>
              <div className='mr-6'>
                <span className='font-medium'>Problem:</span> {problem?.id} - {problem?.title}
              </div>
              <div>
                <span className='font-medium'>Language:</span> {language}
              </div>
            </div>
            <div className='flex space-x-4'>
              <button className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center'>
                <Save size={16} className='mr-1' /> Save
              </button>
              <button className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center'>
                <Share size={16} className='mr-1' /> Share
              </button>
            </div>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}
