import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/Reusables/StarRating';
import ContactStoreCard from '@/components/Reusables/ContactStoreCard';
import StoreImagesCarousel from '@/components/Reusables/StoreImagesCarouselResponsive';
import OtherStoresCard from '@/components/Reusables/OtherStoresCard';
import ProfStaffIcon from '@/assets/qualities/prof-staff.svg?react';
import CertOfAuthenticityIcon from '@/assets/qualities/cert-of-authenticity.svg?react';
import AuthenticPurityIcon from '@/assets/qualities/authentic-purity.svg?react';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?react';
import GoogleIcon from '@/assets/icons/google.svg?react';
import { useShowroomStore } from '@/store/showroomStore';
import useScrollToTop from '@/hooks/useScrollToTop';

// Define the schedule interface
interface Schedule {
  status?: string;
  from: [string, string];
  to: [string, string];
  break_from: [string, string];
  break_to: [string, string];
}

const Showroom: React.FC = () => {
  useScrollToTop();
  
  const { state, showroom } = useParams<{ state: string; showroom: string }>();
  const { getShowroomByUrlKey, getShowroomsByCity, showrooms } = useShowroomStore();

  // Debug logs
  console.log('Current showroom URL key:', showroom);
  console.log('All showrooms:', showrooms);

  // Get the current showroom details
  const showroomDetails = getShowroomByUrlKey(showroom || '');
  console.log('Showroom details:', showroomDetails);

  const currentCity = showroomDetails?.city || '';
  console.log('Current city:', currentCity);

  // Get other showrooms in the same city
  const otherShowrooms = getShowroomsByCity(currentCity)
    .filter(s => s.url_key !== showroom)
    .slice(0, 3)
    .map(s => ({
      id: s.url_key,
      name: s.name,
      address: s.street,
      phone: s.telephone,
      state: s.city.toLowerCase().replace(/\s+/g, '-'),
      rating: 4.5, // Default rating since it's not in the store data
      status: s.status === "1" ? "open" as const : "closed" as const,
      closingTime: s.schedule.mon.to.join(':'),
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.street)}`
    }));
  console.log('Other showrooms:', otherShowrooms);

  // Create an array of 10 gallery images by repeating the available images
  const galleryImages = Array(10).fill(null).map((_, index) => {
    // Use modulo to cycle through the 5 available images
    const imageNumber = (index % 5) + 1;
    return `/assets/gallery/${imageNumber}.png`;
  });

  if (!showroomDetails) {
    return <div>Showroom not found</div>;
  }
  // Status styling - only open has green color
  const getStatusStyle = () => {
    switch(showroomDetails.status) {
      case "1":
        return 'bg-green-50 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Status label
  const getStatusLabel = () => {
    switch(showroomDetails.status) {
      case "1":
        return 'Open';
      default:
        return 'Closed Now';
    }
  };

  // Format hours for display
  const formatHours = (schedule: Schedule) => {
    const formatTime = (time: [string, string]) => time.join(':');
    return `${formatTime(schedule.from)} - ${formatTime(schedule.to)}`;
  };

  const hours = {
    monday: formatHours(showroomDetails.schedule.mon),
    tuesday: formatHours(showroomDetails.schedule.tue),
    wednesday: formatHours(showroomDetails.schedule.wed),
    thursday: formatHours(showroomDetails.schedule.thu),
    friday: formatHours(showroomDetails.schedule.fri),
    saturday: formatHours(showroomDetails.schedule.sat),
    sunday: formatHours(showroomDetails.schedule.sun),
  };

  return (
    <div className="mx-auto my-8 px-0 sm:px-4 lg:px-[52px]">
      {/* Top Banner - No longer sticky */}
      <div className="py-4 mb-8 z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-[#AF1F2D] text-2xl font-medium">{showroomDetails.name}</h1>
              
            
            <div className="flex items-center mt-2 md:mt-0 md:ml-3">
              <span className={`text-xs px-2 py-1 rounded-sm ${getStatusStyle()}`}>
                {getStatusLabel()}
              </span>
              {showroomDetails.status === "1" && (
                <span className="text-xs text-gray-500 ml-1 font-medium">
                  Till {showroomDetails.schedule.mon.to.join(':')}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
                <GoogleIcon width={16} height={16} className="mr-1" />
                <StarRating rating={4.5} size={16} />
                <span className="font-medium text-sm">4.5/5</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-3 md:mt-0">
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
              onClick={() => window.open(`https://wa.me/${showroomDetails.telephone.replace(/\D/g, '')}`)}
            >
              <WhatsAppIcon width={18} height={18} />
              WhatsApp
            </Button>
            <Button className="flex-1 md:flex-none">
              Book Appointment
            </Button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">{showroomDetails.street}</p>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-[500px]">
          {/* Contact Store Card */}
          <ContactStoreCard 
            phone={showroomDetails.telephone}
            email={showroomDetails.email}
            mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroomDetails.street)}`}
            hours={hours}
            parking={["Street Parking", "Valet Parking Available"]}
            languages={["English", "Hindi", "Tamil", "Bengali"]}
          />
          
          {/* Qualities Banner */}
          <div className="hidden sm:block bg-white shadow-[0px_1px_4px_0px_#0000000F] p-6">
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
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Map and Gallery Card */}
          <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] flex flex-col">
            {/* Map section */}
            <div className="min-h-[400px] flex items-center justify-center p-0 sm:p-[30px]">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235713.11386298144!2d88.23273251546361!3d22.615825258555965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275bb4df8a5fb%3A0x8c7baba17ab3b6a0!2s${encodeURIComponent(showroomDetails.name)}!5e0!3m2!1sen!2sin!4v1746251402381!5m2!1sen!2sin`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Store Images Carousel */}
            <StoreImagesCarousel images={galleryImages} />
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
        <div className="flex flex-wrap gap-4">
          {otherShowrooms.map(showroom => (
            <div key={showroom.id} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[300px]">
              <OtherStoresCard 
                id={showroom.id}
                name={showroom.name}
                address={showroom.address}
                phone={showroom.phone}
                state={showroom.state}
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