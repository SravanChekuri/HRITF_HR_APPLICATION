/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private http:HttpClient) { }

  //Employee Information
  updateEmployeeDetails1(empInfo:any){
    return this.http.post('',empInfo);
  }

  updateEmployeeDetails2(){
    return this.http.get('');
  }

  // updateEmployeeDetails3(empInfo:any){
  //   return this.http.put('',empInfo);
  // }

  // updateEmployeeDetails4(empInfo:any){
  //   return this.http.delete('',empInfo);
  // }

  //Employee joining Details
  empJoiningDetails1(joiningInfo:any){
    return this.http.post('',joiningInfo);
  }

  empJoiningDetails2(){
    return this.http.get('');
  }

  //Employee Personal details
  empPersonalDetails1(personalInfo:any){
    return this.http.post('',personalInfo);
  }

  empPersonalDetails2(){
    return this.http.get('');
  }

}
*/
