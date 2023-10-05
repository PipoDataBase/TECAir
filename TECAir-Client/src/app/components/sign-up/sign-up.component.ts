import { Component } from '@angular/core';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatInputModule],
})
export class SignUpComponent {

  constructor(private matDialog:MatDialog){}

  openSignUpDialog() {
    this.matDialog.open(SignUpComponent);
  }

}
