import React from "react";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className='relative h-2 w-[80px] bg-gray-200 dark:bg-gray-700 overflow-hidden rounded'>
      <div className={`h-full transition-all duration-300 ${value < 30 ? "bg-red-500" : value < 70 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
