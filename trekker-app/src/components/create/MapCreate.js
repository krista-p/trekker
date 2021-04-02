import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DetailCreate from './DetailCreate';

// this token is scoped only for read, so it is okay for clients to see it
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

const MapCreate = () => {

  const [coordinates, setCoordinates] = useState([]);
  const [route, setRoute] = useState([]);
  const [camps, setCamps] = useState([]);
  const mapContainerRef = useRef();

  const handleRouteChange = (data) => {
    if (data.type === 'draw.create') setRoute(data.features[0].geometry.coordinates);
    if (data.type === 'draw.delete') setRoute([]);
  };
  
  const handleStartChange = ([lng, lat]) => {
    setCoordinates([lng, lat]);
  };

  const handleCampsChange = (data) => {
    if (data.type === 'draw.create') {
      setCamps((camps) => {
        return [...camps, data.features[0].geometry.coordinates]
      });
    };
    if (data.type === 'draw.delete') {
      setCamps((camps) => {
        const newCamps = camps.filter((value) => value !== data.features[0].geometry.coordinates);
        console.log(newCamps)
        return newCamps;
      });
    };
  };

  // const handleDeleteChange = (data) => {
  //   console.log(camps)
  //   setRoute((route) => {
  //     return route.filter((value) => value !== data.features[0].geometry.coordinates);
  //   });
  // };
    
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
    
    // create new mapbox draw session with specific controls
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
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    map.doubleClickZoom.disable();
    map.addControl(draw);
    
    // on a new draw event
    map.on('draw.create', (e) => {
      // if the draw is a string, change route state
      if (e.features[0].geometry.type === 'LineString') handleRouteChange(e);
      // if the draw is a point, change camp state
      if (e.features[0].geometry.type === 'Point') handleCampsChange(e);
    });
  
    // ****** NEED TO create an event on draw.delete that would delete the line from the database
    map.on('draw.delete', (e) => {
      console.log(e)
      if (e.features[0].geometry.type === 'LineString') handleRouteChange(e);
      if (e.features[0].geometry.type === 'Point') handleCampsChange(e);
    });

    // new marker, used for starting location
    const marker = new mapboxgl.Marker();
    
    // set marker lat & lng to click location
    const add_marker = (e) => {
      marker.setLngLat(e.lngLat).addTo(map);
      handleStartChange([e.lngLat.lng, e.lngLat.lat]);
    };
    
    // show marker on double click
    map.on('dblclick', add_marker);

    return () => map.remove();
  }, []);

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full h-screen md:w-2/3 md:h-full" ref={mapContainerRef}/>
      <DetailCreate className="w-full h-1/4 overflow-y-hidden md:w-1/3 md:h-full" coordinates={coordinates} route={route} camps={camps} />
    </div>
  );
};

export default MapCreate;
