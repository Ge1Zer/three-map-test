import React, {memo, useEffect} from 'react';
import './style.scss';
import {FeatureGroup, LayerGroup, MapContainer, Polygon, useMap} from "react-leaflet";
import FieldContainer from "./field";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";
import {useActions} from "../../../../hooks/useActions";

const FieldsLayerContainer = ({children, ...props}) => {
  
  let {
    fields,
    selectField,
    SetSelectField
  } = props

  const map = useMap();
  
  const invokeConsole = (obj) =>{
    console.log(obj.toString())
  }
  
  useEffect(() => {
    if (fields.length) {
      let projectedPolygon, prevZoom, firstDraw = true;
      
      let pixiContainer = new PIXI.Container();
      let triangle = new PIXI.Graphics();
      pixiContainer.addChild(triangle);
      
      let pixiOverlay = L.pixiOverlay( (utils, eventOrCustomData, event) => {
        
        let zoom = utils.getMap().getZoom();
        let container = utils.getContainer();
        let renderer = utils.getRenderer();
        let project = utils.latLngToLayerPoint;
        let scale = utils.getScale();
        
        if (firstDraw) {
          projectedPolygon = fields.map(arrayCoords => {
            return {
              ...arrayCoords,
              geometry: {
                ...arrayCoords.geometry,
                coordinates: arrayCoords.geometry.coordinates.map(coords => coords.map(coord => project([coord[1], coord[0]])))
              }
            }
          })
        }
       
        if (firstDraw || prevZoom !== zoom) {
          triangle.clear();
          projectedPolygon.map((polygons, index) => {
            triangle.lineStyle(3 / scale, polygons.glid === selectField.glid ? 0x3388ff : 0xCC0000 , 1);
            triangle.beginFill(0x3388ff, 0.2);
            
            return polygons.geometry.coordinates.map(polygon=> {
              return polygon.forEach((coords, index) => {
                if (index === 0) triangle.moveTo(coords.x, coords.y);
                else triangle.lineTo(coords.x, coords.y);
              })
            })
          });
          triangle.endFill();
        }
        
        firstDraw = false;
        prevZoom = zoom;
        renderer.render(container);
      }, pixiContainer);
      pixiOverlay.addTo(map);
    }
    
  }, [fields.length, selectField.glid])
  
  return null
  return (
    <LayerGroup>
      {fields.map((field, index) => {
        return (
          <FieldContainer field={field}/>
        )
      })
      }
    </LayerGroup>
  )
}
export default FieldsLayerContainer