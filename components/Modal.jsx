import * as React from "react";
import { Modal, Portal, Menu } from "react-native-paper";

const Modal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closeMenu}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <View style={{}}>
          <Menu.Item
            leadingIcon="cart-outline"
            onPress={() => {}}
            title="Ordered Food Items"
          />
          <Menu.Item leadingIcon="undo" onPress={() => {}} title="Undo" />
          <Menu.Item
            leadingIcon="content-cut"
            onPress={() => {}}
            title="Cut"
            disabled
          />
          <Menu.Item
            leadingIcon="content-copy"
            onPress={() => {}}
            title="Copy"
            disabled
          />
          <Menu.Item
            leadingIcon="content-paste"
            onPress={() => {}}
            title="Paste"
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default Modal;
