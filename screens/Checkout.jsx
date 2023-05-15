import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import PayAsYouOrder from "../components/PayAsYouOrder";
import PrepaidWallet from "../components/PrepaidWallet";
import ModalC from "../components/ModalC";
import ImagePickerC from "../components/ImagePicker";

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
  const [orderedItems, setOrderedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [prePaidSelected, setPrePaidSelected] = useState(false);
  const [transferSelected, setTransferSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

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
    const q = query(colRef, orderBy("name", "asc"));
    const subscriber = onSnapshot(q, colRef, (snapshot) => {
      const items = [];
      const pay = [];

      snapshot.docs
        .filter((doc) => doc.data().selected == true)
        .map((doc) => {
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

  const placeOrder = () => {
    console.log("ordered");
    const colRef = collection(db, "orderedItems");
    const auth = getAuth();

    orderedItems.forEach((item) => {
      addDoc(colRef, {
        name: `${item.name}`,
        cost: item.cost,
        quantityOrdered: item.quantityOrdered,
        selected: item.selected,
        createdAt: serverTimestamp(),
        studentID: `${auth.currentUser.displayName}`, //#studentID | not name
      });
    });

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      navigation.navigate("orderHistory");
    }, 2000);
    // addDoc(colRef, { total: total });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Checkout" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalC visible={visible} setVisible={setVisible} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{}}>
            {orderedItems.length != 0 ? (
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
                      <Text style={{ fontWeight: "bold", color: "#000080" }}>
                        D{item.cost * item.quantityOrdered}
                      </Text>
                    </View>
                    <View>
                      <Switch
                        value={item.selected}
                        onValueChange={() => handleSelect(item)}
                      />
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        //justifyContent: "space-between",
                        //alignItems: "flex-start",
                      }}
                    >
                      <Chip
                        style={{ width: 40 }}
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
                          marginHorizontal: 3,
                        }}
                      >
                        <Text>{item.quantityOrdered}</Text>
                      </View>
                      <Chip
                        //mode="outlined"
                        style={{ width: 40 }}
                        disabled={item.selected == false}
                        icon="plus-circle-outline"
                        onPress={() => {
                          handleIncrement(item);
                        }}
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
                  source={require("../assets/spinner.gif")}
                />
              </View>
            )}
          </View>
          {orderedItems.length != 0 && (
            <View>
              <Card
                style={{
                  padding: 5,
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Total:</Text>
                  <View
                    style={{
                      width: 100,
                      height: 2,
                      backgroundColor: "#231a97",
                    }}
                  ></View>
                  <Text style={{ fontWeight: "bold" }}>D{total}</Text>
                </View>
              </Card>
              <Card
                style={{ marginTop: 25, padding: 10 }}
                onPress={() => navigation.goBack()}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Add More Items</Text>
                </View>
              </Card>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  mode="contained"
                  onPress={() => placeOrder()}
                  disabled={
                    (prePaidSelected == false && transferSelected == false) ||
                    image == null
                      ? true
                      : false
                  }
                >
                  Place Order
                </Button>
              </View>
              <View>
                <Text variant="headlineSmall">Payment Options</Text>
                <PayAsYouOrder
                  prePaidSelected={prePaidSelected}
                  setPrePaidSelected={setPrePaidSelected}
                  setTransferSelected={setTransferSelected}
                />
                <PrepaidWallet
                  transferSelected={transferSelected}
                  setTransferSelected={setTransferSelected}
                  setPrePaidSelected={setPrePaidSelected}
                />
              </View>
              <View>
                <Text variant="headlineSmall">Attach Receipt</Text>
                <ImagePickerC image={image} setImage={setImage} />
              </View>
            </View>
          )}
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
