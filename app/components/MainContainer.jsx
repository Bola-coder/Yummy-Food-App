import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view";

// import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Bookmark from "../screens/Bookmark";
import Profile from "./../screens/Profile";

const Tab = createBottomTabNavigator();
const MainContainer = () => {
  return (
    <Tab.Navigator
      init={"Home"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === "Home") {
            iconName = focused ? "home" : "home-outline";
            size = focused ? 30 : 25;
          } else if (routeName === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
            size = focused ? 30 : 25;
          } else if (routeName === "Profile") {
            iconName = focused ? "person" : "person-outline";
            size = focused ? 30 : 25;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FFC529",
        tabBarActiveBackgroundColor: "#FFF",
        tabBarInactiveBackgroundColor: "#FFF",
        tabBarStyle: {
          height: 70,
          marginBottom: 0,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          headerShown: false,
          tabBarLabel: "Bookmark",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
