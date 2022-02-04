import React, {useEffect} from 'react'
import {useMap} from "react-leaflet";
import L from 'leaflet';
// import './buffer';

const TileLayerCustom = () =>{
    const map  = useMap()

    useEffect(() => {
        let southWestLat, southWestLng,
            northEastLat, northEastLng

        let cord = map.getBounds()

        // if(cord._southWest.lat > 0){
        //     southWestLat = Number(cord._southWest.lat) + 1
        // }else{
        //     southWestLat = cord._southWest.lat
        // }
        //
        // if(cord._southWest.lng > 0){
        //     southWestLng = cord._southWest.lng + 1
        // }else{
        //     southWestLng = cord._southWest.lng -1
        // }
        //
        //
        // if(cord._northEast.lat > 0){
        //     northEastLat = Number(cord._northEast.lat) + 1
        // }else{
        //     northEastLat = cord._northEast.lat
        // }
        //
        // if(cord._northEast.lng > 0){
        //     northEastLng = cord._northEast.lng + 1
        // }else{
        //     northEastLng = cord._northEast.lng -1
        // }

        let southWest = L.latLng(southWestLat, southWestLng)
        let northEast = L.latLng(northEastLat,northEastLng)

        let boundCreate = L.latLngBounds(southWest, northEast)

        debugger

        new L.TileLayer(
            `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
            {
                tileSize: 256,
                zoomOffset: 0,
                updateWhenIdle: false,
                reuseTiles: true,
            }
        ).addTo(map);
    }, []);

    return null

}
export default TileLayerCustom;