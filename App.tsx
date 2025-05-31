import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/pages/splashScreen';
import React, { useEffect, useState } from 'react';

import Navigation from './src/pages/navigation';

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000)
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <SplashScreen /> : <Navigation /> }
      <StatusBar style="auto" />
    </>
  );
}

