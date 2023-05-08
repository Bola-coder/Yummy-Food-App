import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");

const SearchResultContent = ({ result }) => {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.searchResult}>
        {result?.map((item) => (
          <RecipeCard
            key={item.idMeal}
            img={item.strMealThumb}
            text={item.strMeal}
            extStyle={styles.recipe}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // backgroundColor: "green",
    paddingHorizontal: 10,
    // marginTop: 20,
  },

  recipe: {
    width: "50%",
    height: 180,
  },
});

export default SearchResultContent;
