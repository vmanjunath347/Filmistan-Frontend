import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  username!: string;
  password!: string;
  message:any;

  constructor(private loginService:AuthenticationService,private router: Router) { }

  ngOnInit(){
  }

  logoutOfApp(){
    this.loginService.logOut()
    this.router.navigate(['filmistan/admin'])
  }
}
