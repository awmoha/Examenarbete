import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, Text, Image } from "react-native";
import { firestore } from "../config/firebase";
import { ThemeContext } from "../context/ThemeContext";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert("Error, All fields are required.");
      return;
    }
    firestore
      .collection("contactUs")
      .add({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      })
      .then(() => {
        setTimeout(() => {
          alert("Thank you, We answered you as soon as possible.");
        }, 1000);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <View style={isDarkMode ? styles.darkModeContainer : styles.container}>
      <Image source={require("../assets/1.png")} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        color={isDarkMode ? "white" : "black"}
        placeholderTextColor={isDarkMode ? "white" : "black"}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        color={isDarkMode ? "white" : "black"}
        placeholderTextColor={isDarkMode ? "white" : "black"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={isDarkMode ? "white" : "black"}
        color={isDarkMode ? "white" : "black"}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "50%",
  },
  darkModeContainer: {
    backgroundColor: "black",
    height: "100%",
  },
  //   darkModeInput: {
  //     backgroundColor: "white",
  //     borderWidth: 1,
  //     borderColor: "black",
  //     padding: 10,
  //     marginVertical: 10,
  //   },
});
