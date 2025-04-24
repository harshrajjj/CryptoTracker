# Crypto Tracker

A real-time cryptocurrency price tracker built with React, Redux Toolkit, and Tailwind CSS. This application provides live updates of cryptocurrency prices, market data, and interactive charts.

![Crypto Tracker Screenshot](public/screenshot.png)
*Note: This is a placeholder image. Replace with an actual screenshot of your application.*

## Features

- **Real-time Data**: Connect to Binance WebSocket API for live cryptocurrency price updates
- **Interactive Charts**: Smooth line charts with gradient fills for visualizing price history
- **Dark/Light Mode**: Fully responsive design with seamless dark mode support
- **Filtering & Sorting**: Sort cryptocurrencies by various metrics and filter by categories
- **Market Statistics**: View key market metrics including total market cap and 24h volume
- **Detailed Information**: Click on any cryptocurrency to view detailed charts and statistics
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## Technologies Used

- **React**: Frontend library for building the user interface
- **Redux Toolkit**: State management with efficient updates
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Chart.js**: Interactive and responsive charts
- **Vite**: Next-generation frontend build tool
- **WebSockets**: Real-time data connection to Binance API

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

- **Toggle Dark/Light Mode**: Click the theme toggle button in the top right corner
- **Sort Cryptocurrencies**: Click on column headers or use the sort dropdown
- **Filter by Category**: Use the filter buttons to show specific categories
- **View Details**: Click on any cryptocurrency row to see detailed information
- **Change Update Interval**: Select different update frequencies for simulated data
- **Switch Data Source**: Toggle between simulated data and Binance API

## Project Structure

```
crypto-tracker/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── redux/           # Redux store and slices
│   ├── services/        # API and WebSocket services
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── darkMode.css     # Dark mode styling
├── index.html           # HTML template
└── package.json         # Project dependencies and scripts
```

## Key Components

- **CryptoTracker**: Main container component that manages data sources and updates
- **CryptoTable**: Displays the list of cryptocurrencies with sorting and filtering
- **MarketStats**: Shows overall market statistics
- **PriceLineChart**: Renders smooth line charts with gradient fills
- **DetailedPriceChart**: Interactive chart with time range selection
- **FilterControls**: UI for sorting and filtering cryptocurrencies
- **ThemeToggle**: Switches between light and dark mode

## Data Sources

The application can use two data sources:

1. **Simulated Data**: Generates random price movements for testing and development
2. **Binance API**: Connects to Binance WebSocket for real-time market data

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by modifying:

- `tailwind.config.js`: Configure theme colors, spacing, etc.
- `darkMode.css`: Adjust dark mode specific styles
- Component classes: Modify Tailwind classes in individual components

### Adding Cryptocurrencies

To add more cryptocurrencies to the tracked list:

1. Update the `initialCryptos` array in `cryptoSlice.js`
2. Add the corresponding symbol to the WebSocket subscription in `binanceWebSocket.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Binance API](https://binance-docs.github.io/apidocs/) for providing real-time cryptocurrency data
- [Chart.js](https://www.chartjs.org/) for the charting library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React](https://reactjs.org/) for the frontend library
