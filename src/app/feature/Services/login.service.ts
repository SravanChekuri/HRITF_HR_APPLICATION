import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // Service for login
  loginfunctionality1(data:any){
    const res = this.http.post('http://127.0.0.1:5000/login',data);
    return res;
  }

  //Service for SignUp
  signUpDataService(signupData:any){
    return this.http.post("http://127.0.0.1:5000/add_admin_details",signupData);
  }

  //Service for Forgot 
  sendEmailOtp(sendEmailData:any){
    return this.http.post("http://127.0.0.1:5000/email",sendEmailData);
  }

  // Sevice for OTP
  sendOtp(sendOtp:any){
    return this.http.post("http://127.0.0.1:5000/verify",sendOtp);
  }
 
  //Service for Reset Password
  newPassword(newPasswordSend:any){
    return this.http.put("http://127.0.0.1:5000/change_password",newPasswordSend);
  }

  getadmin(){
   return this.http.get("http://127.0.0.1:5000/get_admin_details");
  }
}
