import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Onboarding = ({ navigation }) => {
  const { user } = useAuth();
  //   Creating a useEffect to navigate to the Auth Screen after some secinds
  useEffect(() => {
    const onboardingTimeout = setTimeout(() => {
      if (user == "" || user == null || user == undefined) {
        navigation.replace("Login");
      } else {
        navigation.replace("Main");
      }
    }, 3000);
    return () => clearInterval(onboardingTimeout);
  }, []);

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
