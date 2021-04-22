import { Property } from '../model/property';
import { Injectable } from '@angular/core';
import { PropertyType } from '../model/propertyType';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PropertyService {

  private properties: Property[] = [];
  private propertiesUpdated = new Subject<Property[]>();

  constructor(private http: HttpClient) {

  }

  getProperties(): void {
    this.http.get<{ message: string, properties: Property[] }>('http://localhost:3000/api/properties')
      .subscribe((data) => {
        this.properties = data.properties;
      });
  }

  addProperty(price: number, location: string, owner: number, size: number, pictures: number[], status: boolean, type: PropertyType): void {
    const property: Property = {id: 0, price, location, owner, size, pictures, status, type};
    this.http.post<{ message: string }>('http://localhost:3000/api/properties', property)
      .subscribe((data) => {
        console.log(data.message);
        this.properties.push(property);
        this.propertiesUpdated.next([...this.properties]);
      });
  }

  getPropertyUpdateListener(): Observable<Property[]> {
    return this.propertiesUpdated.asObservable();
  }
}
