const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`WebPhone server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
