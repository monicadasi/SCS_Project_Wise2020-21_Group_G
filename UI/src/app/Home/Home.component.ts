import { Component, OnInit } from '@angular/core';
declare var ol: any;
import * as $ from 'jquery' 
// import {AppService} from '../app.service';
import {MatDialog} from '@angular/material/dialog';
// import{DailogComponent} from '../dailog/dailog.component';
import {fromLonLat} from 'ol/proj';
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

  Data;
  featurePoint;
  plotingPoints:any  = [];
  schladming = [8.6821, 50.1109]; // longitude, latitude follow the order 
  schladmingWebMercator = fromLonLat(this.schladming);
  // constructor(private apservice:AppService,public dialog: MatDialog) { }

 
  //   featurePoint1 = new ol.Feature({
  //     geometry: new ol.geom.Point([-12590727, 2281352])
  // });

   
  ngOnInit() {
   
    // this.Data = this.apservice.getSavedLocationDetails();
   
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
    var sourceFeatures2 = new ol.source.Vector()
    var layerFeatures2 = new ol.layer.Vector({
        source: sourceFeatures2
    });

    // this.featurePoint.setId('point 1');
    // this.featurePoint1.setId('point 2');
    // sourceFeatures.addFeatures([this.featurePoint]);
    // sourceFeatures.addFeatures([this.featurePoint1]);
    this.Data.forEach(element => {
      this.featurePoint = new ol.Feature({
        geometry: new ol.geom.Point(fromLonLat([element.longitude,element.latitude]))
        });
      this.featurePoint.setId(element.id);
      this.plotingPoints.push(this.featurePoint);
      sourceFeatures.addFeatures([this.featurePoint]);
    });


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

popup(id){
  this.Data.forEach(element => {
    if(element.id == id){
      console.log(element);
    }
  });
}

}

