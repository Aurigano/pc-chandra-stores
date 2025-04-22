import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShowroomCardProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  state: string;
  rating: number; // Out of 5
  status: 'open' | 'closed' | 'closing_soon';
  closingTime: string;
  mapUrl: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const ShowroomCard: React.FC<ShowroomCardProps> = ({
  id,
  name,
  address,
  phone,
  state,
  rating,
  status,
  closingTime,
  mapUrl,
  isSelected = false,
  onSelect,
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
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div
      className={`mb-4 cursor-pointer transition-all shadow-[0px_1px_4px_0px_#0000000F] max-w-[500px] bg-white ${
        isSelected
          ? "border-0 bg-red-50"
          : "border-0 hover:shadow-[0px_2px_8px_rgba(0,0,0,0.1)] hover:outline hover:outline-2 hover:outline-[#AF1F2D]"
      }`}
      onClick={onSelect}
    >
      <div className="p-4 pb-0">
        {/* Header: Showroom name and rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-800">{name}</h3>
          <div className="flex">{renderStars()}</div>
        </div>

        {/* Address */}
        <p className="text-gray-600 text-sm mb-3">{address}</p>

        {/* Status and Directions */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span
              className={`text-xs px-2 py-1 rounded-sm ${getStatusStyle()}`}
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
            onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking the link
          >
            <MapPin size={14} />
            Get Directions
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full">
        <a
          href={`tel:${phone}`}
          className="flex-1"
          onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking
        >
          <Button
            variant="outline"
            className="w-full h-[60px] bg-[#FFECEC] text-[#AF1F2D] border-[#FFECEC] hover:bg-[#FFE0E0] hover:text-[#AF1F2D] hover:border-[#FFE0E0]"
          >
            <Phone size={16} />
            Call Store
          </Button>
        </a>
        <Link
          to={`/storelocator/${state}/${id}`}
          className="flex-1"
          onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking
        >
          <Button className="w-full h-[60px]">Show Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default ShowroomCard; 