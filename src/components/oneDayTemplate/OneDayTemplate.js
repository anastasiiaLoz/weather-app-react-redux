import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGeolocationAction } from "../../redux/slices/currentGeolocationSlice";
import s from "../oneDayTemplate/OneDayTemplate.module.css";

export const OneDayTemplate = () => {
  const getWeather = state => state.geolocation;
  const state = useSelector(getWeather);
  const { userWeather: weather } = state;

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(fetchGeolocationAction());
    },
    [dispatch]
  );

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
      <div className={s.dayContainer}>
        <ul className={s.dayList}>
          {weather?.daily.map(array => (
            <li className={s.days} key={Math.random()}>
              <div>
                <h2 className={s.dayOfWeek}>{days[new Date(array.dt * 1000).getDay()]}</h2>
                <h3 className={s.date}>
                  {new Date(array.dt * 1000).getDate() + `${" / "}` + months[new Date(array.dt * 1000).getMonth()]}
                </h3>

                <img
                  className={s.icon}
                  src={`http://openweathermap.org/img/wn/${array.weather.map(el => el.icon)}@2x.png`}
                  alt="weather icon"
                />

                <div className={s.minMaxContainer}>
                  <div className={s.minContainer}>
                    <p className={s.min}>min</p>
                    <p className={s.minTemp}>{Math.floor(array.temp.min)}ºC</p>
                  </div>
                  <div className={s.maxContainer}>
                    <p className={s.max}>max</p>
                    <p className={s.maxTemp}>{Math.floor(array.temp.max)}ºC</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
