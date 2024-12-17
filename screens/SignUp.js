import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  CustomCheckbox,
  Forminputpassword,
} from "../components/shared/InputForm";

import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import Checkbox from "expo-checkbox";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

console.log({
  aaa: API_BASEURL,
});
const fetchStates = async () => {
  const response = await axios.get(`${API_BASEURL}{{base_url}}/v1/states`);
  return response.data;
};

export default function SignUp({ navigation, onSetAuth }) {
  const [isChecked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Validate the form fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !location ||
      !password
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Create a payload object
    const payload = {
      firstName, //: "John",
      lastName, // ,,: "Doe",
      email, //: "john.doe@example.com",
      phoneNumber, //: "+12345678900",
      role: "User",
      password, ///: "StrongPassword123!",
    };

    // {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   location,
    //   password,
    // };

    // Example: Log the payload to the console
    console.log("Form submitted with data:", payload);

    Registration_Mutation.mutate(payload);

    // Alert.alert("Success", "Account created successfully!");
    // onSetAuth("sign-in");
  };

  const Registration_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}auth/signup`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      console.log({
        data_info,
      });
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          ksksk: success?.data,
          // ksksk: success?.data?.message,
        });
        Toast.show({
          type: "success",
          text1: `User Registration complete`,
          text2: `Check Your  mail to verify your account`,
        });
        onSetAuth("verify");
      },
      onError: (error) => {
        console.log({
          fire: error?.response?.data,
          afire: error?.response?.data[0].constraints,
        });

        const constraints = error?.response?.data[0]?.constraints;

        if (constraints) {
          const errorKeys = Object.keys(constraints);

          errorKeys.forEach((key) => {
            Toast.show({
              type: "error",
              text1: constraints[key], // Display the constraint message
            });
          });
        } else {
          Toast.show({
            type: "error",
            text1: error?.response?.data || "An unexpected error occurred.",
          });
        }
      },
    }
  );

  return (
    <View style={styles.container}>
      {/* Google Sign-in Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../assets/ticket/flat-color-icons_google.png")}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Login and Sign-in Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            // backgroundColor: "#005858",
            // borderRadius: 10,
          }}
          onPress={() => onSetAuth("sign-in")}
        >
          <Text
            style={[
              styles.tabText,
              styles.activeTab,
              {
                color: "#005858",
                paddingHorizontal: 15,
                paddingVertical: 10,
              },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#005858",
            borderRadius: 10,
          }}
          // onPress={() => onSetAuth("sign-in")}
        >
          <Text
            style={[
              styles.tabText,
              styles.activeTab,
              {
                color: "white",
                paddingHorizontal: 15,
                paddingVertical: 10,
              },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#FFFFFF"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#FFFFFF"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone no"
          keyboardType="phone-pad"
          placeholderTextColor="#FFFFFF"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#FFFFFF"
          value={location}
          onChangeText={setLocation}
        />

        <Forminputpassword
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          style={{
            borderRadius: 8,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            marginTop: 10,
          }}
        >
          <Checkbox
            style={{
              margin: 8,
            }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text
            style={{
              color: "white",
            }}
          >
            I agree to the terms and Conditions and Privacy Policy.
          </Text>
        </View>

        {/* <Text st>I agree to the terms and Conditions and Privacy Policy.</Text> */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          {Registration_Mutation?.isLoading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleSubmit}
            >
              <Text style={styles.createAccountButtonText}>Create account</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  googleButton: {
    // backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  activeTab: {
    color: "#3CB371",
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  createAccountButton: {
    backgroundColor: "#005858",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
