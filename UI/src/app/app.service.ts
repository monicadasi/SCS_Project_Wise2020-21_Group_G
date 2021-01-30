import { Injectable } from '@angular/core';
import {fromLonLat} from 'ol/proj';
@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor() { }
UserID = 0;
UserName = "";
getSavedLocationDetails(){

  var  Data:type[] = [
    {longitude: "8.7823", latitude:"51.1109", id: 1,address:'abc'},
    {longitude: "8.6382409", latitude:"50.1260049", id: 2,address:'abc'},
    {longitude: "8.649893", latitude:"50.0897604", id: 3,address:'abc'},
    {longitude: "8.6481978", latitude:"50.0910921", id: 4,address:'abc'},
    {longitude: "8.6821", latitude:"50.1109", id: 5,address:'abc'},
    {longitude: "8.5670918", latitude:"50.0491762", id: 6,address:'got it.'},
];

// Data.forEach(element => {
//   element.longitude = fromLonLat([element.longitude])[0];
//   element.latitude = fromLonLat([element.latitude])[0];
// });

return Data;
}

GetUserID(){
  return this.UserID;
}
SetUserId(userid){
  this.UserID = userid;
}

getUserName(){
  return this.UserName;
}

setUserName(userName){
  this.UserName = userName;
}

}

export interface type{
  longitude:string;
  latitude:string;
  id: number;
  address: string;
}