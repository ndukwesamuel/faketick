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
} from "react-native";
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

const DownloadFilesPage = () => {
  const navigation = useNavigation();

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
  const RenderImage = ({ item }) => {
    return (
      <TouchableOpacity>
        <Image source={item} resizeMode="contain" style={styles.icon} />
      </TouchableOpacity>
    );
  };
  const RenderDownloadFile = ({ item }) => {
    console.log({
      hhhh: item?.file[0]?.uri,
    });
    return (
      <View>
        {/* <TouchableOpacity style={styles.downloadFileMainContainer}> */}
        <TouchableOpacity
          style={styles.downloadFileMainContainer}
          onPress={() => handlePress(item?.file[0]?.uri)}
        >
          <View>
            <Text style={styles.downloadFileText(20)}>
              {item?.file[0]?.title}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.downloadFileText(12)}>{item?.date}</Text>
              <Text style={styles.downloadFileText(12)}>
                {bytesToMB(item?.file[0]?.size)}Mb
              </Text>
            </View>
          </View>
          <Image
            source={downloadIcon}
            resizeMode="contain"
            style={styles.bodyHeaderButtonIcon(30)}
          />
        </TouchableOpacity>

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
                  backgroundColor: "blue",
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 20,
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
          <TouchableOpacity style={styles.bodyHeaderButton}>
            <Text style={styles.bodyHeaderButtonText}>Download all</Text>
            <Image
              source={downloadIcon}
              resizeMode="contain"
              style={styles.bodyHeaderButtonIcon(20)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <FlatList
            data={upload_data?.docs}
            renderItem={(item) => <RenderDownloadFile item={item.item} />}
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
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
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
