import React from "react";
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import backArrowIcon from "../../assets/left-arrow.png";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
        <Image
          source={backArrowIcon}
          resizeMode="contain"
          style={styles.backArrowIconStyle}
        />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  backArrowIconStyle: {
    height: 40,
    width: 40,
  },
});

export default BackButton