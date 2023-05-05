import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import RecipeCard from "../components/RecipeCard";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");
const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.home}>
      {/* Search Input View */}
      <KeyboardAvoidingView style={styles.searchInput} behavior="padding">
        <IonIcons
          name="search"
          color={"#F5CC5C"}
          size={30}
          style={styles.inputIcon}
        />
        <TextInput
          type="text"
          placeholder="Search for recipes"
          style={styles.input}
        />
      </KeyboardAvoidingView>

      {/* View for the Big Banner on Home Screen */}
      <TouchableOpacity style={styles.imgContainer} activeOpacity={0.8}>
        <Image source={require("./../../assets/food.png")} style={styles.img} />
        <Text style={styles.imgText}>Mixed Platter Grill For Two</Text>
      </TouchableOpacity>

      {/* View for the trending Meals on Home Screen */}
      <View style={styles.trending}>
        {/* List trneding recipes */}
        <Text style={styles.trendingText}>Trending</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            // width: "100%",
            // overflow: "scroll",
          }}
        >
          <RecipeCard img={recipeImageOne} />
          <RecipeCard img={recipeImageTwo} />
          <RecipeCard img={recipeImageOne} />
          <RecipeCard img={recipeImageTwo} />
        </ScrollView>
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

  searchInput: {
    position: "relative",
    width: "90%",
  },

  inputIcon: {
    position: "absolute",
    left: 16,
    top: "20%",
  },

  input: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#F5CC5C",
    padding: 15,
    textAlign: "center",
    color: "#F5CC5C",
    fontSize: 20,
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
    color: "#fff",
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
