import React, {useRef, useState, useEffect} from "react"
import "./style.scss";
import MenuLayout from "../../layout/MenuLayout";

// import {
//   interaction, layer, custom, control,
//   Interactions, Overlays, Controls,
//   Map, Layers, Overlay, Util
// } from "react-openlayers";
import 'ol/ol.css';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import Polygon from 'ol/geom/Polygon';
import {Zoom, ScaleLine} from 'ol/control';
import {Circle, Stroke, Style, Fill} from 'ol/style';
import Point from 'ol/geom/Point'
import VectorLayer from "ol/layer/Vector";
import Tile from "ol/layer/Tile";
import VectorTile from "ol/layer/VectorTile";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON"
import Feature from "ol/Feature"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Vector} from "ol";
import {createXYZ} from 'ol/tilegrid'
import {useActions} from "../../hooks/useActions";
import TileWMS from 'ol/source/TileWMS';
import TileCache from 'ol/TileCache';
import Cluster from "ol/source/Cluster";


var map;

const OpenLayers = () => {

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

        let vectorSource = new VectorTile({
            format: new GeoJSON(),
            tileUrlFunction: function(tileCoord, pixelRatio, projection) {
                return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                    'outputFormat=application/json&srsname=EPSG:3857&' +
                    'bbox=' + vectorSource.getTileGrid().getTileCoordExtent(tileCoord).join(',') + ',EPSG:3857';
            },
            tileGrid: createXYZ()
        });

        let vector = new VectorTile({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'rgba(0, 0, 255, 1.0)',
                    width: 2
                })
            })
        });



        map = new Map({
            target: 'map',
            view: new View({
                center: fromLonLat([55.2694, 54.67340]),
                projection: 'EPSG:3857',
                zoom: 13,
                maxZoom: 16,
                minZoom: 8
            }),
            controls:[
                new Zoom(),
                new ScaleLine()
            ],
            layers: [
                // // vector,

                new TileLayer({
                    source: new OSM()
                }),

                //
                // new TileLayer({
                //     source: new TileWMS({
                //         cacheSize: 16000,
                //         params: {'LAYERS': 'topp:states', 'TILED': true},
                //         serverType: 'geoserver',
                //         url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                //         // Countries have transparency, so do not fade tiles:
                //         transition: 0,
                //     })
                // }),
                //
                //
                // new VectorLayer({
                //     source: new VectorSource({
                //         features: []
                //         // features: new GeoJSON().readFeatures(feature)
                //     })
                // })
            ],
        });

    }, [])

    useEffect(() => {
        if(fields.length){

                let fieldsCopy = fields

                let polygonTime = new Polygon(fieldsCopy).transform('EPSG:4326', 'EPSG:3857');

                let featureTime = new Feature(polygonTime);
                let vectorSource = new VectorSource();

                vectorSource.addFeature(featureTime);

                // const clusterSource = new Cluster({
                //     source: vectorSource,
                // });

                let vectorLayerFieldsCopy = new VectorLayer({
                    source: vectorSource,
                    // source: clusterSource,
                });

                let t = map.addLayer(vectorLayerFieldsCopy);
        }
    }, [fields])





    useEffect(()=>{
        if(units.length){

            let unitsCopy = units.flatMap(i=> {
                if(i.values['rt_position']) {
                    return [i.values['rt_position']]
                }else{
                    return []
                }
            })


            unitsCopy = unitsCopy.map(i=>{
                return new Feature({
                    geometry: new Point(fromLonLat(i)),
                    name: 'Somewhere else',
                });
            })

            let vectorSourceUnitCopy = new VectorSource({
                features: unitsCopy
            });

            let vectorLayerUnitsCopy = new VectorLayer({
                source: vectorSourceUnitCopy,
                style:  new Style({
                    image: new Circle({
                        radius: 5,
                        fill: new Fill({color: '#f80101'}),
                        stroke: new Stroke({color: '#9a7373', width: 1}),
                    }),
                }),
            });

            let tt = map.addLayer(vectorLayerUnitsCopy);
        }

    },[units])












    return (
        <MenuLayout>
            <div className={"mapContainer"}>
                <div id={'map'} className={'map'}/>
            </div>
        </MenuLayout>
    )
}
export default OpenLayers;















// let geojsonObject = {
//     'type': 'FeatureCollection',
//     'crs': {
//         'type': 'name',
//         'properties': {
//             'name': 'EPSG:3857',
//         },
//     },
//     'features': [
//         {
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'Polygon',
//                 'coordinates': [
//                     [
//                         [-60, 40],
//                         [-67, 43],
//                         [-80, 46],
//                         [-67, 43],
//                         [-60, 40],
//                     ],
//                 ],
//             },
//         }
//     ]
// }


//в это место вставить все геозоны
// let arr = [
//     [-60, 40],
//     [-67, 43],
//     [-100, 46],
//     [-67, 43],
//     [-60, 40],
// ]
//
// //в это место вставить все геозоны
// let feature = new Feature({
//     geometry: new Polygon([arr]).transform('EPSG:4326','EPSG:3857')
// })








