import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BackButton from "../../components/Ticketcomponent/BackButton";
import HeaderTitle from "../../components/Ticketcomponent/HeaderTitle";
import planeIcon from "../../assets/airplane.png";
import BackgroundDefaultStyle from "../../components/Ticketcomponent/BackgroundDefaultStyle";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import DownloadSuccefull from "../TicketingScreen/DownloadSuccefull";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const categories = [
  {
    id: "1",
    title: "Work travel exp",
    backgroundColor: "#64CDDB",
    icon: planeIcon,
  },
  {
    id: "2",
    title: "Work related education",
    backgroundColor: "#596174",
    icon: planeIcon,
  },
  {
    id: "3",
    title: "Work clothing",
    backgroundColor: "#F7D794",
    icon: planeIcon,
  },
  {
    id: "4",
    title: "Other work related exp",
    backgroundColor: "#F8A5C2",
    icon: planeIcon,
  },
  {
    id: "5",
    title: "Gifts and donations",
    backgroundColor: "#E77F67",
    icon: planeIcon,
  },
];

const CategoriesPage = ({ route }) => {
  const { category_data } = useSelector((state) => state.UploadSlice);
  const navigation = useNavigation();

  const [success_upload, setsuccess_upload] = useState(false);

  const { user_isLoading, user_data, user_message } = useSelector(
    (state) => state?.Auth
  );
  const { imageUri } = route.params; // Access the passed data

  const Upload_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}upload`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          emeka: success,
        });
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
      },

      onError: (error) => {
        // console.log({
        //   error: error?.response?.data,
        // });
        navigation.navigate("DownloadFile");

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.error} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  const handlesub = () => {
    let data = {
      category: "674b63bf4d75b8ecbdada16c",
      file: [`${imageUri}`],
    };
    console.log({
      kkdkd: data,
    });
    // navigation.navigate("DownloadFile");

    Upload_Mutation.mutate(data);
  };

  console.log({
    oo: category_data,
  });

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}
      onPress={handlesub}
    >
      <Image
        source={item.icon}
        resizeMode="contain"
        style={styles.categoryCardIcon}
      />
      <Text style={styles.categoryCardDescription}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {success_upload ? (
        <DownloadSuccefull />
      ) : (
        <BackgroundDefaultStyle>
          <BackButton />
          <HeaderTitle Title={"Select Category"} />

          {Upload_Mutation.isLoading && (
            <ActivityIndicator color="white" size="large" />
          )}
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        </BackgroundDefaultStyle>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 8,
  },
  categoryCard: {
    height: 170,
    width: "45%",
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCardIcon: {
    height: 60,
    width: 60,
    marginBottom: 10,
  },
  categoryCardDescription: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
});

export default CategoriesPage;
