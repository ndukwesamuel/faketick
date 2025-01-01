import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert, Platform } from "react-native";
import BackgroundDefaultStyle from "./BackgroundDefaultStyle";
import BackButton from "./BackButton";
import pencilIcon from "../../assets/pencil.png";
import trashIcon from "../../assets/bin.png";
import HeaderTitle from "./HeaderTitle";
import downloadIcon from "../../assets/downloads.png";
import {
  Category_Fun,
  Get_All_Uplaod_Fun,
} from "../../Redux/Ticket/UploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatDateandTime } from "../../utills/DateTime";
import { useApiRequest } from "../../hooks/Mutate";
const API_BASEURL = "https://ticketing-backend-qt14.onrender.com/api/";
import backArrowIcon from "../../assets/left-arrow.png";
import DownloadSuccefull from "../../screens/TicketingScreen/DownloadSuccefull";
import { AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
const DownloadsComponent = ({ maindata, setnewdata }) => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
  const [downloadLoading, setdownloadLoading] = useState(false);
  const { subscription_data, user_data } = useSelector((state) => state?.Auth);
  const [successDownload, setSuccessDownload] = useState(false);

  const dispatch = useDispatch();
  const { upload_data } = useSelector((state) => state.UploadSlice);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUri, setSelectedUri] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  console.log({
    nmnm: selectedItem,
  });

  const handlePress = (uri) => {
    setSelectedUri(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUri("");
  };
  function bytesToMB(bytes) {
    const bytesInMB = 1024 * 1024; // 1 MB = 1024 * 1024 bytes
    return (bytes / bytesInMB).toFixed(2); // Convert to MB and limit to two decimal places
  }
  useEffect(() => {
    dispatch(Category_Fun());
    dispatch(Get_All_Uplaod_Fun());

    return () => {};
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Category_Fun());
    dispatch(Get_All_Uplaod_Fun());

    // Wait for 2 seconds
    setRefreshing(false);
  };

  const filteredData = upload_data?.docs?.filter(
    (item) => item?.category === maindata?._id
  );

  //

  const handleDownload = async (uri) => {
    setdownloadLoading(true);
    try {
      // Request permissions (necessary for MediaLibrary)
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Storage permission is needed to download files."
        );
        return;
      }

      // Define the file URI to save the file locally
      const fileUri = FileSystem.documentDirectory + uri.split("/").pop();

      // Download the file
      const download = await FileSystem.downloadAsync(uri, fileUri);

      // Save the file to the user's device
      const asset = await MediaLibrary.createAssetAsync(download.uri);

      if (Platform.OS === "android") {
        const albumName = "Ticketing"; // Use a unique name for testing

        try {
          const album = await MediaLibrary.getAlbumAsync(albumName);

          if (!album) {
            // Create a new album if it doesn't exist

            await MediaLibrary.createAlbumAsync(albumName, asset, false);
          } else {
            // Add the asset to the existing album
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
        } catch (error) {
          // Handle any errors encountered during the process
          console.error("Error handling media library:", error.message);
        }
      }

      setdownloadLoading(false);
      // const [successDownload, setSuccessDownload] = useState(true);
      setSuccessDownload(true);

      // Alert.alert(
      //   "Download complete",
      //   "The image has been saved to your device."
      // );
    } catch (error) {
      console.error("Error downloading the file:", error);
      setdownloadLoading(false);

      Alert.alert(
        "Download failed",
        "There was an error downloading the file."
      );
    }
  };

  const handleAllDownload = async () => {
    if (
      !filteredData ||
      !Array.isArray(filteredData) ||
      filteredData.length === 0
    ) {
      setdownloadLoading(false);

      Alert.alert(
        "No files to download",
        "No documents were found to download."
      );
      return;
    }

    setdownloadLoading(true);

    try {
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Storage permission is needed to download files."
        );
        return;
      }

      // Download files concurrently
      const downloadPromises = filteredData.map(async (doc) => {
        if (doc.file && Array.isArray(doc.file)) {
          const downloads = doc.file.map(async (file) => {
            const fileUri = file.uri; // Ensure fileUri is defined
            const localUri =
              FileSystem.documentDirectory + fileUri.split("/").pop();
            const download = await FileSystem.downloadAsync(fileUri, localUri);
            const asset = await MediaLibrary.createAssetAsync(download.uri);

            // Android-specific album management
            if (Platform.OS === "android") {
              const albumName = "Ticketing";
              let album = await MediaLibrary.getAlbumAsync(albumName);
              if (!album) {
                album = await MediaLibrary.createAlbumAsync(
                  albumName,
                  asset,
                  false
                );
              } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
              }
            }
            return asset;
          });

          return Promise.all(downloads);
        }
      });

      await Promise.all(downloadPromises);

      setdownloadLoading(false);

      setSuccessDownload(true);

      Alert.alert(
        "Download complete",
        "All files have been saved to your device."
      );
    } catch (error) {
      console.error("Error downloading files:", error);
      setdownloadLoading(false);

      Alert.alert(
        "Download failed",
        "There was an error downloading the files."
      );
    }
  };

  const { mutate: deleteTicket, isLoading: isLoadingdeleteTicket } =
    useApiRequest({
      url: `${API_BASEURL}v1/vendor/onboarding/delivery-details`,
      method: "DELETE",
      token: user_data?.token || "",

      onSuccess: (response) => {
        // dispatch(checkOtp(true));
        // setlga(response?.data?.data);
        console.log({
          fjfjf: response,
        });
      },
      onError: (error) => {
        console.error("Registration failed:", error?.response?.data);
      },
    });

  const RenderDownloadFile = ({ item }) => {
    return (
      <View>
        <View
          style={styles.downloadFileMainContainer}
          // onPress={() => handlePress(item?.file[0]?.uri)}
        >
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              handlePress(item?.file[0]?.uri);
            }}
          >
            <Text style={styles.downloadFileText(20)}>
              {item?.file[0]?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Text style={styles.downloadFileText(12)}>
                {formatDate(item?.createdAt)}
              </Text>
              <Text style={styles.downloadFileText(12)}>
                {bytesToMB(item?.file[0]?.size)}Mb
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDownload(item?.file[0]?.uri)}>
            <Image
              source={downloadIcon}
              resizeMode="contain"
              style={styles.bodyHeaderButtonIcon(30)}
            />
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          // onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{
                  uri: selectedUri,
                }}
                style={{ height: "60%", width: "100%" }}
              />

              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: 20,
                  gap: 40,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(null);
                    closeModal();
                  }}
                >
                  <MaterialIcons name="cancel" size={40} color="black" />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    // // console.log("djdjdjd");
                    // deleteTicket();
                    console.log({
                      fff: selectedItem?._id,
                    });

                    const url = `${API_BASEURL}upload/${selectedItem?._id}`; // Include item.id in the URL
                    deleteTicket({ url }); // Pass the URL dynamically
                    // console.log({
                    //   ll: url,
                    // });
                  }}
                >
                  <AntDesign name="delete" size={40} color="red" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <>
      {successDownload ? (
        <DownloadSuccessful Successful={setSuccessDownload} />
      ) : (
        <BackgroundDefaultStyle>
          <View>
            <TouchableOpacity
              onPress={() => {
                setnewdata(null);
              }}
              style={{ position: "absolute", top: 20, left: 30, zIndex: 1 }}
            >
              <Image
                source={backArrowIcon}
                resizeMode="contain"
                // style={styles.backArrowIconStyle}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <View style={styles.bodyHeaderContainer}>
              <HeaderTitle Title={"Recent"} />
              <TouchableOpacity
                style={styles.bodyHeaderButton}
                onPress={handleAllDownload}
              >
                <Text style={styles.bodyHeaderButtonText}>Download all</Text>
                <Image
                  source={downloadIcon}
                  resizeMode="contain"
                  style={styles.bodyHeaderButtonIcon(20)}
                />
              </TouchableOpacity>
            </View>

            {downloadLoading && (
              <View>
                <ActivityIndicator color="white" size="large" />
              </View>
            )}

            <View
              style={{
                paddingHorizontal: 20,
                height: screenHeight * 0.8, // Restrict height to 60% of the screen
              }}
            >
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) => item._id || index.toString()} // Ensure a unique key for each item
                renderItem={({ item }) => <RenderDownloadFile item={item} />}
                showsVerticalScrollIndicator={false} // Optional: hides the scrollbar for cleaner UI
                contentContainerStyle={{
                  paddingBottom: 20, // Adds padding at the bottom for smoother scrolling
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    No files available for download.
                  </Text>
                }
              />
            </View>
          </View>
        </BackgroundDefaultStyle>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    // marginVertical: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    color: "white",
    fontSize: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  bodyHeaderContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  bodyHeaderButton: {
    backgroundColor: "#005858",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 45,
    width: 130,
    borderRadius: 12,
  },
  bodyHeaderButtonText: {
    fontSize: 12,
    color: "#fff",
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  bodyHeaderButtonIcon: (data) => ({
    width: data,
    height: data,
  }),
  downloadFileMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  downloadFileText: (data) => ({
    fontSize: data,
    fontWeight: data > 10 ? "800" : "400",
    color: "#fff",
    marginVertical: 4.5,
  }),
});

export default DownloadsComponent;

export function DownloadSuccessful({ Successful }) {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.navigate("DownloadFile");
      Successful(false);
    }, 2000); // 5 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      {/* Verification Image */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/ticket/Group 72.png")}
          style={{
            width: 250,
            height: 200,
          }}
        />
      </View>
      {/* Verification Text */}
      <Text
        style={{
          color: "#FFFFFF",
          textAlign: "center",
          fontSize: 34,
          fontWeight: "700",
        }}
      >
        Download Successful
      </Text>
    </View>
  );
}
