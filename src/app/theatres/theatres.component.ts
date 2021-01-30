import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { AuthenticationService } from '../authentication.service';
import { CitiesComponent } from '../cities/cities.component';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit {
  private message:any;
  public theatresArray: any[] = [];
  public theatresInCityArray: any[] = [];
  private theatres:any;
  private adminLogin!: AdminloginComponent;
  newtheatreName = ''
  newtheatreSeatCount = 0
  cityIdOfEditTheatre = 0
  edittheatreId =0
  cityIdOfDeleteTheatre = 0
  deletetheatreId = 0
  oldtheatreID  =0
  cityName = 0;
  public citiesArray: any[] = [];
  private cities:any;
  

  constructor(private service:RestapiService, private router:Router, private loginService:AuthenticationService) { }

  ngOnInit(): void {
    this.createTheatreAray()
    this.createCitiesAray()
  }

  editTheatre(){

    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    var confirmedSeatCount = 0
    if(typeof this.newtheatreSeatCount != "string")
      confirmedSeatCount = this.newtheatreSeatCount
    else{
      for(var q in this.theatresInCityArray){
        if(this.edittheatreId == this.theatresInCityArray[q].id){
          confirmedSeatCount = this.theatresInCityArray[q].seatCount;
          break
        }
      }
    }
    let resp = this.service.editTheatre(username!,password!, this.edittheatreId, this.newtheatreName, this.newtheatreSeatCount);
    resp.subscribe(data=>{
      this.theatres = data;
      let resp2 = this.service.gettheatres(username!,password!);
    resp2.subscribe(data=>{this.theatres = data;
      var theatreArrayTemp= this.theatres["theatres"]
      this.theatresArray = []
      for(var theatre in theatreArrayTemp)
        this.theatresArray.push({id:theatreArrayTemp[theatre]["id"], name:theatreArrayTemp[theatre]["name"],city:theatreArrayTemp[theatre]["city"],seatCount:theatreArrayTemp[theatre]["seat count"]})})
      
    })
  }

  deleteTheatre(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    let resp = this.service.deleteTheatre(username!,password!, this.deletetheatreId)
    resp.subscribe(data=>{
      console.log(data)
      this.theatres = data;
      let resp2 = this.service.gettheatres(username!,password!);
    resp2.subscribe(data=>{this.theatres = data;
      var theatreArrayTemp= this.theatres["theatres"]
      this.theatresArray = []
      for(var theatre in theatreArrayTemp)
        this.theatresArray.push({id:theatreArrayTemp[theatre]["id"], name:theatreArrayTemp[theatre]["name"],city:theatreArrayTemp[theatre]["city"],seatCount:theatreArrayTemp[theatre]["seat count"]})})
      
    })
  }

  fillTheatresInCities(){
    this.theatresInCityArray=[]
    for(var q in this.theatresArray){
      var tempTheatre = this.theatresArray[q]
      var tempCityName = tempTheatre.city
      var tempCityId = 0;
      for(var w in this.citiesArray){
        var tempTempCity = this.citiesArray[w]
        var tempTempCityName = tempTempCity.name;
        if(tempTempCityName == tempCityName){
          tempCityId = tempTempCity.id;
          break
        }
      }

      if(tempCityId == this.cityIdOfDeleteTheatre)
        this.theatresInCityArray.push(tempTheatre)
    }
  }

  fillTheatresInCities2(){
    this.theatresInCityArray=[]
    for(var q in this.theatresArray){
      var tempTheatre = this.theatresArray[q]
      var tempCityName = tempTheatre.city
      var tempCityId = 0;
      for(var w in this.citiesArray){
        var tempTempCity = this.citiesArray[w]
        var tempTempCityName = tempTempCity.name;
        if(tempTempCityName == tempCityName){
          tempCityId = tempTempCity.id;
          break
        }
      }

      if(tempCityId == this.cityIdOfEditTheatre)
        this.theatresInCityArray.push(tempTheatre)
    }
  }

  createCitiesAray(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    let resp = this.service.getCities(username!,password!);
    resp.subscribe(data=>{this.cities = data;
      for(var city in this.cities)
      this.citiesArray.push({id:this.cities[city]["id"], name:city})})
  }

  addNewTheatre(){
    let username= sessionStorage.getItem('username');
     let password= sessionStorage.getItem('password');
     let resp = this.service.addtheatres(username!,password!,this.newtheatreName,this.newtheatreSeatCount,this.cityName);
     resp.toPromise().then(data=>{
      this.theatres = data;
      let resp2 = this.service.gettheatres(username!,password!);
    resp2.subscribe(data=>{this.theatres = data;
      var theatreArrayTemp= this.theatres["theatres"]

      for(var theatre in theatreArrayTemp)
        this.theatresArray.push({id:theatreArrayTemp[theatre]["id"], name:theatreArrayTemp[theatre]["name"],city:theatreArrayTemp[theatre]["city"],seatCount:theatreArrayTemp[theatre]["seat count"]})})
      
    })
    }

  createTheatreAray(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    let resp = this.service.gettheatres(username!,password!);
    resp.subscribe(data=>{this.theatres = data;
      var theatreArrayTemp= this.theatres["theatres"]

      for(var theatre in theatreArrayTemp)
        this.theatresArray.push({id:theatreArrayTemp[theatre]["id"], name:theatreArrayTemp[theatre]["name"],city:theatreArrayTemp[theatre]["city"],seatCount:theatreArrayTemp[theatre]["seat count"]})})
      }

      

  logoutOfApp(){
    this.loginService.logOut()
    this.router.navigate(['filmistan/admin'])
  }

  /*

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

  */

}
