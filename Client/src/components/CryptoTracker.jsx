import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CryptoTable from './CryptoTable';
import FilterControls from './FilterControls';
import MarketStats from './MarketStats';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import WebSocketStatus from './WebSocketStatus';
import WebSocketSimulator from '../services/websocketSimulator';
import BinanceWebSocket from '../services/binanceWebSocket';
import { store } from '../redux/store';

// Create WebSocket instances
const wsSimulator = new WebSocketSimulator(store);
const binanceWs = new BinanceWebSocket(store);

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const [isLive, setIsLive] = useState(true);
  const [updateInterval, setUpdateInterval] = useState(2000);
  const [dataSource, setDataSource] = useState('simulated'); // 'simulated' or 'binance'

  // Start/stop WebSocket connections
  useEffect(() => {
    if (isLive) {
      if (dataSource === 'simulated') {
        // Use simulated data
        wsSimulator.start(updateInterval);
        binanceWs.disconnect();
      } else {
        // Use real Binance data
        wsSimulator.stop();
        binanceWs.connect();
      }
    } else {
      // Pause all data sources
      wsSimulator.stop();
      binanceWs.disconnect();
    }

    // Cleanup on unmount
    return () => {
      wsSimulator.stop();
      binanceWs.disconnect();
    };
  }, [isLive, updateInterval, dataSource]);

  // Toggle live updates
  const toggleLiveUpdates = () => {
    setIsLive(!isLive);
  };

  // Change update interval (only affects simulated data)
  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value, 10);
    setUpdateInterval(newInterval);

    if (isLive && dataSource === 'simulated') {
      wsSimulator.stop();
      wsSimulator.start(newInterval);
    }
  };

  // Toggle between simulated and real data
  const toggleDataSource = () => {
    setDataSource(dataSource === 'simulated' ? 'binance' : 'simulated');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main content card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80 border border-gray-100 dark:border-gray-700">
        {/* Header with Logo and Theme Toggle */}
        <header className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
        <Logo />

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Live status indicator */}
              <div className={`flex items-center px-3 py-1.5 rounded-lg ${
                isLive
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              } shadow-sm`}>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                <span className="text-sm font-medium">{isLive ? 'Live' : 'Paused'}</span>
              </div>

              {/* Data source toggle */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-1 shadow-inner flex">
                <button
                  onClick={() => dataSource !== 'simulated' && toggleDataSource()}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    dataSource === 'simulated'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title="Use simulated data"
                >
                  Simulated
                </button>
                <button
                  onClick={() => dataSource !== 'binance' && toggleDataSource()}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    dataSource === 'binance'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  title="Use Binance API"
                >
                  Binance API
                </button>
              </div>

              {/* Show WebSocket status when using Binance API */}
              {dataSource === 'binance' && (
                <div>
                  <WebSocketStatus binanceWs={binanceWs} />
                </div>
              )}

              {/* Update interval selector (only for simulated data) */}
              {dataSource === 'simulated' && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1 shadow-inner flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Update:</span>
                  <div className="relative">
                    <select
                      id="update-interval"
                      value={updateInterval}
                      onChange={handleIntervalChange}
                      className="bg-transparent border-0 rounded-md text-sm py-1.5 pl-2 pr-8 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600/30"
                      disabled={!isLive}
                      style={{
                        backgroundColor: 'transparent',
                        appearance: 'none',
                      }}
                    >
                      <option value={500} className="bg-white dark:bg-gray-800 py-2">0.5s</option>
                      <option value={1000} className="bg-white dark:bg-gray-800 py-2">1s</option>
                      <option value={2000} className="bg-white dark:bg-gray-800 py-2">2s</option>
                      <option value={5000} className="bg-white dark:bg-gray-800 py-2">5s</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Play/Pause button */}
              <button
                onClick={toggleLiveUpdates}
                className={`p-2 rounded-full shadow-md transition-all ${
                  isLive
                    ? 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20'
                    : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20'
                }`}
                title={isLive ? 'Pause Updates' : 'Resume Updates'}
              >
                {isLive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Market Stats */}
      <MarketStats />

      {/* Filters and Controls */}
      <FilterControls />

      {/* Main Crypto Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <CryptoTable />
      </div>

      {/* Footer */}
      <footer className="mt-8 p-6 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow-inner">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} mr-2`}></div>
              <p className="font-medium">
                {dataSource === 'binance'
                  ? `Using real-time data from Binance API. Updates are ${isLive ? 'live' : 'paused'}.`
                  : `Using simulated data. Updates ${isLive ? 'automatically' : 'paused'} every ${updateInterval / 1000} seconds.`
                }
              </p>
            </div>
            <p className="text-xs mt-1 ml-4">
              {dataSource === 'binance'
                ? 'Data includes actual market prices, 24h changes, and volumes from Binance exchange.'
                : 'Simulated data randomly changes prices and percentages to mimic real-time updates.'
              }
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:bg-gray-800 dark:to-gray-900 rounded-lg p-3 shadow-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">Click on column headers to sort. Use filters to view specific categories.</p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={toggleDataSource}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  Switch to {dataSource === 'binance' ? 'simulated data' : 'Binance API'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default CryptoTracker;
