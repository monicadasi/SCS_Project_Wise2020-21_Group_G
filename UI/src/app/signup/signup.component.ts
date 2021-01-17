import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });
  hide = true;
  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,private http: HttpClient) {}
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

  addPerson(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    console.log(this.FirstName.value);
    return this.http.post(this.baseURL + 'registration', user,{'headers':headers})
  }

  signup() {
    var user = {
      firstName: this.FirstName.value,
      middleName: this.MidName.value,
      lastName: this.LastName.value,
      email: this.email.value,
      mobile: this.phNumber.value,
      password: this.Conf_password.value
    }
    this.addPerson(user).subscribe(
      res => {
        if(res.status == 'success') {
        this.router.navigate(['/login']);
        }
      }
);
  }

}
