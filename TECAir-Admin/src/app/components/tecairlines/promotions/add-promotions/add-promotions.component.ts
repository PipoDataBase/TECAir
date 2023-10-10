import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promocion } from 'src/app/models/promotion.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.css']
})
export class AddPromotionsComponent {

  username = '';

  Promotion = {
    viajeId: 0,
    precio: 0,
    fechaInicio: '',
    fechaVencimiento: '',
    imagenPath: ''

  }

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router, private promotionService: PromotionService){}

  back(): void {
    this.router.navigate(["tecair-admin", this.username, "promotion"]);
  }



  addPromotion (){
    console.log('creando promocion...');
  }
 /* if (this.vuelo.empleadoUsuario && this.vuelo.avionMatricula && origen != '' && destino != '' && this.vuelo.fechaSalida && this.vuelo.fechaLlegada && this.vuelo.precio >= 1) {
    this.vuelosService.postVuelo(this.vuelo).subscribe({
      next: (nVuelo) => {
        if (origen && destino && nVuelo >= 1) {
          this.origen.vueloNumero = nVuelo;
          this.origen.aeropuertoId = origen;
          this.vuelosAeropuertosService.postVueloAeropuerto(this.origen).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (response) => {
              console.log(response);
            }
          })*/

}
