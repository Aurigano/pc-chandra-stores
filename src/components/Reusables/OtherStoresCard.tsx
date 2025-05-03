import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Calendar, ExternalLink } from 'lucide-react';

interface OtherStoresCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  state: string;
  status: 'open' | 'closed' | 'closing_soon';
  closingTime: string;
  mapUrl: string;
}

const OtherStoresCard: React.FC<OtherStoresCardProps> = ({
  id,
  name,
  address,
  phone,
  state,
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

  return (
    <div className="bg-white shadow-sm rounded-sm overflow-hidden">
      <div className="p-3">
        {/* Header: Showroom name */}
        <div className="mb-1">
          <h3 className="text-sm font-medium text-gray-800 truncate">{name}</h3>
        </div>

        {/* Address - truncated */}
        <p className="text-gray-600 text-xs mb-1.5 truncate">{address}</p>
        
        {/* Status line */}
        <div className="flex items-center mb-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-sm ${getStatusStyle()}`}>
            {getStatusLabel()}
          </span>
          {status !== "closed" && (
            <span className="text-xs text-gray-500 ml-1 font-medium">
              Till {closingTime}
            </span>
          )}
        </div>
        
        {/* Book Appointment line */}
        <div className="flex items-center mb-1.5">
          <Calendar size={10} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-600">Book an appointment</span>
        </div>
        
        {/* Phone number line */}
        <div className="flex items-center mb-2">
          <Phone size={10} className="text-gray-400 mr-1" />
          <a href={`tel:${phone}`} className="text-xs text-gray-600">{phone}</a>
        </div>

        {/* Bottom line with directions and show details */}
        <div className="flex justify-between items-center">
          {/* Get Directions link */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 flex items-center gap-1 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin size={10} className="text-gray-400" />
            Get Directions
          </a>
          
          {/* Show Details link */}
          <Link
            to={`/storelocator/${state}/${id}`}
            className="text-xs text-[#AF1F2D] flex items-center gap-1 hover:underline"
          >
            <ExternalLink size={10} />
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtherStoresCard; 