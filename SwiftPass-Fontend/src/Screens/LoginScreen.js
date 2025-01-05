import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../features/auth/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.login
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save user info to AsyncStorage when success is true
  useEffect(() => {
    const saveUserInfoToStorage = async () => {
      try {
        if (success && userInfo) {
          await AsyncStorage.setItem("userInfor", JSON.stringify(userInfo));
          console.log("User information saved to AsyncStorage:", userInfo);
        }
      } catch (error) {
        console.error("Error saving user information to AsyncStorage:", error);
      }
    };

    saveUserInfoToStorage();
  }, [success, userInfo]);

  const handleLogin = () => {
    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Attempting to log in with:", formData);

    dispatch(
      loginUser({
        username: formData.username.toLowerCase(),
        password: formData.password,
      })
    )
      .then((response) => {
        console.log("Login dispatched:", response);
      })
      .catch((err) => {
        console.error("Error during login:", err);
      });
  };

  // Check for existing user info in AsyncStorage
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfor");
        if (storedUserInfo) {
          console.log(
            "User found in AsyncStorage:",
            JSON.parse(storedUserInfo)
          );
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error(
          "Error retrieving user information from AsyncStorage:",
          error
        );
      }
    };

    checkUserLogin();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: 330,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#04041D",
    padding: 14,
    borderRadius: 3,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  errorText: {
    marginTop: 12,
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  activityIndicator: {
    marginTop: 45,
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default LoginScreen;
