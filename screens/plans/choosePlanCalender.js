import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const ChoosePlanCalender = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
        </View>
        <View style={styles.MainCardContainer}>
          <View style={styles.card}>
              <Text
                style={styles.CardText({ fontSize: 24, marginVertical: 6 })}
              >
                Pro
              </Text>
             <Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#005858",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 12,
                marginTop: 14,
              }}
            >
              <Text
                style={styles.CardText({
                  fontSize: 16,
                  marginVertical: 10,
                  color: "#fff",
                })}
              >
                Proceed to payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.footerText}>. Terms and conditions</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 49,
    backgroundColor: "#000",
    height: "100%",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    height: 450,
    width: "84%",
    borderWidth: 4,
    borderColor: "#005858",
    borderRadius: 20,
  },
  MainCardContainer: {
    alignItems: "center",
  },
  CardText: (data) => ({
    fontSize: data.fontSize,
    textAlign: "center",
    marginVertical: data.marginVertical,
    fontWeight: "700",
    color: data.color,
  }),
  footerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
});

export default ChoosePlanCalender;
