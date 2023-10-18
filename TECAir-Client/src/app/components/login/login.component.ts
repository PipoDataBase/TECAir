import { Component } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Profile } from 'src/app/models/profile.module';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { SignUpComponent } from '../sign-up/sign-up.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loggedInClient: Profile = {
    correo:  '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: '' 
  };


  constructor(private matDialog:MatDialog, private profileService: ProfileService){}

    
  openLogInDialog() {
    this.matDialog.open(LoginComponent);
  }

  logInClient(){

    var client = this.profileService.getClient(this.loggedInClient.correo).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
    console.log(client);
  }

  goSignUp(){
    this.matDialog.open(SignUpComponent);
  }

}
