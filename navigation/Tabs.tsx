import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const colorScheme = useColorScheme() || "light";
  const palette = theme[colorScheme];
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: palette.background,
      }}
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
        tabBarLabelStyle: {
          paddingTop: -5,
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
