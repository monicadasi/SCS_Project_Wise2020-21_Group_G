import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  get data(): string {
    return this.dataService.name;
  }

  set data(value: string) {
    this.dataService.name = value;
  }
  
  loginForm: any;
  showErrorMessage = false;
  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder,private appService:AppService, private route: ActivatedRoute,private router: Router, private http: HttpClient, private dataService: DataService ) {
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
    var loginName = user.email.split('@');
    this.data = loginName[0];
    this.loginPerson(user).subscribe(
      res => {
        var userid = res.data.id;
        var username = res.data.firstName + " " + res.data.lastName;
        this.appService.SetUserId(userid);
        this.appService.setUserName(username);
        console.log(userid, username);
        if(res.status == 'success') {
        this.router.navigate(['/setup_vaccine_station']);
        } else if(res.status == 'failure'){
          this.showErrorMessage = true;
        }
      }
);
    }
    
}
