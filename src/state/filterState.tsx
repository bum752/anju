import axios from 'axios';
import { atom, selector } from 'recoil';
import { filterOption } from '../types/filter';

export const cookingMethodFilterOptionsState = selector<filterOption[]>({
  key: 'cookingMethodFilterOptionsState',
  get: async () => {
    const response = await axios.get('/methods');
    return response.data;
  },
});

export const sauceFilterOptionsState = selector<filterOption[]>({
  key: 'sauceFilterOptionsState',
  get: async () => {
    const response = await axios.get('/sauces');
    return response.data;
  },
});

export const ingredientSearchKeywordState = atom<string>({
  key: 'ingredientSearchKeywordState',
  default: '',
});

export const cookingMethodFilterState = atom<number[]>({
  key: 'cookingMethodFilterState',
  default: [],
});

export const sauceFilterState = atom<number[]>({
  key: 'sauceFilterState',
  default: [],
});
