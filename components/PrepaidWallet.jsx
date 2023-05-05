import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Switch, List } from "react-native-paper";

const PrepaidWallet = ({
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
            <Text variant="titleMedium">Pre Paid Wallet</Text>
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
              <List.Accordion title="Mobile App Deposit" id="1">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Pay any amount into your wallet allowing the value of your
                    orders to be deducted as they are placed. To do this please
                    use your mobile banking app to deposit money into the
                    following bank account and attach evidence of transfer.
                    Please provide your unique student ID when making payment.
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
                    Vista Bank Account # 207-1234-354-110
                  </Text>
                </View>
              </List.Accordion>
              <List.Accordion title="Bank Deposit" id="2">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Pay any amount into your wallet allowing the value of your
                    orders to be deducted as they are placed. To do this please
                    visit the cashier's office on the school premises and
                    deposit money into your wallet. Please provide your unique
                    student ID when making payment.
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
                    Vista Bank Account # 207-1234-354-110
                  </Text>
                </View>
              </List.Accordion>
              <List.Accordion title="In-School Cash Deposit" id="3">
                <View
                  style={{
                    borderLeftWidth: 2,
                    borderLeftColor: "blue",
                    marginLeft: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ marginHorizontal: 5 }}>
                    Pay any amount into your wallet allowing the value of your
                    orders to be deducted as they are placed. To do this please
                    visit any local bank, and deposit money into the following
                    bank account and attach evidence of transfer. Please provide
                    your unique student ID when making payment.
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

export default PrepaidWallet;
