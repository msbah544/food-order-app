import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Appbar,
  useTheme,
  TextInput,
  Button,
  Divider,
} from "react-native-paper";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authRef } from "../firebase.config";
const Signup = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const theme = useTheme();

  //create user
  const createUser = () => {
    const authRef = getAuth();

    createUserWithEmailAndPassword(authRef, emailOrPhone, password)
      .then((userCreds) => {
        console.log(userCreds);
      })
      .catch((err) => console.log(err.message));
  };
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
              <Text variant="titleMedium" style={{}}>
                Enter your phone / email
              </Text>
              <TextInput
                label={`Email / Phone`}
                keyboardType="email-address"
                mode="outlined"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
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
                mode="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Text variant="titleMedium" style={{}}>
                Enter Student ID
              </Text>
              <TextInput
                label="student ID"
                keyboardType="numeric"
                //secureTextEntry={true}
                //right={<TextInput.Icon icon="eye" />}
                mode="outlined"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button mode="contained" onPress={createUser}>
              Sign Up
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
