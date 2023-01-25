import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  // import { Configuration, OpenAIApi } from "openai";
  
  const ChattBot = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  
  // const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);
  
  // const handleSubmit = async () => {
  // const response = await openai.createCompletion({
  // model: "text-davinci-002",
  // prompt: Human: ${inputText}\n,
  // temperature: 0.5,
  // max_tokens: 256,
  // });
  // setResponseText(response.choices[0].text);
  // };
  
  return (
  <View style={styles.container}>
  <View style={styles.inputContainer}>
  <TextInput
         style={styles.input}
         value={inputText}
         onChangeText={setInputText}
         placeholder="Type your message..."
       />
  <TouchableOpacity style={styles.submitButton}>
  <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.responseContainer}>
  <Text style={styles.responseText}>{responseText}</Text>
  </View>
  </View>
  );
  };
  
  export default ChattBot;
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#F5F5F5",
  },
  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 5,
  overflow: "hidden",
  marginBottom: 10,
  },
  input: {
  flex: 1,
  padding: 10,
  fontSize: 18,
  },
  submitButton: {
  backgroundColor: "#4CAF50",
  padding: 10,
  borderRadius: 5,
  },
  submitButtonText: {
  color: "white",
  fontWeight: "bold",
  textTransform: "uppercase",
  textAlign: "center",
  fontSize: 18,
  },
  responseContainer: {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 5,
  overflow: "hidden",
  },
  responseText: {
  fontSize: 18,
  },
  });