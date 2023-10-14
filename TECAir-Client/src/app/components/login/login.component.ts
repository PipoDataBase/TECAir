import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule]
})
export class LoginComponent {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, public matDialog: MatDialog) { }

  signUp(): void {
    this.dialogRef.close();
    const dialogRef = this.matDialog.open(SignUpComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  login(): void {

  }
}
