import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LettersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getApi='http://127.0.0.1:5000/convert_rtf';
  rtfApi='http://127.0.0.1:5000/retrieve_template'
  updateApi="http://127.0.0.1:5000/update_emp"

  constructor(private http:HttpClient) { }
  loadTemplate(formData:any){
    return this.http.post("http://127.0.0.1:5000/add_template",formData)
    
   }
   displayPdf(letterId){
    // const rtf=`${this.rtfApi}/${letterId}`
    // window.open(rtf,'_blank')
    const pdfApi=`${this.getApi}/${letterId}`
    window.open(pdfApi,'_blank')
    
  
   }
  
   updateEmp(empdata:any,id:any){
    const update=`${this.updateApi}/${id}`
    console.log(update);
    
    return this.http.put(update,empdata)
  
   }
  
}
