import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataService} from '../dataservice.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });
  hide = true;
  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService, private route: ActivatedRoute,private router: Router,private http: HttpClient, private dataService: DataService) {}
  otp;
  ngOnInit() {
    this.otp =  new FormControl('', [Validators.required]);
    if (window.history && window.history.pushState) {
      $(window).on('popstate', function() {
        this.router.navigate(['/login']);
       
      });
    }
  }

  getOtpErrorMessage() {
    if (this.otp.hasError('required')) {
      return 'You must enter a value';
    }

    return this.otp.hasError('password') ? 'Not a valid password' : '';
  }

  addPerson(): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    var user = {
      firstName: this.dataService.firstName,
      middleName: this.dataService.middleName,
      lastName: this.dataService.lastName,
      email: this.dataService.emailStore,
      mobile: this.dataService.mobile,
      password: this.dataService.passwordStore
    }
    return this.http.post(this.baseURL + 'registration', user,{'headers':headers})
  }

  changePassword(): Observable<any> {
    var user = 
    { email: this.dataService.emailStore, 
      password: this.dataService.passwordStore 
    }
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'changePassword', user,{'headers':headers})
  }

  verifyOtp(user: { email: string, tokenValue }): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post('http://localhost:8080/' + 'verifytoken', user,{'headers':headers})
  }

  resendOtp(user:{email: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post('http://localhost:8080/' + 'sendtoken', user,{'headers':headers})
  }

  successAlertNotification(){
    // Swal.fire('OTP', 'has been sent to your email successfully', 'success')
    Swal.fire({
      title: '<strong style="font-family:serif">Successfully sent OTP</strong>',
      html:'<span style="font-family:serif">Please check your email</span>',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      padding: '3em',
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:checkmark-circle icon-inline:false"></span>`
    })
  }

  registerAlertNotification(){
    Swal.fire({
      title: '<strong style="font-family:serif">User Registered Successfully</strong>',
      html:'<span style="font-family:serif">Now you can start using application</span>',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      padding: '3em',
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:checkmark-circle icon-inline:false"></span>`
    }).then((result) => {
      if(result.value) {
        this.router.navigate(['/login']);
      }
    });
  }

  errorAlertNotification(){
    Swal.fire({
      title: '<strong style="font-family:serif">User already exists</strong>',
      html:'<span style="font-family:serif">Please use "Log in"</span>',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      showCancelButton: false,
      padding: '3em',
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:close-circle-sharp icon-inline:false"></span>`
    }).then((result) => {
      if(result.value) {
        this.router.navigate(['/login']);
      }
    });
  }

  errorOtpAlertNotification(){
    // Swal.fire('OTP', 'verification failed', 'error');
    Swal.fire({
      title: '<strong style="font-family:serif">OTP verification failed</strong>',
      html:'<span style="font-family:serif">Please enter correct OTP or click "Resend OTP"</span>',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      showCancelButton: false,
      padding: '3em',
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:close-circle-sharp icon-inline:false"></span>`
    })
  }

  passwordAlertNotification(){
    Swal.fire({
      title: '<strong style="font-family:serif">Password changed successfully</strong>',
      html:'<span style="font-family:serif">You can login with new credentials</span>',
      icon: 'success',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      showCancelButton: false,
      padding: '3em',
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:checkmark-circle icon-inline:false"></span>`
    }).then((result) => {
      if(result.value) {
        this.router.navigate(['/login']);
      }
    });
  }

  enterOTP() {
    var user = {
     email: this.dataService.emailStore,
     tokenValue: this.otp.value
    }
    this.spinner.show();
    this.verifyOtp(user).subscribe(
      res => {
        this.spinner.hide();
        if(res.status == 'success' && res.message == 'Token verified') {
          if (this.dataService.firstName) {
          this.addPerson().subscribe(
            res => {
              if(res.status == 'success') {
                this.registerAlertNotification();
              }else {
                this.errorAlertNotification();
              }
            }
          );
        } else {
          this.changePassword().subscribe(
            res => {
              if(res.status == 'success') {
                this.passwordAlertNotification();
              }
            }
          )
        }
       } else {
           this.errorOtpAlertNotification();
       }
      }
);
  }

  sendOTP() {
    this.spinner.show();
    this.resendOtp({email: this.dataService.emailStore}).subscribe(
      res => {
        this.spinner.hide();
        if(res.status == 'success') {
          this.successAlertNotification();
        }
      }
);
  }


}
