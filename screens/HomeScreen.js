import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "./HomePage";
import Settings from "./Settings";
import Post from "./Post";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={focused ? "#2f95dc" : "gray"}
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
});
