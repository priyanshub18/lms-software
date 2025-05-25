"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Activity, MessageSquare, Calendar, ChevronDown, ChevronUp, Star, Users, PieChart as PieChartIcon } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

// Types
interface FeedbackResponse {
  question: string;
  rating: number;
}

interface Feedback {
  id: number;
  responses: FeedbackResponse[];
  comments: string;
  date: string;
}

interface ClassData {
  id: number;
  name: string;
  date: string;
  attendees: number;
  reviewCount: number;
}

interface QuestionStats {
  [key: string]: number;
}

interface QuestionCounts {
  [key: string]: number;
}

interface QuestionAverage {
  name: string;
  value: number;
}

interface Stats {
  averageRating: number;
  questionAverages: QuestionAverage[];
  participationRate: number;
  totalAttendees: number;
  totalReviews: number;
}

// Sample data - in a real application, this would come from your backend
const classData: ClassData[] = [
  { id: 1, name: "Introduction to React", date: "May 15, 2025", attendees: 28, reviewCount: 22 },
  { id: 2, name: "Advanced JavaScript Concepts", date: "May 14, 2025", attendees: 24, reviewCount: 19 },
  { id: 3, name: "CSS Grid & Flexbox", date: "May 13, 2025", attendees: 26, reviewCount: 21 },
  { id: 4, name: "Node.js Fundamentals", date: "May 12, 2025", attendees: 22, reviewCount: 17 },
  { id: 5, name: "Database Design", date: "May 11, 2025", attendees: 25, reviewCount: 20 },
];

const feedbackData: { [key: number]: Feedback[] } = {
  1: [
    {
      id: 101,
      responses: [
        { question: "Clarity of explanation", rating: 4.5 },
        { question: "Pace of teaching", rating: 4.2 },
        { question: "Relevance of content", rating: 4.7 },
        { question: "Quality of examples", rating: 4.4 },
        { question: "Engagement level", rating: 4.3 },
      ],
      comments: "The React hooks explanation was excellent. Would love more real-world examples.",
      date: "May 15, 2025",
    },
    {
      id: 102,
      responses: [
        { question: "Clarity of explanation", rating: 4.8 },
        { question: "Pace of teaching", rating: 4.5 },
        { question: "Relevance of content", rating: 4.9 },
        { question: "Quality of examples", rating: 4.7 },
        { question: "Engagement level", rating: 4.6 },
      ],
      comments: "Very clear explanations. The interactive exercises were particularly helpful.",
      date: "May 15, 2025",
    },
    {
      id: 103,
      responses: [
        { question: "Clarity of explanation", rating: 3.8 },
        { question: "Pace of teaching", rating: 3.5 },
        { question: "Relevance of content", rating: 4.2 },
        { question: "Quality of examples", rating: 3.9 },
        { question: "Engagement level", rating: 3.7 },
      ],
      comments: "Sometimes went too fast through complex concepts. Otherwise good content.",
      date: "May 15, 2025",
    },
  ],
  2: [
    {
      id: 201,
      responses: [
        { question: "Clarity of explanation", rating: 4.6 },
        { question: "Pace of teaching", rating: 4.3 },
        { question: "Relevance of content", rating: 4.8 },
        { question: "Quality of examples", rating: 4.5 },
        { question: "Engagement level", rating: 4.4 },
      ],
      comments: "The closure examples were very well explained. More practical exercises would be nice.",
      date: "May 14, 2025",
    },
    {
      id: 202,
      responses: [
        { question: "Clarity of explanation", rating: 4.7 },
        { question: "Pace of teaching", rating: 4.4 },
        { question: "Relevance of content", rating: 4.9 },
        { question: "Quality of examples", rating: 4.6 },
        { question: "Engagement level", rating: 4.5 },
      ],
      comments: "Excellent session! The prototype chain explanation finally made it click for me.",
      date: "May 14, 2025",
    },
  ],
  3: [
    {
      id: 301,
      responses: [
        { question: "Clarity of explanation", rating: 4.4 },
        { question: "Pace of teaching", rating: 4.1 },
        { question: "Relevance of content", rating: 4.6 },
        { question: "Quality of examples", rating: 4.3 },
        { question: "Engagement level", rating: 4.2 },
      ],
      comments: "The grid vs flexbox comparison was super helpful. Would like more advanced examples.",
      date: "May 13, 2025",
    },
  ],
  4: [
    {
      id: 401,
      responses: [
        { question: "Clarity of explanation", rating: 4.3 },
        { question: "Pace of teaching", rating: 4.0 },
        { question: "Relevance of content", rating: 4.5 },
        { question: "Quality of examples", rating: 4.2 },
        { question: "Engagement level", rating: 4.1 },
      ],
      comments: "Good introduction to Node. Maybe more focus on async patterns would be beneficial.",
      date: "May 12, 2025",
    },
  ],
  5: [
    {
      id: 501,
      responses: [
        { question: "Clarity of explanation", rating: 4.2 },
        { question: "Pace of teaching", rating: 3.9 },
        { question: "Relevance of content", rating: 4.4 },
        { question: "Quality of examples", rating: 4.1 },
        { question: "Engagement level", rating: 4.0 },
      ],
      comments: "The normalization examples were helpful. Would like more case studies.",
      date: "May 11, 2025",
    },
  ],
};

