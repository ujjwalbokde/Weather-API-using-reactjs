import React, { useEffect, useState, useRef } from "react";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "ae8adcd0d439ff8c43540c5836669c05";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const cityRef = useRef(null); // Corrected ref usage

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // Fetch initial weather data for default city (London)
    fetchWeatherData("London");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = cityRef.current.value;
    if (city.trim() === "") return; // Don't fetch if input is empty
    fetchWeatherData(city);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (!weatherData) return null;

  return (
    <div className="container border-2 border-orange-500 pb-5 px-12 mx-[20%] mt-[6%] rounded-lg">
      <h1 className="text-white text-3xl w-[500px] m-8 mx-60 font-bold">Weather Detector</h1>
      <div className="border-2 p-4 bg-red-200 rounded-md font-bold">
        <h1 className="text-center mb-4 text-xl">Weather Search Box</h1>
        <form onSubmit={handleSubmit} className="mx-60">
          <label htmlFor="city" className="mb-4">Enter city name : </label>
          <input ref={cityRef} className="p-2 rounded-md" type="text" id="city" name="city" required /><br /><br />
          <button type="submit" className="mt-0 border border-amber-700 p-2 rounded-md bg-black text-white">Search</button>
        </form> 
      </div>
      <div className="border-2 p-4 bg-amber-100 rounded-md mt-4 text-center font-bold mb-5">
        <h1 className="p-4 text-xl">Weather in {weatherData.name}</h1>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    </div>
  );
}

export default App;
