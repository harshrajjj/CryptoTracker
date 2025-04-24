import React, { useState, useEffect } from 'react';
import { WS_STATUS_EVENT } from '../services/binanceWebSocket';

const WebSocketStatus = ({ binanceWs }) => {
  const [status, setStatus] = useState({
    status: 'disconnected',
    error: null,
    messageCount: 0,
    lastUpdateTime: null,
    reconnectAttempts: 0,
    isConnected: false
  });

  // Initialize status from WebSocket instance
  useEffect(() => {
    if (binanceWs) {
      setStatus(binanceWs.getStatus());
    }
  }, [binanceWs]);

  // Listen for status updates
  useEffect(() => {
    const handleStatusUpdate = (event) => {
      setStatus(event.detail);
    };

    window.addEventListener(WS_STATUS_EVENT, handleStatusUpdate);

    return () => {
      window.removeEventListener(WS_STATUS_EVENT, handleStatusUpdate);
    };
  }, []);

  // Format the last update time
  const formatTime = (time) => {
    if (!time) return 'Never';

    const date = new Date(time);
    return date.toLocaleTimeString();
  };

  // Get status indicator color
  const getStatusColor = () => {
    switch (status.status) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
      case 'reconnecting':
        return 'bg-yellow-500';
      case 'error':
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status text
  const getStatusText = () => {
    switch (status.status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'reconnecting':
        return `Reconnecting (${status.reconnectAttempts})...`;
      case 'error':
        return 'Error';
      case 'failed':
        return 'Connection Failed';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80">
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2 animate-pulse shadow-sm`}></div>
        <span className="font-medium text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
          Binance API: {getStatusText()}
        </span>
      </div>

      {status.status === 'connected' && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-md p-2 shadow-inner">
          <div className="flex justify-between">
            <span>Messages:</span>
            <span className="font-medium">{status.messageCount}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Last update:</span>
            <span className="font-medium">{formatTime(status.lastUpdateTime)}</span>
          </div>
        </div>
      )}

      {status.error && (
        <div className="text-xs text-red-500 mt-1 bg-red-50 dark:bg-red-900/20 p-2 rounded-md border border-red-100 dark:border-red-800/30">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <span>{status.error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebSocketStatus;
