import React, {memo} from 'react';
import './style.scss';
import {FeatureGroup, LayerGroup, MapContainer, Polygon} from "react-leaflet";
import FieldContainer from "./field";


const FieldsLayerContainer = ({children, ...props}) =>{

    let {
        fields
    } = props

    return(
        <LayerGroup>
            {fields.map((field,index)=>{
                return (
                    <FieldContainer field={field} />
                )
            })
            }
        </LayerGroup>
    )
}
export default FieldsLayerContainer