import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { theme } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const colorScheme = useColorScheme();
  const palette = theme[colorScheme];
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: palette.background,
        },
        tabBarActiveTintColor: palette.tint,
        tabBarInactiveTintColor: palette.inactive,
        headerStyle: {
          backgroundColor: palette.background,
        },
        headerTitleStyle: {
          color: palette.text,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movie}></Tab.Screen>
      <Tab.Screen name="Tv" component={Tv}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
