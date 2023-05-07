import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icons from "@expo/vector-icons/FontAwesome5";
import { useRecipe } from "../context/RecipeContext";
import SearchInput from "../components/SearchInput";
import SearchResultContent from "../components/SearchResultContent";

const SearchResult = () => {
  const navigation = useNavigation();
  const { loading, searchResult, searchMealByName } = useRecipe();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    searchMealByName("soup");
  }, []);

  return (
    <SafeAreaView style={styles.searchResult}>
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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={40} color={"#FFC529"} />
          <Text style={styles.loadingText}>Loading search results...</Text>
        </View>
      ) : (
        /* Content for the search result */
        <SearchResultContent result={searchResult} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100,
  },

  head: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
  },
});
export default SearchResult;
