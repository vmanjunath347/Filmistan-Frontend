import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  loginMessage:any

  constructor(private router: Router,
    private loginservice: AuthenticationService, private apiService: RestapiService) { }

  ngOnInit(): void {}

    checkLogin() {
      let resp = this.apiService.validateUserLogin(this.username,this.password);
      resp.subscribe(data=>{this.loginMessage = data
      if(this.loginMessage=="Success")
     {
      this.loginservice.authenticate2(this.username, this.password)
      this.router.navigate(['filmistan'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true})
  }

  goToRegister(){
    this.router.navigate(['filmistan/register'])
  }

}
