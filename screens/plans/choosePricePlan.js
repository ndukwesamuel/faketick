import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import checkIcon from "../../assets/tick-circle.png";
import { useNavigation } from "@react-navigation/native";

const ChoosePricePlans = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
        </View>
        <View style={styles.MainCardContainer}>
          <View style={styles.backgroundCard}></View>
          <View style={styles.card}>
            <View>
              <Text
                style={styles.CardText({ fontSize: 24, marginVertical: 6 })}
              >
                Pro
              </Text>
              <Text
                style={styles.CardText({ fontSize: 20, marginVertical: 10 })}
              >
                $4.99/<Text style={{ fontSize: 14 }}>month</Text>
              </Text>
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={styles.CardText({
                    fontSize: 11.5,
                    marginVertical: 10,
                  })}
                >
                  <Image
                    source={checkIcon}
                    resizeMode="contain"
                    style={styles.cardIcon}
                  />
                  Combined monthly billing
                </Text>
                <Text
                  style={styles.CardText({
                    fontSize: 11.5,
                    marginVertical: 10,
                  })}
                >
                  <Image
                    source={checkIcon}
                    resizeMode="contain"
                    style={styles.cardIcon}
                  />
                  Unlimited scanning
                </Text>
                <Text
                  style={styles.CardText({
                    fontSize: 11.5,
                    marginVertical: 10,
                  })}
                >
                  <Image
                    source={checkIcon}
                    resizeMode="contain"
                    style={styles.cardIcon}
                  />
                  Unlimited downloads
                </Text>
                <Text
                  style={styles.CardText({
                    fontSize: 11.5,
                    marginVertical: 10,
                  })}
                >
                  <Image
                    source={checkIcon}
                    resizeMode="contain"
                    style={styles.cardIcon}
                  />
                  Scanned process
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#005858",
                paddingVertical: 6,
                paddingHorizontal: 55,
                borderRadius: 12,
                marginTop: 14,
              }}
              onPress={() => navigation.navigate("ChoosePlanCalender")}
            >
              <Text
                style={styles.CardText({
                  fontSize: 16,
                  marginVertical: 10,
                  color: "#fff",
                })}
              >
                Subscribe
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
  description: {
    color: "#fff",
    textAlign: "center",
    width: "80%",
    fontSize: 16,
    fontWeight: "600",
  },
  backgroundCard: {
    backgroundColor: "#fff",
    height: 410,
    width: "84%",
    borderWidth: 4,
    borderColor: "#005858",
    borderRadius: 20,
    marginRight: 30,
    marginBottom: 60,
  },
  card: {
    backgroundColor: "#fff",
    height: 450,
    width: "84%",
    borderWidth: 4,
    borderColor: "#005858",
    borderRadius: 20,
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: -14,
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
  cardIcon: {
    height: 20,
    width: 20,
  },
  footerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
});

export default ChoosePricePlans;