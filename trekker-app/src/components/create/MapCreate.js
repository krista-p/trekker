import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2x0bjBpeGEwNHBwMm5vM3FocGpwaThvIn0.xuVes-DFVzmA9nbpb85Nkw';

const MapCreate = () => {
  const mapContainerRef = useRef(null);

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

    const draw = new MapboxDraw();
    map.on('load', function() {
      //Draw Tools
      map.addControl(draw);
    });

    return () => map.remove();
  }, []);

  return (
  <div className="w-full h-screen" ref={mapContainerRef} />
  );
};

export default MapCreate;