import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  allMovies:any[]=[]
  movies:any
  movieBookPrep:any

  constructor(private router: Router,
    private loginservice: AuthenticationService, private service: RestapiService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  bookingInitialProv(movie:any){
    sessionStorage.setItem("movie",movie)
    this.router.navigate(["filmistan/bookticket"])
  }

  getAllMovies(){
    let username = sessionStorage.getItem('username2');
    let password = sessionStorage.getItem('password2');
    let resp = this.service.userGetAllMovies(username!,password!)
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

  logoutOfApp() {
    this.loginservice.logOut2()
    this.router.navigate(['filmistan/login'])
  }

}
