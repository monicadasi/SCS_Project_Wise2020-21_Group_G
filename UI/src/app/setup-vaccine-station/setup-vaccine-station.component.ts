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

  Data;
  featurePoint;
  plotingPoints:any  = [];
  sourceFeatures;
  selected;
  schladming = [8.6821, 50.1109]; // longitude, latitude follow the order 
  schladmingWebMercator = fromLonLat(this.schladming);
  baseURL: string = "http://localhost:8080/userLocation/";
  modal;
  address;
  constructor(private apservice:AppService,public dialog: MatDialog,private fb: FormBuilder, 
    private route: ActivatedRoute,private router: Router, 
    private http: HttpClient, private dataService: DataService) { }

 

   
  ngOnInit() {
    this.modal = document.getElementById("myModal");
    window.onclick = function(event) {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    }
    this.Data = this.apservice.getSavedLocationDetails();
    this.UserName = this.apservice.getUserName();
    var DataCopy = this;
   
     this.sourceFeatures = new ol.source.Vector()
    var layerFeatures = new ol.layer.Vector({
        source: this.sourceFeatures,
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/marker.png"
          })
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
    


    this.map = new ol.Map({
      target: document.getElementById('map'),
      controls: [],
      layers: [
          new ol.layer.Tile({
              source: new ol.source.OSM()
          }),
          layerFeatures, layerFeatures2
      ],
      view: new ol.View({
          center : this.schladmingWebMercator,
          zoom : 12
      })
    });

    var hoverInteraction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      layers: [layerFeatures, layerFeatures2],
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
        layers: [layerFeatures, layerFeatures2],
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
              DataCopy.Data.forEach(element => {
                if(element.id == evt.selected[0].getId()){
                  console.log(element);
                  // DataCopy.dialog.open(DailogComponent);
                  // this.opendailog();
                  DataCopy.address = element.address;
                  DataCopy.modal.style.display = "block";
                  // const dialogRef = DataCopy.dialog.open(DailogComponent, {
                  //   width: '250px',
                  //   data: {name: "this.name", animal: "this.animal"}
                  // });
                }
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
  }
  closedailog(){
    this.modal.style.display = "none";
  }
  DisplayLOcation(){
    // this.displaymap = true;
    // this.GetLocationToSetUpVStation();
    this.Data.forEach(element => {
      this.featurePoint = new ol.Feature({
        geometry: new ol.geom.Point(fromLonLat([element.longitude,element.latitude]))
        });
      this.featurePoint.setId(element.id);
      this.plotingPoints.push(this.featurePoint);
      this.sourceFeatures.addFeatures([this.featurePoint]);
    });
  }

  GetLocationToSetUpVStation(){
    var LocationSearch = {
      cityName: this.selected
    }
    this.GetVStations(LocationSearch).subscribe(
      res => {
        console.log(res);
        this.Data.forEach(element => {
          this.featurePoint = new ol.Feature({
            geometry: new ol.geom.Point(fromLonLat([element.longitude,element.latitude]))
            });
          this.featurePoint.setId(element.id);
          this.plotingPoints.push(this.featurePoint);
          this.sourceFeatures.addFeatures([this.featurePoint]);
        });
      }
  );
  }
  GetVStations(LocationSearch: { cityName: any}): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post(this.baseURL + 'getLocation', LocationSearch,{'headers':headers})
  }
 

}


