import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import AirportSearchInput from "../components/AirportsSearchInput";
import api from "../utils/api";
import FlightResults from "../components/FlightResults";

const GoogleFlightClone = () => {
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currentAirport, setCurrentAirport] = useState(null);
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");
  const [avaialableFlights, setAvailableFlights] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
      setAvailableFlights(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);
  return (
    <>
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
      <div className="w-full mt-8">
        <h3 className="text-xl font-semibold text-center text-gray-800">
          <FlightResults isLoading={isLoading} flights={avaialableFlights} />
          <FlightResults isLoading={isLoading} flights={avaialableFlights} />
        </h3>
      </div>
    </>
  );
};

export default GoogleFlightClone;
