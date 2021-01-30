import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './adminHome/home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthguardService } from './authguard.service';
import { Authguard2Service } from './authguard2.service';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { CitiesComponent } from './cities/cities.component';
import { LogoutComponent } from './logout/logout.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './register/register.component';
import { ShowTimesComponent } from './show-times/show-times.component';
import { TheatresComponent } from './theatres/theatres.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path:"filmistan/admin",component:AdminloginComponent},
  {path:"filmistan/admin/home",component:HomeComponent,canActivate:[AuthguardService]},
  {path:"filmistan/admin/cities",component:CitiesComponent,canActivate:[AuthguardService]},
  {path:"filmistan/admin/theatres",component:TheatresComponent,canActivate:[AuthguardService]},
  {path:"filmistan/logout",component:LogoutComponent,canActivate:[AuthguardService]},
  {path:"filmistan/admin/movies",component:MoviesComponent,canActivate:[AuthguardService]},
  {path:"filmistan/admin/timings",component:ShowTimesComponent,canActivate:[AuthguardService]},
  {path:"filmistan",component:UserHomeComponent,canActivate:[Authguard2Service]},
  {path:"filmistan/bookticket",component:BookTicketComponent,canActivate:[Authguard2Service]},
  {path:"filmistan/login",component:UserLoginComponent},
  {path:"filmistan/register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
