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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authRef } from "../firebase.config";
const Signup = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const [error, setError] = useState("");
  const [exists, setExists] = useState();
  const theme = useTheme();

  //create user
  const createUser = async () => {
    const authRef = getAuth();

    //validate creds
    if (emailOrPhone == "" || password == "" || studentID == "") {
      setError("All Input Fields Must Be Filled");
      return setTimeout(() => {
        setError("");
      }, 5000);
    }

    console.log(emailOrPhone, password);

    //check if user exists
    const check = async () => {
      await signInWithEmailAndPassword(authRef, emailOrPhone, password)
        .then((userCreds) => {
          return setExists(true);
        })
        .catch((err) => {
          return setExists(false);
        });
    };
    check();
    //create user
    if (!exists) {
      const { user } = await createUserWithEmailAndPassword(
        authRef,
        emailOrPhone,
        password
      ).catch((err) => {
        console.log(err.message);
        switch (err.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            return setError(`Email address already in use.`);
          case "Firebase: Error (auth/invalid-email).":
            return setError(`Email address is invalid.`);
          case "Firebase: Error (auth/operation-not-allowed).":
            return setError(`Error during sign up.`);
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            return setError(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );

          default:
            console.log(err.message);
            setError("an error occured while trying to create account");
            //setError(err.message);
            return setTimeout(() => setError(""), 8000);
        }
      });

      //addstudentID

      updateProfile(user, {
        displayName: studentID,
      })
        .then(() => {
          console.log(user.displayName);
          navigation.navigate("menu");
        })
        .catch(
          (err) =>
            //setError(
            //  "an error occured while updating studentID, deleting user.."
            //)
            setError(err.message)
          //delete user
        );
    } else {
      setError(`Email address already in use.`);
      return setTimeout(() => {
        setError("");
      }, 5000);
    }

    // console.log(user);
    /*.then((userCreds) => {
        
      })
      .catch((err) => {
        switch (err.message) {
          case "auth/email-already-in-use":
            return setError(`Email address already in use.`);
          case "auth/invalid-email":
            return setError(`Email address is invalid.`);
          case "auth/operation-not-allowed":
            return setError(`Error during sign up.`);
          case "auth/weak-password":
            return setError(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );

          default:
            console.log(err.message);
            setError("an error occured while trying to create account");
            return setTimeout(() => setError(""), 8000);
        }
      });*/
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
                onChangeText={(text) => setEmailOrPhone(text)}
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
                onChangeText={(text) => setStudentID(text)}
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
                {error == "an error occured while trying to create account" && (
                  <>
                    <Text style={{ textDecorationLine: "underline" }}>
                      Possible Causes:
                    </Text>
                    <Text>Phone/Email has already been registered</Text>
                    <Text>Invalid Input details</Text>
                  </>
                )}
              </Card>
            )}
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
