import React, {memo, useEffect, useState} from 'react';
import L from "leaflet";
import {CircleMarker, Tooltip} from 'react-leaflet'

const FieldsTooltip = memo((props) =>{
  
  let {
    field
  } = props
  
  let [markerPosition, setMarkerPosition] = useState()
  
  useEffect(()=>{
    if(field.geometry.coordinates.length){
      if(field.geometry.coordinates[0].length){
        let polygon = L.polygon(field.geometry.coordinates[0].map((itemIntoArray)=>[itemIntoArray[1], itemIntoArray[0]]))
        setMarkerPosition(polygon.getBounds().getCenter())
      }
      //lat lng
    }
  },[field])
  
  
  
  return (
    <>
      { markerPosition ?
        <CircleMarker
          key={field.glid + " CircleMarker"}
          className={"cirklemarker__container"}
          pathOptions={{color: "transparent"}}
          radius={0}
          opacity={0}
          fillOpacity={0}
          fillColor={'black'}
          interactive={false}
          center={markerPosition}>
          <Tooltip
            key={field.glid + " Tooltip"}
            className={"mapField__tooltip"}
            
            permanent={true}
            direction={"center"}
          >
            {field.name}
          </Tooltip>
        </CircleMarker>
        : null
      }
    </>
  )
},(prevProps, nextProps)=>{
  return prevProps.field.glid === nextProps.field.glid
})
export default FieldsTooltip;