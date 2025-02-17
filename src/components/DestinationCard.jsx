const DestinationCard = ({ destination }) => {
  // Destructuring the nested content
  const { content } = destination;
  const { location, image, flightQuotes } = content || {};
  const { name } = location || {};
  const { cheapest } = flightQuotes || {};
  const { price, direct } = cheapest || {};
  const imageUrl = image?.url;

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out mx-auto mb-8">
      <img
        src={imageUrl}
        alt={`Destination: ${name}`}
        className="w-64 h-48 object-cover"
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">{name}</h4>

        <p className="text-lg text-gray-900 font-semibold mb-2">
          Price: <span className="text-green-600">{price || "N/A"}</span>
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <strong>Direct Flight:</strong> {direct ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
