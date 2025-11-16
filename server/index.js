const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production'
    ? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : false)
    : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve SIPml5 library files
app.use('/sipml5', express.static(path.join(__dirname, '..')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WebPhone server is running' });
});

// Configuration endpoint
app.get('/api/config', (req, res) => {
  res.json({
    websocket_proxy_url: process.env.WEBSOCKET_PROXY_URL || null,
    sip_outbound_proxy_url: process.env.SIP_OUTBOUND_PROXY_URL || null,
    ice_servers: process.env.ICE_SERVERS || null
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start server
const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 WebPhone Server Started`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
  if (NODE_ENV === 'development') {
    console.log(`🔗 Frontend: http://localhost:3000`);
    console.log(`🔗 Backend: http://localhost:${PORT}`);
  }
  console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown(signal) {
  console.log(`\n⚠️  Received ${signal}. Starting graceful shutdown...`);

  server.close(() => {
    console.log('✅ Server closed. All connections terminated.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⛔ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
