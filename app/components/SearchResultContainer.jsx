import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");

const SearchResultContainer = () => {
  return (
    <View style={styles.searchResult}>
      <RecipeCard
        img={recipeImageOne}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageTwo}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageOne}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageTwo}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageOne}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageTwo}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageOne}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageTwo}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageOne}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
      <RecipeCard
        img={recipeImageTwo}
        text="Jollof Rice"
        extStyle={styles.recipe}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // backgroundColor: "green",
  },

  recipe: {
    width: "50%",
    height: 200,
    marginVertical: 30,
    // backgroundColor: "yellow",
  },
});

export default SearchResultContainer;