// Stats calculation
const calculateStats = (): Stats => {
  let totalRatings = 0;
  let ratingCount = 0;
  const questionStats: QuestionStats = {
    "Clarity of explanation": 0,
    "Pace of teaching": 0,
    "Relevance of content": 0,
    "Quality of examples": 0,
    "Engagement level": 0,
  };
  const questionCounts: QuestionCounts = {
    "Clarity of explanation": 0,
    "Pace of teaching": 0,
    "Relevance of content": 0,
    "Quality of examples": 0,
    "Engagement level": 0,
  };

  // Calculate average ratings
  Object.values(feedbackData).forEach((classFeedback) => {
    classFeedback.forEach((feedback) => {
      feedback.responses.forEach((response) => {
        totalRatings += response.rating;
        ratingCount++;

        questionStats[response.question] += response.rating;
        questionCounts[response.question]++;
      });
    });
  });

  const averageRating = totalRatings / ratingCount;

  // Calculate per-question averages
  const questionAverages = Object.keys(questionStats).map((question) => ({
    name: question,
    value: questionStats[question] / questionCounts[question],
  }));

  // Calculate feedback participation rate
  const totalAttendees = classData.reduce((acc, curr) => acc + curr.attendees, 0);
  const totalReviews = classData.reduce((acc, curr) => acc + curr.reviewCount, 0);
  const participationRate = (totalReviews / totalAttendees) * 100;

  return {
    averageRating,
    questionAverages,
    participationRate,
    totalAttendees,
    totalReviews,
  };
};

const stats = calculateStats();

