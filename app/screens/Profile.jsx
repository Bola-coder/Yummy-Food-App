import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./../components/AppButton";

const Profile = ({ navigation }) => {
  const { user } = useAuth();

  if (user) {
    return (
      <View style={styles.profile}>
        <Text style={styles.profileTitle}>User Profile</Text>
        {/* <Text style={styles.profileHeading}>Your Profile</Text> */}
        <View style={styles.profileContainer}>
          <Image
            source={require("./../../assets/profileImagePlaceholder.png")}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            <Text style={styles.textKey}>
              Username: <Text style={styles.textValue}> {user?.username}</Text>
            </Text>
            <Text style={styles.textKey}>
              Email : <Text style={styles.textValue}>{user?.email}</Text>{" "}
            </Text>
          </View>
        </View>

        {/* Prodile Settings Page */}
        <View style={styles.profileSettings}>
          <TouchableOpacity style={styles.settingsContent} activeOpacity={0.6}>
            <Ionicons
              style={styles.settingsIcon}
              name="camera-outline"
              size={40}
              color="#aaa"
            />
            <Text style={styles.settingsText}>Change display Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsContent} activeOpacity={0.6}>
            <Ionicons
              style={styles.settingsIcon}
              name="person-outline"
              size={40}
              color="#aaa"
            />
            <Text style={styles.settingsText}>Update profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsContent} activeOpacity={0.6}>
            <Ionicons
              style={styles.settingsIcon}
              name="lock-closed-outline"
              size={40}
              color="#aaa"
            />
            <Text style={styles.settingsText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsContent} activeOpacity={0.6}>
            <MaterialCommunityIcons
              style={styles.settingsIcon}
              name="arrow-top-right-bold-box-outline"
              size={40}
              color="#aaa"
            />
            <Text style={styles.settingsText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.notLoggedIn}>
        <Text style={styles.notLoggedInText}> No user logged in.</Text>
        <AppButton
          text="Login in now"
          bgColor={"#FFAA00"}
          textColor={"#fff"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  profile: {
    // padding: 20,
    // alignItems: "center",
  },

  profileTitle: {
    textAlign: "left",
    paddingHorizontal: 30,
    fontSize: 30,
    fontWeight: 500,
    marginVertical: 30,
  },

  profileContainer: {
    paddingHorizontal: 10,
  },

  image: {
    marginTop: 10,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 75,
  },

  textContainer: {
    marginVertical: "5%",
    borderBottomWidth: 2,
  },

  textKey: {
    fontSize: 24,
    padding: 10,
    textAlign: "center",
  },

  textValue: {
    color: "#FFAA00",
    fontWeight: 900,
    textAlign: "center",
  },

  profileSettings: {
    padding: 20,
  },

  settingsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginVertical: 7,
    padding: 10,
  },

  settingsIcon: {
    flex: 1,
  },

  settingsText: {
    flex: 4,
    fontSize: 24,
    fontWeight: 500,
  },

  // Styles for when no user is logged in
  notLoggedIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  notLoggedInText: {
    fontSize: 24,
    marginVertical: 20,
  },
});

export default Profile;
