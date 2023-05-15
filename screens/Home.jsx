import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, Appbar, Card } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Home" />
        <Appbar.Action
          icon="account-outline"
          //onPress={() => navigateToProfile()}
        ></Appbar.Action>
      </Appbar.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={{ position: "relative" }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 20,
            }}
          >
            <Card
              onPress={() => navigation.navigate("menu")}
              style={{
                marginVertical: 10,
                padding: 40,
                backgroundColor: "#231a97",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/food-menu-white.png")}
                  style={{}}
                />
                <Text variant="titleSmall" style={{ color: "white" }}>
                  MENU
                </Text>
              </View>
            </Card>
            <Card
              //disabled={true}
              onPress={() => navigation.navigate("orderHistory")}
              style={{
                marginVertical: 10,
                padding: 40,
                backgroundColor: "#231a97",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/cart-white.png")}
                  style={{}}
                />
                <Text variant="titleSmall" style={{ color: "white" }}>
                  ORDER
                </Text>
                <Text variant="titleSmall" style={{ color: "white" }}>
                  HISTORY
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
