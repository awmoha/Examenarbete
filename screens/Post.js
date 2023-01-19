import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { firestore } from "../config/firebase";
import { ThemeContext } from "../context/ThemeContext";
export default function Post() {
  const { isDarkMode } = useContext(ThemeContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experiences, setExperiences] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const states = [
    setFirstName,
    setLastName,
    setInfo,
    setPrice,
    setEmail,
    setPhone,
    setExperiences,
    setImage,
    setCategory,
  ];
  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !info ||
      !email ||
      !experiences ||
      !price ||
      !category
    ) {
      alert("Error, All fields are required.");
      return;
    }
    const postId = firestore.collection("posts").doc().id;
    const post = {
      firstName,
      lastName,
      info,
      price,
      email,
      phone,
      experiences,
      image,
      category,
      avatarId: `https://robohash.org/${postId}.png`,
    };
    firestore.collection("posts").doc(postId).set(post);
    alert("Success.");
    states.forEach((setter) => setter(""));
  };

  return (
    <ScrollView style={isDarkMode ? styles.darkMode : styles.lightMode}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="FirstName..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="LastName..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />
        <TextInput
          style={styles.input}
          value={info}
          onChangeText={setInfo}
          placeholder="About you..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          multiline={true}
          numberOfLines={2}
          required
        />

        <TextInput
          style={styles.input}
          value={experiences}
          onChangeText={setExperiences}
          placeholder="Experiences...1,2,3..years"
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Developer, Ux, Economy, Graphic Designer, Fotograf,..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price..USD"
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          keyboardType="numeric"
          required
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          keyboardType="email-adress"
          required
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />

        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="Image URL..."
          color={isDarkMode ? "white" : "black"}
          placeholderTextColor={isDarkMode ? "white" : "black"}
          required
        />

        <TouchableHighlight
          onPress={handleSubmit}
          style={styles.buttonContainer}
        >
          <Button title="Create" />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkMode: {
    backgroundColor: "black",
  },
  lightMode: {
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  picker: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginRight: 50,
    marginLeft: 50,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#2A2A2D",
  },

  darkModeInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
