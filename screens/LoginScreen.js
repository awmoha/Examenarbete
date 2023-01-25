import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  const register = () => {
    // Use the createUserWithEmailAndPassword method from the Firebase Auth library to create a new user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        Alert.alert("Success!", "Your account has been created successfully.");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      });
  };
  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const backgroundVideo = require("../assets/vedio/cover3.mp4");
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Video
          source={backgroundVideo}
          isLooping
          shouldPlay
          resizeMode="cover"
          style={styles.video}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            autoFocus={true}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogIn} style={styles.button}>
            <Text style={styles.buttonText}>LogIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={register}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  inputContainer: { width: "70%" },
  input: {
    backgroundColor: "rgba(255,255,255,0.8)",
    opacity: 0.7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    opacity: 0.7,
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#588157",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 13 },
  buttonOutlineText: { color: "#2A2A2D", fontWeight: "400", fontSize: 13 },
});
