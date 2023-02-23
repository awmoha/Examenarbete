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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../config/firebase";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isExpreinsVisible, setIsExpreinsVisible] = useState(false);
  const [icon, setIcon] = useState("ios-add");
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [iconContact, setIconContact] = useState("ios-add");

  const { isDarkMode } = useContext(ThemeContext);
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
  const handleDeleteProfile = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        navigation.navigate("Home");
      });
  };
  const handlePressDelete = () => {
    Alert.alert(
      "Är du säker på att du vill ta bort kontot?",
      "",
      [
        {
          text: "Nej",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Ja", onPress: handleDeleteProfile },
      ],
      { cancelable: false }
    );
  };
  const handleSettingsProfilePress = () => {
    navigation.navigate("Home");
  };
  const handlePressIsExpreinsVisible = () => {
    setIsExpreinsVisible(!isExpreinsVisible);
    setIcon(icon === "ios-add" ? "ios-remove" : "ios-add");
  };
  const handlePressIsContactVisible = () => {
    setIsContactVisible(!isContactVisible);
    setIconContact(iconContact === "ios-add" ? "ios-remove" : "ios-add");
  };
  const [updatePostModalVisible, setUpdatePostModalVisible] = useState(false);
  const [UpdatePrice, setUpdatePrice] = useState(post.price);
  const [updateEmail, setUpdateEmail] = useState(post.email);
  const [updatePhone, setUpdatePhone] = useState(post.phone);

  const handleUpdatePost = () => {
    if (!updateEmail && !UpdatePrice && !updatePhone) {
      alert("Please fill out all ");
      return;
    }

    const postData = {
      firstName: post.firstName,
      lastName: post.lastName,
      phone: post.phone,
      category: post.category,
      info: post.info,
      email: post.email,
      price: UpdatePrice,
      email: updateEmail,
      phone: updatePhone,
    };

    firestore.collection("posts").doc(postId).update(postData);
    setPost({ id: postId, ...postData });
    setUpdatePostModalVisible(false);
    setUpdatePrice("");
    setUpdateEmail("");
    setUpdatePhone("");
  };
  return (
    <>
      <ScrollView
        style={
          isDarkMode ? styles.darkModePostContainer : styles.profileContainer
        }
      >
        <View style={styles.titleBar}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={isDarkMode ? "white" : "black"}
            onPress={handleSettingsProfilePress}
          ></Ionicons>

          <TouchableOpacity onPress={() => setUpdatePostModalVisible(true)}>
            <MaterialIcons
              name="update"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="deleteuser"
              size={24}
              onPress={handlePressDelete}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Modal visible={updatePostModalVisible}>
          <View
            style={
              isDarkMode ? styles.darkModetextModalStyling : styles.ModalStyling
            }
          >
            {/* <TextInput
              placeholder="Experiences"
              color={isDarkMode ? "white" : "black"}
              style={styles.input}
              onChangeText={(text) => setUpdateExperiences(text)}
              value={updateExperiences}
            /> */}

            <TextInput
              placeholder="Price"
              color={isDarkMode ? "white" : "black"}
              style={styles.input}
              onChangeText={(text) => setUpdatePrice(text)}
              value={UpdatePrice}
            />
            <TextInput
              placeholder="email"
              color={isDarkMode ? "white" : "black"}
              style={styles.input}
              onChangeText={(text) => setUpdateEmail(text)}
              value={updateEmail}
            />
            <TextInput
              placeholder="phone"
              color={isDarkMode ? "white" : "black"}
              style={styles.input}
              onChangeText={(text) => setUpdatePhone(text)}
              value={updatePhone}
            />
            <Button title="Update" onPress={handleUpdatePost} />
            <Button
              title="Cancel"
              onPress={() => setUpdatePostModalVisible(false)}
            />
          </View>
        </Modal>

        <View style={styles.avatarContainer}>
          <ImageBackground
            source={{ uri: post.avatarId }}
            style={styles.avatar}
          ></ImageBackground>
        </View>
        <View style={styles.postContainer}>
          <View style={styles.textContainer}>
            <View>
              <Text
                style={
                  isDarkMode
                    ? styles.darkModetextStyleFirstTag
                    : styles.textStyleFirstTag
                }
              >
                {post.firstName} {post.lastName}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="verified"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={
                    isDarkMode
                      ? styles.darkModetextCategory
                      : styles.textCategory
                  }
                >
                  {post.category}
                </Text>
              </View>

              {/* <Text style={styles.textStyleFirstTag}>{post.price}$/H</Text> */}
            </View>
            {/* <View style={styles.touchableOpacityGroup}>
              <TouchableOpacity style={styles.touchableOpacity}>
                <Text
                  style={isDarkMode ? styles.darkModetextInfo : styles.textInfo}
                >
                  Info:
                </Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.infoItem}>
              <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                  <Text style={isDarkMode ? styles.darkModetext : styles.text}>
                    {post.price}$/H
                  </Text>
                </View>
              </View>
              <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                  <Text style={isDarkMode ? styles.darkModetext : styles.text}>
                    {post.info}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.headerContainer}>
                <Text
                  style={
                    isDarkMode ? styles.darkModetextInfo : styles.headerText
                  }
                >
                  Experiences
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handlePressIsExpreinsVisible}
                >
                  <Ionicons
                    name={icon}
                    size={30}
                    color={isDarkMode ? "white" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {isExpreinsVisible && (
                <View style={styles.recentItem}>
                  <View style={styles.activityIndicator}></View>
                  <View style={{ width: 250 }}>
                    <Text
                      style={isDarkMode ? styles.darkModetext : styles.text}
                    >
                      {post.experiences}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View>
              <View style={styles.headerContainer}>
                <Text
                  style={
                    isDarkMode ? styles.darkModetextInfo : styles.headerText
                  }
                >
                  Contact
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handlePressIsContactVisible}
                >
                  <Ionicons
                    name={iconContact}
                    size={30}
                    color={isDarkMode ? "white" : "white"}
                  />
                </TouchableOpacity>
              </View>
              {isContactVisible && (
                <>
                  <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                      <Text
                        style={isDarkMode ? styles.darkModetext : styles.text}
                      >
                        Email: {post.email}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                      <Text
                        style={isDarkMode ? styles.darkModetext : styles.text}
                      >
                        Phone: {post.phone}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
            {/* <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text style={isDarkMode ? styles.darkModetext : styles.text}>
                  Category: {post.category}
                </Text>
              </View>
            </View> */}
          </View>
          <View>
            <TouchableHighlight style={styles.buttonContainer}>
              <Button
                title="Send Email"
                onPress={() => setModalVisible(true)}
              />
            </TouchableHighlight>
            <Modal visible={isModalVisible}>
              <View
                style={
                  isDarkMode
                    ? styles.darkModetextModalStyling
                    : styles.ModalStyling
                }
              >
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
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  color={isDarkMode ? "white" : "black"}
                  placeholder="Message"
                  placeholderTextColor={
                    isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(1,1,1, 0.5)"
                  }
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
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    position: "absolute",
    marginTop: 100,
    left: "75%",
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    padding: 10,
    marginTop: 40,
    marginHorizontal: 16,
  },

  // firstTag: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",

  // },
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
    fontSize: 28,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  textInfo: {
    fontWeight: "500",
    fontSize: 25,
    color: "black",
  },
  text: {
    color: "black",
    fontWeight: "300",
    fontSize: 20,
  },
  textStyle: {
    fontSize: 18,
    paddingVertical: 10,
  },
  textCategory: {
    fontSize: 18,
    fontWeight: "300",
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
    padding: 12,
    height: "100%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  infoItem: {
    marginTop: 30,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 0,
    marginBottom: 10,
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 25,
    color: "black",
  },
  button: {
    backgroundColor: "#2A2A2D",
    padding: 12,
    borderRadius: 5,
  },

  darkModePostContainer: {
    backgroundColor: "black",
    height: "100%",
  },
  darkModetextStyleFirstTag: {
    color: "white",
    fontSize: 28,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  darkModetextCategory: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
  },
  darkModetextInfo: {
    color: "white",
    fontWeight: "500",
    fontSize: 25,
  },
  darkModetext: {
    color: "white",
    fontWeight: "300",
    fontSize: 20,
  },
  darkModetextModalStyling: {
    padding: 12,
    backgroundColor: "black",
    height: "100%",
    justifyContent: "center",
  },
});
