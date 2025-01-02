import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "../features/AuthFlow/authSlice";

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = () => {
    const userInfo = { user: "John", token: "1234" };

    const inputUserInfo = { user: username.trim(), token: password.trim() };

    if (
      inputUserInfo.user === userInfo.user &&
      inputUserInfo.token === userInfo.token
    ) {
      dispatch(login(userInfo));
      try {
        navigation.navigate("Home");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    } else {
      console.error("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 85,
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 17 }}>Don't have an account? </Text>
        <Pressable>
          <Text style={{ fontSize: 17 }}>Register</Text>
        </Pressable>
      </View>
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
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
    marginTop: 60,
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
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default LoginScreen;
