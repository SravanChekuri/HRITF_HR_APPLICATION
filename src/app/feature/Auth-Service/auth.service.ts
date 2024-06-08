import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router) { }

  Login(){
    // this.LoggedIn = true;
    localStorage.setItem('LoggedIn','true');
    this.router.navigate(['/home'],{ replaceUrl: true });
  }

  Logout(){
    // this.LoggedIn = false;
    // localStorage.setItem('LoggedIn','false');
    localStorage.removeItem('loggedIn');
    // localStorage.clear();
    this.router.navigate(['/login'],{ replaceUrl: true });
  }

  isLoggedIn():boolean{
    return localStorage.getItem('LoggedIn') === 'true';
  }

  
}
