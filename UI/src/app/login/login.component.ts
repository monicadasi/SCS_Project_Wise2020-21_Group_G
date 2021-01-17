import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  
  loginForm: any;

  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router, private http: HttpClient ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginPerson(user: { email: string, password: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'login', user,{'headers':headers})
  }

  login() {
    console.log(this.loginForm.get('username').value);
    var user = {
      email: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    this.loginPerson(user).subscribe(
      res => {
        if(res.status == 'success') {
        this.router.navigate(['/home']);
        }
      }
);
    }
    
}
