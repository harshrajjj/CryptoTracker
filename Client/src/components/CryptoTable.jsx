import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSortedCryptos, setSortBy } from '../redux/cryptoSlice';
import PercentageChange from './PercentageChange';
import MiniChart from './MiniChart';
import CryptoDetailModal from './CryptoDetailModal';
import { formatCurrency, formatLargeNumber } from '../utils/mockData';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  // Use try-catch to prevent the component from crashing
  let cryptos = [];
  let sortBy = null;
  let sortDirection = 'asc';

  try {
    cryptos = useSelector(selectSortedCryptos);
    const sortState = useSelector(state => state.crypto);
    sortBy = sortState.sortBy;
    sortDirection = sortState.sortDirection;
  } catch (err) {
    console.error('Error in CryptoTable:', err);
    setError(err.message);
  }

  const handleSort = (field) => {
    // Don't sort by chartData as it causes issues with Chart.js
    if (field === 'chartData') return;

    // Use a try-catch to prevent errors from crashing the app
    try {
      dispatch(setSortBy({ field }));
    } catch (error) {
      console.error("Error sorting by field:", field, error);
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-0 group-hover:opacity-30">
          <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
      </svg>
    );
  };

  // Column definition for better organization
  const columns = [
    { id: 'id', label: '#', sortable: false, align: 'left' },
    { id: 'name', label: 'Name', sortable: true, align: 'left' },
    { id: 'price', label: 'Price', sortable: true, align: 'right' },
    { id: 'change1h', label: '1h %', sortable: true, align: 'right' },
    { id: 'change24h', label: '24h %', sortable: true, align: 'right' },
    { id: 'change7d', label: '7d %', sortable: true, align: 'right' },
    { id: 'marketCap', label: 'Market Cap', sortable: true, align: 'right' },
    { id: 'volume24h', label: 'Volume (24h)', sortable: true, align: 'right' },
    { id: 'circulatingSupply', label: 'Circulating Supply', sortable: true, align: 'right' },
    // Never make chartData sortable as it causes issues with Chart.js
    { id: 'chart', label: 'Last 7 Days', sortable: false, align: 'right' },
  ];

  // Display error message if there's an error
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <h3 className="font-bold">Error loading crypto data:</h3>
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto px-6">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 text-${column.align} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 group' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center justify-${column.align === 'right' ? 'end' : 'start'} space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <span className="inline-flex">
                        {getSortIcon(column.id)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {cryptos.map((crypto) => (
              <tr
                key={crypto.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() => setSelectedCrypto(crypto)}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300">
                    {crypto.id}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={crypto.logo}
                        alt={crypto.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          // If CoinGecko logo fails, try CoinMarketCap
                          if (crypto.symbol === 'BTC') {
                            e.target.src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png';
                          } else if (crypto.symbol === 'ETH') {
                            e.target.src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
                          } else if (crypto.symbol === 'USDT') {
                            e.target.src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png';
                          } else if (crypto.symbol === 'BNB') {
                            e.target.src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
                          } else if (crypto.symbol === 'SOL') {
                            e.target.src = 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png';
                          }
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {crypto.name}
                      </div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                    {formatCurrency(crypto.price)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    {crypto.price < 1 ? crypto.price.toFixed(6) : null}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <PercentageChange value={crypto.change1h} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <PercentageChange value={crypto.change24h} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <PercentageChange value={crypto.change7d} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                    ${formatLargeNumber(crypto.marketCap)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                    ${formatLargeNumber(crypto.volume24h)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    {(crypto.volume24h / crypto.marketCap * 100).toFixed(2)}% of market cap
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-right">
                    {formatLargeNumber(crypto.circulatingSupply)} {crypto.symbol}
                  </div>
                  {crypto.maxSupply && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {(crypto.circulatingSupply / crypto.maxSupply * 100).toFixed(1)}% of max supply
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex justify-end">
                    <MiniChart data={crypto.chartData} change7d={crypto.change7d} crypto={crypto} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedCrypto && (
        <CryptoDetailModal
          crypto={selectedCrypto}
          onClose={() => setSelectedCrypto(null)}
        />
      )}
    </>
  );
};

export default CryptoTable;
