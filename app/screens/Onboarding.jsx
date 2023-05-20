import { View, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "../../utils/AsyncStorage";

const Onboarding = ({ navigation }) => {
  const { user, setUser } = useAuth();

  // A useeffect to see if user is logged in by fettching user detauils from AsyncStorage
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await AsyncStorage.getObjectData("@userData");
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  //   Creating a useEffect to navigate to the Home screen is user is logged in or to the login screen is user is not logged in
  useEffect(() => {
    const onboardingTimeout = setTimeout(() => {
      if (
        user?.email == "" ||
        user?.email == null ||
        user?.email == undefined
      ) {
        navigation.replace("Login");
      } else {
        navigation.replace("Main");
      }
    }, 3000);
    return () => clearTimeout(onboardingTimeout);
  }, [user]);

  return (
    <View style={styles.onboarding}>
      <Image source={require("./../../assets/Yummy.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  onboarding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFC529",
    height: "100%",
    width: "100%",
  },
});

export default Onboarding;
