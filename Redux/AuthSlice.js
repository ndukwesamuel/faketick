import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";

import axios from "axios";

import Toast from "react-native-toast-message";
const API_BASEURL = "https://ticketing-backend-qt14.onrender.com/api/";

https: console.log({
  kdkd: API_BASEURL,
});
// import { Alert } from "react-native";

// let userAPi = process.env.APIBASEURL + "user/login";

const initialState = {
  user_data: null,
  user_isError: false,
  user_isSuccess: false,
  user_isLoading: false,
  user_message: null,

  user_profile_data: null,
  user_profile_isError: false,
  user_profile_isSuccess: false,
  user_profile_isLoading: false,
  user_profile_message: null,

  subscription_data: null,
  subscription_isError: false,
  subscription_isSuccess: false,
  subscription_isLoading: false,
  subscription_message: null,
};

const Login_Fun_Service = async (data) => {
  let url = `${API_BASEURL}auth/signin`;
  console.log({ log: url });

  try {
    const response = await axios.post(url, data);
    console.log({ response: response.data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Login_Fun = createAsyncThunk(
  "auth/Login_Fun",
  async (data, thunkAPI) => {
    try {
      return await Login_Fun_Service(data);
    } catch (error) {
      console.log({
        kaka: error?.response?.data?.error,
      });
      const errorMessage = error?.response?.data?.error;
      const constraints = error?.response?.data[0]?.constraints;

      console.log({
        asas: constraints,
      });

      if (constraints) {
        const errorKeys = Object.keys(constraints);

        errorKeys.forEach((key) => {
          Toast.show({
            type: "error",
            text1: constraints[key], // Display the constraint message
          });
        });
      } else {
        Toast.show({
          type: "error",
          text1:
            error?.response?.data?.error || "An unexpected error occurred.",
        });
      }
      // Toast.show({
      //   type: "error",
      //   text1: `${errorMessage}`,
      // });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const UserProfile_Fun = createAsyncThunk(
  "auth/UserProfile_Fun",
  async (_, thunkAPI) => {
    try {
      // ?.data?.token;
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_BASEURL}user`, config);
      console.log({
        iaois: response.data,
      });
      return response.data;
    } catch (error) {
      console.log({ iiiii: error?.response?.data?.error?.message });

      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.error?.message}`,
      });
      // const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Subscription_Fun = createAsyncThunk(
  "auth/Subscription_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;
      // ?.data?.token;

      console.log({
        ui: token,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_BASEURL}/subscriptions`, config);
      console.log({
        gagaga: response.data,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset_login: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Fun.pending, (state) => {
        state.user_isLoading = true;
      })
      .addCase(Login_Fun.fulfilled, (state, action) => {
        state.user_isLoading = false;
        state.user_isSuccess = true;
        state.user_isError = false;
        state.user_message = null;
        state.user_data = action.payload;
      })

      .addCase(Login_Fun.rejected, (state, action) => {
        state.user_isLoading = false;
        state.user_isError = true;
        state.user_message = action.payload;
        state.user_data = null;
        state.user_isSuccess = false;
      })
      .addCase(Subscription_Fun.pending, (state) => {
        state.subscription_isLoading = true;
      })
      .addCase(Subscription_Fun.fulfilled, (state, action) => {
        state.subscription_isLoading = false;
        state.subscription_isSuccess = true;
        state.subscription_isError = false;
        state.subscription_message = null;
        state.subscription_data = action.payload;
      })
      .addCase(Subscription_Fun.rejected, (state, action) => {
        state.subscription_isLoading = false;
        state.subscription_isError = true;
        state.subscription_message = action.payload;
        state.subscription_data = null;
        state.subscription_isSuccess = false;
      });
  },
});

export const { reset_login } = AuthSlice.actions;

export default AuthSlice.reducer;
