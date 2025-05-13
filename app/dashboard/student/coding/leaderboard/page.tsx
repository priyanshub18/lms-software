"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Star, Crown, ChevronRight, Award, Target, Clock, ArrowUp, Users, Activity, BarChart3, Sparkles, Medal, ChevronDown, ChevronLeft, Search, Filter, X } from "lucide-react";
import { users } from "./data";
import type { User, CurrentUser } from "./types";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortField = "rank" | "solved" | "accuracy" | "points" | "streak";

const LeaderboardPage = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [showUserCard, setShowUserCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Animation states
  const [animateRank, setAnimateRank] = useState(false);
  const [animateRows, setAnimateRows] = useState(false);

  // Current user data
  const currentUser: CurrentUser = {
    rank: 42,
    name: "You",
    solved: 148,
    accuracy: 92.5,
    points: 8750,
    streak: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    progress: 76,
    nextRank: 41,
    pointsToNextRank: 120,
    badgeColor: "",
    detailedStats: {
      easyProblemsSolved: 95,
      mediumProblemsSolved: 45,
      hardProblemsSolved: 8,
      contestsParticipated: 4,
      averageSpeed: "5m 20s",
      longestStreak: 8,
      favoriteTopic: "Arrays",
      joinedDate: "Mar 2024",
      bestRank: 38,
    },
  };

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.rank.toString().includes(searchQuery))
    .sort((a, b) => {
      switch (sortBy) {
        case "points":
          return b.points - a.points;
        case "solved":
          return b.solved - a.solved;
        case "accuracy":
          return b.accuracy - a.accuracy;
        case "streak":
          return b.streak - a.streak;
        default:
          return a.rank - b.rank;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    // Trigger animations when component mounts
    setTimeout(() => setAnimateRank(true), 300);
    setTimeout(() => setAnimateRows(true), 600);
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserCard(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortField);
  };

  return (
    <DashboardLayout userRole='student'>
      <div className='min-h-screen -m-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 relative z-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700'>
            {/* User Rank Indicator */}
            <div className={`mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white relative overflow-hidden transition-all duration-700 ease-out transform ${animateRank ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2730%27%20height%3D%2730%27%20viewBox%3D%270%200%2030%2030%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15%200C6.716%200%200%206.716%200%2015c0%208.284%206.716%2015%2015%2015%208.284%200%2015-6.716%2015-15%200-8.284-6.716-15-15-15zm0%2030C6.716%2030%200%2023.284%200%2015%200%206.716%206.716%200%2015%200c8.284%200%2015%206.716%2015%2015%200%208.284-6.716%2015-15%2015z%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27nonzero%27%2F%3E%3C%2Fsvg%3E')] opacity-20"></div>
              <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-full transform hover:scale-105 transition-transform'>
                    <img src={currentUser.avatar} alt='Your Avatar' className='w-16 h-16 rounded-full border-2 border-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>Your Current Rank</h3>
                    <div className='flex items-center space-x-2 mt-1'>
                      <div className='bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-lg font-medium'>#{currentUser.rank}</div>
                      <span className='text-sm text-white/80'>out of 1,234 participants</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-6'>
                  <div className='text-center'>
                    <div className='text-sm text-white/80'>Solved</div>
                    <div className='text-2xl font-bold'>{currentUser.solved}</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-sm text-white/80'>Accuracy</div>
                    <div className='text-2xl font-bold'>{currentUser.accuracy}%</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-sm text-white/80'>Your Points</div>
                    <div className='text-2xl font-bold'>{currentUser.points.toLocaleString()}</div>
                  </div>
                  <div className='h-14 w-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform'>
                    <Trophy className='w-7 h-7 text-yellow-300' />
                  </div>
                </div>
              </div>

              {/* Progress to Next Rank */}
              <div className='mt-6 pt-4 border-t border-white/20'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm'>Next Rank: #{currentUser.nextRank}</span>
                  <span className='text-sm'>{currentUser.pointsToNextRank} pts needed</span>
                </div>
                <div className='w-full h-3 bg-white/20 rounded-full overflow-hidden'>
                  <div className='h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-1000 ease-out' style={{ width: `${currentUser.progress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Filters and Title */}
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center'>
                <Trophy className='w-7 h-7 mr-3 text-amber-500 dark:text-amber-400' />
                Top Performers
              </h2>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400' />
                  <Input placeholder='Search users...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='pl-10 w-[200px]' />
                </div>
                {/* <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rank">Rank</SelectItem>
                    <SelectItem value="solved">Problems Solved</SelectItem>
                    <SelectItem value="accuracy">Accuracy</SelectItem>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="streak">Streak</SelectItem>
                  </SelectContent>
                </Select> */}
                {/* <div className='flex items-center space-x-3'>
                  <button onClick={() => setTimeFrame("weekly")} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow ${timeFrame === "weekly" ? "text-white bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 dark:hover:bg-violet-600" : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Weekly
                  </button>
                  <button onClick={() => setTimeFrame("monthly")} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow ${timeFrame === "monthly" ? "text-white bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 dark:hover:bg-violet-600" : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    Monthly
                  </button>
                  <button onClick={() => setTimeFrame("allTime")} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow ${timeFrame === "allTime" ? "text-white bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 dark:hover:bg-violet-600" : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                    All Time
                  </button>
                </div> */}
              </div>
            </div>

            {/* Leaderboard Table */}
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
                    {/* <th className='px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-left'>Details</th> */}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {currentUsers.map((user, index) => (
                    <tr key={user.rank} className={`hover:bg-gray-50/70 dark:hover:bg-gray-800/60 transition-all duration-300 ease-out cursor-pointer transform ${animateRows ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`} style={{ transitionDelay: `${index * 100}ms` }} onClick={() => handleUserClick(user)}>
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>{user.rank <= 3 ? <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${user.badgeColor} text-white transform hover:scale-110 transition-transform`}>{user.rank === 1 ? <Crown className='w-5 h-5' /> : <span className='font-bold'>{user.rank}</span>}</div> : <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold transform hover:scale-110 transition-transform'>{user.rank}</div>}</div>
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
                          <div className='w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                            <div className='h-full rounded-full bg-green-500 dark:bg-green-400 transition-all duration-1000 ease-out' style={{ width: `${user.accuracy}%` }} />
                          </div>
                          <span className='font-medium text-gray-700 dark:text-gray-300'>{user.accuracy}%</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='font-medium text-violet-600 dark:text-violet-400'>{user.points.toLocaleString()}</div>
                        <div className='text-xs text-gray-500 dark:text-gray-400'>total pts</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit group'>
                          <Zap className='w-4 h-4 text-amber-500 dark:text-amber-400 group-hover:animate-pulse' />
                          <span className='font-medium text-gray-700 dark:text-gray-300'>{user.streak}</span>
                          <span className='text-xs text-gray-500 dark:text-gray-400'>days</span>
                        </div>
                      </td>
                      {/* <td className='px-6 py-4'>
                        <button className='px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors'>View Stats</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between mt-6'>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
              </div>
              <div className='flex items-center space-x-2'>
                <Button variant='outline' size='sm' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='flex items-center'>
                  <ChevronLeft className='h-4 w-4 mr-1' />
                  Previous
                </Button>
                <div className='flex items-center space-x-1'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size='sm' onClick={() => handlePageChange(page)} className='w-8 h-8 p-0'>
                      {page}
                    </Button>
                  ))}
                </div>
                <Button variant='outline' size='sm' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='flex items-center'>
                  Next
                  <ChevronRight className='h-4 w-4 ml-1' />
                </Button>
              </div>
            </div>

            {/* View Full Leaderboard Button */}
            {/* <div className='mt-8 flex justify-center'>
              <button className='group inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <Trophy className='w-6 h-6 mr-3 text-yellow-300 group-hover:scale-110 transition-transform' />
                <span className='text-lg'>View Full Leaderboard</span>
                <ChevronRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
            </div> */}
          </div>

          {/* User Stats Modal */}
          {showUserCard && selectedUser && (
            <div className='fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50 backdrop-blur-sm p-4'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full p-0 overflow-hidden transform transition-all duration-300 ease-out animate-fadeIn'>
                {/* Header */}
                <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative overflow-hidden'>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2730%27%20height%3D%2730%27%20viewBox%3D%270%200%2030%2030%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M15%200C6.716%200%200%206.716%200%2015c0%208.284%206.716%2015%2015%2015%208.284%200%2015-6.716%2015-15%200-8.284-6.716-15-15-15zm0%2030C6.716%2030%200%2023.284%200%2015%200%206.716%206.716%200%2015%200c8.284%200%2015%206.716%2015%2015%200%208.284-6.716%2015-15%2015z%27%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27nonzero%27%2F%3E%3C%2Fsvg%3E')] opacity-20"></div>
                  <div className='relative z-10 flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='relative'>
                        <img src={selectedUser.avatar} alt={selectedUser.name} className='w-16 h-16 rounded-full border-3 border-white shadow-lg' />
                        {selectedUser.rank <= 3 && <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${selectedUser.badgeColor} rounded-full flex items-center justify-center shadow-md`}>{selectedUser.rank === 1 ? <Crown className='w-4 h-4 text-white' /> : <span className='text-white font-bold'>{selectedUser.rank}</span>}</div>}
                      </div>
                      <div>
                        <h3 className='text-2xl font-bold text-white flex items-center'>
                          {selectedUser.name}
                          {selectedUser.rank === 1 && <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-amber-400/20 text-amber-200 rounded-full border border-amber-300/30'>#1 Leader</span>}
                        </h3>
                        <div className='flex items-center space-x-4 mt-1'>
                          <div className='flex items-center space-x-1 text-white/80'>
                            <Trophy className='w-4 h-4 text-amber-300' />
                            <span>{selectedUser.points.toLocaleString()} pts</span>
                          </div>
                          <div className='flex items-center space-x-1 text-white/80'>
                            <Zap className='w-4 h-4 text-blue-300' />
                            <span>{selectedUser.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className='rounded-full p-2 bg-white/10 hover:bg-white/20 text-white transition-colors' onClick={() => setShowUserCard(false)}>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Stats Content */}
                <div className='p-6'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                    <div className='bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/30 shadow-sm'>
                      <div className='flex items-center space-x-3 mb-3'>
                        <div className='p-2 bg-indigo-100 dark:bg-indigo-800/30 rounded-lg'>
                          <Target className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                        </div>
                        <h4 className='font-semibold text-gray-700 dark:text-gray-200'>Problem Solving</h4>
                      </div>
                      <div className='grid grid-cols-3 gap-2 text-center'>
                        <div>
                          <div className='text-lg font-bold text-green-500 dark:text-green-400'>{selectedUser.detailedStats.easyProblemsSolved}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Easy</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-amber-500 dark:text-amber-400'>{selectedUser.detailedStats.mediumProblemsSolved}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Medium</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-red-500 dark:text-red-400'>{selectedUser.detailedStats.hardProblemsSolved}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Hard</div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30 shadow-sm'>
                      <div className='flex items-center space-x-3 mb-3'>
                        <div className='p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg'>
                          <Award className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        </div>
                        <h4 className='font-semibold text-gray-700 dark:text-gray-200'>Achievements</h4>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-center'>
                        <div>
                          <div className='text-lg font-bold text-purple-600 dark:text-purple-400'>{selectedUser.detailedStats.contestsParticipated}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Contests</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-purple-600 dark:text-purple-400'>{selectedUser.detailedStats.bestRank}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Best Rank</div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm'>
                      <div className='flex items-center space-x-3 mb-3'>
                        <div className='p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg'>
                          <Clock className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                        </div>
                        <h4 className='font-semibold text-gray-700 dark:text-gray-200'>Performance</h4>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-center'>
                        <div>
                          <div className='text-lg font-bold text-blue-600 dark:text-blue-400'>{selectedUser.detailedStats.averageSpeed}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Avg. Speed</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-blue-600 dark:text-blue-400'>{selectedUser.detailedStats.longestStreak}</div>
                          <div className='text-xs text-gray-500 dark:text-gray-400'>Best Streak</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm'>
                      <div className='flex items-center space-x-3 mb-3'>
                        <div className='p-2 bg-emerald-100 dark:bg-emerald-800/30 rounded-lg'>
                          <Activity className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                        </div>
                        <h4 className='font-semibold text-gray-700 dark:text-gray-200'>Activity Stats</h4>
                      </div>
                      <div className='flex justify-between mt-2'>
                        <div className='text-center'>
                          <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>Joined</div>
                          <div className='font-semibold text-gray-800 dark:text-gray-200'>{selectedUser.detailedStats.joinedDate}</div>
                        </div>
                        <div className='text-center'>
                          <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>Favorite Topic</div>
                          <div className='font-semibold text-gray-800 dark:text-gray-200'>{selectedUser.detailedStats.favoriteTopic}</div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30 shadow-sm'>
                      <div className='flex items-center space-x-3 mb-3'>
                        <div className='p-2 bg-amber-100 dark:bg-amber-800/30 rounded-lg'>
                          <Sparkles className='w-5 h-5 text-amber-600 dark:text-amber-400' />
                        </div>
                        <h4 className='font-semibold text-gray-700 dark:text-gray-200'>Special Achievements</h4>
                      </div>
                      <div className='flex flex-wrap gap-2 mt-2'>
                        <div className='px-3 py-1.5 bg-amber-100/50 dark:bg-amber-800/20 rounded-full text-xs font-medium text-amber-700 dark:text-amber-300'>Consistent Solver</div>
                        <div className='px-3 py-1.5 bg-indigo-100/50 dark:bg-indigo-800/20 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300'>Challenge Ace</div>
                        <div className='px-3 py-1.5 bg-emerald-100/50 dark:bg-emerald-800/20 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-300'>Fast Solver</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className='flex justify-end mt-8 space-x-3'>
                    <button className='px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>View Complete Profile</button>
                    <button className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'>Challenge to Duel</button>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
