import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import UserNavigation from "./UserNavigation";
import AntDesign from "@expo/vector-icons/AntDesign";
import { reset_login } from "../Redux/AuthSlice";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker

import ImagePreviewScreen from "../screens/TicketingScreen/ImagePreviewScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { user_data, user_isLoading, user_profile_data, subscription_data } =
    useSelector((state) => state?.Auth);

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(reset_login());
  };

  console.log({
    dd: user_data?.subscription,
  });
  // Dummy user data (replace with real user data from state or props)
  const user = {
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual profile picture URL
  };

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
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#000" }}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user_data.profilePicture }}
          style={styles.profileImage}
        />
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {user_data.firstName} {user_data.lastName}
        </Text>
      </View>

      {/* Settings Button */}
      <View style={styles.settingsContainer}>
        <DrawerItem
          label={() => (
            <View style={styles.settingsLabel}>
              {/* <AntDesign name="setting" size={20} color="white" /> */}
              <Text style={styles.settingsText}>Home</Text>
            </View>
          )}
          onPress={() => navigation.navigate("Home")} // Navigate to the Settings screen
        />

        <DrawerItem
          label={() => (
            <View style={styles.settingsLabel}>
              {/* <AntDesign name="setting" size={20} color="white" /> */}
              <Text style={styles.settingsText}>Upload</Text>
            </View>
          )}
          onPress={handleImageUpload} //() => navigation.navigate("DownloadFile")} // Navigate to the Settings screen
        />

        <DrawerItem
          label={() => (
            <View style={styles.settingsLabel}>
              {/* <AntDesign name="setting" size={20} color="white" /> */}
              <Text style={styles.settingsText}>Download</Text>
            </View>
          )}
          onPress={() => navigation.navigate("DownloadFile")} // Navigate to the Settings screen
        />

        <DrawerItem
          label={() => <Text style={styles.settingsText}>Logout</Text>}
          labelStyle={{ color: "white" }}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function TicketDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#000", // Set drawer background color to black
          width: "50%",
        },
        drawerLabelStyle: {
          color: "white", // Set drawer text color to white
        },
      }}
      initialRouteName="Home_screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{ drawerLabel: "Home" }}
        name="Home_screen"
        component={UserNavigation}
      />

      {/* <Drawer.Screen
        options={{ drawerLabel: "Image" }}
        name="image_preview"
        component={ImagePreviewScreen}
      /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsContainer: {
    // borderTopWidth: 1,
    borderTopColor: "gray",
    padding: 10,
    // top: "70%",
    // position: "absolute",
  },
  settingsLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingsText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
