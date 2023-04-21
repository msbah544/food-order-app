import React from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";

const Welcome = ({ navigation }) => {
  const dimensions = Dimensions.get("screen");
  const imageHeight = Math.round(dimensions.height);
  const imageWidth = dimensions.width;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/welcomeImage.jpg")}
        style={{
          height: imageHeight,
          width: imageWidth,
          //position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            //alignItems: "center",
            //justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              //alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "white" }}
              variant="displaySmall"
            >
              Welcome
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "white" }}
              variant="displaySmall"
            >
              Place your order now!
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => navigation.navigate("signup")}
              mode="contained"
              style={{
                width: dimensions.width - 50,
                marginBottom: 10,
                padding: 6,
              }}
            >
              Signup
            </Button>
            <Button
              onPress={() => navigation.navigate("login")}
              mode="elevated"
              style={{ width: dimensions.width - 50, padding: 6 }}
            >
              Login
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Welcome;
