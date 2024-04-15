import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAddService {

  constructor(private http:HttpClient) { }

  addEmployee(data:any){
    return this.http.post('http://127.0.0.1:5000/add_emp_details',data);
  }
  getAllperson(){
  return this.http.get("http://127.0.0.1:5000/get_emp_details")
  }

}
