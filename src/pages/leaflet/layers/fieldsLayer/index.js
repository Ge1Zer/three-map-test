import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import './style.scss';
import {FeatureGroup, LayerGroup, MapContainer, Polygon, useMap} from "react-leaflet";
import FieldContainer from "./field";

import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";
import {useActions} from "../../../../hooks/useActions";
import {testSpeed} from "../../../../util/testSpeed";
import LayerPixi from "../../../../api/LayerPixi";
import {layers} from "leaflet/src/control/Control.Layers";

const FieldsLayerContainer = ({children, ...props}) => {
  
  let {
    fields,
    selectField,
    SetSelectField
  } = props
  
  const map = useMap();
  const layer = useRef({});
  let [selectFieldCopy, setSelectFieldCopy] = useState(selectField)
  
  
  useEffect(()=>{
    if(!Object.keys(layer.current).length){
      layer.current = new LayerPixi(map, SetSelectField)
    }

    if (fields.length && Object.keys(layer.current).length) {
      layer.current.updateLayer(fields)
    }

  },[fields.length])
  
  // useEffect(() => {
  //   let prevZoom;
  //
  //
  //   if (fields.length) {
  //
  //     pixiOverlay?.current?.remove()
  //     //вешает обработчик корый отрабатывает постоянно как двигается карта
  //     pixiOverlay.current = L.pixiOverlay((utils, eventOrCustomData) => {
  //
  //       let settingOverlay = {
  //         zoom: utils.getMap().getZoom(),
  //         container: utils.getContainer(),
  //         renderer: utils.getRenderer(),
  //         project: utils.latLngToLayerPoint,
  //         scale: utils.getScale() | 5
  //       }
  //       let {zoom, container, renderer, project, scale} = settingOverlay
  //
  //       //=============================================================================+++>
  //       const createEndDraw = (field, settingOverlay) => {
  //         //=============================================================================+++>
  //         const drawGeometry = ({field, settingOverlay, polygon}, isSelected) => {
  //           let {container} = settingOverlay
  //           //работа с полигоном
  //           polygon.clear()
  //
  //           polygon.lineStyle(1 / 10, isSelected ? 0x3388ff : 0xCC0000, 0.5);
  //           polygon.beginFill(isSelected ? 0xCC0000 : 0x3388ff, 0.5);
  //
  //           field.geometry.coordinates.map(item => item.forEach((coords, index) => {
  //             if (index === 0) polygon.moveTo(coords.x, coords.y);
  //             else polygon.lineTo(coords.x, coords.y);
  //           }))
  //
  //           // text.text = field.name
  //           // text.anchor.x = 0.5
  //           // text.x = polygon.width / 2;
  //           //
  //           // text.anchor.x = 0.5
  //           // text.x = polygon.width / 2;
  //           //
  //           // text.anchor.y = 0.5
  //           // text.y = polygon.height / 2;
  //
  //
  //           polygon.endFill();
  //
  //           // polygon.addChild(text)
  //
  //           container.addChild(polygon);
  //
  //         }
  //         //=============================================================================+++>
  //
  //         //инициализация фигур и текста
  //         let polygon = new PIXI.Graphics();
  //         // let text = new PIXI.Text()
  //         //настройка
  //         polygon.interactive = true
  //         polygon.buttonMode = true
  //
  //         // text.style = {
  //         //   fontFamily: 'normal 15px Arial',
  //         //   fill: "black",
  //         //   align: 'center',
  //         //   stroke: '#D68C1F',
  //         //   strokeThickness: 1
  //         // }
  //         //================================>
  //
  //         let selectFieldSetting = {field, settingOverlay, polygon}
  //         // let selectFieldSetting = {field, settingOverlay, polygon, text}
  //
  //
  //         drawGeometry(selectFieldSetting, false)
  //         //=========================================================>
  //
  //         polygon.on('click', (event) => {
  //           if (selectPolygon.current?.field?.glid !== field.glid) {
  //
  //             drawGeometry(selectFieldSetting, true)
  //             selectPolygon.current?.field && drawGeometry(selectPolygon.current, false)
  //             selectPolygon.current = selectFieldSetting
  //             SetSelectField(field)
  //             renderer.render(container)
  //           }
  //         })
  //
  //       }
  //       //================================================================>
  //
  //       if (firstDraw.current) {
  //         console.log(fields)
  //         projectedPolygon.current = fields.map(arrayCoords => ({
  //           ...arrayCoords,
  //           geometry: {
  //             ...arrayCoords.geometry,
  //             coordinates: arrayCoords.geometry.coordinates.map(coords => coords.map(coord => project([coord[1], coord[0]])))
  //           }
  //         }))
  //       }
  //
  //       if (firstDraw.current) {
  //         testSpeed(() => projectedPolygon.current.map((field) => {
  //           createEndDraw(field, settingOverlay)
  //         }), 'первое запонение canvas - объектами')
  //       }
  //
  //       firstDraw.current = false;
  //       prevZoom = zoom;
  //
  //       renderer.render(container)
  //     }, new PIXI.Container());
  //
  //
  //     pixiOverlay.current.addTo(map);
  //   }
  //
  //
  // }, [fields.length])
  

  
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
