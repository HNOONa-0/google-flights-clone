import FlightCard from "./FlightCard";

const FlightResults = ({ flights, isLoading }) => {
  // assuming no pagination is needed
  const { destinationImageUrl, itineraries } = flights;

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Available Flights
      </h3>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : !itineraries || itineraries.length === 0 ? (
        <p className="text-center text-gray-500">No flights found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              destinationImageUrl={destinationImageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResults;
