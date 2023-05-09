import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const RecipeCard = ({ img, text, extStyle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.recipeCard, extStyle]}
      onPress={onPress}
    >
      <Image source={{ uri: img }} style={styles.recipeCardImg} />
      {text ? (
        <Text style={styles.recipeText}>
          {text.length > 30 ? `${text.slice(0, 30)}...` : text}
        </Text>
      ) : (
        ""
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: 150,
    height: 155,
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 60,
  },

  recipeCardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  recipeText: {
    fontSize: 20,
    fontWeight: 600,
    paddingTop: 5,
  },
});

export default RecipeCard;
