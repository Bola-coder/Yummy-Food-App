// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeProvider from "./app/context/RecipeContext";
import Onboarding from "./app/screens/Onboarding";
import Auth from "./app/screens/Auth";
import Home from "./app/screens/Home";
import SearchResult from "./app/screens/SearchResult";
import MainContainer from "./app/components/MainContainer";
import RecipeDetail from "./app/screens/RecipeDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RecipeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen
              name="Main"
              component={MainContainer}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Search" component={SearchResult} />
            <Stack.Screen name="RecipeDetails" component={RecipeDetail} />
            {/* <Stack.Screen name="Search" component={SearchResult} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </RecipeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
