import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCryptos } from '../redux/cryptoSlice';
import { formatLargeNumber } from '../utils/mockData';

const MarketStats = () => {
  const cryptos = useSelector(selectAllCryptos);

  // Calculate total market cap
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.marketCap, 0);

  // Calculate total 24h volume
  const total24hVolume = cryptos.reduce((sum, crypto) => sum + crypto.volume24h, 0);

  // Calculate average 24h change
  const avg24hChange = cryptos.reduce((sum, crypto) => sum + crypto.change24h, 0) / cryptos.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-6 pt-6">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-bl-full"></div>
        <div className="relative z-10">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Total Market Cap</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${formatLargeNumber(totalMarketCap)}</p>
        </div>
        <div className="absolute bottom-2 right-2 opacity-30 dark:opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500">
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 dark:bg-purple-500/20 rounded-bl-full"></div>
        <div className="relative z-10">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">24h Trading Volume</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${formatLargeNumber(total24hVolume)}</p>
        </div>
        <div className="absolute bottom-2 right-2 opacity-30 dark:opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-500">
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-16 h-16 ${avg24hChange >= 0 ? 'bg-green-500/10 dark:bg-green-500/20' : 'bg-red-500/10 dark:bg-red-500/20'} rounded-bl-full`}></div>
        <div className="relative z-10">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Average 24h Change</h3>
          <p className={`text-2xl font-bold ${avg24hChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {avg24hChange >= 0 ? '+' : ''}{avg24hChange.toFixed(2)}%
          </p>
        </div>
        <div className="absolute bottom-2 right-2 opacity-30 dark:opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${avg24hChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {avg24hChange >= 0 ? (
              <path fillRule="evenodd" d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MarketStats;
