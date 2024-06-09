import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


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
  rtfApi='http://127.0.0.1:5000/retrieve_template';
  updateApi="http://127.0.0.1:5000/update_emp";


  constructor(private http:HttpClient) { }
  loadTemplate(formData:any){
    return this.http.post("http://127.0.0.1:5000/add_template",formData)
    
   }
   displayPdf(letterId){
    // const rtf=`${this.rtfApi}/${letterId}`
    // window.open(rtf,'_blank')
    const pdfApi=`${this.getApi}/${letterId}`
    window.open(pdfApi,'_blank');

   }

   updateEmp(empdata:any,id:any){
    const update=`${this.updateApi}/${id}`
    console.log(update);
    
    return this.http.put(update,empdata)
  
   }
  
   genarateTemplate(genarateData:any){
    return this.http.post("http://127.0.0.1:5000/generate_letter",genarateData,{ responseType: 'blob' })
   }
  
   letterData(letterId:any,Employee_Number:any){
    console.log("lh",letterId);
    console.log("ghj",Employee_Number);
    
    let params = new HttpParams();
    params = params.append('param1', letterId);
    params = params.append('param2', Employee_Number);
    console.log(params);
    
    return this.http.get("http://127.0.0.1:5000/view_pdf",{ params: params, responseType: 'blob' })
   
   }
  
  
  
}
