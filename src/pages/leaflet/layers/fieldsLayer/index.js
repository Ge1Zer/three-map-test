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
  const firstDraw = useRef(true)
  const projectedPolygon = useRef([])
  const map = useMap();
  const selectPolygon = useRef({})
  
  let [selectFieldCopy, setSelectFieldCopy] = useState(selectField)
  
  
  useEffect(() => {
    let prevZoom;
    
    
    if (fields.length) {
      
      // pixiOverlay?.current?.remove()
      //вешает обработчик корый отрабатывает постоянно как двигается карта
      pixiOverlay.current = L.pixiOverlay((utils, eventOrCustomData) => {
        let zoom = utils.getMap().getZoom();
        let container = utils.getContainer();
        let renderer = utils.getRenderer();
        let project = utils.latLngToLayerPoint;
        let scale = utils.getScale() | 5;
        
        
        const createEndDraw = (drawPolygon, coordinate, container, renderer) => {
  
          //=============================================================================+++>
          const drawGeometry = ({polygon, coordinate}, isSelected, ) =>{
            polygon.clear()
            polygon.lineStyle(1 / 2, isSelected ? 0x3388ff : 0xCC0000, 0.5);
            polygon.beginFill(isSelected ? 0xCC0000 : 0x3388ff , 0.5);
    
            coordinate.map(item => item.forEach((coords, index) => {
              if (index === 0) polygon.moveTo(coords.x, coords.y);
              else polygon.lineTo(coords.x, coords.y);
            }))
    
            polygon.endFill();
            container.addChild(polygon);
          }
          //=============================================================================+++>
          
          
          let polygon = new PIXI.Graphics();
          
          polygon.interactive = true
          polygon.buttonMode = true
          drawGeometry({polygon, coordinate}, false)
         
          
         
          //=========================================================>
          polygon.on('click', (event) => {
            
            if(selectPolygon.current?.polygon !== polygon){
              drawGeometry({polygon, coordinate}, true)
              
              selectPolygon.current?.polygon && drawGeometry(selectPolygon.current, false)
              

              selectPolygon.current = {polygon, coordinate}
              SetSelectField(drawPolygon)
              renderer.render(container)
            }
          })
          
        }
        
        
        if (firstDraw.current) {
          testSpeed(() => projectedPolygon.current = fields.map(arrayCoords => ({
            ...arrayCoords,
            geometry: {
              ...arrayCoords.geometry,
              coordinates: arrayCoords.geometry.coordinates.map(coords => coords.map(coord => project([coord[1], coord[0]])))
            }
          })), "перевод координат в читаемое расширение {x, y}")
        }
        
        if (firstDraw.current) {
          testSpeed(() => projectedPolygon.current.map((polygons) => {
            createEndDraw(polygons, polygons.geometry.coordinates, container, renderer)
          }), 'первое запонение canvas - объектами')
        }
        
        
        if (!firstDraw.current && (selectField.glid || selectFieldCopy.glid)) {
          testSpeed(() => projectedPolygon.current.map((polygons) => {
            if (polygons.glid === (selectField.glid | selectFieldCopy.glid)) {
              createEndDraw(polygons, polygons.geometry.coordinates, container, renderer)
            }
          }), "перерисовка только 2 полей")
        }
        
        
        firstDraw.current = false;
        prevZoom = zoom;
        
        testSpeed(() => renderer.render(container), "перерисовка")
      }, new PIXI.Container());
      
      
      pixiOverlay.current.addTo(map);
      
      setSelectFieldCopy(selectField)
    }
    
    
  }, [fields.length])
  
  
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
