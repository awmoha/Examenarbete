import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import { ThemeProvider } from "./context/ThemeContext";
import ProfileSettings from "./Components/ProfileSettings";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ContactUs from "./Components/ContactUs";
import FeadBack from "./Components/Feadback";
import Location from "./Components/Location";
import "react-native-url-polyfill/auto";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ProfileSettings"
            component={ProfileSettings}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="contactUs"
            component={ContactUs}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="feadback"
            component={FeadBack}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="location"
            component={Location}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
