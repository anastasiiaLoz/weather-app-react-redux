import { SevenDays } from "./sevenDays/SevenDays";
import { CityInput } from "../components/cityInput/CityInput";
import { CityList } from "../components/cityList/CityList";
import { CurrentWeather } from "./currentWeather/CurrentWeather";
import { Provider } from "react-redux";
import store from "../redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <CityInput />
      <CityList />
      <CurrentWeather />
      <SevenDays />
    </Provider>
  );
}

export default App;
