import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Appbar,
  Card,
  Divider,
  Chip,
  useTheme,
} from "react-native-paper";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase.config";

const OrderedItems = ({ navigation }) => {
  const [orderedItems, setOrderedItems] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    const colRef = collection(db, "cart");
    const subscriber = onSnapshot(colRef, (snapshot) => {
      const items = [];
      snapshot.docs.map((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setOrderedItems(items);
      console.log(orderedItems);
    });
    return () => subscriber();
  }, []);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ordered Items" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{}}>
            {orderedItems &&
              orderedItems.map((item) => (
                <Card key={item.id} style={{ padding: 20, marginVertical: 10 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: 100 }}>
                      <Text variant="titleMedium">{item.name}</Text>
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
                    <Text variant="labelSmall">Category: {item.category}</Text>
                  </View>
                  <View style={{ paddingVertical: 5 }}>
                    <Divider style={{ paddingVertical: 1 }} />
                  </View>
                  <View>
                    <Text variant="labelLarge">
                      Quantity Ordered: {item.orderQuantity}
                    </Text>
                  </View>
                  <View>
                    <Text variant="labelLarge">
                      Transaction Status: {`Pending`}
                    </Text>
                  </View>
                  <View style={{ paddingVertical: 5 }}>
                    <Chip
                      style={{
                        borderColor: theme.colors.error,
                        borderWidth: 1,
                      }}
                      icon="delete"
                      elevated={true}
                      onPress={() => console.log("Pressed")}
                    >
                      Cancel Order
                    </Chip>
                  </View>
                </Card>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderedItems;
