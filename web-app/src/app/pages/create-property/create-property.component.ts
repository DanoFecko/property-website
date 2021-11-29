import {Component, OnInit} from '@angular/core';
import {Property} from '../../../models/property';
import {FormControl, Validators} from '@angular/forms';
import {PropertyService} from '../../../services/propertyService';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.sass']
})
export class CreatePropertyComponent implements OnInit {

  private mode = '';
  private propertyId?: string | null;
  public property?: Property;
  public loading = false;
  form: FormGroup;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      location: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      size: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      price: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('propertyId')) {
        this.loading = true;
        this.mode = 'edit';
        this.propertyId = paramMap.get('propertyId');
        if (this.propertyId) {
          this.propertyService.getProperty(this.propertyId).subscribe((data: any) => {
            this.loading = false;
            this.property = data.property;
          });
        }
        this.form.setValue({
          location: this.property.location,
          price: this.property.price,
          size: this.property.size
        });
      } else {
        this.mode = 'create';
        this.property = {
          _id: '',
          size: null,
          price: null,
          location: null,
          type: null,
          status: true,
          owner: 'admin',
          pictures: [],
        };
      }
    });
  }

  onAddProperty(): void {
    if ( this.form.invalid )
    {
      return;
    }
    this.loading = true;
    if (this.mode === 'edit') {
      this.propertyService.updateProperty(this.property);
    } else {
      // const property: Property = {
      //   _id: '',
      //   size: form.value.size,
      //   price: form.value.price,
      //   location: form.value.location,
      //   type: form.value.type,
      //   status: true,
      //   owner: 'admin',
      //   pictures: [],
      // };
      this.propertyService.addProperty(this.property);
    }
    this.form.reset();
  }

}
