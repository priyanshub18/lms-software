"use client";
import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronRight, ExternalLink, Target, Zap, Brain, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  category: string;
}

interface Category {
  [key: string]: Problem[];
}

export default function CodingChallengesUI() {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    Array: true,
    String: false,
    LinkedList: false,
    Tree: false,
    "Dynamic Programming": false,
  });
  const [completedProblems, setCompletedProblems] = useState<{ [key: string]: boolean }>({
    "Two Sum": true,
    "Valid Parentheses": true,
    "Merge Two Sorted Lists": false,
    "Maximum Subarray": false,
    "Binary Tree Inorder Traversal": false,
    "Symmetric Tree": false,
    "Best Time to Buy and Sell Stock": false,
    "Valid Palindrome": false,
    "Linked List Cycle": false,
    "Single Number": false,
  });

  // Sample problem data organized by categories
  const categories: Category = {
    Array: [
      { id: 1, title: "Two Sum", difficulty: "Easy", completed: completedProblems["Two Sum"], category: "Array" },
      { id: 4, title: "Maximum Subarray", difficulty: "Medium", completed: completedProblems["Maximum Subarray"], category: "Array" },
      { id: 7, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", completed: completedProblems["Best Time to Buy and Sell Stock"], category: "Array" },
      { id: 10, title: "Single Number", difficulty: "Easy", completed: completedProblems["Single Number"], category: "Array" },
      { id: 11, title: "Move Zeroes", difficulty: "Easy", completed: completedProblems["Move Zeroes"] || false, category: "Array" },
      { id: 12, title: "Contains Duplicate", difficulty: "Easy", completed: completedProblems["Contains Duplicate"] || false, category: "Array" },
      { id: 13, title: "Rotate Array", difficulty: "Medium", completed: completedProblems["Rotate Array"] || false, category: "Array" },
      { id: 28, title: "Product of Array Except Self", difficulty: "Medium", completed: completedProblems["Product of Array Except Self"] || false, category: "Array" },
      { id: 29, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", completed: completedProblems["Find Minimum in Rotated Sorted Array"] || false, category: "Array" },
      { id: 30, title: "Search in Rotated Sorted Array", difficulty: "Medium", completed: completedProblems["Search in Rotated Sorted Array"] || false, category: "Array" },
      { id: 31, title: "3Sum", difficulty: "Medium", completed: completedProblems["3Sum"] || false, category: "Array" },
      { id: 32, title: "Container With Most Water", difficulty: "Medium", completed: completedProblems["Container With Most Water"] || false, category: "Array" },
    ],
    String: [
      { id: 2, title: "Valid Parentheses", difficulty: "Easy", completed: completedProblems["Valid Parentheses"], category: "String" },
      { id: 8, title: "Valid Palindrome", difficulty: "Easy", completed: completedProblems["Valid Palindrome"], category: "String" },
      { id: 14, title: "Longest Common Prefix", difficulty: "Easy", completed: completedProblems["Longest Common Prefix"] || false, category: "String" },
      { id: 15, title: "Reverse String", difficulty: "Easy", completed: completedProblems["Reverse String"] || false, category: "String" },
      { id: 16, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", completed: completedProblems["Longest Substring Without Repeating Characters"] || false, category: "String" },
      { id: 33, title: "String to Integer (atoi)", difficulty: "Medium", completed: completedProblems["String to Integer (atoi)"] || false, category: "String" },
      { id: 34, title: "Implement strStr()", difficulty: "Easy", completed: completedProblems["Implement strStr()"] || false, category: "String" },
      { id: 35, title: "Longest Palindromic Substring", difficulty: "Medium", completed: completedProblems["Longest Palindromic Substring"] || false, category: "String" },
      { id: 36, title: "Regular Expression Matching", difficulty: "Hard", completed: completedProblems["Regular Expression Matching"] || false, category: "String" },
      { id: 37, title: "Valid Anagram", difficulty: "Easy", completed: completedProblems["Valid Anagram"] || false, category: "String" },
      { id: 38, title: "Group Anagrams", difficulty: "Medium", completed: completedProblems["Group Anagrams"] || false, category: "String" },
      { id: 39, title: "Word Break", difficulty: "Medium", completed: completedProblems["Word Break"] || false, category: "String" },
    ],
    LinkedList: [
      { id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", completed: completedProblems["Merge Two Sorted Lists"], category: "LinkedList" },
      { id: 9, title: "Linked List Cycle", difficulty: "Easy", completed: completedProblems["Linked List Cycle"], category: "LinkedList" },
      { id: 17, title: "Reverse Linked List", difficulty: "Easy", completed: completedProblems["Reverse Linked List"] || false, category: "LinkedList" },
      { id: 18, title: "Remove Nth Node From End of List", difficulty: "Medium", completed: completedProblems["Remove Nth Node From End of List"] || false, category: "LinkedList" },
      { id: 19, title: "Merge K Sorted Lists", difficulty: "Hard", completed: completedProblems["Merge K Sorted Lists"] || false, category: "LinkedList" },
      { id: 40, title: "Add Two Numbers", difficulty: "Medium", completed: completedProblems["Add Two Numbers"] || false, category: "LinkedList" },
      { id: 41, title: "Copy List with Random Pointer", difficulty: "Medium", completed: completedProblems["Copy List with Random Pointer"] || false, category: "LinkedList" },
      { id: 42, title: "LRU Cache", difficulty: "Medium", completed: completedProblems["LRU Cache"] || false, category: "LinkedList" },
      { id: 43, title: "Sort List", difficulty: "Medium", completed: completedProblems["Sort List"] || false, category: "LinkedList" },
      { id: 44, title: "Intersection of Two Linked Lists", difficulty: "Easy", completed: completedProblems["Intersection of Two Linked Lists"] || false, category: "LinkedList" },
      { id: 45, title: "Palindrome Linked List", difficulty: "Easy", completed: completedProblems["Palindrome Linked List"] || false, category: "LinkedList" },
      { id: 46, title: "Remove Duplicates from Sorted List", difficulty: "Easy", completed: completedProblems["Remove Duplicates from Sorted List"] || false, category: "LinkedList" },
    ],
    Tree: [
      { id: 5, title: "Binary Tree Inorder Traversal", difficulty: "Easy", completed: completedProblems["Binary Tree Inorder Traversal"], category: "Tree" },
      { id: 6, title: "Symmetric Tree", difficulty: "Easy", completed: completedProblems["Symmetric Tree"], category: "Tree" },
      { id: 20, title: "Maximum Depth of Binary Tree", difficulty: "Easy", completed: completedProblems["Maximum Depth of Binary Tree"] || false, category: "Tree" },
      { id: 21, title: "Validate Binary Search Tree", difficulty: "Medium", completed: completedProblems["Validate Binary Search Tree"] || false, category: "Tree" },
      { id: 22, title: "Binary Tree Level Order Traversal", difficulty: "Medium", completed: completedProblems["Binary Tree Level Order Traversal"] || false, category: "Tree" },
      { id: 47, title: "Convert Sorted Array to Binary Search Tree", difficulty: "Easy", completed: completedProblems["Convert Sorted Array to Binary Search Tree"] || false, category: "Tree" },
      { id: 48, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", completed: completedProblems["Construct Binary Tree from Preorder and Inorder Traversal"] || false, category: "Tree" },
      { id: 49, title: "Path Sum", difficulty: "Easy", completed: completedProblems["Path Sum"] || false, category: "Tree" },
      { id: 50, title: "Flatten Binary Tree to Linked List", difficulty: "Medium", completed: completedProblems["Flatten Binary Tree to Linked List"] || false, category: "Tree" },
      { id: 51, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", completed: completedProblems["Binary Tree Maximum Path Sum"] || false, category: "Tree" },
      { id: 52, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", completed: completedProblems["Lowest Common Ancestor of a Binary Tree"] || false, category: "Tree" },
      { id: 53, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", completed: completedProblems["Serialize and Deserialize Binary Tree"] || false, category: "Tree" },
    ],
    "Dynamic Programming": [
      { id: 23, title: "Climbing Stairs", difficulty: "Easy", completed: completedProblems["Climbing Stairs"] || false, category: "Dynamic Programming" },
      { id: 24, title: "Coin Change", difficulty: "Medium", completed: completedProblems["Coin Change"] || false, category: "Dynamic Programming" },
      { id: 25, title: "Longest Increasing Subsequence", difficulty: "Medium", completed: completedProblems["Longest Increasing Subsequence"] || false, category: "Dynamic Programming" },
      { id: 26, title: "Word Break", difficulty: "Medium", completed: completedProblems["Word Break"] || false, category: "Dynamic Programming" },
      { id: 27, title: "Longest Palindromic Substring", difficulty: "Medium", completed: completedProblems["Longest Palindromic Substring"] || false, category: "Dynamic Programming" },
      { id: 54, title: "House Robber", difficulty: "Medium", completed: completedProblems["House Robber"] || false, category: "Dynamic Programming" },
      { id: 55, title: "Unique Paths", difficulty: "Medium", completed: completedProblems["Unique Paths"] || false, category: "Dynamic Programming" },
      { id: 56, title: "Jump Game", difficulty: "Medium", completed: completedProblems["Jump Game"] || false, category: "Dynamic Programming" },
      { id: 57, title: "Edit Distance", difficulty: "Hard", completed: completedProblems["Edit Distance"] || false, category: "Dynamic Programming" },
      { id: 58, title: "Maximum Subarray", difficulty: "Easy", completed: completedProblems["Maximum Subarray"] || false, category: "Dynamic Programming" },
      { id: 59, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", completed: completedProblems["Best Time to Buy and Sell Stock"] || false, category: "Dynamic Programming" },
      { id: 60, title: "Longest Common Subsequence", difficulty: "Medium", completed: completedProblems["Longest Common Subsequence"] || false, category: "Dynamic Programming" },
    ],
  };

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  // Open problem page
  const openProblem = (title: string) => {
    router.push(`/dashboard/student/coding/${title}`);
  };

  // Add mark as solved functionality
  const markAsSolved = (problemTitle: string) => {
    setCompletedProblems((prev) => {
      const newState = {
        ...prev,
        [problemTitle]: true,
      };
      return newState;
    });
  };

  // Calculate progress
  const totalProblems = Object.values(completedProblems).length;
  const solvedProblems = Object.values(completedProblems).filter(Boolean).length;
  const progressPercentage = (solvedProblems / totalProblems) * 100;
  const router = useRouter();

  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 -m-6'>
        {/* Navigation Bar */}
        <header className='sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center space-x-4'>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>CodeQuest 150</h1>
                <div className='hidden md:flex items-center space-x-4'>
                  <span className='text-sm text-gray-600 dark:text-gray-300'>Progress:</span>
                  <div className='flex items-center space-x-2'>
                    <div className='w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                      <div className='h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out' style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                      {solvedProblems}/{totalProblems}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='space-y-8'>
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                    <Target size={24} className='text-blue-600 dark:text-blue-400' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Problems Solved</p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>{solvedProblems}</p>
                  </div>
                </div>
              </div>
              <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
                    <Zap size={24} className='text-purple-600 dark:text-purple-400' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Current Streak</p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>5 days</p>
                  </div>
                </div>
              </div>
              <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 rounded-lg bg-green-100 dark:bg-green-900/30'>
                    <Brain size={24} className='text-green-600 dark:text-green-400' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Skill Level</p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>Advanced</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Card */}
            <div className='bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 text-white shadow-lg'>
              <div className='flex items-center justify-between'>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-bold'>CodeQuest Challenge</h2>
                  <p className='text-blue-100'>Complete all 150 challenges to earn your coding mastery badge!</p>
                  <button className='px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors'>Start Challenge</button>
                </div>
                <div className='hidden md:block'>
                  <div className='w-32 h-32 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center'>
                    <Sparkles size={48} className='text-white' />
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Categories */}
            <div className='space-y-6'>
              {Object.keys(categories).map((category) => (
                <div key={category} className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
                  {/* Category Header */}
                  <div className='p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors' onClick={() => toggleCategory(category)}>
                    <div className='flex items-center space-x-3'>
                      {expandedCategories[category] ? <ChevronDown size={20} className='text-blue-500' /> : <ChevronRight size={20} className='text-blue-500' />}
                      <h3 className='font-semibold text-gray-900 dark:text-white'>{category}</h3>
                      <span className='px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'>{categories[category].length}</span>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <span className='text-sm text-gray-600 dark:text-gray-400'>
                        {categories[category].filter((p) => p.completed).length}/{categories[category].length} solved
                      </span>
                      <div className='w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-blue-500 rounded-full transition-all duration-500 ease-out'
                          style={{
                            width: `${(categories[category].filter((p) => p.completed).length / categories[category].length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Problems List */}
                  {expandedCategories[category] && (
                    <div className='border-t border-gray-200 dark:border-gray-700'>
                      {categories[category].map((problem) => (
                        <div key={problem.id} className='p-4 flex items-center justify-between border-b last:border-b-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors'>
                          <div className='flex items-center space-x-3' onClick={() => openProblem(problem.title)}>
                            {problem.completed ? <CheckCircle size={20} className='text-blue-500' /> : <div className='w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600' />}
                            <span className='font-medium text-gray-900 dark:text-white'>{problem.title}</span>
                          </div>
                          <div className='flex items-center space-x-4'>
                            <span
                              className={`px-3 py-1 text-xs rounded-full font-medium
                              ${problem.difficulty === "Easy" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}
                            >
                              {problem.difficulty}
                            </span>
                            {!problem.completed && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsSolved(problem.title);
                                }}
                                className='px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow transition-all duration-200 flex items-center space-x-2'
                              >
                                <CheckCircle size={16} />
                                <span>Mark as Solved</span>
                              </button>
                            )}
                            <button className='p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors' onClick={() => openProblem(problem.title)}>
                              <ExternalLink size={16} className='text-gray-500 dark:text-gray-400' />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
