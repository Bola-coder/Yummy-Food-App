import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import AsyncStorage from "../../utils/AsyncStorage";

const RecipeContext = createContext();

export const useRecipe = () => {
  return useContext(RecipeContext);
};

const RecipeProvider = ({ children }) => {
  const { user } = useAuth();
  const colRef = collection(db, "users");
  const baseUrl = "https://www.themealdb.com/api/json/v1/1";
  const [loading, setLoading] = useState(false);
  // SingleMeal shown on Home Screen
  const [singleMeal, setSingleMeal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  //   Fetch the data for the single meal shown on the Home Screen
  const getSingleRecipe = () => {
    setLoading(true);
    const url = `${baseUrl}/random.php`;
    axios
      .get(url)
      .then((data) => {
        setSingleMeal(data.data?.meals[0]);
      })
      .catch((err) => {
        console.log("An error occured while fetching single meal data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Fecth Meal Categories
  const getMealcategories = () => {
    const url = `${baseUrl}/categories.php`;
    setLoading(true);
    axios
      .get(url)
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch((err) => {
        console.log("an error occured while fetching categories", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Search for a meal by name
  const searchMealByName = (name) => {
    const url = `${baseUrl}/search.php?s=${name}`;
    setLoading(true);
    axios
      .get(url)
      .then((data) => {
        setSearchResult(data.data.meals);
        console.log(searchResult);
      })
      .catch((err) => {
        console.log("an error occured while fetching single meal data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Get Meal Details
  const getMealDetails = (id) => {
    setLoading(true);
    const url = `${baseUrl}/lookup.php?i=${id}`;
    axios
      .get(url)
      .then((data) => {
        setMealDetails(data.data.meals[0]);
        // console.log(mealDetails);
      })
      .catch((err) => {
        console.log("An error occured when fetching meal details", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // let ingredients = [];
    // let ingredientKey = "";
    for (let i = 1; i <= 20; i++) {
      let ingredientKey = "strIngredient" + i;
      // ingredients.push(mealDetails.ingredientKey);
    }
    // console.log("ingredients are: ", ingredients);
  };

  // Get the meals in a category
  const getMealsInCategory = (categoryName) => {
    setLoading(true);
    const url = `${baseUrl}/filter.php?c=${categoryName}`;
    axios
      .get(url)
      .then((data) => {
        setCategoryMeals(data.data.meals);
        // console.log(mealDetails);
      })
      .catch((err) => {
        console.log("An error occured when fetching category meals", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Add meal with the specified ID to the bookmark in firebase
  const addMealToBookmarks = async (mealID) => {
    let docId = "";
    const userDocQuery = query(colRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(userDocQuery);

    querySnapshot.docs.forEach((doc) => {
      docId = doc.id;
    });

    const docRef = doc(db, "users", docId);
    updateDoc(docRef, {
      bookmarks: arrayUnion(mealID),
    })
      .then(() => {
        getDoc(docRef)
          .then(async (doc) => {
            const localUser = await AsyncStorage.getObjectData("@userData");
            localUser.bookmarks = doc.data().bookmarks;
            AsyncStorage.storeData("@userData", localUser);
            console.log("Meal successfully added to bookmark");
          })
          .catch((err) => {
            console.log("Error while adding meal to bookmark", err);
          });
      })
      .catch((err) => {
        console.log("Error while adding meal to bookmark", err);
      });
  };

  // Fetched the data for the bookmarked recipes
  const fetchBookmarkRecipes = (mealIds) => {
    setBookmarkLoading(true);
    setBookmarkedRecipes([]);
    for (id of mealIds) {
      console.log(id);
      const url = `${baseUrl}/lookup.php?i=${id}`;
      axios
        .get(url)
        .then((data) => {
          setBookmarkedRecipes((prev) => [data.data.meals[0], ...prev]);
        })
        .catch((err) => {
          console.log("An error occured when fetching bookmark recipes", err);
        })
        .finally(() => {
          setBookmarkLoading(false);
        });
    }
  };
  const values = {
    loading,
    singleMeal,
    getSingleRecipe,
    categories,
    getMealcategories,
    searchResult,
    searchMealByName,
    mealDetails,
    getMealDetails,
    categoryMeals,
    getMealsInCategory,
    bookmarkLoading,
    addMealToBookmarks,
    bookmarkedRecipes,
    fetchBookmarkRecipes,
  };

  return (
    <RecipeContext.Provider value={values}>{children}</RecipeContext.Provider>
  );
};

export default RecipeProvider;
