import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  name = '';
  registerMessage = ''
  registerResponse:any
  
  constructor(private router: Router, private service: RestapiService) { }

  ngOnInit(): void {}

  register(){
    let resp = this.service.registerUser(this.name!, this.username,this.password!);
    resp.toPromise().then(data => {
      try{this.registerResponse = data
        this.registerMessage = "Registered Successfully"
      }
      catch(e){
        this.registerMessage = "Failed To Register"
      }
    })
  }

  resgisterAction(){
    if(this.registerMessage == "Registered Successfully")
      this.router.navigate(["filmistan/login"])
  }

}
