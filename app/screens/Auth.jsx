import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import AppButton from "../components/AppButton";

const Auth = ({ navigation }) => {
  const signInWithEmail = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.authContainer}>
      <Image source={require("./../../assets/Yummy.png")} style={styles.img} />
      <Text style={styles.text}>
        Log in or create an account to save your favourite recipes
      </Text>
      <View style={styles.authBtns}>
        <AppButton
          text={"Sign in with Facebook"}
          bgColor={"#11456A"}
          textColor={"#fff"}
        />
        <AppButton
          text={"Sign in with Google"}
          bgColor={"#2581C3"}
          textColor={"#fff"}
        />
        <AppButton
          text={"Sign in with Email"}
          bgColor={"#000000"}
          textColor={"#fff"}
          onPress={signInWithEmail}
        />
      </View>
      <Text style={styles.skipText} onPress={() => navigation.navigate("Main")}>
        Maybe later
      </Text>
      <View style={styles.foot}>
        <Text style={styles.footText}>
          By sigining up, you are agreeing to our{" "}
          <Text style={styles.blueText}>UserAgreement</Text> and{" "}
          <Text style={styles.blueText}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    backgroundColor: "#FFC529",
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  img: {
    // marginHorizontal: "25%",
    marginVertical: "15%",
  },
  text: {
    width: "90%",
    fontSize: 30,
    textAlign: "center",
    color: "#52504C",
    fontWeight: 500,
  },
  authBtns: {
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  skipText: {
    fontSize: 24,
    color: "#000",
    fontWeight: 700,
  },

  foot: {
    marginTop: 100,
    width: "90%",
  },

  footText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: 500,
  },

  blueText: {
    color: "#026FEF",
  },
});

export default Auth;
