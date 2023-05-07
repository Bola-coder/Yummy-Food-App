import { View, Text } from "react-native";
import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Bookmark from "../screens/Bookmark";
import Profile from "./../screens/Profile";

const Tab = createBottomTabNavigator();
const MainContainer = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      init={"Home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (routeName === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FFF",
        tabBarActiveBackgroundColor: "#FFC529",
        tabBarInactiveBackgroundColor: "#FFC529",
        tabBarStyle: { height: 70 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainContainer;
