import axios from 'axios';
import { atom, selector } from 'recoil';
import { filterOption } from '../types/filter';

export const cookingMethodFilterOptionsState = selector<filterOption[]>({
  key: 'cookingMethodFilterOptionsState',
  get: async () => {
    const cookingMethodFilterOptions = localStorage.getItem('cookingMethodFilterOptions');

    if (cookingMethodFilterOptions) return JSON.parse(cookingMethodFilterOptions);

    const response = await axios.get('/food/methods');
    localStorage.setItem('cookingMethodFilterOptions', JSON.stringify(response.data));
    return response.data;
  },
});

export const sourceFilterOptionsState = selector<filterOption[]>({
  key: 'sourceFilterOptionsState',
  get: async () => {
    const sourceFilterOptions = localStorage.getItem('sourceFilterOptions');

    if (sourceFilterOptions) return JSON.parse(sourceFilterOptions);

    const response = await axios.get('/food/bases');
    localStorage.setItem('sourceFilterOptions', JSON.stringify(response.data));
    return response.data;
  },
});

export const ingredientSearchKeyword = atom<string>({
  key: 'ingredientSearchKeyword',
  default: '',
});

export const cookingMethodFilter = atom<string[]>({
  key: 'cookingMethodFilter',
  default: [],
});

export const sourceFilter = atom<string[]>({
  key: 'sourceFilter',
  default: [],
});
