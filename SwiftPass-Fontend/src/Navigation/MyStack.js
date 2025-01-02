import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyBottomTab from "./MyBottomTab";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MyBottomTab} />
    </Stack.Navigator>
  );
};

export default MyStack;
