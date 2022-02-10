import React, {memo, useEffect, useRef, useState} from 'react';
import './style.scss';
import {FeatureGroup, LayerGroup, MapContainer, Polygon, useMap} from "react-leaflet";
import FieldContainer from "./field";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";
import {useActions} from "../../../../hooks/useActions";
import {testSpeed} from "../../../../util/testSpeed";

const FieldsLayerContainer = ({children, ...props}) => {
  
  let {
    fields,
    selectField,
    SetSelectField
  } = props
  
  const pixiOverlay = useRef(null)
  const map = useMap();
  
  let [selectFieldCopy, setSelectFieldCopy] = useState(selectField)
  
  
  useEffect(() => {
    let projectedPolygon, prevZoom, firstDraw = true
    
    
    if (fields.length) {
  
      pixiOverlay?.current?.remove()
      //вешает обработчик корый отрабатывает постоянно как двигается карта
      pixiOverlay.current = L.pixiOverlay((utils, eventOrCustomData) => {
        let zoom = utils.getMap().getZoom();
        let container = utils.getContainer();
        let renderer = utils.getRenderer();
        let project = utils.latLngToLayerPoint;
        let scale = utils.getScale() | 5;
  
  
  
        const createEndDraw = (drawPolygon, coordinate) => {
          
          let polygon = new PIXI.Graphics();
          polygon.clear();
          
          polygon.interactive = true
          polygon.buttonMode = true
          
          polygon.lineStyle(1 / 2, 0x3388ff, 1);
          polygon.beginFill( 0xCC0000, 1);
          
          if(drawPolygon.glid === selectField.glid ){
            polygon.lineStyle(1 / 2, 0xCC0000, 1);
            polygon.beginFill( 0x3388ff , 1);
          }
         
    
          coordinate.map(item => item.forEach((coords, index) => {
            if (index === 0) polygon.moveTo(coords.x, coords.y);
            else polygon.lineTo(coords.x, coords.y);
          }))
    
          polygon.on('click', (event) => {
            SetSelectField(drawPolygon)
          })
    
          polygon.endFill();
          container.addChild(polygon);
        }
        
        
        
        if (firstDraw) {
          projectedPolygon = fields.map(arrayCoords => ({
            ...arrayCoords,
            geometry: {
              ...arrayCoords.geometry,
              coordinates: arrayCoords.geometry.coordinates.map(coords => coords.map(coord => project([coord[1], coord[0]])))
            }
          }))
        }
        
        if (firstDraw) {
          projectedPolygon.map((polygons) => {
              createEndDraw(polygons, polygons.geometry.coordinates, scale)
          });
        }
  
  
        if (!firstDraw) {
          projectedPolygon.map((polygons) => {
            if(polygons.glid === (selectField.glid | selectFieldCopy.glid)){
              createEndDraw(polygons, polygons.geometry.coordinates, scale)
            }
          });
        }

        
        
        firstDraw = false;
        prevZoom = zoom;
        
        testSpeed(()=>renderer.render(container))
      }, new PIXI.Container());
  
      
      pixiOverlay.current.addTo(map);
      
      setSelectFieldCopy(selectField)
    }
 
  }, [fields.length, selectField.glid])
  
  
  return null
 
}
export default FieldsLayerContainer


// return (
//   <LayerGroup>
//     {fields.map((field, index) => {
//       return (
//         <FieldContainer field={field}/>
//       )
//     })
//     }
//   </LayerGroup>
// )
