import { updateCryptoData } from '../redux/cryptoSlice';
import { updateChartData } from '../utils/chartDataUtils';

// Custom event for connection status updates
export const WS_STATUS_EVENT = 'binance_ws_status';

class BinanceWebSocket {
  constructor(store) {
    this.store = store;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.connectionStatus = 'disconnected'; // 'connecting', 'connected', 'disconnected', 'error'
    this.lastError = null;
    this.messageCount = 0;
    this.symbolMap = {
      'BTC': 'BTCUSDT',
      'ETH': 'ETHUSDT',
      'USDT': 'USDTBUSD', // Using BUSD pair as a proxy
      'BNB': 'BNBUSDT',
      'SOL': 'SOLUSDT'
    };
    this.lastPrices = {};
    this.lastUpdateTime = null;
  }

  // Emit status updates to components
  emitStatusUpdate() {
    const statusEvent = new CustomEvent(WS_STATUS_EVENT, {
      detail: {
        status: this.connectionStatus,
        error: this.lastError,
        messageCount: this.messageCount,
        lastUpdateTime: this.lastUpdateTime,
        reconnectAttempts: this.reconnectAttempts
      }
    });
    window.dispatchEvent(statusEvent);
  }

  connect() {
    if (this.isConnected) return;

    this.connectionStatus = 'connecting';
    this.emitStatusUpdate();
    console.log('Connecting to Binance WebSocket...');

    try {
      // Create a combined stream for all symbols
      const streams = Object.values(this.symbolMap).map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
      const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
      this.socket.onerror = this.handleError.bind(this);
      this.socket.onclose = this.handleClose.bind(this);

      // Set a connection timeout
      setTimeout(() => {
        if (this.connectionStatus === 'connecting') {
          this.lastError = 'Connection timeout';
          this.connectionStatus = 'error';
          this.emitStatusUpdate();
          this.attemptReconnect();
        }
      }, 10000); // 10 second timeout
    } catch (error) {
      console.error('Error connecting to Binance WebSocket:', error);
      this.lastError = error.message;
      this.connectionStatus = 'error';
      this.emitStatusUpdate();
      this.attemptReconnect();
    }
  }

