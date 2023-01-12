import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Picker,
} from "react-native";
import { firestore } from "../config/firebase";
export default function Post() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [info, setInfo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [pickerValue, setPickerValue] = useState("");

  const states = [
    setFirstName,
    setLastName,
    setInfo,
    setEmail,
    setPhone,
    setImage,
    setPickerValue,
  ];
  const handleSubmit = () => {
    if (!firstName || !lastName || !info || !email || !phone || !image) {
      alert("Error, All fields are required.");
      return;
    }
    const post = {
      firstName,
      lastName,
      info,
      email,
      phone,
      image,
      category: pickerValue,
    };
    firestore.collection("posts").add(post);
    setTimeout(() => {
      alert("Post created successfully!");
    }, 2000);
    states.forEach((setter) => setter(""));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="firstName..."
        required
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="lastName..."
        required
      />
      <TextInput
        style={styles.input}
        value={info}
        onChangeText={setInfo}
        placeholder="Info..."
        required
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email..."
        required
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="phone..."
        required
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL..."
        required
      />
      <Picker
        selectedValue={pickerValue}
        onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
        style={styles.picker}
        required
      >
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
        <Picker.Item label="Category 3" value="category3" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Create" onPress={handleSubmit} />
      </View>
    </View>
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
    borderRadius: 5,
  },
  picker: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});
