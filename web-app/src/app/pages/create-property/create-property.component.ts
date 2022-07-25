import {Component, OnInit} from '@angular/core';
import {Property} from '../../../models/property';
import {FormControl, Validators} from '@angular/forms';
import {PropertyService} from '../../../services/propertyService';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {mimetype} from '../../validators/mime-type.validator';

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
  pickedPicture = '';

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      location: new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
      size: new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
      price: new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
      picture: new FormControl(null, {})
      // picture: new FormControl(null, {asyncValidators: [mimetype]})
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

            this.form.setValue({
              location: this.property.location,
              price: this.property.price,
              size: this.property.size,
              picture: this.property.pictures[0],
            });
          });
        }
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
      this.property.location = this.form.value.location;
      this.property.size = this.form.value.size;
      this.property.price = this.form.value.price;
      this.propertyService.updateProperty(this.property);
    } else {
      const pictList: number[] = [];
      const property: Property = {
        _id: '',
        size: this.form.value.size,
        price: this.form.value.price,
        location: this.form.value.location,
        type: this.form.value.type,
        status: true,
        owner: 'admin',
        pictures: pictList
      };
      this.propertyService.addProperty(property);
    }
    this.form.reset();
  }

  PickedPicture(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({picture: file});
    this.form.get('picture').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.pickedPicture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
