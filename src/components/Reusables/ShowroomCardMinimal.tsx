import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

interface ShowroomCardMinimalProps {
  id: string;
  name: string;
  address: string;
  state: string;
  rating: number; // Out of 5
  status: 'open' | 'closed' | 'closing_soon';
  closingTime: string;
  mapUrl: string;
}

const ShowroomCardMinimal: React.FC<ShowroomCardMinimalProps> = ({
  id,
  name,
  address,
  state,
  rating,
  status,
  closingTime,
  mapUrl,
}) => {
  // Status styling - only open has green color
  const getStatusStyle = () => {
    switch(status) {
      case 'open':
        return 'bg-green-50 text-green-600';
      case 'closing_soon':
        return 'bg-red-50 text-red-600';
      case 'closed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Status label
  const getStatusLabel = () => {
    switch(status) {
      case 'open':
        return 'Open';
      case 'closing_soon':
        return 'Closing Soon';
      case 'closed':
        return 'Closed Now';
      default:
        return '';
    }
  };

  // Render star rating
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={14}
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Link
      to={`/storelocator/${state}/${id}`}
      className="block mb-3 transition-all shadow-[0px_1px_3px_0px_#0000000F] bg-white hover:shadow-[0px_2px_6px_rgba(0,0,0,0.1)] rounded-sm"
    >
      <div className="p-3">
        {/* Header: Showroom name and rating */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-medium text-gray-800">{name}</h3>
          <div className="flex">{renderStars()}</div>
        </div>

        {/* Address */}
        <p className="text-gray-600 text-xs mb-2">{address}</p>

        {/* Status and Directions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span
              className={`text-xs px-2 py-0.5 rounded-sm ${getStatusStyle()}`}
            >
              {getStatusLabel()}
            </span>
            {status !== "closed" && (
              <span className="text-xs text-gray-500 ml-1 font-medium">
                Till {closingTime}
              </span>
            )}
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#AF1F2D] text-xs flex items-center gap-1 hover:underline"
            onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking the link
          >
            <MapPin size={12} />
            Directions
          </a>
        </div>
      </div>
    </Link>
  );
};

export default ShowroomCardMinimal; 