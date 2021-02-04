import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import {MustMatch} from '../passwordMatch';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  get emailStore(): string {
    return this.dataService.emailStore;
  }

  set emailStore(value: string) {
    this.dataService.emailStore = value;
  }

  get passwordStore(): string {
    return this.dataService.passwordStore;
  }

  set passwordStore(value: string) {
    this.dataService.passwordStore = value;
  }

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });
  hide = true;
  baseURL: string = "http://localhost:8080/";
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,private http: HttpClient, private dataService: DataService) {}
  passwordChange;
  submitted = false;
  ngOnInit() {
    this.passwordChange = this.fb.group({
     email : ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
     password : ['', [Validators.required,Validators.minLength(8)]],
     confPassword: ['', [Validators.required]]
    },{
      validator: MustMatch('password', 'confPassword')
  } as AbstractControlOptions)
    if (window.history && window.history.pushState) {

      $(window).on('popstate', function() {
        this.router.navigate(['/login']);
       
      });
    }
  }

  getEmailErrorMessage() {
    if (this.passwordChange.get('email').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordChange.get('email').value.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.passwordChange.get('password').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordChange.get('password').value.hasError('password') ? 'Not a valid password' : '';
  }

  getConfPasswordErrorMessage() {
    if (this.passwordChange.get('confPassword').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordChange.get('confPassword').value.hasError('password') ? 'Not a valid password' : '';
  }

  addPerson(user:{email: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'sendtoken', user,{'headers':headers})
  }

  successAlertNotification(){
    Swal.fire({
      title: 'OTP',
      text: 'has been sent to your email successfully',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.value) {
        this.router.navigate(['/otp']);
      }
    });
}

get f() { return this.passwordChange.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.passwordChange.invalid) {
            return;
        }
        this.forgotPassword();
  }

  forgotPassword() {
    this.emailStore = this.passwordChange.get('email').value;
    this.passwordStore = this.passwordChange.get('confPassword').value;
    var user = {
      email: this.passwordChange.get('email').value
    }
    this.addPerson(user).subscribe(
      res => {
        if(res.status == 'success') {
         this.successAlertNotification();
        }
      }
);
  }

}
