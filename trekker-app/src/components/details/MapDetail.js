import React, { useRef, useEffect, useContext} from 'react';
import { dataContext } from "../../contexts/dataContext";
import mapboxgl from 'mapbox-gl';
import Detail from './Detail';

// need to hide the access token in a config file that will be in the git ignore file
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

    });

    // map settings 
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    const coordinates = value.current.tripRoute.points;
    const bounds = coordinates.reduce( (bounds, coord) => {
      return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
    map.fitBounds(bounds, { padding: 20 });
    
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