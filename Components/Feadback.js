import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Button, Text, Image } from "react-native";
import { firestore } from "../config/firebase";
import { ThemeContext } from "../context/ThemeContext";

const Feadback = () => {
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
      .collection("feadback")
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
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/02/28/16/18/board-4887880_960_720.jpg",
        }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        color={isDarkMode ? "white" : "black"}
        placeholderTextColor={
          isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(1,1,1, 0.5)"
        }
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        color={isDarkMode ? "white" : "black"}
        placeholderTextColor={
          isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(1,1,1, 0.5)"
        }
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={
          isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(1,1,1, 0.5)"
        }
        color={isDarkMode ? "white" : "black"}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSubmit} />
    </View>
  );
};

export default Feadback;

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
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "40%",
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
