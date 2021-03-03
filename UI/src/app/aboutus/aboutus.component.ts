import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private apservice:AppService, private router: Router) { }
  UserName;
  ngOnInit(): void {
    this.UserName = this.apservice.getUserName();
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
