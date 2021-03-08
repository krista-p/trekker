import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DetailCreate from './DetailCreate';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

const MapCreate = () => {

  const [coordinates, setCoordinates] = useState([]);
  const [route, setRoute] = useState([]);
  const [camps, setCamps] = useState([]);
  const mapContainerRef = useRef(null);
  console.log(camps)

  const handleRouteChange = (data) => {
    setRoute(data);
  };

  const handleCampsChange = (data) => {
    const addedCamp = [...camps, data];
    setCamps(addedCamp);
  };
  
  const handleStartChange = ([lng, lat]) => {
    setCoordinates([lng, lat]);
  };
  
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-100, 40],
      zoom: 4,
    });

    
    // add search feature, when queried, map goes to the new location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));
    
    
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
    
    // map settings 
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.doubleClickZoom.disable();
    map.addControl(draw);

    map.on('draw.create', (e) => {
      if (e.features[0].geometry.type === 'LineString') handleRouteChange(e.features[0].geometry.coordinates);
      if (e.features[0].geometry.type === 'Point') handleCampsChange(e.features[0].geometry.coordinates);
    });

    // NEED TO create an event on draw.delete that would delete the line from the database
    map.on('draw.delete', (e) => {
      console.log(e)
      //handleRouteChange(e.features[0].geometry.coordinates);
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
    <div className="flex w-full">
      <div className="w-3/4 h-full" ref={mapContainerRef}/>
      <DetailCreate className="w-1/4 h-full " coordinates={coordinates} route={route} />
    </div>
  );
};

export default MapCreate;