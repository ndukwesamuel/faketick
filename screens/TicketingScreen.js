import React, { useEffect } from "react";
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
import AppScreen from "../components/shared/AppScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Category_Fun } from "../Redux/Ticket/UploadSlice";
import { formatDate } from "../utills/DateTime";

const { height: screenHeight } = Dimensions.get("window");

const TicketingScreen = ({}) => {
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

  const handleTakePicture = async () => {
    // Request permissions to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera is required!");
      return;
    }

    // Open the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Optional: Allow cropping
      aspect: [4, 3], // Aspect ratio for editing
      quality: 1, // Set image quality
    });

    if (!result.canceled) {
      // Navigate to the next screen with the captured image
      navigation.navigate("ImagePreview", { imageUri: result.assets[0].uri });
    }
  };

  const dispatch = useDispatch();
  const sOnboarding = useSelector((state) => state.UploadSlice);
  const { user_data, user_profile_data } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(Category_Fun());

    return () => {};
  }, []);

  const today = new Date();

  console.log({
    james: user_profile_data?.subscription?.period,
  });

  // Format date components
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[today.getDay()]; // Day name
  const day = today.getDate(); // Day of the month
  const month = months[today.getMonth()]; // Month name
  const year = today.getFullYear(); // Year

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

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
              marginTop: 40,
              // borderWidth: 1,
              // borderColor: "white",
            }}
          >
            {/* Greeting Section */}
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                Hello {user_data?.firstName} {user_data?.lastName}
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                {formattedDate}
              </Text>
            </View>

            {/* Free Trial Card */}
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                paddingBottom: 40,
                marginTop: 50,
                height: screenHeight * 0.55, // Set height to 70% of the screen height
                // borderWidth: 10,
                // borderColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "700",
                }}
              >
                ${user_data?.subscription?.plan?.price} /month
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  marginTop: 10,
                  fontWeight: "700",
                }}
              >
                {user_profile_data?.subscription?.plan?.plan}
              </Text>
              <Text
                style={{
                  color: "#666",
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {console.log({
                  xzzz: user_profile_data?.subscription,
                })}
                Your free trial ends on
                {`${formatDate(
                  user_profile_data?.subscription?.period[0]?.exp_date
                )}`}
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
                {/* <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={require("../assets/ticket/Group 227.png")}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#000",
                    }}
                  >
                    Take a picture
                  </Text>
                </View> */}

                {/* Take a Picture */}
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginRight: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("camera")}
                  >
                    <Image
                      source={require("../assets/ticket/Group 227.png")}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 8,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#000",
                    }}
                  >
                    Take a picture
                  </Text>
                </View>

                {/* Upload */}
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 10,
                  }}
                  onPress={handleImageUpload}
                >
                  <Image
                    source={require("../assets/ticket/Group 167.png")}
                    // source={{ uri: "https://via.placeholder.com/100" }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#000",
                    }}
                  >
                    Upload
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

export default TicketingScreen;
