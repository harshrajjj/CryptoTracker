// Save state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cryptoTrackerState', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};

// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cryptoTrackerState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return undefined;
  }
};
