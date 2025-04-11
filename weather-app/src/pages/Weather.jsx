import "../css/Weather.css";

import { useState } from "react";

import axios from "axios";

function Weather() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url)
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                    alert("City not found. Please try again.");
                })

            setLocation("");
        }
    }

    return (
        <div className="weather">
            <div className="search">
                <input 
                    value={location} 
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder="Enter Location" 
                    type="text" 
                />
            </div>
            { data.name != undefined ?
                <div className="container">
                <div className="weather__info--main">
                    <div className="weather__info--location">
                        {data.name ? <h2>{data.name}, {data.sys ? <span>{data.sys.country}</span>: null}</h2> : null}
                    </div>
                    <div className="weather__info--temp">
                        {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
                    </div>
                    <div className="weather__info--description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                <div className="weather__info--bottom">
                    <div className="weather__info--feels">
                        <p>Feels Like: 
                            {data.main ? <span> {Math.round(data.main.feels_like)}°C</span> : null}
                        </p>
                    </div>
                    <div className="weather__info--humidity">
                        <p>Humidity: 
                            {data.main ? <span> {data.main.humidity}%</span> : null}
                        </p>
                    </div>
                    <div className="weather__info--wind">
                        <p>Wind Speed: 
                            {data.wind ? <span> {data.wind.speed} KM/H</span> : null}
                        </p>
                    </div>
                </div>
                </div>
            : null }
        </div>
    )
}

export default Weather;
