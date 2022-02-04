import React, {useEffect, useState} from 'react'
import 'leaflet/dist/leaflet.css';
import './style.scss'
import MenuLayout from "../../layout/MenuLayout";
import {CircleMarker, Polygon, Tooltip, FeatureGroup, Marker, Circle} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import cloud from './../../assets/cloud.svg'
import play from './../../assets/play.svg'
import red from './../../assets/red.svg'
import L from 'leaflet'

import {
  LayersControl,
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import LayerGroup from "ol/layer/Group";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import FieldsLayerContainer from "./layers/fieldsLayer";
import UnitsLayerContainer from "./layers/unitsLayer";
import {GridLayer} from "leaflet/dist/leaflet-src.esm";
import TileLayerCustom from "./layers/tileLayer";

// import './layers/tileLayer/buffer';

const Leaflet = () => {
  
  const {fieldsList} = useTypedSelector(state => state.fieldsStore)
  const {unitsPosition} = useTypedSelector(state => state.unitsStore)
  const {connectFetchStatusUnits, disconnectFetchStatusUnits} = useActions()
  
  let [fields, setFields] = useState([])
  let [units, setUnit] = useState([])
  
  useEffect(() => {
    if (fieldsList.length) {
      let list = fieldsList.flatMap(i => {
        if (i.geometry?.coordinates) {
          return [i.geometry.coordinates]
        }
        return []
      })
      setFields(list)
    }
  }, [fieldsList])
  
  useEffect(() => {
    setUnit(unitsPosition)
  }, [unitsPosition])
  
  
  return (
    <MenuLayout>
      <MapContainer
        center={[55.2694, 54.67340]}
        preferCanvas={true}
        transform3DLimit={0}
        
        // renderer={L.canvas()}>
        zoom={10}
        maxZoom={18}
        wheelDebounceTime={20}
        wheelPxPerZoomLevel={100}
        animate={false} // при стандарте ни на что не влияет
        // zoomAnimation={false}
        // fadeAnimation={false}
        zoomAnimationThreshold={3} //default - 4
        duration={0.1} // 0.25
        easeLinearity={0.1} // 0.25
        
        markerZoomAnimation={true}
        
        
        zoomDelta={0.1}
        scrollWheelZoom={true}
      >
        
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        
        
        <FieldsLayerContainer fields={fields}/>
        <UnitsLayerContainer units={units}/>
      
      </MapContainer>
    </MenuLayout>
  )
}
export default Leaflet