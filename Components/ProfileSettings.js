import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ProfileSettings = () => {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(Math.floor(Math.random() * 1000));
  const [valueFollowing, setValueFollowing] = useState(
    Math.floor(Math.random() * 100)
  );
  const [password, setPassword] = useState("");
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
    navigation.navigate("Login");
  };

  const handleSettingsProfilePress = () => {
    navigation.navigate("Home");
  };
  const handleCreatePost = () => {
    navigation.navigate("Post");
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    const generateAvatar = async () => {
      const randomId = Math.floor(Math.random() * 1000);
      const response = await fetch(`https://robohash.org/random.png`);
      setAvatarUrl({ uri: response.url });
    };

    generateAvatar();
  }, []);
  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkMode_SafeAreaView : styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons
            name="ios-arrow-back"
            size={28}
            style={[styles.text, { color: "#52575D", fontWeight: "300" }]}
            onPress={handleSettingsProfilePress}
          ></Ionicons>
          <TouchableOpacity>
            <Ionicons
              name="md-moon"
              size={24}
              color="#52575D"
              onPress={toggleDarkMode}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={avatarUrl}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.dm}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
              onPress={handleCreatePost}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              isDarkMode ? styles.darkModeText : styles.text,
              { fontWeight: "200", fontSize: 36 },
            ]}
          >
            {email}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                { fontSize: 24 },
              ]}
            >
              1
            </Text>
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                styles.subText,
              ]}
            >
              Posts
            </Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                { fontSize: 24 },
              ]}
            >
              {value}
            </Text>
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                styles.subText,
              ]}
            >
              Followers
            </Text>
          </View>
          <View style={styles.statsBox}>
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                { fontSize: 24 },
              ]}
            >
              {valueFollowing}
            </Text>
            <Text
              style={[
                isDarkMode ? styles.darkModeText : styles.text,
                styles.subText,
              ]}
            >
              Following
            </Text>
          </View>
        </View>

        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[
                  isDarkMode ? styles.darkModeText : styles.text,
                  { fontWeight: "300" },
                ]}
              >
                Started following
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[
                  isDarkMode ? styles.darkModeText : styles.text,
                  { fontWeight: "300" },
                ]}
              >
                Started following
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>

            {/* <Text>Email: {email}</Text>
            <Text>Password: {password}</Text>
            <Button title="Logout" onPress={handleLogout} /> */}
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={
                  isDarkMode
                    ? styles.darkModeText
                    : [styles.text, { fontWeight: "300" }]
                }
              >
                Email: {email}
              </Text>
            </View>
            {/* <Text>Email: {email}</Text>
            <Text>Password: {password}</Text>
            <Button title="Logout" onPress={handleLogout} /> */}
          </View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "black",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  darkMode_SafeAreaView: {
    height: "100%",
    backgroundColor: "black",
  },
  darkModeText: {
    fontFamily: "HelveticaNeue",
    color: "white",
  },
});
