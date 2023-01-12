import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: { width: "70%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FFAE10",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignContent: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  buttonOutlineText: { color: "#2A2A2D", fontWeight: "400", fontSize: 16 },
});
