export type ingredient = {
  id: number;
  name: string;
};

export type cookingMethod = {
  id: number;
  name: string;
};

export type sauce = {
  id: number;
  name: string;
};

export type menu = {
  name: string;
  method: cookingMethod;
  ingredients: ingredient[];
  sauces: sauce[];
  characteristic: string;
  price: number;
};

export type store = {
  _id: string;
  name: string;
  description: string;
  address: string;
  menus: menu[];
  latitude: number;
  longitude: number;
  point: number | null;
  visited: boolean;
};
