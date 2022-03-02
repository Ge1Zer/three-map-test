import * as PIXI from "pixi.js";
import "leaflet-pixi-overlay"; // Must be called before the 'leaflet' import
import L from "leaflet";
import {testSpeed} from "../util/testSpeed";

class LayerPixi {
  exampleLayer
  exampleMap
  firstDraw
  SetSelectField
  prevZoom
  
  constructor(linkMap, SetSelectField) {
    
    this.exampleMap = linkMap
    this.SetSelectField = SetSelectField
    this.firstDraw = true
    
    this.removeLayer = this.removeLayer.bind(this)
    this.addToMap = this.addToMap.bind(this)
    this.addingLayer = this.addingLayer.bind(this)
    this.updateLayer = this.updateLayer.bind(this)
    
    this.createEndDraw = this.createEndDraw.bind(this)
    this.prepareField = this.prepareField.bind(this)
  }
  
  
  createEndDraw = (field, settingOverlay) => {
    let {renderer, container} = settingOverlay
    //=============================================================================+++>
    const drawGeometry = ({field, container, polygon}, isSelected) => {
      //работа с полигоном
      polygon.clear()
      
      polygon.lineStyle(1 / 10, isSelected ? 0x3388ff : 0xCC0000, 0.5);
      polygon.beginFill(isSelected ? 0xCC0000 : 0x3388ff, 0.5);
      
      field.geometry.coordinates.map(item => item.forEach((coords, index) => {
        if (index === 0) polygon.moveTo(coords.x, coords.y);
        else polygon.lineTo(coords.x, coords.y);
      }))
      
      // text.text = field.name
      // text.anchor.x = 0.5
      // text.x = polygon.width / 2;
      //
      // text.anchor.x = 0.5
      // text.x = polygon.width / 2;
      //
      // text.anchor.y = 0.5
      // text.y = polygon.height / 2;
      
      
      polygon.endFill();
      
      // polygon.addChild(text)
      
      container.addChild(polygon);
      
    }
    //=============================================================================+++>
    
    //инициализация фигур и текста
    let polygon = new PIXI.Graphics();
    // let text = new PIXI.Text()
    //настройка
    polygon.interactive = true
    polygon.buttonMode = true
    
    // text.style = {
    //   fontFamily: 'normal 15px Arial',
    //   fill: "black",
    //   align: 'center',
    //   stroke: '#D68C1F',
    //   strokeThickness: 1
    // }
    //================================>
    
    let selectFieldSetting = {field, container, polygon}
    // let selectFieldSetting = {field, settingOverlay, polygon, text}
    
    
    drawGeometry(selectFieldSetting, false)
    //=========================================================>
    
    polygon.on('click', (event) => {
      if (this.selectPolygon?.field?.glid !== field.glid) {
        
        drawGeometry(selectFieldSetting, true)
        this.selectPolygon?.field && drawGeometry(this.selectPolygon, false)
        this.selectPolygon = selectFieldSetting
        this.SetSelectField(field)
        renderer.render(container)
      }
    })
    
  }
  prepareField = (fields, project) =>{
    return fields.map(arrayCoords => ({
      ...arrayCoords,
      geometry: {
        ...arrayCoords.geometry,
        coordinates: arrayCoords.geometry.coordinates.map(coords => coords.map(coord => project([coord[1], coord[0]])))
      }
    }))
    
  }
  
  
  updateLayer(field){
    this.removeLayer()
    this.addingLayer(field)
    this.addToMap()
  }
  
  removeLayer(){
    this?.exampleLayer?.remove()
  }
  
  addToMap(){
    this?.exampleLayer?.addTo(this.exampleMap)
  }
  
  addingLayer(fields){
    let self = this
    
    this.exampleLayer = L.pixiOverlay((utils, eventOrCustomData) => {
      let settingOverlay = {
        zoom: utils.getMap().getZoom(),
        container: utils.getContainer(),
        renderer: utils.getRenderer(),
        project: utils.latLngToLayerPoint,
        scale: utils.getScale() | 5
      }
      let {zoom, container, renderer, project, scale} = settingOverlay
      
      if (self.firstDraw) {
        self.prepareField(fields, project).map((field) => {
          self.createEndDraw(field, settingOverlay)
        })
      }
  
      self.firstDraw = false;
      self.prevZoom = zoom;
      
      renderer.render(container)
    }, new PIXI.Container());
  }
  


  
 

}

export default LayerPixi;