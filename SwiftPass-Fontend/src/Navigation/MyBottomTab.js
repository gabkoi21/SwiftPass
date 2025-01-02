import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

// Screen imports
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import LogoutScreen from "../Screens/LogoutScreen";

const MyTabs = createBottomTabNavigator();

const MyBottomTab = () => {
  return (
    <MyTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Profile") iconName = "user";
          else if (route.name === "Logout") iconName = "sign-out";
          return (
            <FontAwesome
              name={iconName}
              color={color}
              size={size || 24}
              style={focused ? { shadowOpacity: 0.5 } : { shadowOpacity: 0 }}
            />
          );
        },
        tabBarActiveTintColor: "#04041D",
        tabBarInactiveTintColor: "#000",
      })}
    >
      <MyTabs.Screen name="Home" component={HomeScreen} />
      <MyTabs.Screen name="Profile" component={ProfileScreen} />
      <MyTabs.Screen name="Logout" component={LogoutScreen} />
    </MyTabs.Navigator>
  );
};

export default MyBottomTab;
