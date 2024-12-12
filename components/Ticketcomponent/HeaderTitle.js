import React from "react";
import { Text, StyleSheet } from "react-native";


const HeaderTitle = ({ Title }) => {
    return <Text style={styles.headerTitle}>{ Title }</Text>;
}

const styles = StyleSheet.create({
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 40,
  },
});

export default HeaderTitle;