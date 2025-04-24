import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CryptoTracker from './components/CryptoTracker';
import './App.css';

function App() {
  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply dark mode to both documentElement and body
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    // Force a repaint to ensure dark mode is applied
    document.body.style.transition = 'background-color 0.3s ease';
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <CryptoTracker />
      </div>
    </Provider>
  );
}

export default App;
