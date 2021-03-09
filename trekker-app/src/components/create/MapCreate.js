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
  
  const handleRouteChange = (data) => {
    setRoute(data);
  };
  
  const handleStartChange = ([lng, lat]) => {
    setCoordinates([lng, lat]);
  };
  
  // initialize map when component mounts
  useEffect(() => {
    
    const handleCampsChange = (data) => {
      let blah = camps.concat(data);
      setCamps(blah);
      console.log(blah)
    };

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
      if (e.features[0].geometry.type === 'LineString') handleRouteChange(e.features[0].geometry.coordinates);
      // if the draw is a point, change camp state
      if (e.features[0].geometry.type === 'Point') { 
        const campsites = [e.features[0].geometry.coordinates];
        handleCampsChange(campsites);
      };
    });

    // ****** NEED TO create an event on draw.delete that would delete the line from the database
    map.on('draw.delete', (e) => {
      console.log(e)
      //handleRouteChange(e.features[0].geometry.coordinates);
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
  }, [camps]);

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full h-screen md:w-2/3 md:h-full" ref={mapContainerRef}/>
      <DetailCreate className="w-full h-1/4 overflow-y-hidden md:w-1/3 md:h-full" coordinates={coordinates} route={route} camps={camps} />
    </div>
  );
};

export default MapCreate;