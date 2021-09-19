import axios from 'axios';
import { atom, selector } from 'recoil';
import { filterOption } from '../types/filter';

export const cookingMethodFilterOptionsState = selector<filterOption[]>({
  key: 'cookingMethodFilterOptionsState',
  get: async () => {
    const cookingMethodFilterOptions = localStorage.getItem('cookingMethodFilterOptions');

    if (cookingMethodFilterOptions) return JSON.parse(cookingMethodFilterOptions);

    const response = await axios.get('/methods');
    localStorage.setItem('cookingMethodFilterOptions', JSON.stringify(response.data));
    return response.data;
  },
});

export const sauceFilterOptionsState = selector<filterOption[]>({
  key: 'sauceFilterOptionsState',
  get: async () => {
    const sauceFilterOptions = localStorage.getItem('sauceFilterOptions');

    if (sauceFilterOptions) return JSON.parse(sauceFilterOptions);

    const response = await axios.get('/sauces');
    localStorage.setItem('sauceFilterOptions', JSON.stringify(response.data));
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
