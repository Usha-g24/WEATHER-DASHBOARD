import React, { useState, useEffect } from 'react';
import { Search, Cloud, Thermometer, Wind, Droplets, MapPin, Loader2 } from 'lucide-react';
import axios from 'axios';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 mt-8">
          Weather Dashboard
        </h1>

        <form onSubmit={fetchWeather} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pl-12"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <MapPin className="text-gray-500 mr-2" size={24} />
                <h2 className="text-3xl font-semibold text-gray-800">{weather.name}</h2>
              </div>
              <div className="text-5xl font-bold text-gray-800">
                {Math.round(weather.main.temp)}°C
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                <Cloud className="text-blue-500 mr-4" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Weather</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg flex items-center">
                <Thermometer className="text-red-500 mr-4" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Feels Like</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg flex items-center">
                <Wind className="text-green-500 mr-4" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg flex items-center">
                <Droplets className="text-purple-500 mr-4" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;