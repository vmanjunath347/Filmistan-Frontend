import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {


  private localHost = "http://localhost:9090/"
  
  constructor(private http:HttpClient) { }

  public getUsers({ username, password }: { username: string; password: string; }){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/user/all",{headers});
  }

  public getCities(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/city/all",{headers});
  }

  public postCity(username:String,password: string, city:string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/admin/city",{name:city},{headers,responseType:'text' as 'json'})
    
  }

  public editCity(username:String,password: string, cityId:number, newName:string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.put("http://localhost:9090/filmistan/admin/city/"+cityId,{name:newName},{headers,responseType:'text' as 'json'})
    
  }

  public deleteCity(username:String,password: string, cityId:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.delete("http://localhost:9090/filmistan/admin/city/"+cityId,{headers,responseType:'text' as 'json'})
    
  }

  public registerUser(name:string,username:string,password:string){
    //const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/register",{name:name,password:password,username:username})
    
  }

  public validateAdminLogin(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/validate",{headers,responseType:'text' as 'json'})
  }

  public validateUserLogin(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/user/validate",{headers,responseType:'text' as 'json'})
  }

  public gettheatres(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/theatre/all",{headers});
  }

  public addtheatres(username:String,password: string, name:String, seatCount:number, cityId:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/admin/theatre",{name:name,seatCount:seatCount,cityId:cityId},{headers});
  }

  public editTheatre(username:String,password: string, id:number, newName:string, newSeatCount:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.put("http://localhost:9090/filmistan/admin/theatre/"+id,{name:newName,seatCount:newSeatCount},{headers});
  }

  public deleteTheatre(username:String,password: string, id:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.delete("http://localhost:9090/filmistan/admin/theatre/"+id,{headers});
  }

  public addShowTimes(username:String,password: string,hour:number,minute:number,theatreId:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/admin/timing",{hour:hour,minute:minute,theatreId:theatreId},{headers});
  }

  public getAllShowTimes(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/timing/all",{headers});
  }

  public getAllShows(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/show/all",{headers});
  }

  public userGetAllShows(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/user/show/all",{headers});
  }

  public deleteShowTimes(username:String,password: string, id:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.delete("http://localhost:9090/filmistan/admin/timing/"+id,{headers,responseType:'text' as 'json'});
  }

  public editShowTimes(username:String,password: string, id:number,hour:number,minute:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.put("http://localhost:9090/filmistan/admin/timing/"+id,{hour:hour,minute:minute},{headers});
  }
  public addMovie(username:String,password: string, name:String,startDay:number,startMonth:number,startYear:number,endDay:number,endMonth:number,endYear:number,timingId:number[]){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/admin/movie",{name:name,startDay:startDay,startMonth:startMonth,startYear:startYear,endDay:endDay,endMonth:endMonth,endYear:endYear,timingId:timingId},{headers});
  }

  public getAllMovies(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/admin/movie/all",{headers});
  }
  public userGetAllMovies(username:String,password: string){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/user/movie/all",{headers});
  }

  public userGetMovieById(username:String,password: string, id:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.get("http://localhost:9090/filmistan/user/movie/"+id,{headers});
  }

  public deleteMovie(username:String,password: string, id:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.delete("http://localhost:9090/filmistan/admin/movie/"+id,{headers,responseType:'text' as 'json'});
  }

  public bookTicket(username:String,password: string, ticketCount:number, showId:number){
    const headers = new HttpHeaders({Authorization:"Basic "+btoa(username+":"+password)})
    return this.http.post("http://localhost:9090/filmistan/user/show/book",{ticketCount:ticketCount,showId:showId,username:username},{headers});
  }

}
