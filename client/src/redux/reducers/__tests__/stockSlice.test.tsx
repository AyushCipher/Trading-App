import reducer, { setStocks, setHoldings } from '../stockSlice';

describe('stockSlice', () => {
  const initialState = { stocks: [], holdings: [] };

  it('returns the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles setStocks', () => {
    const stocks = [{ symbol: 'AAPL', currentPrice: 190 }];
    const state = reducer(initialState, setStocks(stocks));
    expect(state.stocks).toEqual(stocks);
    expect(state.holdings).toEqual([]);
  });

  it('replaces the previous stocks list rather than appending', () => {
    const first = reducer(initialState, setStocks([{ symbol: 'AAPL' }]));
    const second = reducer(first, setStocks([{ symbol: 'TSLA' }]));
    expect(second.stocks).toEqual([{ symbol: 'TSLA' }]);
  });

  it('handles setHoldings', () => {
    const holdings = [{ symbol: 'AAPL', quantity: 5 }];
    const state = reducer(initialState, setHoldings(holdings));
    expect(state.holdings).toEqual(holdings);
    expect(state.stocks).toEqual([]);
  });
});
