import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';

const WeatherCard = ({ weatherData }) => {
  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{weatherData.name}</h2>
          <p className="text-gray-600 mt-1">{weatherData.weather[0].description}</p>
        </div>
        {getWeatherIcon(weatherData.weather[0].main)}
      </div>

      <div className="text-center mb-8">
        <span className="text-6xl font-bold text-gray-800">
          {Math.round(weatherData.main.temp)}°C
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
          <Wind className="text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">{weatherData.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;