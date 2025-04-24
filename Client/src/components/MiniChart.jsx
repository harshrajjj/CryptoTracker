import React, { useMemo } from 'react';
import PriceLineChart from './PriceLineChart';
import { generateTimeRangeData } from '../utils/chartDataUtils';

// Create a static chart component to prevent re-renders
const MiniChart = React.memo(({ data, change7d, crypto }) => {
  // Determine if trend is positive or negative
  const isPositive = change7d >= 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444'; // Green or red - matching the image

  // Get chart data - either use provided data or generate from crypto object
  const safeData = useMemo(() => {
    // If we have a crypto object, use that to generate consistent data
    if (crypto) {
      const { data: generatedData } = generateTimeRangeData(crypto, '7d');

      // Log for debugging - only for Bitcoin to avoid console spam
      if (crypto.symbol === 'BTC') {
        console.log('7d chart data in MiniChart:', generatedData);
      }

      return generatedData;
    }

    // Otherwise fall back to provided data
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [0, 0, 0, 0, 0, 0, 0]; // Default data if none provided
    }
    return [...data]; // Create a new array to avoid mutations
  }, [data, crypto, change7d]);

  // Render a simple line instead of a chart if there's an error
  try {
    return (
      <div className="h-12 w-24">
        <PriceLineChart
          data={safeData}
          color={lineColor}
          height={48}
          showLabels={false}
          showGrid={false}
          showTooltip={false}
        />
      </div>
    );
  } catch (error) {
    console.error("Error rendering chart:", error);
    return (
      <div className="h-12 w-24 flex items-center justify-center">
        <div
          className={`h-1 w-20 rounded ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
        />
      </div>
    );
  }
});

export default MiniChart;
