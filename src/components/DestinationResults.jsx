// DestinationResults.js
import DestinationCard from "./DestinationCard";
import Spinner from "./Spinner";

const DestinationResults = ({ destinations, isLoading, title }) => {
  const { results } = destinations;
  return (
    <div className="w-full mt-8">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-2 border-b-2 border-gray-300">
        {title}
      </h3>
      {isLoading ? (
        <Spinner />
      ) : !results || results.length === 0 ? (
        <p className="text-center text-gray-500">No destinations found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.slice(0, 10).map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationResults;
