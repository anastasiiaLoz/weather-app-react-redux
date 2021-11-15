# Weather App

This App gives users detailed information about the weather based on his/her current location at the moment as well as 7 day forecast. It provides an option to search weather by a city and add it to favourite list, with a possibility to remove it later.
There is no need to worry about the list of favourite potential future trips of the cities that had been liked after leaving application as the App stores everything for users' convenience.
By clicking on each city from favourite list, the App will show detailed information about the specific city, so that the users don't need to search it again.

## Website

## Installation

npm install

### Usage

npm start

## Development

Developing this App I have used this stack of technologies:

- React.js
- Redux
- Redux - toolkit
  - createAsyncThunk
  - createSlice
- CSS Module
- Axios
- Nanoid
- React-loader-spinner
- Material UI Icons

I've chosen to use Redux-toolkit to simplify developing process for me with Redux. Using "createSlice" has been even more satisfying as it saves up valuable time by not writing a lot of boilerplate code.

## Architecture

My intention was to make my App as much easy and understandable as possible.
The App has responsive design, which makes it enjoyable to use it in all devices.

I've kept my components and majority of logic separate, dividing it into 4 sections:

- Components
  - This section contains markups and styles of components
- Hooks
  - This section has two custom hooks
    - "useStateInLocalStorage" hook - helps to persist user's data to local storage and extract it for future use in code
    - "useUserLocation" hook - helps to get user's current geolocation and stores this data in a state for future use in code
- Pictures
  - This section contains a background picture for my App
- Redux
  - This section contains redux logic
    - "Slices" folder contains 2 slices:
      - "currentGeolocationSlice" - takes current user's coordinates from state and makes a call to "https://openweathermap.org/api/one-call-api" API to get weather for current city as well as for the next 7 days.
      - "citySlice" - gives back detailed information about current day and next 7 days based on city which user inserts in search bar.
        This slice does:
        - adds city to favourite list
        - removes city from favourite list
        - updates Redux state from local storage state
