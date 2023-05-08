import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const RecipeContext = createContext();

export const useRecipe = () => {
  return useContext(RecipeContext);
};

const RecipeProvider = ({ children }) => {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1";
  const [loading, setLoading] = useState(false);
  // SingleMeal shown on Home Screen
  const [singleMeal, setSingleMeal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);

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

  const getMealDetails = (id) => {
    setLoading(true);
    const url = `${baseUrl}//lookup.php?i=${id}`;
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

    let ingredients = [];
    // let ingredientKey = "";
    for (let i = 1; i <= 20; i++) {
      let ingredientKey = "strIngredient" + i;
      // ingredients.push(mealDetails.ingredientKey);
    }
    console.log("ingredients are: ", ingredients);
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
  };

  return (
    <RecipeContext.Provider value={values}>{children}</RecipeContext.Provider>
  );
};

export default RecipeProvider;
