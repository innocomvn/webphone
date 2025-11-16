# WebPhone - Docker Deployment

## 🐳 Docker Quick Start

### Option 1: Docker Compose (Khuyến nghị)

```bash
# Build và chạy
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down
```

Ứng dụng sẽ chạy tại: http://localhost:5000

### Option 2: Docker Build & Run

```bash
# Build image
docker build -t webphone:latest .

# Chạy container
docker run -d \
  --name webphone \
  -p 5000:5000 \
  -e NODE_ENV=production \
  webphone:latest

# Xem logs
docker logs -f webphone

# Dừng và xóa
docker stop webphone
docker rm webphone
```

## 📋 Yêu cầu

- Docker 20.10+
- Docker Compose 2.0+ (nếu dùng docker-compose)

## 🔧 Configuration

### Environment Variables

Tạo file `.env` để override settings:

```env
PORT=5000
NODE_ENV=production
```

Sau đó update `docker-compose.yml`:

```yaml
services:
  webphone:
    env_file:
      - .env
```

### Custom Port

Để chạy trên port khác (ví dụ 8080):

**Docker Compose:**
```yaml
ports:
  - "8080:5000"
```

**Docker Run:**
```bash
docker run -d -p 8080:5000 webphone:latest
```

## 🚀 Production Deployment

### 1. Build Production Image

```bash
docker build -t webphone:1.0.0 .
docker tag webphone:1.0.0 webphone:latest
```

### 2. Save & Load Image (nếu deploy lên server khác)

```bash
# Save
docker save webphone:latest > webphone.tar

# Copy webphone.tar lên server

# Load trên server
docker load < webphone.tar
```

### 3. Deploy with Docker Compose

```bash
# Trên production server
docker-compose up -d

# Auto-restart on reboot
docker update --restart unless-stopped webphone
```

## 📊 Monitoring

### Health Check

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:5000/api/health
```

### View Logs

```bash
# Real-time logs
docker logs -f webphone

# Last 100 lines
docker logs --tail 100 webphone
```

### Resource Usage

```bash
# Container stats
docker stats webphone
```

## 🔄 Updates

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## 🧹 Cleanup

```bash
# Stop và xóa containers
docker-compose down

# Xóa images
docker rmi webphone:latest

# Xóa tất cả (bao gồm volumes)
docker-compose down -v --rmi all
```

## 🔐 Security Best Practices

1. **Không expose port trực tiếp ra internet** - Dùng nginx/traefik làm reverse proxy
2. **Enable HTTPS** - Dùng Let's Encrypt certificates
3. **Limit resources** - Set memory và CPU limits
4. **Regular updates** - Update base image thường xuyên

### Example with Resource Limits:

```yaml
services:
  webphone:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          memory: 256M
```

## 🌐 Nginx Reverse Proxy (Optional)

Để dùng với HTTPS và domain name:

```nginx
server {
    listen 80;
    server_name webphone.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name webphone.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🐛 Troubleshooting

### Container không start

```bash
# Check logs
docker logs webphone

# Inspect container
docker inspect webphone
```

### Port conflict

```bash
# Check what's using port 5000
lsof -i :5000

# Use different port
docker run -p 5001:5000 webphone:latest
```

### Build fails

```bash
# Clean build
docker system prune -a
docker build --no-cache -t webphone:latest .
```

## 📝 Multi-Stage Build Benefits

Image này sử dụng multi-stage build để:
- ✅ Giảm kích thước image (chỉ chứa production dependencies)
- ✅ Tăng security (không chứa dev tools)
- ✅ Build faster với layer caching
- ✅ Production-ready

## 🎯 Quick Commands Reference

```bash
# Build
docker build -t webphone .

# Run
docker run -d -p 5000:5000 webphone

# Logs
docker logs -f webphone

# Stop
docker stop webphone

# Remove
docker rm webphone

# Shell access
docker exec -it webphone sh

# Rebuild
docker-compose up -d --build

# Scale (không áp dụng cho app này do stateful)
docker-compose up -d --scale webphone=3
```

---

**Happy Dockerizing! 🐳**
