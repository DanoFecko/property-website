import { Property } from '../model/property';
import { Injectable } from '@angular/core';
import { PropertyType } from '../model/propertyType';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PropertyService {

  private properties: Property[] = [];

  constructor(private http: HttpClient) {

  }

  getProperties(): void {
    this.http.get<{ message: string, properties: Property[] }>('http://loalhost:3000/api/properties')
      .subscribe((data) => {
        this.properties = data.properties;
      });
  }

  addProperty(price: number, location: string, owner: number, size: number, pictures: number[], status: boolean, type: PropertyType): void {
    const property: Property = {id: 0, price, location, owner, size, pictures, status, type};
    this.properties.push(property);
  }
}
