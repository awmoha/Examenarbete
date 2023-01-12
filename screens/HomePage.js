import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  const handleProfilePress = (postId) => {
    navigation.navigate("Profile", { postId });
  };
  useEffect(() => {
    const unsubscribe = firestore
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        const newPosts = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(newPosts);
      });
    return unsubscribe;
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };
  const filteredPosts = posts.filter((post) => {
    return post.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Search by categories..."
        />
      </View>

      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={searchTerm ? filteredPosts : posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text>{item.firstName}</Text>
                <Text>{item.lastName}</Text>
                <Text>{item.category}</Text>
                <View style={styles.buttonContainer}>
                <Button
                title="Gå to profile"
                onPress={() => handleProfilePress(item.id)}
              />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },

  postContainer: {
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 20,
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
  buttonContainer: {
    position: "absolute",
    right: 0,
  },
});
