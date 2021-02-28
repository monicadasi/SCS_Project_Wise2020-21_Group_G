import { Component, OnInit} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import {MustMatch} from '../passwordMatch';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";

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
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService, private route: ActivatedRoute,private router: Router,private http: HttpClient, private dataService: DataService) {}
  registrationForm;
  submitted = false;

  ngOnInit() {
    this.registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    midName: ['',[Validators.pattern('[a-zA-Z]+')]],
    lastName:['', [Validators.required,Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phNumber: ['', [Validators.required, Validators.minLength(12), Validators.pattern('[- +()0-9]+')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
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
    if (this.registrationForm.get('email').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registrationForm.get('email').value.hasError('email') ? 'Not a valid email' : '';
  }
  
  getPasswordErrorMessage() {
    if (this.registrationForm.get('email').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registrationForm.get('email').value.hasError('email') ? 'Not a valid email' : '';
  }

  getConfPasswordErrorMessage() {
    if (this.registrationForm.get('email').value.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registrationForm.get('email').value.hasError('email') ? 'Not a valid email' : '';
  }

  sendOTP(user:{email: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    console.log(this.registrationForm.get('firstName').value);
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

  passwordAlertNotification(){
    Swal.fire('Passwords', "doesn't match", "error");
  }

  get f() { return this.registrationForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registrationForm.invalid) {
            return;
        }
        this.signup();
    }
  signup() {
     this.firstName = this.registrationForm.get('firstName').value,
     this.middleName = this.registrationForm.get('midName').value,
     this.lastName = this.registrationForm.get('lastName').value,
     this.emailStore = this.registrationForm.get('email').value,
     this.mobile = this.registrationForm.get('phNumber').value,
     this.passwordStore = this.registrationForm.get('confPassword').value
     this.sendOTP({email: this.registrationForm.get('email').value}).subscribe(
      res => {
        this.spinner.hide();
        if(res.status == 'success') {
         this.successAlertNotification();
        }
      }
);
     
  }

}
