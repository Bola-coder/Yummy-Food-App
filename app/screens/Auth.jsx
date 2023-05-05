import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";

const Auth = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const buttonData = [
    {
      id: 1,
      text: "Sign in with Apple",
      bgColor: "#000000",
      textColor: "#fff",
    },
    {
      id: 2,
      text: "Sign in with Facebook",
      bgColor: "#11456A",
      textColor: "#fff",
    },
    {
      id: 3,
      text: "Sign in with Google",
      bgColor: "#2581C3",
      textColor: "#fff",
    },
  ];
  return (
    <View style={styles.authContainer}>
      <Image source={require("./../../assets/Yummy.png")} style={styles.img} />
      <Text style={styles.text}>
        Log in or create an account to save your favourite recipes
      </Text>
      <View style={styles.authBtns}>
        <FlatList
          data={buttonData}
          renderItem={({ item }) => (
            <AppButton
              key={item.id}
              text={item.text}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
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
