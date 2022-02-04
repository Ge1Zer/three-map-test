import React, {memo} from 'react';
import './style.scss';
import {FeatureGroup, LayerGroup, MapContainer, Marker} from "react-leaflet";
import L from "leaflet";
import red from "../../../../assets/red.svg";
import UnitContainer from "./unit";



const UnitsLayerContainer = ({children, ...props}) =>{

    let {
        units
    } = props

    return(
        <LayerGroup>
            {units.map((unit,index)=>{
                    if(unit?.values['rt_position']){
                        let lat = unit.values['rt_position'][0]
                        let lon = unit.values['rt_position'][1]
                        return (
                            <UnitContainer lat={lat} lon={lon} />
                        )
                    }
                })
            }
        </LayerGroup>
    )
}
export default UnitsLayerContainer