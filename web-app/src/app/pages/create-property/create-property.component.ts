import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property';
import { PropertyType } from '../../../models/propertyType';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.sass']
})
export class CreatePropertyComponent implements OnInit {

  newProperty: Property = {
    id: '',
    size: 0,
    price: 0,
    location: '',
    type: PropertyType.LAND,
    status: false,
    owner: '',
    pictures: [],
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddProperty(form: NgForm): void {

  }

}
