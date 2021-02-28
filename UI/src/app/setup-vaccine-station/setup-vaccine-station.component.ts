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
  numberselected;
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
    {color:"Black", id:4},
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
  ngOnInit() {
    this.Data = this.apservice.getSavedLocationDetails();
    this.UserName = this.apservice.getUserName();
    this.DataCopy = this;
   
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
    
    //  this.sourceFeatures = new ol.source.Vector()
    // var layerFeatures = new ol.layer.Vector({
    //     source: this.sourceFeatures,
    //     style: new ol.style.Style({
    //       image: new ol.style.Icon({
    //         anchor: [0.5, 0.5],
    //         anchorXUnits: "fraction",
    //         anchorYUnits: "fraction",
    //         src: "assets/marker.png",
    //         color: "red"
    //       })
    //     })
    // })

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

  // this.featurePoint.setId('point 1');
  // this.featurePoint1.setId('point 2');
  // sourceFeatures.addFeatures([this.featurePoint]);
  // sourceFeatures.addFeatures([this.featurePoint1]);
  


  // this.map = new ol.Map({
  //   target: document.getElementById('map'),
  //   controls: [],
  //   layers: [
  //       new ol.layer.Tile({
  //           source: new ol.source.OSM()
  //       }),
  //       layerFeatures, layerFeatures2
  //   ],
  //   view: new ol.View({
  //       center : this.schladmingWebMercator,
  //       zoom : 12
  //   })
  // });

  // var hoverInteraction = new ol.interaction.Select({
  //   condition: ol.events.condition.pointerMove,
  //   layers: [layerFeatures, layerFeatures2],
  //   style: new ol.style.Style({
  //     image: new ol.style.Icon({
  //       anchor: [0.5, 0.5],
  //       anchorXUnits: "fraction",
  //       anchorYUnits: "fraction",
  //       src: "assets/icon.png"
  //     })
  //   })
  // });

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
              // this.popup(evt.selected[0].getId());
              // alert(evt.selected[0].getId() + " is clicked");
              // var i = 0;
              DataCopy.a.forEach(ele => {
                var Data1 = ele.cityInfo;
               
                Data1.forEach(element => {
                  if(element.id == evt.selected[0].getId()){
                    console.log(element);
                    // DataCopy.dialog.open(DailogComponent);
                    // this.opendailog();
                    DataCopy.housenumber = element.housenumber;
                    DataCopy.names = element.name;
                    DataCopy.street= element.street;
                    DataCopy.postcode = element.postcode;
                    DataCopy.phone = element.phone;
                    DataCopy.modal.style.display = "block";
                    DataCopy.id = element.id;
                    // const dialogRef = DataCopy.dialog.open(DailogComponent, {
                    //   width: '250px',
                    //   data: {name: "this.name", animal: "this.animal"}
                    // });
                  }
                });
              });
              // DataCopy.Data.forEach(element => {
              //   if(element.id == evt.selected[0].getId()){
              //     console.log(element);
              //     // DataCopy.dialog.open(DailogComponent);
              //     // this.opendailog();
              //     DataCopy.address = element.address;
              //     DataCopy.modal.style.display = "block";
              //     // const dialogRef = DataCopy.dialog.open(DailogComponent, {
              //     //   width: '250px',
              //     //   data: {name: "this.name", animal: "this.animal"}
              //     // });
              //   }
              // });
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
  }
  closedailog(){
    this.modal.style.display = "none";
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
          this.numberselected = "";
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
            this.numberselected = "";
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
      id: 1
    }
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'clearSavedLocations', user,{'headers':headers})
  }
  GetLocationToSetUpVStation(){
    if(this.selected != "" && this.selected != undefined){
      if (this.numberselected == "" || this.numberselected == undefined){
        this.numberselected = 1;
      }
    var LocationSearch = {
      userId:5,
      cityName: this.selected,
      numOfStations: this.numberselected,
      
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
          title: 'Station Details',
          text: 'Saved Successfully!!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
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
    Swal.fire('Invalid', 'credentials', 'error');
}
  SaveStation(){
   var userLocation =  {
      "userId":1,
      "node":{"id":this.id}
  }
  const headers = { 'content-type': 'application/json'};
  return this.http.post(this.baseURL + 'saveLocation', userLocation,{'headers':headers});
  
  }



}


