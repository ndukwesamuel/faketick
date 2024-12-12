import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

const BackgroundDefaultStyle = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    height: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

export default BackgroundDefaultStyle;