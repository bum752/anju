export type ingredient = {
  id: number;
  name: string;
}

export type menu = {
  name: string;
  base: string;
  method: string;
  ingredients: ingredient[];
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
