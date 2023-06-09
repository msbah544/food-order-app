import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Appbar, Button, Avatar, useTheme } from "react-native-paper";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";

const PlaceOrder = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Place Order" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
            {data && data.name}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => decrement(quantity)}
            disabled={quantity == 1 && true}
          >
            <Avatar.Text size={90} label="-" />
          </TouchableOpacity>
          <Avatar.Text size={90} label={`${quantity}`} />
          <TouchableOpacity onPress={() => increment(quantity)}>
            <Avatar.Text size={90} label="+" />
          </TouchableOpacity>
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", paddingVertical: 10 }}
        >
          <Text
            variant="titleLarge"
            style={{
              color: useTheme().colors.secondary,
              fontWeight: "bold",
              //justifyContent: "",
            }}
          >
            Total:{" "}
          </Text>
          <Text
            variant="titleLarge"
            style={{ color: useTheme().colors.primary, fontWeight: "bold" }}
          >
            D{`${originalPrice * quantity}`}
          </Text>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Button onPress={() => addToCart(data)} mode="contained">
            Place Order
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PlaceOrder;
