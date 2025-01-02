import React from "react";
import { Provider } from "react-redux";
import store from "./src/store"; // Adjust the path to your store
import RootNavigator from "./src/Navigation/RootNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
