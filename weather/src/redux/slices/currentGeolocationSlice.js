import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeolocationAction = createAsyncThunk(
  "get/fetchGeolocation",

  async (_, { rejectWithValue, getState }) => {
    try {
      const [latitude, longitude] = getState().geolocation.userLocation;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=f6bf7e780575da95e7b7b6df8edd96e8&units=metric`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: {
    userLocation: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    userWeather: undefined
  },

  reducers: {
    storeUserLocation(state, { payload }) {
      state.userLocation = payload;
    },
    changeLocation(state, { payload }) {
      state.userWeather = payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchGeolocationAction.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.userWeather = payload;
    });
    builder.addCase(fetchGeolocationAction.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(fetchGeolocationAction.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    });
  }
});

export const { storeUserLocation, clearState, changeLocation } = geolocationSlice.actions;

export const geolocationSelector = state => state.data;
export default geolocationSlice.reducer;
