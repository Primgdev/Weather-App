import { useState } from "react";

import axios from "axios";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  const handleSubmit = async () => {
    const res = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=b5fb746d92574db7889235719241603&q=${location}&aqi=no`
    );

    setWeatherData(res.data);
  };

  console.log(weatherData);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search_bar">
        <input
          type="text"
          placeholder="Sydney"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="result">
        <div className="area" >{weatherData.location?.country}</div>
        <div className="temp">{weatherData.current?.temp_c}</div>
        <div className="detail">
          <p>wind <br></br>{weatherData.current?.wind_kph}</p>
          <p>humidity<br></br>{weatherData.current?.humidity}</p>

        </div>
      </div>
    </div>
  );
}

export default App;
