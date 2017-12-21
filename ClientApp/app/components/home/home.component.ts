import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }
    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
      }
}
