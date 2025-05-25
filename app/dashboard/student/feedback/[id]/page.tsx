"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, Star, Send, Smile, Meh, Frown, Clock, Calendar, User, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

// Types
type Session = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  status: "completed" | "upcoming";
  hasSubmittedFeedback: boolean;
  instructor: string;
};

type Course = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  progress: number;
};

type Feedback = {
  sessionId: string;
  rating: number;
  sentiment: string;
  comment: string;
  detailedRatings: {
    clarityOfExplanation: number;
    paceOfTeaching: number;
    relevanceOfContent: number;
    qualityOfExamples: number;
    engagementLevel: number;
  };
  sessionAspects: {
    materialsProvided: boolean;
    interactive: boolean;
    wellStructured: boolean;
    timeManagement: boolean;
    technicalIssues: boolean;
  };
  quickFeedback: string[];
};

type FeedbackFormProps = {
  session: Session;
  onSubmit: (feedback: Feedback) => void;
};

// Components
const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5'>
    <div className={`${color} h-2.5 rounded-full transition-all duration-300 ease-in-out`} style={{ width: `${percentage}%` }}></div>
  </div>
);

const DateSelector = ({ dates, selectedDate, onSelectDate, sessions }: { dates: Date[]; selectedDate: Date | null; onSelectDate: (date: Date) => void; sessions: Session[] }) => {
  // Group dates by month for better organization
  const groupedDates = dates.reduce((acc, date) => {
    const month = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(date);
    return acc;
  }, {} as Record<string, Date[]>);

  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2 mb-3'>
        <Calendar size={20} className='text-indigo-500 dark:text-indigo-400' />
        <h3 className='font-semibold text-gray-800 dark:text-gray-100'>Select Date</h3>
      </div>
      <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'>
        {Object.entries(groupedDates).map(([month, monthDates]) => (
          <div key={month} className='flex-shrink-0'>
            <div className='text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-1'>{month}</div>
            <div className='flex gap-2'>
              {monthDates.map((date) => {
                const isToday = new Date().toDateString() === date.toDateString();
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const hasSession = sessions.some(s => s.date.toDateString() === date.toDateString());

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => onSelectDate(date)}
                    disabled={!hasSession}
                    className={`px-3 py-2 text-xs rounded-lg transition-all duration-200 flex flex-col items-center min-w-14 shadow-sm border
                      ${isSelected ? "bg-indigo-500 text-white border-indigo-600 shadow-md transform scale-105" : 
                        hasSession ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" : 
                        "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed"}
                      ${isToday && !isSelected ? "ring-2 ring-indigo-400 dark:ring-indigo-500" : ""}
                    `}
                  >
                    <span className='font-bold text-sm'>{date.getDate()}</span>
                    <span className='text-[10px] mt-1 font-medium'>{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SessionSelector = ({ sessions, selectedSession, onSelectSession }: { sessions: Session[]; selectedSession: Session | null; onSelectSession: (session: Session) => void }) => {
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2 mb-3'>
        <Clock size={20} className='text-purple-500 dark:text-purple-400' />
        <h3 className='font-semibold text-gray-800 dark:text-gray-100'>Select Session</h3>
      </div>
      <div className='flex gap-3 overflow-x-auto pb-2'>
        {sessions.map((session) => {
          const isSelected = selectedSession?.id === session.id;
          const isToday = new Date().toDateString() === session.date.toDateString();

          return (
            <button
              key={session.id}
              onClick={() => onSelectSession(session)}
              className={`px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 border shadow-sm
                ${isSelected ? "bg-purple-500 text-white border-purple-600 shadow-md transform scale-105" : 
                  "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              <Clock size={18} />
              <div className='flex flex-col items-start'>
                <span className='font-medium'>{session.title}</span>
                <span className='text-xs opacity-80'>
                  {session.time} • {isToday ? "Today" : session.date.toLocaleDateString()}
                </span>
              </div>
              {session.hasSubmittedFeedback && (
                <CheckCircle size={16} className="ml-2 text-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ session, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [sentiment, setSentiment] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [detailedRatings, setDetailedRatings] = useState({
    clarityOfExplanation: 0,
    paceOfTeaching: 0,
    relevanceOfContent: 0,
    qualityOfExamples: 0,
    engagementLevel: 0
  });
  const [sessionAspects, setSessionAspects] = useState({
    materialsProvided: false,
    interactive: false,
    wellStructured: false,
    timeManagement: false,
    technicalIssues: false
  });
  const [quickFeedback, setQuickFeedback] = useState<string[]>([]);

  const handleSubmit = () => {
    if (session.status === "upcoming" || rating === 0 || sentiment === "") return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        sessionId: session.id,
        rating,
        sentiment,
        comment,
        detailedRatings,
        sessionAspects,
        quickFeedback
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  const handleAspectChange = (aspect: keyof typeof sessionAspects) => {
    setSessionAspects(prev => ({
      ...prev,
      [aspect]: !prev[aspect]
    }));
  };

  const handleQuickFeedbackToggle = (feedback: string) => {
    setQuickFeedback(prev => {
      const newFeedback = prev.includes(feedback)
        ? prev.filter(f => f !== feedback)
        : [...prev, feedback];
      
      // Update comment textbox with selected feedback
      const feedbackText = newFeedback.length > 0
        ? "Quick Feedback:\n" + newFeedback.map(f => `• ${f}`).join("\n") + "\n\n" + comment.replace(/Quick Feedback:[\s\S]*?\n\n/, "")
        : comment.replace(/Quick Feedback:[\s\S]*?\n\n/, "");
      
      setComment(feedbackText);
      return newFeedback;
    });
  };

  const isDisabled = session.status === "upcoming";
  const isFormComplete = rating > 0 && sentiment !== "" && 
    Object.values(detailedRatings).every(rating => rating > 0);

  const handleDetailedRatingChange = (aspect: keyof typeof detailedRatings, value: number) => {
    setDetailedRatings(prev => ({
      ...prev,
      [aspect]: value
    }));
  };

  const getRatingLabel = (value: number): string => {
    if (value <= 1) return "Poor";
    if (value <= 2) return "Below Average";
    if (value <= 3) return "Average";
    if (value <= 4) return "Good";
    return "Excellent";
  };

  const getRatingColor = (value: number): string => {
    if (value <= 1) return "from-red-500 to-red-600";
    if (value <= 2) return "from-orange-500 to-orange-600";
    if (value <= 3) return "from-yellow-500 to-yellow-600";
    if (value <= 4) return "from-green-500 to-green-600";
    return "from-emerald-500 to-emerald-600";
  };

  const renderRatingButton = (
    value: number,
    currentValue: number,
    onClick: () => void,
    disabled: boolean
  ) => {
    const isSelected = value === currentValue;
    const colorClass = isSelected ? getRatingColor(value) : "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700";
    const textColor = isSelected ? "text-white" : "text-gray-700 dark:text-gray-300";

    return (
      <button
        key={value}
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${
          isSelected 
            ? `bg-gradient-to-r ${colorClass} shadow-lg` 
            : "bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600"
        } ${textColor} font-medium text-sm`}
      >
        {getRatingLabel(value)}
      </button>
    );
  };

  const renderDetailedRating = (
    label: string,
    aspect: keyof typeof detailedRatings,
    value: number
  ) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
      >
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {value > 0 && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full bg-gradient-to-r ${getRatingColor(value)} text-white`}>
              {getRatingLabel(value)}
          </span>
          )}
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((ratingValue) => 
            renderRatingButton(
              ratingValue,
              value,
              () => handleDetailedRatingChange(aspect, ratingValue),
              isDisabled
            )
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h3 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          Share Your Feedback
        </motion.h3>
        {session.hasSubmittedFeedback && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Feedback Submitted
          </motion.span>
        )}
      </div>
      
      {isDisabled && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 p-4 rounded-xl mb-6 flex items-center"
        >
          <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">This session is upcoming</p>
            <p className="text-sm">Feedback can only be submitted after attending the session.</p>
          </div>
        </motion.div>
      )}
      
      <div className={`space-y-6 ${isDisabled ? "opacity-60" : ""}`}>
        {/* Session Info Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800"
        >
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            Session Information
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{session.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {session.date.toLocaleDateString()}, {session.time}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{session.instructor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p className="font-medium flex items-center text-gray-800 dark:text-gray-200">
                {session.status === "completed" ? (
                  <><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Completed</>
                ) : (
                  <><Clock className="h-4 w-4 mr-1 text-amber-500" /> Upcoming</>
                )}
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
        {/* Overall Rating */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <label className="block text-lg font-medium text-gray-800 dark:text-gray-200">
              Overall Session Rating
            </label>
                {rating > 0 && (
                  <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${getRatingColor(rating)} text-white`}>
                    {getRatingLabel(rating)}
            </span>
                )}
          </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((ratingValue) => 
                  renderRatingButton(
                    ratingValue,
                    rating,
                    () => setRating(ratingValue),
                    isDisabled
                  )
                )}
          </div>
        </motion.div>
        
        {/* Emotion Selection */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            How did you feel about this session?
          </label>
              <div className="grid grid-cols-3 gap-4">
            <motion.button
              disabled={isDisabled}
              onClick={() => setSentiment("positive")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                sentiment === "positive" 
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Smile className={`h-10 w-10 mb-2 ${sentiment === "positive" ? "text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">Great</span>
            </motion.button>
            
            <motion.button
              disabled={isDisabled}
              onClick={() => setSentiment("neutral")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                sentiment === "neutral" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Meh className={`h-10 w-10 mb-2 ${sentiment === "neutral" ? "text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">Okay</span>
            </motion.button>
            
            <motion.button
              disabled={isDisabled}
              onClick={() => setSentiment("negative")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                sentiment === "negative" 
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white" 
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Frown className={`h-10 w-10 mb-2 ${sentiment === "negative" ? "text-white" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">Needs Work</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Feedback */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-xl border border-purple-100 dark:border-purple-800"
        >
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
            Quick Feedback
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Clear explanations",
              "Engaging content",
              "Good pace",
              "Helpful examples",
              "Interactive discussion",
              "Well organized",
              "Too fast",
              "Too slow",
              "Needs more examples",
              "Technical difficulties"
            ].map((feedback) => (
              <motion.button
                key={feedback}
                onClick={() => handleQuickFeedbackToggle(feedback)}
                disabled={isDisabled}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  quickFeedback.includes(feedback)
                    ? "bg-purple-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {feedback}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Session Aspects */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
            Session Aspects
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'materialsProvided', label: 'Materials Provided', icon: '📚' },
              { key: 'interactive', label: 'Interactive Session', icon: '🤝' },
              { key: 'wellStructured', label: 'Well Structured', icon: '📋' },
              { key: 'timeManagement', label: 'Good Time Management', icon: '⏱️' },
              { key: 'technicalIssues', label: 'Technical Issues', icon: '🔧' }
            ].map(({ key, label, icon }) => (
              <motion.button
                key={key}
                onClick={() => handleAspectChange(key as keyof typeof sessionAspects)}
                disabled={isDisabled}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                  sessionAspects[key as keyof typeof sessionAspects]
                    ? "bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-400"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className={`text-sm font-medium ${
                  sessionAspects[key as keyof typeof sessionAspects]
                    ? "text-indigo-700 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}>
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Detailed Ratings */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-indigo-500" />
                Detailed Feedback
              </h4>
              <div className="space-y-4">
                {renderDetailedRating("Clarity of Explanation", "clarityOfExplanation", detailedRatings.clarityOfExplanation)}
                {renderDetailedRating("Pace of Teaching", "paceOfTeaching", detailedRatings.paceOfTeaching)}
                {renderDetailedRating("Relevance of Content", "relevanceOfContent", detailedRatings.relevanceOfContent)}
                {renderDetailedRating("Quality of Examples", "qualityOfExamples", detailedRatings.qualityOfExamples)}
                {renderDetailedRating("Engagement Level", "engagementLevel", detailedRatings.engagementLevel)}
              </div>
            </motion.div>
        
        {/* Detailed Feedback */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Additional comments
          </label>
          <textarea
            disabled={isDisabled}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Share your detailed feedback about this session. What worked well? What could be improved? Any specific topics you'd like to explore further?"
          />
        </motion.div>
          </div>
        </div>
        
        {/* Submit Button */}
        <motion.button
          disabled={isDisabled || isSubmitting || !isFormComplete}
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-all ${
            isDisabled || !isFormComplete
              ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Feedback...
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              {!isFormComplete ? "Complete the form to submit" : "Submit Feedback"}
            </span>
          )}
        </motion.button>
        
        {/* Success Message */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl flex items-center"
            >
              <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
              <span>Thank you! Your feedback has been submitted successfully.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Main component
export default function FeedbackPage() {
  const [course] = useState<Course>({
    id: "CS305",
    title: "Web Development",
    code: "CS305",
    instructor: "Dr. Sarah Johnson",
    progress: 75
  });

  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Generate mock sessions
  useEffect(() => {
    const generateSessions = (): Session[] => {
      const sessions: Session[] = [];
      const today = new Date();
      
      // Generate past sessions
      for (let i = 1; i <= 8; i++) {
        const sessionDate = new Date();
        sessionDate.setDate(today.getDate() - (i * 3));
        
        sessions.push({
          id: `past-${i}`,
          title: `Session ${i}: ${getSessionTitle(i)}`,
          description: `Learn about ${getSessionDescription(i)}`,
          date: sessionDate,
          time: "10:00 AM - 11:30 AM",
          status: "completed",
          hasSubmittedFeedback: Math.random() > 0.5,
          instructor: course.instructor
        });
      }
      
      // Add today's session
      sessions.push({
        id: "today",
        title: "Session 9: Current Topics",
        description: "Review and practice of current concepts",
        date: today,
        time: "2:00 PM - 3:30 PM",
        status: "completed",
        hasSubmittedFeedback: false,
        instructor: course.instructor
      });
      
      // Generate upcoming sessions
      for (let i = 1; i <= 8; i++) {
        const sessionDate = new Date();
        sessionDate.setDate(today.getDate() + (i * 3));
        
        sessions.push({
          id: `future-${i}`,
          title: `Session ${i + 9}: ${getSessionTitle(i + 9)}`,
          description: `Learn about ${getSessionDescription(i + 9)}`,
          date: sessionDate,
          time: "10:00 AM - 11:30 AM",
          status: "upcoming",
          hasSubmittedFeedback: false,
          instructor: course.instructor
        });
      }
      
      return sessions.sort((a, b) => a.date.getTime() - b.date.getTime());
    };

    const sessionsList = generateSessions();
    setSessions(sessionsList);
    
    // Set default selected date to today
    const today = new Date();
    setSelectedDate(today);
    
    // Find today's session
    const todaySession = sessionsList.find(
      session => session.date.toDateString() === today.toDateString()
    );
    
    if (todaySession) {
      setSelectedSession(todaySession);
    }
  }, [course.instructor]);

  // Helper functions for session titles and descriptions
  const getSessionTitle = (sessionNumber: number): string => {
    const titles = [
      "Introduction to Web Development",
      "HTML Fundamentals",
      "CSS Styling",
      "JavaScript Basics",
      "DOM Manipulation",
      "Event Handling",
      "Async Programming",
      "API Integration",
      "React Fundamentals",
      "Component Lifecycle",
      "State Management",
      "Routing",
      "Form Handling",
      "Testing",
      "Deployment",
      "Final Project"
    ];
    return titles[(sessionNumber - 1) % titles.length];
  };

  const getSessionDescription = (sessionNumber: number): string => {
    const descriptions = [
      "core web development concepts and tools",
      "HTML structure and semantic elements",
      "CSS styling and layout techniques",
      "JavaScript syntax and basic programming concepts",
      "manipulating the DOM with JavaScript",
      "handling user events and interactions",
      "asynchronous programming with promises and async/await",
      "working with REST APIs and data fetching",
      "React components and JSX",
      "component lifecycle methods and hooks",
      "managing state with React hooks",
      "client-side routing with React Router",
      "building and validating forms",
      "writing tests for React components",
      "deploying web applications",
      "implementing your final project"
    ];
    return descriptions[(sessionNumber - 1) % descriptions.length];
  };

  // Get unique dates from sessions
  const getAvailableDates = (): Date[] => {
    const uniqueDates: Date[] = [];
    const dateStrings = new Set<string>();
    
    sessions.forEach(session => {
      const dateString = session.date.toDateString();
      if (!dateStrings.has(dateString)) {
        dateStrings.add(dateString);
        uniqueDates.push(session.date);
      }
    });
    
    return uniqueDates.sort((a, b) => a.getTime() - b.getTime());
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (feedback: Feedback) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === feedback.sessionId 
          ? { ...session, hasSubmittedFeedback: true }
          : session
      )
    );
  };

  const handleBack = () => {
    // In a real app, this would navigate back or to a specific route
    window.history.back();
    console.log("Navigate back");
  };

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <DashboardLayout userRole='student'>
        <div className='p-4 md:p-6 w-full bg-gray-50 dark:bg-black min-h-screen transition-colors duration-300'>
          {/* Course header */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center'>
              <button onClick={handleBack} className='mr-4 p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-700'>
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1'>{course.title}</h1>
                <p className='text-gray-500 dark:text-gray-400 flex items-center gap-2'>
                  <span className='px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded text-xs font-medium'>{course.code}</span>
                  <span className='text-gray-400 dark:text-gray-500'>•</span>
                  <span>Instructor: {course.instructor}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Date and Session selectors */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'>
              <DateSelector 
                dates={getAvailableDates()} 
                selectedDate={selectedDate} 
                onSelectDate={setSelectedDate} 
                sessions={sessions} 
              />
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'>
              <SessionSelector 
                sessions={sessions.filter(s => s.date.toDateString() === selectedDate?.toDateString())} 
                selectedSession={selectedSession} 
                onSelectSession={setSelectedSession} 
              />
            </div>
          </div>

          {/* Feedback Form */}
          {selectedSession && (
            <FeedbackForm
              session={selectedSession}
              onSubmit={handleFeedbackSubmit}
            />
          )}
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}