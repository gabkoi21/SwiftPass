import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./AuthStack";
import Mystack from "./MyStack";

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <Mystack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
