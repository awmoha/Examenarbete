import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  VirtualizedList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { firestore } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const handleSettingsProfilePress = () => {
    navigation.navigate("ProfileSettings");
  };
  const handleProfilePress = (postId, avatarUrl) => {
    navigation.navigate("Profile", { postId, avatarUrl });
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
    <ScrollView
      style={isDarkMode ? styles.darkModeSafeAreaView : styles.ScrollView}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="ios-search-sharp"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder="Search by categories..."
            color={isDarkMode ? "white" : "black"}
            placeholderTextColor={isDarkMode ? "white" : "black"}
          />
        </View>
        <View style={styles.profileContainer}>
          <Ionicons
            name="ios-person"
            size={24}
            style={isDarkMode ? styles.darkIcon : styles.lightIcon}
            onPress={handleSettingsProfilePress}
          />
          <View style={styles.activeDot} />
        </View>
        {/* <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
              <Ionicons name="md-moon" size={24} color="#52575D" />
            </TouchableOpacity>
          </View> */}
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={searchTerm ? filteredPosts : posts}
          keyExtractor={(item) => item.id}
          style={styles.containerItems}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => handleProfilePress(item.id, item.avatarUrl)}
            >
              <View
                style={
                  isDarkMode ? styles.darkPostContainer : styles.postContainer
                }
              >
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: item.avatarId }}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={isDarkMode ? styles.darkText : styles.text}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={isDarkMode ? styles.darkText : styles.text}>
                    {item.category}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },

  profileContainer: {
    color: "black",
    margin: 10,
    top: 10,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    top: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
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
    display: "fixed",
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  lightIcon: {
    color: "black",
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    position: "absolute",
    right: 0,
    top: 0,
  },

  postContainer: {
    padding: 20,
    borderWidth: 1,
    margin: 8,
    flex: 1,
    width: "100%",
    borderColor: "gray",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  avatarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginLeft: 30,
    borderColor: "black",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "black",
    fontSize: 13
  },
  buttonContainer: {
    position: "absolute",
    right: 0,
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  darkModeSafeAreaView: {
    backgroundColor: "black",
  },
  darkModeSearchContainer: {
    backgroundColor: "white",
    flex: 1,
    top: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
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
  darkIcon: {
    color: "white",
  },
  darkPostContainer: {
    padding: 20,
    borderWidth: 1,
    margin: 8,
    flex: 1,
    width: "100%",
    borderColor: "white",
    borderRadius: 5,
  },
  darkText: {
    color: "white",
    fontSize: 13
  },
});
