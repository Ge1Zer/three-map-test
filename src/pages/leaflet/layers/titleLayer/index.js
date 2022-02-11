import React from "react";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import FieldsTooltip from "./fieldTooltip/fieldsTooltip";
import L from 'leaflet';
import {useMap} from "react-leaflet";

const TitleLayer = (props) =>{
  const map = useMap()
  debugger
  let {
    fields
  } = props
  
  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount();
    let size = 'LargeXL';
    
    if (count < 3) {
      size = 'Small';
    }
    else if (count >= 4  && count < 7) {
      size = 'Medium';
    }
    else if (count >= 7 && count < 11) {
      size = 'Large';
    }
    const options = {
      cluster: `markerCluster${size}`,
    };
    
    return L.divIcon({
      html:
        `<div>
          <span style="
            background-color: #78c177f2;
            border-radius: 25%;
            width: 20px;
            height: 20px;
            padding: 20px;
            color: white;
            font-size: 20px;"
            class="markerClusterLabel">${count}</span>
        </div>`,
      className: `${options.cluster}`
    });
  };
  
  return(
    <>
      {/*<MarkerClusterGroup*/}
      {/*  iconCreateFunction={createClusterCustomIcon}*/}
      {/*  disableClusteringAtZoom={12}*/}
      {/*  removeOutsideVisibleBounds={true}*/}
      {/*  chunkedLoading={true}*/}
      {/*  showCoverageOnHover={false}*/}
      {/*  spiderLegPolylineOptions={{*/}
      {/*    weight: 0,*/}
      {/*    opacity: 0,*/}
      {/*  }}*/}
      {/*>*/}
        {
          fields.map((field)=>(
            <div key={field.glid + "CircleMarkerContainer"} >
              <FieldsTooltip
                field={field}
              />
            </div>
          
          ))
        }
      {/*</MarkerClusterGroup>*/}
    </>
  )
  
}
export default TitleLayer;