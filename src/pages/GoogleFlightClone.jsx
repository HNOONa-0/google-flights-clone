import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useUserLocation from "../custom-hooks/useUserLocation";

const GoogleFlightClone = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currentAirport, setCurrentAirport] = useState({});
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [error, setError] = useState("");

  const { latitude, longitude } = useUserLocation();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const handleSearch = async () => {
    if (!latitude || !longitude) setError("Location is not available.");
    // log all vite env variables
    try {
      const fetchResponse = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}&locale=${
          import.meta.env.VITE_LOCALE
        }`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          },
        }
      );

      // get the current airport and nearby airports with the same subtitle
      const data = (await fetchResponse.json()).data;
      const subtitle = data.current.presentation.subtitle;

      const airports = data.nearby.filter(
        (airport) => airport.presentation.subtitle === subtitle
      );
      console.log(data.current, airports);
      setCurrentAirport(data.current);
      setNearbyAirports(airports);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Flight Search</h1>
        <input
          type="text"
          placeholder="From..."
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="To..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input"
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="input"
        />
        <input
          type="date"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">
          <Search size={16} /> Search Flights
        </button>
      </div>
    </div>
  );
};

export default GoogleFlightClone;
