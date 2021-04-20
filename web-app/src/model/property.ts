import { PropertyType } from './propertyType';

export interface Property{
  id: number;
  type: PropertyType;
  price: number;
  size: number;
  location: string;
  status: boolean;
  owner: number;
  pictures: number[];
}
