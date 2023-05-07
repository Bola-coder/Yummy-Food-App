import React, { useState } from "react";
import { KeyboardAvoidingView, TextInput, StyleSheet } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SearchInput = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const handleInputChange = (textValue) => {
    setQuery(textValue);
  };

  const handleSubmit = () => {
    navigation.push("Search", { query });
    setQuery("");
  };
  return (
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
        autoFocus={false}
        value={query}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSubmit}
        style={styles.input}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    position: "relative",
    width: "100%",
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
    padding: 12,
    textAlign: "center",
    color: "#F5CC5C",
    fontSize: 20,
  },
});
export default SearchInput;
