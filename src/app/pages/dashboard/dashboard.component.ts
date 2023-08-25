import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./../../app.component.css']
})
export class DashboardComponent {

  constructor(
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);
    
    
  }

}
