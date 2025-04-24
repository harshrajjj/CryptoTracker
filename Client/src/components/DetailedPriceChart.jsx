import React, { useState, useEffect } from 'react';
import PriceLineChart from './PriceLineChart';
import { generateTimeRangeData } from '../utils/chartDataUtils';

const timeRanges = [
  { label: '24h', days: 1 },
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '1y', days: 365 },
];

const DetailedPriceChart = ({
  cryptoData,
  generateChartData = null,
  height = 300,
  className = ''
}) => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [chartData, setChartData] = useState([]);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate chart data based on the selected time range
  useEffect(() => {
    setIsLoading(true);

    // If a custom data generator is provided, use it
    if (generateChartData) {
      const { data, change } = generateChartData(selectedRange);
      setChartData(data);
      setPriceChange(change);
      setIsLoading(false);
      return;
    }

    // Use our utility function to generate appropriate data for the selected time range
    if (cryptoData) {
      // For consistency, always use the same data generation method
      const { data, change } = generateTimeRangeData(cryptoData, selectedRange);

      // Log for debugging
      if (selectedRange === '7d') {
        console.log('7d chart data in DetailedPriceChart:', data);
      }

      setChartData(data);
      setPriceChange(change);
    }

    setIsLoading(false);
  }, [selectedRange, cryptoData, generateChartData]);

  // Determine if price change is positive
  const isPositive = priceChange >= 0;
  const chartColor = isPositive ? '#22c55e' : '#ef4444'; // Green or red

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md ${className}`}>
      {/* Chart header with price info and time range selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price Chart</h3>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {selectedRange} change
            </span>
          </div>
        </div>

        {/* Time range selector */}
        <div className="flex mt-3 sm:mt-0 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1 shadow-inner">
          {timeRanges.map(range => (
            <button
              key={range.label}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedRange === range.label
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50'
              }`}
              onClick={() => setSelectedRange(range.label)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 rounded-lg z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : null}

        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <PriceLineChart
            data={chartData}
            color={chartColor}
            height={height}
            showLabels={true}
            showGrid={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedPriceChart;
