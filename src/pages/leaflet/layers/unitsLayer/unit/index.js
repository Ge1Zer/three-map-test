import React, {memo} from 'react'
import './style.scss'
import L from "leaflet";
import red from "../../../../../assets/red.svg";
import {Marker} from "react-leaflet";


const UnitContainer = memo(({lon, lat}) =>{
    return(
        <Marker
            position={[lon, lat]}
            icon={L.icon({
                iconUrl: red,
                iconSize: [10,10],
                iconAnchor: [10, 10],
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            })}
        />
    )
},(prev, next)=>{
    return prev.lon === next.lon && prev.lat === next.lat
})
export default UnitContainer