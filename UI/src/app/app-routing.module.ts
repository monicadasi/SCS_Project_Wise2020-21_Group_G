import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupVaccineStationComponent } from './setup-vaccine-station/setup-vaccine-station.component';
import {HomeComponent} from './Home/Home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PasswordComponent} from './password/password.component';
import {OtpComponent} from './otp/otp.component';
const routes: Routes = [
  { path: 'setup_vaccine_station', component: SetupVaccineStationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: SignupComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
