import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "./Footer";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "ae8adcd0d439ff8c43540c5836669c05";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City name is not valid");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const onSubmit = (data) => {
    fetchWeatherData(data.city);
  };

  return (
    <div className="text-white p-4">
      <img src="img/thunderbolt.png" alt="Weather" className="w-full h-48" />
      <h1 className="mb-2 text-center font-serif text-3xl mt-5">
        Discover your local forecast and step into the weather of your city
      </h1>
      <div>
        <div className="border-2 border-gray-500 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] rounded-lg mt-10 p-5 mb-5 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <input
              className="p-2 rounded-md text-black w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
              {...register("city", { required: "This field is required" })}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 pt-2">{errors.city.message}</p>}
            <br />
            <input type="submit" value="Search" className="p-2 rounded-md border border-gray-500 w-full sm:w-3/4 md:w-1/2 lg:w-1/3" />
          </form>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {weatherData && (
          <div className="card w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto border-2 border-gray-500 rounded-lg mt-10 p-5 mb-5">
            <img
              src={
                weatherData.weather[0].main.toLowerCase() === 'clouds'
                  ? "/img/cloudy.png"
                  : weatherData.weather[0].main.toLowerCase() === 'clear'
                  ? "/img/mid.png"
                  : "/img/sunny.png"
              }
              className="w-full h-60 object-cover rounded-t-lg"
              alt={weatherData.weather[0].main}
            />
            <div className="p-4">
              <h4 className="text-2xl font-bold text-center">
                {weatherData.name}
                {weatherData.weather[0].main.toLowerCase() === 'clouds' && (
                  <i className="fa-solid fa-cloud ml-2"></i>
                )}
                {weatherData.weather[0].main.toLowerCase() === 'clear' && (
                  <i className="fa-solid fa-cloud-sun ml-2"></i>
                )}
                {weatherData.weather[0].main.toLowerCase() !== 'clouds' && weatherData.weather[0].main.toLowerCase() !== 'clear' && (
                  <i className="fa-solid fa-sun ml-2"></i>
                )}
              </h4>
              <p className="mt-2">
                Temperature: <b>{Math.round(weatherData.main.temp)}°C / {Math.round((weatherData.main.temp * 9/5) + 32)}°F</b>
              </p>
              <p className="mt-2">
                Min. Temp: <b>{Math.round(weatherData.main.temp_min)}°C / {Math.round((weatherData.main.temp_min * 9/5) + 32)}°F</b>
              </p>
              <p className="mt-2">
                Max. Temp: <b>{Math.round(weatherData.main.temp_max)}°C / {Math.round((weatherData.main.temp_max * 9/5) + 32)}°F</b>
              </p>
              <p className="mt-2">Pressure: <b>{weatherData.main.pressure} hPa</b></p>
              <p className="mt-2">Humidity: <b>{weatherData.main.humidity} %</b></p>
              <p className="mt-2">
                The weather in <b>{weatherData.name}</b> can be described as <b><i>{weatherData.weather[0].description}</i></b>. It feels like <b>{Math.round(weatherData.main.feels_like)}°C</b>.
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
export default App;
