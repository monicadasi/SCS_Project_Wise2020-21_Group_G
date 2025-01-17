import { Component, OnInit } from '@angular/core';
declare var ol: any;
import * as $ from 'jquery' 
import {AppService} from '../app.service';
import {MatDialog} from '@angular/material/dialog';
import{DailogComponent} from '../dailog/dailog.component';
import {fromLonLat} from 'ol/proj';
import {ZoomSlider,OlZoom} from 'ol/control';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DataService} from '../dataservice.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-setup-vaccine-station',
  templateUrl: './setup-vaccine-station.component.html',
  styleUrls: ['./setup-vaccine-station.component.scss']
})
export class SetupVaccineStationComponent implements OnInit {

  UserName = "";
  title = 'AppUI';
  latitude: number = 50.1109;
  longitude: number = 8.6821;
  displaymap = false;
  map: any;
  isDisabled = false;
  mapLat = 48.7776;
  mapLng = 9.2325;
  mapDefaultZoom = 18;
  showErrorMessage;
  Data;
  DataCopy;
  featurePoint;
  
  plotingPoints:any  = [];
  sourceFeatures;
  sourceFeatures2;
  selected;
  numberselected = 0;
  schladming = [8.6821, 50.1109]; // longitude, latitude follow the order 
  schladmingWebMercator = fromLonLat(this.schladming);
  baseURL: string = "http://localhost:8080/locationInfo/";
  modal;
  address;
  housenumber = "";
  names = "";
  street= "";
  postcode = "";
  phone = "";
  id = "";
  constructor(private apservice:AppService,private spinner: NgxSpinnerService,public dialog: MatDialog,private fb: FormBuilder, 
    private route: ActivatedRoute,private router: Router, 
    private http: HttpClient, private dataService: DataService) { }   
    colorCode = [{color:"Aqua", id:1},
    {color:"Beige", id:2},
    {color:"Brown", id:3},
    {color:"gray", id:4},
    {color:"BlueViolet", id:5},
    {color:"Blue", id:6},
    {color:"Chartreuse", id:7},
    {color:"Crimson", id:8},
    {color:"Chocolate", id:9},
    {color:"DarkGoldenRod", id:10},
    {color:"DarkMagenta", id:11},
    {color:"DarkOrange", id:12},
    {color:"DarkRed", id:13},
    {color:"DeepPink", id:14},
    {color:"DarkViolet", id:15},
    {color:"ForestGreen", id:16}
  ]
 