  handleOpen() {
    console.log('Connected to Binance WebSocket');
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.connectionStatus = 'connected';
    this.lastError = null;
    this.emitStatusUpdate();

    // Send a ping every 30 seconds to keep the connection alive
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ ping: Date.now() }));
      }
    }, 30000);
  }

  handleMessage(event) {
    try {
      // Update message count and last update time
      this.messageCount++;
      this.lastUpdateTime = new Date();

      // If this is the first message, update status
      if (this.messageCount === 1) {
        this.emitStatusUpdate();
      }

      // Every 10 messages, update status
      if (this.messageCount % 10 === 0) {
        this.emitStatusUpdate();
      }

      const data = JSON.parse(event.data);

      // Handle pong response
      if (data.pong) {
        return;
      }

      if (data && data.data) {
        const ticker = data.data;
        const binanceSymbol = ticker.s; // e.g., "BTCUSDT"

        // Find our internal symbol (BTC, ETH, etc.) from the Binance symbol
        const ourSymbol = Object.keys(this.symbolMap).find(
          key => this.symbolMap[key] === binanceSymbol
        );

        if (ourSymbol) {
          // Find the crypto in our store
          const { crypto } = this.store.getState();
          const cryptoData = crypto.cryptos.find(c => c.symbol === ourSymbol);

          if (cryptoData) {
            const currentPrice = parseFloat(ticker.c);

            // Get price changes from Binance
            // Note: Binance ticker doesn't provide 1h change directly, only 24h
            const priceChange24h = parseFloat(ticker.p); // 24h price change in absolute terms
            const priceChangePercent24h = parseFloat(ticker.P); // 24h price change percent

            // Calculate volume in USD
            const volume24h = parseFloat(ticker.v) * currentPrice; // 24h volume in base asset * price

            // For 1h and 7d changes, we'll use our stored data and apply small adjustments
            // In a real app, you might want to use additional API calls to get this data

            // Calculate 1h change based on stored data or use a small random adjustment
            let priceChange1h = cryptoData.change1h;
            if (this.lastPrices[ourSymbol]) {
              const timeDiff = Date.now() - this.lastPrices[ourSymbol].timestamp;
              if (timeDiff < 3600000) { // Less than 1 hour
                // Scale the change proportionally to how much of an hour has passed
                const hourFraction = timeDiff / 3600000;
                const priceDiff = ((currentPrice - this.lastPrices[ourSymbol].price) / this.lastPrices[ourSymbol].price) * 100;
                priceChange1h = priceDiff / hourFraction;
              } else {
                // Apply a small adjustment to the existing 1h change
                priceChange1h += (Math.random() - 0.5) * 0.3;
              }
            }

            // Calculate 7d change (we don't get this directly from the ticker)
            // For demo purposes, we'll just slightly adjust the existing 7d change
            const change7dAdjustment = (Math.random() - 0.5) * 0.2; // Small random adjustment
            const newChange7d = cryptoData.change7d + change7dAdjustment;

            // Store last price to calculate our own changes if needed
            this.lastPrices[ourSymbol] = {
              price: currentPrice,
              timestamp: Date.now()
            };

            // Update chart data with the new price
            const updatedChartData = updateChartData(cryptoData.chartData, currentPrice);

            // Update the crypto data
            this.store.dispatch(updateCryptoData({
              id: cryptoData.id,
              updates: {
                price: currentPrice,
                change24h: priceChangePercent24h,
                change1h: parseFloat(priceChange1h.toFixed(2)),
                change7d: parseFloat(newChange7d.toFixed(2)),
                volume24h: volume24h,
                chartData: updatedChartData
              }
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
      this.lastError = error.message;
      this.emitStatusUpdate();
    }
  }

  handleError(error) {
    console.error('WebSocket error:', error);
    this.lastError = error.message || 'Unknown WebSocket error';
    this.connectionStatus = 'error';
    this.emitStatusUpdate();
    this.attemptReconnect();
  }

  handleClose(event) {
    console.log('WebSocket connection closed:', event.code, event.reason);
    this.isConnected = false;
    this.connectionStatus = 'disconnected';

    // Clear ping interval
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    // Add reason to lastError if available
    if (event.reason) {
      this.lastError = `Connection closed: ${event.reason} (${event.code})`;
    } else if (event.code !== 1000) { // 1000 is normal closure
      this.lastError = `Connection closed with code: ${event.code}`;
    }

    this.emitStatusUpdate();
    this.attemptReconnect();
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

      this.connectionStatus = 'reconnecting';
      this.emitStatusUpdate();

      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, 5000); // Wait 5 seconds before reconnecting
    } else {
      console.error('Max reconnect attempts reached. Please refresh the page.');
      this.connectionStatus = 'failed';
      this.lastError = 'Max reconnect attempts reached. Please refresh the page.';
      this.emitStatusUpdate();
    }
  }

  disconnect() {
    if (this.socket) {
      // Clear ping interval
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }

      // Clear reconnect timeout
      clearTimeout(this.reconnectTimeout);

      // Close socket if it's open
      if (this.socket.readyState === WebSocket.OPEN ||
          this.socket.readyState === WebSocket.CONNECTING) {
        this.socket.close(1000, "Disconnected by user");
      }

      this.isConnected = false;
      this.connectionStatus = 'disconnected';
      this.lastError = null;
      this.emitStatusUpdate();
      console.log('Disconnected from Binance WebSocket');
    }
  }

  // Get current connection status
  getStatus() {
    return {
      status: this.connectionStatus,
      error: this.lastError,
      messageCount: this.messageCount,
      lastUpdateTime: this.lastUpdateTime,
      reconnectAttempts: this.reconnectAttempts,
      isConnected: this.isConnected
    };
  }
}

export default BinanceWebSocket;
