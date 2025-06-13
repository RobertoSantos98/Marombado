import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/pages/splashScreen';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import Navigation from './src/pages/navigation';

export default function App() {

  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Splash de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? <SplashScreen /> : <Navigation /> }
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

