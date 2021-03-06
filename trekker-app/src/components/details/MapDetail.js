import React, { useRef, useEffect, useContext, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Detail from './Detail';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

const MapDetail = () => {

  const mapContainerRef = useRef(null);
  
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-100, 40],
      zoom: 4,
    });
    
    // map settings 
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    return () => map.remove();
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-3/4 h-full" ref={mapContainerRef}/>
      <Detail className="w-1/4 h-full" />
    </div>
  );
};

export default MapDetail;