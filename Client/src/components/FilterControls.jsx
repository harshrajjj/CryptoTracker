import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSortBy } from '../redux/cryptoSlice';

const FilterControls = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.crypto.filter);
  const { sortBy, sortDirection } = useSelector(state => state.crypto);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter === currentFilter ? null : filter));
  };

  const handleSortChange = (field) => {
    dispatch(setSortBy({ field }));
  };

  return (
    <div className="px-6 mb-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-indigo-500">
              <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clipRule="evenodd" />
            </svg>
            Filter & Sort
          </h2>

          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 ml-2">Sort by:</span>
            <div className="relative">
              <select
                className="bg-transparent border-0 rounded-md text-sm py-1.5 pl-2 pr-8 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600/30"
                value={sortBy || 'marketCap'}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  appearance: 'none',
                }}
              >
                <option value="marketCap" className="bg-white dark:bg-gray-800 py-2">Market Cap</option>
                <option value="price" className="bg-white dark:bg-gray-800 py-2">Price</option>
                <option value="change24h" className="bg-white dark:bg-gray-800 py-2">24h Change</option>
                <option value="volume24h" className="bg-white dark:bg-gray-800 py-2">Volume</option>
                <option value="name" className="bg-white dark:bg-gray-800 py-2">Name</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <button
              className="ml-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              onClick={() => handleSortChange(sortBy || 'marketCap')}
              title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortDirection === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentFilter === null
                ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
            onClick={() => handleFilterChange(null)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              All Cryptocurrencies
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentFilter === 'gainers'
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
            onClick={() => handleFilterChange('gainers')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
              </svg>
              Top Gainers
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentFilter === 'losers'
                ? 'bg-gradient-to-r from-red-500 to-rose-400 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
            onClick={() => handleFilterChange('losers')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Top Losers
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
