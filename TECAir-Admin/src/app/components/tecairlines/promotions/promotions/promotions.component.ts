import { Component } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Promocion } from 'src/app/models/promotion.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  username: string = '';
  promociones: Promocion[] = [];
  dataSource = new MatTableDataSource(this.promociones);
  columnHeaders: string[] = ['viajeId', 'imagenPath', 'origen', 'destino', 'fechaInicio', 'fechaVencimiento', 'precio', 'accion'];

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private promocionService: PromotionService) { }

  updatePromotions(): void {
    this.promocionService.getPromociones().subscribe({
      next: (promociones) => {
        this.promociones = promociones;
        this.dataSource = new MatTableDataSource(this.promociones);
        console.log(this.promociones);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })

    this.updatePromotions();
  }

  addPromotion(): void {
    this.router.navigate(["tecair-admin", this.username, "add-promotion"]);
  }

  editPromotion(id: number): void {

  }

  deletePromotion(id: number): void {

  }
}
