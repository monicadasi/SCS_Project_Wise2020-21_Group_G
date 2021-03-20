import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import {AppService} from '../app.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
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
  submitted = false;
  baseURL: string = "http://localhost:8080/user/";
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService,private appService:AppService, private route: ActivatedRoute,private router: Router, private http: HttpClient, private dataService: DataService ) {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  loginPerson(user: { email: string, password: string}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'login', user,{'headers':headers})
  }

  errorAlertNotification(){
      Swal.fire({
        title: '<strong style="font-family:serif">Invalid Credentials</strong>',
        // text: '<span style="font-family:serif">Check username and password are correct<span>',
        html:'<span style="font-family:serif">Check username and password are correct</span>',
        // background: '#fff url(../../assets/background3.png)',
        // imageHeight: 70,
        // imageWidth: 50,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-outline-primary"
        },
        icon: 'error',
        padding: '3em',
        showCancelButton: false,
        confirmButtonText: 'OK',
        allowEnterKey: true,
        iconHtml: `<span class="iconify icon:ion:close-circle-sharp icon-inline:false"></span>`

      })
}

  get f() { return this.loginForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.login();
    }

  login() {
    console.log(this.loginForm.get('username').value);
    var user = {
      email: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    this.appService.setUserLog(user);
    var loginName = user.email.split('@');
    this.data = loginName[0];
    this.spinner.show();
    this.loginPerson(user).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        if (res.data) {
          if(res.data.searchedLocationsCount != null){
            this.appService.setSavedLocationCount(res.data.searchedLocationsCount);
          }else{
            this.appService.setSavedLocationCount(0);
          }
          
        var userid = res.data.id;
        var username = res.data.firstName + " " + res.data.lastName;
        this.appService.SetUserId(userid);
        // var a = "{ abc:" + username + ", id:" + userid +"}"
        // document.cookie = a;
        // document.cookie = "username"+'=; Max-Age=-99999999;'; 
        // document.cookie = "userid"+'=; Max-Age=-99999999;'; 

        // document.cookie = "username = "+ username; 
        // document.cookie = "userid = "+userid; 

       this.setCookie("username", username, 1);
       this.setCookie("userid", userid, 1);
        
        console.log(this.getCookie("username"));
        console.log(this.getCookie("userid"));
        this.appService.setUserName(username);
        console.log(userid, username);
        if(res.status == 'success') {
        this.router.navigate(['/setup_vaccine_station']);
        } else if(res.status == 'failure'){
          this.showErrorMessage = true;
        }
      } else {
        this.errorAlertNotification();
       }
      }
    );
    }
    
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
     setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}
