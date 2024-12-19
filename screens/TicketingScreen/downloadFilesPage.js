import React, { useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
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

const DownloadFilesPage = () => {
  const dispatch = useDispatch();
  const { upload_data } = useSelector((state) => state.UploadSlice);

  console.log({
    ppp: upload_data?.docs[0],
  });
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
    return (
      <TouchableOpacity style={styles.downloadFileMainContainer}>
        <View>
          <Text style={styles.downloadFileText(20)}>{item?.HeaderTitle}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.downloadFileText(12)}>{item?.date}</Text>
            <Text style={styles.downloadFileText(12)}>{item?.fileSize}</Text>
          </View>
        </View>
        <Image
          source={downloadIcon}
          resizeMode="contain"
          style={styles.bodyHeaderButtonIcon(30)}
        />
      </TouchableOpacity>
    );
  };
  return (
    <BackgroundDefaultStyle>
      <ScrollView>
        <View style={styles.headerContainer}>
          <BackButton />
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={upload_data?.docs}
              renderItem={(item) => <RenderImage item={item?._id} />}
              horizontal
            />
          </View>
        </View>
        <View>
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
              data={filesArray}
              renderItem={(item) => <RenderDownloadFile item={item.item} />}
            />
          </View>
        </View>
      </ScrollView>
    </BackgroundDefaultStyle>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 30,
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
