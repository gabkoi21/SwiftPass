import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authActions";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match");
      return;
    }
    if (
      !formData.fullname ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }
    dispatch(
      registerUser({ ...formData, username: formData.username.toLowerCase() })
    );
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("Login");
    }
    if (error) {
      alert(error);
    }
  }, [success, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullname}
        onChangeText={(text) => handleChange("fullname", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SignUp</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 110,
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
  loginButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
  },
});

export default RegisterScreen;
