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
  const [showSearch, setShowSearch] = useState(true);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const handleSettingsProfilePress = () => {
    navigation.navigate("ProfileSettings");
  };
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

  // const handleScroll = (event) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;

  //   if (currentOffset > 0) {
  //     setShowSearch(false);
  //   } else {
  //     setShowSearch(true);
  //   }
  // };
  const filteredPosts = posts.filter((post) => {
    return post.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <ScrollView
      style={isDarkMode ? styles.darkModeSafeAreaView : styles.ScrollView}
    >
      <View style={styles.container}>
        <View
          style={
            isDarkMode ? styles.darkModeSearchContainer : styles.searchContainer
          }
        >
          <Ionicons name="ios-search-sharp" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleSearch}
            placeholder="Search by categories..."
          />
          <Ionicons name="filter-outline" size={24} color="black" />
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

      <View style={styles.container}>
        <FlatList
          data={searchTerm ? filteredPosts : posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => handleProfilePress(item.id)}
            >
              <View
                style={
                  isDarkMode ? styles.darkPostContainer : styles.postContainer
                }
              >
                <Image source={{ uri: item?.image }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={isDarkMode ? styles.darkText : styles.text}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={isDarkMode ? styles.darkText : styles.text}>
                    Category: {item.category}
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
    justifyContent: "space-between",
    margin: 10,
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
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    flexDirection: "row",
  },
  darkText: {
    color: "white",
  },
});
