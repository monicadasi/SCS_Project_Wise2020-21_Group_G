import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DataService} from '../dataservice.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

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
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,private http: HttpClient, private dataService: DataService) {}
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

  verifyOtp(user: { email: string, tokenValue }): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post('http://localhost:8080/' + 'verifytoken', user,{'headers':headers})
  }

  enterOTP() {
    var user = {
     email: this.dataService.emailStore,
     tokenValue: this.otp.value
    }
    
    this.verifyOtp(user).subscribe(
      res => {
        if(res.status == 'success') {
          this.addPerson().subscribe(
            res => {
              if(res.status == 'success') {
                this.router.navigate(['/login']);
              }
            }
          );
        }
      }
);
  }


}
