"use client"
import { useState } from "react";
import { useLocation } from "@/app/context/LocationContext";
import { Chart } from "@/app/components/Chart";

export default function WeatherPage() {
  const { weather } = useLocation();
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weather)
    return (
      <p className="text-white bg-[#1c2128]">
        No weather data available. Please refresh the page or allow location
        access to continue.
      </p>
    );

  // Conversion helpers
  const toFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;
  const formatTemp = (temp: number) =>
    isCelsius ? `${temp.toFixed(1)}°C` : `${toFahrenheit(temp).toFixed(1)}°F`;

  return (
    <div className="text-center my-5 space-y-4">
      {/* Dev credit banner */}
      <div className="text-sm text-muted-foreground font-medium flex flex-col items-center gap-1">
        <span>
          🔧 Made by <span className="text-purple-600 font-semibold">Paul</span>
        </span>
        <span>
          Built with 🧑‍💻 <span className="font-semibold">Next.js</span>, 🎨{" "}
          <span className="font-semibold">Shadcn UI</span>, 🌀{" "}
          <span className="font-semibold">Framer Motion</span>, and 🌤️{" "}
          <span className="font-semibold">FreeCodeCamp API</span>
        </span>
      </div>

      <h1 className="text-3xl font-bold">
        {weather.name}, {weather.sys?.country ?? "N/A"}
      </h1>

      {weather.weather?.[0] && (
        <>
          <img
            src={weather.weather[0].icon} // Directly using the icon URL from the API
            alt="weather icon"
            className="mx-auto w-20 h-20"
          />
          <p className="text-xl capitalize">{weather.weather[0].description}</p>
        </>
      )}

      <p>
        Temp: {formatTemp(weather.main.temp)} (Feels like{" "}
        {formatTemp(weather.main.feels_like)})
      </p>

      <div className="flex justify-center gap-6 text-sm flex-wrap mt-2">
        <p>Min: {formatTemp(weather.main.temp_min)}</p>
        <p>Max: {formatTemp(weather.main.temp_max)}</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
        <p>Wind: {weather.wind.speed} m/s</p>
        <p>Cloudiness: {weather.clouds?.all ?? "N/A"}%</p>
        <p>Visibility: {weather.visibility ? weather.visibility / 1000 : "N/A"} km</p>
      </div>

      {/* Toggle between Celsius and Fahrenheit */}
      <button
        onClick={() => setIsCelsius(!isCelsius)}
        className="mt-4 px-4 py-2 rounded bg-gray-600 text-white hover:bg-purple-700 transition"
      >
        Show in {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>

      {/* Radar chart */}
      <div className="mt-10">
        <Chart weather={weather} />
      </div>
    </div>
  );
}
