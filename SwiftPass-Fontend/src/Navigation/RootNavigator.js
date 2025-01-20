import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import MyStack from "./MyStack";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreTokens } from "../features/auth/loginSlice";

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // For initialization loader

  useEffect(() => {
    // Simulate loading or initialization process (e.g., checking Redux state)
    const initializeApp = async () => {
      try {
        // Check if tokens are available in AsyncStorage
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        // If tokens are found, restore them to Redux state
        if (accessToken && refreshToken) {
          dispatch(restoreTokens({ accessToken, refreshToken }));
        }
      } catch (error) {
        console.error("Failed to restore tokens:", error);
      } finally {
        setIsLoading(false); // Stop the loader after initialization
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MyStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
