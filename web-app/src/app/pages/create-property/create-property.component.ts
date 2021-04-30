import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Property } from '../../../models/property';
import { PropertyType } from '../../../models/propertyType';
import { NgForm } from '@angular/forms';
import { PropertyService } from '../../../services/propertyService';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.sass']
})
export class CreatePropertyComponent implements OnInit {

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit(): void {
  }

  onAddProperty(form: NgForm): void {
    const property: Property = {
      id: '',
      size: form.value.size,
      price: form.value.price,
      location: form.value.location,
      type: form.value.type,
      status: true,
      owner: 'admin',
      pictures: [],
    };
    this.propertyService.addProperty(property);
  }

}
