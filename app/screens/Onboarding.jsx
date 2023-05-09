import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";

const Onboarding = ({ navigation }) => {
  //   Creating a useEffect to navigate to the Auth Screen after some secinds
  useEffect(() => {
    const onboardingTimeout = setTimeout(() => {
      navigation.replace("Auth");
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
    backgroundColor: "#FFC529",
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
