import React, { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const PriceLineChart = ({ data, color = '#10B981', height = 200, showLabels = false, showGrid = false, showTooltip = true }) => {
  const chartRef = useRef(null);

  // Determine if price is trending up or down
  const isPositive = data && data.length > 1 && data[data.length - 1] >= data[0];

  // Set gradient colors based on trend - using a more subtle green like in the image
  const lineColor = isPositive ? '#22c55e' : '#ef4444'; // Brighter green for the line
  const gradientColor = isPositive ? '#22c55e' : '#ef4444';

  // Create gradient fill
  const createGradient = (ctx) => {
    if (!ctx) return `${gradientColor}10`;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${gradientColor}20`); // 20% opacity - more subtle
    gradient.addColorStop(1, `${gradientColor}01`); // 1% opacity - almost transparent at bottom
    return gradient;
  };

  // Prepare chart data
  const chartData = {
    labels: data ? Array(data.length).fill('') : [],
    datasets: [
      {
        label: 'Price',
        data: data || [],
        borderColor: lineColor,
        borderWidth: 1.5, // Thinner line like in the image
        tension: 0.5, // More smooth curve
        pointRadius: 0, // Hide points
        pointHoverRadius: 3, // Smaller points on hover
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          return createGradient(ctx);
        },
        cubicInterpolationMode: 'monotone', // Ensures smoother curves without exaggerated peaks
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: showTooltip,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 0, // No border
        padding: 8,
        cornerRadius: 4,
        displayColors: false,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        display: showLabels,
        grid: {
          display: false, // No grid lines
          drawBorder: false, // No border
        },
        ticks: {
          display: showLabels,
          color: 'rgba(107, 114, 128, 0.6)',
          font: {
            size: 10,
          },
        },
        border: {
          display: false, // No axis line
        }
      },
      y: {
        display: showLabels,
        grid: {
          display: showGrid,
          drawBorder: false, // No border
          color: 'rgba(107, 114, 128, 0.07)', // Very subtle grid lines
          lineWidth: 0.5, // Thinner grid lines
        },
        ticks: {
          display: showLabels,
          color: 'rgba(107, 114, 128, 0.6)',
          font: {
            size: 10,
          },
          padding: 8, // More padding
        },
        border: {
          display: false, // No axis line
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.5, // More smooth curve
        borderJoinStyle: 'round', // Rounded line joins
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default PriceLineChart;
