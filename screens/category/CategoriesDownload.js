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
import planeIcon from "../../assets/ticket/Vector (7).png";
import education from "../../assets/ticket/Vector (8).png";
import hanger from "../../assets/ticket/hanger.png";
import casebox from "../../assets/ticket/case.png";
import { FontAwesome } from "@expo/vector-icons";

// hanger.png
import defaultIcon from "../../assets/ticket/Vector (8).png";
import BackgroundDefaultStyle from "../../components/Ticketcomponent/BackgroundDefaultStyle";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import DownloadSuccefull from "../TicketingScreen/DownloadSuccefull";
import DownloadsComponent from "../../components/Ticketcomponent/DownloadsComponent";
const API_BASEURL = "https://ticketing-backend-qt14.onrender.com/api/";

const CategoriesDownload = ({}) => {
  const { category_data } = useSelector((state) => state.UploadSlice);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [success_upload, setsuccess_upload] = useState(false);

  const { user_isLoading, user_data, user_message } = useSelector(
    (state) => state?.Auth
  );

  const [downloadData, setDownloadData] = useState("");

  // setisLoading(false);

  // const { comment, imageUri } = route?.params?.image_data; // Access the passed data
  // console.log({
  //   comment,
  //   imageUri,
  // });

  let comment = "";

  let imageUri = "";
  // const { imageUri } = route.params; // Access the passed data

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

      console.log({
        kflk: data_info,
      });

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          emeka: success?.data,
        });
        Toast.show({
          type: "success",
          text1: `File Uploaded Successfull`,
        });

        navigation.navigate("DownloadFile");
      },

      onError: (error) => {
        console.log({
          hannah: error?.response?.data,
        });

        // Extract the response data
        let constraints = error?.response?.data;

        if (Array.isArray(constraints) && constraints.length > 0) {
          // Handle array of constraints (e.g., [{"property": "file"}])
          constraints.forEach((constraint) => {
            if (constraint?.property) {
              Toast.show({
                type: "error",
                text1: `Error: ${constraint.property}`, // Customize the message as needed
              });
            } else {
              Toast.show({
                type: "error",
                text1: "An unexpected error occurred.",
              });
            }
          });
        } else if (constraints && typeof constraints === "object") {
          // Handle object-based error messages
          const errorKeys = Object.keys(constraints);

          errorKeys.forEach((key) => {
            Toast.show({
              type: "error",
              text1: constraints[key], // Display the constraint message
            });
          });
        } else {
          // Fallback case
          Toast.show({
            type: "error",
            text1:
              error?.response?.data?.error || "An unexpected error occurred.",
          });
        }
      },
    }
  );
  const handlesub = async (item) => {
    console.log({
      kfkfkf: item,
    });

    setDownloadData(item);
  };

  // const { mutate: allDownload, isLoading: isLoadingallDownload } =
  //   useApiRequest({
  //     url: `${API_BASEURL}receipt/many-download`,
  //     method: "GET",
  //     token: user_data?.token || "",
  //     onSuccess: (response) => {
  //       // dispatch(checkOtp(true));
  //       // setlga(response?.data?.data);
  //       console.log({
  //         kdkd: response?.data,
  //       });
  //     },
  //     onError: (error) => {
  //       console.log({
  //         nnnn: error?.response?.data,
  //       });
  //       // console.error("Registration failed:", error?.response?.data);

  //       Toast.show({
  //         type: "error",
  //         text1: `${error?.response?.data?.message || "Request failed."}`,
  //       });
  //     },
  //   });

  // const handlesub = async (item) => {
  //   console.log({
  //     zzzz: item?._id,
  //   });
  //   setisLoading(true);

  //   // const cloudinaryUrl = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
  //   // const uploadPreset = "YOUR_UPLOAD_PRESET"; // Create an unsigned preset in your Cloudinary dashboard

  //   const cloudName = "dkzds0azx"; // Replace with your Cloudinary cloud name
  //   const uploadPreset = "ydnmnjxq"; // Replace with your Cloudinary upload preset
  //   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  //   // Prepare the form data for Cloudinary
  //   const formData = new FormData();
  //   formData.append("file", {
  //     uri: imageUri,
  //     type: "image/jpeg", // Adjust based on the image type
  //     name: "upload.jpg",
  //   });
  //   formData.append("upload_preset", uploadPreset);

  //   try {
  //     // Upload the image to Cloudinary
  //     const response = await axios.post(cloudinaryUrl, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     const uploadedImageUrl = response.data;
  //     // const uploadedImageUrl = response.data.secure_url;
  //     console.log("Cloudinary URL:", uploadedImageUrl);
  //     // Pass the uploaded image URL to your API

  //     const imageSize = uploadedImageUrl.bytes;

  //     console.log({
  //       sjsjhhd: imageSize,
  //     });
  //     setisLoading(false);

  //     // let       [{uri: "", type: "", size:"",  title: ""}]

  //     let data = {
  //       category: item?._id,
  //       file: [
  //         {
  //           uri: uploadedImageUrl?.secure_url, //"https://res.cloudinary.com/dkzds0azx/image/upload/v1734535641/checks/fdslzoihhzpceclga5lt.jpg",

  //           type: uploadedImageUrl?.format,
  //           size: uploadedImageUrl?.bytes,
  //           title: comment,
  //         },
  //       ],
  //     };

  //     console.log({
  //       sjsjhhd: data,
  //     });
  //     setisLoading(false);

  //     Upload_Mutation.mutate(data);

  //     setisLoading(false);
  //   } catch (error) {
  //     setisLoading(false);
  //     console.error("Cloudinary upload failed:", error);

  //     console.log({
  //       nxxx: error?.response?.data?.error,
  //     });
  //     Toast.show({
  //       type: "error",
  //       text1: "Image upload failed",
  //       text2: error.message,
  //     });
  //   }
  // };

  // console.log({
  //   oo: category_data?.docs,
  // });

  // {"size": "6763c346c21fd255a0a0b524", "size1": "6763c346c21fd255a0a0b524", "size2": "6763c346c21fd255a0a0b524", "size3": "6763c2f8c21fd255a0a0b518"}

  const categoryMap = {
    "Work travel exp": { icon: planeIcon, color: "#64CDDB" },
    "Work related education": { icon: education, color: "#596174" },
    "Work Clothing": { icon: hanger, color: "#F7D794" },
    "Other work related exp": { icon: casebox, color: "#F8A5C2" },
    "Gifts and donations": { icon: planeIcon, color: "#E77F67" },
  };

  const renderCategory = ({ item }) => {
    const category = categoryMap[item.name] || {
      icon: defaultIcon,
      color: "#CCCCCC",
    };
    const { icon, color } = category;

    console.log({
      llll: item?.id,
      kaka: item?.name,
    });

    return (
      <TouchableOpacity
        style={[styles.categoryCard, { backgroundColor: color }]}
        onPress={() => handlesub(item)}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={styles.categoryCardIcon}
        />
        <Text style={styles.categoryCardDescription}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* {data ?   : */}

      {downloadData ? (
        <DownloadsComponent
          maindata={downloadData}
          setnewdata={setDownloadData}
        />
      ) : (
        <BackgroundDefaultStyle>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ position: "absolute", top: 20, left: 30, zIndex: 1 }}
          >
            <FontAwesome name="navicon" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{
              // justifyContent: "center",
              // flex: 1,
              // borderWidth: 1,
              borderColor: "white",
              alignItems: "center",
            }}
          >
            <HeaderTitle Title={"Select Category"} />
          </View>

          <FlatList
            data={category_data?.docs}
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

export default CategoriesDownload;