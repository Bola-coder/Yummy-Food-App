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
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useRecipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import SearchInput from "../components/SearchInput";

const Home = ({ navigation }) => {
  // const { user } = useAuth();
  const {
    loading,
    singleMeal,
    categories,
    getSingleRecipe,
    getMealcategories,
  } = useRecipe();
  const [refreshing, setRefreshing] = useState(false);

  // Handler for when the page is refreshed
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSingleRecipe();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
        // The Content page from the single recipe up to the category menu
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
        >
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
        </ScrollView>
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
    alignItems: "center",
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
    minHeight: "100%",
    width: "100%",
    paddingHorizontal: "5%",
  },

  imgContainer: {
    backgroundColor: "green",
    width: "100%",
    height: "50%",
    marginTop: 30,
    alignContent: "center",
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
    marginTop: 30,
    width: "100%",
    minHeight: "100%",
  },

  categoryText: {
    fontSize: 30,
    color: "#FFC529",
    fontWeight: 600,
    paddingHorizontal: 10,
  },
});
export default Home;
