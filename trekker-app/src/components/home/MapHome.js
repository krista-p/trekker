import React, { useRef, useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { dataContext, Provider } from '../../contexts/dataContext';
import ListHome from './ListHome';

// need to hide the access token in a config file that will be in the git ignore file
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

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

          // NEED TO FIGURE OUT HOW TO RENDER A DETAIL SECTION ON CLICK!!!!
          map.on('click', 'hover-point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<p>hello there</p>')
            .addTo(map);
          });

          map.on('click', 'hover-point', () => {
            console.log('CLICKED')
          })
          // NEED TO FIGURE OUT HOW TO RENDER A DETAIL SECTION ON CLICK!!!
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
      <div className="flex w-full">
        <div className="w-3/4 h-full" ref={mapContainerRef}/>
        <ListHome className="w-1/4 h-full" />
      </div>
  );
};

export default MapHome;