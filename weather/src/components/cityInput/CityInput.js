import React, { useEffect, useRef } from "react";
import { LocationSearching, StarBorder } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { nanoid } from "nanoid";

import s from "../cityInput/CityInput.module.css";
import useStateInLocalStorage from "../../hooks/useStateInLocalStorage";
import { selectCities, setCities, add, fetchCityInfoAction } from "../../redux/slices/citySlice";

export const CityInput = () => {
  const [city, setCity] = useState("");
  const [localStorageCities, setLocalStorageCities] = useStateInLocalStorage("myValueInLocalStorage");
  const dispatch = useDispatch();

  const getCities = state => selectCities(state.city);
  const cities = useSelector(getCities);

  const handleCityInput = e => setCity(e.target.value);
  const handleCityState = () => {
    dispatch(add({ city, id: nanoid() }));
    setCity("");
  };

  const localStorageCitiesRef = useRef(localStorageCities);

  useEffect(
    () => {
      if (cities.length !== 0) {
        setLocalStorageCities(cities);
      }
    },
    [cities, setLocalStorageCities]
  );

  useEffect(
    () => {
      dispatch(setCities(localStorageCitiesRef.current));
    },
    [localStorageCitiesRef, dispatch]
  );

  const handleOnKeyPress = e => {
    if (e.key === "Enter") {
      dispatch(fetchCityInfoAction(city));
      handleCityState();
    }
  };
  const onSearchIconClick = () => {
    dispatch(fetchCityInfoAction(city));
  };

  return (
    <>
      <div className={s.inputContainer}>
        <input
          onChange={handleCityInput}
          onKeyPress={handleOnKeyPress}
          value={city}
          className={s.input}
          placeholder="Enter the city"
        />
        <LocationSearching className={s.searchIcon} onClick={onSearchIconClick} />
        <StarBorder className={s.favouriteIcon} onClick={handleCityState} />
      </div>
    </>
  );
};
