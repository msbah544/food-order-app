import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Menu from "../screens/Menu";
import BottomNav from "../screens/BottomNav";
import Checkout from "../screens/Checkout";
import OrderHistory from "../screens/OrderHistory";

const { Navigator, Screen } = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="welcome" component={Welcome} />
      <Screen name="signup" component={Signup} />
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="menu" component={Menu} />
      <Screen name="bnav" component={BottomNav} />
      <Screen name="checkout" component={Checkout} />
      <Screen name="orderHistory" component={OrderHistory} />
    </Navigator>
  );
};

export { MainStackNavigator };
