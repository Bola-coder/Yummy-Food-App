import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRecipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import SearchInput from "../components/SearchInput";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");

const Home = ({ navigation }) => {
  // const navigation = useNavigation();
  const {
    loading,
    singleMeal,
    categories,
    getSingleRecipe,
    getMealcategories,
  } = useRecipe();

  // Remove Header ftom Screen
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Fetch Single Recipe and Meal Categories
  useEffect(() => {
    getSingleRecipe();
    getMealcategories();
  }, []);

  // OnPress Handler for the catgory cards
  const onCategoryCardPress = (category) => {
    navigation.navigate("CategoryDetails", { id: category.idCategory });
  };

  return (
    <SafeAreaView style={styles.home}>
      {/* Search Input View */}
      <View style={styles.search}>
        <SearchInput />
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={40} color={"#FFC529"} />
          <Text style={styles.loadingText}>Loading Recipe...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {/* View for the Big Banner on Home Screen */}
          <TouchableOpacity
            style={styles.imgContainer}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("RecipeDetails", { id: singleMeal.idMeal })
            }
          >
            <Image
              source={{ uri: singleMeal?.strMealThumb }}
              style={styles.img}
            />
            <Text style={styles.imgText}>{singleMeal?.strMeal}</Text>
          </TouchableOpacity>

          {/* View for the trending Meals on Home Screen */}
          <View style={styles.category}>
            {/* List trneding recipes */}
            <Text style={styles.categoryText}>
              Categories ({categories?.length})
            </Text>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <RecipeCard
                  img={item.strCategoryThumb}
                  text={item.strCategory}
                  onPress={() => onCategoryCardPress(item)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 20,
              }}
            />
            {/* </ScrollView> */}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 15,
  },

  search: {
    width: "90%",
  },

  loading: {
    flex: 1,
    marginTop: "50%",
  },

  loadingText: {
    fontSize: 24,
  },

  content: {
    height: "100%",
    width: "90%",
  },

  imgContainer: {
    backgroundColor: "green",
    // width: "90%",
    height: "50%",
    marginTop: 30,
    backgroundColor: "#eee",
    position: "relative",
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  imgText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    fontSize: 45,
    fontWeight: 700,
    color: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontFamily: "Roboto",
  },
  category: {
    marginTop: 50,
    width: "100%",
    height: "30%",
  },

  categoryText: {
    fontSize: 30,
    color: "#FFC529",
    fontWeight: 600,
    paddingHorizontal: 10,
  },
});
export default Home;
