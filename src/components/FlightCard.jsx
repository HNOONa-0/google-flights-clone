import { formatTime, normalizeTag } from "../utils/util";

const FlightCard = ({ destinationImageUrl, flight }) => {
  const { id, price, legs, tags } = flight;

  // Ensure there is at least one leg, else return empty
  const leg = legs?.[0] || {};
  const { departure, arrival, durationInMinutes, carriers } = leg;
  const fromCity = leg.origin?.city || "Unknown";
  const toCity = leg.destination?.city || "Unknown";

  // Convert durationInMinutes to hours and minutes, default to 0 if undefined
  const hours = durationInMinutes ? Math.floor(durationInMinutes / 60) : 0;
  const minutes = durationInMinutes ? durationInMinutes % 60 : 0;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out mx-auto mb-8">
      <img
        src={destinationImageUrl}
        alt={`Flight to ${toCity}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          Flight {id?.substring(0, 6)}...
        </h4>

        <p className="text-lg text-gray-900 font-semibold mb-2">
          Price:{" "}
          <span className="text-green-600">{price?.formatted || "N/A"}</span>
        </p>

        <div className="mb-4">
          <div className="flex space-x-4">
            <p className="text-sm text-gray-500">
              <strong>Departure:</strong> {formatTime(departure) || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Arrival:</strong> {formatTime(arrival) || "N/A"}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 my-2">
            <span className="text-sm text-gray-500">{fromCity}</span>
            <span className="text-xl text-gray-600">→</span>{" "}
            <span className="text-sm text-gray-500">{toCity}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <strong>Duration:</strong> {hours}h {minutes}m
          </p>

          <p className="text-sm text-gray-500">
            <strong>Stops:</strong>{" "}
            {leg.stopCount === 0 ? "Direct" : `${leg.stopCount || 0} stops`}
          </p>
        </div>

        {/* Airline Logos in the Center */}
        {carriers?.marketing?.length > 0 && (
          <div className="flex justify-center space-x-2 mt-2">
            {carriers.marketing.map((carrier) => (
              <img
                key={carrier.id}
                src={carrier.logoUrl}
                alt={carrier.name}
                className="w-8 h-8 object-contain"
              />
            ))}
          </div>
        )}

        {tags?.length > 0 && (
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 inline-block"
              >
                {normalizeTag(tag)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
