import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/Reusables/StarRating';
import ContactStoreCard from '@/components/Reusables/ContactStoreCard';
import StoreImagesCarousel from '@/components/Reusables/StoreImagesCarousel';
import ShowroomCard from '@/components/Reusables/ShowroomCard';
import ProfStaffIcon from '@/assets/qualities/prof-staff.svg?react';
import CertOfAuthenticityIcon from '@/assets/qualities/cert-of-authenticity.svg?react';
import AuthenticPurityIcon from '@/assets/qualities/authentic-purity.svg?react';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?react';
import GoogleIcon from '@/assets/icons/google.svg?react';

const Showroom: React.FC = () => {
  const { showroom } = useParams<{ state: string; showroom: string }>();

  // Helper function to capitalize words
  const capitalizeWords = (str: string): string => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Create an array of 10 gallery images by repeating the available images
  const galleryImages = Array(10).fill(null).map((_, index) => {
    // Use modulo to cycle through the 5 available images
    const imageNumber = (index % 5) + 1;
    return `/assets/gallery/${imageNumber}.png`;
  });

  // Example showroom details - in a real app, this would come from an API
  const showroomDetails = {
    name: capitalizeWords(showroom?.replace(/-/g, ' ') || 'Showroom'),
    address: '123 Main Street, New Delhi, 110001',
    phone: '+91 1234567890',
    email: 'contact@showroom.com',
    status: 'open' as 'open' | 'closed' | 'closing_soon',
    closingTime: '9:30 PM',
    rating: 4.6,
    hours: {
      monday: '9:00 AM - 7:30 PM',
      tuesday: '9:00 AM - 7:30 PM',
      wednesday: '9:00 AM - 7:30 PM',
      thursday: '9:00 AM - 7:30 PM',
      friday: '9:00 AM - 7:30 PM',
      saturday: '9:00 AM - 7:30 PM',
      sunday: '9:00 AM - 7:30 PM',
    },
    parking: ["Street Parking", "Valet Parking Available"],
    languages: ["English", "Hindi", "Tamil", "Bengali"],
    paymentMethods: ["Credit Card", "Debit Card", "UPI", "Cash", "BNPL"],
    mapUrl: 'https://www.google.com/maps?q=123+Main+Street,+New+Delhi',
    gallery: [
      '/assets/showroom1.jpg',
      '/assets/showroom2.jpg',
      '/assets/showroom3.jpg',
      '/assets/showroom4.jpg',
    ]
  };

  // Other showrooms nearby - in a real app, this would come from an API
  const otherShowrooms = [
    {
      id: 'delhi-central',
      name: 'Delhi Central',
      address: '123 Connaught Place, New Delhi',
      phone: '+91 11 2345 6789',
      state: 'new-delhi',
      rating: 4.8,
      status: 'open' as const,
      closingTime: '9:30 PM',
      mapUrl: 'https://www.google.com/maps?q=123+Connaught+Place,+New+Delhi'
    },
    {
      id: 'delhi-south',
      name: 'Delhi South',
      address: '456 South Extension, New Delhi',
      phone: '+91 11 8765 4321',
      state: 'new-delhi',
      rating: 4.2,
      status: 'closing_soon' as const,
      closingTime: '7:00 PM',
      mapUrl: 'https://www.google.com/maps?q=456+South+Extension,+New+Delhi'
    },
    {
      id: 'delhi-west',
      name: 'Delhi West',
      address: '789 Rajouri Garden, New Delhi',
      phone: '+91 11 5555 1234',
      state: 'new-delhi',
      rating: 3.9,
      status: 'closed' as const,
      closingTime: '8:30 PM',
      mapUrl: 'https://www.google.com/maps?q=789+Rajouri+Garden,+New+Delhi'
    }
  ];

  // Status styling - only open has green color
  const getStatusStyle = () => {
    switch(showroomDetails.status) {
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
    switch(showroomDetails.status) {
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
    <div className="mx-auto my-8 px-[52px]">
      {/* Top Banner - No longer sticky */}
      <div className="p-4 md:p-6 mb-8 z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-[#AF1F2D] text-2xl font-medium">{showroomDetails.name}</h1>
            
            <div className="flex items-center mt-2 md:mt-0 md:ml-3">
              <span className={`text-xs px-2 py-1 rounded-sm ${getStatusStyle()}`}>
                {getStatusLabel()}
              </span>
              {showroomDetails.status !== 'closed' && (
                <span className="text-xs text-gray-500 ml-1 font-medium">
                  Till {showroomDetails.closingTime}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
              <GoogleIcon width={20} height={20} className="mr-1" />
              <StarRating rating={showroomDetails.rating} size={20} />
              <span className="font-medium">{showroomDetails.rating}/5</span>
            </div>
          
          <div className="flex gap-3 mt-3 md:mt-0">
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
              onClick={() => window.open(`https://wa.me/${showroomDetails.phone.replace(/\D/g, '')}`)}
            >
              <WhatsAppIcon width={18} height={18} />
              WhatsApp
            </Button>
            <Button className="flex-1 md:flex-none">
              Book Appointment
            </Button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">{showroomDetails.address}</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-auto" style={{ width: "500px" }}>
          {/* Contact Store Card */}
          <ContactStoreCard 
            phone={showroomDetails.phone}
            email={showroomDetails.email}
            mapUrl={showroomDetails.mapUrl}
            hours={showroomDetails.hours}
            parking={showroomDetails.parking}
            languages={showroomDetails.languages}
          />
          
          {/* Qualities Banner */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] p-6">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-[70px] mb-3 flex items-center justify-center">
                  <AuthenticPurityIcon width="100%" height="70px" />
                </div>
                <span className="text-base text-[#878787]">Authentic Purity</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-[70px] mb-3 flex items-center justify-center">
                  <CertOfAuthenticityIcon width="100%" height="70px" />
                </div>
                <span className="text-base text-[#878787]">Certificate of Authenticity</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-[70px] mb-3 flex items-center justify-center">
                  <ProfStaffIcon width="100%" height="70px" />
                </div>
                <span className="text-base text-[#878787]">Professional Staff</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-[70px] mb-3 flex items-center justify-center">
                  <CertOfAuthenticityIcon width="100%" height="70px" />
                </div>
                <span className="text-base text-[#878787]">Certificate of Authenticity</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-[70px] mb-3 flex items-center justify-center">
                  <ProfStaffIcon width="100%" height="70px" />
                </div>
                <span className="text-base text-[#878787]">Professional Staff</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:flex-1 flex flex-col gap-6">
          {/* Map and Gallery Card */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] flex flex-col">
            {/* Map section */}
            <div className="min-h-[400px] flex items-center justify-center p-[30px]">
              <iframe 
                src="https://www.google.com/maps/d/embed?mid=1De-ROxhGfh7a8YtDILyz239x-DnYxQ4&ehbc=2E312F&noprof=1" 
                width="100%" 
                height="400px"
              ></iframe>
            </div>
            
            {/* Store Images Carousel */}
            <StoreImagesCarousel images={galleryImages} width={910} />
          </div>
        </div>
      </div>
      
      {/* Full-width Ad Banner with reduced height */}
      <div className="w-full my-12 bg-white shadow-[0px_1px_4px_0px_#0000000F] overflow-hidden">
        <a href="/promotions/special-offer" className="block">
          <img 
            src="/assets/ad3.png" 
            alt="Special Promotion" 
            className="w-full h-[150px] object-cover"
          />
        </a>
      </div>
      
      {/* Other Showrooms Section */}
      <div className="w-full mt-12 mb-8">
        <h2 className="text-2xl font-medium text-[#AF1F2D] mb-6">Other Showrooms</h2>
        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4">
          {otherShowrooms.map(showroom => (
            <div key={showroom.id} className="flex-shrink-0" style={{ width: "350px" }}>
              <ShowroomCard 
                id={showroom.id}
                name={showroom.name}
                address={showroom.address}
                phone={showroom.phone}
                state={showroom.state}
                rating={showroom.rating}
                status={showroom.status}
                closingTime={showroom.closingTime}
                mapUrl={showroom.mapUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showroom;