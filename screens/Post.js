import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { firestore } from "../config/firebase";
export default function Post() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const states = [
    setFirstName,
    setLastName,
    setInfo,
    setPrice,
    setEmail,
    setPhone,
    setImage,
    setCategory,
  ];
  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !info ||
      !email ||
      !phone ||
      !price ||
      !category
    ) {
      alert("Error, All fields are required.");
      return;
    }
    const post = {
      firstName,
      lastName,
      info,
      price,
      email,
      phone,
      image,
      category,
    };
    firestore.collection("posts").add(post);
    alert("Success.");
    states.forEach((setter) => setter(""));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="FirstName..."
          required
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="LastName..."
          required
        />
        <TextInput
          style={styles.input}
          value={info}
          onChangeText={setInfo}
          placeholder="Info..."
          multiline={true}
          numberOfLines={2}
          required
        />
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price..USD"
          keyboardType="numeric"
          required
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email..."
          keyboardType="email-adress"
          required
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone..."
          keyboardType="numeric"
          required
        />
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="Image URL..."
          required
        />
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Category..."
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
});
