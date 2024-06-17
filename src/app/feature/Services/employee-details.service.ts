import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  
  updateApi="http://127.0.0.1:5000/update_emp"

  constructor(private http:HttpClient) { }

  updateEmp(empdata:any,id:any){
    const update=`${this.updateApi}/${id}`
    // console.log(update);
    return this.http.put(update,empdata)
   }


  empData(id:any,data:any){
    // console.log(id);
    return this.http.post("http://127.0.0.1:5000/employement_details/"+id,data)
  }
 
  getEmpData(id:any){
    return this.http.get("http://127.0.0.1:5000/get_employement_details/"+id)
  }

  sendDate(date:any,id:any,enddate:any){
    return this.http.get("http://127.0.0.1:5000/get_employee_details/"+id+'/'+date+'/'+enddate)

  }

  empSendDate(date:any,id:any,enddate:any){
    return this.http.get("http://127.0.0.1:5000/get_employement_detail/"+id+'/'+date+'/'+enddate)

  }

  address(addressData:any){
    // console.log("http://127.0.0.1:5000/address_details/"+addressData.Employee_Id);
    return this.http.post("http://127.0.0.1:5000/address_details/"+addressData.Employee_Id,addressData);
  }


  emergencyDetails(emergenctData:any){
    return this.http.post("http://127.0.0.1:5000/"+emergenctData.Employee_Id,emergenctData);
  }

  searchPrsentAddress(id,esd,end,addressType){
    console.log(esd,end,addressType,id);
    return this.http.get("http://127.0.0.1:5000/get_address_detail/"+id+'/'+esd+'/'+end+'/'+addressType)
 
  }

  searcPhermanentAddress(id,esd,end,addressType){
    console.log(esd,end,addressType,id);
    return this.http.get("http://127.0.0.1:5000/get_address_detail/"+id+'/'+esd+'/'+end+'/'+addressType)
  
  }
 


}
