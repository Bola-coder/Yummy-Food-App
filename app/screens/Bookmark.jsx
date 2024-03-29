import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRecipe } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "../../utils/AsyncStorage";
import IonIcons from "@expo/vector-icons/Ionicons";

const Bookmark = ({ navigation }) => {
  const { bookmarkedRecipes, fetchBookmarkRecipes, bookmarkLoading } =
    useRecipe();
  const [ids, setIds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await AsyncStorage.getObjectData("@userData");
        setIds(res.bookmarks);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    fetchBookmarkRecipes(ids);
  }, [[fetchBookmarkRecipes, ids]]);

  return (
    <ScrollView
      contentContainerStyle={styles.bookmark}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{user?.username}'s Recipes</Text>
      {bookmarkLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} color={"#FFAA00"} />
          <Text style={styles.loadingText}>Loading bookmarked recipes...</Text>
        </View>
      ) : // else statement for the loading conditional
      bookmarkedRecipes.length > 0 ? ( // Nested if to check if there is bookmarked recipes
        bookmarkedRecipes.map((recipe) => (
          <TouchableOpacity
            style={styles.bookmarkContent}
            activeOpacity={0.6}
            key={recipe.idMeal}
            onPress={() =>
              navigation.push("RecipeDetails", { id: recipe.idMeal })
            }
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.image}
              />
            </View>
            <View style={styles.text}>
              <Text style={styles.mainText}>{recipe.strMeal}</Text>
              <Text style={styles.subText}>{recipe.strCategory}</Text>
            </View>
            <View>
              <IonIcons name="trash" size={30} color={"#FFAA00"} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        // Else statement of the nmested ifs
        <View>
          <Text>You haven't bookmarked any recipe yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookmark: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 20,
  },

  loading: {
    flex: 1,
    marginTop: "50%",
  },

  loadingText: {
    fontSize: 24,
    textAlign: "center",
  },

  bookmarkContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  text: {
    flex: 4,
    paddingHorizontal: 10,
  },

  mainText: {
    fontSize: 24,
    fontWeight: 500,
    padding: 5,
  },

  subText: {
    fontSize: 16,
    color: "#FFAA00",
    fontWeight: 500,
    padding: 5,
  },
});

export default Bookmark;
