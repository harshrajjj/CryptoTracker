import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to apply dark mode
  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      // Force a repaint to ensure styles are applied
      document.body.style.backgroundColor = '';
      document.body.offsetHeight; // Trigger reflow
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      // Force a repaint to ensure styles are applied
      document.body.style.backgroundColor = '';
      document.body.offsetHeight; // Trigger reflow
    }

    // Log the current state for debugging
    console.log('Dark mode:', isDark,
                'Classes on html:', document.documentElement.classList.contains('dark'),
                'Classes on body:', document.body.classList.contains('dark'));
  };

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDarkMode);
    applyDarkMode(isDarkMode);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('theme') === null) {
        const newDarkMode = e.matches;
        setDarkMode(newDarkMode);
        applyDarkMode(newDarkMode);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');

    // Force a refresh to ensure all styles are applied
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 shadow-md ${
        darkMode
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600 hover:text-yellow-200 hover:shadow-lg hover:shadow-yellow-300/20'
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/20'
      }`}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-5 h-5 absolute transform transition-transform duration-300 rotate-0 scale-100">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-5 h-5 absolute transform transition-transform duration-300 rotate-0 scale-100">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
