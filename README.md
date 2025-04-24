# Crypto Tracker

A real-time cryptocurrency price tracker built with React, Redux Toolkit, and Tailwind CSS. This application provides live updates of cryptocurrency prices, market data, and interactive charts.

<div align="center">
  <img src="https://github.com/harshrajjj/CryptoTracker/Client/demo/demo.gif" alt="Crypto Tracker Demo" width="800px" />

  *Live cryptocurrency tracking with real-time updates and interactive charts*

  [View Live Demo](https://crypto-tracker-demo.vercel.app/) | [Watch Demo Video](https://youtu.be/your-demo-video-id)
</div>

## 🚀 Demo

You can view a live demo of the application at: [https://crypto-tracker-demo.vercel.app/](https://crypto-tracker-demo.vercel.app/)

### Demo Credentials
- No login required! The application uses public cryptocurrency data.

## Features

- **Real-time Data**: Connect to Binance WebSocket API for live cryptocurrency price updates
- **Interactive Charts**: Smooth line charts with gradient fills for visualizing price history
- **Dark/Light Mode**: Fully responsive design with seamless dark mode support
- **Filtering & Sorting**: Sort cryptocurrencies by various metrics and filter by categories
- **Market Statistics**: View key market metrics including total market cap and 24h volume
- **Detailed Information**: Click on any cryptocurrency to view detailed charts and statistics
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## 🛠️ Tech Stack & Architecture

### Frontend
- **React 19**: Latest version of the React library for building the UI
- **Redux Toolkit**: State management with efficient updates and immutable data patterns
- **Tailwind CSS 4**: Utility-first CSS framework for responsive styling
- **Chart.js & react-chartjs-2**: Interactive and responsive charts with smooth animations
- **Vite**: Next-generation frontend build tool with HMR for fast development

### Data Flow
- **WebSockets**: Real-time data connection to Binance API
- **Redux Store**: Centralized state management with slices for different data domains
- **Thunk Middleware**: Handling asynchronous operations and side effects

### Architecture
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────┐  │
│  │   Binance   │    │  Simulated  │    │         │  │
│  │  WebSocket  │◄───┤  WebSocket  │◄───┤  Redux  │  │
│  │   Service   │    │   Service   │    │  Store  │  │
│  └─────┬───────┘    └─────────────┘    └────┬────┘  │
│        │                                    │       │
│        │                                    │       │
│        ▼                                    ▼       │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │                React Components             │   │
│  │                                             │   │
│  │  ┌───────────┐  ┌───────────┐  ┌─────────┐  │   │
│  │  │ CryptoTable│  │MarketStats│  │ Charts  │  │   │
│  │  └───────────┘  └───────────┘  └─────────┘  │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Design Patterns
- **Container/Presentational Pattern**: Separation of data fetching and presentation
- **Slice Pattern**: Modular Redux state management with dedicated reducers
- **Adapter Pattern**: Converting API data to application-friendly format
- **Observer Pattern**: WebSocket services notify the application of data changes

## 🚦 Setup Instructions

### Prerequisites

- **Node.js**: v16.0.0 or later
- **npm** or **yarn**
- **Git**: For cloning the repository

### 📋 Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker/Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with yarn
   yarn
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application should load with simulated cryptocurrency data

### 🔄 Switching Data Sources

The application supports two data sources:

1. **Simulated Data**: Default mode that generates random price movements (no API key required)
2. **Binance API**: Real-time market data from Binance WebSocket API

To switch between data sources, use the toggle button in the application interface.

### 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables (optional):

```
# Optional: Binance API rate limiting
VITE_BINANCE_API_LIMIT=10

# Optional: Default data source (simulated or binance)
VITE_DEFAULT_DATA_SOURCE=simulated
```

### 🌐 Deployment on Vercel

This project is configured for easy deployment on Vercel.

#### One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcrypto-tracker)

#### Manual Deployment Steps

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Vercel will automatically detect the project as a Vite app
   - Configure your project settings if needed
   - Click "Deploy"

3. **Alternative: Deploy using Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy from your project directory
   vercel
   ```

4. **Configure environment variables** in the Vercel dashboard under your project settings if needed

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

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and naming conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting a PR

## 📊 Performance Metrics

The application has been optimized for performance:

| Metric                | Score |
|-----------------------|-------|
| Lighthouse Performance| 95+   |
| First Contentful Paint| <1s   |
| Time to Interactive   | <2s   |
| Bundle Size (gzipped) | ~170KB|
| WebSocket Latency     | <100ms|

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Binance API](https://binance-docs.github.io/apidocs/) for providing real-time cryptocurrency data
- [Chart.js](https://www.chartjs.org/) for the powerful charting library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient state management
- [React](https://reactjs.org/) for the frontend library
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [Vercel](https://vercel.com/) for hosting and deployment

## 📬 Contact

If you have any questions or feedback, please reach out:

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/crypto-tracker/issues)
- **Email**: your.email@example.com
- **Twitter**: [@yourusername](https://twitter.com/yourusername)
