import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DetailCreate from './DetailCreate';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2x0bjBpeGEwNHBwMm5vM3FocGpwaThvIn0.xuVes-DFVzmA9nbpb85Nkw';

const MapCreate = ({starts, start, handleStartChange, handleSubmit}) => {

  const mapContainerRef = useRef(null);
  let coordinates = [];
  // states needed
  //const [start, setStart] = useState([]);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Outdoors style
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-100, 40],
      zoom: 4,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // add search feature, when queried, map goes to the new location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    map.doubleClickZoom.disable();

    const draw = new MapboxDraw();
    map.addControl(draw);

    const marker = new mapboxgl.Marker();
    
    const add_marker = (e) => {
      coordinates = e.lngLat;
      //console.log(start)
      marker.setLngLat(coordinates).addTo(map);
      handleStartChange([coordinates.lng, coordinates.lat]);
    }
    
    map.on('dblclick', add_marker);
    
    return () => map.remove();
  });
  //console.log(start)
  return (
    <div className="flex w-screen">
      <div className="w-1/2 h-screen" ref={mapContainerRef} />
      <DetailCreate className="w-1/2 h-screen" start={start} starts={starts} handleSubmit={handleSubmit} />
    </div>
  );
};

export default MapCreate;