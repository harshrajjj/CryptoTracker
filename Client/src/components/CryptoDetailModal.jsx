import React from 'react';
import DetailedPriceChart from './DetailedPriceChart';
import { formatCurrency, formatLargeNumber } from '../utils/mockData';

const CryptoDetailModal = ({ crypto, onClose }) => {
  if (!crypto) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white dark:bg-gray-700 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            {/* Crypto header */}
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                <img
                  src={crypto.logo}
                  alt={crypto.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/100?text=${crypto.symbol}`;
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  {crypto.name}
                  <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {crypto.symbol}
                  </span>
                </h2>
                <div className="flex items-center mt-1">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(crypto.price)}
                  </span>
                  <span className={`ml-2 text-sm font-medium ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    (24h)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Price chart */}
            <DetailedPriceChart cryptoData={crypto} className="mb-6" />
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatLargeNumber(crypto.marketCap)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Volume</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatLargeNumber(crypto.volume24h)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Circulating Supply</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatLargeNumber(crypto.circulatingSupply)} {crypto.symbol}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">1h Change</h3>
                <p className={`text-lg font-semibold ${crypto.change1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change1h >= 0 ? '+' : ''}{crypto.change1h.toFixed(2)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</h3>
                <p className={`text-lg font-semibold ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">7d Change</h3>
                <p className={`text-lg font-semibold ${crypto.change7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
              <a
                href={`https://www.binance.com/en/trade/${crypto.symbol}_USDT`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-colors"
              >
                Trade on Binance
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailModal;
