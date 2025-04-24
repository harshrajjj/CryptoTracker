// Generate random chart data for the 7-day chart
export const generateMockChartData = (days = 7) => {
  const data = [];
  let baseValue = Math.random() * 1000 + 100;
  
  for (let i = 0; i < days; i++) {
    // Add some randomness to create a realistic chart
    baseValue = baseValue + (Math.random() - 0.5) * 100;
    data.push(baseValue);
  }
  
  return data;
};

// Generate random percentage change within a range
export const generateRandomChange = (min = -5, max = 5) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Format large numbers with commas
export const formatNumber = (num) => {
  return num.toLocaleString('en-US');
};

// Format currency with $ sign and 2 decimal places
export const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

// Format large numbers with abbreviations (K, M, B, T)
export const formatLargeNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
};
