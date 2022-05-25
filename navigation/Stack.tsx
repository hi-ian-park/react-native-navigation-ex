import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';

import { theme } from '../colors';
import Detail from '../screens/Detail';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const colorScheme = useColorScheme() || 'light';
  const palette = theme[colorScheme];
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: palette.background,
        },
        headerTitleStyle: {
          color: palette.text,
        },
        presentation: 'containedModal',
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
