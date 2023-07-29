// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeProvider from "./app/context/RecipeContext";
import Onboarding from "./app/screens/Onboarding";
import Auth from "./app/screens/Auth";
// import Home from "./app/screens/Home";
import SearchResult from "./app/screens/SearchResult";
import MainContainer from "./app/components/MainContainer";
import RecipeDetail from "./app/screens/RecipeDetail";
import CategoryDetails from "./app/screens/CategoryDetails";
import Signup from "./app/screens/Signup";
import Login from "./app/screens/Login";
import AuthProvider from "./app/context/AuthContext";
import AsyncStorage from "./utils/AsyncStorage";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();
export default function App() {
  // useEffect(() => {
  //   const clear = () => {
  //     AsyncStorage.deleteDataFromStorage("@userData")
  //       .then(() => {
  //         console.log("Done clearing");
  //       })
  //       .catch((err) => {
  //         console.log("Error occured when clearing data", err);
  //       });
  //   };
  //   clear();
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <RecipeProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={MainContainer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={SearchResult}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecipeDetails"
                component={RecipeDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CategoryDetails"
                component={CategoryDetails}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RecipeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
