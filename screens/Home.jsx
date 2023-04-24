import React from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Appbar,
  useTheme,
  TextInput,
  Card,
  Button,
  Divider,
} from "react-native-paper";
import { store } from "../foodItems";

const Home = ({ navigation }) => {
  //const canteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const theme = useTheme();

  const navigateToDetails = (item) => {
    navigation.navigate("bnav", { item: item });
  };
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.secondary }}
            >
              Hi, John
            </Text>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              Hungry Now?
            </Text>
          </View>
          <View style={{ paddingVertical: 30 }}>
            <TextInput
              placeholder="Find Your Food ..."
              left={<TextInput.Icon icon="magnify" />}
              mode="outlined"
            />
          </View>
          <View>
            <View>
              <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                Menu
              </Text>
            </View>
            <View>
              <View style={{}}>
                {store &&
                  store.map((item) => (
                    <Card
                      key={item.title}
                      style={{ padding: 20, marginVertical: 10 }}
                      onPress={() => navigateToDetails(item)}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: 100 }}>
                          <Text variant="titleMedium">{item.title}</Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: "purple",
                            height: 5,
                            width: 100,
                          }}
                        >
                          <Text style={{ fontWeight: "bold", color: "purple" }}>
                            --------------
                          </Text>
                        </View>
                        <View>
                          <Text variant="titleMedium">D{item.cost}</Text>
                        </View>
                      </View>
                      <View>
                        <Text variant="labelSmall">
                          Category: {item.category}
                        </Text>
                      </View>
                    </Card>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
