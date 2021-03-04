import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcG9saWthaXRpcyIsImEiOiJja2x0bjBpeGEwNHBwMm5vM3FocGpwaThvIn0.xuVes-DFVzmA9nbpb85Nkw';

const MapHome = () => {
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

    let hoveredPointId = '';

    // fetch starts from db
    async function getStarts() {
      const res = await fetch('http://localhost:5000/api');
      const data = await res.json();
      return data.data;
    };

    // Show starting points on map
    async function showMap() {
      let starts = await getStarts();
      map.on('load', () => {
        map.addSource('api', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: starts.map((start, index) => (
              {
                type: 'Feature',
                id: index + 1,
                geometry: {
                  id: start._id,
                  type: 'Point',
                  coordinates: [start.location.coordinates[0], start.location.coordinates[1]]
                }
              }
            )),
          }
        });
        
        // create a layer for the points
        map.addLayer({
          id: 'hover-point',
          type: 'circle',
          //minzoom: 0,
          source: 'api',
          layout: {},
          paint: {
            'circle-radius': 8,
            'circle-color': [
              'case', ['boolean', ['feature-state', 'hover'], false],
              'red',
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

    // invoke the map function
    showMap();

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // add search feature, when queried, map goes to the new location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }));

    return () => map.remove();
  }, []);

  return (
  <div class="w-screen h-screen" ref={mapContainerRef} />
  );
};

export default MapHome;