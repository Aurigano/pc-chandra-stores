import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommandSearch from '@/components/Reusables/Searchbar';
import ShowroomCard from '@/components/Reusables/ShowroomCard';
import { Button } from '@/components/ui/button';
import ProfStaffIcon from '@/assets/qualities/prof-staff.svg?react';
import CertOfAuthenticityIcon from '@/assets/qualities/cert-of-authenticity.svg?react';
import AuthenticPurityIcon from '@/assets/qualities/authentic-purity.svg?react';

// Extended showroom interface with additional display properties
interface ExtendedShowroom {
  id: string;
  name: string;
  address: string;
  phone: string;
  coords: { lat: number; lng: number };
  rating: number;
  status: 'open' | 'closed' | 'closing_soon';
  closingTime: string;
}

const State: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const [selectedShowroom, setSelectedShowroom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Example showrooms data with all required properties - in a real app, this would come from an API
  const showroomsData: Record<string, ExtendedShowroom[]> = {
    'new-delhi': [
      { 
        id: 'delhi-central', 
        name: 'Delhi Central', 
        address: '123 Connaught Place, New Delhi', 
        phone: '+91 11 2345 6789', 
        coords: { lat: 28.6329, lng: 77.2195 },
        rating: 4.8,
        status: 'open',
        closingTime: '9:30 PM'
      },
      { 
        id: 'delhi-south', 
        name: 'Delhi South', 
        address: '456 South Extension, New Delhi', 
        phone: '+91 11 8765 4321', 
        coords: { lat: 28.5733, lng: 77.2233 },
        rating: 4.2,
        status: 'closing_soon',
        closingTime: '7:00 PM'
      },
    ],
    'bengaluru': [
      { 
        id: 'bangalore-central', 
        name: 'Bangalore Central', 
        address: '789 MG Road, Bangalore', 
        phone: '+91 80 2345 6789', 
        coords: { lat: 12.9716, lng: 77.5946 },
        rating: 4.5,
        status: 'open',
        closingTime: '9:00 PM'
      },
      { 
        id: 'bangalore-south', 
        name: 'Bangalore South', 
        address: '321 Jayanagar, Bangalore', 
        phone: '+91 80 8765 4321', 
        coords: { lat: 12.9250, lng: 77.5938 },
        rating: 3.8,
        status: 'closed',
        closingTime: '9:00 PM'
      },
    ],
    'mumbai': [
      { 
        id: 'mumbai-central', 
        name: 'Mumbai Central', 
        address: '567 Marine Drive, Mumbai', 
        phone: '+91 22 2345 6789', 
        coords: { lat: 18.9442, lng: 72.8234 },
        rating: 4.9,
        status: 'open',
        closingTime: '10:00 PM'
      },
      { 
        id: 'mumbai-west', 
        name: 'Mumbai West', 
        address: '890 Bandra West, Mumbai', 
        phone: '+91 22 8765 4321', 
        coords: { lat: 19.0596, lng: 72.8295 },
        rating: 4.1,
        status: 'closing_soon',
        closingTime: '7:30 PM'
      },
    ],
    'kolkata': [
      { 
        id: 'kolkata-central', 
        name: 'Kolkata Central', 
        address: '234 Park Street, Kolkata', 
        phone: '+91 33 2345 6789', 
        coords: { lat: 22.5726, lng: 88.3639 },
        rating: 4.3,
        status: 'open',
        closingTime: '8:30 PM'
      },
    ],
    'hyderabad': [
      { 
        id: 'hyderabad-central', 
        name: 'Hyderabad Central', 
        address: '432 Banjara Hills, Hyderabad', 
        phone: '+91 40 2345 6789', 
        coords: { lat: 17.4065, lng: 78.4772 },
        rating: 4.0,
        status: 'closing_soon',
        closingTime: '7:45 PM'
      },
    ],
    'jaipur': [
      { 
        id: 'jaipur-central', 
        name: 'Jaipur Central', 
        address: '678 MI Road, Jaipur', 
        phone: '+91 14 2345 6789', 
        coords: { lat: 26.9239, lng: 75.8267 },
        rating: 3.7,
        status: 'closed',
        closingTime: '8:00 PM'
      },
    ],
  };

  // Get showrooms for the current state
  const stateShowrooms = showroomsData[state as keyof typeof showroomsData] || [];

  // Filter showrooms based on search query
  const filteredShowrooms = stateShowrooms.filter(showroom => 
    showroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    showroom.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search commands based on showrooms
  const searchCommands = stateShowrooms.map(showroom => ({
    value: showroom.id,
    label: showroom.name
  }));

  // Handle showroom selection
  const handleShowroomSelect = (id: string) => {
    setSelectedShowroom(id);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  // Execute search
  const executeSearch = () => {
    console.log("Searching for:", searchQuery);
    // Additional search logic can be added here
  };

  return (
    <div className="mx-auto my-8 px-[52px]">
      <div className="mb-8">
        
        <div id="search-section" className="mt-6 mb-8 flex flex-col md:flex-row items-stretch gap-4">
          <div className="bg-[#F5F5F5] px-4 flex items-center justify-center h-[60px]">
            <span className="text-[#AF1F2D] font-medium mr-1">{stateShowrooms.length}</span>
            <span className="text-gray-600">Stores</span>
          </div>
          
          <div className="min-w-0">
            <CommandSearch 
              commands={searchCommands} 
              onSelect={handleSearch}
              width="840px"
            />
          </div>
          
          <Button 
            className="w-[120px] h-[60px]" 
            onClick={executeSearch}
          >
            Search
          </Button>
          
          <div className="hidden md:block overflow-hidden flex-1">
            <img 
              src="/assets/ad1.png" 
              alt="Special Offer" 
              className="h-[60px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Showroom cards list */}
        <div className="w-full lg:w-auto" style={{ width: "500px" }}>
          {filteredShowrooms.length > 0 ? (
            <div className="flex flex-col">
              {filteredShowrooms.map((showroom) => (
                <ShowroomCard 
                  key={showroom.id}
                  id={showroom.id}
                  name={showroom.name}
                  address={showroom.address}
                  phone={showroom.phone}
                  state={state || ''}
                  rating={showroom.rating}
                  status={showroom.status}
                  closingTime={showroom.closingTime}
                  mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.address)}`}
                  isSelected={selectedShowroom === showroom.id}
                  onSelect={() => handleShowroomSelect(showroom.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No showrooms found matching your search.</p>
          )}
          
          {/* Ad banner after showroom cards */}
          <div className="mt-6 mb-4 bg-white shadow-[0px_1px_4px_0px_#0000000F] max-w-[500px] overflow-hidden">
            <a href="/promotions/premium-offer" className="block">
              <img 
                src="/assets/ad5.png" 
                alt="Premium Offer" 
                className="w-full h-auto object-cover"
              />
            </a>
          </div>
        </div>
        
        {/* Right column - can contain multiple sections */}
        <div className="w-full lg:flex-1 flex flex-col gap-6">
          {/* Map section */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] min-h-[400px] flex items-center justify-center">
            <iframe src="https://www.google.com/maps/d/embed?mid=1De-ROxhGfh7a8YtDILyz239x-DnYxQ4&ehbc=2E312F&noprof=1" width="100%" height="400px"></iframe>
          </div>
          
          {/* Qualities Banner */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] p-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] mb-3">
                  <AuthenticPurityIcon width="100%" height="100%" />
                </div>
                <span className="text-base text-[#878787]">Authentic Purity</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] mb-3">
                  <CertOfAuthenticityIcon width="100%" height="100%" />
                </div>
                <span className="text-base text-[#878787]">Certificate of Authenticity</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] mb-3">
                  <ProfStaffIcon width="100%" height="100%" />
                </div>
                <span className="text-base text-[#878787]">Professional Staff</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] mb-3">
                  <CertOfAuthenticityIcon width="100%" height="100%" />
                </div>
                <span className="text-base text-[#878787]">Certificate of Authenticity</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-[70px] h-[70px] mb-3">
                  <ProfStaffIcon width="100%" height="100%" />
                </div>
                <span className="text-base text-[#878787]">Professional Staff</span>
              </div>
            </div>
          </div>
          
          {/* Ad Banner */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] overflow-hidden">
            <a href="/promotions/special-offer" className="block">
              <img 
                src="/assets/ad4.png" 
                alt="Special Offer" 
                className="w-full h-auto object-cover"
              />
            </a>
          </div>
          
          {/* Additional sections can be added here */}
        </div>
      </div>
    </div>
  );
};

export default State; 