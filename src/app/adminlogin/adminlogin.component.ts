import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  loginMessage:any

  constructor(private router: Router,
    private loginservice: AuthenticationService, private apiService: RestapiService) { }

  ngOnInit() {
  }

  checkLogin() {
      let resp = this.apiService.validateAdminLogin(this.username,this.password);
      resp.subscribe(data=>{this.loginMessage = data
      if(this.loginMessage=="Success")
     {
      this.loginservice.authenticate(this.username, this.password)
      this.router.navigate(['filmistan/admin/home'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true})
  }

}