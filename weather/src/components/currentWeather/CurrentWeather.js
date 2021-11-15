import React from "react";
import useUserLocation from "../../hooks/useUserLocation";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import s from "../currentWeather/CurrentWeather.module.css";
import { fetchGeolocationAction } from "../../redux/slices/currentGeolocationSlice";

export const CurrentWeather = () => {
  const { loading: userLocationLoading } = useUserLocation();

  const getWeather = state => state.geolocation;
  const state = useSelector(getWeather);
  const { userWeather: weather, loading, error } = state;

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (!userLocationLoading) {
        dispatch(fetchGeolocationAction());
      }
    },
    [dispatch, userLocationLoading]
  );

  const icon = weather?.current?.weather[0].icon;
  const weatherCondition = weather?.current?.weather[0].main;
  const city = weather?.timezone.split("/").pop();
  const temperature = Math.floor(weather?.current?.temp);
  const country = weather?.timezone.split("/").shift();

  return (
    <>
      {loading || userLocationLoading ? (
        <Loader className={s.loader} type="Circles" color="orange" height={100} width={100} timeout={3000} />
      ) : error ? (
        <h1 className={s.errorMessage}>Error occured. Please try again</h1>
      ) : (
        <>
          <div className={s.currentWeatherContainer}>
            <div className={s.iconCityContainer}>
              <img className={s.weatherIcon} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
              <p className={s.weatherCondition}>{weatherCondition}</p>
            </div>
            <h2 className={s.currentCity}>{city}</h2>
            <div className={s.currentInfoContainer}>
              <p className={s.currentTemp}>{temperature}ºC</p>
              <p className={s.currentWeatherDescription}>
                Current weather in {city}, {country} is described as: {weatherCondition?.toLowerCase()}, with temperature of{" "}
                {temperature} ºC.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
