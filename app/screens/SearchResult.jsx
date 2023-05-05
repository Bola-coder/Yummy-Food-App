import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const SearchResult = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={styles.searchResult}>
      <Text>Search result Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SearchResult;
