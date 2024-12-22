import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import backArrowIcon from "../../assets/left-arrow.png";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back); // Camera facing direction
  const cameraRef = useRef(null); // Reference for the Camera
  // const [, set] = useState(second)
  const navigation = useNavigation();

  useEffect(() => {
    // Request camera permission automatically when the component mounts
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (hasPermission === false) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log({
        photo: photo?.uri,
      });
      // setPhoto(photo.uri); // Save the photo URI to state
      navigation.navigate("ImagePreview", { imageUri: photo?.uri });
    }
  }

  function cancelPicture() {
    setPhoto(null); // Clear the photo state to go back to camera
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          () => {
            navigation.navigate("Home");
            console.log({
              ksksks: "dnksddkj",
            });
          }
          // ;
        }
        style={{
          zIndex: 20,
        }}
      >
        <Image
          source={backArrowIcon}
          resizeMode="contain"
          // style={styles.backArrowIconStyle}
          style={{
            height: 40,
            width: 40,
            position: "absolute",
            top: 30,
            left: 20,
            zIndex: 100,
            // position: "absolute",
            // marginTop: 40,
            // paddingHorizontal: 10,
            // ...style, // Extend the default style with custom styles
          }}
        />
      </TouchableOpacity>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image source={require("../../assets/ticket/snap.png")} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    justifyContent: "space-around", // Align buttons in a row
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain", // Make sure the image fits the screen
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "red", // Background color for the cancel button
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
