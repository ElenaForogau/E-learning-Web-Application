import React, { useEffect, useState } from "react";

const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [cityInfo, setCityInfo] = useState("");
  const [error, setError] = useState("");

  const API_KEY = "...";

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
      const parsed = JSON.parse(savedLocation);
      setLocation(parsed);
      fetchCityInfo(parsed.latitude, parsed.longitude);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(coords);
          localStorage.setItem("userLocation", JSON.stringify(coords));
          fetchCityInfo(coords.latitude, coords.longitude);
        },
        (err) => {
          console.error("Eroare geolocație:", err.message);
          setError("Nu s-a putut obține locația.");
        }
      );
    } else {
      setError("Browserul nu suportă geolocație.");
    }
  }, []);

  const fetchCityInfo = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}&language=ro`
      );
      const data = await response.json();
      const result = data.results[0];

      if (result) {
        const { city, town, village, country, country_code } =
          result.components;

        const fullLocation = `${
          city || town || village || "Localitate necunoscută"
        }, ${country}`;
        setCityInfo(fullLocation);

        if (country_code === "ro") {
          localStorage.setItem("preferredLanguage", "română");
        } else {
          localStorage.setItem("preferredLanguage", "English");
        }
      }
    } catch (err) {
      console.error("Eroare la OpenCage:", err.message);
      setCityInfo("Locație indisponibilă.");
    }
  };

  return (
    <div style={{ marginTop: "20px", fontSize: "16px", color: "#333" }}>
      {error ? (
        <p style={{ color: "crimson" }}>{error}</p>
      ) : location && cityInfo ? (
        <p>📍 Locația ta: {cityInfo}</p>
      ) : (
        <p>Se detectează locația...</p>
      )}
    </div>
  );
};

export default UserLocation;
