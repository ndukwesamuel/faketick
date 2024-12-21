import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";

//ticketing-backend-qt14.onrender.com/api/

https: export const UpdateProfileMutation = (token) => {
  return useMutation(
    (data_info) => {
      const config = {
        headers: {
          // Authorization: `Bearer ${data_info.token}`,
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.patch(`${API_BASEURL}api/auth`, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: "Updae successfull ",
        });
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

export default UpdateProfileMutation;
