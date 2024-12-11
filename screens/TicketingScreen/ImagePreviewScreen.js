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
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";
import { CustomTextArea } from "../../components/shared/InputForm";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ImagePreviewScreen = ({ route, navigation }) => {
  const { imageUri } = route.params; // Get the image URI passed as a parameter
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Handle comment submission logic here
    console.log("Image URI:", imageUri);
    console.log("Comment:", comment);
    alert("Comment added!");
    navigation.goBack();
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
        <ReusableBackButton
          style={{ position: "absolute", left: 10, top: 20 }}
        />

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
            Description (Optional)
          </Text>

          <CustomTextArea
            placeholder="Enter text here..."
            value={comment}
            onChangeText={setComment}
            style={{ width: "80%" }}
            inputStyle={{
              textAlignVertical: "top", // Ensures text starts from the top
              paddingTop: 10, // Add paddingTop to control vertical padding
              paddingBottom: 10, // Add paddingBottom to balance padding
              backgroundColor: "#00000080",
              paddingHorizontal: 10,
              paddingTop: 10, // Add paddingTop to control the vertical padding
              paddingBottom: 10, // Add paddingBottom to balance the padding
              height: 200,
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
        <Button title="back" onPress={() => navigation.goBack()} />
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
