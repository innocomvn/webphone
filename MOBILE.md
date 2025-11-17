# 📱 WebPhone Mobile App

WebPhone mobile app cho **Android** và **iOS** sử dụng **Capacitor** - cho phép chạy React app như native mobile app.

## ✨ Tính năng Mobile

- 📱 **Native Android & iOS** - App thực sự, không phải web wrapper
- 🎥 **Camera & Microphone** - Native access cho video/audio calls
- 🔔 **Push Notifications** - Nhận thông báo cuộc gọi
- 📶 **Network Detection** - Tự động phát hiện online/offline
- 🔋 **Battery Optimized** - Tối ưu pin cho thiết bị di động
- 📲 **Deep Linking** - Mở app từ links (webphone://)
- 🎨 **Native UI** - Status bar, splash screen native
- ⚡ **Fast Performance** - Native rendering engine

## 🚀 Quick Start

### Yêu cầu

**Cho Android:**
- Node.js 18+
- Android Studio
- Java JDK 11+
- Android SDK

**Cho iOS:**
- macOS
- Xcode 14+
- CocoaPods
- iOS Simulator hoặc thiết bị iOS

### Cài đặt Dependencies

```bash
cd client
npm install
```

## 🔧 Build Mobile App

### Cách 1: Sử dụng Script (Khuyến nghị)

```bash
# Build Android Debug
cd client
../mobile-build.sh android

# Build Android Release
../mobile-build.sh android release

# Build iOS (chỉ trên macOS)
../mobile-build.sh ios

# Build cả hai
../mobile-build.sh both
```

### Cách 2: Manual Build

#### Android

```bash
cd client

# 1. Build React app
npm run build

# 2. Add Android platform (lần đầu)
npx cap add android

# 3. Sync code
npx cap sync

# 4. Open in Android Studio
npx cap open android

# 5. Build trong Android Studio:
# - Click "Build" > "Build Bundle(s) / APK(s)" > "Build APK(s)"
# - Hoặc chạy: ./gradlew assembleDebug (trong thư mục android/)
```

**Hoặc build bằng command line:**

```bash
cd client/android
./gradlew assembleDebug     # Debug APK
./gradlew assembleRelease   # Release APK
```

APK sẽ ở: `client/android/app/build/outputs/apk/`

#### iOS

```bash
cd client

# 1. Build React app
npm run build

# 2. Add iOS platform (lần đầu)
npx cap add ios

# 3. Sync code
npx cap sync

# 4. Open in Xcode
npx cap open ios

# 5. Build trong Xcode:
# - Select target device/simulator
# - Click Product > Build (⌘+B)
# - Click Product > Run (⌘+R)
```

## 📦 NPM Scripts

```bash
# Development
npm start                    # Web dev server
npm run build               # Build web app

# Capacitor
npm run cap:init            # Initialize Capacitor
npm run cap:add:android     # Add Android platform
npm run cap:add:ios         # Add iOS platform
npm run cap:sync            # Sync web code to native
npm run cap:copy            # Copy web assets only

# Mobile Build
npm run build:mobile        # Build web + sync
npm run android             # Build & open Android Studio
npm run ios                 # Build & open Xcode
```

## 🔐 Permissions

### Android (AndroidManifest.xml)

```xml
<!-- Camera & Microphone for calls -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Network -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<!-- Keep screen on during calls -->
<uses-permission android:name="android.permission.WAKE_LOCK" />

<!-- Bluetooth headsets -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>WebPhone needs camera access for video calls</string>

<key>NSMicrophoneUsageDescription</key>
<string>WebPhone needs microphone access for audio calls</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>WebPhone needs photo library access to save call screenshots</string>
```

## 🛠️ Development Workflow

### 1. Live Reload (Development)

```bash
# Terminal 1: Start React dev server
cd client
npm start

# Terminal 2: Run on device with live reload
npx cap run android --livereload
# hoặc
npx cap run ios --livereload
```

### 2. Test trên thiết bị thật

**Android:**
```bash
# Enable USB debugging trên device
# Connect via USB
adb devices                 # Check device connected

cd client
npm run build:mobile
cd android
./gradlew installDebug      # Install to device
```

**iOS:**
```bash
# Connect device
# Trust computer trên device
# Select device trong Xcode
# Click Run (⌘+R)
```

### 3. Debug

**Android:**
```bash
# View logs
adb logcat | grep Capacitor

# Chrome DevTools
# Open chrome://inspect trong Chrome browser
```

**iOS:**
```bash
# Safari Web Inspector
# Safari > Develop > [Your Device] > [App Name]
```

## 📱 App Configuration

File: `client/capacitor.config.ts`

```typescript
{
  appId: 'com.webphone.app',      // Bundle ID
  appName: 'WebPhone',             // App name
  webDir: 'build',                 // React build directory

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#667eea',
      // ...
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#667eea'
    }
  }
}
```

## 🎨 Customization

### App Icon

**Android:**
- Thay thế: `client/android/app/src/main/res/mipmap-*/ic_launcher.png`
- Sizes: hdpi (72x72), mdpi (48x48), xhdpi (96x96), xxhdpi (144x144), xxxhdpi (192x192)

**iOS:**
- Mở Xcode
- Assets.xcassets > AppIcon
- Drag & drop icons (sizes from 20x20 to 1024x1024)

### Splash Screen

**Android:**
- `client/android/app/src/main/res/drawable/splash.png`

**iOS:**
- Xcode > Assets.xcassets > Splash
- Hoặc sử dụng LaunchScreen.storyboard

### App Name

**Android:**
- `client/android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">WebPhone</string>
```

**iOS:**
- Xcode > Target > General > Display Name

## 🚀 Release Build

### Android Release

1. **Generate Keystore** (lần đầu):
```bash
keytool -genkey -v -keystore webphone.keystore -alias webphone -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure signing** trong `client/android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../webphone.keystore")
            storePassword "your-password"
            keyAlias "webphone"
            keyPassword "your-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. **Build Release APK**:
```bash
cd client/android
./gradlew assembleRelease
```

APK: `client/android/app/build/outputs/apk/release/app-release.apk`

4. **Build AAB for Play Store**:
```bash
./gradlew bundleRelease
```

AAB: `client/android/app/build/outputs/bundle/release/app-release.aab`

### iOS Release

1. **Configure signing** trong Xcode:
   - Select target > Signing & Capabilities
   - Team: Select your Apple Developer account
   - Signing Certificate: Distribution

2. **Archive**:
   - Product > Archive
   - Wait for build to complete

3. **Upload to App Store**:
   - Organizer > Archives > Distribute App
   - App Store Connect
   - Upload

## 📊 App Size

Estimated app sizes:

| Platform | Debug | Release (uncompressed) | Release (compressed) |
|----------|-------|------------------------|---------------------|
| Android APK | ~15MB | ~10MB | ~8MB |
| Android AAB | - | ~8MB | ~6MB |
| iOS IPA | ~20MB | ~15MB | ~12MB |

## 🔧 Troubleshooting

### Android

**Gradle build fails:**
```bash
cd client/android
./gradlew clean
./gradlew build
```

**SDK not found:**
- Set ANDROID_HOME environment variable
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**App crashes on launch:**
- Check logcat: `adb logcat | grep Capacitor`
- Verify permissions in AndroidManifest.xml

### iOS

**Pod install fails:**
```bash
cd client/ios/App
pod repo update
pod install
```

**Code signing error:**
- Xcode > Signing & Capabilities
- Select valid Team and Certificate

**App crashes:**
- Check console in Xcode
- Verify Info.plist permissions

## 📚 Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/)
- [iOS Developer Guide](https://developer.apple.com/documentation/)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)

## 🆘 Support

Gặp vấn đề? Check:
1. [MOBILE.md](MOBILE.md) - This file
2. [Capacitor Troubleshooting](https://capacitorjs.com/docs/troubleshooting)
3. [GitHub Issues](https://github.com/innocomvn/webphone/issues)

## 📝 Next Steps

Sau khi build xong:

1. **Test thoroughly** - Test trên nhiều devices
2. **Setup CI/CD** - Automate builds
3. **App Store** - Submit to Google Play / App Store
4. **Analytics** - Add Firebase Analytics
5. **Crash Reporting** - Add Sentry or Crashlytics
6. **Updates** - Setup OTA updates

---

**Happy Mobile Development! 📱**
