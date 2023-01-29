import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "./HomePage";
import Settings from "./Settings";
import chattBot from "./ChattBot";
import Post from "./Post";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from "../context/ThemeContext";
import FAQ from "./FAQ";
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
      {/* <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name={focused ? "hipchat" : "hipchat"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
            />
          ),
        }}
        name="chatt"
        component={chattBot}
      /> */}
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={focused ? "help-with-circle" : "help-with-circle"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
            />
          ),
        }}
        name="FAQ"
        component={FAQ}
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
