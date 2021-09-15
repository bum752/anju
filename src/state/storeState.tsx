import axios from 'axios';
import { atom, selector } from 'recoil';
import { store } from '../types/store';

export const storesState = selector<store[]>({
  key: 'retrieveStoresSelector',
  get: async ({ get }) => {
    const response = await axios.get('/stores');

    return response.data;
  },
});

export const selectedStoreState = atom<store | null>({
  key: 'selectedStoreState',
  default: null,
});
