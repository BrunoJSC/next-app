export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  message: string;
}

export interface ICar {
  id: string;
  name: string;
  email: string;
  fip: string;
  phone: string;
  location: string;
  brandCar: string;
  modelCar: string;
  bodyType: string;
  mechanic: string;
  plate: string;
  auction: string;
  yearFabrication: string;
  yearModification: string;
  color: string;
  doors: string;
  fuel: string;
  km: string;
  accessories: string[];
  price: string;
  exchange: string;
  description: string;
  condition: string;
  motors: string;
  stores: string;
  announce: string;
  images: string[];
}

export interface IMotorbike {
  id: string;
  motorbikeModel: string;
  motorbikeBrand: string;
  price: string;
  km: number;
  color: string;
  typeBody: string;
  fuel: string;
  location: string;
  yearFabrication: number;
  yearModification: number;
  mechanic: string;
  plate: string;
  description: string;
  accessories: string[];
  cylinder: string;
  announce: string;
  images: string[];
}
