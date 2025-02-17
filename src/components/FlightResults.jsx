import FlightCard from "./FlightCard";
import Spinner from "./Spinner";

const FlightResults = ({ flights, isLoading, title }) => {
  // assuming no pagination is needed
  const { destinationImageUrl, itineraries } = flights;

  return (
    <div className="w-full mt-8">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-2 border-b-2 border-gray-300">
        {title}
      </h3>
      {isLoading ? (
        <Spinner />
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
