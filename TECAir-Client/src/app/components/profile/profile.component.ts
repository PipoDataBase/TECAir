import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.module';
import { Student } from 'src/app/models/student.module';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
})
export class ProfileComponent {

  isMobile: boolean;

  isEdit: boolean;

  perfiles : Profile[] = [

    {
      Email: 'piporin@gmail.com',
      Phone: '83572342',
      Name: 'Pipo',
      LName1: 'Rin',
      LName2: 'Ron'
    }
    

  ]

  Profile = {

    Email: 'piporin@gmail.com',
    Phone: '83572342',
    Name: 'Pipo',
    LName1: 'Rin',
    LName2: 'Ron'

  }

  Student = {
    Credential: '2021571438',
    Miles:'84.3',
    University: 'Tecnologico de Costa Rica'
  }

 

  profileOption: Observable<Profile[]> | undefined;

  constructor(private _formBuilder: FormBuilder){

    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });
    
    this.isEdit = false;

  }



  paymentInformationStepM = this._formBuilder.group({
    passengerCreditCardNumberInputM: ['', Validators.required],
    passengerCardExpirationdateInputM: ['', Validators.required],
    passengerCardCVVInputM: ['', Validators.required],
  });


}
