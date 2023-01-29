// import {
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { firestore } from "../config/firebase";
// import firebase from "firebase/compat";

// const { Configuration, OpenAIApi } = require("openai");

// const ChattBot = () => {
//   const { Configuration, OpenAIApi } = require("openai");
//   const OPENAI_API_KEY = "sk-";
//   const configuration = new Configuration({
//     apiKey: OPENAI_API_KEY,
//   });

//   const openai = new OpenAIApi(configuration);

//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [dialog, setDialog] = useState([]);
//   const handleClick = async () => {
//     setLoading(true);

//     try {
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: prompt,
//         temperature: 0.7,
//         max_tokens: 230,
//       });
//       setResult(response.data.choices[0].text);
//       firestore.collection("dialog").add({
//         question: prompt,
//         answer: response.data.choices[0].text,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false);
//     setPrompt("");
//   };
//   useEffect(() => {
//     const unsubscribe = firestore
//       .collection("dialog")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((querySnapshot) => {
//         const updatedDialog = querySnapshot.docs.map((doc) => ({
//           docId: doc.id,
//           question: doc.data().question,
//           answer: doc.data().answer,
//         }));
//         setDialog(updatedDialog);
//       });
//     return () => unsubscribe();
//   }, []);
//   const handleDelete = async () => {
//     try {
//       const querySnapshot = await firestore.collection("dialog").get();
//       querySnapshot.forEach((doc) => {
//         doc.ref.delete();
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderDialog = () => {
//     return dialog.map((item, index) => {
//       return (
//         <View key={index} style={styles.dialogContainer}>
//           <Text style={styles.question}>{item.question}</Text>
//           <Text style={styles.answer}>{item.answer}</Text>
//         </View>
//       );
//     });
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <ScrollView>
//           <View style={styles.dialogContainer}>{renderDialog()}</View>
//         </ScrollView>
//         <Button
//           title="Delete All"
//           onPress={handleDelete}
//           style={styles.deleteButton}
//         />
//         {/* <View style={styles.resultContainer}>
//           <Text style={styles.resultText}>{result}</Text>
//         </View> */}
//         <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
//           <TextInput
//             style={styles.textArea}
//             value={prompt}
//             numberOfLines={2}
//             onChangeText={(e) => setPrompt(e)}
//             placeholder="Skriv ditt meddelande här"
//           ></TextInput>
//           <Button
//             title={loading ? "Generating..." : "Generate"}
//             onPress={handleClick}
//             style={styles.generateButton}
//           ></Button>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };

// export default ChattBot;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   textArea: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//   },
//   generateButton: {
//     backgroundColor: "blue",
//     color: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginLeft: 10,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//   },
//   resultText: {
//     fontSize: 18,
//     color: "black",
//   },
//   dialogContainer: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   question: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   answer: {
//     fontSize: 16,
//     color: "#555",
//     marginTop: 5,
//   },
// });
