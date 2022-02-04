import React, {memo} from 'react'
import './style.scss'
import L from "leaflet";
import red from "../../../../../assets/red.svg";
import {Marker, Polygon} from "react-leaflet";


const FieldContainer = memo(({field}) =>{
    return(
        <Polygon
            positions={field.map(i=>i.map(j=>[j[1], j[0]]))}
        />
    )
},(prev, next)=>{
    return true
})
export default FieldContainer