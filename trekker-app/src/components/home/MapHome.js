import React, { useRef, useEffect, useContext, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { dataContext } from '../../contexts/dataContext';
import DetailContainerHome from './DetailContainerHome';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

const MapHome = () => {

  // state needed to get db id of clicked point
  const [currentTrip, setCurrentTrip] = useState([]);
  
  // context data from db
  const value = useContext(dataContext);

  // needed to mount the map to a container
  const mapContainerRef = useRef();

  // initialize map when component mounts
  useEffect(() => {
    
    // function to get the current trip that the user clicks on
    const currentTripHandler = (current) => {
      const trip = value.trips.find((trip) => trip._id === current);
      setCurrentTrip(trip);
    };

    // new map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Outdoors style
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-100, 40],
      zoom: 4,
    });

    // needed for the clicked layer
    let clickedPointId = '';

    // Show starting points on map, fetch from db
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
                },
                properties: {
                  currentId: trip._id,
                }
              }
            )),
          }
        });
        
        // create a layer for the clicked points
        map.addLayer({
          id: 'clicked-point',
          type: 'circle',
          source: 'api',
          layout: {},
          paint: {
            'circle-radius': [
              'case', ['boolean', ['feature-state', 'clicked'], false],
              10,
              5
            ],
            'circle-color': [
              'case', ['boolean', ['feature-state', 'clicked'], false],
              'magenta',
              'blue'
            ],
            'circle-opacity': 0.6,
            'circle-stroke-color': 'cyan',
            'circle-stroke-width': 1
          }
        });

        // change cursor to pointer on map
        map.on('mouseenter', 'clicked-point', () => {
          map.getCanvas().style.cursor = 'pointer'
        });

        map.on('mouseleave', 'clicked-point', () => {
          map.getCanvas().style.cursor = ''
        });

        // when point is clicked, change to clicked-layer, and show details on side
        map.on('click', 'clicked-point', (e) => {
          if (e.features.length > 0) {
            if (clickedPointId) {
              map.setFeatureState( { source: 'api', id: clickedPointId }, { clicked: false } );
            }
            
            clickedPointId = e.features[0].id;
            map.setFeatureState( { source: 'api', id: clickedPointId }, { clicked: true } );
            
            const currentTripId = e.features[0].properties.currentId;
            currentTripHandler(currentTripId);
          }
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
    

    // show the entire map
    showMap();

    return () => map.remove();
  }, [value.trips]);

  return (
      <div className="flex flex-col w-full md:flex-row">
        <div className="w-full h-3/4 md:w-2/3 md:h-full" ref={mapContainerRef}/>
        <DetailContainerHome className="w-full h-1/4 md:overflow-y-hidden md:w-1/3 md:h-full" currentTrip={currentTrip} />
      </div>
  );
};

export default MapHome;