import React from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Appbar,
  useTheme,
  TextInput,
  Button,
  Divider,
} from "react-native-paper";
import { createDocs } from "../firebase.config";
const Login = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Login" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          {/*<View>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              Hi, Welcome Back 👋
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              Hello again, you've been missed!
            </Text>
              </View>*/}
          <View style={{ paddingTop: 40 }}>
            <View style={{ paddingVertical: 5 }}>
              <Text variant="titleMedium" style={{}}>
                Enter your email
              </Text>
              <TextInput
                label={`Email Address`}
                keyboardType="email-address"
                mode="outlined"
              />
            </View>

            <View style={{ paddingVertical: 5 }}>
              <Text variant="titleMedium" style={{}}>
                Enter your password
              </Text>
              <TextInput
                label="Password"
                secureTextEntry={true}
                right={<TextInput.Icon icon="eye" />}
                //keyboardType="visible-password"
                mode="outlined"
              />
            </View>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("home")}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
