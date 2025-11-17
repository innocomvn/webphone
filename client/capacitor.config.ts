import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.webphone.app',
  appName: 'WebPhone',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    hostname: 'app.webphone.local'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#667eea',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#667eea'
    },
    Camera: {
      permissions: {
        camera: 'Camera permission is required for video calls',
        photos: 'Photo library access is optional'
      }
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
