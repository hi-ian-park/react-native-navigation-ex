import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
  };
  const colorScheme = useColorScheme();

  if (!ready)
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.warn}
      />
    );

  return (
    <ThemeProvider theme={theme[colorScheme]}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
