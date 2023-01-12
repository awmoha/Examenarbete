import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../config/firebase";
import React, { useState, useEffect } from "react";

const Profile = ({ route }) => {
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
    <View style={styles.postContainer}>
    <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text>First Name: {post.firstName}</Text>
          <Text>Last Name: {post.lastName}</Text>
          <Text>Info: {post.info}</Text>
          <Text>Email: {post.email}</Text>
          <Text>Phone: {post.phone}</Text>
          <Text>Category: {post.category}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
