import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";

const ChoosePlanCalender = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
        </View>
        <View style={styles.MainCardContainer}>
          <View style={styles.card}>
            <Text style={styles.CardText({ fontSize: 24, marginVertical: 6 })}>
              Pro
            </Text>
            <View style={styles.table}>
              <View style={styles.tableChecKBoxContainer}>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Jan</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Feb</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Mar</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Apr</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>May</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
              </View>
              <View style={styles.tableChecKBoxContainer}>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Jun</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Jul</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Aug</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Sep</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Oct</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
              </View>
              <View style={styles.tableChecKBoxContainer}>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Nov</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
                <View style={styles.tableCheckBox}>
                  <Text style={styles.CardText({ fonSize: 20 })}>Dec</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#4630EB" : undefined}
                  />
                </View>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <View>
                <Text
                  style={styles.description({
                    fontSize: 14,
                    fontWeight: "700",
                  })}
                >
                  You selected 5 months
                </Text>
                <View style={styles.descriptionSubContainer}>
                  <Text
                    style={styles.description({
                      fontSize: 12,
                      fontWeight: "400",
                    })}
                  >
                    $4.99 1 month x 5 months
                  </Text>
                  <Text
                    style={styles.description({
                      fontSize: 14,
                      fontWeight: "700",
                    })}
                  >
                    $24.99
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.descriptionSubContainer}>
                  <Text
                    style={styles.description({
                      fontSize: 14,
                      fontWeight: "700",
                    })}
                  >
                    Total
                  </Text>
                  <Text
                    style={styles.description({
                      fontSize: 17,
                      fontWeight: "700",
                    })}
                  >
                    $24.99
                  </Text>
                </View>
                <Text
                  style={styles.description({
                    fontSize: 14,
                    fontWeight: "400",
                  })}
                >
                  See your total (including taxes)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#005858",
                width: "69%",
                height: 50,
                borderRadius: 10,
                marginHorizontal: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={styles.CardText({
                  fontSize: 16,
                  marginVertical: 10,
                  color: "#fff",
                  width: 170,
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
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 60
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    height: 500,
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
    width: data.width,
  }),
  footerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  table: {
    marginHorizontal: 27,
    borderWidth: 2,
    borderColor: "#005858",
    padding: 14,
    height: 220,
    width: "79%",
    marginVertical: 13,
  },
  tableCheckBox: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    gap: 4,
  },
  tableChecKBoxContainer: {
    flexDirection: "row",
  },
  checkBox: {
    height: 20,
    width: 20,
  },
  descriptionContainer: {
    paddingHorizontal: 25,
    marginVertical: 5,
  },
  descriptionSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: (data) => ({
    fontSize: data.fontSize,
    fontWeight: data.fontWeight,
    marginVertical: 3
  }),
});

export default ChoosePlanCalender;
