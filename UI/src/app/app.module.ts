import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {DemoMaterialModule} from './material-module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './Home/Home.component';
import { PasswordComponent } from './password/password.component';
@NgModule({
  declarations: [					
    AppComponent,
      LoginComponent,
      SignupComponent,
      HomeComponent,
      PasswordComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
