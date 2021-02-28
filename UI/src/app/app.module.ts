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
import { SetupVaccineStationComponent } from './setup-vaccine-station/setup-vaccine-station.component';
import { DailogComponent } from './dailog/dailog.component';
import { OtpComponent } from './otp/otp.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [					
    AppComponent,
      LoginComponent,
      SignupComponent,
      HomeComponent,
      PasswordComponent,
      SetupVaccineStationComponent,
      DailogComponent,
      OtpComponent,
   ],
   entryComponents: [DailogComponent],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    DemoMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
