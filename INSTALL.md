# WebPhone - Hướng dẫn cài đặt chi tiết

## 📋 Mục lục

1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cài đặt từ Source](#cài-đặt-từ-source)
3. [Cài đặt với Docker](#cài-đặt-với-docker)
4. [Cấu hình](#cấu-hình)
5. [Chạy ứng dụng](#chạy-ứng-dụng)
6. [Deployment](#deployment)

## Yêu cầu hệ thống

### Phần mềm cần thiết:

- **Node.js**: v14.0.0 trở lên (khuyến nghị v18 LTS)
- **npm**: v6.0.0 trở lên (hoặc yarn)
- **Git**: Để clone repository
- **Trình duyệt**: Chrome, Firefox, Edge, Safari (với WebRTC support)

### Kiểm tra phiên bản:

```bash
node --version   # v18.x.x
npm --version    # 9.x.x
git --version    # 2.x.x
```

### Cài đặt Node.js (nếu chưa có):

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS:**
```bash
brew install node@18
```

**Windows:**
- Download từ: https://nodejs.org/

## Cài đặt từ Source

### Bước 1: Clone Repository

```bash
git clone https://github.com/yourusername/webphone.git
cd webphone
```

Hoặc download ZIP và giải nén.

### Bước 2: Cài đặt Dependencies

**Cách 1: Tự động (khuyến nghị)**
```bash
npm run install-all
```

**Cách 2: Thủ công**
```bash
# Server dependencies
npm install

# Client dependencies
cd client
npm install
cd ..
```

### Bước 3: Copy Assets

```bash
npm run copy-assets
```

Script này sẽ copy:
- SIPml-api.js và SIPml.js vào client/public/
- Sounds files vào client/public/sounds/
- Source files cần thiết

### Bước 4: Kiểm tra cài đặt

```bash
# Kiểm tra structure
ls -la client/public/
# Phải thấy: SIPml-api.js, SIPml.js, sounds/

ls -la node_modules/
# Phải có các packages: express, cors, dotenv, ws

ls -la client/node_modules/
# Phải có: react, react-dom, react-scripts
```

## Cài đặt với Docker

### Yêu cầu:
- Docker 20.10+
- Docker Compose 2.0+

### Cài đặt nhanh:

```bash
# Clone repository
git clone https://github.com/yourusername/webphone.git
cd webphone

# Build và chạy
docker-compose up -d

# Kiểm tra
docker ps
curl http://localhost:5000/api/health
```

Xem chi tiết tại: [DOCKER.md](DOCKER.md)

## Cấu hình

### 1. Environment Variables (Optional)

Tạo file `.env` từ template:

```bash
cp .env.example .env
```

Sửa file `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# SIP Configuration (optional)
WEBSOCKET_PROXY_URL=
SIP_OUTBOUND_PROXY_URL=
ICE_SERVERS=
```

### 2. Advanced SIP Settings

Các settings này có thể được cấu hình qua UI hoặc environment variables:

**WebSocket Proxy URL:**
```
wss://your-sip-server.com:443
```

**ICE Servers (STUN/TURN):**
```json
[
  {"urls":"stun:stun.l.google.com:19302"},
  {"urls":"turn:your-turn-server.com","username":"user","credential":"pass"}
]
```

## Chạy ứng dụng

### Development Mode

**Option 1: Chạy cả Server và Client cùng lúc**
```bash
npm run dev
```

**Option 2: Chạy riêng biệt**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client
npm start
```

**Option 3: Sử dụng PM2 (khuyến nghị cho development)**
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server/index.js --name webphone-server

# Start client (trong terminal khác)
cd client && npm start

# Monitor
pm2 monit

# Stop
pm2 stop webphone-server
```

### Production Mode

```bash
# 1. Build React app
npm run build

# 2. Start production server
npm start

# Hoặc với PM2
pm2 start server/index.js --name webphone -i max
pm2 save
pm2 startup
```

### Ports

- **Development Frontend**: http://localhost:3000
- **Development Backend**: http://localhost:5000
- **Production**: http://localhost:5000

## Deployment

### 1. Deploy lên VPS (Ubuntu/Debian)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Clone và setup
git clone https://github.com/yourusername/webphone.git
cd webphone
npm run install-all
npm run copy-assets
npm run build

# 5. Start with PM2
pm2 start server/index.js --name webphone
pm2 save
pm2 startup

# 6. Configure Nginx (optional)
sudo apt install nginx
sudo nano /etc/nginx/sites-available/webphone
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/webphone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL with Let's Encrypt (recommended)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. Deploy với Docker

```bash
# Build
docker build -t webphone:latest .

# Run
docker run -d \
  --name webphone \
  -p 5000:5000 \
  --restart unless-stopped \
  webphone:latest

# Or use docker-compose
docker-compose up -d
```

### 3. Deploy lên Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-webphone-app

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main

# Open
heroku open
```

**Procfile** (tạo file này):
```
web: node server/index.js
```

### 4. Deploy lên Railway/Render

1. Connect GitHub repository
2. Set build command: `npm run install-all && npm run build`
3. Set start command: `npm start`
4. Deploy

## Kiểm tra sau khi cài đặt

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "WebPhone server is running"
}
```

### 2. Test UI

1. Mở http://localhost:5000 (production) hoặc http://localhost:3000 (dev)
2. Kiểm tra console (F12) - không có lỗi
3. Thử đăng ký SIP account
4. Thử gọi điện

### 3. Test WebRTC

1. Grant microphone/camera permissions
2. Check if video preview appears
3. Make a test call

## Troubleshooting

### Dependencies không cài được

```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json

# Cài lại
npm run install-all
```

### Port bị chiếm

```bash
# Check what's using port
lsof -i :5000    # macOS/Linux
netstat -ano | findstr :5000    # Windows

# Kill process
kill -9 <PID>    # macOS/Linux
taskkill /PID <PID> /F    # Windows

# Or change port in .env
PORT=5001
```

### SIPml không load được

```bash
# Re-copy assets
npm run copy-assets

# Check files exist
ls -la client/public/SIPml-api.js
ls -la client/public/sounds/
```

### Build fails

```bash
# Increase memory
export NODE_OPTIONS=--max_old_space_size=4096

# Build again
npm run build
```

## Update ứng dụng

```bash
# Pull latest code
git pull origin main

# Update dependencies
npm run install-all

# Copy new assets
npm run copy-assets

# Rebuild
npm run build

# Restart
pm2 restart webphone
# Or for Docker
docker-compose down && docker-compose up -d --build
```

## Uninstall

```bash
# Stop services
pm2 stop webphone
pm2 delete webphone

# Remove files
cd ..
rm -rf webphone

# Remove global packages (if needed)
npm uninstall -g pm2
```

## Hỗ trợ

- 📖 Documentation: [README_WEBPHONE.md](README_WEBPHONE.md)
- 🚀 Quick Start: [SETUP.md](SETUP.md)
- 🐳 Docker: [DOCKER.md](DOCKER.md)
- 🐛 Issues: GitHub Issues

---

**Chúc bạn cài đặt thành công! 🎉**
