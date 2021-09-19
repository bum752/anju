import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
import { store } from '../types/store';

type selectorMapper<Type> = {
  [Property in keyof Type]: Type[Property];
};

interface IStoreParam {
  mapBounds: number[];
  ingredientName: string | null;
  cookingMethodFilterOptionKeys: number[];
  sauceFilterOptionKeys: number[];
}

export const storesState = selectorFamily<store[], selectorMapper<IStoreParam>>({
  key: 'retrieveStoresSelector',
  get: (param) => async () => {
    if (param.mapBounds.length === 4) {
      const response = await axios.get('/stores', {
        params: {
          geoBoundary: param.mapBounds.join(','),
          ingredientName: param.ingredientName,
          method: param.cookingMethodFilterOptionKeys.join(','),
          sauce: param.sauceFilterOptionKeys.join(','),
        },
      });

      return response.data;
    }

    return [];
  },
});

export const selectedStoreState = atom<store | null>({
  key: 'selectedStoreState',
  default: null,
});
