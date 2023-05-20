import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icons from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "../context/AuthContext";
import ErrorModal from "../components/ErrorModal";

const Login = ({ navigation }) => {
  const { login, authenticated, authLoading, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  useEffect(() => {
    if (authenticated) {
      setEmail("");
      setPassword("");
      navigation.replace("Main");
    }
  }, [authenticated]);

  // const handleBlur = () => {
  //   Keyboard.dismiss();
  // };

  const handleErrorModalClose = () => {
    setError(null);
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      {/* <View style={styles.head}>
        <Icons
          name="arrow-left"
          size={30}
          color="#F5CC5C"
          style={styles.back}
          onPress={() => navigation.goBack()}
        />
      </View> */}
      {/* Modal to display error when there is one */}
      {showError && (
        <ErrorModal
          visible={true}
          messsage={error}
          handleClose={handleErrorModalClose}
        />
      )}
      {/* End of Error Modal */}
      <View style={styles.form}>
        <View style={styles.logo}>
          <Image source={require("./../../assets/Yummy.png")} />
        </View>
        <Text style={styles.formTitle}>Login to Yummy</Text>
        <View style={styles.inputs}>
          <View style={styles.inputGroup}>
            <Icons name="envelope" size={25} color="#aaa" style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              // onBlur={handleBlur}
            />
          </View>
          <View style={styles.inputGroup}>
            <Icons name="lock" size={25} color="#aaa" style={styles.icon} />
            <TextInput
              placeholder="Password"
              secureTextEntry={hidePassword}
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              // onBlur={handleBlur}
            />
            <Icons
              name={hidePassword ? "eye" : "eye-slash"}
              size={25}
              color={"#aaa"}
              style={styles.eyeIcon}
              onPress={() => setHidePassword((prev) => !prev)}
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            { backgroundColor: authLoading ? "#bbb" : "#FFAA00" },
          ]}
          activeOpacity={0.8}
          onPress={() => login(email, password)}
          disabled={authLoading}
        >
          <Text style={styles.btn}>Log In </Text>
        </TouchableOpacity>
        <Text style={styles.optionText}>
          Don't have an account?{" "}
          <Text
            style={styles.optionTextSignIn}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    // padding: 10,
  },
  // head: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 10,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   borderRadius: 6,
  // },

  form: {
    marginTop: "20%",
    alignItems: "center",
  },

  logo: {
    marginTop: 30,
  },

  formTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: "#FFAA00",
  },

  inputs: {
    marginTop: "15%",
    backgroundColor: "yello",
    width: "85%",
  },

  inputGroup: {
    // backgroundColor: "red",
    marginBottom: 40,
    position: "relative",
  },

  icon: {
    position: "absolute",
    top: 10,
    left: 20,
  },

  eyeIcon: {
    position: "absolute",
    top: 10,
    right: 20,
  },

  input: {
    padding: 10,
    borderWidth: 2,
    width: "100%",
    paddingHorizontal: 60,
    paddingVertical: 10,
    fontSize: 20,
    borderRadius: 30,
  },

  forgotPassword: {
    fontSize: 20,
    color: "#aaa",
    fontWeight: 500,
  },

  btnContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "60%",
    borderRadius: 30,
  },

  btn: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 500,
    color: "#fff",
  },

  optionText: {
    marginTop: 40,
    fontSize: 24,
    color: "#aaa",
    fontWeight: 500,
  },

  optionTextSignIn: {
    fontSize: 24,
    color: "#FFAA00",
  },
});
