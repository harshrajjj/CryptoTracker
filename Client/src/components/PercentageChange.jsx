import React from 'react';

const PercentageChange = ({ value }) => {
  const isPositive = value > 0;
  const isZero = value === 0;

  const bgColorClass = isPositive
    ? 'bg-green-100 dark:bg-green-900/30'
    : isZero
      ? 'bg-gray-100 dark:bg-gray-700'
      : 'bg-red-100 dark:bg-red-900/30';

  const textColorClass = isPositive
    ? 'text-green-600 dark:text-green-400'
    : isZero
      ? 'text-gray-500 dark:text-gray-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <div className="flex justify-end">
      <div className={`inline-flex items-center px-2 py-1 rounded-md ${bgColorClass} ${textColorClass} font-medium text-xs`}>
        {isPositive ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
            <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
          </svg>
        ) : isZero ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
            <path d="M8 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0015.5 2h-11zM4.5 4h11v12h-11V4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
        )}
        {Math.abs(value).toFixed(2)}%
      </div>
    </div>
  );
};

export default PercentageChange;
