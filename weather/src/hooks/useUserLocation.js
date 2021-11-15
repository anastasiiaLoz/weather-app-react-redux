import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeUserLocation } from "../redux/slices/currentGeolocationSlice";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        const receivedUserPosition = [position.coords.latitude, position.coords.longitude];
        setUserLocation(receivedUserPosition);
        dispatch(storeUserLocation(receivedUserPosition));
        setLoading(false);
      },
      () => {
        setLoading(false);
        setUserLocation(false);
      }
    );
  };
  useEffect(() => {
    setLoading(true);
    getUserLocation();
  }, []);

  return { userLocation, loading };
};

export default useUserLocation;
