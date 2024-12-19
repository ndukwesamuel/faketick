import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import AppScreen from "../../components/shared/AppScreen";
import { CustomTextArea, Forminput } from "../../components/shared/InputForm";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/Reuseablecomponent";
import backArrowIcon from "../../assets/left-arrow.png";

const ImagePreviewScreen = ({ route }) => {
  const { imageUri } = route.params; // Get the image URI passed as a parameter
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  let image_data = {
    comment,
    imageUri,
  };
  const handleSubmit = () => {
    navigation.navigate("Categories", { image_data });
  };

  return (
    <AppScreen>
      <ImageBackground
        source={{ uri: imageUri }}
        style={{
          flex: 1,
        }}
        resizeMode="stretch"
      >
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

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            marginTop: -30,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: "700",
              marginBottom: 20,
            }}
          >
            Image Name
          </Text>

          <Forminput
            placeholder="Business Name"
            onChangeText={setComment}
            value={comment}
            style={{
              textAlignVertical: "top", // Ensures text starts from the top
              paddingTop: 10, // Add paddingTop to control vertical padding
              paddingBottom: 10, // Add paddingBottom to balance padding
              backgroundColor: "#00000080",
              paddingHorizontal: 10,
              paddingTop: 10, // Add paddingTop to control the vertical padding
              paddingBottom: 10, // Add paddingBottom to balance the padding
              height: 50,
              borderRadius: 6,
              fontSize: 16,
              color: "white",
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#005858",
            padding: 20,
            alignSelf: "flex-end",
            borderRadius: 20,
            marginBottom: 30,
            marginTop: 10,
            marginRight: "10%",
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Save category
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default ImagePreviewScreen;
