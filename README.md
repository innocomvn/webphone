# 📞 WebPhone - Complete SIP Client

![WebPhone](https://img.shields.io/badge/WebPhone-v1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![License](https://img.shields.io/badge/license-BSD-orange.svg)

> **Ứng dụng WebPhone hoàn chỉnh với React và Node.js** - Gọi điện video/audio qua SIP/WebRTC trực tiếp trên trình duyệt và mobile (Android/iOS), không cần cài đặt plugin.

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🐳 Docker](#-docker) • [📱 Mobile App](#-mobile-app) • [🌟 Features](#-features)

---

## ✨ Tính năng nổi bật

- 🎥 **Video/Audio Calls** - Gọi điện với video và âm thanh chất lượng cao
- 📱 **Responsive Design** - Hoạt động mượt mà trên mọi thiết bị
- 🔐 **Secure** - Mã hóa end-to-end với WebRTC DTLS-SRTP
- 🌐 **Cross-browser** - Hỗ trợ Chrome, Firefox, Safari, Edge
- 🎛️ **Full Controls** - Hold, Mute, Transfer, DTMF keypad
- 💾 **Persistent Settings** - Tự động lưu cấu hình SIP
- ⚡ **No Interruption** - State management tối ưu, không bị ngắt cuộc gọi
- 🐳 **Docker Ready** - Deploy nhanh chóng với Docker
- 📱 **Mobile Apps** - Native Android & iOS apps với Capacitor

## 🚀 Quick Start

### Cách 1: NPM (Khuyến nghị cho Development)

```bash
# Clone repository
git clone https://github.com/innocomvn/webphone.git
cd webphone

# Cài đặt tất cả dependencies
npm run install-all

# Chạy ứng dụng
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

### Cách 2: Docker (Khuyến nghị cho Production)

```bash
# Clone repository
git clone https://github.com/innocomvn/webphone.git
cd webphone

# Chạy với Docker Compose
docker-compose up -d
```

Mở trình duyệt: **http://localhost:5000**

### Cách 3: One-liner Install

```bash
git clone https://github.com/innocomvn/webphone.git && cd webphone && npm run setup && npm run dev
```

## 📖 Documentation

| Document | Mô tả | Link |
|----------|-------|------|
| **SETUP.md** | Hướng dẫn cài đặt nhanh (Tiếng Việt) | [📄 Xem](SETUP.md) |
| **INSTALL.md** | Hướng dẫn cài đặt chi tiết | [📄 Xem](INSTALL.md) |
| **DOCKER.md** | Deploy với Docker | [🐳 Xem](DOCKER.md) |
| **MOBILE.md** | Build Android & iOS apps | [📱 Xem](MOBILE.md) |
| **README_WEBPHONE.md** | Tài liệu đầy đủ (English) | [📄 Xem](README_WEBPHONE.md) |

## 🌟 Features

### Core Functionality
- ✅ **SIP Registration** - Kết nối với bất kỳ SIP server nào
- ✅ **Make Calls** - Gọi điện với video hoặc chỉ audio
- ✅ **Receive Calls** - Nhận cuộc gọi với ringtone
- ✅ **Call Control** - Answer, Reject, Hangup
- ✅ **Hold/Resume** - Giữ máy và tiếp tục cuộc gọi
- ✅ **Mute/Unmute** - Tắt/bật microphone
- ✅ **Call Transfer** - Chuyển cuộc gọi sang số khác
- ✅ **DTMF Tones** - Bàn phím số trong cuộc gọi

### Advanced Features
- 🎯 **Picture-in-Picture** - Video local/remote display
- 📊 **Real-time Status** - Trạng thái kết nối và cuộc gọi
- 💾 **Auto-save Settings** - Lưu credentials tự động
- 🔔 **Audio Alerts** - Ringtone và ringback tone
- ⚙️ **Advanced Config** - WebSocket proxy, ICE servers
- 🎨 **Modern UI** - Gradient theme, smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework với Hooks
- **Custom Hooks** - useSIP hook cho SIP logic
- **CSS3** - Modern styling với animations
- **SIPml5** - WebRTC/SIP library

### Backend
- **Node.js 18** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **WebSocket** - Real-time communication

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **PM2** - Process management (optional)

## 📦 Project Structure

```
webphone/
├── client/                 # React Frontend
│   ├── public/            # Static assets
│   │   ├── SIPml-api.js   # SIPml5 library
│   │   └── sounds/        # Audio files
│   └── src/
│       ├── components/    # React components
│       ├── hooks/         # Custom hooks
│       └── App.js         # Main app
├── server/                # Express Backend
│   └── index.js           # Server entry
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose config
└── package.json           # Dependencies
```

## 🎯 Usage

### 1. Đăng ký SIP Account (Miễn phí)

Bạn cần tài khoản SIP để sử dụng. Đăng ký miễn phí tại:
- **Antisip**: https://www.antisip.com/
- **SIP2SIP**: https://sip2sip.info/
- **Linphone**: https://www.linphone.org/

### 2. Đăng nhập WebPhone

Điền thông tin SIP:
```
Display Name: Tên của bạn
Private Identity: username
Public Identity: sip:username@domain.com
Password: your_password
Realm: domain.com
```

### 3. Gọi điện

- Nhập số điện thoại hoặc SIP URI
- Chọn "Video Call" nếu muốn video
- Click **Call**

## 🐳 Docker

### Quick Start

```bash
docker-compose up -d
```

### Custom Build

```bash
docker build -t webphone:latest .
docker run -d -p 5000:5000 webphone:latest
```

Chi tiết xem [DOCKER.md](DOCKER.md)

## 📱 Mobile App

WebPhone có thể chạy như **native mobile app** trên Android và iOS!

### Quick Build

```bash
cd client

# Build Android
npm install
npm run build:mobile
npx cap open android
# Build trong Android Studio

# Build iOS (macOS only)
npm run build:mobile
npx cap open ios
# Build trong Xcode
```

### Hoặc dùng build script

```bash
cd client
../mobile-build.sh android      # Build Android APK
../mobile-build.sh ios          # Open Xcode (macOS)
../mobile-build.sh both         # Build cả hai
```

Chi tiết xem [MOBILE.md](MOBILE.md)

### Mobile Features

- ✅ Native Android & iOS apps
- ✅ Camera & Microphone access
- ✅ Push notifications
- ✅ Background call handling
- ✅ Network detection
- ✅ Native status bar & splash screen
- ✅ Deep linking support
- ✅ Offline mode ready

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm 9+
- Modern browser (Chrome/Firefox/Safari/Edge)

### Install Dependencies

```bash
npm run install-all
```

### Run Development Server

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client && npm start
```

### Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Deploy to VPS

```bash
# Install dependencies
npm run install-all

# Build
npm run build

# Start with PM2
pm2 start ecosystem.config.js
```

### Deploy with Docker

```bash
docker-compose up -d
```

### Deploy to Heroku

```bash
heroku create your-app
git push heroku main
```

## 🔐 Security

- ✅ WebRTC DTLS-SRTP encryption
- ✅ HTTPS recommended for production
- ✅ Secure WebSocket (WSS) for SIP signaling
- ✅ Environment variables for sensitive config
- ✅ CORS configuration
- ✅ Security headers

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 80+ | ✅ Full Support |
| Firefox | 75+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 80+ | ✅ Full Support |
| Opera | 67+ | ✅ Full Support |

## 📊 Performance

- ⚡ React 18 with Hooks optimization
- ⚡ Lazy loading components
- ⚡ Optimized state management
- ⚡ No unnecessary re-renders
- ⚡ Docker multi-stage build (~150MB image)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the BSD License - see the [LICENSE](LICENSE) file for details.

SIPml5 library is also licensed under BSD License by Doubango Telecom.

## 🙏 Credits

- **SIPml5** - WebRTC SIP client library by [Doubango Telecom](https://www.doubango.org)
- **React** - UI framework by Facebook
- **Express** - Web framework for Node.js

## 📞 Support

- 📖 [Full Documentation](README_WEBPHONE.md)
- 🚀 [Quick Setup Guide](SETUP.md)
- 🐳 [Docker Guide](DOCKER.md)
- 💬 [GitHub Issues](https://github.com/innocomvn/webphone/issues)

## 🎓 Tutorials

1. **Beginner**: Follow [SETUP.md](SETUP.md) to get started
2. **Intermediate**: Read [INSTALL.md](INSTALL.md) for detailed setup
3. **Advanced**: Check [DOCKER.md](DOCKER.md) for containerization
4. **Expert**: See [README_WEBPHONE.md](README_WEBPHONE.md) for full API

## 🗺️ Roadmap

Future enhancements (not yet implemented):

- [ ] Unit and integration tests
- [ ] PWA support with offline mode
- [ ] Call recording functionality
- [ ] SIP messaging/chat
- [ ] Contact management
- [ ] Call history
- [ ] Multi-language support (i18n)
- [ ] Call analytics and statistics

## 📈 Version History

- **v1.0.0** (2024) - Initial release
  - React frontend with modern UI
  - Node.js Express backend
  - Full SIP/WebRTC functionality
  - Docker support
  - Comprehensive documentation

---

<div align="center">

**Built with ❤️ using React, Node.js, and SIPml5**

[⬆ Back to Top](#-webphone---complete-sip-client)

</div>
