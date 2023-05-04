import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Switch, List } from "react-native-paper";

const Prepaid = ({
  prePaidSelected,
  setPrePaidSelected,
  setTransferSelected,
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
            <Text variant="titleMedium">Pre-Paid</Text>
          </View>
          <View>
            <Switch
              value={prePaidSelected}
              onValueChange={() => {
                setPrePaidSelected(!prePaidSelected);
                setTransferSelected(false);
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
              <List.Accordion title="Payment" id="1">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Payment must be done by cash at the shool.
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    After Payment is done. Amount will be sent to the wallet in
                    the order app.
                  </Text>
                </View>
              </List.Accordion>
              <List.Accordion title="Wallet" id="3">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    For any order completed, the cost will be deducted from the
                    Wallet and balance displayed.
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

export default Prepaid;
