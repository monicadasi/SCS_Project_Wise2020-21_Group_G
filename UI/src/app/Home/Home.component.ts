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
//Updated upstream
import NewsAPI from 'newsapi';


import { NgxSpinnerService } from "ngx-spinner";
// Stashed changes
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'AppUI';
  latitude: number = 50.1109;
  longitude: number = 8.6821;

  map: any;

  mapLat = 48.7776;
  mapLng = 9.2325;
  mapDefaultZoom = 18;

  mArticles:Array<any>;
  Data;
  featurePoint;
  modal;
  address;
  plotingPoints:any  = [];
  schladming = [8.6821, 50.1109]; // longitude, latitude follow the order 
  schladmingWebMercator = fromLonLat(this.schladming);
  constructor(private apservice:AppService,private spinner: NgxSpinnerService,public dialog: MatDialog,private fb: FormBuilder, 
    private route: ActivatedRoute,private router: Router, 
    private http: HttpClient, private dataService: DataService ) { }

  baseURL: string = "http://localhost:8080/locationInfo/";
//>>>>>>> Stashed changes
    UserName = "";
  newsapi = new NewsAPI('31f1f66df33b44239d734be337e90630');
  //   featurePoint1 = new ol.Feature({
  //     geometry: new ol.geom.Point([-12590727, 2281352])
  // });

  housenumber = "";
  names = "";
  street= "";
  postcode = "";
  phone = "";
  id = "";
  ngOnInit() {
    this.modal = document.getElementById("myModal");
    window.onclick = function(event) {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    }

    if (window.history && window.history.pushState) {

      $(window).on('popstate', function() {
        this.router.navigate(['/login']);
       
      });
    }
    
    this.newsapi.v2.topHeadlines({
      q: 'corona',
      sortBy: 'relevancy',
      country: 'de'
    }).then(response => {
      console.log(response.articles);
      this.mArticles=response.articles;
    });

    this.UserName = this.apservice.getUserName();
    // this.Data = this.apservice.getSavedLocationDetails();
    var user = {
      id: 1
    }
    var DataCopy = this;
   
    var sourceFeatures = new ol.source.Vector()
    var layerFeatures = new ol.layer.Vector({
        source: sourceFeatures,
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/marker.png"
          })
        })
    })

    this.GetLocationPoints().subscribe(
      res => {
        console.log(res);
        this.Data = res.data;
        this.Data.forEach(element => {
          this.featurePoint = new ol.Feature({
            geometry: new ol.geom.Point(fromLonLat([element.node.lon,element.node.lat]))
            });
          this.featurePoint.setId(element.node.id);
          this.plotingPoints.push(this.featurePoint);
          sourceFeatures.addFeatures([this.featurePoint]);
        });
      }
);

    
    // var sourceFeatures2 = new ol.source.Vector()
    // var layerFeatures2 = new ol.layer.Vector({
    //     source: sourceFeatures2
    // });

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
          layerFeatures
      ],
      view: new ol.View({
          center : this.schladmingWebMercator,
          zoom : 12
      })
    });
    // var zoomslider = new ol.control.ZoomSlider();
    // this.map.addControl(zoomslider);

    var hoverInteraction = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove,
      layers: [layerFeatures],
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
        layers: [layerFeatures],
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
                if(element.node.id == evt.selected[0].getId()){
                  console.log(element);
                  // DataCopy.address = element.address;
                    DataCopy.housenumber = element.node.housenumber;
                    DataCopy.names = element.node.name;
                    DataCopy.street= element.node.street;
                    DataCopy.postcode = element.node.postcode;
                    DataCopy.phone = element.node.phone;
                  DataCopy.modal.style.display = "block";
                  // DataCopy.dialog.open(DailogComponent);
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

  // showMap() {
  //   this.setupVaccine.showMap();
  // }

 myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  geometryStyle(feature){
    var
        style = [],
        geometry_type = feature.getGeometry().getType(),
        white = [255, 255, 255, 1],
        blue = [0, 153, 255, 1],
        width = 3;
        
    style['Point'] = [
        new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "assets/marker.png"
          })
        })
    ];
    return style[geometry_type];
}
closedailog(){
  this.modal.style.display = "none";
}
GetLocationPoints(): Observable<any> {
  var user = {
    id: 1
  }
  const headers = { 'content-type': 'application/json'};
  return this.http.post(this.baseURL + 'getLocation', user,{'headers':headers})
}

logout() {
  this.router.navigate(['/login']);
}

popup(id){
  this.Data.forEach(element => {
    if(element.id == id){
      console.log(element);
    }
  });
}

navigate(routlink){
  this.router.navigate([routlink]);
  // this.router.navigate(['/setup_vaccine_station']);
}

}

