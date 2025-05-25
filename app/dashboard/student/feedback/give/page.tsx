import React, { useState } from "react";
import { Star, Send, ThumbsUp, MessageSquare } from "lucide-react";

interface Rating {
  [key: string]: number;
}

interface FormattedRating {
  question: string;
  rating: number;
}

interface Review {
  id: number;
  responses: FormattedRating[];
  comments: string;
  date: string;
}

export default function CourseReviewForm() {
  const [step, setStep] = useState<number>(1);
  const [ratings, setRatings] = useState<Rating>({
    "Clarity of explanation": 0,
    "Pace of teaching": 0,
    "Relevance of content": 0,
    "Quality of examples": 0,
    "Engagement level": 0,
  });
  const [comments, setComments] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const questions = Object.keys(ratings);

  const handleRating = (question: string, rating: number): void => {
    setRatings({ ...ratings, [question]: rating });
  };

  const moveToNextStep = (): void => {
    if (step < 3) {
      setAnimation(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimation(false);
      }, 300);
    } else {
      submitReview();
    }
  };

  const submitReview = (): void => {
    // Convert ratings to array format matching your example
    const formattedRatings: FormattedRating[] = Object.entries(ratings).map(([question, rating]) => ({
      question,
      rating,
    }));

    const review: Review = {
      id: Math.floor(Math.random() * 1000),
      responses: formattedRatings,
      comments: comments,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    console.log("Review submitted:", review);
    setSubmitted(true);
  };

  const renderStars = (question: string): React.ReactElement => {
    return (
      <div className='flex items-center space-x-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} className='focus:outline-none' onClick={() => handleRating(question, star)}>
            <Star
              size={24}
              className={`${ratings[question] >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                transition-all duration-150 hover:scale-110`}
            />
          </button>
        ))}
        <span className='ml-2 text-sm text-gray-600'>{ratings[question] > 0 ? ratings[question].toFixed(1) : "Not rated"}</span>
      </div>
    );
  };

  const isStepComplete = (): boolean => {
    if (step === 1) {
      // First question set (first 3 questions)
      return questions.slice(0, 3).every((q) => ratings[q] > 0);
    } else if (step === 2) {
      // Second question set (remaining questions)
      return questions.slice(3).every((q) => ratings[q] > 0);
    } else {
      // Comments step - no validation needed
      return true;
    }
  };

  const renderConfetti = (): React.ReactElement => {
    return (
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 8 + 5;
          const color = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"][Math.floor(Math.random() * 5)];
          const left = `${Math.random() * 100}%`;
          const animationDuration = `${Math.random() * 3 + 2}s`;
          const animationDelay = `${Math.random() * 0.5}s`;

          return (
            <div
              key={i}
              className={`absolute ${color} rounded-full`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left,
                top: "-20px",
                animation: `fall ${animationDuration} ease-in ${animationDelay} forwards`,
              }}
            />
          );
        })}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className='relative max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 overflow-hidden'>
        {renderConfetti()}
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
            <ThumbsUp size={32} className='text-green-600' />
          </div>
          <h2 className='text-2xl font-bold text-gray-800'>Thank You!</h2>
          <p className='text-gray-600 mt-2'>Your feedback has been submitted and will help improve future courses.</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setRatings({
                "Clarity of explanation": 0,
                "Pace of teaching": 0,
                "Relevance of content": 0,
                "Quality of examples": 0,
                "Engagement level": 0,
              });
              setComments("");
            }}
            className='mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4'>
      {/* Progress bar */}
      <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div className='bg-blue-600 h-2.5 rounded-full transition-all duration-300' style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      {/* Step indicator */}
      <div className='flex justify-between text-sm text-gray-500 mb-4'>
        <span className={step >= 1 ? "font-semibold text-blue-600" : ""}>Rating I</span>
        <span className={step >= 2 ? "font-semibold text-blue-600" : ""}>Rating II</span>
        <span className={step >= 3 ? "font-semibold text-blue-600" : ""}>Comments</span>
      </div>

      <div className={`transition-opacity duration-300 ${animation ? "opacity-0" : "opacity-100"}`}>
        {step === 1 && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-gray-800'>How would you rate the following aspects?</h2>

            {questions.slice(0, 3).map((question) => (
              <div key={question} className='space-y-2'>
                <label className='block text-gray-700'>{question}</label>
                {renderStars(question)}
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-gray-800'>A few more questions...</h2>

            {questions.slice(3).map((question) => (
              <div key={question} className='space-y-2'>
                <label className='block text-gray-700'>{question}</label>
                {renderStars(question)}
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-800'>Any additional comments?</h2>

            <div className='relative'>
              <MessageSquare size={18} className='absolute top-3 left-3 text-gray-400' />
              <textarea className='w-full border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' rows={5} placeholder='Share your thoughts, suggestions, or any specific feedback...' value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
            </div>

            <div className='text-sm text-gray-500'>Your feedback helps us improve our courses!</div>
          </div>
        )}
      </div>

      <div className='flex justify-between pt-4'>
        {step > 1 && (
          <button
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
            onClick={() => {
              setAnimation(true);
              setTimeout(() => {
                setStep(step - 1);
                setAnimation(false);
              }, 300);
            }}
          >
            Back
          </button>
        )}
        {step === 1 && <div></div>}

        <button className={`px-4 py-2 rounded-md flex items-center space-x-2 ${isStepComplete() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`} onClick={moveToNextStep} disabled={!isStepComplete()}>
          <span>{step === 3 ? "Submit" : "Next"}</span>
          {step === 3 ? <Send size={16} /> : null}
        </button>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
