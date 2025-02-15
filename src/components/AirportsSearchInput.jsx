import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useDebounce from "../custom-hooks/useDebounce";
import api from "../utils/api";

const AirportSearchInput = forwardRef(({ placeholder, setError }, ref) => {
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const debouncedQuery = useDebounce(query);
  const selectedEntityId = useRef("");
  const isUserSelecting = useRef(false);

  useImperativeHandle(ref, () => ({
    getSelectedAirport: () => {
      return airports.find(
        ({ entityId }) => entityId === selectedEntityId.current
      );
    },
  }));

  const handleChange = (e) => {
    if (isUserSelecting.current) return;
    setQuery(e.target.value);
  };

  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    const selectedAirport = airports.find(
      ({ entityId }) => entityId === selectedValue
    );

    if (selectedAirport) {
      isUserSelecting.current = true;
      selectedEntityId.current = selectedValue;
      setQuery(
        `${selectedAirport.navigation.entityType} ${selectedAirport.skyId} ${selectedAirport.presentation.title}`
      );
    }
  };

  useEffect(() => {
    if (!debouncedQuery) return;
    if (isUserSelecting.current) {
      isUserSelecting.current = false;
      return;
    }

    const fetchAirports = async () => {
      try {
        const response = await api("v1/flights/searchAirport", {
          query: debouncedQuery,
        });
        console.log("response", response.data);
        setAirports((prevAirports) => {
          const airportMap = new Map();

          prevAirports.forEach((airport) =>
            airportMap.set(airport.entityId, airport)
          );

          response.data.forEach((airport) =>
            airportMap.set(airport.entityId, airport)
          );

          return Array.from(airportMap.values());
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAirports();
  }, [debouncedQuery, setError]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`airports-${placeholder}`} className="font-semibold">
        {placeholder}
      </label>
      <input
        type="text"
        list={`airports-${placeholder}`}
        value={query}
        onInput={handleSelect}
        onChange={handleChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <datalist
        id={`airports-${placeholder}`}
        className="bg-white border border-gray-300 rounded-lg shadow-md"
      >
        {airports.map(({ entityId, skyId, navigation, presentation }) => (
          <option key={entityId} value={entityId}>
            {`${navigation.entityType} ${skyId} ${presentation.title}`}
          </option>
        ))}
      </datalist>
    </div>
  );
});

export default AirportSearchInput;
