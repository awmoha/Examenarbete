import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import faqData from "../FaqData/FaqData";

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
    } else {
      setAnswer("I am not sure what you mean.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={(text) => setQuestion(text)}
          placeholder="Ask a question"
        />
        <Button title="Submit" onPress={handleQuestion} />
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
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
    backgroundColor: "#f2f2f2",
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
  },
  answerContainer: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
  },
});
