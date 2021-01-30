import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  movieIdToBook:any
  movies:any
  movieBook:any[]=[]
  movieImage:any
  movieName:any

  showsArray:any[]=[]
  shows:any
  cities:any[]=[]
  cityIds:any[]=[]
  cityid=0
  theatres:any[]=[]
  theatreIds:any[]=[]
  theatreId=0
  showId=0;
  ticketCount = 0;
  booking:any

  modalBody=''

  selectShowsArray:any[]=[]
  

  constructor(private router: Router,
    private loginservice:AuthenticationService, private service: RestapiService) { }

  getSelectShowsArray(){
    for(var q in this.showsArray){
     // console.log(this.showsArray[q])
      if(this.theatreId == this.showsArray[q].theatreId)
      this.selectShowsArray.push(this.showsArray[q])
    }
  }

  getTheatres(){
    this.theatreIds=[]
    this.theatres=[]
    for(var q in this.showsArray){
      var tempShow = this.showsArray[q]
      var tempCityId = tempShow.cityId
      if(tempCityId == this.cityid){
        var tempTheatreId = tempShow.theatreId
        var tempTheatreName = tempShow.theatreName
        if(this.theatreIds.indexOf(tempTheatreId)<0){
          this.theatreIds.push(tempTheatreId)
          this.theatres.push({id:tempTheatreId,name:tempTheatreName})
        }
      }
    }
    //console.log(this.theatres)
  }

  getAllShows(){
    let username = sessionStorage.getItem('username2');
    let password = sessionStorage.getItem('password2');

    let resp = this.service.userGetAllShows(username!,password!)
    resp.subscribe(
      data=>{this.shows = data;
            for(var q in this.shows.shows){
              var tempShow =  this.shows.shows[q]
              if(tempShow.movieId == this.movieIdToBook){
                if(this.cityIds.indexOf(tempShow.cityId)<0){
                  this.cityIds.push(tempShow.cityId)
                  this.cities.push({id:tempShow.cityId,name:tempShow.cityName})
                }
                this.showsArray.push({
                                    id:tempShow.showId,
                                    date:tempShow.date,
                                    cityName:tempShow.cityName,
                                    showTime:tempShow.showTime,
                                    movieId:tempShow.movieId,
                                    theatreName:tempShow.theatreName,
                                    timeId:tempShow.time,
                                    cityId:tempShow.cityId,
                                    theatreId:tempShow.theatreId,
                                    totalSeats:tempShow.totalSeats,
                                    bookedSeats:tempShow.bookedSeats,
                                    composite:tempShow.date+" : "+tempShow.showTime
                                  })
                                }
            }
           console.log(this.showsArray)
      })

  }

  getMovieToBook(){
    this.movieIdToBook = sessionStorage.getItem("movie")
    sessionStorage.removeItem("movie")
    let username = sessionStorage.getItem('username2');
    let password = sessionStorage.getItem('password2');
    ///console.log("this "+this.movieIdToBook)
    let resp = this.service.userGetMovieById(username!,password!,this.movieIdToBook)
    resp.subscribe(
        data=>{this.movies = data;
        
          for(var q in this.movies.movies){
          var tempMovie = this.movies.movies[q]
          var temPMovieName = tempMovie.name
          var tempMovieId = tempMovie.id
          this.movieBook.push({tempMovieId,name:temPMovieName,imagePath:"assets/"+temPMovieName+".jpg"})
          }
          this.movieImage = this.movieBook[0].imagePath
          this.movieName = this.movieBook[0].name
    })
  }

  bookticket(){
    let username = sessionStorage.getItem('username2');
    let password = sessionStorage.getItem('password2');
    let resp = this.service.bookTicket(username!,password!,this.ticketCount,this.showId)
    resp.toPromise().then(
      data=>{
          this.booking = data
          this.modalBody = "Movie: "+this.booking.Movie+"\nCity :"+this.booking.City+"\nTheatre :"+this.booking.Theatre+"\nDate :"+this.booking.Date+"\nTime :"+this.booking.Time+"\nSeat Count:"+this.booking.TicketCount;
          
      }
    )
  }

  ngOnInit(): void {
    this.getMovieToBook()
    this.getAllShows()
  }

  logoutOfApp() {
    this.loginservice.logOut2()
    this.router.navigate(['filmistan/login'])
  }

}
