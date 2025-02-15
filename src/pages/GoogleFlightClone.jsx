import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import AirportSearchInput from "../components/AirportsSearchInput";
import api from "../utils/api";

const GoogleFlightClone = () => {
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currentAirport, setCurrentAirport] = useState(null);
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const adultsRef = useRef(null);

  // create search flight function
  const searchFlights = async () => {
    const fromAirport = fromRef.current?.getSelectedAirport();
    const toAirport = toRef.current?.getSelectedAirport();

    if (!fromAirport || !toAirport) {
      setError("Please select both airports");
      return;
    }
    console.log("fromAirport", fromAirport);
    console.log("toAirport", toAirport);

    try {
      const response = await api("v2/flights/searchFlightsComplete", {
        originSkyId: fromAirport.skyId,
        destinationSkyId: toAirport.skyId,
        originEntityId: fromAirport.entityId,
        destinationEntityId: toAirport.entityId,
        adults: adultsRef.current.value,
        currency: "USD",
        date: new Date().toISOString().split("T")[0],
      });
      console.log("response", response);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);
  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg max-w-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Flight Search
      </h2>

      <div className="flex flex-col space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Cabin Class:
          <select className="block w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300">
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </label>
        <label className="text-sm font-medium text-gray-700">
          Number of Adults:
          <input
            type="number"
            ref={adultsRef}
            min="1"
            defaultValue="1"
            className="block w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col space-y-4">
        <AirportSearchInput
          ref={fromRef}
          placeholder={"From"}
          setError={setError}
        />
        <AirportSearchInput
          ref={toRef}
          placeholder={"To"}
          setError={setError}
        />
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <label className="flex-1 text-sm font-medium text-gray-700">
            Departure Date:
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="block w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
          <label className="flex-1 text-sm font-medium text-gray-700">
            Return Date:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="block w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </label>
        </div>
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
        onClick={searchFlights}
      >
        <Search size={16} />
        <span>Search Flights</span>
      </button>
      {error && (
        <p className="error-message text-red-500 text-sm mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default GoogleFlightClone;
