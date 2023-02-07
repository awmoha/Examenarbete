import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import faqData from "../FaqData/FaqData";
import { ThemeContext } from "../context/ThemeContext";

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  const handleQuestion = () => {
    let foundQuestion = faqData.find((data) => {
      if (Array.isArray(data.question)) {
        return data.question.includes(question);
      } else {
        return data.question === question;
      }
    });

    if (foundQuestion) {
      let answer;
      if (Array.isArray(foundQuestion.answer)) {
        answer =
          foundQuestion.answer[
            Math.floor(Math.random() * foundQuestion.answer.length)
          ];
      } else {
        answer = foundQuestion.answer;
      }
      setAnswer(answer);
      setQuestion("")
    } else {
      setAnswer("I am not sure what you mean.");
    }
  };
  const image = { uri: "../assets/1.png" };
  return (
    <View style={isDarkMode ? styles.darkModeContainer : styles.container}>
      <ImageBackground
        source={require("../assets/back.jpeg")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          color={isDarkMode ? "white" : "black"}
          onChangeText={(text) => setQuestion(text)}
          placeholder="Ask a question"
          placeholderTextColor={
            isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(1,1,1, 0.5)"
          }
        />
        <Button title="Submit" onPress={handleQuestion} />
      </View>
      <View style={styles.answerContainer}>
        <Text
          style={[styles.answerText, { color: isDarkMode ? "white" : "black" }]}
        >
          {answer}
        </Text>
      </View>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    height: 60,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  answerContainer: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
  },
  darkModeContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.7
  },
});
