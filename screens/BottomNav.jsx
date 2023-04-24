import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PlaceOrder from "./PlaceOrder";
import OrderedItems from "./OrderedItems";

const Tab = createBottomTabNavigator();

export default function BottomNav({ navigation }) {
  const [data, setData] = useState();
  const route = useRoute();

  useEffect(() => {
    const result = route.params.item;
    setData(result);
    console.log(result);
  }, []);

  function FDetails() {
    return <PlaceOrder navigation={navigation} data={data} />;
  }

  function OItems() {
    return <OrderedItems navigation={navigation} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Place Order"
        component={FDetails}
        options={{
          tabBarLabel: "Place Order",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart-plus" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Ordered Items"
        component={OItems}
        options={{
          tabBarLabel: "Ordered Items",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
