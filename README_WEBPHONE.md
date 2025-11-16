# WebPhone - Complete SIP Client

A modern, full-featured WebPhone application built with React frontend and Node.js Express backend, utilizing SIPml5 for WebRTC/SIP functionality.

## Features

### Core Functionality
- ✅ **SIP Registration** - Connect to any SIP server
- ✅ **Audio/Video Calls** - Make and receive calls with video support
- ✅ **Call Management**
  - Answer/Reject incoming calls
  - Hold/Resume calls
  - Mute/Unmute audio
  - Call transfer
  - Hang up
- ✅ **DTMF Support** - Dialpad for sending DTMF tones
- ✅ **Real-time Status** - Connection and call status indicators
- ✅ **Persistent Settings** - Saved credentials in localStorage
- ✅ **No Interruptions** - Proper state management prevents call drops

### Technical Features
- React 18 with Hooks
- Custom useSIP hook for SIP functionality
- Responsive design (mobile-friendly)
- Modern UI with gradient themes
- WebRTC support via SIPml5
- WebSocket transport for SIP signaling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- SIP account (see "Getting a SIP Account" section)

## Installation

### 1. Clone and Install Dependencies

```bash
# Navigate to webphone directory
cd /home/user/webphone

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Configuration (Optional)

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development

# Optional: Pre-configure SIP settings
WEBSOCKET_PROXY_URL=
SIP_OUTBOUND_PROXY_URL=
ICE_SERVERS=
```

## Running the Application

### Development Mode

Run both server and client in development mode:

```bash
# Option 1: Run both together (if you have concurrently installed)
npm run dev

# Option 2: Run separately in different terminals

# Terminal 1 - Backend Server
npm run server

# Terminal 2 - React Client
cd client
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Production Mode

```bash
# Build the React app
npm run build

# Start the production server
npm start
```

The application will be available at `http://localhost:5000`

## Usage Guide

### 1. Registration

1. Open the application in your browser
2. Fill in the registration form:
   - **Display Name**: Your name (optional)
   - **Private Identity**: Your SIP username (e.g., `user123`)
   - **Public Identity**: Your SIP URI (e.g., `sip:user123@domain.com`)
   - **Password**: Your SIP password
   - **Realm**: Your SIP domain (e.g., `domain.com`)

3. (Optional) Click "Advanced Settings" to configure:
   - WebSocket Proxy URL (e.g., `wss://domain.com:443`)
   - Outbound Proxy URL
   - ICE Servers for STUN/TURN

4. Click **Register** to connect

### 2. Making a Call

1. After successful registration, enter the phone number or SIP URI
2. Toggle "Video Call" checkbox if you want video
3. Click the **Call** button
4. Wait for the other party to answer

### 3. Receiving a Call

1. When an incoming call arrives, you'll see the caller's identity
2. Click **Answer** to accept the call
3. Click **Reject** to decline the call

### 4. During a Call

Available controls:
- **Mute/Unmute**: Toggle your microphone
- **Hold/Resume**: Put the call on hold
- **Transfer**: Transfer the call to another number
- **Keypad**: Open dialpad for DTMF tones
- **Hang Up**: End the call

### 5. Logout

Click the **Logout** button to unregister from the SIP server

## Getting a SIP Account

You'll need a SIP account to use this webphone. Here are some free options:

### Free SIP Providers
- [Antisip](https://www.antisip.com/) - Free SIP accounts
- [Linphone](https://www.linphone.org/) - Free SIP service
- [SIP2SIP](https://sip2sip.info/) - Free SIP accounts

### Example Configuration

For **sip2sip.info**:
```
Display Name: Your Name
Private Identity: yourusername
Public Identity: sip:yourusername@sip2sip.info
Password: yourpassword
Realm: sip2sip.info
WebSocket Proxy: wss://edge.sipthor.net:10443
```

## Browser Compatibility

### Fully Supported
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari (macOS/iOS)
- ✅ Opera

### Requirements
- WebRTC support
- WebSocket support
- getUserMedia API (for audio/video)

## Troubleshooting

### Common Issues

#### 1. Registration Fails
- Verify your SIP credentials are correct
- Check if WebSocket Proxy URL is required by your provider
- Ensure your firewall allows WebSocket connections
- Check browser console for error messages

#### 2. No Audio/Video
- Grant browser permissions for microphone and camera
- Check if your device has working audio/video hardware
- Verify WebRTC is supported in your browser
- Check if media devices are not being used by another application

#### 3. Call Doesn't Connect
- Ensure both parties are properly registered
- Verify the phone number/SIP URI is correct
- Check network connectivity
- Try using ICE servers (STUN/TURN) in advanced settings

#### 4. One-Way Audio
- Check firewall settings (may need to allow UDP traffic)
- Configure STUN/TURN servers in advanced settings
- Verify NAT traversal is working properly

### Debug Mode

To enable debug logging, open browser console (F12) and check for SIPml5 logs.

## Project Structure

```
webphone/
├── server/
│   └── index.js              # Express backend server
├── client/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── WebPhone.js   # Main component
│   │   │   ├── Registration.js
│   │   │   ├── CallControls.js
│   │   │   ├── VideoDisplay.js
│   │   │   ├── Dialpad.js
│   │   │   └── *.css         # Component styles
│   │   ├── hooks/
│   │   │   └── useSIP.js     # Custom SIP hook
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── SIPml-api.js              # SIPml5 library loader
├── SIPml.js                  # SIPml5 core library
├── sounds/                   # Audio files for ringtones
├── package.json
└── .env.example
```

## API Endpoints

### GET /api/health
Health check endpoint
```json
{
  "status": "ok",
  "message": "WebPhone server is running"
}
```

### GET /api/config
Get server configuration
```json
{
  "websocket_proxy_url": "wss://...",
  "sip_outbound_proxy_url": "udp://...",
  "ice_servers": "[...]"
}
```

## Security Considerations

1. **HTTPS Required**: For production, always use HTTPS to enable WebRTC features
2. **Credentials Storage**: Credentials are stored in browser's localStorage
3. **WebSocket Security**: Use WSS (WebSocket Secure) for SIP signaling
4. **Media Encryption**: WebRTC uses DTLS-SRTP for media encryption

## Performance Optimization

### State Management
- Uses React hooks for efficient state updates
- Refs for media elements to prevent re-renders
- Callbacks wrapped in `useCallback` to prevent unnecessary re-renders

### Call Stability
- Proper cleanup of media streams on unmount
- Event listeners properly attached and detached
- No state updates during active calls that could cause interruptions

## Development

### Adding New Features

1. **New Call Feature**: Add to `useSIP.js` hook
2. **UI Component**: Create in `client/src/components/`
3. **Styling**: Add corresponding CSS file
4. **Backend Endpoint**: Add to `server/index.js`

### Testing

```bash
# Test backend server
npm run server

# Test React app
cd client
npm test
```

## License

This project uses SIPml5 which is licensed under BSD License.

## Support

For issues and questions:
- Check the troubleshooting section
- Review browser console for errors
- Verify SIP server configuration
- Test with different browsers

## Credits

- **SIPml5**: Doubango Telecom - WebRTC SIP client library
- **React**: Facebook - UI framework
- **Express**: Node.js web framework

## Version

Current Version: **1.0.0**

---

**Built with ❤️ using React, Node.js, and SIPml5**
