import React, {useState} from 'react';

import {MapContainer, TileLayer} from "react-leaflet";

import './style.scss';

const MapAsContainer = () =>{
    const [defPosition, setDefPosition] = useState([48.864716, 2.349])

    return(
        <div className={'mapas__container'}>
            <div className={'mapas__content'}>
               <MapContainer
                center={defPosition}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100vh" }}
                zoomControl={true}
               >

               </MapContainer>
            </div>
        </div>
    )
}

export default MapAsContainer;


