import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Switch, List } from "react-native-paper";

const Transfer = ({
  transferSelected,
  setTransferSelected,
  setPrePaidSelected,
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <View style={{ paddingVertical: 20 }}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: "#231a97",
                marginRight: 3,
              }}
            ></View>
            <Text variant="titleMedium">Bank Transfer</Text>
          </View>
          <View>
            <Switch
              value={transferSelected}
              onValueChange={() => {
                setTransferSelected(!transferSelected);
                setPrePaidSelected(false);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? (
            <Text
              style={{
                color: "#231a97",
                textDecorationLine: "underline",
              }}
              variant="titleMedium"
            >
              Hide Instructions
            </Text>
          ) : (
            <Text
              style={{
                color: "#231a97",
                textDecorationLine: "underline",
              }}
              variant="titleMedium"
            >
              See Instructions
            </Text>
          )}
        </TouchableOpacity>
        {showInstructions && (
          <View>
            <List.AccordionGroup>
              <List.Accordion title="Mobile Transfer" id="1">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Pay with your Banking Mobile App e.g GTBank Mobile App,
                    Ecobank Mobile App, e.t.c..
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    //marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    After Transaction Is Complete, Keep the Receipt in a safe
                    place as it will be needed later for proof of pay.
                  </Text>
                </View>
              </List.Accordion>
              <List.Accordion title="Cash Deposit" id="2">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Pay By Depositing Cash At The Bank.
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    //marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    After Transaction Is Complete, Keep the Receipt in a safe
                    place as it will be needed later for proof of pay.
                  </Text>
                </View>
              </List.Accordion>
            </List.AccordionGroup>
          </View>
        )}
      </View>
    </View>
  );
};

export default Transfer;
