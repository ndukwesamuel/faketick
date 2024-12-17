import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function DownloadSuccefull({}) {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // onSetAuth("sign-in");
      // console.log("verify");
      navigation.navigate("DownloadFile");
    }, 10000); // 10 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Verification Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/ticket/Group 72.png")}
          style={styles.verificationImage}
        />
      </View>
      {/* Verification Text */}
      <Text style={styles.verificationText}>Download Successful</Text>
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
