import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import {
  Text,
  Appbar,
  Card,
  Divider,
  Chip,
  useTheme,
  Switch,
} from "react-native-paper";
import { onSnapshot, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from "@expo-google-fonts/source-sans-pro";

const Checkout = ({ navigation }) => {
  const [orderedItems, setOrderedItems] = useState(null);
  let [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });

  const theme = useTheme();
  useEffect(() => {
    const colRef = collection(db, "menu");
    const subscriber = onSnapshot(colRef, (snapshot) => {
      const items = [];
      // snapshot.docs.filter(() => {
      //  items.push({ ...doc.data(), id: doc.id });
      //});
      snapshot.docs
        .filter((doc) => doc.data().selected == false)
        .map((doc) => {
          items.push({ ...doc.data(), id: doc.id });
        });
      setOrderedItems(items);
      console.log(orderedItems);
    });
    return () => subscriber();
  }, []);

  //toggle select
  const handleSelect = (item) => {
    const docRef = doc(db, "menu", item.id);
    switch (item.selected == true) {
      case true:
        return updateDoc(docRef, {
          selected: false,
        });
      case false:
        return updateDoc(docRef, {
          selected: true,
        });
      default:
        return updateDoc(docRef, {
          selected: item.selected,
        });
    }
  };

  //handle decrement of quantity
  const handleDecrement = (item) => {
    const docRef = doc(db, "menu", item.id);

    updateDoc(docRef, {
      quantityOrdered: item.quantityOrdered - 1,
    });
  };

  //handle increment of quantity
  const handleIncrement = async (item) => {
    const docRef = doc(db, "menu", item.id);

    await updateDoc(docRef, {
      quantityOrdered: item.quantityOrdered + 1,
    });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Checkout" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{}}>
            {orderedItems ? (
              orderedItems.map((item) => (
                <View
                  style={styles.itemContainer}
                  key={item.id}
                  //style={{ padding: 10, marginVertical: 10 }}
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
                      <Text
                        variant="titleMedium"
                        style={{
                          fontFamily:
                            fontsLoaded && "SourceSansPro_600SemiBold",
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={
                        {
                          //backgroundColor: "purple",
                          //height: 5,
                          //width: 100,
                        }
                      }
                    >
                      <Text style={{ fontWeight: "bold", color: "purple" }}>
                        D{item.cost * item.quantityOrdered}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        //alignItems: "flex-start",
                      }}
                    >
                      <Chip
                        disabled={
                          item.quantityOrdered == 1 || item.selected == false
                        }
                        icon="minus-circle-outline"
                        onPress={() => {
                          handleDecrement(item);
                        }}
                      />
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{item.quantityOrdered}</Text>
                      </View>
                      <Chip
                        disabled={item.selected == false}
                        icon="plus-circle-outline"
                        onPress={() => {
                          handleIncrement(item);
                        }}
                      />
                    </View>
                    <View>
                      <Switch
                        value={item.selected}
                        onValueChange={() => handleSelect(item)}
                      />
                    </View>
                  </View>
                  <Divider style={{ paddingVertical: 0.5 }} />
                </View>
              ))
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 100,
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require("../assets/loader.gif")}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    // backgroundColor: "#000080",
    // marginBottom: 70,
  },
});

export default Checkout;
