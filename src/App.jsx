import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { getWeatherData } from './services/weatherApi';
import { CloudSun } from 'lucide-react';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center py-12 px-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="backdrop-blur-sm bg-white/30 p-8 rounded-2xl w-full max-w-md mb-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <CloudSun className="w-10 h-10 text-white" />
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
        </div>
        <SearchBar 
          city={city} 
          setCity={setCity} 
          onSearch={handleSearch} 
        />
      </div>

      <div className="w-full max-w-md">
        {loading && (
          <div className="text-center text-white">
            Loading...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {weatherData && !loading && !error && (
          <WeatherCard weatherData={weatherData} />
        )}
      </div>
    </div>
  );
}

export default App;