import React, { useRef, useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { dataContext, Provider } from '../../contexts/dataContext';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2x0bjBpeGEwNHBwMm5vM3FocGpwaThvIn0.xuVes-DFVzmA9nbpb85Nkw';

const MapHome = () => {
  
  const value = useContext(dataContext);
  const mapContainerRef = useRef();

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Outdoors style
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-100, 40],
      zoom: 4,
    });

    let hoveredPointId = '';

    // Show starting points on map
    const showMap = () => {
      map.on('load', () => {
        map.addSource('api', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: value.trips.map((trip, index) => (
              {
                type: 'Feature',
                id: index + 1,
                geometry: {
                  id: trip._id,
                  type: 'Point',
                  coordinates: [trip.startingPoint.start[0], trip.startingPoint.start[1]]
                }
              }
            )),
          }
        });
        
        // create a layer for the points
        map.addLayer({
          id: 'hover-point',
          type: 'circle',
          source: 'api',
          layout: {},
          paint: {
            'circle-radius': [
              'case', ['boolean', ['feature-state', 'hover'], false],
              10,
              5
            ],
            'circle-color': [
              'case', ['boolean', ['feature-state', 'hover'], false],
              'magenta',
              'blue'
            ],
            'circle-opacity': 0.6,
            'circle-stroke-color': 'cyan',
            'circle-stroke-width': 1
          }
        });
      
        // create a mouse event for hovering over points
        map.on('mousemove', 'hover-point', function (e) {
          if (e.features.length > 0) {
          if (hoveredPointId) {
            map.setFeatureState({ source: 'api', id: hoveredPointId }, { hover: false });
          }
          //console.log(e.features)
          hoveredPointId = e.features[0].id;
          map.setFeatureState({ source: 'api', id: hoveredPointId }, { hover: true });
          }
        });

        // clear the hover event when off of point
        map.on('mouseleave', 'hover-point', function () {
          if (hoveredPointId) {
            map.setFeatureState({ source: 'api', id: hoveredPointId }, { hover: false });
          }
          hoveredPointId = null;
          });
      });
    };

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    // add search feature, when queried, map goes to the new location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    // invoke the map function
    showMap();

    return () => map.remove();
  });

  return (
  <div className="w-screen h-screen" ref={mapContainerRef} />
  );
};

export default MapHome;