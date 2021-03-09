import React, { useRef, useEffect, useContext, useState} from 'react';
import { dataContext } from "../../contexts/dataContext";
import mapboxgl from 'mapbox-gl';
//import maki from '@mapbox/maki';
import Detail from './Detail';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

const MapDetail = () => {

  const value = useContext(dataContext);

  const mapContainerRef = useRef(null);
  
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: value.current.startingPoint.start,
      zoom: 5,
    });
    
    map.on('load', () => {

      // add the source of the starting point
      map.addSource('startingPoint', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 1,
              geometry: {
                id: value.current._id,
                type: 'Point',
                coordinates: value.current.startingPoint.start
              }
            }
          ],
        }
      });
      
      // add the source of the route locations
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: 2,
              geometry: {
                id: value.current._id,
                type: 'LineString',
                coordinates: value.current.tripRoute.points
              }
            }
          ],
        }
      });

      // create layer for the line
      map.addLayer({
        id: 'line',
        type: 'line',
        source: 'route',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'magenta',
          'line-width': 2,
        }
      });
      
      // create layer for the starting point
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'startingPoint',
        layout: {},
        paint: {
          'circle-radius': 5,
          'circle-color': 'blue',
          'circle-opacity': 0.9,
          'circle-stroke-color': 'cyan',
          'circle-stroke-width': 1
        }
      });

      // trying to figure out how to use Maki icons .... weird ...
      // map.addLayer({
      //   id: 'point',
      //   type: 'symbol',
      //   //sprite: "mapbox://sprites/mapbox/bright-v8",
      //   source: 'startingPoint',
      //   layout: {
      //     'icon-image': 'marker-15'
      //   },
      //   paint: {}
      // });
      
    });

    // map settings 
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // zoom in on the route bounds
    const coordinates = value.current.tripRoute.points;
    const bounds = coordinates.reduce( (bounds, coord) => {
      return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    map.fitBounds(bounds, { padding: 20 });
    
    return () => map.remove();
  }, []);

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full h-screen md:w-2/3 md:h-full" ref={mapContainerRef}/>
      <Detail className="w-full h-1/4 overflow-y-hidden md:w-1/3 md:h-full" />
    </div>
  );
};

export default MapDetail;