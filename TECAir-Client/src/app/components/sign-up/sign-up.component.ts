import { Component } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Profile } from 'src/app/models/profile.module';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: false
})
export class SignUpComponent {

  addClientRequest: Profile = {
    correo:  '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: '' 
  };

  constructor(private matDialog:MatDialog, private profileService: ProfileService){}

  openSignUpDialog() {
    this.matDialog.open(SignUpComponent);
  }

  addClient(){
    console.log(this.addClientRequest);
    this.profileService.addClient(this.addClientRequest).subscribe({
      next: (response) => {
        console.log(this.addClientRequest);
      }
    });
  }

}
