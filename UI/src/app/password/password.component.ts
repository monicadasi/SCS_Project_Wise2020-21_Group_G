import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });
  hide = true;
  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,private http: HttpClient) {}
  email;
  password;
  Conf_password;
  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.Conf_password =  new FormControl('', [Validators.required]);
    if (window.history && window.history.pushState) {

      $(window).on('popstate', function() {
        this.router.navigate(['/login']);
       
      });
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  getConfPasswordErrorMessage() {
    if (this.Conf_password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.Conf_password.hasError('password') ? 'Not a valid password' : '';
  }

  changePassword(user: { email: string, password: string }): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'changePassword', user,{'headers':headers})
  }

  forgotPassword() {
    var user = {
      email: this.email.value,
      password: this.Conf_password.value
    }
    this.changePassword(user).subscribe(
      res => {
        if(res.status == 'success') {
        this.router.navigate(['/login']);
        }
      }
);
  }

}
