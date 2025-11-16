# WebPhone - Quick Setup Guide

## 🚀 Quick Start (3 bước)

### Bước 1: Cài đặt Dependencies

```bash
# Cài đặt tất cả dependencies (server + client)
npm run install-all
```

Hoặc cài thủ công:
```bash
# Cài server dependencies
npm install

# Cài client dependencies
cd client
npm install
cd ..
```

### Bước 2: Chạy ứng dụng

**Development Mode** (khuyến nghị cho phát triển):

```bash
# Cần 2 terminal:

# Terminal 1 - Backend Server
npm run server

# Terminal 2 - React Client
cd client
npm start
```

Hoặc chạy cả hai cùng lúc:
```bash
npm run dev
```

**Production Mode**:

```bash
# Build React app
npm run build

# Chạy production server
npm start
```

### Bước 3: Mở trình duyệt

- Development: http://localhost:3000
- Production: http://localhost:5000

## ⚙️ Cấu hình (Optional)

### Tạo file .env

```bash
cp .env.example .env
```

Sửa file `.env` nếu cần:
```env
PORT=5000
NODE_ENV=development
```

## 📱 Sử dụng WebPhone

### 1. Đăng ký tài khoản SIP miễn phí

Chọn một trong các nhà cung cấp sau:

**Antisip** (khuyến nghị):
- Website: https://www.antisip.com/
- Đăng ký miễn phí
- Hỗ trợ WebRTC tốt

**SIP2SIP**:
- Website: https://sip2sip.info/
- Đăng ký miễn phí
- Config:
  ```
  Realm: sip2sip.info
  WebSocket Proxy: wss://edge.sipthor.net:10443
  ```

**Linphone**:
- Website: https://www.linphone.org/
- Đăng ký miễn phí

### 2. Đăng nhập WebPhone

Mở ứng dụng và điền thông tin:

```
Display Name: Tên của bạn
Private Identity: username (ví dụ: user123)
Public Identity: sip:username@domain.com
Password: mật khẩu của bạn
Realm: domain.com (ví dụ: antisip.com)
```

**Advanced Settings** (nếu cần):
- WebSocket Proxy URL: wss://domain.com:port
- Outbound Proxy URL: (để trống nếu không cần)
- ICE Servers: (để trống hoặc dùng Google STUN)

### 3. Gọi điện

1. Nhập số điện thoại hoặc SIP URI (ví dụ: `sip:friend@antisip.com`)
2. Chọn/bỏ "Video Call" checkbox
3. Click **Call**

### 4. Nhận cuộc gọi

- Khi có cuộc gọi đến, click **Answer** để trả lời
- Click **Reject** để từ chối

### 5. Điều khiển trong cuộc gọi

- **Mute/Unmute**: Tắt/bật micro
- **Hold/Resume**: Giữ máy/Tiếp tục
- **Transfer**: Chuyển cuộc gọi
- **Keypad**: Bàn phím DTMF
- **Hang Up**: Kết thúc cuộc gọi

## 🔧 Troubleshooting

### Lỗi: Cannot find module

```bash
# Xóa và cài lại
npm run clean
npm run install-all
```

### Lỗi: Port đã được sử dụng

Đổi port trong `.env`:
```env
PORT=5001
```

### Lỗi: Registration failed

1. Kiểm tra thông tin đăng nhập
2. Thử thêm WebSocket Proxy URL (xem config từ nhà cung cấp)
3. Kiểm tra kết nối internet
4. Xem console log (F12) để biết chi tiết

### Không có âm thanh/video

1. Cho phép truy cập micro/camera khi trình duyệt hỏi
2. Kiểm tra thiết bị audio/video
3. Thử trình duyệt khác (khuyến nghị Chrome)
4. Kiểm tra firewall

### Cuộc gọi không kết nối

1. Đảm bảo cả 2 bên đã đăng ký thành công
2. Kiểm tra số điện thoại/SIP URI đúng format
3. Thử thêm STUN server:
   ```json
   [{"urls":"stun:stun.l.google.com:19302"}]
   ```

## 📚 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm start` | Chạy production server |
| `npm run server` | Chạy dev server (backend) |
| `npm run client` | Chạy React dev server |
| `npm run dev` | Chạy cả server và client |
| `npm run build` | Build React app |
| `npm run install-all` | Cài đặt tất cả dependencies |
| `npm run setup` | Setup đầy đủ (install + copy assets) |
| `npm run copy-assets` | Copy SIPml files vào client |
| `npm run clean` | Xóa node_modules và build |

## 🌐 Trình duyệt được hỗ trợ

✅ **Hoàn toàn hỗ trợ:**
- Google Chrome (khuyến nghị)
- Microsoft Edge
- Mozilla Firefox
- Safari (macOS/iOS)
- Opera

⚠️ **Yêu cầu:**
- WebRTC support
- WebSocket support
- getUserMedia API

## 📖 Tài liệu đầy đủ

Xem file `README_WEBPHONE.md` để biết thêm chi tiết.

## 🆘 Cần trợ giúp?

1. Kiểm tra console log (F12)
2. Xem phần Troubleshooting
3. Đọc README_WEBPHONE.md
4. Kiểm tra cấu hình SIP server

## 🎯 Test nhanh

Để test nhanh, dùng 2 tài khoản SIP khác nhau:
1. Mở 2 tab/browser
2. Đăng nhập 2 tài khoản khác nhau
3. Gọi từ tài khoản này sang tài khoản kia
4. Kiểm tra audio/video

---

**Chúc bạn sử dụng WebPhone thành công! 🎉**
