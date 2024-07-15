// utils/queryEncoder.ts

import { IMotorbike } from "@/types";

export function encodeQueryParams(motorbike: IMotorbike) {
  const {
    id,
    motorbikeBrand,
    motorbikeModel,
    location,
    yearFabrication,
    km,
    fuel,
    cylinder,
    color,
    description,
    accessories,
    images,
    announce,
    price,
    condition,
    fairing,
    plate,
    exchange,
  } = motorbike;

  // Agrupando os parâmetros que serão utilizados na query
  const params = {
    id,
    motorbikeBrand,
    motorbikeModel,
    location,
    yearFabrication,
    km,
    fuel,
    cylinder,
    color,
    description,
    accessories,
    images,
    announce,
    price,
    condition,
    fairing,
    plate,
    exchange,
  };

  // Transformando os parâmetros em uma string codificada
  const encodedParams = encodeURIComponent(JSON.stringify(params));

  return encodedParams;
}
