import { z } from "zod";

const regexCelular = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export const adminSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const carSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  fip: z.string().min(1, { message: "FIP is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(regexCelular, { message: "Phone is invalid" }),
  location: z.string().min(1, { message: "Location is required" }),
  brandCar: z.string().min(1, { message: "Brand is required" }),
  modelCar: z.string().min(1, { message: "Model is required" }),
  bodyType: z.string().min(1, { message: "Body Type is required" }),
  bodyWork: z.string().min(1, { message: "Body Work is required" }),
  mechanic: z.string().min(1, { message: "Mechanic is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  plate: z.string().min(1, { message: "Plate is required" }),
  auction: z.string().min(1, { message: "Auction is required" }),
  yearFabrication: z
    .string()
    .min(1, { message: "Year Fabrication is required" }),
  yearModification: z
    .string()
    .min(1, { message: "Year Modification is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  doors: z.string().min(1, { message: "Doors is required" }),
  fuel: z.string().min(1, { message: "Fuel is required" }),
  km: z.string().min(1, { message: "Km is required" }),
  motors: z.string().min(1, { message: "Motors is required" }),
  documents: z.string().min(1, { message: "Documents is required" }),
  accessories: z.array(z.string().min(1).optional()),

  price: z.string().min(1, { message: "Price is required" }),
  exchange: z.string().min(1, { message: "Exchange is required" }),

  description: z.string().min(1, { message: "Description is required" }),
  images: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const motorbikeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  fip: z.string().min(1, { message: "FIP is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(regexCelular, { message: "Phone is invalid" }),
  location: z.string().min(1, { message: "Location is required" }),
  motorbikeBrand: z.string().min(1, { message: "Brand is required" }),
  motorbikeModel: z.string().min(1, { message: "Model is required" }),

  mechanic: z.string().min(1, { message: "Mechanic is required" }),
  plate: z.string().min(1, { message: "Plate is required" }),
  auction: z.string().min(1, { message: "Auction is required" }),
  yearFabrication: z
    .string()
    .min(1, { message: "Year Fabrication is required" }),
  yearModification: z
    .string()
    .min(1, { message: "Year Modification is required" }),
  color: z.string().min(1, { message: "Color is required" }),

  fuel: z.string().min(1, { message: "Fuel is required" }),
  km: z.string().min(1, { message: "Km is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  fairing: z.string().min(1, { message: "Fairing is required" }),
  cylinder: z.string().min(1, { message: "Cylinder is required" }),
  stores: z.string().min(1, { message: "Stores is required" }),
  exchange: z.string().min(1, { message: "Exchange is required" }),
  images: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const carShowSchema = z.object({
  price: z.string().min(1, { message: "Price is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  brandCar: z.string().min(1, { message: "Brand is required" }),
  modelCar: z.string().min(1, { message: "Model is required" }),
  bodyType: z.string().min(1, { message: "Body Type is required" }),
  plate: z.string().min(1, { message: "Plate is required" }),
  fuel: z.string().min(1, { message: "Fuel is required" }),
  km: z.string().min(1, { message: "Km is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  yearFabrication: z
    .string()
    .min(1, { message: "Year Fabrication is required" }),
  exchange: z.string().min(1, { message: "Exchange is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  doors: z.string().min(1, { message: "Doors is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  accessories: z.array(z.string().min(1).optional()),
  images: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)),
  announce: z.string().min(1, { message: "Announce is required" }),
  motors: z.string().min(1, { message: "Motors is required" }),
  stores: z.string().min(1, { message: "Stores is required" }),
});

export const motorbikeShowSchema = z.object({
  price: z.string().min(1, { message: "Price is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  motorbikeBrand: z.string().min(1, { message: "Brand is required" }),
  motorbikeModel: z.string().min(1, { message: "Model is required" }),
  plate: z.string().min(1, { message: "Plate is required" }),
  fuel: z.string().min(1, { message: "Fuel is required" }),
  km: z.string().min(1, { message: "Km is required" }),
  condition: z.string().min(1, { message: "Condition is required" }),
  yearFabrication: z
    .string()
    .min(1, { message: "Year Fabrication is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  cylinder: z.string().min(1, { message: "Cylinder is required" }),
  announce: z.string().min(1, { message: "Announce is required" }),
  stores: z.string().min(1, { message: "Stores is required" }),
  accessories: z.array(z.string().min(1).optional()),
  exchange: z.string().min(1, { message: "Exchange is required" }),
  images: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)),
});

export const contactVehicleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  cpf: z.string().refine(
    (value) => {
      if (!value) return false;
      const cpf = value.replace(/[^\d]/g, "");
      if (cpf.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(cpf)) return false;

      let sum = 0;
      let remainder;
      for (let i = 1; i <= 9; i += 1) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
      }
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false;

      sum = 0;
      for (let i = 1; i <= 10; i += 1) {
        sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
      }
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(10, 11), 10)) return false;

      return true;
    },
    {
      message: "CPF inválido",
    }
  ),

  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  message: z.string().min(1, { message: "Message is required" }),
});
