import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urlPath:String;

  constructor(private authService:AuthService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
   
  }
  
  onLogout() {
    this.authService.logout();
  }
}


