import { Component } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Promocion } from 'src/app/models/promotion.module';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  username : string ='';

  promociones: Promocion[]=[];

constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private promocionService: PromotionService){}
  
updatePromotions(): void {
  this.promocionService.getPromociones().subscribe({
    next: (promociones) => {
      this.promociones = promociones;
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
formatDate(date: string): string {
  const result = this.datePipe.transform(date, 'M/d/yy, h:mm a');
  if (result) {
    return result
  }
  return date;
}

addPromotion(): void {
  this.router.navigate(["tecair-admin", this.username, "add-promotion"]);
}

deleteFlight(id: number): void {
  this.promocionService.deletePromotion(id).subscribe({
    next: (response) => {
      this.updatePromotions();
    },
    error: (error) => {
      console.log(error);
    }
  })
}

}
