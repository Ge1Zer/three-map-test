import React, {useRef, useState, useEffect} from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import st from './style.scss'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import MenuLayout from "../../layout/MenuLayout"; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VpemVyIiwiYSI6ImNrd2x5ZmV3eDI2dGoydnF2c2VwNHFndDQifQ.MTAqDdEB0jmoNdPOkIrXDA'

// const Map = ReactMapboxGl({
//     accessToken:
//         'sk.eyJ1IjoiZ2VpemVyIiwiYSI6ImNrd2x5ZDF5NTI2aDYyd25zZGcyczJ6ZjUifQ.9oF9MMYSUJaLwhUtj3Fr4Q'
// });



const Mapbox = () =>{

    const mapContainer = useRef(null);
    const map = useRef(null);

    const {fieldsList} = useTypedSelector(state=>state.fieldsStore)

    const {unitsPosition} = useTypedSelector(state=>state.unitsStore)
    const {connectFetchStatusUnits, disconnectFetchStatusUnits} = useActions()

    let [fields, setFields] = useState([])
    let [units, setUnit] = useState([])

    useEffect(()=>{
        if(fieldsList.length){
            let list = fieldsList.flatMap(i=>{
                if(i.geometry?.coordinates){
                    return i.geometry.coordinates
                }
                return []
            })
            setFields(list)
        }
    },[fieldsList])

    useEffect(()=>{
        setUnit(unitsPosition)
    },[unitsPosition])




  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      // center: [55.2694, 54.67340],
      center: [56.12674290219766,55.26458711408649],
      zoom: 12
    });

  }, []);


  useEffect(()=>{
    if(fields.length && units.length && map.current){
        map.current.on('load', function(){

        //===========================================================================>
            // polygons

                let r1 = map.current.addSource('maine', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': fields
                        }
                    }
                });

                let rr1 = map.current.addLayer({
                    'id': 'maines',
                    'type': 'fill',
                    'source': 'maine', // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#1962ba', // blue color fill
                        'fill-opacity': 0.5
                    }
                });
                let rrr1 = map.current.addLayer({
                    'id': 'outline',
                    'type': 'line',
                    'source': 'maine',
                    'layout': {},
                    'paint': {
                        'line-color': '#1c59c1',
                        'line-width': 3
                    }
                });
        //===============================================================>
            let g1 = map.current.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        ...units.map(unit=>{
                            if(unit.values['rt_position']){
                                let lat = unit.values['rt_position'][0]
                                let lon = unit.values['rt_position'][1]

                                return {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [lat, lon]
                                    },
                                    'properties': {
                                        'title': unit.id
                                    }
                                }
                            }

                        })
                    ],
                }
            });

            let gg1 = map.current.addLayer({
                'id': 'point',
                'type': 'circle',
                'source': 'points', // reference the data source
                "paint": {
                    "circle-radius": 15,
                    "circle-color": '#f30909'
                },

            });
            //=================================================================>
        })
    }
  },[fields,units, map.current])

    // useEffect(()=>{
    //     if(units.length && map.current){
    //         map.current.on('load', function(){
    //
    //
    //         })
    //     }
    // },[units, map.current])

  return (
    <MenuLayout>
        <div className={'mapbox__container'}>
            <div ref={mapContainer} className="map-container" />
        </div>
        <br/>
    </MenuLayout>
  );
}

export default Mapbox