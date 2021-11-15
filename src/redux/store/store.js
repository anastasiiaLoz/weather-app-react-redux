import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../slices/citySlice";
import geolocationReducer from "../slices/currentGeolocationSlice";

const store = configureStore({
  reducer: {
    city: cityReducer,
    geolocation: geolocationReducer
  }
});

export default store;
