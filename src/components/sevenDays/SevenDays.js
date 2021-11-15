import React from "react";
import { useSelector } from "react-redux";
import useUserLocation from "../../hooks/useUserLocation";

import { OneDayTemplate } from "../oneDayTemplate/OneDayTemplate";
import s from "../sevenDays/SevenDays.module.css";

export const SevenDays = () => {
  const { loading: userLocationLoading } = useUserLocation();

  const getWeather = state => state.geolocation;
  const state = useSelector(getWeather);
  const { loading, error } = state;

  return (
    <>
      {loading || userLocationLoading ? null : error ? null : (
        <div className={s.sevenDaysContainer}>
          <OneDayTemplate />
        </div>
      )}
    </>
  );
};
