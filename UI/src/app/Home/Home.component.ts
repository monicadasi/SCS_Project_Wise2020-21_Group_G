import { Component, OnInit } from '@angular/core';
declare var ol: any;
import * as $ from 'jquery' 

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

  constructor() { }

  featurePoint = new ol.Feature({
        geometry: new ol.geom.Point([-11407000,2520000])
        //geometry: new ol.geom.Point([-12590727, 2281352])
    });
    featurePoint1 = new ol.Feature({
      // geometry: new ol.geom.Point([-11407000,2520000])
      geometry: new ol.geom.Point([-12590727, 2281352])
  });

   
  ngOnInit() {
   

    
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

    this.featurePoint.setId('point 1');
    this.featurePoint1.setId('point 2');
    sourceFeatures.addFeatures([this.featurePoint]);
    sourceFeatures.addFeatures([this.featurePoint1]);

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
          center : [-11407508,2520388],
          zoom : 5
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

      //   var featureOverlay = new ol.FeatureOverlay({
      //     map: this.map,
      //     style: this.geometryStyle
      // });



      //click

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
  
        //   var featureOverlay = new ol.FeatureOverlay({
        //     map: this.map,
        //     style: this.geometryStyle
        // });
        
        clickinter.on('select', function(evt){
            if(evt.selected.length > 0){
              alert(evt.selected[0].getId() + " is clicked");
                // console.info('selected: ' + evt.selected[0].getId());
                
            }
        });


   

      this.map.on('pointermove', function(e) {
        // if (e.dragging) return;
           
        var pixel = this.getEventPixel(e.originalEvent);
        var hit = this.hasFeatureAtPixel(pixel);
        
        this.getTarget().style.cursor = hit ? 'pointer' : '';
    
        // if(hit){
        //     var pointer_coord = this.getEventCoordinate(e.originalEvent);
        //     var closest = sourceFeatures.getClosestFeatureToCoordinate(pointer_coord);
    
        //     if(closest){
        //         var geometry = closest.getGeometry();
        //         var closest_coord = geometry.getClosestPoint(pointer_coord);
                
        //         // var coefficient = compareCoordinates(pointer_coord, closest_coord);
        //         // console.info('closest: ' + closest.getId(), ' coeff: ' + coefficient);
                
        //         // if(between(coefficient, 0, 0.01)){
        //         //     featureOverlay.addFeature(closest);
                    
        //         // } else {
        //         //     featureOverlay.removeFeature(closest);
        //         //     featureOverlay.getFeatures().clear();
        //         //     hoverInteraction.getFeatures().clear();
        //         // }
        //     }
        // }
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

}

