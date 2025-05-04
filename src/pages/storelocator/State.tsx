import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommandSearch from '@/components/Reusables/Searchbar';
import ShowroomCard from '@/components/Reusables/ShowroomCard';
import { Button } from '@/components/ui/button';
import ProfStaffIcon from '@/assets/qualities/prof-staff.svg?react';
import CertOfAuthenticityIcon from '@/assets/qualities/cert-of-authenticity.svg?react';
import AuthenticPurityIcon from '@/assets/qualities/authentic-purity.svg?react';
import { useShowroomStore } from '@/store/showroomStore';
import useScrollToTop from '@/hooks/useScrollToTop';

// Extended showroom interface with additional display properties
// interface ExtendedShowroom {
//   id: string;
//   name: string;
//   address: string;
//   phone: string;
//   coords: { lat: number; lng: number };
//   rating: number;
//   status: 'open' | 'closed' | 'closing_soon';
//   closingTime: string;
//   cityName: string;
// }

const State: React.FC = () => {
  useScrollToTop();
  
  const { state } = useParams<{ state: string }>();
  const [selectedShowroom, setSelectedShowroom] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Example showrooms data with all required properties - in a real app, this would come from an API
  // const showroomsData: ExtendedShowroom[] = [
  //   // New Delhi showrooms
  //   { 
  //     id: 'delhi-central', 
  //     name: 'Delhi Central', 
  //     address: '123 Connaught Place, New Delhi', 
  //     phone: '+91 11 2345 6789', 
  //     coords: { lat: 28.6329, lng: 77.2195 },
  //     rating: 4.8,
  //     status: 'open',
  //     closingTime: '9:30 PM',
  //     cityName: 'new-delhi'
  //   },
  //   { 
  //     id: 'delhi-south', 
  //     name: 'Delhi South', 
  //     address: '456 South Extension, New Delhi', 
  //     phone: '+91 11 8765 4321', 
  //     coords: { lat: 28.5733, lng: 77.2233 },
  //     rating: 4.2,
  //     status: 'closing_soon',
  //     closingTime: '7:00 PM',
  //     cityName: 'new-delhi'
  //   },
  //   // Bengaluru showrooms
  //   { 
  //     id: 'bangalore-central', 
  //     name: 'Bangalore Central', 
  //     address: '789 MG Road, Bangalore', 
  //     phone: '+91 80 2345 6789', 
  //     coords: { lat: 12.9716, lng: 77.5946 },
  //     rating: 4.5,
  //     status: 'open',
  //     closingTime: '9:00 PM',
  //     cityName: 'bengaluru'
  //   },
  //   { 
  //     id: 'bangalore-south', 
  //     name: 'Bangalore South', 
  //     address: '321 Jayanagar, Bangalore', 
  //     phone: '+91 80 8765 4321', 
  //     coords: { lat: 12.9250, lng: 77.5938 },
  //     rating: 3.8,
  //     status: 'closed',
  //     closingTime: '9:00 PM',
  //     cityName: 'bengaluru'
  //   },
  //   // Mumbai showrooms
  //   { 
  //     id: 'mumbai-central', 
  //     name: 'Mumbai Central', 
  //     address: '567 Marine Drive, Mumbai', 
  //     phone: '+91 22 2345 6789', 
  //     coords: { lat: 18.9442, lng: 72.8234 },
  //     rating: 4.9,
  //     status: 'open',
  //     closingTime: '10:00 PM',
  //     cityName: 'mumbai'
  //   },
  //   { 
  //     id: 'mumbai-west', 
  //     name: 'Mumbai West', 
  //     address: '890 Bandra West, Mumbai', 
  //     phone: '+91 22 8765 4321', 
  //     coords: { lat: 19.0596, lng: 72.8295 },
  //     rating: 4.1,
  //     status: 'closing_soon',
  //     closingTime: '7:30 PM',
  //     cityName: 'mumbai'
  //   },
  //   // Kolkata showrooms
  //   { 
  //     id: 'kolkata-central', 
  //     name: 'Kolkata Central', 
  //     address: '234 Park Street, Kolkata', 
  //     phone: '+91 33 2345 6789', 
  //     coords: { lat: 22.5726, lng: 88.3639 },
  //     rating: 4.3,
  //     status: 'open',
  //     closingTime: '8:30 PM',
  //     cityName: 'kolkata'
  //   },
  //   // Hyderabad showrooms
  //   { 
  //     id: 'hyderabad-central', 
  //     name: 'Hyderabad Central', 
  //     address: '432 Banjara Hills, Hyderabad', 
  //     phone: '+91 40 2345 6789', 
  //     coords: { lat: 17.4065, lng: 78.4772 },
  //     rating: 4.0,
  //     status: 'closing_soon',
  //     closingTime: '7:45 PM',
  //     cityName: 'hyderabad'
  //   },
  //   // Jaipur showrooms
  //   { 
  //     id: 'jaipur-central', 
  //     name: 'Jaipur Central', 
  //     address: '678 MI Road, Jaipur', 
  //     phone: '+91 14 2345 6789', 
  //     coords: { lat: 26.9239, lng: 75.8267 },
  //     rating: 3.7,
  //     status: 'closed',
  //     closingTime: '8:00 PM',
  //     cityName: 'jaipur'
  //   },
  // ];

  const { getShowroomsByCity, showrooms } = useShowroomStore();

  // Debug logs
  console.log('Current state:', state);
  console.log('All showrooms:', showrooms);

  // Get showrooms for the current state
  const stateShowrooms = getShowroomsByCity(state?.replace(/-/g, ' ') || '');
  console.log('State showrooms:', stateShowrooms);

  // Filter showrooms based on search query
  const filteredShowrooms = stateShowrooms.filter(showroom => 
    showroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    showroom.street.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log('Filtered showrooms:', filteredShowrooms);

  // Search commands based on showrooms
  const searchCommands = stateShowrooms.map(showroom => ({
    value: showroom.url_key,
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
  };

  return (
    <div className="mx-auto my-4 sm:my-8 px-0 sm:px-4 lg:px-[52px]">
      <h2 className="text-[#AF1F2D] text-2xl sm:text-3xl font-medium mb-4 sm:mb-6 mt-4">
        {state?.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h2>
      
      <div className="mb-4 sm:mb-8">
        <div
          id="search-section"
          className="mt-3 sm:mt-6 mb-4 sm:mb-8 flex flex-col md:flex-row items-stretch gap-3 sm:gap-4"
        >
          <div className="bg-[#F5F5F5] px-3 sm:px-4 flex items-center justify-center h-[50px] sm:h-[60px]">
            <span className="text-[#AF1F2D] font-medium mr-1">
              {stateShowrooms.length}
            </span>
            <span className="text-gray-600">Stores</span>
          </div>

          <div className="min-w-0 flex-1">
            <CommandSearch
              commands={searchCommands}
              onSelect={handleSearch}
            />
          </div>

          <Button className="w-full md:w-[120px] h-[50px] sm:h-[60px]" onClick={executeSearch}>
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

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Showroom cards list */}
        <div className="w-full lg:w-[500px]">
          {filteredShowrooms.length > 0 ? (
            <div className="flex flex-col">
              {filteredShowrooms.map((showroom) => (
                <ShowroomCard
                  key={showroom.url_key}
                  id={showroom.url_key}
                  name={showroom.name}
                  address={showroom.street}
                  phone={showroom.telephone}
                  state={state || ""}
                  rating={4.5} // Default rating since it's not in the store data
                  status={showroom.status === "1" ? "open" : "closed"}
                  closingTime={showroom.schedule.mon.to.join(':')}
                  mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    showroom.street
                  )}`}
                  isSelected={selectedShowroom === showroom.url_key}
                  onSelect={() => handleShowroomSelect(showroom.url_key)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No showrooms found matching your search.
            </p>
          )}

          {/* Ad banner after showroom cards */}
          <div className="mt-4 sm:mt-6 mb-4 bg-white shadow-[0px_1px_4px_0px_#0000000F] max-w-full sm:max-w-[500px] overflow-hidden">
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
        <div className="w-full lg:flex-1 flex flex-col gap-4 sm:gap-6">
          {/* Map section - hidden on mobile */}
          <div className="hidden sm:flex bg-white shadow-[0px_1px_4px_0px_#0000000F] min-h-[400px] items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235713.11386298144!2d88.23273251546361!3d22.615825258555965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275bb4df8a5fb%3A0x8c7baba17ab3b6a0!2sP.C.Chandra%20Jewellers%2C%20Gariahat!5e0!3m2!1sen!2sin!4v1746251402381!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Qualities Banner - hidden on mobile */}
          <div className="hidden sm:block bg-white shadow-[0px_1px_4px_0px_#0000000F] p-4 sm:p-6">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center">
                <div className="w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] mb-2 sm:mb-3">
                  <AuthenticPurityIcon width="100%" height="100%" />
                </div>
                <span className="text-sm sm:text-base text-[#878787] text-center">
                  Authentic Purity
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] mb-2 sm:mb-3">
                  <CertOfAuthenticityIcon width="100%" height="100%" />
                </div>
                <span className="text-sm sm:text-base text-[#878787] text-center">
                  Certificate of Authenticity
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] mb-2 sm:mb-3">
                  <ProfStaffIcon width="100%" height="100%" />
                </div>
                <span className="text-sm sm:text-base text-[#878787] text-center">
                  Professional Staff
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] mb-2 sm:mb-3">
                  <CertOfAuthenticityIcon width="100%" height="100%" />
                </div>
                <span className="text-sm sm:text-base text-[#878787] text-center">
                  Certificate of Authenticity
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[60px] sm:w-[70px] h-[60px] sm:h-[70px] mb-2 sm:mb-3">
                  <ProfStaffIcon width="100%" height="100%" />
                </div>
                <span className="text-sm sm:text-base text-[#878787] text-center">
                  Professional Staff
                </span>
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
        </div>
      </div>
    </div>
  );
};

export default State; 