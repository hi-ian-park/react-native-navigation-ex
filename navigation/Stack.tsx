import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator();

const Screen1 = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate('Two')}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>hi I'm 1</Text>
  </TouchableOpacity>
);
const Screen2 = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate('Three')}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>hi I'm 2</Text>
  </TouchableOpacity>
);
const Screen3 = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate('Tabs', { screen: 'Search' })}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>hi I'm 3</Text>
  </TouchableOpacity>
);

const Stack = ({ route }) => {
  console.log(route);
  return (
    <NativeStack.Navigator screenOptions={{}}>
      <NativeStack.Screen options={{ title: '1' }} name="One" component={Screen1} />
      <NativeStack.Screen name="Two" component={Screen2} />
      <NativeStack.Screen name="Three" component={Screen3} />
    </NativeStack.Navigator>
  );
};

export default Stack;
