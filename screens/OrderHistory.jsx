import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  Appbar,
  Card,
  Divider,
  Chip,
  useTheme,
  Switch,
  Button,
} from "react-native-paper";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  orderBy,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

const OrderHistory = ({ navigation }) => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [total, setTotal] = useState(0);

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
    const colRef = collection(db, "orderedItems");
    const authRef = getAuth();
    const q = query(colRef, orderBy("name", "asc"));
    const subscriber = onSnapshot(q, colRef, (snapshot) => {
      const items = [];
      const pay = [];

      const val = authRef.currentUser.displayName;

      //console.log("authRef", `${authRef.currentUser.displayName}`);
      const data = snapshot.docs.filter((doc) => doc.data().studentID == val);

      //snapshot.docs
      //.filter((doc) => {
      //  doc.data().quantityOrdered == 1;
      //})
      data.map((doc) => {
        items.push({ ...doc.data(), id: doc.id });
        //populate the pay array with cost of each selected item
        pay.push(doc.data().cost * doc.data().quantityOrdered);
      });
      setOrderedItems(items);
      console.log(orderedItems);

      //calculate cost
      if (pay.length != 0) {
        const result = pay.reduce((a, b) => {
          return a + b;
        });
        setTotal(result);
      }
      console.log(total);
    });

    return () => subscriber();
  }, []);

  //delete Item
  const deleteItem = async (item) => {
    console.log(item.createdAt);
    const docRef = doc(db, "orderedItems", item.id);

    await deleteDoc(docRef);
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Order History" />
        <Appbar.Action icon="cart-outline" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{}}>
            {orderedItems.length != 0 ? (
              orderedItems.map((item) => (
                <Card
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
                      <Text style={{ fontWeight: "bold", color: "#000080" }}>
                        cost: D{item.cost * item.quantityOrdered}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        //justifyContent: "space-between",
                        //alignItems: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginHorizontal: 3,
                        }}
                      >
                        <Text>quantity: {item.quantityOrdered}</Text>
                      </View>
                      <TouchableOpacity
                        style={{ padding: 5 }}
                        onPress={() => deleteItem(item)}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={24}
                          color={theme.colors.error}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text>
                      {JSON.stringify(item.createdAt.toDate())
                        .replace(/['"]+/g, "")
                        .split()}
                    </Text>
                  </View>
                </Card>
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
                  source={require("../assets/spinner.gif")}
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
    backgroundColor: "#fff",
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

export default OrderHistory;
