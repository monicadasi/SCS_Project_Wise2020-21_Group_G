import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router) {}
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
  signup() {
    this.router.navigate(['/home']);
  }

}
