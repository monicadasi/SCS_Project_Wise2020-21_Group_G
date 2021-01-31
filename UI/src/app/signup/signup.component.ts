import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  get firstName(): string {
    return this.dataService.firstName;
  }

  set firstName(value: string) {
    this.dataService.firstName = value;
  }

  get middleName(): string {
    return this.dataService.middleName;
  }

  set middleName(value: string) {
    this.dataService.middleName = value;
  }

  get lastName(): string {
    return this.dataService.lastName;
  }

  set lastName(value: string) {
    this.dataService.lastName = value;
  }

  get emailStore(): string {
    return this.dataService.emailStore;
  }

  set emailStore(value: string) {
    this.dataService.emailStore = value;
  }

  get mobile(): string {
    return this.dataService.mobile;
  }

  set mobile(value: string) {
    this.dataService.mobile = value;
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
  FirstName;
  MidName;
  LastName;
  email;
  phNumber;
  password;
  Conf_password;

  ngOnInit() {
    this.FirstName = new FormControl('', [Validators.required]);
    this.MidName = new FormControl('');
    this.LastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phNumber = new FormControl('', [Validators.required]);
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
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getConfPasswordErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addPerson(user:{email: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    console.log(this.FirstName.value);
    return this.http.post(this.baseURL + 'sendtoken', user,{'headers':headers})
  }

  signup() {
     this.firstName = this.FirstName.value,
     this.middleName = this.MidName.value,
     this.lastName = this.LastName.value,
     this.emailStore = this.email.value,
     this.mobile = this.phNumber.value,
     this.passwordStore = this.Conf_password.value
     this.addPerson({email: this.email.value}).subscribe(
      res => {
        if(res.status == 'success') {
          this.router.navigate(['/otp']);
        }
      }
);
     
  }

}
