import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  category_data: null,

  category_isError: false,
  category_isSuccess: false,
  category_isLoading: false,
  category_message: null,
};

export const Category_Fun = createAsyncThunk(
  "UploadSlice/Category_Fun",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_BASEURL}category`, config);
      console.log({
        ooo: response.data,
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const UploadSlice = createSlice({
  name: "UploadSlice",
  initialState,
  reducers: {
    reset_TripSLice: (state) => initialState,
    // reset_Driver_trip_Fun: (state) => {
    //   state.driver_trip_data = null;
    //   state.driver_trip_isError = false;
    //   state.driver_trip_isSuccess = false;
    //   state.driver_trip_isLoading = false;
    //   state.driver_trip_message = null;
    // },

    // reset_get_single_driver_trip_Fun: (state) => {
    //   state.get_single_driver_trip_data = null;
    //   state.get_single_driver_trip_isError = false;
    //   state.get_single_driver_trip_isSuccess = false;
    //   state.get_single_driver_trip_isLoading = false;
    //   state.get_single_driver_trip_message = null;
    // },

    // UserBookSeats_fun: (state, action) => {
    //   state.UserBookSeats_data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Category_Fun.pending, (state) => {
        state.category_isLoading = true;
      })
      .addCase(Category_Fun.fulfilled, (state, action) => {
        state.category_isLoading = false;
        state.category_isSuccess = true;
        state.category_isError = false;
        state.category_data = action.payload;
        state.category_message = null;
      })
      .addCase(Category_Fun.rejected, (state, action) => {
        state.category_isLoading = false;
        state.category_isSuccess = false;
        state.category_isError = true;
        state.category_message = action.payload;
        state.category_data = null;
      });
  },
});

export const {} = UploadSlice.actions;

export default UploadSlice.reducer;
