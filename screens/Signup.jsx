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

const Signup = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#fff" }} elevated={true}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Signup" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
          <View>
            <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
              Create Account
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.secondary }}
            >
              Connect with your canteen today! 🔗
            </Text>
          </View>
          <View style={{ paddingTop: 40 }}>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Enter your email
              </Text>
              <TextInput
                label={`Email Address`}
                keyboardType="email-address"
                mode="outlined"
              />
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Enter your mobile number
              </Text>
              <TextInput
                label={`Phone Number`}
                keyboardType="phone-pad"
                mode="outlined"
              />
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Enter your password
              </Text>
              <TextInput
                label="Password"
                secureTextEntry={true}
                right={<TextInput.Icon icon="eye" />}
                mode="outlined"
              />
            </View>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button mode="contained">Sign Up</Button>
          </View>
          <View>
            <Divider />
            <View
              style={{
                paddingVertical: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text variant="labelLarge">Or Sign Up With</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button
                icon={`facebook`}
                mode="elevated"
                style={{ marginBottom: 10 }}
              >
                Facebook
              </Button>
              <Button icon={`google`} mode="elevated">
                Google
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
