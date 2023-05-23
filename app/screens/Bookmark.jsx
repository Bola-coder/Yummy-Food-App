import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecipe } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "../../utils/AsyncStorage";
const Bookmark = ({ navigation }) => {
  const { bookmarkedRecipes, fetchBookmarkRecipes, bookmarkLoading } =
    useRecipe();
  const [ids, setIds] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await AsyncStorage.getObjectData("@userData");
        console.log("Heyy", res);
        setIds(res.bookmarks);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    console.log("The ids fetching for are: ", ids);
    fetchBookmarkRecipes(ids);
  }, [ids]);

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
      ) : (
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
          </TouchableOpacity>
        ))
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
