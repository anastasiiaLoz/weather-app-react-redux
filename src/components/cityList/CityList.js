import { ArrowRight, Close, ArrowLeft } from "@material-ui/icons";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "../cityList/CityList.module.css";
import { fetchCityInfoAction, remove } from "../../redux/slices/citySlice";
import { selectCities } from "../../redux/slices/citySlice";

export const CityList = () => {
  const getCityState = state => selectCities(state.city);
  const cities = useSelector(getCityState);
  const dispatch = useDispatch();

  const handleCityClick = cityName => dispatch(fetchCityInfoAction(cityName));

  const ref = useRef(null);
  const scroll = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={s.cityListContainer}>
      <button className={s.scrollCityLeftBtn} onClick={() => scroll(-20)}>
        <ArrowLeft className={s.arrowLeftIcon} />
      </button>
      <ul className={s.cityList} ref={ref}>
        {cities.map(({ city, id }, index) => (
          <li className={s.city} key={id}>
            <p className={s.cityName} onClick={() => handleCityClick(city)}>
              {city}
            </p>
            <button className={s.removeCityBtn}>
              <Close className={s.closeIcon} onClick={() => dispatch(remove(index))} />
            </button>
          </li>
        ))}
      </ul>
      <button className={s.scrollCityRightBtn}>
        <ArrowRight className={s.arrowRightIcon} onClick={() => scroll(20)} />
      </button>
    </div>
  );
};
