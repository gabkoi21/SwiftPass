import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LogoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LogoutScreen;
