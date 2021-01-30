import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-show-times',
  templateUrl: './show-times.component.html',
  styleUrls: ['./show-times.component.css']
})
export class ShowTimesComponent implements OnInit {

  public theatresArray: any[] = [];
  public theatresInCityArray: any[] = [];
  private theatres: any;

  public editCityId=0
  public editTheatreArray: any[]  = []
  public editTheatreId = 0
  public editShowTimeArray: any[] = []
  public editShowTimeId = 0
  public editHour =0;
  public editMinute=0;

  public citiesArray: any[] = [];
  private cities: any;

  private showtimes: any;
  public showtimesArray: any[] = [];
  public showtimesInTheaterArray: any[] = [];
  showTimesId = 0

  cityId2=0
  cityId = 0
  theatreId2 = 0
  theatreId = 0
  hour = 0
  minute = 0;
  showTimeId = 0

  constructor(private service: RestapiService, private router: Router, private loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.createTheatreAray()
    this.createCitiesAray()
    this.getShowTimesAll()
  }

  editShowTime(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.editShowTimes(username!, password!,this.editShowTimeId,this.editHour,this.editMinute);
    resp.subscribe(data=>{ 
      this.showtimes = data;
      this.showtimesArray = []
      let resp = this.service.getAllShowTimes(username!, password!)
      resp.subscribe(data => {
        this.showtimes = data;
        var showTimeTemp = this.showtimes["timings"];
        for (var q in showTimeTemp) {
          this.showtimesArray.push({ id: showTimeTemp[q]["id"], theatre: showTimeTemp[q]["theatre"],theatreId: showTimeTemp[q]["theatreId"], city: showTimeTemp[q]["city"], time: showTimeTemp[q]["time"] })
        }
      })
    })
  }

  fillEditTheatresInCity(){
    this.editTheatreArray = []
    for (var q in this.theatresArray) {
      var tempTheatre = this.theatresArray[q]
      var tempCityName = tempTheatre.city
      var tempCityId = 0;
      for (var w in this.citiesArray) {
        var tempTempCity = this.citiesArray[w]
        var tempTempCityName = tempTempCity.name;
        if (tempTempCityName == tempCityName) {
          tempCityId = tempTempCity.id;
          break
        }
      }
      if (tempCityId == this.editCityId)
        this.editTheatreArray.push(tempTheatre)
    }
  }

  fillEditShowTimesInCities(){
    for(var q in this.showtimesArray){
      var tempsTheatreId = this.showtimesArray[q].theatreId
      if(tempsTheatreId == this.editTheatreId)
        this.editShowTimeArray.push(this.showtimesArray[q])
    }
  }

  fillTheatresInCities() {
    this.theatresInCityArray = []
    for (var q in this.theatresArray) {
      var tempTheatre = this.theatresArray[q]
      var tempCityName = tempTheatre.city
      var tempCityId = 0;
      for (var w in this.citiesArray) {
        var tempTempCity = this.citiesArray[w]
        var tempTempCityName = tempTempCity.name;
        if (tempTempCityName == tempCityName) {
          tempCityId = tempTempCity.id;
          break
        }
      }

      if (tempCityId == this.cityId)
        this.theatresInCityArray.push(tempTheatre)
    }
  }

  fillTheatresInCities2() {
    this.theatresInCityArray = []
    for (var q in this.theatresArray) {
      var tempTheatre = this.theatresArray[q]
      var tempCityName = tempTheatre.city
      var tempCityId = 0;
      for (var w in this.citiesArray) {
        var tempTempCity = this.citiesArray[w]
        var tempTempCityName = tempTempCity.name;
        if (tempTempCityName == tempCityName) {
          tempCityId = tempTempCity.id;
          break
        }
      }

      if (tempCityId == this.cityId2)
        this.theatresInCityArray.push(tempTheatre)
    }
  }

  logoutOfApp() {
    this.loginService.logOut()
    this.router.navigate(['filmistan/admin'])
  }

  createCitiesAray() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.getCities(username!, password!);
    resp.subscribe(data => {
      this.cities = data;
      for (var city in this.cities)
        this.citiesArray.push({ id: this.cities[city]["id"], name: city })
    })
  }

  createTheatreAray() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.gettheatres(username!, password!);
    resp.subscribe(data => {
      this.theatres = data;
      var theatreArrayTemp = this.theatres["theatres"]

      for (var theatre in theatreArrayTemp)
        this.theatresArray.push({ id: theatreArrayTemp[theatre]["id"], name: theatreArrayTemp[theatre]["name"], city: theatreArrayTemp[theatre]["city"], seatCount: theatreArrayTemp[theatre]["seat count"] })
    })
  }

  createShowtimeArray() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.gettheatres(username!, password!);
    resp.subscribe(data => {
      this.theatres = data;
      var theatreArrayTemp = this.theatres["theatres"]

      for (var theatre in theatreArrayTemp)
        this.theatresArray.push({ id: theatreArrayTemp[theatre]["id"], name: theatreArrayTemp[theatre]["name"], city: theatreArrayTemp[theatre]["city"], seatCount: theatreArrayTemp[theatre]["seat count"] })
    })
  }

  getShowTimesAll() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.getAllShowTimes(username!, password!)
    resp.subscribe(data => {
      this.showtimes = data;
      var showTimeTemp = this.showtimes["timings"];
      for (var q in showTimeTemp) {
        this.showtimesArray.push({ id: showTimeTemp[q]["id"], theatre: showTimeTemp[q]["theatre"], theatreId: showTimeTemp[q]["theatreId"], city: showTimeTemp[q]["city"], time: showTimeTemp[q]["time"] })
      }
    })
  }

  addshowTimes() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    console.log(this.hour)
    console.log(this.minute)
    let resp = this.service.addShowTimes(username!, password!, this.hour, this.minute, this.theatreId)
    resp.toPromise().then(data => {
      this.showtimes = data;
      this.showtimesArray = []
      let resp = this.service.getAllShowTimes(username!, password!)
      resp.subscribe(data => {
        this.showtimes = data;
        var showTimeTemp = this.showtimes["timings"];
        for (var q in showTimeTemp) {
          this.showtimesArray.push({ id: showTimeTemp[q]["id"], theatre: showTimeTemp[q]["theatre"],theatreId: showTimeTemp[q]["theatreId"], city: showTimeTemp[q]["city"], time: showTimeTemp[q]["time"] })
        }
      })
    })
  }

  getTimingsInTheatre(){ 
    for(var q in this.showtimesArray){
      var tempsTheatreId = this.showtimesArray[q].theatreId
      if(tempsTheatreId == this.theatreId2)
        this.showtimesInTheaterArray.push(this.showtimesArray[q])
    }
  }

  deleteTiming() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp2 = this.service.deleteShowTimes(username!, password!, this.showTimeId)
    resp2.subscribe(data => {
      this.showtimes = data;
      this.showtimesArray = []
      let resp = this.service.getAllShowTimes(username!, password!)
      resp.subscribe(data => {
        this.showtimes = data;
        var showTimeTemp = this.showtimes["timings"];
        for (var q in showTimeTemp) {
          this.showtimesArray.push({ id: showTimeTemp[q]["id"], theatre: showTimeTemp[q]["theatre"],theatreId: showTimeTemp[q]["theatreId"], city: showTimeTemp[q]["city"], time: showTimeTemp[q]["time"] })
        }
      })
    })
  }
}

