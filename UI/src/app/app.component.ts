import { Component } from '@angular/core';
import {MainService} from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covaxUI';
  res: any={value:"check connection"} ;
  constructor(public serv:MainService){

  }
  demo(){
    this.serv.getDemo().subscribe((res)=>{
      console.log(JSON.stringify(res));
      this.res=res;
    })
    
  }
}
