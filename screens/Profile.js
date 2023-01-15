import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableHighlight,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../config/firebase";
import React, { useState, useEffect } from "react";

const Profile = ({ route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSendEmail = () => {
    if (!name || !email || !message) {
      alert("Please fill out all fields");
      return;
    }

    const emailData = {
      name,
      email,
      message,
    };

    firestore.collection("email").add(emailData);
    setModalVisible(false);
    setName("");
    setEmail("");
    setMessage("");
  };
  const postId = route.params.postId;
  const [post, setPost] = useState({});
  useEffect(() => {
    firestore
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        setPost({ id: doc.id, ...doc.data() });
      });
  }, [postId]);

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>First Name: {post.firstName}</Text>
          <Text style={styles.textStyle}>Last Name: {post.lastName}</Text>
          <Text style={styles.textStyle}>Info: {post.info}</Text>
          <Text style={styles.textStyle}>Email: {post.email}</Text>
          <Text style={styles.textStyle}>Phone: {post.phone}</Text>
          <Text style={styles.textStyle}>Price: {post.price}</Text>
          <Text style={styles.textStyle}>Category: {post.category}</Text>
        </View>
        <View>
          <TouchableHighlight style={styles.buttonContainer}>
            <Button title="Send Email" onPress={() => setModalVisible(true)} />
          </TouchableHighlight>
          <Modal visible={isModalVisible}>
            <View style={styles.ModalStyling}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"black"}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"black"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Message"
                placeholderTextColor={"black"}
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={4}
              />
              <Button title="Send" onPress={handleSendEmail} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 150,
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    padding: 20,
    fontSize: "12px",
  },
  textStyle: {
    fontSize: 18,
    paddingVertical: 10,
  },
  buttonContainer: {
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
  ModalStyling: {
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
