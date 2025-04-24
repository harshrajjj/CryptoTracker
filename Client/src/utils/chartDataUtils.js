/**
 * Updates chart data with a new price point
 * @param {Array} existingData - The existing chart data array
 * @param {number} newPrice - The new price to add
 * @param {number} maxPoints - Maximum number of points to keep (default: 24)
 * @returns {Array} - Updated chart data array
 */
export const updateChartData = (existingData, newPrice, maxPoints = 24) => {
  if (!existingData || !Array.isArray(existingData)) {
    // If no existing data, create a new array with the price repeated
    return Array(maxPoints).fill(newPrice);
  }

  // Create a copy of the existing data and add the new price
  const updatedData = [...existingData, newPrice];

  // If we have more points than maxPoints, remove the oldest ones
  if (updatedData.length > maxPoints) {
    return updatedData.slice(updatedData.length - maxPoints);
  }

  return updatedData;
};

/**
 * Generates historical price data based on current price and change percentage
 * @param {number} currentPrice - Current price
 * @param {number} changePercent - Change percentage (e.g., 2.5 for 2.5%)
 * @param {number} numPoints - Number of data points to generate
 * @returns {Array} - Array of price points
 */
export const generateHistoricalPrices = (currentPrice, changePercent, numPoints = 24) => {
  // Calculate the starting price based on the current price and change percentage
  const startingPrice = currentPrice / (1 + (changePercent / 100));

  // Create an array to hold the price points
  const pricePoints = [];

  // Generate price points with some randomness to make it look natural
  for (let i = 0; i < numPoints; i++) {
    // Calculate progress from 0 to 1
    const progress = i / (numPoints - 1);

    // Calculate the expected price at this point based on linear progression
    const expectedPrice = startingPrice + (progress * (currentPrice - startingPrice));

    // Add some randomness (more in the middle, less at the start/end)
    const randomFactor = 0.2 * Math.sin(progress * Math.PI); // Max volatility in the middle
    const randomness = (Math.random() - 0.5) * randomFactor * expectedPrice;

    // Calculate the price with randomness
    const price = expectedPrice + randomness;

    // Ensure price is positive
    pricePoints.push(Math.max(price, 0.00001));
  }

  // Ensure the last point is exactly the current price
  if (pricePoints.length > 0) {
    pricePoints[pricePoints.length - 1] = currentPrice;
  }

  return pricePoints;
};

/**
 * Generates chart data for different time periods
 * @param {Object} crypto - Cryptocurrency data object
 * @param {string} timeRange - Time range (24h, 7d, 30d, 90d, 1y)
 * @returns {Object} - Object with data array and change percentage
 */
export const generateTimeRangeData = (crypto, timeRange) => {
  if (!crypto) {
    return { data: [], change: 0 };
  }

  let change = 0;
  let numPoints = 24;

  // Determine which change percentage to use based on time range
  switch (timeRange) {
    case '24h':
      change = crypto.change24h;
      numPoints = 24;
      break;
    case '7d':
      change = crypto.change7d;
      numPoints = 24; // Use 24 points for smoother chart
      break;
    case '30d':
      // For longer periods, we'll estimate based on weekly change
      change = crypto.change7d * 4; // Approximate monthly change
      numPoints = 30;
      break;
    case '90d':
      change = crypto.change7d * 12; // Approximate quarterly change
      numPoints = 90;
      break;
    case '1y':
      change = crypto.change7d * 52; // Approximate yearly change
      numPoints = 365;
      break;
    default:
      change = crypto.change24h;
      numPoints = 24;
  }

  // If we have chartData and it's for 7d view, use it directly
  if (timeRange === '7d' && crypto.chartData && Array.isArray(crypto.chartData) && crypto.chartData.length > 0) {
    // Use the existing chart data for consistency
    return {
      data: [...crypto.chartData],
      change: crypto.change7d
    };
  }

  // Otherwise, generate historical prices based on current price and change percentage
  const data = generateHistoricalPrices(crypto.price, change, numPoints);

  return { data, change };
};
