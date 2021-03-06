import React, { useRef, useEffect, useContext, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DetailCreate from './DetailCreate';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2x0bjBpeGEwNHBwMm5vM3FocGpwaThvIn0.xuVes-DFVzmA9nbpb85Nkw';

const MapCreate = React.memo(() => {

  const [coordinates, setCoordinates] = useState([]);
  const mapContainerRef = useRef(null);
  
  const handleStartChange = ([lng, lat]) => {
    setCoordinates([lng, lat]);
  }
  
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
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

    const draw = new MapboxDraw({
      controls: {
        point: true,
        line_string: true,
        polygon: false,
        trash: true,
        combine_features: false,
        uncombine_features: false
      }
    });

    map.addControl(draw);

    map.on('draw.create', function (e) {
      console.log(e.features);
    });

    const marker = new mapboxgl.Marker();
    
    const add_marker = (e) => {
      marker.setLngLat(e.lngLat).addTo(map);
      handleStartChange([e.lngLat.lng, e.lngLat.lat]);
    }
    
    map.on('dblclick', add_marker);
    
    return () => map.remove();
  }, []);

  return (
    <div className="flex w-screen">
      <div className="w-1/2 h-screen" ref={mapContainerRef}/>
      <DetailCreate className="w-1/2 h-screen" coordinates={coordinates} />
    </div>
  );
});

export default MapCreate;