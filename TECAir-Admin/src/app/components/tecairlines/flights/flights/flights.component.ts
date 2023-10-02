import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  username: string = '';

  constructor(private route: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.username = id;
        }
      }
    })
  }

  addFlight(): void {
    this.router.navigate(["tecair-admin", this.username, "add-flight"]);
  }
}
