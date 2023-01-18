import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "./HomePage";
import Settings from "./Settings";
import Post from "./Post";
import { ThemeContext } from "../context/ThemeContext";
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "white" : "black",
        tabBarInactiveTintColor: isDarkMode ? "white" : "black",
        tabBarActiveBackgroundColor: isDarkMode ? "black" : "white",
        tabBarInactiveBackgroundColor: isDarkMode ? "black" : "white",
        style: {
          backgroundColor: isDarkMode ? "black" : "white",
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
              style={focused ? styles.focusedIcon : styles.icon}
            />
          ),
        }}
        name="HomePage"
        component={HomePage}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "create" : "create-outline"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
            />
          ),
        }}
        name="Post"
        component={Post}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
            />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  darkModeTabNav: {
    backgroundColor: "black",
  },
});
