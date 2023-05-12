import React, { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const colRef = collection(db, "users");

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setAuthenticated(true);
        getUserDataFromDB(currUser);
        // setUser(currUser);
        console.log("Userrrr", user);
      }
    });
    return () => unsuscribe;
  }, []);

  // Functiomn to save user to database
  const saveUserToDB = (user) => {
    let userExist;
    console.log("Working!!");
    getDocs(colRef)
      .then((snapshot) => {
        userExist = snapshot.docs.some((doc) => {
          return doc.data().email === user.email;
        });
      })
      .then(() => {
        console.log(userExist);
        if (!userExist) {
          addDoc(colRef, {
            email: user.email,
            username: user.username,
            bookmarks: [],
          })
            .then(() => {
              console.log("User profile created successfully");
            })
            .catch((err) => {
              console.log("Error when creating user profile", err);
            });
        } else {
          console.log(`User with email ${user.email} already exist`);
        }
      })
      .catch((err) => {
        console.log("Error when getting users from db", err);
      });
  };

  const getUserDataFromDB = (user) => {
    let activeUser;
    getDocs(colRef)
      .then((snapshot) => {
        activeUser = snapshot.docs.find((doc) => {
          return doc.data().email === user.email;
        });
      })
      .then(() => {
        setUser(activeUser.data());
      })
      .catch((err) => {
        console.log("Error fetching currently logged in user profile", err);
      });
  };

  //   Function to handle Signup
  const signup = (username, email, password) => {
    setAuthLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        userCredentials.user.displayName = username;
        let curuser = { email, username };
        saveUserToDB(curuser);
      })
      .catch((err) => {
        console.log("An error occured during sign up", err);
        setError(err.message);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  // Fucntion to handle Login
  const login = (email, password) => {
    setAuthLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
      })
      .catch((err) => {
        console.log("An error occured during log in", err);
        setError(err.message);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const values = {
    user,
    signup,
    login,
    error,
    authLoading,
    authenticated,
    saveUserToDB,
    getUserDataFromDB,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
