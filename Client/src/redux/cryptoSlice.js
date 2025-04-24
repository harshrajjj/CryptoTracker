import { createSlice, createSelector } from '@reduxjs/toolkit';
import { generateMockChartData } from '../utils/mockData';

// Sample initial data for 5 cryptocurrencies
const initialCryptos = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    price: 65432.10,
    change1h: 0.5,
    change24h: 1.2,
    change7d: -0.8,
    marketCap: 1258000000000,
    volume24h: 32500000000,
    circulatingSupply: 19200000,
    maxSupply: 21000000,
    chartData: generateMockChartData(7),
    color: '#F7931A',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    price: 3521.45,
    change1h: -0.2,
    change24h: 2.5,
    change7d: 3.1,
    marketCap: 423000000000,
    volume24h: 18700000000,
    circulatingSupply: 120000000,
    maxSupply: null,
    chartData: generateMockChartData(7),
    color: '#627EEA',
  },
  {
    id: 3,
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    price: 1.00,
    change1h: 0.01,
    change24h: -0.02,
    change7d: 0.03,
    marketCap: 95000000000,
    volume24h: 65000000000,
    circulatingSupply: 95000000000,
    maxSupply: null,
    chartData: generateMockChartData(7),
    color: '#26A17B',
  },
  {
    id: 4,
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
    price: 608.75,
    change1h: 0.8,
    change24h: -1.5,
    change7d: 2.3,
    marketCap: 93000000000,
    volume24h: 2100000000,
    circulatingSupply: 153000000,
    maxSupply: 200000000,
    chartData: generateMockChartData(7),
    color: '#F3BA2F',
  },
  {
    id: 5,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
    price: 142.30,
    change1h: 1.2,
    change24h: 3.8,
    change7d: -2.1,
    marketCap: 61000000000,
    volume24h: 2800000000,
    circulatingSupply: 429000000,
    maxSupply: null,
    chartData: generateMockChartData(7),
    color: '#00FFA3',
  },
];

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: initialCryptos,
    sortBy: null,
    sortDirection: 'asc',
    filter: null,
  },
  reducers: {
    updateCryptoData: (state, action) => {
      const { id, updates } = action.payload;
      const cryptoIndex = state.cryptos.findIndex(crypto => crypto.id === id);

      if (cryptoIndex !== -1) {
        state.cryptos[cryptoIndex] = {
          ...state.cryptos[cryptoIndex],
          ...updates,
        };
      }
    },
    updateAllCryptos: (state, action) => {
      state.cryptos = action.payload;
    },
    setSortBy: (state, action) => {
      const { field } = action.payload;

      if (state.sortBy === field) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = field;
        state.sortDirection = 'asc';
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Selectors
export const selectAllCryptos = state => state.crypto.cryptos;

export const selectSortedCryptos = createSelector(
  [
    selectAllCryptos,
    state => state.crypto.sortBy,
    state => state.crypto.sortDirection,
    state => state.crypto.filter,
  ],
  (cryptos, sortBy, sortDirection, filter) => {
    let filteredCryptos = [...cryptos];

    // Apply filter if exists
    if (filter) {
      if (filter === 'gainers') {
        filteredCryptos = filteredCryptos.filter(crypto => crypto.change24h > 0);
      } else if (filter === 'losers') {
        filteredCryptos = filteredCryptos.filter(crypto => crypto.change24h < 0);
      }
    }

    // Apply sorting if sortBy is set and it's not chartData
    if (sortBy && sortBy !== 'chartData') {
      try {
        filteredCryptos.sort((a, b) => {
          try {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            // Handle null or undefined values
            if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
            if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

            // Handle string values
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }

            // Skip sorting for array values to avoid Chart.js issues
            if (Array.isArray(aValue) || Array.isArray(bValue)) {
              return 0;
            }

            // Handle number values
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
          } catch (error) {
            console.error("Error comparing values for sorting:", error);
            return 0; // Return 0 to keep original order in case of error
          }
        });
      } catch (error) {
        console.error("Error sorting cryptos:", error);
        // If sorting fails, return the original array
      }
    }

    return filteredCryptos;
  }
);

export const { updateCryptoData, updateAllCryptos, setSortBy, setFilter } = cryptoSlice.actions;

export default cryptoSlice.reducer;
