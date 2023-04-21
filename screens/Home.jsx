import React from "react";
import { View, ScrollView, Image, FlatList } from "react-native";
import {
  Text,
  Appbar,
  useTheme,
  TextInput,
  Card,
  Button,
} from "react-native-paper";

const Home = ({ navigation }) => {
  const canteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const theme = useTheme();
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
              {canteen &&
                canteen.map((foodItem) => (
                  <View key={foodItem}>
                    <Card
                      style={{ marginVertical: 10, padding: 5 }}
                      onPress={() => console.log("navigate to food details")}
                    >
                      <Card.Content>
                        <Text variant="titleLarge">Bread and Cheese</Text>
                      </Card.Content>
                      <Card.Cover source={require("../assets/bread.jpg")} />
                      <Card.Actions style={{}}>
                        <Button mode="outlined">D100</Button>
                      </Card.Actions>
                    </Card>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
