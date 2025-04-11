"use client";

import { useRouter } from "next/navigation";
import { useLocation } from "@/app/context/LocationContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GetLocationPage() {
  const router = useRouter();
  const { setWeather } = useLocation();
  const [loading, setLoading] = useState(false);

  function handleEasterEgg() {
    router.push("/Easteregg");
  }

  const handleGetWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true); // Show feedback

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`
          );
          const weatherData = await res.json();

          setWeather(weatherData); // Save in context
          router.push("/Weather"); // Navigate
        } catch (err) {
          alert("Failed to fetch weather data.");
          setLoading(false);
        }
      },
      (error) => {
        alert("Permission denied or failed to get location.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <motion.button
        className="bg-gray-600 text-white px-6 py-3 rounded flex items-center gap-2"
        onClick={handleGetWeather}
        disabled={loading}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "Allow Location & Continue"
        )}
      </motion.button>
      <button
        onClick={handleEasterEgg}
        className="absolute top-0 left-0 w-6 h-6 bg-transparent border-none text-white opacity-0 hover:opacity-100 focus:opacity-100"
      >
        🚨
      </button>
    </div>
  );
}
