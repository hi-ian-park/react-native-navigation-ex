import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import Root from './navigation/Root';
import { theme } from './styles/theme';

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
  };
  const colorScheme = useColorScheme();

  if (!ready)
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.warn} />;

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if ((error.status !== 403) & (error.status !== 404)) {
            // send error to Sentry
          }
        },
      }}
    >
      <ThemeProvider theme={theme[colorScheme]}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </SWRConfig>
  );
}
