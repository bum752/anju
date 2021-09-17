import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { store } from '../types/store';

export const storesState = selectorFamily<store[], number[]>({
  key: 'retrieveStoresSelector',
  get: (mapBounds: number[]) => async () => {
    if (mapBounds.length === 4) {
      const response = await axios.get('/stores', { params: { geoBoundary: mapBounds.join(',') } });

      return response.data;
    }

    return [];
  },
});

export const selectedStoreState = atom<store | null>({
  key: 'selectedStoreState',
  default: null,
});
