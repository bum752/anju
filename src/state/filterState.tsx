import { atom } from 'recoil';

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
