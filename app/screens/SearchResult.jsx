import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/FontAwesome5";
import SearchInput from "../components/SearchInput";
import RecipeCard from "../components/RecipeCard";
import SearchResultContainer from "../components/SearchResultContainer";
const recipeImageOne = require("./../../assets/recipe1.png");
const recipeImageTwo = require("./../../assets/recipe2.png");

const SearchResult = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.searchResult}>
      {/* Top Row of Icons and Search Input */}
      <View style={styles.head}>
        <Icons
          name="arrow-left"
          color="#F5CC5C"
          size={30}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.serachInput}>
          <SearchInput />
        </View>
        <Icons
          name="list"
          color="#f5CC5C"
          size={25}
          style={styles.filterIcon}
        />
      </View>
      {/* End of Top Row of Icons and Search Input */}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <SearchResultContainer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    flex: 1,
    paddingTop: 20,
  },

  head: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  backIcon: {
    flexBasis: "10%",
    paddingHorizontal: 5,
  },

  serachInput: {
    flexBasis: "75%",
  },

  filterIcon: {
    flexBasis: "10%",
    paddingHorizontal: 5,
  },

  scrollViewContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    // backgroundColor: "red",
  },
});
export default SearchResult;
