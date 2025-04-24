import { generateRandomChange } from '../utils/mockData';
import { updateCryptoData } from '../redux/cryptoSlice';

class WebSocketSimulator {
  constructor(store) {
    this.store = store;
    this.interval = null;
    this.isRunning = false;
  }

  // Start the simulation
  start(updateInterval = 2000) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.interval = setInterval(() => {
      this.generateUpdates();
    }, updateInterval);
  }

  // Stop the simulation
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.isRunning = false;
    }
  }

  // Generate random updates for crypto data
  generateUpdates() {
    const { crypto } = this.store.getState();
    
    crypto.cryptos.forEach(crypto => {
      // Generate random price change (between -2% and +2%)
      const priceChangePercent = generateRandomChange(-2, 2) / 100;
      const newPrice = crypto.price * (1 + priceChangePercent);
      
      // Generate random percentage changes
      const newChange1h = crypto.change1h + generateRandomChange(-0.5, 0.5);
      const newChange24h = crypto.change24h + generateRandomChange(-0.3, 0.3);
      const newChange7d = crypto.change7d + generateRandomChange(-0.2, 0.2);
      
      // Generate random volume change (between -5% and +5%)
      const volumeChangePercent = generateRandomChange(-5, 5) / 100;
      const newVolume = crypto.volume24h * (1 + volumeChangePercent);
      
      // Dispatch update action
      this.store.dispatch(updateCryptoData({
        id: crypto.id,
        updates: {
          price: parseFloat(newPrice.toFixed(2)),
          change1h: parseFloat(newChange1h.toFixed(2)),
          change24h: parseFloat(newChange24h.toFixed(2)),
          change7d: parseFloat(newChange7d.toFixed(2)),
          volume24h: Math.round(newVolume),
        }
      }));
    });
  }
}

export default WebSocketSimulator;
