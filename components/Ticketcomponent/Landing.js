import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AppScreen from "../shared/AppScreen";
import { AntDesign } from "@expo/vector-icons";
const { height: screenHeight } = Dimensions.get("window");

const Landing = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const handleImageUpload = async () => {
    // Request permissions to access the photo library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Navigate to the next screen with the selected image
      navigation.navigate("ImagePreview", { imageUri: result.assets[0].uri });
    }
  };
  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* <FontAwesome name="navicon" size={24} color="white" /> */}
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            // style={{ position: "absolute", top: 80, left: 30, zIndex: 1 }}
          >
            <FontAwesome name="navicon" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000",
              marginTop: "20%",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   alignSelf: "center",
            }}
          >
            {/* Free Trial Card */}
            <View
              style={{
                backgroundColor: "#00585880",
                flex: 1,
                justifyContent: "center",
                borderRadius: 12,
                padding: 20,
                marginTop: 50,
                height: screenHeight * 0.5, // Set height to 70% of the screen height
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Welcome
              </Text>

              <Text
                style={{
                  color: "white",
                  marginTop: 15,
                  fontSize: 15,
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Are you a new user or a registered user
              </Text>

              {/* Options */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 80,
                }}
              >
                {/* Take a Picture */}
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginRight: 10,
                  }}
                  onPress={() => onSetAuth("sign-up")}
                >
                  <Image
                    source={require("../../assets/ticket/Vector5.png")}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 8,
                    }}
                  />

                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 18,
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    New
                  </Text>
                </TouchableOpacity>

                {/* Upload */}
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 10,
                  }}
                  onPress={() => onSetAuth("sign-in")}
                >
                  <Image
                    source={require("../../assets/ticket/fluent_people-community-48-filled.png")}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 18,
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    Registered
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default Landing;
