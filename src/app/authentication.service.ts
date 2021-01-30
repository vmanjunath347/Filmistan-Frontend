import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {

      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password',password);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.clear()
  }

  authenticate2(username: string, password: string) {

    sessionStorage.setItem('username2', username);
    sessionStorage.setItem('password2',password);
}

isUserLoggedIn2() {
  let user = sessionStorage.getItem('username2')
  console.log(!(user === null))
  return !(user === null)
}

logOut2() {
  sessionStorage.clear()
}
}