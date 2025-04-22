import React from 'react';
import CallIcon from '@/assets/icons/call.svg?react';
import MailIcon from '@/assets/icons/mail.svg?react';
import DirectionIcon from '@/assets/icons/direction.svg?react';
import ParkingIcon from '@/assets/icons/parking.svg?react';
import LanguageIcon from '@/assets/icons/language.svg?react';

interface ContactStoreCardProps {
  phone: string;
  email: string;
  mapUrl: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  parking?: string[];
  languages?: string[];
}

const ContactStoreCard: React.FC<ContactStoreCardProps> = ({
  phone,
  email,
  mapUrl,
  hours,
  parking = ["Street Parking", "Valet Parking Available"],
  languages = ["English", "Hindi", "Tamil", "Gujarati"],
}) => {
  return (
    <div className="bg-white shadow-[0px_1px_4px_0px_#0000000F] p-6 mb-6">
      <p className="text-[#878787] text-[20px] font-medium mb-5">Contact Store</p>
      
      {/* Contact options in same row with flex-wrap */}
      <div className="flex flex-wrap items-center gap-6 mb-8">
        <a href={`tel:${phone}`} className="flex items-center gap-2">
          <CallIcon width={20} height={20} />
          <span className="text-gray-800">{phone}</span>
        </a>
        
        <a href={`mailto:${email}`} className="flex items-center gap-2">
          <MailIcon width={20} height={20} />
          <span className="text-gray-800">{email}</span>
        </a>
        
        <a 
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center gap-2"
        >
          <DirectionIcon width={20} height={20} />
          <span className="text-[#AF1F2D]">Get Directions</span>
        </a>
      </div>
      
      {/* Two column layout with divider */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/2">
          {/* Parking Availability */}
          <div className="mb-6">
            <p className="text-[#878787] text-[20px] font-medium mb-3">Parking Availability</p>
            <div className="flex items-start gap-3">
              <ParkingIcon width={18} height={18} className="mt-1" />
              <div>
                <ul className="list-disc pl-5">
                  {parking.map((option, index) => (
                    <li key={index} className="text-gray-800 text-sm mb-1">{option}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Languages Spoken */}
          <div>
            <p className="text-[#878787] text-[20px] font-medium mb-3">Languages Spoken</p>
            <div className="flex items-start gap-3">
              <LanguageIcon width={18} height={18} className="mt-1" />
              <div className="flex flex-wrap gap-2">
                {languages.map((language, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-md"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200 mx-4"></div>
        
        {/* Right Column */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          {/* Opening Hours */}
          <div className="mb-6">
            <p className="text-[#878787] text-[20px] font-medium mb-3">Opening Hours</p>
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm font-medium">Monday - Friday:</p>
                <p className="text-gray-800 text-sm">{hours.monday}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Saturday - Sunday:</p>
                <p className="text-gray-800 text-sm">{hours.saturday}</p>
              </div>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div>
            <p className="text-[#878787] text-[20px] font-medium mb-3">Payment Methods</p>
            
            {/* No Cost EMI Label */}
            <div className="mb-3">
              <span className="bg-green-50 text-green-600 px-3 py-1 text-sm font-medium rounded-md">
                No Cost EMI Available
              </span>
            </div>
            
            {/* Payment Images */}
            <div className="flex items-center gap-3">
              <img 
                src="/assets/payment/visa.png" 
                alt="Visa" 
                className="h-[17px] object-contain"
              />
              <img 
                src="/assets/payment/mastercard.png" 
                alt="Mastercard" 
                className="h-6 object-contain"
              />
              <img 
                src="/assets/payment/rupay.png" 
                alt="RuPay" 
                className="h-6 object-contain"
              />
              <img 
                src="/assets/payment/upi.png" 
                alt="UPI" 
                className="h-[17px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStoreCard; 