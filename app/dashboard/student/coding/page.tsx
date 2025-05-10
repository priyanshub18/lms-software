"use client";
import { useState, useEffect } from "react";
import { Search, Code, Clock, BarChart, Tag, Award, Users, BookOpen, CheckCircle, AlertTriangle, ChevronRight, Star, Zap, TrendingUp, Activity, Filter, Coffee, Brain, Trophy, ArrowRight, Crown } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";
interface TestCase {
  input: any;
  expected: any;
}

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  acceptance: number;
  topics: string[];
  solved: number;
  attempts: number;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  rating: number;
  popular?: boolean;
  trending?: boolean;
  type: string;
  language: string;
  testCases: TestCase[];
}

export default function ProblemListingPage() {
  // Sample problem data
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: 48.7,
      topics: ["Arrays", "Hash Table"],
      solved: 2453678,
      attempts: 4976543,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      rating: 4.7,
      popular: true,
      type: "coding",
      language: "javascript",
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
        { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      ],
    },
    {
      id: 2,
      title: "Merge Sorted Lists",
      difficulty: "Medium",
      acceptance: 42.1,
      topics: ["Linked List", "Recursion"],
      solved: 1876502,
      attempts: 3210987,
      timeComplexity: "O(n+m)",
      spaceComplexity: "O(1)",
      description: "Merge two sorted linked lists and return it as a new sorted list.",
      rating: 4.5,
      trending: true,
      type: "coding",
      language: "python",
      testCases: [{ input: { l1: [1, 2, 4], l2: [1, 3, 4] }, expected: [1, 1, 2, 3, 4, 4] }],
    },
    {
      id: 3,
      title: "LRU Cache",
      difficulty: "Hard",
      acceptance: 35.8,
      topics: ["Hash Table", "Linked List", "Design"],
      solved: 987651,
      attempts: 2456789,
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
      description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
      rating: 4.9,
      popular: true,
      type: "coding",
      language: "java",
      testCases: [{ input: { capacity: 2, operations: ["put", "put", "get", "put", "get"] }, expected: [null, null, 1, null, -1] }],
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      acceptance: 39.5,
      topics: ["Stack", "String"],
      solved: 2134567,
      attempts: 4321098,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      rating: 4.2,
      type: "coding",
      language: "javascript",
      testCases: [
        { input: "()", expected: true },
        { input: "()[]{}", expected: true },
        { input: "(]", expected: false },
      ],
    },
    {
      id: 5,
      title: "Maximum Subarray",
      difficulty: "Medium",
      acceptance: 47.3,
      topics: ["Array", "Dynamic Programming", "Divide and Conquer"],
      solved: 1782345,
      attempts: 3567890,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      description: "Find the contiguous subarray which has the largest sum.",
      rating: 4.6,
      trending: true,
      type: "coding",
      language: "python",
      testCases: [
        { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 },
        { input: [1], expected: 1 },
        { input: [5, 4, -1, 7, 8], expected: 23 },
      ],
    },
    {
      id: 6,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      acceptance: 56.7,
      topics: ["Tree", "BFS", "Binary Tree"],
      solved: 1456789,
      attempts: 2456789,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description: "Given a binary tree, return the level order traversal of its nodes' values.",
      rating: 4.4,
      type: "coding",
      language: "java",
      testCases: [
        { input: [3, 9, 20, null, null, 15, 7], expected: [[3], [9, 20], [15, 7]] },
        { input: [1], expected: [[1]] },
        { input: [], expected: [] },
      ],
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [showFeatured, setShowFeatured] = useState(true);
  const [activeTopic, setActiveTopic] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // All unique topics from problems
  const allTopics = Array.from(new Set(problems.flatMap((problem) => problem.topics)));

  // All available languages
  const languages = ["All", "JavaScript", "Python", "Java", "C++", "C#"];

  // Filter problems based on difficulty, topic, language, and search query
  useEffect(() => {
    let filtered = problems;

    if (selectedFilter !== "All") {
      filtered = filtered.filter((problem) => problem.difficulty === selectedFilter);
    }

    if (activeTopic !== "All") {
      filtered = filtered.filter((problem) => problem.topics.includes(activeTopic));
    }

    if (selectedLanguage !== "All") {
      filtered = filtered.filter((problem) => problem.language.toLowerCase() === selectedLanguage.toLowerCase());
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((problem) => problem.title.toLowerCase().includes(query) || problem.topics.some((topic) => topic.toLowerCase().includes(query)) || problem.description.toLowerCase().includes(query));
    }

    setFilteredProblems(filtered);
  }, [selectedFilter, searchQuery, problems, activeTopic, selectedLanguage]);

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-500 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30";
      case "Medium":
        return "text-amber-500 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30";
      case "Hard":
        return "text-rose-500 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-gray-800";
    }
  };

  // Helper function to get difficulty icon
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <Coffee className='h-4 w-4 mr-1' />;
      case "Medium":
        return <Award className='h-4 w-4 mr-1' />;
      case "Hard":
        return <Brain className='h-4 w-4 mr-1' />;
      default:
        return null;
    }
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  // Featured problems - popular and trending
  const featuredProblems = problems.filter((p) => p.popular || p.trending);
  const router = useRouter();
  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen -m-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100'>
        {/* Hero Section */}
        <div className='relative bg-indigo-900 dark:bg-gray-900 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 mix-blend-multiply'></div>
            <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")]'></div>
          </div>

          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative'>
            <div className='text-center sm:text-left md:flex md:items-center md:justify-between'>
              <div className='md:max-w-2xl'>
                <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl'>
                  <span className='block'>Practice Coding</span>
                  <span className='block text-indigo-300 text-2xl sm:text-3xl mt-2'>Master algorithms. Solve challenges.</span>
                </h1>
                <p className='mt-3 max-w-md mx-auto md:mx-0 text-lg text-indigo-200 sm:text-xl'>Level up your coding skills with our curated collection of algorithm challenges.</p>
              </div>

              <div className='mt-8 md:mt-0 md:ml-8'>
                <div className='flex flex-col gap-3 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
                  <div className='flex items-center'>
                    <div className='p-2 rounded-lg bg-white/10'>
                      <CheckCircle className='h-6 w-6 text-indigo-300' />
                    </div>
                    <span className='ml-3 text-white'>Interactive coding environment</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='p-2 rounded-lg bg-white/10'>
                      <Award className='h-6 w-6 text-indigo-300' />
                    </div>
                    <span className='ml-3 text-white'>Earn points and badges</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='p-2 rounded-lg bg-white/10'>
                      <Users className='h-6 w-6 text-indigo-300' />
                    </div>
                    <span className='ml-3 text-white'>Join a community of coders</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className='mt-10 max-w-xl mx-auto md:mx-0'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Search className='h-5 w-5 text-gray-400' />
                </div>
                <input type='text' className='block w-full pl-12 pr-4 py-4 rounded-xl text-base border-0 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm transition' placeholder='Search problems, topics, algorithms...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Section - Moved up */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 relative z-10'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                <Trophy className='w-7 h-7 mr-3 text-amber-500 dark:text-amber-400' />
                Top Performers
              </h2>
              <div className='flex items-center space-x-3'>
                <button className='px-5 py-2.5 text-sm font-medium text-white bg-violet-600 dark:bg-violet-500 rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-200 shadow-sm hover:shadow'>Weekly</button>
                <button className='px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200'>Monthly</button>
                <button className='px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200'>All Time</button>
              </div>
            </div>

            <div className='overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-50 dark:bg-gray-800/80'>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Rank</th>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>User</th>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Solved</th>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Accuracy</th>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Points</th>
                    <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Streak</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {[
                    {
                      rank: 1,
                      name: "Alex Johnson",
                      solved: 245,
                      accuracy: 98.5,
                      points: 12500,
                      streak: 15,
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                      badgeColor: "bg-gradient-to-br from-amber-300 to-yellow-500 dark:from-amber-400 dark:to-yellow-600",
                    },
                    {
                      rank: 2,
                      name: "Sarah Chen",
                      solved: 238,
                      accuracy: 97.8,
                      points: 11800,
                      streak: 12,
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                      badgeColor: "bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-400 dark:to-gray-500",
                    },
                    {
                      rank: 3,
                      name: "Michael Park",
                      solved: 230,
                      accuracy: 96.2,
                      points: 11200,
                      streak: 10,
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                      badgeColor: "bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600",
                    },
                    {
                      rank: 4,
                      name: "Emma Wilson",
                      solved: 225,
                      accuracy: 95.8,
                      points: 10800,
                      streak: 8,
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
                      badgeColor: "",
                    },
                    {
                      rank: 5,
                      name: "David Kim",
                      solved: 220,
                      accuracy: 94.5,
                      points: 10500,
                      streak: 7,
                      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
                      badgeColor: "",
                    },
                  ].map((user) => (
                    <tr key={user.rank} className='hover:bg-gray-50/70 dark:hover:bg-gray-800/60 transition-colors'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>{user.rank <= 3 ? <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${user.badgeColor} text-white`}>{user.rank === 1 ? <Crown className='w-5 h-5' /> : <span className='font-bold'>{user.rank}</span>}</div> : <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold'>{user.rank}</div>}</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-3'>
                          <div className='relative'>
                            <img src={user.avatar} alt={user.name} className='w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-sm' />
                            {user.rank === 1 && (
                              <div className='absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-sm'>
                                <Star className='w-3 h-3' fill='white' />
                              </div>
                            )}
                          </div>
                          <span className='font-semibold text-gray-900 dark:text-white'>{user.name}</span>
                          {user.rank === 1 && <span className='px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 rounded-full'>Leader</span>}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='font-medium text-gray-700 dark:text-gray-300'>{user.solved}</span>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>problems</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-2'>
                          <div className='w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                            <div className='h-full rounded-full bg-green-500 dark:bg-green-400' style={{ width: `${user.accuracy}%` }} />
                          </div>
                          <span className='font-medium text-gray-700 dark:text-gray-300'>{user.accuracy}%</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='font-medium text-violet-600 dark:text-violet-400'>{user.points.toLocaleString()}</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>total pts</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit'>
                          <Zap className='w-4 h-4 text-amber-500 dark:text-amber-400' />
                          <span className='font-medium text-gray-700 dark:text-gray-300'>{user.streak}</span>
                          <span className='text-xs text-gray-500 dark:text-gray-400'>days</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Curated Problem Sets Section */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 relative z-10'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                <BookOpen className='w-7 h-7 mr-3 text-violet-600 dark:text-violet-400' />
                Curated Problem Sets
              </h2>
              <button className='px-5 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center'>
                View All Sets
                <ArrowRight className='w-4 h-4 ml-2' />
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                {
                  title: "Top 50 Interview Questions",
                  description: "Master the most frequently asked coding interview questions",
                  problems: 50,
                  difficulty: "Mixed",
                  progress: 75,
                  icon: <Code className='w-6 h-6 text-white' />,
                  gradient: "from-blue-600 to-indigo-700",
                  bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                  borderColor: "border-blue-100 dark:border-blue-800/40",
                  progressColor: "bg-blue-600 dark:bg-blue-500",
                  buttonGradient: "from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800",
                  stats: [
                    { label: "Easy", value: "20" },
                    { label: "Medium", value: "25" },
                    { label: "Hard", value: "5" },
                  ],
                },
                {
                  title: "Data Structures Mastery",
                  description: "Comprehensive coverage of essential data structures",
                  problems: 40,
                  difficulty: "Medium",
                  progress: 60,
                  icon: <Activity className='w-6 h-6 text-white' />,
                  gradient: "from-purple-600 to-pink-600",
                  bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
                  borderColor: "border-purple-100 dark:border-purple-800/40",
                  progressColor: "bg-purple-600 dark:bg-purple-500",
                  buttonGradient: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                  stats: [
                    { label: "Arrays", value: "15" },
                    { label: "Trees", value: "10" },
                    { label: "Graphs", value: "15" },
                  ],
                },
                {
                  title: "Algorithm Patterns",
                  description: "Learn common algorithm patterns and techniques",
                  problems: 35,
                  difficulty: "Hard",
                  progress: 45,
                  icon: <Brain className='w-6 h-6 text-white' />,
                  gradient: "from-emerald-600 to-teal-600",
                  bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
                  borderColor: "border-emerald-100 dark:border-emerald-800/40",
                  progressColor: "bg-emerald-600 dark:bg-emerald-500",
                  buttonGradient: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
                  stats: [
                    { label: "DP", value: "12" },
                    { label: "Greedy", value: "8" },
                    { label: "Backtrack", value: "15" },
                  ],
                },
              ].map((set, index) => (
                <div key={index} className={`group relative overflow-hidden bg-gradient-to-br ${set.bgGradient} rounded-xl border ${set.borderColor} hover:shadow-2xl transition-all duration-400 transform ease-in-out`}>
                  <div className='p-7 relative z-10'>
                    <div className='flex items-start justify-between mb-5'>
                      <div className={`bg-gradient-to-br p-3.5 rounded-xl shadow-lg ${set.gradient}`}>
                        <div className='text-white'>{set.icon}</div>
                      </div>
                      <span className={`px-3.5 py-1.5 text-sm font-medium rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700`}>{set.difficulty}</span>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors'>{set.title}</h3>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>{set.description}</p>

                    <div className='space-y-5'>
                      <div className='grid grid-cols-3 gap-3'>
                        {set.stats.map((stat, idx) => (
                          <div key={idx} className='text-center p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm'>
                            <div className='text-lg font-semibold text-gray-900 dark:text-white'>{stat.value}</div>
                            <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className='space-y-2.5'>
                        <div className='flex items-center justify-between'>
                          <span className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Progress</span>
                          <span className='font-semibold text-gray-900 dark:text-white'>{set.progress}%</span>
                        </div>
                        <div className='h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                          <div className={`h-full rounded-full transition-all duration-500 ${set.progressColor}`} style={{ width: `${set.progress}%` }} />
                        </div>
                      </div>

                      <button
                        className={`w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg bg-gradient-to-r ${set.buttonGradient}`}
                        onClick={() => {
                          router.push("/dashboard/student/coding/sheet/1");
                        }}
                      >
                        Continue Set
                        <ArrowRight className='ml-2 w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {/* Filter & Stats Container */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-0'>Challenge Categories</h2>

              {/* Filter Tabs */}
              <div className='bg-gray-100 dark:bg-gray-700 p-1 rounded-xl shadow-inner'>
                <div className='inline-flex'>
                  <button onClick={() => setSelectedFilter("All")} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === "All" ? "bg-indigo-600 text-white shadow" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                    All
                  </button>
                  <button onClick={() => setSelectedFilter("Easy")} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === "Easy" ? "bg-emerald-500 text-white shadow" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                    <span className='flex items-center'>
                      <Coffee className='w-4 h-4 mr-1.5' />
                      Easy
                    </span>
                  </button>
                  <button onClick={() => setSelectedFilter("Medium")} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === "Medium" ? "bg-amber-500 text-white shadow" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                    <span className='flex items-center'>
                      <Award className='w-4 h-4 mr-1.5' />
                      Medium
                    </span>
                  </button>
                  <button onClick={() => setSelectedFilter("Hard")} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedFilter === "Hard" ? "bg-rose-500 text-white shadow" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                    <span className='flex items-center'>
                      <Brain className='w-4 h-4 mr-1.5' />
                      Hard
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl p-5 shadow-md border border-indigo-100 dark:border-indigo-800/50'>
                <div className='flex items-center'>
                  <div className='bg-indigo-100 dark:bg-indigo-800 rounded-full p-3 mr-4'>
                    <BookOpen className='h-6 w-6 text-indigo-600 dark:text-indigo-300' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-indigo-600 dark:text-indigo-300'>Total Problems</p>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{problems.length}</h3>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl p-5 shadow-md border border-emerald-100 dark:border-emerald-800/50'>
                <div className='flex items-center'>
                  <div className='bg-emerald-100 dark:bg-emerald-800 rounded-full p-3 mr-4'>
                    <Coffee className='h-6 w-6 text-emerald-600 dark:text-emerald-300' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-emerald-600 dark:text-emerald-300'>Easy Problems</p>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{problems.filter((p) => p.difficulty === "Easy").length}</h3>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl p-5 shadow-md border border-amber-100 dark:border-amber-800/50'>
                <div className='flex items-center'>
                  <div className='bg-amber-100 dark:bg-amber-800 rounded-full p-3 mr-4'>
                    <Award className='h-6 w-6 text-amber-600 dark:text-amber-300' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-amber-600 dark:text-amber-300'>Medium Problems</p>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{problems.filter((p) => p.difficulty === "Medium").length}</h3>
                  </div>
                </div>
              </div>

              <div className='bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 rounded-xl p-5 shadow-md border border-rose-100 dark:border-rose-800/50'>
                <div className='flex items-center'>
                  <div className='bg-rose-100 dark:bg-rose-800 rounded-full p-3 mr-4'>
                    <Brain className='h-6 w-6 text-rose-600 dark:text-rose-300' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-rose-600 dark:text-rose-300'>Hard Problems</p>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{problems.filter((p) => p.difficulty === "Hard").length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Pills */}
          <div className='mb-8'>
            <div className='flex items-center mb-4'>
              <Filter className='w-5 h-5 text-indigo-600 mr-2' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Filter by Topic</h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              <button onClick={() => setActiveTopic("All")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === "All" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                All Topics
              </button>
              {allTopics.map((topic) => (
                <button key={topic} onClick={() => setActiveTopic(topic)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === topic ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          {/* <div className='mb-8'>
            <div className='flex items-center mb-4'>
              <Code className='w-5 h-5 text-indigo-600 mr-2' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Filter by Language</h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {languages.map((lang) => (
                <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLanguage === lang ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                  {lang}
                </button>
              ))}
            </div>
          </div> */}

          {/* Featured Section */}
          {showFeatured && featuredProblems.length > 0 && (
            <div className='mb-12'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                  <Zap className='w-6 h-6 mr-2 text-yellow-500' />
                  Featured Challenges
                </h2>
                <button onClick={() => setShowFeatured(false)} className='px-3 py-1 text-sm text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-all'>
                  Hide Featured
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {featuredProblems.map((problem) => (
                  <div key={`featured-${problem.id}`} className='relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-xl overflow-hidden shadow-lg border border-indigo-200 dark:border-indigo-800/50 p-6 transform transition-all hover:shadow-2xl'>
                    {problem.popular && (
                      <div className='absolute top-4 right-4 flex items-center space-x-1 text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full'>
                        <Star className='w-4 h-4 fill-current' />
                        <span className='text-xs font-medium'>Popular</span>
                      </div>
                    )}
                    {problem.trending && (
                      <div className='absolute top-4 right-4 flex items-center space-x-1 text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-full'>
                        <TrendingUp className='w-4 h-4' />
                        <span className='text-xs font-medium'>Trending</span>
                      </div>
                    )}

                    <div className='mb-4'>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {getDifficultyIcon(problem.difficulty)}
                        {problem.difficulty}
                      </span>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>{problem.title}</h3>

                    <p className='text-gray-600 dark:text-gray-300 mb-4'>{problem.description}</p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {problem.topics.map((topic, idx) => (
                        <span key={idx} className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'>
                          <Tag className='w-3 h-3 mr-1' />
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className='flex flex-wrap items-center justify-between mt-2'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center'>
                          <Users className='w-4 h-4 mr-1 text-indigo-600 dark:text-indigo-400' />
                          <span className='text-sm text-gray-700 dark:text-gray-300'>{formatNumber(problem.solved)}</span>
                        </div>
                        <div className='flex items-center'>
                          <Star className='w-4 h-4 mr-1 text-yellow-500' />
                          <span className='text-sm text-gray-700 dark:text-gray-300'>{problem.rating}</span>
                        </div>
                        <div className='flex items-center'>
                          <BarChart className='w-4 h-4 mr-1 text-indigo-600 dark:text-indigo-400' />
                          <span className='text-sm text-gray-700 dark:text-gray-300'>{problem.acceptance}%</span>
                        </div>
                      </div>

                      <button
                        className='mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                        onClick={() => {
                          router.push(`/dashboard/student/coding/${problem.id}`);
                        }}
                      >
                        Solve Challenge
                        <ChevronRight className='ml-1 w-4 h-4' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem Cards with Results Header */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                {selectedFilter === "All" ? "All Challenges" : `${selectedFilter} Challenges`}
                {activeTopic !== "All" && <span className='ml-2 text-indigo-600 dark:text-indigo-400'>• {activeTopic}</span>}
              </h2>
              <div className='px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium'>
                Showing {filteredProblems.length} of {problems.length} problems
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className='group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600'
                    onClick={() => {
                      router.push(`/dashboard/student/coding/${problem.id}`);
                      console.log(`/dashboard/student/coding/${problem.id}`);
                    }}
                  >
                    <div className='p-6'>
                      <div className='flex justify-between items-center mb-4'>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {getDifficultyIcon(problem.difficulty)}
                          {problem.difficulty}
                        </span>
                        <div className='flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg'>
                          <Star className='w-4 h-4 text-yellow-500 mr-1' />
                          <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{problem.rating}</span>
                        </div>
                      </div>

                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>{problem.title}</h3>

                      <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>{problem.description}</p>

                      <div className='flex flex-wrap gap-2 mb-5'>
                        {problem.topics.map((topic, idx) => (
                          <span key={idx} className='inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'>
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className='grid grid-cols-2 gap-y-2 mb-6 text-sm'>
                        <div className='flex items-center'>
                          <Users className='w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                          <span className='text-gray-600 dark:text-gray-300'>
                            <span className='font-medium'>{formatNumber(problem.solved)}</span> solved
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <BarChart className='w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                          <span className='text-gray-600 dark:text-gray-300'>
                            <span className='font-medium'>{problem.acceptance}%</span> acceptance
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <Clock className='w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                          <span className='text-gray-600 dark:text-gray-300'>{problem.timeComplexity}</span>
                        </div>
                        <div className='flex items-center'>
                          <Code className='w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                          <span className='text-gray-600 dark:text-gray-300'>{problem.spaceComplexity}</span>
                        </div>
                      </div>

                      <button
                        className='w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                        onClick={() => {
                          router.push(`/dashboard/student/coding/${problem.id}`);
                        }}
                      >
                        Solve Problem
                        <ChevronRight className='ml-1 w-4 h-4' />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
                  <AlertTriangle className='h-12 w-12 text-amber-500 mb-4' />
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>No problems found</h3>
                  <p className='text-gray-600 dark:text-gray-400 max-w-md'>Try adjusting your search or filter criteria to find what you're looking for.</p>
                  <button
                    onClick={() => {
                      setSelectedFilter("All");
                      setActiveTopic("All");
                      setSearchQuery("");
                    }}
                    className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredProblems.length > 0 && (
              <div className='mt-8 flex items-center justify-center'>
                <nav className='flex items-center space-x-2' aria-label='Pagination'>
                  <button className='px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50' disabled>
                    Previous
                  </button>
                  <button className='px-3 py-1 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'>1</button>
                  <button className='px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>2</button>
                  <button className='px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>3</button>
                  <span className='text-gray-700 dark:text-gray-300'>...</span>
                  <button className='px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'>Next</button>
                </nav>
              </div>
            )}
          </div>

          {/* Learning Resources Section */}

          {/* Leaderboard Section */}

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Learning Resources</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30'>
                <div className='bg-purple-100 dark:bg-purple-800/40 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4'>
                  <BookOpen className='h-6 w-6 text-purple-600 dark:text-purple-400' />
                </div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Study Materials</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>Access comprehensive study materials prepared by industry experts.</p>
                <button className='inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300'>
                  Browse materials
                  <ChevronRight className='ml-1 w-4 h-4' />
                </button>
              </div>

              <div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30'>
                <div className='bg-blue-100 dark:bg-blue-800/40 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4'>
                  <Code className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Interactive Tutorials</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>Master coding concepts with step-by-step interactive tutorials and exercises.</p>
                <button className='inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
                  Start learning
                  <ChevronRight className='ml-1 w-4 h-4' />
                </button>
              </div>

              <div className='bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800/30'>
                <div className='bg-emerald-100 dark:bg-emerald-800/40 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4'>
                  <Activity className='h-6 w-6 text-emerald-600 dark:text-emerald-400' />
                </div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Progress Tracking</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>Track your learning journey with detailed progress reports and analytics.</p>
                <button className='inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300'>
                  View progress
                  <ChevronRight className='ml-1 w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
          {/* Call to Action */}
          <div className='relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-6'>
            <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2730%27%20height%3D%2730%27%20viewBox%3D%270%200%2030%2030%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15%200C6.716%200%200%206.716%200%2015c0%208.284%206.716%2015%2015%2015%208.284%200%2015-6.716%2015-15%200-8.284-6.716-15-15-15zm0%2030C6.716%2030%200%2023.284%200%2015%200%206.716%206.716%200%2015%200c8.284%200%2015%206.716%2015%2015%200%208.284-6.716%2015-15%2015z%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27nonzero%27%2F%3E%3C%2Fsvg%3E")] opacity-20'></div>

            <div className='relative z-10 md:flex items-center justify-between'>
              <div className='md:max-w-xl mb-6 md:mb-0'>
                <h2 className='text-3xl font-bold text-white mb-2'>Ready to level up your coding skills?</h2>
                <p className='text-indigo-100'>Join thousands of developers improving their algorithm and data structure knowledge through practice.</p>
              </div>

              <div className='flex space-x-4'>
                <button className='px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md hover:bg-indigo-50 transition-colors'>Sign Up Free</button>
                <button className='px-6 py-3 bg-indigo-800 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors'>Explore More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
