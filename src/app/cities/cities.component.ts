import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  private message:any;
  public citiesArray: any[] = [];
  private cities:any;
  private adminLogin!: AdminloginComponent;
  newCityName = ''
  editCityName :any
  deleteCityName =0
  oldCityName =0

  constructor(private service:RestapiService, private router:Router, private loginService:AuthenticationService) { }

  ngOnInit(): void {
    this.createCitiesAray()
  }

  createCitiesAray(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    let resp = this.service.getCities(username!,password!);
    resp.subscribe(data=>{this.cities = data;
      for(var city in this.cities)
      this.citiesArray.push({id:this.cities[city]["id"], name:city})})
  }

  logoutOfApp(){
    this.loginService.logOut()
    this.router.navigate(['filmistan/admin'])
  }

  addNewCity(){
  let username= sessionStorage.getItem('username');
   let password= sessionStorage.getItem('password');
   let resp = this.service.postCity(username!,password!,this.newCityName);
   resp.toPromise().then(data=>{
    this.cities = data;
    this.cities = JSON.parse(this.cities)
    this.citiesArray.push({id:this.cities["id"],name:this.cities["name"]})})
  }

  editNewCity(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
        let resp2 = this.service.editCity(username!,password!,this.oldCityName,this.editCityName);
          resp2.subscribe(data=>{
            for(var q in this.citiesArray){
              if(this.citiesArray[q].id==this.oldCityName){
                this.citiesArray[q].name = this.editCityName
                break
              }
            }
          })
  }

  deleteCities(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    console.log(this.deleteCityName)
    let resp2 = this.service.deleteCity(username!,password!,this.deleteCityName);
    resp2.subscribe(data=>{
      if(data =="success"){
        for(var q=0;q<this.citiesArray.length;q++){
          if(this.citiesArray[q].id==this.deleteCityName){
            this.citiesArray.splice(q,1)
            break
          }
        }
      }
    })
  }

}
