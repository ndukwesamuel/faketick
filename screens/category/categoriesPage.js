import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import backArrowIcon from "../../assets/left-arrow.png";
import planeIcon from "../../assets/airplane.png";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { useDispatch, useSelector } from "react-redux";
import { Category_Fun } from "../../Redux/Ticket/UploadSlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const sOnboarding = useSelector((state) => state.UploadSlice);

  console.log({
    kkk: sOnboarding,
  });

  useEffect(() => {
    dispatch(Category_Fun());

    return () => {};
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ReusableBackButton
          style={{
            height: 40,
            width: 40,
            position: "absolute",
            top: 30,
            left: 20,
          }}
        />

        <Text style={styles.headerTitle}>Select Category </Text>
        <View>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryCard({ backgroundColor: "#64CDDB" })}
            >
              <Image
                source={planeIcon}
                resizeMode="contain"
                style={styles.categoryCardIcon({
                  height: 60,
                  width: 60,
                })}
              />
              <Text style={styles.categoryCardDescription}>
                Work travel exp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryCard({ backgroundColor: "#596174" })}
            >
              <Image
                source={planeIcon}
                resizeMode="contain"
                style={styles.categoryCardIcon({
                  height: 60,
                  width: 60,
                })}
              />
              <Text style={styles.categoryCardDescription}>
                Work related education
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryCard({ backgroundColor: "#F7D794" })}
            >
              <Image
                source={planeIcon}
                resizeMode="contain"
                style={styles.categoryCardIcon({
                  height: 60,
                  width: 60,
                })}
              />
              <Text style={styles.categoryCardDescription}>Work clothing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryCard({ backgroundColor: "#F8A5C2" })}
            >
              <Image
                source={planeIcon}
                resizeMode="contain"
                style={styles.categoryCardIcon({
                  height: 60,
                  width: 60,
                })}
              />
              <Text style={styles.categoryCardDescription}>
                Other work related epx
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryCard({ backgroundColor: "#E77F67" })}
            >
              <Image
                source={planeIcon}
                resizeMode="contain"
                style={styles.categoryCardIcon({
                  height: 60,
                  width: 60,
                })}
              />
              <Text style={styles.categoryCardDescription}>
                Gifts and donations
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    height: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backArrowIconStyle: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 40,
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryCard: (data) => ({
    backgroundColor: data.backgroundColor,
    height: 170,
    width: "45%",
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  }),
  categoryCardIcon: (data) => ({
    height: data.height,
    width: data.width,
    marginHorizontal: 35,
    marginVertical: 20,
  }),
  categoryCardDescription: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
});

export default CategoriesPage;
