export type menu = {
  foodName: string;
  base: string;
  method: string;
  ingredient: string;
  characteristic: string;
  price: number;
};

export type store = {
  _id: string;
  name: string;
  description: string;
  menus: menu[];
  latitude: number;
  longitude: number;
  point: number | null;
  visited: boolean;
};
