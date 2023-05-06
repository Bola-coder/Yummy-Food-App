import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import SearchInput from "../components/SearchInput";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");

const Home = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const categoryUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const navigation = useNavigation();
  const [singleMeal, setSingleMeal] = useState(null);
  const [categories, setCategories] = useState(null);

  // Remove Header ftom Screen
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Fetch Single Meal suing USeEffect
  useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        setSingleMeal(data.data.meals[0]);
        // console.log(singleMeal);
      })
      .catch((err) => {
        console.log("an error occured while fetching single meal data", err);
      });
  }, []);

  //  Fecth categories
  useEffect(() => {
    axios
      .get(categoryUrl)
      .then((data) => {
        setCategories(data.data.categories);
        // console.log(categories);
      })
      .catch((err) => {
        console.log("an error occured while fetching categories", err);
      });
  }, []);

  return (
    <View style={styles.home}>
      {/* Search Input View */}
      <View style={styles.search}>
        <SearchInput />
      </View>
      {/* View for the Big Banner on Home Screen */}
      <TouchableOpacity style={styles.imgContainer} activeOpacity={0.8}>
        <Image source={{ uri: singleMeal?.strMealThumb }} style={styles.img} />
        {/* <Image source={require("./../../assets/food.png")} style={styles.img} /> */}
        <Text style={styles.imgText}>{singleMeal?.strMeal}</Text>
        {/* <Text style={styles.imgText}>Mixed Platter Grill For Two</Text> */}
      </TouchableOpacity>

      {/* View for the trending Meals on Home Screen */}
      <View style={styles.trending}>
        {/* List trneding recipes */}
        <Text style={styles.trendingText}>
          Categories ({categories?.length})
        </Text>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            // width: "100%",
            // overflow: "scroll",
          }}
        > */}
        {/* <RecipeCard img={recipeImageOne} />
          <RecipeCard img={recipeImageTwo} />
          <RecipeCard img={recipeImageOne} />
          <RecipeCard img={recipeImageTwo} /> */}
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <RecipeCard img={item.strCategoryThumb} text={item.strCategory} />
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
    paddingTop: 15,
  },

  search: {
    width: "90%",
  },

  imgContainer: {
    width: "90%",
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
  trending: {
    marginTop: 50,
    width: "90%",
    height: "30%",
  },

  trendingText: {
    fontSize: 30,
    color: "#FFC529",
    fontWeight: 600,
    paddingHorizontal: 10,
  },
});
export default Home;
