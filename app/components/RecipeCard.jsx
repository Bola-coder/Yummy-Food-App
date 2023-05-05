import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const RecipeCard = ({ img }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.recipeCard}>
      <Image source={img} style={styles.recipeCardImg} />
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
});

export default RecipeCard;
