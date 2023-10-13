import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promocion2 } from 'src/app/models/promotion2.module';
import { Viaje } from 'src/app/models/viaje.module';
import { PromocionesService } from 'src/app/services/promociones.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ViajesService } from 'src/app/services/viajes.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-promotions',
  templateUrl: './edit-promotions.component.html',
  styleUrls: ['./edit-promotions.component.css']
})
export class EditPromotionsComponent {
  username: string = '';
  promocionDetails: Promocion2 = {
    viajeId: 0,
    precio: 0,
    fechaInicio: '',
    fechaVencimiento: '',
    imagenPath: ''
  }

  viajes: Viaje[] = [];
  startDate: string = '';
  expirationDate: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private storage: AngularFireStorage, private datePipe: DatePipe, private viajesService: ViajesService, private promocionesService: PromocionesService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.promocionesService.getPromocion(id).subscribe({
            next: (response) => {
              this.promocionDetails = response;
              this.startDate = this.promocionDetails.fechaInicio;
              this.expirationDate = this.promocionDetails.fechaVencimiento;
            }
          })
        }
      }
    })

    this.viajesService.getViajes().subscribe({
      next: (viajes) => {
        this.viajes = viajes;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  // save image in firebase and get his name
  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      const filePath = `images/${new Date().getTime()}_${file.name}`;
      const task = this.storage.upload(filePath, file);
      task.then(uploadTask => {
        uploadTask.ref.getDownloadURL().then(downloadURL => {
          this.promocionDetails.imagenPath = downloadURL;
        });
      });
    }
  }

  // update and save current promotion
  updatePromotion(): void {
    // validate trip selection
    if (this.promocionDetails.viajeId == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado un viaje'
      })
      return;
    }

    // validate image selection
    if (this.promocionDetails.imagenPath == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No ha seleccionado una imagen'
      })
      return;
    }

    // validate promotion start and expiration date
    if (this.startDate && this.expirationDate) {
      var date1 = new Date(this.startDate);
      var date2 = new Date(this.expirationDate);
      if (date1 < date2) {
        const result1 = this.datePipe.transform(this.startDate, 'yyyy-M-d');
        const result2 = this.datePipe.transform(this.expirationDate, 'yyyy-M-d');
        if (result1 && result2) {
          this.promocionDetails.fechaInicio = result1;
          this.promocionDetails.fechaVencimiento = result2;
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fechas incorrectas'
        })
        return;
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato de fecha incorrecto'
      })
      return;
    }

    // validate promotion price
    if (this.promocionDetails.precio <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Precio del viaje incorrecto'
      })
      return;
    }

    // update promotion to database
    this.promocionesService.putPromocion(this.promocionDetails.viajeId, this.promocionDetails).subscribe({
      next: (response) => {
      },
      error: (response) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya existe una promoción asociada con el viajeId ' + this.promocionDetails.viajeId
        })
        return;
      }
    })

    // promotion successfully edited and saved
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Promoción guardada!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.router.navigate(["tecair-admin", this.username, "promotions"]);
    });
  }

  // return to promotions view
  back(): void {
    this.router.navigate(["tecair-admin", this.username, "promotions"]);
  }
}
