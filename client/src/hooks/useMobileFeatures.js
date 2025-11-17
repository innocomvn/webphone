import React, { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

export const useMobileFeatures = () => {
  const isMobile = Capacitor.isNativePlatform();
  const platform = Capacitor.getPlatform();

  useEffect(() => {
    if (!isMobile) return;

    // Initialize mobile features
    initializeMobile();

    // Setup listeners
    const setupListeners = async () => {
      // App state change listener
      CapApp.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active:', isActive);
        if (isActive) {
          // App came to foreground
          console.log('App is now active');
        } else {
          // App went to background
          console.log('App is now in background');
        }
      });

      // Network status listener
      Network.addListener('networkStatusChange', status => {
        console.log('Network status changed', status);
        if (!status.connected) {
          // Handle offline state
          console.log('Device is offline');
        } else {
          console.log('Device is online');
        }
      });

      // Back button listener (Android)
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          CapApp.exitApp();
        } else {
          window.history.back();
        }
      });
    };

    setupListeners();

    // Cleanup
    return () => {
      CapApp.removeAllListeners();
      Network.removeAllListeners();
    };
  }, [isMobile]);

  const initializeMobile = async () => {
    try {
      // Set status bar style
      if (platform === 'ios' || platform === 'android') {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#667eea' });
      }

      // Hide splash screen after app is ready
      await SplashScreen.hide();

      console.log('Mobile features initialized');
    } catch (error) {
      console.error('Error initializing mobile features:', error);
    }
  };

  const checkNetworkStatus = async () => {
    try {
      const status = await Network.getStatus();
      return status.connected;
    } catch (error) {
      console.error('Error checking network:', error);
      return true; // Assume online if check fails
    }
  };

  const exitApp = () => {
    if (isMobile && platform === 'android') {
      CapApp.exitApp();
    }
  };

  return {
    isMobile,
    platform,
    checkNetworkStatus,
    exitApp
  };
};

export default useMobileFeatures;
