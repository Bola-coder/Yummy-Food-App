import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "@expo/vector-icons/FontAwesome5";
import { useRecipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const CategoryDetails = ({ navigation, route }) => {
  const { loading, categories, categoryMeals, getMealsInCategory } =
    useRecipe();
  const { id } = route.params;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    setCategory(categories.filter((cat) => cat.idCategory === id)[0]);
  }, []);

  useEffect(() => {
    getMealsInCategory(category?.strCategory);
  }, [category]);

  //   Onpress HAndler to navigate to the RecipeDetails Screen when the recipe is clciked
  const handleRecipePress = (meal) => {
    navigation.navigate("RecipeDetails", { id: meal.idMeal });
  };

  return (
    <View style={styles.category}>
      <View style={styles.categoryHead}>
        <Icons
          name="arrow-left"
          size={30}
          color="#F5CC5C"
          style={styles.back}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.categoryTitle}>
          Category: {category?.strCategory}
        </Text>
        <Image
          source={{ uri: category?.strCategoryThumb }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryDescription}>
          Description:{" "}
          <Text style={styles.categpryDesc}>
            {" "}
            {category?.strCategoryDescription}
          </Text>
        </Text>
        <View style={styles.categoryMeals}>
          <Text style={styles.categoryMealsTitle}>Meals in this category</Text>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FFAA00" />
            </View>
          ) : (
            <FlatList
              horizontal
              data={categoryMeals}
              renderItem={({ item }) => (
                <RecipeCard
                  img={item.strMealThumb}
                  text={item.strMeal}
                  onPress={() => handleRecipePress(item)}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 10,
    // paddingBottom: 50,
  },

  categoryHead: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scrollContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },

  categoryTitle: {
    fontSize: 30,
    fontWeight: 500,
  },

  categoryImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },

  categoryDescription: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 20,
  },

  categpryDesc: {
    fontWeight: 300,
  },

  categoryMeals: {
    marginTop: 30,
  },

  categoryMealsTitle: {
    fontSize: 30,
    color: "#FFAA00",
    fontWeight: 700,
    marginBottom: 10,
  },

  loading: {
    marginTop: "20%",
  },
});

export default CategoryDetails;
