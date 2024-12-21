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
  Modal,
  FlatList,
} from "react-native";
import {
  CustomCheckbox,
  Forminputpassword,
} from "../components/shared/InputForm";

import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import Checkbox from "expo-checkbox";
//ticketing-backend-qt14.onrender.com/api/

https: console.log({
  aaa: API_BASEURL,
});
const fetchStates = async () => {
  const response = await axios.get(`${API_BASEURL}{{base_url}}/v1/states`);
  return response.data;
};

const stateLgaData = {
  "New South Wales": [
    "Albury City Council",
    "Armidale Regional Council",
    "Ballina Shire Council",
    "Balranald Shire Council",
    "Bathurst Regional Council",
    "Bayside Council",
    "Bega Valley Shire Council",
    "Bellingen Shire Council",
    "Berrigan Shire Council",
    "Blacktown City Council",
    // Add more LGAs
  ],
  Victoria: [
    "Alpine Shire Council",
    "Ararat Rural City Council",
    "Ballarat City Council",
    "Banyule City Council",
    "Bass Coast Shire Council",
    "Baw Baw Shire Council",
    "Bayside City Council",
    "Benalla Rural City Council",
    "Boroondara City Council",
    "Brimbank City Council",
    // Add more LGAs
  ],
  Queensland: [
    "Balonne Shire Council",
    "Banana Shire Council",
    "Barcaldine Regional Council",
    "Barcoo Shire Council",
    "Blackall-Tambo Regional Council",
    "Brisbane City Council",
    "Bundaberg Regional Council",
    "Burdekin Shire Council",
    "Cairns Regional Council",
    "Carpentaria Shire Council",
    // Add more LGAs
  ],
  "Western Australia": [
    "Albany City Council",
    "Armadale City Council",
    "Ashburton Shire Council",
    "Augusta-Margaret River Shire Council",
    "Bassendean Town Council",
    "Bayswater City Council",
    "Belmont City Council",
    "Beverley Shire Council",
    "Boddington Shire Council",
    "Boyup Brook Shire Council",
    // Add more LGAs
  ],
  "South Australia": [
    "Adelaide City Council",
    "Adelaide Hills Council",
    "Alexandrina Council",
    "Barossa Council",
    "Berri Barmera Council",
    "Campbelltown City Council",
    "Ceduna District Council",
    "Charles Sturt City Council",
    "Clare and Gilbert Valleys Council",
    "Coober Pedy District Council",
    // Add more LGAs
  ],
  Tasmania: [
    "Break O'Day Council",
    "Brighton Council",
    "Burnie City Council",
    "Central Coast Council",
    "Central Highlands Council",
    "Circular Head Council",
    "Clarence City Council",
    "Devonport City Council",
    "Dorset Council",
    "George Town Council",
    // Add more LGAs
  ],
  "Northern Territory": [
    "Alice Springs Town Council",
    "Barkly Regional Council",
    "Belyuen Shire Council",
    "Central Desert Regional Council",
    "Coomalie Community Government Council",
    "Darwin City Council",
    "East Arnhem Regional Council",
    "Katherine Town Council",
    "Litchfield Council",
    "MacDonnell Regional Council",
    // Add more LGAs
  ],
  "Australian Capital Territory": ["ACT Government (Single Local Area)"],
  // Add more states and LGAs
};

export default function SignUp({ navigation, onSetAuth }) {
  const [isChecked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);
  const [lgas, setLgas] = useState([]);

  const handleSubmit = () => {
    // Validate the form fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !selectedLga ||
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

    // Example: Log the payload to the console
    console.log("Form submitted with data:", payload);

    Registration_Mutation.mutate(payload);

    // Alert.alert("Success", "Account created successfully!");
    // onSetAuth("sign-in");
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setLgas(stateLgaData[state]);
  };

  const handleLgaSelect = (lga) => {
    setSelectedLga(lga);
    setModalVisible(false); // Close the modal after selection
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
        {/* <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#FFFFFF"
          value={location}
          onChangeText={setLocation}
        /> */}

        <TouchableOpacity
          style={{
            // backgroundColor: "#007bff",
            // padding: 10,
            // borderRadius: 5,
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
            padding: 12,
            marginBottom: 15,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "white",
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            {selectedLga
              ? `${selectedLga}, ${selectedState}`
              : "Select Location"}
          </Text>
        </TouchableOpacity>

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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
              height: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Select State
            </Text>
            <FlatList
              data={Object.keys(stateLgaData)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}
                  onPress={() => handleStateSelect(item)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {selectedState && (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  Select LGA {selectedState}
                </Text>
                <FlatList
                  data={lgas}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ddd",
                      }}
                      onPress={() => handleLgaSelect(item)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
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
