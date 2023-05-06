import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const RecipeCard = ({ img, text, extStyle }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.recipeCard, extStyle]}>
      <Image source={{ uri: img }} style={styles.recipeCardImg} />
      <Text style={styles.recipeText}>{text ? text : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: 150,
    height: 155,
    paddingHorizontal: 10,
  },

  recipeCardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  recipeText: {
    fontSize: 24,
    fontWeight: 600,
    paddingTop: 5,
  },
});

export default RecipeCard;
