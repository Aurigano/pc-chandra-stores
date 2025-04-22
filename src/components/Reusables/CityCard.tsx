import React from 'react';
import { Link } from 'react-router-dom';

interface CityCardProps {
  cityId: string;
  cityName: string;
  icon: React.ReactNode;
}

const CityCard: React.FC<CityCardProps> = ({ cityId, cityName, icon }) => {
  return (
    <Link to={`/storelocator/${cityId}`} className="block no-underline">
      <div className="flex flex-col items-center transition-all hover:text-[#AF1F2D] min-w-[150px] gap-1 text-gray-800">
        <div className="h-12 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-center">
          {cityName}
        </span>
      </div>
    </Link>
  );
};

export default CityCard; 