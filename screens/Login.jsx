import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Appbar,
  useTheme,
  TextInput,
  Button,
  Divider,
  Card,
} from "react-native-paper";
import { createDocs } from "../firebase.config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const Login = ({ navigation }) => {
  const [emailOrPhone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const theme = useTheme();

  //login
  const loginUser = async () => {
    const authRef = getAuth();

    //validate creds
    if (emailOrPhone == "" || password == "") {
      return setError("All Input Fields Must Be Filled");
    }

    //check if user exists
    /*const exists = await signInWithEmailAndPassword(
      authRef,
      emailOrPhone,
      password
    )
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    console.log(emailOrPhone, password);

    if (!exists) {
      return setError(
        "The Email/Phone You Entered Is Not Registered, Please Signup To Proceed"
      );
    }*/

    //login
    await signInWithEmailAndPassword(authRef, emailOrPhone, password)
      .then((userCreds) => {
        console.log(userCreds);
        navigation.navigate("menu");
      })
      .catch((err) => {
        //console.error(err.message);
        setError("Incorrect Email or Password");
      });
  };
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
                value={emailOrPhone}
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            {error && (
              <Card
                mode="elevated"
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.error,
                  padding: 10,
                }}
                // icon="alert-circle-outline"
                //onPress={() => console.log("Pressed")}
              >
                <Text style={{ color: theme.colors.error, fontWeight: "bold" }}>
                  {" "}
                  {error}
                </Text>
              </Card>
            )}
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button mode="contained" onPress={loginUser}>
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
