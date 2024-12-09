import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AppScreen from "../../components/shared/AppScreen";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
export default function CardScreen() {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Text
          style={{
            color: "#FFFFFF",
            // textAlign: "center",
            fontSize: 20,
            fontWeight: "700",
            // position: "absolute",
            // top: "15%",
            marginTop: 100,
          }}
        >
          Select your payment method:
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 20,
              borderRadius: 10,
              justifyContent: "center",
              // flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: "#9E9E9E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                justifyContent: "space-between",
                paddingVertical: 20,
                marginVertical: 20,
                marginHorizontal: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Image
                  source={require("../../assets/ticket/noto_credit-card.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    Credit/Debit card
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Pay with visa,Master card...
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>

            <View
              style={{
                backgroundColor: "#9E9E9E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                justifyContent: "space-between",
                paddingVertical: 20,
                marginVertical: 20,
                marginHorizontal: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <Image
                  source={require("../../assets/ticket/logos_paypal.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                    }}
                  >
                    Your Paypal Funds
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Pay quickly and securely
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    // justifyContent: "center",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  googleButtonText: {
    color: "#000000",
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
    borderColor: "#333333",
  },
  createAccountButton: {
    backgroundColor: "#3CB371",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  verificationImage: {
    width: 250,
    height: 200,
  },
  verificationText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
  },
});
