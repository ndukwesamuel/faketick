import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { History_Fun } from "../../Redux/Ticket/UploadSlice";
import AppScreen from "../../components/shared/AppScreen";
import backArrowIcon from "../../assets/left-arrow.png";
import { useNavigation } from "@react-navigation/native";

const History = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Fetch data from Redux
  const { history_data } = useSelector((state) => state?.UploadSlice);

  useEffect(() => {
    dispatch(History_Fun());
  }, [dispatch]);

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Plan {item?.plan?.plan || "N/A"}</Text>
      <Text style={styles.itemText}>
        Description: {item?.plan?.description || "N/A"}
      </Text>
      <Text style={styles.itemText}>
        Price: {`$${item?.plan?.price || "0.00"}`}
      </Text>
      <Text style={styles.itemText}>
        Status : {item?.plan?.isActive ? "Active" : "InActive"}
      </Text>

      {/* Map through the period array */}
      {item?.period?.map((periodItem) => (
        <View key={periodItem._id} style={styles.periodContainer}>
          <Text style={styles.periodText}>
            Month: {periodItem.month || "N/A"}
          </Text>
          <Text style={styles.periodText}>
            Start Date:{" "}
            {periodItem.start_date
              ? new Date(periodItem.start_date).toLocaleDateString()
              : "N/A"}
          </Text>
          <Text style={styles.periodText}>
            Expiration Date:{" "}
            {periodItem.exp_date
              ? new Date(periodItem.exp_date).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>
      )) || <Text>No periods available</Text>}
    </View>
  );

  return (
    <AppScreen>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
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
              position: "relative",
              top: 0,
              left: 20,
              zIndex: 100,
              // position: "absolute",
              // marginTop: 40,
              // paddingHorizontal: 10,
              // ...style, // Extend the default style with custom styles
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription History</Text>
        <FlatList
          data={history_data?.docs} // Data for the FlatList
          renderItem={renderItem} // Render each item
          keyExtractor={(item) => item._id} // Unique key for each item
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No history available.</Text>
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 49,
    backgroundColor: "#000",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});

export default History;
