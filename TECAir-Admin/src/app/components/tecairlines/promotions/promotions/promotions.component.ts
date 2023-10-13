import { Component } from '@angular/core';
import { PromocionesService } from 'src/app/services/promociones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Promocion } from 'src/app/models/promocion.module';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

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

  constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private promocionesService: PromocionesService) { }

  updatePromotions(): void {
    this.promocionesService.getPromociones().subscribe({
      next: (promociones) => {
        this.promociones = promociones;
        this.dataSource = new MatTableDataSource(this.promociones);
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

  // go to add-promotion view
  addPromotion(): void {
    this.router.navigate(["tecair-admin", this.username, "add-promotion"]);
  }

  // go to edit-promotion view
  editPromotion(id: number): void {
    this.router.navigate(["tecair-admin", this.username, "edit-promotion", id]);
  }

  // delete selected promotion
  deletePromotion(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#e13a2d',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.promocionesService.deletePromocion(id).subscribe({
          next: (response) => {
            this.updatePromotions();
          },
          error: (error) => {
            console.log(error);
          }
        })
        Swal.fire(
          '¡Eliminado!',
          'La promoción ha sido eliminada.',
          'success'
        )
      }
    })
  }
}
