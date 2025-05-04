import { create } from 'zustand';
import storesData from '@/assets/stores_data.json';

// Define the schedule interface
interface Schedule {
  status?: string;  // Changed from 'on' | 'off' to string to match the data
  from: [string, string];
  to: [string, string];
  break_from: [string, string];
  break_to: [string, string];
}

// Define the showroom interface
interface Showroom {
  name: string;
  url_key: string;
  status: string;
  thumbnail: string;
  email: string;
  web_text: string;
  web: string;
  street: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
  lat: string;
  lng: string;
  telephone: string;
  description: string;
  schedule: {
    mon: Schedule;
    tue: Schedule;
    wed: Schedule;
    thu: Schedule;
    fri: Schedule;
    sat: Schedule;
    sun: Schedule;
  };
  sort_order: string;
  products: string;
  tags: string;
  social: string;
  icon_marker: string;
  meta_description: string;
  meta_title: string;
}

// Define the store state interface
interface ShowroomState {
  showrooms: Showroom[];
  selectedShowroom: Showroom | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setShowrooms: (showrooms: Showroom[]) => void;
  setSelectedShowroom: (showroom: Showroom | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Selectors
  getShowroomsByCity: (city: string) => Showroom[];
  getShowroomsByRegion: (region: string) => Showroom[];
  getShowroomByUrlKey: (urlKey: string) => Showroom | undefined;
}

// Create the store
const useShowroomStore = create<ShowroomState>((set, get) => {
  // Debug log for initial data
  console.log('Initial stores data:', storesData);

  return {
    // Initial state
    showrooms: storesData as Showroom[],
    selectedShowroom: null,
    isLoading: false,
    error: null,

    // Actions
    setShowrooms: (showrooms: Showroom[]) => set({ showrooms }),
    setSelectedShowroom: (showroom: Showroom | null) => set({ selectedShowroom: showroom }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setError: (error: string | null) => set({ error }),

    // Selectors
    getShowroomsByCity: (city: string) => {
      const { showrooms } = get();
      console.log('Getting showrooms for city:', city);
      console.log('Available cities:', showrooms.map(s => s.city));
      
      const filtered = showrooms.filter((showroom: Showroom) => 
        showroom.city.toLowerCase() === city.toLowerCase()
      );
      console.log('Filtered showrooms:', filtered);
      return filtered;
    },

    getShowroomsByRegion: (region: string) => {
      const { showrooms } = get();
      return showrooms.filter((showroom: Showroom) => 
        showroom.region.toLowerCase() === region.toLowerCase()
      );
    },

    getShowroomByUrlKey: (urlKey: string) => {
      const { showrooms } = get();
      console.log('Getting showroom for URL key:', urlKey);
      console.log('Available URL keys:', showrooms.map(s => s.url_key));
      
      const found = showrooms.find((showroom: Showroom) => 
        showroom.url_key === urlKey
      );
      console.log('Found showroom:', found);
      return found;
    },
  };
});

export default useShowroomStore; 