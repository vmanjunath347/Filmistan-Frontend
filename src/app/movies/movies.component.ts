import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  data:any[]= [];
  selectedItems:any[] = [];
  selectedItems2:any[] = [];
  selectedItems3:any[] = [];
  dropdownSettings!:IDropdownSettings

  model!:NgbDateStruct;

  movieIdToDelete:any

  allMovies:any[]=[];
  citiesData:any[]=[]
  showtimes:any
  showtimesArray:any[]= []
  theatresArray:any[]=[]
  availableTimings:any[]=[]
  theatres:any;
  cities:any
  movies:any
  citiesArray:any[]=[]
  showArray:any[]=[]
  addMovieName =''
  minDate = new Date();
  startDate!:Date;
  endDate!:Date;
  dataCityNames:any[]=[]
  dataTheatre:any[]=[]
  dataTheatreId:any[]=[]
  timingsData:any[]=[]
  timingsdataId:any[] =[]

  constructor(private service:RestapiService, private router:Router, private loginService:AuthenticationService,private calendar: NgbCalendar ) { }


  selectToday() {
    this.model = this.calendar.getToday();
  }

  deleteMovie(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.deleteMovie(username!,password!,this.movieIdToDelete)
    resp.subscribe(
      data=>{
            this.getAllMovies()
            this.fillShowArray()
        })
  }

  getAllMovies(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    let resp = this.service.getAllMovies(username!,password!)
    this.allMovies = []
    resp.subscribe(
        data=>{this.movies = data;
        
        for(var q in this.movies.movies){
          var tempMovie = this.movies.movies[q]
          var temPMovieName = tempMovie.name
          var tempMovieId = tempMovie.id
          this.allMovies.push({id:tempMovieId,name:temPMovieName,imagePath:"assets/"+temPMovieName+".jpg"})
        }
    })
  }

  onItemSelect(){
    this.dataTheatre=[]
    this.dataTheatreId=[]
    for(var q in this.selectedItems){
      var tempCityName = this.selectedItems[q].item_text
      for(var w in this.theatresArray){
        var maybeCity = this.theatresArray[w].city;
        var tempTheatreId = this.theatresArray[w].id
        if((maybeCity == tempCityName)&&(this.dataTheatreId.indexOf(tempTheatreId)<0)){
          var tempTheatreName = this.theatresArray[w].name+" : "+tempCityName;
          this.dataTheatre.push({ item_id: tempTheatreId, item_text: tempTheatreName})
          this.dataTheatreId.push(tempTheatreId)
        }
      }
    }
  }

  onItemSelect2(){
    this.timingsData=[]
    this.timingsdataId=[]

    for(var q in this.selectedItems2){
      var tempTheatreId = this.selectedItems2[q].item_id
      for(var w in this.showtimesArray){
        var maybeTheatreId = this.showtimesArray[w].theatreId
        if((tempTheatreId==maybeTheatreId)&&(this.timingsdataId.indexOf(this.showtimesArray[w].id)<0)){
          this.timingsData.push({item_id: this.showtimesArray[w].id,item_text: this.showtimesArray[w].city+" : "+this.showtimesArray[w].theatre+" : "+this.showtimesArray[w].time})
          this.timingsdataId.push(this.showtimesArray[w].id)
        }
      }
    }
  }




  addMovie(){
    var inputTimigIdArray=[]
    for(var q in this.selectedItems3)
      inputTimigIdArray.push(this.selectedItems3[q].item_id)
      var startDay = this.startDate.getDate();
      var startMonth = this.startDate.getMonth()+1;
      var startYear = this.startDate.getFullYear();
      var endDay = this.endDate.getDate();
      var endMonth = this.endDate.getMonth()+1;
      var endYear = this.endDate.getFullYear();

      let username= sessionStorage.getItem('username');
      let password= sessionStorage.getItem('password');

      let resp = this.service.addMovie(username!,password!,this.addMovieName,startDay,startMonth,startYear,endDay,endMonth,endYear,inputTimigIdArray)
      resp.toPromise().then(data=>{this.movies = data;
        this.fillShowArray();
        this.getAllMovies();
      })
    
  }

  getAvailableTimings(){
    this.availableTimings=[]
    for(var q in this.showtimesArray){
      var tempShowTimeId = this.showtimesArray[q].id
      var taken=0
      for(var w in this.showArray){
        var tempShowDate = new Date(this.showArray[w].date)
        var tempTimingId = this.showArray[w].timingId
        if((tempShowDate>=this.startDate)&&(tempShowDate<=this.endDate)&&(tempTimingId==tempShowTimeId)){
          taken=1
          break;
        }
      }
      if(taken==0){
        this.availableTimings.push(this.showtimesArray[q])
      }
    }
    this.fillCitiesData()
  }

  fillCitiesData(){
    this.dataCityNames=[]
    this.citiesData=[]
    for(var q in this.availableTimings){
      var tempCity=this.availableTimings[q].city;
      if(this.dataCityNames.indexOf(tempCity)<0){
        for(var w in this.citiesArray){
          var maybeCityId=this.citiesArray[w].id
          var maybeCityName = this.citiesArray[w].name
          if(maybeCityName == tempCity){
          this.citiesData.push({ item_id: maybeCityId, item_text: maybeCityName})
          this.dataCityNames.push(maybeCityName)
          break
          }
        }
      }
    }
  }

  fillShowArray(){
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    this.showArray=[]
    let resp = this.service.getAllShows(username!,password!)
    resp.subscribe(data=>{this.showtimes = data;
    var theatreArrayTemp= this.showtimes["shows"]
      for(var theatre in theatreArrayTemp)
          this.showArray.push({id:theatreArrayTemp[theatre]["showId"], date:theatreArrayTemp[theatre]["date"],movieId:theatreArrayTemp[theatre]["movieId"],timingId:theatreArrayTemp[theatre]["time"],totalSeats:theatreArrayTemp[theatre]["totalSeats"],bookedSeats:theatreArrayTemp[theatre]["bookedSeats"]})})
  }

  createCitiesAray(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    this.citiesArray =[]
    let resp = this.service.getCities(username!,password!);
    resp.subscribe(data=>{this.cities = data;
      for(var city in this.cities)
      this.citiesArray.push({id:this.cities[city]["id"], name:city})})
  }

  createTheatreAray(){
    let username= sessionStorage.getItem('username');
    let password= sessionStorage.getItem('password');
    this.theatresArray=[]
    let resp = this.service.gettheatres(username!,password!);
    resp.subscribe(data=>{this.theatres = data;
    var theatreArrayTemp= this.theatres["theatres"]

    for(var theatre in theatreArrayTemp)
        this.theatresArray.push({id:theatreArrayTemp[theatre]["id"], name:theatreArrayTemp[theatre]["name"],city:theatreArrayTemp[theatre]["city"],seatCount:theatreArrayTemp[theatre]["seat count"]})})
  
      }

  getShowTimesAll() {
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    this.showtimesArray=[]
    let resp = this.service.getAllShowTimes(username!, password!)
    resp.subscribe(data => {
      this.showtimes = data;
      var showTimeTemp = this.showtimes["timings"];
      for (var q in showTimeTemp) {
        this.showtimesArray.push({ id: showTimeTemp[q]["id"], theatre: showTimeTemp[q]["theatre"], theatreId: showTimeTemp[q]["theatreId"], city: showTimeTemp[q]["city"], time: showTimeTemp[q]["time"] })
      }
    })
  }


  ngOnInit(): void {
    this.fillShowArray();
    this.createCitiesAray();
    this.createTheatreAray();
    this.getShowTimesAll();
    this.getAllMovies();
    this.selectedItems = [
    ]

    this.selectedItems2 = [
    ]
    
      this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };

  }

   logoutOfApp(){
    this.loginService.logOut()
    this.router.navigate(['filmistan/admin'])
  }

}
