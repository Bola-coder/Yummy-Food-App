import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useRecipe } from "../context/RecipeContext";
import { useAuth } from "../context/AuthContext";
const recipe1 = require("./../../assets/recipe1.png");

const Bookmark = () => {
  const { addMealToBookmarks } = useRecipe();
  const { user } = useAuth();
  useEffect(() => {
    // addMealToBookmarks(12);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.bookmark}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{user?.username}'s Bookmark</Text>
      <TouchableOpacity style={styles.bookmarkContent} activeOpacity={0.7}>
        <View style={styles.imageContainer}>
          <Image source={recipe1} style={styles.image} />
        </View>
        <View style={styles.text}>
          <Text style={styles.mainText}>Jollof Rice and Chicken</Text>
          <Text style={styles.subText}>Category: "Nigerian Dishes"</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookmarkContent} activeOpacity={0.7}>
        <View style={styles.imageContainer}>
          <Image source={recipe1} style={styles.image} />
        </View>
        <View style={styles.text}>
          <Text style={styles.mainText}>Jollof Rice and Chicken</Text>
          <Text style={styles.subText}>Category: "Nigerian Dishes"</Text>
        </View>
      </TouchableOpacity>
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
