"use client";
import React from "react";
import { useState } from "react";
import { BookOpen, ArrowRight, Search, Filter, Code, Activity, Brain, Database, Cpu, Network, Zap, BarChart2, GitBranch, PieChart, Star, Clock, ThumbsUp, Bookmark, TrendingUp, Layers } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Stat {
  label: string;
  value: string;
}

interface ProblemSet {
  id: number;
  title: string;
  description: string;
  problems: number;
  difficulty: string;
  progress: number;
  icon: React.ReactElement;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  progressColor: string;
  buttonGradient: string;
  stats: Stat[];
  category: string;
  featured: boolean;
  users: number;
  rating: number;
  lastUpdated: string;
}

export default function ProblemSetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const router = useRouter();

  const categories = [
    { id: "all", name: "All Sets" },
    { id: "interview", name: "Interview Prep" },
    { id: "datastructures", name: "Data Structures" },
    { id: "algorithms", name: "Algorithms" },
    { id: "popular", name: "Most Popular" },
  ];

  const problemSets = [
    {
      id: 1,
      title: "Top 50 Interview Questions",
      description: "Master the most frequently asked coding interview questions from leading tech companies",
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
      category: "interview",
      featured: true,
      users: 12450,
      rating: 4.9,
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Data Structures Mastery",
      description: "Comprehensive coverage of essential data structures with practical implementations",
      problems: 40,
      difficulty: "Medium",
      progress: 60,
      icon: <Database className='w-6 h-6 text-white' />,
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
      category: "datastructures",
      featured: true,
      users: 9820,
      rating: 4.7,
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Algorithm Patterns",
      description: "Learn common algorithm patterns and techniques for solving complex problems",
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
      category: "algorithms",
      featured: true,
      users: 7645,
      rating: 4.8,
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      title: "System Design Fundamentals",
      description: "Master the fundamentals of designing scalable, reliable distributed systems",
      problems: 25,
      difficulty: "Hard",
      progress: 30,
      icon: <Network className='w-6 h-6 text-white' />,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      borderColor: "border-orange-100 dark:border-orange-800/40",
      progressColor: "bg-orange-500 dark:bg-orange-600",
      buttonGradient: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      stats: [
        { label: "Design", value: "10" },
        { label: "Scaling", value: "8" },
        { label: "DB", value: "7" },
      ],
      category: "interview",
      featured: false,
      users: 6250,
      rating: 4.6,
      lastUpdated: "2 weeks ago",
    },
    {
      id: 5,
      title: "Dynamic Programming Deep Dive",
      description: "Comprehensive study of dynamic programming with step-by-step solutions",
      problems: 30,
      difficulty: "Hard",
      progress: 15,
      icon: <GitBranch className='w-6 h-6 text-white' />,
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
      borderColor: "border-cyan-100 dark:border-cyan-800/40",
      progressColor: "bg-cyan-600 dark:bg-cyan-500",
      buttonGradient: "from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700",
      stats: [
        { label: "1D DP", value: "12" },
        { label: "2D DP", value: "10" },
        { label: "Advanced", value: "8" },
      ],
      category: "algorithms",
      featured: false,
      users: 5120,
      rating: 4.8,
      lastUpdated: "5 days ago",
    },
    {
      id: 6,
      title: "Graph Algorithms Specialization",
      description: "Master essential graph algorithms from basic traversal to advanced problems",
      problems: 28,
      difficulty: "Medium",
      progress: 0,
      icon: <Activity className='w-6 h-6 text-white' />,
      gradient: "from-violet-600 to-indigo-600",
      bgGradient: "from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20",
      borderColor: "border-violet-100 dark:border-violet-800/40",
      progressColor: "bg-violet-600 dark:bg-violet-500",
      buttonGradient: "from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700",
      stats: [
        { label: "BFS/DFS", value: "10" },
        { label: "Shortest", value: "8" },
        { label: "MST", value: "10" },
      ],
      category: "datastructures",
      featured: false,
      users: 4780,
      rating: 4.7,
      lastUpdated: "1 week ago",
    },
    {
      id: 7,
      title: "FAANG Interview Questions",
      description: "Curated selection of actual interview questions from Facebook, Amazon, Apple, Netflix, and Google",
      problems: 45,
      difficulty: "Mixed",
      progress: 0,
      icon: <Star className='w-6 h-6 text-white' />,
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
      borderColor: "border-amber-100 dark:border-amber-800/40",
      progressColor: "bg-amber-500 dark:bg-amber-600",
      buttonGradient: "from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
      stats: [
        { label: "FB", value: "10" },
        { label: "Amazon", value: "12" },
        { label: "Google", value: "13" },
      ],
      category: "interview",
      featured: false,
      users: 15230,
      rating: 4.9,
      lastUpdated: "3 days ago",
    },
    {
      id: 8,
      title: "Binary Trees & BST Problems",
      description: "Comprehensive collection of binary tree and binary search tree problems",
      problems: 32,
      difficulty: "Medium",
      progress: 0,
      icon: <Layers className='w-6 h-6 text-white' />,
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-100 dark:border-green-800/40",
      progressColor: "bg-green-600 dark:bg-green-500",
      buttonGradient: "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
      stats: [
        { label: "Traversal", value: "8" },
        { label: "BST", value: "12" },
        { label: "Advanced", value: "12" },
      ],
      category: "datastructures",
      featured: false,
      users: 6840,
      rating: 4.6,
      lastUpdated: "1 week ago",
    },
    {
      id: 9,
      title: "Weekly Coding Challenge Set",
      description: "Fresh problems updated weekly to keep your skills sharp and current",
      problems: 20,
      difficulty: "Mixed",
      progress: 0,
      icon: <TrendingUp className='w-6 h-6 text-white' />,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
      borderColor: "border-pink-100 dark:border-pink-800/40",
      progressColor: "bg-pink-500 dark:bg-pink-600",
      buttonGradient: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
      stats: [
        { label: "Easy", value: "8" },
        { label: "Medium", value: "8" },
        { label: "Hard", value: "4" },
      ],
      category: "popular",
      featured: false,
      users: 8320,
      rating: 4.7,
      lastUpdated: "2 days ago",
    },
  ];

  // Filter problem sets based on search term and category
  const filteredSets = problemSets.filter((set) => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) || set.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterBy === "all" || set.category === filterBy;
    return matchesSearch && matchesCategory;
  });

  // Featured sets go first, then sort by popularity
  const sortedSets = [...filteredSets].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.users - a.users;
  });

  return (
    <DashboardLayout userRole='student'>
      <div className='bg-gray-50 -m-10 dark:bg-gray-900 min-h-screen pb-12'>
        {/* Hero Section */}
        <div className='bg-gradient-to-br from-violet-600 to-indigo-700 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute left-0 right-0 top-0 bg-white h-96 -skew-y-6 transform origin-top-right'></div>
          </div>
          <div className='max-w-7xl mx-auto relative z-10'>
            <div className='text-center'>
              <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>Problem Sets Library</h1>
              <p className='mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl'>Curated collections to improve your coding skills, prepare for interviews, and master algorithms</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10'>
          {/* Search and Filter Section */}
          <div className='bg-white mt-2 dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              {/* Search Section */}
              <div className='flex-1 max-w-2xl'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <Search className='h-5 w-5 text-gray-400' />
                  </div>
                  <input type='text' className='block w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400' placeholder='Search problem sets by name or description...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>

              {/* Filter Section */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Filter className='h-5 w-5 text-violet-500 dark:text-violet-400' />
                  <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Filter by:</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {categories.map((category) => (
                    <button key={category.id} className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${filterBy === category.id ? "bg-violet-600 text-white shadow-md hover:bg-violet-700" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`} onClick={() => setFilterBy(category.id)}>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Sets Section */}
          {sortedSets.filter((set) => set.featured).length > 0 && (
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 dark:border-gray-700'>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                  <Star className='w-7 h-7 mr-3 text-amber-500' />
                  Featured Problem Sets
                </h2>
                <div className='px-4 py-1.5 text-sm font-medium text-amber-800 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-200 rounded-lg'>Highly Recommended</div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {sortedSets
                  .filter((set) => set.featured)
                  .map((set) => (
                    <ProblemSetCard key={set.id} set={set} />
                  ))}
              </div>
            </div>
          )}

          {/* All Problem Sets Section */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                <BookOpen className='w-7 h-7 mr-3 text-violet-600 dark:text-violet-400' />
                All Problem Sets
              </h2>
              <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>Showing {sortedSets.length} sets</span>
            </div>

            {sortedSets.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {sortedSets.map((set) => (
                  <ProblemSetCard key={set.id} set={set} />
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <div className='mx-auto h-24 w-24 text-gray-400'>
                  <Search className='h-full w-full' />
                </div>
                <h3 className='mt-2 text-lg font-medium text-gray-900 dark:text-white'>No problem sets found</h3>
                <p className='mt-1 text-gray-500 dark:text-gray-400'>Try adjusting your search or filter to find what you're looking for.</p>
                <div className='mt-6'>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterBy("all");
                    }}
                    className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700'
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Problem Set Card Component
function ProblemSetCard({ set }: { set: ProblemSet }) {
  const router = useRouter();
  return (
    <div className={`group relative overflow-hidden bg-gradient-to-br ${set.bgGradient} rounded-xl border ${set.borderColor} hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-1 ease-in-out`}>
      {set.featured && (
        <div className='absolute top-0 right-0'>
          <div className='w-20 h-20 relative overflow-hidden'>
            <div className='absolute top-0 right-0 transform translate-y-[-50%] translate-x-[50%] rotate-45 bg-blue-500 text-white font-medium py-1 px-10 text-xs shadow-md'>Featured</div>
          </div>
        </div>
      )}

      <div className='p-7 relative z-10'>
        <div className='flex items-start justify-between mb-5'>
          <div className={`bg-gradient-to-br p-3.5 rounded-xl shadow-lg ${set.gradient} transform transition-transform group-hover:scale-110 duration-300`}>
            <div className='text-white'>{set.icon}</div>
          </div>
          <span className={`px-3.5 py-1.5 text-sm font-medium rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700`}>{set.difficulty}</span>
        </div>

        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors'>{set.title}</h3>
        <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>{set.description}</p>

        <div className='flex items-center justify-between mb-4 text-sm'>
          <div className='flex items-center text-gray-500 dark:text-gray-400'>
            <ThumbsUp className='w-4 h-4 mr-1' />
            <span>{set.rating}</span>
          </div>
          <div className='flex items-center text-gray-500 dark:text-gray-400'>
            <Clock className='w-4 h-4 mr-1' />
            <span>{set.lastUpdated}</span>
          </div>
          <div className='flex items-center text-gray-500 dark:text-gray-400'>
            <Bookmark className='w-4 h-4 mr-1' />
            <span>{set.users.toLocaleString()}</span>
          </div>
        </div>

        <div className='space-y-5'>
          <div className='grid grid-cols-3 gap-3'>
            {set.stats.map((stat: Stat, idx: number) => (
              <div key={idx} className='text-center p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-lg font-semibold text-gray-900 dark:text-white'>{stat.value}</div>
                <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className='space-y-2.5'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Progress</span>
              <span className='font-semibold text-gray-900 dark:text-white'>{set.progress > 0 ? `${set.progress}%` : "Not Started"}</span>
            </div>
            <div className='h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
              <div className={`h-full rounded-full transition-all duration-500 ${set.progressColor}`} style={{ width: `${set.progress}%` }} />
            </div>
          </div>

          <button
            className={`w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg bg-gradient-to-r ${set.buttonGradient}`}
            onClick={() => {
              toast.success("Redirecting to the problem set");
              router.push(`/dashboard/student/coding/sheet/${set.id}`);
            }}
          >
            {set.progress > 0 ? "Continue" : "Start"} Set
            <ArrowRight className='ml-2 w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
