import { useState } from "react";
import { WiStrongWind } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState([]);
  const [weatherCondition, setWeatherCondition] = useState();
  const [error, setError] = useState();

  const weatherConditions = {
    sunny: "linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%)",
    patchy: "linear-gradient(to top, #09203f 0%, #537895 100%)",
    cloudy: "linear-gradient(to right, #a5a7a8, #e2e1e3, #fcf8f2)",
    clear: " linear-gradient(to right,#005C97,#363795)",
  
  };

  const handleChange = (e) => {
    setError("");
    setLocation(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=b5fb746d92574db7889235719241603&q=${location}&aqi=no`
      );
      setWeatherData(res.data);

      if (res.data.current?.condition.text === "Sunny") {
        setWeatherCondition(weatherConditions.sunny);
      } else if (res.data.current?.condition.text === "Patchy rain nearby") {
        setWeatherCondition(weatherConditions.patchy);
      } else if (res.data.current?.condition.text === "Overcast "){
        setWeatherCondition(weatherConditions.cloudy);
      }else if (res.data.current?.condition.text === "Mist"){
        setWeatherCondition(weatherConditions.clear);
      }
    } catch (e) {
      setError(e.response.data.error.message);
    }
  };

  console.log("weather", weatherData);

  return (
    <div
      className="App"
      style={{
        height: weatherData.current?.temp_c ? "550px" : "200px",
        background: weatherCondition,
      }}
    >
      <h1>Weather App</h1>
      <div className="search_bar">
        <input
          className="searchInput"
          type="text"
          placeholder="Please enter country"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button
          className="searchButton"
          type="submit"
          onClick={handleSubmit}
          disabled={!location}
        >
          Search
        </button>
      </div>
      {weatherData.current?.temp_c ? (
        <div className="result">
          {/* <div className="icon">{weatherData.current?.condition?.icon}</div> */}
          <div className="icon">
            {" "}
            <img src={weatherData.current?.condition?.icon} />
          </div>
          <div className="area">{weatherData.location?.country}</div>
          <hr style={{ margin: "20px" }}></hr>
          <div className="temp">{weatherData.current?.temp_c} &deg;c</div>
          <div className="condition">
            {" "}
            {weatherData.current?.condition?.text}
          </div>
          <div className="detail">
            <p className="wind">
              <WiStrongWind />
              Wind: {}
              {weatherData.current?.wind_kph}
            </p>
            <p className="humidity">
              <WiHumidity />
              Humidity: {}
              {weatherData.current?.humidity}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {error && <span>{error}</span>}

      {!weatherData.current?.temp_c && (
        <span>Enter Place to view weather.</span>
      )}
    </div>
  );
}

export default App;
