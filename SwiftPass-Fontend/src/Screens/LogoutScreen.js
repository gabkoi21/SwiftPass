import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const LogoutScreen = () => {
  const { logout } = useSelector((state) => state.login);
  const dispatch = useDispatch;
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
