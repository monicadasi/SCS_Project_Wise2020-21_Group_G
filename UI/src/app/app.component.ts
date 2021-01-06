import { Component, OnInit } from '@angular/core';
declare var ol: any;
import * as $ from 'jquery' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AppUI';
  latitude: number = 50.1109;
  longitude: number = 8.6821;

  map: any;

  mapLat = 48.7776;
  mapLng = 9.2325;
  mapDefaultZoom = 18;

  ngOnInit(){
    // var mousePositionControl = new ol.control.MousePosition({
    //   coordinateFormat: ol.coordinate.createStringXY(4),
    //   projection: 'EPSG:4326',
    //   // comment the following two lines to have the mouse position
    //   // be placed within the map.
    //   className: 'custom-mouse-position',
    //   target: document.getElementById('mouse-position'),
    //   undefinedHTML: '&nbsp;'
    // });


    // this.map = new ol.Map({
    //   target: 'map',
    //   controls: ol.control.defaults({
    //     attributionOptions: {
    //       collapsible: false
    //     }
    //   }).extend([mousePositionControl]),
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM()
    //     })
    //   ],
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([73.8567, 18.5204]),
    //     zoom: 8
    //   })
    // });

    // this.map.on('click', function (args) {
    //   console.log(args.coordinate);
    //   var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
    //   console.log(lonlat);
      
    //   var lon = lonlat[0];
    //   var lat = lonlat[1];
    //   alert(`lat: ${lat} long: ${lon}`);
    // });
    // this.add_map_point(lat, lng);
    // var sourceFeatures = new ol.source.Vector()
    // var layerFeatures = new ol.layer.Vector({
    //     source: sourceFeatures
    // })
    // var sourceFeatures2 = new ol.source.Vector()
    // var layerFeatures2 = new ol.layer.Vector({
    //     source: sourceFeatures2
    // });

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
    //       center : [-11407508,2520388],
    //       zoom : 5
    //   })
    // });
    // this.map.on('click', function (evt) {
    //   var f = this.forEachFeatureAtPixel(
    //     evt.pixel,
    //     function(ft, layer){return ft;}
    // );
    // this.map.on('pointermove', function(evt) {
    //   console.log("mover");

      // if (e.dragging) { popup.hide(); return; }
      
      // var pixel = this.map.getEventPixel(e.originalEvent);
      // var hit = this.map.hasFeatureAtPixel(pixel);
      
      // this.map.getTarget().style.cursor = hit ? 'pointer' : '';
  // });
      // if (feature) {
      //   var coordinates = feature.getGeometry().getCoordinates();
      //   // popup.setPosition(coordinates);
      //   console.log("onClick");
      // //   $(element).popover({
      // //     placement: 'top',
      // //     html: true,
      // //     content: feature.get('name'),
      // //   });
      // //   $(element).popover('show');
      // // } else {
      // //   $(element).popover('dispose');
      // }
    // });

    // this.add_map_point(50.1129, 8.6821);
    // this.add_map_point(50.1149, 8.68231);
    // this.add_map_point(50.1169, 8.6841);
    // this.add_map_point(50.1189, 8.6851);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(13);
    this.add_map_point(this.longitude, this.latitude);
  }

 

  add_map_point(lat, lng) {
    var vectorLayer = new ol.layer.Vector({
      source:new ol.source.Vector({
        features: [new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
          })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/marker.png"
        })
      })
    });
    var selectSingleClick = new ol.interaction.Select();
    var select = selectSingleClick
    this.map.addInteraction(select);
    select.on('select', function(e) {
      $('#status').html('&nbsp;' + e.target.getFeatures().getLength() +
          ' selected features (last operation selected ' + e.selected.length +
          ' and deselected ' + e.deselected.length + ' features)');
    });
  
    this.map.addLayer(vectorLayer); 
  }

  
}
