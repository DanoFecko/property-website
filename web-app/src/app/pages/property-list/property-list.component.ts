import { Component, OnDestroy, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/propertyService';
import { Property } from '../../../models/property';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.sass']
})
export class PropertyListComponent implements OnInit, OnDestroy{

  properties: Property[] = [];
  private propertySub: Subscription | undefined;

  constructor(public propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.propertyService.getProperties();
    this.propertySub = this.propertyService.getPropertyUpdateListener().subscribe((properties: Property[]) => {
      this.properties = properties;
    });
  }

  ngOnDestroy(): void {
    this.propertySub?.unsubscribe();
  }
}
