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

  images: string[];
}

export interface IMotorbike {
  id: string;
  motorbikeModel: string;
  motorbikeBrand: string;
  price: number;
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
  // CILINDRADAS - 110, 125, 150, 160, 250, 300, 600, 800, 900, 1000, 1100
  cylinder: string;
  images: string[];
}
