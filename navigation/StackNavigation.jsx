import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Home from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="welcome" component={Welcome} />
      <Screen name="signup" component={Signup} />
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
    </Navigator>
  );
};

export { MainStackNavigator };
