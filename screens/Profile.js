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
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../config/firebase";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ route }) => {
  const navigation = useNavigation();
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

  const handleSettingsProfilePress = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={{ uri: post.image }}
          style={styles.image}
        ></ImageBackground>
        <View style={styles.postContainer}>
          <View style={styles.textContainer}>
            <View style={styles.firstTag}>
              <Text style={styles.textStyleFirstTag}>
                {post.firstName} {post.lastName}
              </Text>
              <Text style={styles.textStyleFirstTag}>{post.price}$/H</Text>
            </View>
            <View style={styles.touchableOpacityGroup}>
              <TouchableOpacity style={styles.touchableOpacity}>
                <Text style={{ color: "black", fontSize: 20 }}>
                  background:{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={(styles.text, { color: "#41444B", fontWeight: "300" })}
                >
                  {post.info}
                </Text>
              </View>
            </View>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={(styles.text, { color: "#41444B", fontWeight: "300" })}
                >
                  Email: {post.email}
                </Text>
              </View>
            </View>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={(styles.text, { color: "#41444B", fontWeight: "300" })}
                >
                  Phone: {post.phone}
                </Text>
              </View>
            </View>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={(styles.text, { color: "#41444B", fontWeight: "300" })}
                >
                  Category: {post.category}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableHighlight style={styles.buttonContainer}>
              <Button
                title="Send Email"
                onPress={() => setModalVisible(true)}
              />
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
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    buttom: 70,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
  },
  firstTag: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchableOpacityGroup: {
    flexDirection: "row",
  },
  touchableOpacity: {
    paddingVertical: 10,
    marginRight: 20,
    color: "blue",
  },
  textContainer: {
    flex: 1,
    padding: 20,
    fontSize: "12px",
  },
  textStyleFirstTag: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
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
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
