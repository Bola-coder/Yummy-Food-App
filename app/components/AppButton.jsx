import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const AppButton = ({ text, bgColor, textColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bgColor }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    backgroundColor: "blue",
    borderRadius: 6,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  btnText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 500,
  },
});

export default AppButton;
