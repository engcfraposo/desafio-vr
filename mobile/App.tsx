import Routes from './src/routes';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { Provider } from 'react-redux';
import {
  PTSansCaption_400Regular,
  PTSansCaption_700Bold,
  useFonts,
} from '@expo-google-fonts/pt-sans-caption';
import SplashScreen from './src/pages/SplashScreen';
import { useEffect, useState } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    PTSansCaption_400Regular,
    PTSansCaption_700Bold,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000); 
  }, []);

  if (!fontsLoaded || showSplash) return <SplashScreen />;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
