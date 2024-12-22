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
import BackgroundDefaultStyle from "../../components/Ticketcomponent/BackgroundDefaultStyle";
import BackButton from "../../components/Ticketcomponent/BackButton";
import pencilIcon from "../../assets/pencil.png";
import trashIcon from "../../assets/bin.png";
import HeaderTitle from "../../components/Ticketcomponent/HeaderTitle";
import downloadIcon from "../../assets/downloads.png";
import {
  Category_Fun,
  Get_All_Uplaod_Fun,
} from "../../Redux/Ticket/UploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatDateandTime } from "../../utills/DateTime";

const DownloadFilesPage = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
  const [downloadLoading, setdownloadLoading] = useState(false);

  const dispatch = useDispatch();
  const { upload_data } = useSelector((state) => state.UploadSlice);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUri, setSelectedUri] = useState("");

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

  //
  const iconArray = [pencilIcon, trashIcon];
  const filesArray = [
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
    {
      HeaderTitle: "University receipt",
      date: "Yesterday",
      fileSize: "503.1 KB",
    },
  ];
  const handleDownload = async (uri) => {
    setdownloadLoading(true);
    try {
      console.log({
        ccccc: uri,
      });
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

      console.log({
        nncnc: asset,
      });

      if (Platform.OS === "android") {
        const albumName = "Ticketing"; // Use a unique name for testing

        try {
          const album = await MediaLibrary.getAlbumAsync(albumName);

          if (!album) {
            // Create a new album if it doesn't exist
            console.log(
              `Album "${albumName}" does not exist. Creating it now...`
            );
            await MediaLibrary.createAlbumAsync(albumName, asset, false);
            console.log(`Successfully created album: ${albumName}`);
          } else {
            // Add the asset to the existing album
            console.log(`Album "${albumName}" exists. Adding asset to it...`);
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            console.log(`Successfully added asset to album: ${albumName}`);
          }
        } catch (error) {
          // Handle any errors encountered during the process
          console.error("Error handling media library:", error.message);
        }
      }

      setdownloadLoading(false);

      Alert.alert(
        "Download complete",
        "The image has been saved to your device."
      );
    } catch (error) {
      console.error("Error downloading the file:", error);
      setdownloadLoading(false);

      Alert.alert(
        "Download failed",
        "There was an error downloading the file."
      );
    }
  };

  const RenderDownloadFile = ({ item }) => {
    return (
      <View>
        {/* <TouchableOpacity style={styles.downloadFileMainContainer}> */}
        <View
          style={styles.downloadFileMainContainer}
          // onPress={() => handlePress(item?.file[0]?.uri)}
        >
          <TouchableOpacity onPress={() => handlePress(item?.file[0]?.uri)}>
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
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{
                  uri: selectedUri,
                }}
                style={{ height: "60%", width: "100%" }}
              />

              <TouchableOpacity
                onPress={closeModal}
                style={{
                  backgroundColor: "#005858",
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 40,
                  marginTop: 20,
                }}
              >
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <BackgroundDefaultStyle>
      <View>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ position: "absolute", top: 20, left: 30, zIndex: 1 }}
        >
          <FontAwesome name="navicon" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.bodyHeaderContainer}>
          <HeaderTitle Title={"Recent"} />
          <TouchableOpacity
            style={styles.bodyHeaderButton}
            // onPress={handleDownload}
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
            data={upload_data?.docs}
            keyExtractor={(item, index) => item._id || index.toString()} // Ensure a unique key for each item
            renderItem={({ item }) => <RenderDownloadFile item={item} />}
            showsVerticalScrollIndicator={false} // Optional: hides the scrollbar for cleaner UI
            contentContainerStyle={{
              paddingBottom: 20, // Adds padding at the bottom for smoother scrolling
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text
                style={{ color: "#fff", textAlign: "center", marginTop: 20 }}
              >
                No files available for download.
              </Text>
            }
          />
        </View>
      </View>
    </BackgroundDefaultStyle>
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

export default DownloadFilesPage;
