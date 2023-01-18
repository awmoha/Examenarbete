import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Button,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const styles = isDarkMode ? darkStyles : lightStyles;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleContacutUs = () => {
    navigation.navigate("contactUs");
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const SECTIONS = [
    {
      header: "Preferences",
      icon: "settings",
      items: [
        { icon: "globe", color: "#fe9400", label: "Language", type: "link" },
        {
          icon: "moon",
          color: "#007afe",
          label: "Dark Mode",
          value: isDarkMode,
          type: "boolean",
        },
        {
          icon: "wifi",
          color: "#007afe",
          label: "Use Wi-Fi",
          value: true,
          type: "boolean",
        },
        {
          icon: "navigation",
          color: "#32c759",
          label: "Location",
          type: "link",
        },
        {
          icon: "users",
          color: "#32c759",
          label: "Show collaborators",
          value: true,
          type: "boolean",
        },
        {
          icon: "airplay",
          color: "#fd2d54",
          label: "Accessibility mode",
          value: false,
          type: "boolean",
        },
      ],
    },
    {
      header: "Help",
      icon: "help-circle",
      items: [
        { icon: "flag", color: "#8e8d91", label: "Report Bug", type: "link" },
        { icon: "mail", color: "#007afe", label: "Contact Us", type: "link" },
      ],
    },
    {
      header: "Content",
      icon: "align-center",
      items: [
        { icon: "save", color: "#32c759", label: "Saved", type: "link" },
        {
          icon: "download",
          color: "#fd2d54",
          label: "Downloads",
          type: "link",
        },
      ],
    },
    {
      header: "Log Ut",
      icon: "align-center",
      items: [
        {
          icon: "log-out",
          color: "red",
          label: "Log out",
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkMode_SafeAreaView : styles.SafeAreaView}
    >
      <ScrollView
        contentContainerStyle={
          isDarkMode ? styles.darkMode_Container : styles.container
        }
      >
        <View style={isDarkMode ? styles.darkMode_Profile : styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={require("../assets/adaptive-icon.png")}
                style={styles.profileAvatar}
              />

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{email}</Text>

            <Text style={styles.profileAddress}>
              {date.toLocaleDateString()}{" "}
            </Text>
          </View>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({ label, icon, type, value, color }, index) => {
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => {
                    if (icon === "log-out") {
                      handleLogout();
                    }
                    if (icon === "moon") {
                      toggleDarkMode();
                    }
                    if (icon === "mail") {
                      handleContacutUs();
                    }
                  }}
                >
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: color }]}>
                      <FeatherIcon color="#fff" name={icon} size={18} />
                    </View>

                    <Text
                      style={
                        isDarkMode ? styles.darkMode_RowLabel : styles.rowLabel
                      }
                    >
                      {label}
                    </Text>

                    <View style={styles.rowSpacer} />

                    {type === "boolean" && <Switch value={value} />}

                    {type === "link" && (
                      <FeatherIcon
                        style={
                          isDarkMode
                            ? styles.darkMode_LinkIcon
                            : styles.lightModeLinkIcon
                        }
                        color="#0c0c0c"
                        name="chevron-right"
                        size={22}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const lightStyles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  SafeAreaView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

const darkStyles = StyleSheet.create({
  darkMode_Container: {
    paddingVertical: 24,
    backgroundColor: "black",
  },
  darkMode_SafeAreaView: {
    backgroundColor: "black",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  darkMode_Profile: {
    padding: 24,
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "black",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  darkMode_RowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
  },
  darkMode_LinkIcon: {
    color: "white",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
