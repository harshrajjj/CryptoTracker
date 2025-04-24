import { describe, it, expect } from 'vitest';
import cryptoReducer, {
  updateCryptoData,
  updateAllCryptos,
  setSortBy,
  setFilter,
  selectAllCryptos,
  selectSortedCryptos
} from './cryptoSlice';

describe('cryptoSlice', () => {
  // Sample initial state for testing
  const initialState = {
    cryptos: [
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 50000,
        change24h: 2.5,
        marketCap: 1000000000000
      },
      {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3000,
        change24h: -1.5,
        marketCap: 400000000000
      }
    ],
    sortBy: null,
    sortDirection: 'asc',
    filter: null
  };

  // Test reducers
  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(cryptoReducer(undefined, { type: 'unknown' })).toHaveProperty('cryptos');
      expect(cryptoReducer(undefined, { type: 'unknown' })).toHaveProperty('sortBy');
      expect(cryptoReducer(undefined, { type: 'unknown' })).toHaveProperty('sortDirection');
      expect(cryptoReducer(undefined, { type: 'unknown' })).toHaveProperty('filter');
    });

    it('should handle updateCryptoData', () => {
      const actual = cryptoReducer(initialState, updateCryptoData({
        id: 1,
        updates: { price: 55000, change24h: 3.0 }
      }));
      
      expect(actual.cryptos[0].price).toEqual(55000);
      expect(actual.cryptos[0].change24h).toEqual(3.0);
      expect(actual.cryptos[1].price).toEqual(3000); // Unchanged
    });

    it('should handle updateAllCryptos', () => {
      const newCryptos = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 60000 },
        { id: 2, name: 'Ethereum', symbol: 'ETH', price: 4000 }
      ];
      
      const actual = cryptoReducer(initialState, updateAllCryptos(newCryptos));
      
      expect(actual.cryptos).toEqual(newCryptos);
    });

    it('should handle setSortBy with new field', () => {
      const actual = cryptoReducer(initialState, setSortBy({ field: 'price' }));
      
      expect(actual.sortBy).toEqual('price');
      expect(actual.sortDirection).toEqual('asc');
    });

    it('should handle setSortBy with same field (toggle direction)', () => {
      const stateWithSort = {
        ...initialState,
        sortBy: 'price',
        sortDirection: 'asc'
      };
      
      const actual = cryptoReducer(stateWithSort, setSortBy({ field: 'price' }));
      
      expect(actual.sortBy).toEqual('price');
      expect(actual.sortDirection).toEqual('desc');
    });

    it('should handle setFilter', () => {
      const actual = cryptoReducer(initialState, setFilter('gainers'));
      
      expect(actual.filter).toEqual('gainers');
    });
  });

  // Test selectors
  describe('selectors', () => {
    const state = {
      crypto: initialState
    };

    it('should select all cryptos', () => {
      const selected = selectAllCryptos(state);
      expect(selected).toEqual(initialState.cryptos);
    });

    it('should select sorted cryptos by price (asc)', () => {
      const stateWithSort = {
        crypto: {
          ...initialState,
          sortBy: 'price',
          sortDirection: 'asc'
        }
      };
      
      const selected = selectSortedCryptos(stateWithSort);
      expect(selected[0].symbol).toEqual('ETH');
      expect(selected[1].symbol).toEqual('BTC');
    });

    it('should select sorted cryptos by price (desc)', () => {
      const stateWithSort = {
        crypto: {
          ...initialState,
          sortBy: 'price',
          sortDirection: 'desc'
        }
      };
      
      const selected = selectSortedCryptos(stateWithSort);
      expect(selected[0].symbol).toEqual('BTC');
      expect(selected[1].symbol).toEqual('ETH');
    });

    it('should filter gainers', () => {
      const stateWithFilter = {
        crypto: {
          ...initialState,
          filter: 'gainers'
        }
      };
      
      const selected = selectSortedCryptos(stateWithFilter);
      expect(selected.length).toEqual(1);
      expect(selected[0].symbol).toEqual('BTC');
    });

    it('should filter losers', () => {
      const stateWithFilter = {
        crypto: {
          ...initialState,
          filter: 'losers'
        }
      };
      
      const selected = selectSortedCryptos(stateWithFilter);
      expect(selected.length).toEqual(1);
      expect(selected[0].symbol).toEqual('ETH');
    });
  });
});
