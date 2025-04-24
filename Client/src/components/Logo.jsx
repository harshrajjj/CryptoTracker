import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-3 rounded-xl mr-3 shadow-lg shadow-indigo-500/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
          <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
          <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">CryptoTracker</h1>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></span>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Real-time market data</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
