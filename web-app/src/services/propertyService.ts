import {Property} from '../models/property';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class PropertyService {

  private properties: Property[] = [];
  private propertiesUpdated = new Subject<Property[]>();

  constructor(private http: HttpClient, private router: Router) {

  }

  getProperties(): void {
    this.http.get<{ message: string, properties: any }>('http://localhost:3000/api/properties')
      .subscribe((data) => {
        this.properties = data.properties;
        this.propertiesUpdated.next([...this.properties]);
        console.log(data.message);
      });
  }

  addProperty(property: Property): void {
    this.http.post<{ message: string }>('http://localhost:3000/api/properties', property)
      .subscribe((data) => {
        console.log(data.message);
        this.properties.push(property);
        this.propertiesUpdated.next([...this.properties]);
        this.router.navigate(['/property-list']);
      });
  }

  getPropertyUpdateListener(): Observable<Property[]> {
    return this.propertiesUpdated.asObservable();
  }

  deleteProperty(id: string): void {
    this.http.delete('http://localhost:3000/api/properties/' + id)
      .subscribe(() => {
        this.properties = this.properties.filter(property => property._id !== id);
        this.propertiesUpdated.next([...this.properties]);
      });
  }

  getProperty(id: string): any {
    return this.http.get<{message: string, property: Property}>('http://localhost:3000/api/properties/' + id);
  }

  updateProperty(property: Property): void {
    this.http.put('http://localhost:3000/api/properties/' + property._id, property).subscribe(response => {
        const updatedProperties = [...this.properties];
        const oldPropertyIndex = updatedProperties.findIndex(p => p._id === property._id);
        updatedProperties[oldPropertyIndex] = property;
        this.properties = updatedProperties;
        this.propertiesUpdated.next([...this.properties]);
        this.router.navigate(['/property-list']);
        console.log(response);
      }
    );
  }
}
