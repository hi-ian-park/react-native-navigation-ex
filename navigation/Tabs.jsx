import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={Movie}></Tab.Screen>
    <Tab.Screen name="Tv" component={Tv}></Tab.Screen>
    <Tab.Screen name="Search" component={Search}></Tab.Screen>
  </Tab.Navigator>
);

export default Tabs;
