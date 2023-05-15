import * as React from "react";
import { View, Image } from "react-native";
import { Modal, Portal, Menu, Text } from "react-native-paper";

const ModalC = ({ visible, setVisible }) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={showModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../assets/success.gif")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Text variant="labelLarge">Order Request Successfully Sent</Text>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalC;
