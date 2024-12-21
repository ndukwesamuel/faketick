import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
//ticketing-backend-qt14.onrender.com/api/

https: export const StartTripMutation = (token, item) => {
  const navigation = useNavigation();
  return useMutation(
    (data_info) => {
      const config = {
        headers: {
          // Authorization: `Bearer ${data_info.token}`,
          Authorization: `Bearer ${token}`,
        },
      };
      let data = data_info?.status;

      return axios.patch(
        `${API_BASEURL}api/route/${data_info?.id}`,
        data,
        config
      );
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        // navigation.navigate("Driver-Ongoing-Trip", {
        //   item: item,
        // });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
};

export default StartTripMutation;
