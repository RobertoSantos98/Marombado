import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/pages/splashScreen';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Navigation from './src/pages/navigation';
import TreinoDetails from './src/pages/TreinoDetails';

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000)
    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? <SplashScreen /> : <Navigation /> }
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

