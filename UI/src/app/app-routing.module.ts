import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent} from './Home/Home.component';
import{LoginComponent} from './login/login.component';
import{SignupComponent} from './signup/signup.component';
import{PasswordComponent} from './password/password.component';
import { SetupVaccineStationComponent } from './setup-vaccine-station/setup-vaccine-station.component';
const routes: Routes = [
  { path: 'setup_vaccine_station', component: SetupVaccineStationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: SignupComponent },
  { path: 'password', component: PasswordComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
