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
import {testSpeed} from "../../util/testSpeed";
import TitleLayer from "./layers/titleLayer";

// import './layers/tileLayer/buffer';

const Leaflet = () => {
  
  const {fieldsList, selectField} = useTypedSelector(state => state.fieldsStore)
  const {unitsPosition} = useTypedSelector(state => state.unitsStore)
  const {connectFetchStatusUnits, disconnectFetchStatusUnits, SetSelectField} = useActions()
  
  let [fields, setFields] = useState([])
  let [units, setUnit] = useState([])
  
  useEffect(() => {
    if (fieldsList.length) {
      let list = testSpeed(()=>fieldsList.flatMap(i => {
        if (i.geometry?.coordinates) {
          return [i]
        }
        return []
      }), 'формирование списка только из координат')
      setFields(list)
    }
  }, [fieldsList])
  
  useEffect(() => {
    setUnit(unitsPosition)
  }, [unitsPosition])
  
  
  return (
    <MenuLayout>
      <MapContainer
        center={[53.02, 38]}
        // center={[55.2694, 54.67340]}
        preferCanvas={true}
        transform3DLimit={0}


        zoom={15}
        maxZoom={18}
        wheelDebounceTime={20}
        wheelPxPerZoomLevel={100}
        animate={false} // при стандарте ни на что не влияет

        zoomAnimationThreshold={3} //default - 4
        duration={0.25} // 0.1
        easeLinearity={0.25} // 0.1

        markerZoomAnimation={true}

        zoomDelta={0.1}
        scrollWheelZoom={true}
  
        
        renderer={L.canvas()}>
        {/*zoomAnimation={false}*/}
        {/*fadeAnimation={false}*/}
      >
        
        
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
  
        {/*<TitleLayer*/}
        {/*  fields={fields}*/}
        {/*/>*/}
        
        <FieldsLayerContainer
          fields={fields}
          selectField={selectField}
          SetSelectField={SetSelectField}
        />
        
        
        
      
        
        {/*<FieldsLayerContainer*/}
        {/*  fields={fields}*/}
        {/*  selectField={selectField}*/}
        {/*  SetSelectField={SetSelectField}*/}
        {/*/>*/}
        
        {/*<FieldsLayerContainer*/}
        {/*  fields={fields}*/}
        {/*  selectField={selectField}*/}
        {/*  SetSelectField={SetSelectField}*/}
        {/*/>*/}
        
        {/*<FieldsLayerContainer*/}
        {/*  fields={fields}*/}
        {/*  selectField={selectField}*/}
        {/*  SetSelectField={SetSelectField}*/}
        {/*/>*/}
        {/*<FieldsLayerContainer fields={fields}/>*/}
        {/*<FieldsLayerContainer fields={fields}/>*/}
        {/*<FieldsLayerContainer fields={fields}/>*/}
        {/*<FieldsLayerContainer fields={fields}/>*/}
        <UnitsLayerContainer units={units}/>
      
      </MapContainer>
    </MenuLayout>
  )
}
export default Leaflet