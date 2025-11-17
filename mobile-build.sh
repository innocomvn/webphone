#!/bin/bash

# WebPhone Mobile Build Script
# This script builds the mobile app for Android and iOS

set -e

echo "=================================================="
echo "🚀 WebPhone Mobile Build Script"
echo "=================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running in client directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the client directory"
    exit 1
fi

# Parse command line arguments
PLATFORM="$1"
BUILD_TYPE="${2:-debug}"

if [ -z "$PLATFORM" ]; then
    echo "Usage: ./mobile-build.sh [android|ios|both] [debug|release]"
    echo ""
    echo "Examples:"
    echo "  ./mobile-build.sh android         # Build Android debug"
    echo "  ./mobile-build.sh ios release     # Build iOS release"
    echo "  ./mobile-build.sh both            # Build both platforms (debug)"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
fi

# Build web app
print_info "Building React web app..."
npm run build

if [ ! -d "build" ]; then
    print_error "Build failed! build directory not found."
    exit 1
fi

print_info "✅ Web app built successfully"

# Sync with Capacitor
print_info "Syncing with Capacitor..."
npx cap sync

# Function to build Android
build_android() {
    print_info "Building Android app ($BUILD_TYPE)..."

    if [ ! -d "android" ]; then
        print_warning "Android platform not added. Adding now..."
        npx cap add android
    fi

    cd android

    if [ "$BUILD_TYPE" = "release" ]; then
        print_info "Building Android Release APK..."
        ./gradlew assembleRelease
        print_info "✅ Android Release APK built: android/app/build/outputs/apk/release/app-release.apk"
    else
        print_info "Building Android Debug APK..."
        ./gradlew assembleDebug
        print_info "✅ Android Debug APK built: android/app/build/outputs/apk/debug/app-debug.apk"
    fi

    cd ..
}

# Function to build iOS
build_ios() {
    print_info "Building iOS app ($BUILD_TYPE)..."

    if [ ! -d "ios" ]; then
        print_warning "iOS platform not added. Adding now..."
        npx cap add ios
    fi

    if [ "$(uname)" != "Darwin" ]; then
        print_error "iOS build requires macOS"
        exit 1
    fi

    print_info "Opening Xcode..."
    print_info "Please build the app in Xcode manually"
    npx cap open ios
}

# Build based on platform
case "$PLATFORM" in
    android)
        build_android
        ;;
    ios)
        build_ios
        ;;
    both)
        build_android
        build_ios
        ;;
    *)
        print_error "Invalid platform: $PLATFORM"
        echo "Valid options: android, ios, both"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo "✅ Build completed successfully!"
echo "=================================================="
echo ""
print_info "Next steps:"
if [ "$PLATFORM" = "android" ] || [ "$PLATFORM" = "both" ]; then
    echo "  📱 Android: Install APK from android/app/build/outputs/apk/"
fi
if [ "$PLATFORM" = "ios" ] || [ "$PLATFORM" = "both" ]; then
    echo "  🍎 iOS: Build and run from Xcode"
fi
echo ""
