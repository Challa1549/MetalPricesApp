# Metal Prices App 📈

A React Native application developed with Expo that displays live simulated prices of precious metals (Gold, Silver, Platinum, Palladium) mimicking a premium real-world financial product experience.

## Features ✨
- **Live Simulated Data**: Utilizes a robust Mock API with independent loading times and realistic simulated price volatility.
- **Beautiful UI**: Modern, human-centered dark-mode aesthetics using high-quality Unsplash image backgrounds and `expo-linear-gradient`.
- **Fluid Animations**: Smooth screen transitions and interactive card press animations built with `react-native-reanimated`.
- **Independent Loading States**: Each metal card handles its own data fetching, loading spinners, and error retries seamlessly.
- **Detailed Analytics**: Deep dive into daily trends, open/close predictions, and timestamps per asset on a dedicated Details Screen.

## Getting Started 🚀

### Prerequisites
- Node.js installed
- Expo Go app installed on your physical device (iOS/Android), or an iOS Simulator / Android Emulator running locally.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Scan the QR code shown in your terminal using your iOS/Android camera with the Expo Go app.

## Project Structure 📁
- `src/components`: Reusable UI elements, like the `MetalCard`.
- `src/screens`: Top-level navigations (`HomeScreen`, `DetailsScreen`).
- `src/services`: The Mock API (`api.js`) featuring independent fetching constraints and deliberate delays for accurate simulation.
- `src/navigation`: Application routing built with React Navigation.

