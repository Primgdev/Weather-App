import { useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";
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
          className="searchInput"
          type="text"
          placeholder="Sydney"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button className="searchButton" type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="result" >
        {/* <div className="icon">{weatherData.current?.condition?.icon}</div> */}
        
        <div className="area">{weatherData.location?.country}</div>
        <div className="temp">{weatherData.current?.temp_c}</div>
        <div className="condition"> {weatherData.current?.condition?.text}</div>
        <div className="detail">
          <p className="wind"><WiStrongWind />
        Wind: {}
            {weatherData.current?.wind_kph}
          </p>
          <p className="humidity"><WiHumidity/>
            Humidity: {}
            {weatherData.current?.humidity}
          </p>
          </div>

        
      </div>
    </div>
  );
}

export default App;
