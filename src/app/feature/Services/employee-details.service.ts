import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private http:HttpClient) { }

  empData(id:any,data:any){
    console.log(id);
   
    return this.http.post("http://127.0.0.1:5000/employement_details/"+id,data)
 
  }
 
  getEmpData(id:any){
    return this.http.get("http://127.0.0.1:5000/get_employement_details/"+id)
  }

}
