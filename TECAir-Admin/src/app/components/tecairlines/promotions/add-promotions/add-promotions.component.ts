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
  promocion = {
    viajeId: 0,
    precio: 0,
    fechaInicio: '',
    fechaVencimiento: '',
    imagenPath: '',
    viaje: {}
  }
  startDate: string = '';
  expirationDate: string = '';

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private router: Router, private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })
  }

  addPromotion(): void {
    console.log('creando promocion...');
    this.promocion.fechaInicio = this.startDate;
    this.promocion.fechaVencimiento = this.expirationDate;
    console.log(this.promocion.fechaInicio);
    console.log(this.promocion.fechaVencimiento);
  }

  back(): void {
    this.router.navigate(["tecair-admin", this.username, "promotions"]);
  }
}
