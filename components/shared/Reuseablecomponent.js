import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Image, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import backArrowIcon from "../../assets/left-arrow.png";

export const ReusableBackButton = ({
  onPress,
  style = {},
  imageSource,
  imageStyle = {},
  children,
}) => {
  const navigation = useNavigation();
  return (
    <>
      {/* <Pressable
      //   onPress={onPress}
      style={{
        // position: "absolute",
        // marginTop: 40,
        // paddingHorizontal: 10,
        ...style, // Extend the default style with custom styles
      }}
      onPress={() => navigation.goBack()}
    >
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      <Image source={require("../../assets/Foodmart/backArrow.png")} />
    </Pressable> */}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={backArrowIcon}
          resizeMode="contain"
          // style={styles.backArrowIconStyle}
          style={{
            // position: "absolute",
            // marginTop: 40,
            // paddingHorizontal: 10,
            ...style, // Extend the default style with custom styles
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export const ReusableTitle = ({
  onPress,
  style = {},
  imageSource,
  imageStyle = {},
  children,
  data,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: 24,
        }}
      >
        {data}
      </Text>
    </View>
  );
};

// export default ReusablePressable;
