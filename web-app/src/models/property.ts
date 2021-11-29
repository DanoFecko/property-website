import { PropertyType } from './propertyType';

export interface Property{
  _id: string;
  type: PropertyType;
  price: number;
  size: number;
  location: string;
  status: boolean;
  owner: string;
  pictures: number[];
}