// For pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function TeacherFeedbackDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [expandedClass, setExpandedClass] = useState<number | null>(null);
  const [expandedFeedback, setExpandedFeedback] = useState<{ [key: number]: boolean }>({});

  const toggleClass = (classId: number) => {
    setExpandedClass(expandedClass === classId ? null : classId);
    setExpandedFeedback({});
  };

  const toggleFeedback = (feedbackId: number) => {
    setExpandedFeedback((prev) => ({
      ...prev,
      [feedbackId]: !prev[feedbackId],
    }));
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} className={`${star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className='ml-1 text-sm text-gray-600'>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <DashboardLayout userRole='trainer'>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Header */}
        <header className='bg-white dark:bg-gray-800 shadow-sm'>
          <div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Teacher Feedback Dashboard</h1>
            <div className='flex items-center space-x-4'>
              <motion.div whileHover={{ scale: 1.05 }} className='bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full flex items-center'>
                <span className='text-blue-800 dark:text-blue-200 font-medium'>May 10-16, 2025</span>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          {/* Tabs */}
          <div className='mb-6 flex border-b border-gray-200'>
            <motion.button whileHover={{ backgroundColor: "#F3F4F6" }} className={`px-4 py-2 font-medium ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("overview")}>
              Overview
            </motion.button>
            <motion.button whileHover={{ backgroundColor: "#F3F4F6" }} className={`px-4 py-2 font-medium ${activeTab === "feedback" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("feedback")}>
              Class Feedback
            </motion.button>
            <motion.button whileHover={{ backgroundColor: "#F3F4F6" }} className={`px-4 py-2 font-medium ${activeTab === "questions" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("questions")}>
              Question Analysis
            </motion.button>
          </div>

          <AnimatePresence mode='wait'>
            {activeTab === "overview" && (
              <motion.div key='overview' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                {/* Stats cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                  <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center'>
                      <div className='p-3 rounded-full bg-blue-100 text-blue-600'>
                        <Activity size={24} />
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-sm font-medium text-gray-500'>Average Rating</h2>
                        <div className='mt-1 flex items-baseline'>
                          <p className='text-2xl font-semibold text-gray-900'>{stats.averageRating.toFixed(1)}/5.0</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center'>
                      <div className='p-3 rounded-full bg-green-100 text-green-600'>
                        <Users size={24} />
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-sm font-medium text-gray-500'>Feedback Participation</h2>
                        <div className='mt-1 flex items-baseline'>
                          <p className='text-2xl font-semibold text-gray-900'>{stats.participationRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center'>
                      <div className='p-3 rounded-full bg-purple-100 text-purple-600'>
                        <Calendar size={24} />
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-sm font-medium text-gray-500'>Total Classes</h2>
                        <div className='mt-1 flex items-baseline'>
                          <p className='text-2xl font-semibold text-gray-900'>{classData.length}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }} className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center'>
                      <div className='p-3 rounded-full bg-yellow-100 text-yellow-600'>
                        <MessageSquare size={24} />
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-sm font-medium text-gray-500'>Total Reviews</h2>
                        <div className='mt-1 flex items-baseline'>
                          <p className='text-2xl font-semibold text-gray-900'>{stats.totalReviews}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Charts */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className='bg-white rounded-lg shadow p-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-4'>Question Analysis</h3>
                    <div className='h-64'>
                      <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={stats.questionAverages} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='name' />
                          <YAxis domain={[0, 5]} />
                          <Tooltip />
                          <Bar dataKey='value' fill='#3B82F6' />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='bg-white rounded-lg shadow p-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-4'>Feedback Distribution</h3>
                    <div className='h-64 flex items-center justify-center'>
                      <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                          <Pie data={classData.map((cls) => ({ name: cls.name, value: cls.reviewCount }))} cx='50%' cy='50%' labelLine={false} outerRadius={80} fill='#8884d8' dataKey='value' label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                            {classData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "feedback" && (
              <motion.div key='feedback' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>Class Feedback</h2>

                <div className='space-y-4'>
                  {classData.map((classItem) => (
                    <motion.div key={classItem.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='bg-white rounded-lg shadow overflow-hidden'>
                      <motion.button whileHover={{ backgroundColor: "#F9FAFB" }} className='w-full px-6 py-4 flex justify-between items-center focus:outline-none' onClick={() => toggleClass(classItem.id)}>
                        <div className='flex items-center'>
                          <div className='mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                            <Calendar size={20} />
                          </div>
                          <div className='text-left'>
                            <h3 className='text-lg font-medium text-gray-900'>{classItem.name}</h3>
                            <p className='text-sm text-gray-500'>
                              {classItem.date} • {classItem.reviewCount} reviews
                            </p>
                          </div>
                        </div>
                        <div>{expandedClass === classItem.id ? <ChevronUp size={20} className='text-gray-500' /> : <ChevronDown size={20} className='text-gray-500' />}</div>
                      </motion.button>

                      <AnimatePresence>
                        {expandedClass === classItem.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className='px-6 pb-4'>
                            <div className='border-t border-gray-200 pt-4 mt-2'>
                              {feedbackData[classItem.id]?.length > 0 ? (
                                <div className='space-y-4'>
                                  {feedbackData[classItem.id].map((feedback) => (
                                    <motion.div key={feedback.id} whileHover={{ backgroundColor: "#F9FAFB" }} className='bg-gray-50 rounded-lg p-4'>
                                      <div className='flex justify-between items-start cursor-pointer' onClick={() => toggleFeedback(feedback.id)}>
                                        <div>
                                          <p className='text-sm text-gray-500'>Anonymous Feedback • {feedback.date}</p>
                                          <div className='mt-1'>{renderStarRating(feedback.responses.reduce((sum, r) => sum + r.rating, 0) / feedback.responses.length)}</div>
                                        </div>
                                        <div>{expandedFeedback[feedback.id] ? <ChevronUp size={16} className='text-gray-500' /> : <ChevronDown size={16} className='text-gray-500' />}</div>
                                      </div>

                                      <AnimatePresence>
                                        {expandedFeedback[feedback.id] && (
                                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className='mt-4'>
                                            <div className='space-y-3'>
                                              {feedback.responses.map((response, idx) => (
                                                <div key={idx} className='flex justify-between items-center'>
                                                  <span className='text-sm text-gray-700'>{response.question}</span>
                                                  {renderStarRating(response.rating)}
                                                </div>
                                              ))}

                                              {feedback.comments && (
                                                <div className='mt-4 pt-3 border-t border-gray-200'>
                                                  <h4 className='text-sm font-medium text-gray-700'>Comments:</h4>
                                                  <p className='mt-1 text-sm text-gray-600'>{feedback.comments}</p>
                                                </div>
                                              )}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <p className='text-gray-500 italic'>No feedback available for this class.</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "questions" && (
              <motion.div key='questions' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>Question Analysis</h2>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className='bg-white rounded-lg shadow p-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-4'>Rating by Question</h3>
                    <div className='h-64'>
                      <ResponsiveContainer width='100%' height='100%'>
                        <BarChart data={stats.questionAverages} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout='vertical'>
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis type='number' domain={[0, 5]} />
                          <YAxis dataKey='name' type='category' width={150} />
                          <Tooltip />
                          <Bar dataKey='value' fill='#8884d8' />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='bg-white rounded-lg shadow p-6'>
                    <h3 className='text-lg font-medium text-gray-900 mb-4'>Question Performance</h3>
                    <div className='space-y-6'>
                      {stats.questionAverages.map((question, index) => (
                        <div key={index}>
                          <div className='flex items-center justify-between mb-1'>
                            <span className='text-sm font-medium text-gray-700'>{question.name}</span>
                            <span className='text-sm font-medium text-gray-700'>{question.value.toFixed(1)}/5.0</span>
                          </div>
                          <div className='w-full bg-gray-200 rounded-full h-2.5'>
                            <motion.div className='bg-blue-600 h-2.5 rounded-full' initial={{ width: 0 }} animate={{ width: `${(question.value / 5) * 100}%` }} transition={{ duration: 1, delay: 0.4 + index * 0.1 }}></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className='mt-6 bg-white rounded-lg shadow p-6'>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>Feedback Questions</h3>
                  <div className='space-y-4'>
                    {["Clarity of explanation", "Pace of teaching", "Relevance of content", "Quality of examples", "Engagement level"].map((question, idx) => (
                      <motion.div key={idx} whileHover={{ backgroundColor: "#F9FAFB" }} className='p-4 border border-gray-200 rounded-lg'>
                        <h4 className='font-medium text-gray-800'>{question}</h4>
                        <p className='mt-1 text-sm text-gray-600'>
                          {idx === 0 && "How clear were the teacher's explanations of concepts?"}
                          {idx === 1 && "Was the pace of teaching appropriate for the content?"}
                          {idx === 2 && "How relevant was the content to your learning goals?"}
                          {idx === 3 && "How would you rate the quality of examples provided?"}
                          {idx === 4 && "How engaging was the class session?"}
                        </p>
                      </motion.div>
                    ))}

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium mt-4'>
                      Customize Feedback Questions
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </DashboardLayout>
  );
}
