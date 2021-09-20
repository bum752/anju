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

export const ingredientSearchKeyword = atom<string>({
  key: 'ingredientSearchKeyword',
  default: '',
});

export const cookingMethodFilter = atom<number[]>({
  key: 'cookingMethodFilter',
  default: [],
});

export const sauceFilter = atom<number[]>({
  key: 'sauceFilter',
  default: [],
});
