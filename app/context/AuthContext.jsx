import React, { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "./../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
      }
    });
    return () => unsuscribe;
  }, []);

  //   Function to handle Signup
  const signup = (email, password) => {
    setAuthLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
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
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
