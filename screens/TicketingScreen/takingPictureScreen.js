import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/Ticketcomponent/BackButton";
import camereType from '../../assets/ticket/switch-camera.png';
import cameraShutter from '../../assets/ticket/camera.png';
import scanIcon from '../../assets/ticket/scan.png';


const TakingPictureScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);
      navigation.navigate("ImagePreview", { imageUri: photoData.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <TouchableOpacity>
          <Image
            source={camereType}
            resizeMode="contain"
            style={styles.cameraType}
          />
              </TouchableOpacity>
      </View>
      <View style={styles.scanIconContainer}>
        <Image source={scanIcon} style={{ height: 230, width: 230 }}/>
      </View>
      <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={takePicture}
          >
            <Image
              source={cameraShutter}
              resizeMode="contain"
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: "center",
      justifyContent: "center",
    paddingBottom: 20
  },
  imagePreview: {
    width: "100%",
    height: 300,
    marginTop: 20,
    },
    headerContainer: {
        position: 'absolute',
        top: '0',
        flexDirection: 'row',
        backgroundColor: 'none',
        zIndex: 1,
        paddingHorizontal: 9
  },
    cameraType: {
      height: 40,
        width: 40,
      marginLeft: 250
  },
  scanIconContainer: {
    backgroundColor: 'none',
    position: 'absolute',
      zIndex: 1,
      top: 230,
    left: 70
  }
});

export default TakingPictureScreen;
