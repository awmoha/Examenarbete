import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigation } from "@react-navigation/native";
import { AlanView } from "@alan-ai/alan-sdk-react-native";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
    navigation.navigate("Login");
  };

  return (
    <View>
      <Text>Email: {email}</Text>
      <Text>Password: {password}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
