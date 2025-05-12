import { useState } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";


const STATUS_TEXT_COLORS = {
  Upcoming: "text-blue-500 dark:text-blue-400",
  Submitted: "text-emerald-500 dark:text-emerald-400",
  Missed: "text-rose-500 dark:text-rose-400",
};


const STATUS_BORDER_COLORS = {
  Upcoming: "border-blue-500 dark:border-blue-600",
  Submitted: "border-emerald-500 dark:border-emerald-600",
  Missed: "border-rose-500 dark:border-rose-600",
};

const StatusBadge = ({ assessment } : any) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (status : any) => {
    switch (status) {
      case "Upcoming":
        return <Clock className='h-4 w-4 text-gray-600' />;
      case "Submitted":
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case "Missed":
        return <AlertCircle className='h-4 w-4 text-red-600' />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* ICON BADGE */}
      <div className='absolute top-4 right-4 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {getIcon(assessment.status)}
      </div>

      {/* HOVER INFO BADGE */}
      {isHovered && (
        <div className='fixed top-4 right-20 z-50 bg-white shadow-lg border px-4 py-2 rounded-md text-sm font-medium'>
          {/* @ts-ignore */}
          <div className={`inline-flex items-center space-x-2 ${STATUS_TEXT_COLORS[assessment.status]} ${STATUS_BORDER_COLORS[assessment.status]}`}>
            {getIcon(assessment.status)}
            <span>{assessment.status}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusBadge;