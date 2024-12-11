import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import UserNavigation from "./UserNavigation";
import AntDesign from "@expo/vector-icons/AntDesign";
import { reset_login } from "../Redux/AuthSlice";
import ImagePreviewScreen from "../screens/TicketingScreen/ImagePreviewScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(reset_login());
  };

  // Dummy user data (replace with real user data from state or props)
  const user = {
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/100", // Replace with actual profile picture URL
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#000" }}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        <DrawerItemList
          {...props}
          labelStyle={{
            color: "white", // White text color
          }}
        />
      </View>

      {/* Logout Button */}

      {/* Settings Button */}
      <View style={styles.settingsContainer}>
        <DrawerItem
          label={() => (
            <View style={styles.settingsLabel}>
              <AntDesign name="setting" size={20} color="white" />
              <Text style={styles.settingsText}>Settings</Text>
            </View>
          )}
          onPress={() => navigation.navigate("Settings")} // Navigate to the Settings screen
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

      <Drawer.Screen
        options={{ drawerLabel: "Image" }}
        name="image_preview"
        component={ImagePreviewScreen}
      />
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
    top: "100%",
    position: "relative",
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
