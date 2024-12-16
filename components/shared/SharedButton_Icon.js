import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Image, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const ReusableBackButton = ({
  onPress,
  style = {},
  imageSource,
  imageStyle = {},
  children,
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      //   onPress={onPress}
      style={{
        // backgroundColor: "green",
        // position: "absolute",
        // marginTop: 40,
        // paddingHorizontal: 10,
        ...style, // Extend the default style with custom styles
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <MaterialIcons name="arrow-back-ios" size={30} color="white" />
    </Pressable>
  );
};

export const ReusableBackAndTitle = ({
  onPress,
  style = {},
  imageSource,
  imageStyle = {},
  children,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        //   onPress={onPress}
        style={{
          // position: "absolute",
          // marginTop: 40,
          // paddingHorizontal: 10,
          ...style, // Extend the default style with custom styles
        }}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../../assets/Foodmart/backArrow.png")} />
      </Pressable>
    </View>
  );
};

// export default ReusablePressable;
