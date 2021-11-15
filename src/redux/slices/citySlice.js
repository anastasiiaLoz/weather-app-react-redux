import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { changeLocation } from "./currentGeolocationSlice";

export const fetchCityInfoAction = createAsyncThunk(
  "get/getInfo",

  async (cityName, { rejectWithValue, dispatch, getState }) => {
    console.log(getState());
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f6bf7e780575da95e7b7b6df8edd96e8`
      );
      const {
        coord: { lat, lon }
      } = data;

      const { data: info } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=f6bf7e780575da95e7b7b6df8edd96e8&units=metric`
      );
      dispatch(changeLocation(info));
      return info;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: []
  },
  reducers: {
    add(state, { payload }) {
      state.cities.push(payload);
    },

    remove(state, { payload: index }) {
      state.cities.splice(index, 1);
    },

    setCities(state, { payload }) {
      state.cities = JSON.parse(JSON.stringify(payload));
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCityInfoAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCityInfoAction.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });

    builder.addCase(fetchCityInfoAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    });
  }
});

export const { add, remove, fetchCityData, setCities } = citySlice.actions;
export const selectCities = ({ cities }) => cities;

export default citySlice.reducer;
