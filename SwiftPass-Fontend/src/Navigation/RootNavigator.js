import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import MyStack from "./MyStack";

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.login);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MyStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
