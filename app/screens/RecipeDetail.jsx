import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Icons from "@expo/vector-icons/FontAwesome5";
import { useRecipe } from "../context/RecipeContext";

const RecipeDetail = ({ navigation, route }) => {
  const { loading, mealDetails, getMealDetails } = useRecipe();
  const { id } = route.params;

  useEffect(() => {
    getMealDetails(id);
  }, []);

  return (
    <View style={styles.details}>
      <View style={styles.detailsHead}>
        <Icons
          name="arrow-left"
          size={30}
          color="#F5CC5C"
          style={styles.back}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.rightIcons}>
          <Icons name="share-alt" size={30} color="#F5CC5C" />
          <Icons name="bookmark" size={30} color="#F5CC5C" />
        </View>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} color={"#FFAA00"} />
          <Text style={styles.loadingText}>Loading Recipe Details...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{mealDetails?.strMeal}</Text>
          <Text style={styles.subTitle}>
            Category: {mealDetails?.strCategory}
          </Text>
          <Image
            source={{ uri: mealDetails?.strMealThumb }}
            style={styles.detailsImage}
          />
          <Text style={styles.tags}>Tags: {mealDetails?.strTags}</Text>
          <Text style={styles.recipe}>How to Prepare</Text>
          <Text style={styles.recipeContent}>
            {mealDetails?.strInstructions}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 100,
  },

  detailsHead: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightIcons: {
    flexBasis: "30%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  loading: {
    flex: 1,
    marginTop: "50%",
  },

  loadingText: {
    fontSize: 24,
  },

  scrollContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 35,
    fontWeight: 700,
  },

  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },

  detailsImage: {
    width: "100%",
    height: 400,
    marginVertical: 20,
    borderRadius: 6,
  },

  tags: {
    fontSize: 20,
    color: "#FFAA00",
    fontWeight: 500,
    marginBottom: 30,
  },

  recipe: {
    fontSize: 30,
    color: "#FFAA00",
    fontWeight: 700,
    marginVertical: 10,
  },

  recipeContent: {
    fontSize: 20,
    marginBottom: 30,
  },
});

export default RecipeDetail;
