import React from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, Target, Award, ArrowRight } from "lucide-react";

interface Assessment {
  id: string;
  title: string;
  subject: string;
  status: 'Upcoming' | 'Submitted' | 'Missed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dueDate: string;
  daysLeft?: number;
  timeLimit?: number;
  questions?: number;
  totalMarks: number;
  passingMarks: number;
  score?: number;
  color?: string;
  submissionDate?: string;
  type: string;
}

const statusStyles = {
  Upcoming: "border-blue-500 text-blue-600 bg-blue-100",
  Submitted: "border-green-500 text-green-600 bg-green-100",
  Missed: "border-red-500 text-red-600 bg-red-100",
};

const difficultyStyles = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const AssessmentCard = ({ assessment }: { assessment: Assessment }) => {
  const statusStyle = statusStyles[assessment.status];
  const difficultyStyle = difficultyStyles[assessment.difficulty];

  return (
    <div className={`rounded-2xl border-l-8 shadow-md p-6 bg-white dark:bg-gray-900 transition-transform duration-300 hover:scale-[1.02] ${statusStyle}`}>
      <div className='flex justify-between items-start mb-4'>
        <div className='space-y-1'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>{assessment.title}</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{assessment.subject}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyStyle}`}>{assessment.difficulty}</span>
        </div>
        <div className="relative group">
          <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-semibold rounded-full ${statusStyle} transition-all duration-200`}>
            {assessment.status === "Upcoming" && <Clock className='h-4 w-4' />}
            {assessment.status === "Submitted" && <CheckCircle className='h-4 w-4' />}
            {assessment.status === "Missed" && <AlertCircle className='h-4 w-4' />}
          </span>
          <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
            {assessment.status}
            <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </div>
      </div>

      <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
        <div className='flex items-center'>
          <Calendar className='w-4 h-4 mr-2' />
          {assessment.dueDate}
          {assessment.status === "Upcoming" && <span className='ml-auto text-blue-600 font-semibold'>{assessment.daysLeft} days left</span>}
        </div>

        {assessment.timeLimit && (
          <div className='flex items-center'>
            <Clock className='w-4 h-4 mr-2' />
            Time limit: {assessment.timeLimit} minutes
          </div>
        )}

        {assessment.questions && (
          <div className='flex items-center'>
            <Target className='w-4 h-4 mr-2' />
            {assessment.questions} questions
          </div>
        )}

        <div className='flex items-center'>
          <Award className='w-4 h-4 mr-2' />
          Total Marks: {assessment.totalMarks} (Pass: {assessment.passingMarks})
        </div>

        {assessment.score && (
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>Score: {assessment.score}%</span>
            </div>
            <div className='w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2'>
              <div
                className='h-2 rounded-full'
                style={{
                  width: `${assessment.score}%`,
                  backgroundColor: assessment.color,
                }}
              ></div>
            </div>
          </div>
        )}

        {assessment.submissionDate && (
          <div className='flex items-center'>
            <CheckCircle className='w-4 h-4 mr-2' /> Submitted: {assessment.submissionDate}
          </div>
        )}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <span className='text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800'>{assessment.type}</span>

        {assessment.status === "Upcoming" && (
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md flex items-center transition-all'>
            Start Test <ArrowRight className='ml-2 w-4 h-4' />
          </button>
        )}
        {assessment.status === "Submitted" && (
          <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md flex items-center transition-all'>
            View Results <ArrowRight className='ml-2 w-4 h-4' />
          </button>
        )}
        {assessment.status === "Missed" && (
          <button className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md flex items-center transition-all'>
            View Details <ArrowRight className='ml-2 w-4 h-4' />
          </button>
        )}
      </div>
    </div>
  );
};

const AssessmentGrid = ({ filteredAssessments }: { filteredAssessments: Assessment[] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {filteredAssessments.map((assessment) => (
        <AssessmentCard key={assessment.id} assessment={assessment} />
      ))}
    </div>
  );
};

export default AssessmentGrid;
