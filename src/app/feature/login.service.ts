import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginfunctionality1(data:any){
    const res = this.http.post('',data);
    return res;
  }

  loginfunctionality2(data:any){
    const res=this.http.get('',data);
    return res;
  }

}