    sourceFeatList:any[] = [];
    layerFeatureList : any[] = [];
    a;
    userid;
    selectControl:FormControl = new FormControl();
  ngOnInit() {
    this.Data = this.apservice.getSavedLocationDetails();
    this.UserName = this.apservice.getUserName();
    this.DataCopy = this;
    this.userid = this.apservice.GetUserID();
    var user :any = {
      email: "",
      password: ""
    }
    user = this.apservice.getUserLog();

    this.loginPerson(user).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        if (res.data) {
          if(res.data.searchedLocationsCount != null){
            this.apservice.setSavedLocationCount(res.data.searchedLocationsCount);
          }else{
            this.apservice.setSavedLocationCount(0);
          }
      } 
      }
    );
    this.numberselected = this.apservice.getSavedLocationCount();
    if(this.numberselected > 0){
      this.isDisabled = true;
    }
    this.selectControl.setValue(this.numberselected.toString());
     this.sourceFeatures = new ol.source.Vector()
     setTimeout(() => {
      this.showMap();
     }, 0)
    
    this.modal = document.getElementById("myModal");
    console.log('test');
    window.onclick = function(event) {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    }

    if (window.history && window.history.pushState) {
    this.Data = this.apservice.getSavedLocationDetails();
    this.UserName = this.apservice.getUserName();
    var DataCopy = this;
    this.colorCode.forEach(element => {
      this.sourceFeatures = new ol.source.Vector()
      var layerFeatures = new ol.layer.Vector({
        source: this.sourceFeatures,
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/marker.png",
            color: element.color
          })
        })
    })
    this.sourceFeatList.push(this.sourceFeatures);
    this.layerFeatureList.push(layerFeatures)
    });
  

      $(window).on('popstate', function() {
        this.router.navigate(['/login']);
       
      });
    }
  }

  showMap() {
   var DataCopy  = this;
    this.map = new ol.Map({
      target: document.getElementById('map'),
      controls: [],
      layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          }),
          this.layerFeatureList[0], this.layerFeatureList[5],this.layerFeatureList[10],
          this.layerFeatureList[1],this.layerFeatureList[6],this.layerFeatureList[11],
          this.layerFeatureList[2],this.layerFeatureList[7],this.layerFeatureList[12],
          this.layerFeatureList[3],this.layerFeatureList[8],this.layerFeatureList[13],
          this.layerFeatureList[4],this.layerFeatureList[9],this.layerFeatureList[14],
          this.layerFeatureList[15]

      ],
      view: new ol.View({
          center : this.schladmingWebMercator,
          zoom : 12
      })
  })
  var sourceFeatures2 = new ol.source.Vector()
  var layerFeatures2 = new ol.layer.Vector({
      source: sourceFeatures2
  });
    var hoverInteraction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      layers: [ this.layerFeatureList[0], this.layerFeatureList[5],this.layerFeatureList[10],
      this.layerFeatureList[1],this.layerFeatureList[6],this.layerFeatureList[11],
      this.layerFeatureList[2],this.layerFeatureList[7],this.layerFeatureList[12],
      this.layerFeatureList[3],this.layerFeatureList[8],this.layerFeatureList[13],
      this.layerFeatureList[4],this.layerFeatureList[9],this.layerFeatureList[14],
      this.layerFeatureList[15]],
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/icon.png"
        })
      })
    });

    this.map.addInteraction(hoverInteraction);
      var clickinter = new ol.interaction.Select({
        condition: ol.events.condition.click,
        layers: [ this.layerFeatureList[0], this.layerFeatureList[5],this.layerFeatureList[10],
        this.layerFeatureList[1],this.layerFeatureList[6],this.layerFeatureList[11],
        this.layerFeatureList[2],this.layerFeatureList[7],this.layerFeatureList[12],
        this.layerFeatureList[3],this.layerFeatureList[8],this.layerFeatureList[13],
        this.layerFeatureList[4],this.layerFeatureList[9],this.layerFeatureList[14],
        this.layerFeatureList[15]],
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/icon.png"
          })
        })
    });
    this.map.addInteraction(clickinter);
        clickinter.on('select', function(evt){
            if(evt.selected.length > 0){
              DataCopy.a.forEach(ele => {
                var Data1 = ele.cityInfo;
               
                Data1.forEach(element => {
                  if(element.id == evt.selected[0].getId()){
                    console.log(element);
                    DataCopy.housenumber = element.housenumber;
                    DataCopy.names = element.name;
                    DataCopy.street= element.street;
                    DataCopy.postcode = element.postcode;
                    DataCopy.phone = element.phone;
                    DataCopy.modal.style.display = "block";
                    document.getElementById("myModal").style.display = "block";
                    DataCopy.id = element.id;
                  }
                });
              });
            }
        });
      this.map.on('pointermove', function(e) {
        var pixel = this.getEventPixel(e.originalEvent);
        var hit = this.hasFeatureAtPixel(pixel);
        this.getTarget().style.cursor = hit ? 'pointer' : '';
    });
  }

  opendailog(){
    this.modal.style.display = "block";
    document.getElementById("myModal").style.display = "block";
  }
  loginPerson(user: { email: string, password: string}): Observable<any> {
    var baseURLuser: string = "http://localhost:8080/user/";
    const headers = { 'content-type': 'application/json'};
    return this.http.post(baseURLuser + 'login', user,{'headers':headers})
  }
  closedailog(){
    this.modal.style.display = "none";
    document.getElementById("myModal").style.display = "none";
  }
 
  ResetStationDetails(){
    this.restser().subscribe(result => {
      var res:any = result;
      console.log(result);
      if(res.status == 'success') {
        Swal.fire({
          title: 'User',
          text: 'Saved Details are Reset!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((result) => {
          this.selected = "";
          this.numberselected = 0;
          this.selectControl.setValue('0');
          this.isDisabled = false;
          this.sourceFeatList.forEach(elem =>{
            elem.clear();
          });
        });
        } 
        else if(res.status == 'failure'){
          Swal.fire({
            title: 'User',
            text: 'Saved Details are Reset!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            this.selected = "";
            this.selectControl.setValue('0');
            this.isDisabled = false;
            this.sourceFeatList.forEach(elem =>{
              elem.clear();
            });
          });
        }
      else {
        this.errorAlertNotification();
       }
    })
  }
  restser(){
    var user = {
      id: this.userid
    }
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'clearSavedLocations', user,{'headers':headers})
  }
  GetLocationToSetUpVStation(){
    if(this.selected != "" && this.selected != undefined){
      if (this.numberselected == 0 || this.numberselected == undefined){
        this.numberselected = 1;
        this.selectControl.setValue('5');
      }
    var LocationSearch = {
      userId:this.userid,
      cityName: this.selected,
      numOfStations: this.selectControl.value,
      
    }
    this.a = [];
    this.sourceFeatList.forEach(elem =>{
      elem.clear();
    });
    this.spinner.show();
    this.GetVStations(LocationSearch).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        console.log(this.sourceFeatList);
         this.a = res.data;
        var i = 0;
        this.a.forEach(ele => {
        this.Data = ele.cityInfo;
       
        this.Data.forEach(element => {
          this.featurePoint = new ol.Feature({
            geometry: new ol.geom.Point(fromLonLat([element.lon,element.lat]))
            });
          this.featurePoint.setId(element.id);
          this.plotingPoints.push(this.featurePoint);
          // this.sourceFeatures2.addFeatures([this.featurePoint]);
          this.sourceFeatList[i].addFeatures([this.featurePoint]);
          
        });
        i = i+1;
      });
      } );
    }else{
      // Swal.fire('Invalid', 'credentials', 'error');
      Swal.fire({
        title: 'Search Stations',
        text: 'Please select the location',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      })
    }
  }
  
  GetVStations(LocationSearch: { cityName: any; numOfStations:any; userId:any,}): Observable<any> {
    
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'getLocationByCity', LocationSearch,{'headers':headers})
  }
 
  logout() {
    this.router.navigate(['/login']);
  }

  SaveStationData(){
    this.SaveStation().subscribe(result => {
      console.log(result);
      var res:any = result;
      if(res.status == 'success') {
        this.closedailog();
        Swal.fire({
          title: '<strong style="font-family:serif">Station Details</strong>',
          html:'<span style="font-family:serif">Saved Successfully!!</span>',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-outline-primary"
          },
          padding: '3em',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowEnterKey: true,
          iconHtml: `<span class="iconify icon:ion:checkmark-circle icon-inline:false"></span>`
        }).then((result) => {
          this.GetLocationToSetUpVStation();
        });
        } 
        else if(res.status == 'failure'){
          this.showErrorMessage = true;
        }
      else {
        this.errorAlertNotification();
       }
    })
  }
  errorAlertNotification(){
    // Swal.fire('Invalid', 'credentials', 'error');
    Swal.fire({
      title: '<strong style="font-family:serif">Invalid Credentials</strong>',
      html:'<span style="font-family:serif">Please check your details</span>',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-outline-primary"
      },
      showCancelButton: false,
      padding: '3em',
      confirmButtonText: 'OK',
      allowEnterKey: true,
      iconHtml: `<span class="iconify icon:ion:close-circle-sharp icon-inline:false"></span>`
    })
}
  SaveStation(){
   var userLocation =  {
      "userId":this.userid,
      "node":{"id":this.id}
  }
  const headers = { 'content-type': 'application/json'};
  return this.http.post(this.baseURL + 'saveLocation', userLocation,{'headers':headers});
  
  }



}


