import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Switch, List } from "react-native-paper";

const PayAsYouOrder = ({
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
            <Text variant="titleMedium">Pay As You Order</Text>
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
              <List.Accordion title="Mobile App Transfer" id="1">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Via your mobile banking app, you can transfer the order
                    amount into the following bank account and attach evidence
                    of the successful transfer.Please provide your unique
                    student ID when making payment.
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
                    Vista Bank Account # 207-1234-354-110
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

export default PayAsYouOrder;
