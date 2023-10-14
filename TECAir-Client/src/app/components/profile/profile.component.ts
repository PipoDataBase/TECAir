import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile.module';
import { Student } from 'src/app/models/student.module';
import { ProfileService } from 'src/app/services/profile.service';
import { StudentService } from 'src/app/services/student.service';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {

  isMobile: boolean;

  isEdit: boolean;

  perfiles: Profile[] = [];
  students: Student[] = [];


  Profile = {
    correo: '',
    telefono: '',
    nombre: '',
    apellido1: '',
    apellido2: ''
  };

  ProfileBurn = {

    Email: 'piporin@gmail.com',
    Phone: '83572342',
    Name: 'Pipo',
    LName1: 'Rin',
    LName2: 'Ron'

  }

  StudentBurn = {
    Credential: '2021571438',
    Miles: '84.3',
    University: 'Tecnologico de Costa Rica'
  }

  Student = {
    carnet: '',
    correo: '',
    millas: '',
    universidadId: ''
  };


  profileOption: Observable<Profile> | undefined;
  studentOption: Observable<Student> | undefined;


  constructor(private _formBuilder: FormBuilder, private profileServce: ProfileService, private studentService: StudentService) {

    this.isMobile = window.innerWidth <= 767;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 767;
    });


    this.isEdit = false;


  }
  ngOnInit() {

    this.profileServce.getClients().subscribe({
      next: (perfiles) => {
        this.perfiles = perfiles;
        this.Load();
      },
      error: (response) => {
        console.log(response);
      }

    })



  }
  Load() {
    const employeeFound = this.perfiles.find((profile) => profile.correo === this.ProfileBurn.Email)

    console.log('loading...')

    if (employeeFound) {
      this.Profile = employeeFound;
      console.log('testing for student')
      this.findIn();

      console.log('Loaded')
    } else {
      alert("No User Found!");
    }
  };

  findIn() {


    this.studentService.getClient(this.Profile.correo).subscribe({
      next: (student) => {
        this.Student = student;
        //console.log(this.Student)
        //console.log(student)

      },
      error: (response) => {
        console.log(response);
      }


    })

    /*const studentFound = this.Student
    console.log(studentFound);
    */
    /*  if (studentFound) {
       this.Student = studentFound;
       console.log('student Found')
     } else {
       console.log('student not Found')
     }*/
  }



}
