import { atom } from 'recoil';

export const cookingMethodFilter = atom<string[]>({
  key: 'cookingMethodFilter',
  default: [],
});

export const ingredientFilter = atom<string[]>({
  key: 'ingredientFilter',
  default: [],
});

export const sourceFilter = atom<string[]>({
  key: 'sourceFilter',
  default: [],
});
