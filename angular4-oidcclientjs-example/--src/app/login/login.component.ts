import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  redirectUrl: string;

  constructor(private http: HttpClient, private auth: AuthService, private route: ActivatedRoute) {
    this.redirectUrl = this.route.snapshot.queryParams.ReturnUrl;
   }

  begin() {
    this.auth.startAuthentication();
  }

  getOtp(phoneNumber) {
    this.http.post<any>("https://localhost:44310/identity/otp", { PhoneNumber: phoneNumber, ReturnUrl: this.redirectUrl })
      .subscribe(response => { });
  }

  reg(phoneNumber, otp) {

    const fd = new FormData();
    fd.append('Username',phoneNumber);
    fd.append('Password',otp);
    fd.append('RememberLogin', "false");
    fd.append('ReturnUrl', this.redirectUrl);
    fd.append('button','login');
     this.http.post<any>("http://localhost:5555/Account/Login", fd)
       .subscribe(response => { 
         debugger;
         window.location.href = response.returnUrl;
       });

    //  this.http.post<any>("https://localhost:44310/identity/login", { UserName: phoneNumber, Password: otp, RememberLogin: true, ReturnUrl: this.redirectUrl })
    //    .subscribe(response => {
    //       debugger;
    //       window.location.href = response.returnUrl;
    //     });
  }

}
