import { create } from 'zustand';
import storesData from '@/assets/stores_data.json';

interface Schedule {
  status?: string;
  from: [string, string];
  to: [string, string];
  break_from: [string, string];
  break_to: [string, string];
}

interface Showroom {
  url_key: string;
  name: string;
  street: string;
  city: string;
  telephone: string;
  email: string;
  status: string;
  schedule: {
    mon: Schedule;
    tue: Schedule;
    wed: Schedule;
    thu: Schedule;
    fri: Schedule;
    sat: Schedule;
    sun: Schedule;
  };
}

interface ShowroomStore {
  showrooms: Showroom[];
  getShowroomsByCity: (city: string) => Showroom[];
  getShowroomByUrlKey: (urlKey: string) => Showroom | undefined;
}

const useShowroomStore = create<ShowroomStore>((set, get) => ({
  showrooms: storesData,

  getShowroomsByCity: (city: string) => {
    const { showrooms } = get();
    return showrooms.filter(showroom => 
      showroom.city.toLowerCase() === city.toLowerCase()
    );
  },

  getShowroomByUrlKey: (urlKey: string) => {
    const { showrooms } = get();
    return showrooms.find(showroom => showroom.url_key === urlKey);
  }
}));

export { useShowroomStore }; 